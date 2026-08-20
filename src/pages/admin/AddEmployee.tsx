import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import type { Employee as EmployeeModel } from "../../data/models/employee.types"
import { useGlobalEmployee } from "../../context/EmployeeContext"
import {useNavigate } from "react-router-dom"

type AddEmployeeForm = Omit<EmployeeModel, "id" | "isActive">

const formFields:AddEmployeeForm = {
    name: "", 
    gender: "" as AddEmployeeForm["gender"], 
    email:"", 
    mobile: "", 
    address: "", 
    department: "" as AddEmployeeForm["department"], 
    skills: [], 
    role: "" as AddEmployeeForm["role"], 
    salary: 0
}

const AddEmployee = () => {
  
  const [formData, setFormData] = useState<AddEmployeeForm>(formFields)
  
  const {employees:{updateEmployeeData}, handleAddEmployee, handleUpdateEmployee, handleClearUpdateId} = useGlobalEmployee();
  const navigate = useNavigate();
  
  const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({...prevData, [name]: value}));
  }

  const handleCheckBox = (e:ChangeEvent<HTMLInputElement>) => {
        const {checked, value} = e.target;
        setFormData((prevData) => ({
                ...prevData, 
                skills: checked ? [...prevData.skills, value]
                                : prevData.skills.filter((skill) => skill !== value)}
        ))
  }

  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(updateEmployeeData){
        handleUpdateEmployee({...updateEmployeeData, ...formData}, updateEmployeeData.id)
        handleClearUpdateId();
    }
    else{
        handleAddEmployee({...formData, id: Date.now(), isActive: true})
    }
    setFormData(formFields)
    navigate("/");
  }
  useEffect(() => {
        if(updateEmployeeData){
            setFormData(updateEmployeeData);
        }else{
            setFormData(formFields);
            handleClearUpdateId();
        }
  }, [updateEmployeeData, handleClearUpdateId])

  return (
    <div>
        <h1>{updateEmployeeData ? "Update Employee": "Add Employee"}</h1>
        <form onSubmit={handleSubmit} className="w-[70%] mx-auto border p-5 rounded">
            <div className="grid grid-cols-2 gap-6">
                <div className="form-control">
                    <label htmlFor="name">Name</label>
                    <input value={formData.name} onChange={handleChange} type="text" name="name" className="border w-full p-2 rounded" id="name" />
                </div>
                <div className="form-control">
                    <label htmlFor="name">Email</label>
                    <input disabled={updateEmployeeData !== null} value={formData.email} onChange={handleChange} type="email" name="email" className={`${updateEmployeeData && "bg-slate-300"} border w-full p-2 rounded`} id="email" />
                </div>
                <div className="form-control">
                    <label htmlFor="mobile">Mobile</label>
                    <input value={formData.mobile} onChange={handleChange} type="text" name="mobile" className="border w-full p-2 rounded" id="mobile" />
                </div>
                <div className="form-control">
                    <label htmlFor="salary">Salary</label>
                    <input value={formData.salary} onChange={handleChange} type="number" name="salary" className="border w-full p-2 rounded" id="salary" />
                </div>
                <div className="form-control">
                    <label htmlFor="gender">Gender</label>
                    <label htmlFor="male">
                        <input value="Male" checked={formData.gender === "Male"} onChange={handleChange} type="radio" name="gender" className="border ml-3 p-2 rounded" id="male" />
                        Male
                    </label>
                    <label htmlFor="female">
                        <input value="Female" checked={formData.gender === "Female"} onChange={handleChange} type="radio" name="gender" className="border ml-3 p-2 rounded" id="female" />
                        Female
                    </label>
                    <label htmlFor="others">
                        <input value="Others" checked={formData.gender === "Others"} onChange={handleChange} type="radio" name="gender" className="border ml-3 p-2 rounded" id="others" />
                        Others
                    </label>
                </div>
                <div className="form-control">
                    <label htmlFor="role">Role</label>
                    <label htmlFor="admin">
                        <input value="Admin" checked={formData.role === "Admin"} onChange={handleChange} type="radio" name="role" className="border ml-3 p-2 rounded" id="admin" />
                        Admin
                    </label>
                    <label htmlFor="employee">
                        <input value="Employee" checked={formData.role === "Employee"} onChange={handleChange} type="radio" name="role" className="border ml-3 p-2 rounded" id="employee" />
                        Employee
                    </label>
                </div>
                <div className="form-control">
                    <label htmlFor="department">Department</label>
                    <select value={formData.department} onChange={handleChange} name="department" id="department" className="border p-2 rounded ml-3">
                        <option value="">Select Department</option>
                        <option value="IT">IT</option>
                        <option value="HR">HR</option>
                        <option value="Finance">Finance</option>
                    </select>
                </div>
                <div className="form-control">
                    <label htmlFor="skills">Skills</label>
                    {["react", "js", "node"].map((skill) => (
                        <label htmlFor={skill} key={skill}>
                            <input value={skill} checked={formData.skills.includes(skill)} onChange={handleCheckBox} type="checkbox" name="skills" id={skill} className="ml-3" />
                            {skill}
                        </label>
                    ))}
                </div>
                <div className="form-control">
                    <label htmlFor="address">Address</label>
                    <textarea value={formData.address} onChange={handleChange} name="address" id="address" className="border rounded p-2 w-full"></textarea>
                </div>
            </div>
            <button className="border p-2 rounded cursor-pointer mt-5">{updateEmployeeData ? "Update Employee": "Add Employee"}</button>
        </form>
    </div>
  )
}

export default AddEmployee