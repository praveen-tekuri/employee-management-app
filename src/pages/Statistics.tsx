import { useState } from 'react';
import CustomBarChart from '../components/CustomBarChart';
import { useGlobalEmployee } from '../context/EmployeeContext'
import calculateEmployeeStatistics from '../utils/employeeStatistics';

const Statistics = () => {
  const [showCharts, setShowCharts] = useState(false);
  const {employees} = useGlobalEmployee();

  const employeesData = employees?.employeesData || [];
  
  const {
        highestSalary, 
        lowestSalary,  
        totalSalaryPaid, 
        activeEmployees, 
        inActiveEmployees, 
        departments,
        totalEmployees,
        averageSalary,
        groupByDepartment,
        uniqueDepartments
        } = calculateEmployeeStatistics(employeesData);

   const formatCurrency = (value: number) => new Intl.NumberFormat("en-In", {style: 'currency', currency: 'INR'}).format(value);

  return (
    <div>
        <h1>Employee Statistics</h1>
        <div className="grid grid-cols-7 gap-6 mx-auto">
            <div className='card p-4 rounded border text-center'>
                <p className='mb-2'>Total Employees</p>
                <p>{totalEmployees}</p>
            </div>
            <div className='card p-4 rounded border text-center'>
                <p className='mb-2'>Highest Salary</p>
                <p>{formatCurrency(highestSalary)}</p>
            </div>
            <div className='card p-4 rounded border text-center'>
                <p className='mb-2'>Lowest Salary</p>
                <p>{formatCurrency(lowestSalary)}</p>
            </div>
            <div className='card p-4 rounded border text-center'>
                <p className='mb-2'>Total Salary Paid</p>
                <p>{formatCurrency(totalSalaryPaid)}</p>
            </div>
            <div className='card p-4 rounded border text-center'>
                <p className='mb-2'>Average Salary</p>
                <p>{formatCurrency(averageSalary)}</p>
            </div>
            <div className='card p-4 rounded border text-center'>
                <p className='mb-2'>Active Employees</p>
                <p>{activeEmployees}</p>
            </div>
            <div className='card p-4 rounded border text-center'>
                <p className='mb-2'>In-Active Employees</p>
                <p>{inActiveEmployees}</p>
            </div>
        </div>
        <div className="mt-10">
            <span className='font-semibold'>Show data in </span>
            <button onClick={() => setShowCharts(true)} className='border cursor-pointer rounded p-2 mr-2'>Charts</button>
            <button onClick={() => setShowCharts(false)} className='border cursor-pointer rounded p-2'>Cards</button>
        </div>
        {showCharts ? (
            <div className="grid grid-cols-2 gap-6 mt-10">
                <CustomBarChart data = {departments} xKey="department" yKey="count"/>
                <CustomBarChart data = {departments} xKey="department" yKey="totalSalary"/>
                <CustomBarChart data = {departments} xKey="department" yKey="highestSalary"/>
            </div>
        ): (
            <>
            <h3 className='mt-10 font-semibold'>Department Count:</h3>
                <div className="grid grid-cols-4 gap-6 mt-5">
                    {departments.map((el) => (<p key={el.department} className='border rounded p-2 text-center'>{el.department} - {el.count}</p>))}
                </div>
                <h3 className='mt-10 font-semibold'>Total Salary by Department: </h3>
                <div className="grid grid-cols-4 gap-6 mt-5">
                    {departments.map((el) => (<p key={el.department} className='border rounded p-2 text-center'>{el.department} - {formatCurrency(el.totalSalary)}</p>))}
                </div>
                <h3 className='mt-10 font-semibold'>Highest Salary paid by Department: </h3>
                <div className="grid grid-cols-4 gap-6 mt-5">
                    {departments.map((el) => (<p key={el.department} className='border rounded p-2 text-center'>{el.department} - {formatCurrency(el.highestSalary)}</p>))}
                </div>
                <h3 className='mt-10 font-semibold'>Departments: </h3>
                <div className="grid grid-cols-4 gap-6 mt-5">
                    {uniqueDepartments.map((el) => (<p key={el} className='border rounded p-2 text-center'>{el}</p>))}
                </div>
                <h3 className='mt-10 font-semibold'>Employees By Departments: </h3>
                <div className="grid grid-cols-4 gap-6 mt-5">
                    {Object.entries(groupByDepartment).map(([department, employees]) => (
                        <div key={department}>
                            <h3 className='text-xl'>{department}</h3>
                            {employees.map((emp) => <p key={emp.name}>{emp.name} - {formatCurrency(emp.salary)}</p>)}
                        </div>   
                    ))}
                </div>
            </>
        )}      
    </div>
  )
}

export default Statistics