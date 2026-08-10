import { useState } from 'react';
import EmployeeRow from '../components/EmployeeRow'
import { useGlobalEmployee } from '../context/EmployeeContext'

const Employees = () => {

  const [term, setTerm] = useState("");

  const {employees: {employeesData}} = useGlobalEmployee();

  const filteredEmployees = employeesData.filter((emp) => 
    [emp.name, emp.gender, emp.role, emp.skills.join(" ")].join(" ").toLowerCase().includes(term.toLowerCase())
  )

  if(employeesData.length < 1) return <h1>No Employees Found</h1>
  
  return (
    <div>
        <h1>Employees</h1>
        <div className="my-5">
            <input value={term} onChange={(e) => setTerm(e.target.value)} type="text" className='border rounded p-2 w-full' placeholder='Search Employee...' />
        </div>
        <table className='w-full'>
            <thead>
                <tr>
                    <th className='border p-2 text-left'>Id</th>
                    <th className='border p-2 text-left'>Name</th>
                    <th className='border p-2 text-left'>Gender</th>
                    <th className='border p-2 text-left'>Email</th>
                    <th className='border p-2 text-left'>Mobile</th>
                    <th className='border p-2 text-left'>Address</th>
                    <th className='border p-2 text-left'>Department</th>
                    <th className='border p-2 text-left'>Skills</th>
                    <th className='border p-2 text-left'>Salary</th>
                    <th className='border p-2 text-left'>Role</th>
                    <th className='border p-2 text-left'>Is Active?</th>
                    <th className='border p-2 text-left'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {filteredEmployees.map((employee) => (
                    <EmployeeRow key={employee.id} employee={employee}/>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Employees