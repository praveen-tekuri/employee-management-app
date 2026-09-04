import { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from "react";
import type { Employee as EmployeeModel} from "../features/dashboard/types/employee.types";
import axios from "axios";

const initialState = {
    employeesData: [],
    updateEmployeeData: null,
}

type AddEmployeeType = Omit<EmployeeModel, "_id">

interface EmployeeUpdateState{
    employee: EmployeeModel;
    id: string | number;
}

interface EmployeeReducerState {
    employeesData: EmployeeModel[];
    updateEmployeeData: EmployeeModel | null;
}

type InitAction = {type:  "INIT"; payload: EmployeeModel[]}
type AddAction = {type:  "ADD"; payload: EmployeeModel}
type GetUpdateId = {type:  "GET_UPDATE_ID"; payload: EmployeeModel} 
type UpdateAction = {type:  "UPDATE"; payload: EmployeeUpdateState} 
type DeleteAction = {type:  "DELETE"; payload: string | number} 
type ClearUpdateAction = {type: "CLEAR_UPDATE_ID"}

type EmployeeAction = InitAction | AddAction | GetUpdateId | UpdateAction | DeleteAction | ClearUpdateAction

const employeeReducer = (state:EmployeeReducerState, action:EmployeeAction):EmployeeReducerState => {
    switch(action.type){
        case "INIT": return {
            ...state, 
            employeesData: action.payload
        }
        case "ADD": return {
            ...state, 
            employeesData: [...state.employeesData, action.payload]
        }
        case "GET_UPDATE_ID": return{
            ...state, updateEmployeeData: action.payload
        }
        case "UPDATE": return {
            ...state,
            employeesData: state.employeesData.map((employee) => 
                employee.id === action.payload.id ? action.payload.employee: employee),
            updateEmployeeData: null
        }
        case "CLEAR_UPDATE_ID": return state.updateEmployeeData === null ? state : {...state, updateEmployeeData: null}
        case "DELETE": return {
            ...state,
            employeesData: state.employeesData.map((employee) => {
                if(employee._id === action.payload){
                    return {...employee, isActive: false}
                }
                return employee;
            })
        }
        default : return state;
    }
}

interface EmployeeContextType{
    employees: EmployeeReducerState,
    handleAddEmployee: (employee: AddEmployeeType) => void;
    handleGetEmployee:(employee: EmployeeModel) => void;
    handleUpdateEmployee: (employee: EmployeeModel, id: string | number) => void;
    handleDeleteEmployee: (id: number | string) => void;
    handleClearUpdateId: () => void
}

const EmployeeContext = createContext<EmployeeContextType | null>(null);

const EmployeeProvider = ({children}:{children: React.ReactNode}) => {
    
    const [employees, dispatch] = useReducer(employeeReducer, initialState);
    
    useEffect(() => {
        async function loadEmployeesFromDB(){
            try {
                const resp = await axios.get("http://localhost:3000/employees");
                console.log(resp.data);
                dispatch({type: "INIT", payload: resp.data});
            } catch (error) {
                console.error("Failed to fetch employees", error);
            }
        }
        loadEmployeesFromDB();
    },[]) 

    const handleAddEmployee = useCallback(async(employee:AddEmployeeType) => {
        try {
            const resp = await axios.post("http://localhost:3000/employees", employee);
            dispatch({
                type: "ADD",
                payload: resp.data.saved
            })
            alert("Employee Added successfully");
        } catch (error) {
            console.error(error);
            alert("Failed to save the data");
        }
    },[]);

    const handleGetEmployee = useCallback((employee:EmployeeModel) => {
        dispatch({
            type: "GET_UPDATE_ID",
            payload: employee
        })
    },[]);

    const handleUpdateEmployee = useCallback((employee: EmployeeModel, id: string | number) => {
        dispatch({
            type: "UPDATE",
            payload: {employee, id}
        })
    },[]) 

    const handleDeleteEmployee = useCallback(async(id: string | number) => {
        try{
            await axios.patch(`http://localhost:3000/employees/${id}/inactivate`);
            dispatch({
                type: "DELETE",
                payload: id
            });
        }catch(error){
            console.error("Failed to delete employee", error);
            alert("Error Deleting employee. please try again");
        }
    },[])

    const handleClearUpdateId = useCallback(() => {
        dispatch({
            type: "CLEAR_UPDATE_ID"
        })
    },[])

    const contextValue = useMemo(() => ({
            employees, 
            handleGetEmployee, 
            handleAddEmployee, 
            handleUpdateEmployee, 
            handleDeleteEmployee, 
            handleClearUpdateId
    }),[
        employees, 
        handleGetEmployee, 
        handleAddEmployee, 
        handleUpdateEmployee, 
        handleDeleteEmployee, 
        handleClearUpdateId
    ]) 

    return <EmployeeContext.Provider value={contextValue}> {children}</EmployeeContext.Provider>
}

export const useGlobalEmployee = () => {
    const context = useContext(EmployeeContext);
    if(!context){
        throw new Error("useGlobalEmployee must be used within a provider")
    }
    return context;
}

export default EmployeeProvider;