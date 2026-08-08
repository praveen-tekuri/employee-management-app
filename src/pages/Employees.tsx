
import EmployeeRow from '../components/EmployeeRow'
import employeesMockData from '../data/mock/employees'

const Employees = () => {
  return (
    <div>
        <h1>Employees</h1>
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
                {employeesMockData.map((employee) => (
                    <EmployeeRow key={employee.id} employee={employee}/>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Employees