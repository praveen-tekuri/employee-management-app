import { useState } from "react"
import type { Employee as EmployeeModel } from "../data/models/employee.types"

type AddEmployeeForm = Omit<EmployeeModel, "id" | "isActive">

const AddEmployee = () => {
  const [formData, setFormData] = useState<AddEmployeeForm>({name: "", gender: "", email:"", mobile: "", address: "", department: "", skills: [], role: "", salary: 0})
  
  const handleChange = (e) => {}
  const handleSubmit = (e) => {}
  return (
    <div>
        <h1>Add Employee</h1>
        <form onSubmit={handleSubmit} className="w-[70%] mx-auto border p-5 rounded">
            <div className="grid grid-cols-2 gap-6">
                <div className="form-control">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" className="border w-full p-2 rounded" id="name" />
                </div>
                <div className="form-control">
                    <label htmlFor="name">Email</label>
                    <input type="email" name="email" className="border w-full p-2 rounded" id="email" />
                </div>
                <div className="form-control">
                    <label htmlFor="mobile">Mobile</label>
                    <input type="text" name="mobile" className="border w-full p-2 rounded" id="mobile" />
                </div>
                <div className="form-control">
                    <label htmlFor="salary">Salary</label>
                    <input type="number" name="salary" className="border w-full p-2 rounded" id="salary" />
                </div>
                <div className="form-control">
                    <label htmlFor="gender">Gender</label>
                    <label htmlFor="male">
                        <input type="radio" name="gender" className="border ml-3 p-2 rounded" id="male" />
                        Male
                    </label>
                    <label htmlFor="female">
                        <input type="radio" name="gender" className="border ml-3 p-2 rounded" id="female" />
                        Female
                    </label>
                    <label htmlFor="others">
                        <input type="radio" name="gender" className="border ml-3 p-2 rounded" id="others" />
                        Others
                    </label>
                </div>
                <div className="form-control">
                    <label htmlFor="role">Role</label>
                    <label htmlFor="admin">
                        <input type="radio" name="role" className="border ml-3 p-2 rounded" id="admin" />
                        Admin
                    </label>
                    <label htmlFor="employee">
                        <input type="radio" name="role" className="border ml-3 p-2 rounded" id="employee" />
                        Employee
                    </label>
                </div>
                <div className="form-control">
                    <label htmlFor="department">Department</label>
                    <select name="department" id="department" className="border p-2 rounded ml-3">
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
                            <input type="checkbox" name="skills" id={skill} className="ml-3" />
                            {skill}
                        </label>
                    ))}
                </div>
                <div className="form-control">
                    <label htmlFor="address">Address</label>
                    <textarea name="address" id="address" className="border rounded p-2 w-full"></textarea>
                </div>
            </div>
            <button className="border p-2 rounded cursor-pointer mt-5">Add Employee</button>
        </form>
    </div>
  )
}

export default AddEmployee