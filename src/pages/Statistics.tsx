import Charts from '../components/Charts';
import { useGlobalEmployee } from '../context/EmployeeContext'

const Statistics = () => {
  const {employees} = useGlobalEmployee();

  const employeesData = employees?.employeesData || [];
  
  const processEmployees = employeesData.reduce((acc, curr) => {
        const currentSalary = Number(curr.salary) || 0;
        return {
            highestSalary: Math.max(acc.highestSalary, currentSalary),
            lowestSalary: Math.min(acc.lowestSalary, currentSalary),
            totalSalaryPaid: acc.totalSalaryPaid + currentSalary,
            activeEmployees: curr.isActive ? acc.activeEmployees + 1: acc.activeEmployees,
            inActiveEmployees: !curr.isActive ? acc.inActiveEmployees + 1: acc.inActiveEmployees,
        }
  },{
     highestSalary: -Infinity,
     lowestSalary: Infinity,
     totalSalaryPaid: 0,
     activeEmployees: 0,
     inActiveEmployees: 0,
  })

  const {highestSalary, lowestSalary,  totalSalaryPaid, activeEmployees, inActiveEmployees} = processEmployees;

  const formattedHighest = highestSalary === -Infinity ? 0 : highestSalary;
  const formattedLowest = lowestSalary === Infinity ? 0: lowestSalary;
  const averageSalary = employeesData.length > 0 ? totalSalaryPaid / employeesData.length : 0;

  return (
    <div>
        <h1>Employee Statistics</h1>
        <div className="grid grid-cols-2 gap-6 w-[60%] mx-auto">
            <div className='card p-4 rounded border text-center'>
                <p className='text-2xl mb-2'>Total Employees</p>
                <p className='text-xl'>{employeesData.length}</p>
            </div>
            <div className='card p-4 rounded border text-center'>
                <p className='text-2xl mb-2'>Highest Salary</p>
                <p className='text-xl'>{formattedHighest}</p>
            </div>
            <div className='card p-4 rounded border text-center'>
                <p className='text-2xl mb-2'>Lowest Salary</p>
                <p className='text-xl'>{formattedLowest}</p>
            </div>
            <div className='card p-4 rounded border text-center'>
                <p className='text-2xl mb-2'>Total Salary Paid</p>
                <p className='text-xl'>{totalSalaryPaid}</p>
            </div>
            <div className='card p-4 rounded border text-center'>
                <p className='text-2xl mb-2'>Average Salary</p>
                <p className='text-xl'>{averageSalary.toFixed(2)}</p>
            </div>
            <div className='card p-4 rounded border text-center'>
                <p className='text-2xl mb-2'>Active Employees</p>
                <p className='text-xl'>{activeEmployees}</p>
            </div>
            <div className='card p-4 rounded border text-center'>
                <p className='text-2xl mb-2'>In-Active Employees</p>
                <p className='text-xl'>{inActiveEmployees}</p>
            </div>
        </div>
        <Charts/>
    </div>
  )
}

export default Statistics