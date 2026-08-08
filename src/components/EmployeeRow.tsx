import type { Employee as EmployeeModel } from '../data/models/employee.types';

interface EmployeeRowProps{
    employee: Omit<EmployeeModel, "isActive">
}

const EmployeeRow = ({employee}:EmployeeRowProps) => {
  const {id, name, gender, email, mobile, address, department, skills, role, salary} = employee;
  return (
    <tr>
        <td className='border p-2'>{id}</td>
        <td className='border p-2'>{name}</td>
        <td className='border p-2'>{gender}</td>
        <td className='border p-2'>{email}</td>
        <td className='border p-2'>{mobile}</td>
        <td className='border p-2'>{address}</td>
        <td className='border p-2'>{department}</td>
        <td className='border p-2'>{skills.join(", ")}</td>
        <td className='border p-2'>{salary}</td>
        <td className='border p-2'>{role}</td>
        <td className='border p-2'></td>
        <td className='border p-2'>
            <button className='border p-2 rounded cursor-pointer mr-2'>Update</button>
            <button className='border p-2 rounded cursor-pointer'>Delete</button>
        </td>
    </tr>
  )
}

export default EmployeeRow