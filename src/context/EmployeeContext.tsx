import { createContext, useContext, useReducer, useEffect } from "react";
import type { Employee as EmployeeModel} from "../data/models/employee.types";

// import employeesMockData from "../data/mock/employees";

function getEmployeesData<T>(key: string, defaultValue: T):T{
    try{
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue
    }catch(error){
        console.log(error)
        return defaultValue;
    }
}

const employeeData = getEmployeesData<EmployeeModel[]>("employees", []);

const initialState = {
    employeesData: employeeData,
    updateEmployeeData: null,
}

interface EmployeeUpdateState{
    employee: EmployeeModel;
    id: string | number;
}

interface EmployeeReducerState {
    employeesData: EmployeeModel[];
    updateEmployeeData: EmployeeModel | null;
}

type AddAction = {type:  "ADD"; payload: EmployeeModel}
type GetUpdateId = {type:  "GET_UPDATE_ID"; payload: EmployeeModel} 
type UpdateAction = {type:  "UPDATE"; payload: EmployeeUpdateState} 
type DeleteAction = {type:  "DELETE"; payload: string | number} 

type EmployeeAction = AddAction | GetUpdateId | UpdateAction | DeleteAction

const employeeReducer = (state:EmployeeReducerState, action:EmployeeAction):EmployeeReducerState => {
    switch(action.type){
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
        case "DELETE": return {
                ...state,
                employeesData: state.employeesData.filter((employee) => employee.id !== action.payload)
        }
        default : return state;
    }
}

interface EmployeeContextType{
    employees: EmployeeReducerState,
    handleAddEmployee: (employee: EmployeeModel) => void;
    handleGetEmployee:(employee: EmployeeModel) => void;
    handleUpdateEmployee: (employee: EmployeeModel, id: string | number) => void;
    handleDeleteEmployee: (id: number | string) => void;
}

const EmployeeContext = createContext<EmployeeContextType | null>(null);

const EmployeeProvider = ({children}:{children: React.ReactNode}) => {

    const [employees, dispatch] = useReducer(employeeReducer, initialState);

      useEffect(() => {
            localStorage.setItem("employees", JSON.stringify(employees.employeesData));
      },[employees.employeesData])
    

    const handleAddEmployee = (employee:EmployeeModel) => {
        dispatch({
            type: "ADD",
            payload: employee
        })
    }

    const handleGetEmployee = (employee:EmployeeModel) => {
        dispatch({
            type: "GET_UPDATE_ID",
            payload: employee
        })
    }

    const handleUpdateEmployee = (employee: EmployeeModel, id: string | number) => {
        dispatch({
            type: "UPDATE",
            payload: {employee, id}
        })
    } 

    const handleDeleteEmployee = (id: string | number) => {
        dispatch({
            type: "DELETE",
            payload: id
        })
    }

    return <EmployeeContext.Provider value={{
        employees, handleGetEmployee, handleAddEmployee, handleUpdateEmployee, handleDeleteEmployee
    }}> {children}</EmployeeContext.Provider>
}

export const useGlobalEmployee = () => {
    const context = useContext(EmployeeContext);
    if(!context){
        throw new Error("useGlobalEmployee must be used within a provider")
    }
    return context;
}

export default EmployeeProvider;