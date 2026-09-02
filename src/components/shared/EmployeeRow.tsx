import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalEmployee } from '../../context/EmployeeContext';
import type { Employee as EmployeeModel } from '../../features/dashboard/types/employee.types';
import { useGlobalAuthContext } from '../../context/AuthContext';

interface EmployeeRowProps{
    employee: EmployeeModel;
}

const EmployeeRow = React.memo(({employee}:EmployeeRowProps) => {
  //console.log("Employee rendered", employee.id);

  const navigate = useNavigate();
  
  const {handleDeleteEmployee, handleGetEmployee} = useGlobalEmployee();
  const {user} = useGlobalAuthContext();

  if(!user) return <h1>No user logged in</h1>;
  
  const {id, name, gender, email, mobile, address, department, skills, role, salary, isActive} = employee;
  
  
  const handleEditEmployee = (emp:EmployeeModel) => {
      handleGetEmployee(emp);
      navigate("/edit-employee");
  }
  const handleSoftDelete = (employeeId: number | string) => {
        const isConfirmed = window.confirm("Are you sure to delete this record?");
        if(isConfirmed){
            handleDeleteEmployee(employeeId)
        }
  }
  return (
    <tr>
        <td className='border p-2'>{String(id).slice(-4)}</td>
        <td className='border p-2'>{name}</td>
        <td className='border p-2'>{gender}</td>
        <td className='border p-2'>{email}</td>
        <td className='border p-2'>{mobile}</td>
        <td className='border p-2'>{address}</td>
        <td className='border p-2'>{department}</td>
        <td className='border p-2'>{skills.join(", ")}</td>
        <td className='border p-2'>{salary}</td>
        <td className='border p-2'>{role}</td>
        <td className='border p-2'>{isActive ? "Yes": "No"}</td>
        <td className='border p-2'>
            {isActive ? (
                <>  

                    <button onClick={() => handleEditEmployee(employee)} className={`${user?.role === "Admin" && "hidden"} border p-2 rounded cursor-pointer mr-2`}>Update</button>
                    <button onClick={() => handleSoftDelete(id)} className='border p-2 rounded cursor-pointer'>Delete</button>
                </>
            ) : "Deleted"}
        </td>
    </tr>
  )
})

export default EmployeeRow