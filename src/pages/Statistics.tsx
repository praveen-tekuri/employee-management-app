import CustomBarChart from '../components/CustomBarChart';
import { useGlobalEmployee } from '../context/EmployeeContext'

interface DepartmentSummary {
    department: string,
    count: number
}

interface EmployeeReducerResult {
     highestSalary: number,
     lowestSalary: number,
     totalSalaryPaid: number,
     activeEmployees: number,
     inActiveEmployees: number,
     departments: Record<string, DepartmentSummary>
}

const Statistics = () => {
  const {employees} = useGlobalEmployee();

  const employeesData = employees?.employeesData || [];
  
  const processEmployees = employeesData.reduce<EmployeeReducerResult>((acc, curr) => {
        const currentSalary = Number(curr.salary) || 0;
        
        acc.highestSalary = Math.max(acc.highestSalary, currentSalary);
        acc.lowestSalary = Math.min(acc.lowestSalary, currentSalary);
        acc.totalSalaryPaid += currentSalary;
        acc.activeEmployees += curr.isActive ? 1: 0;
        acc.inActiveEmployees += !curr.isActive ? 1: 0;

        if(!acc.departments[curr.department]){
            acc.departments[curr.department] = {department: curr.department, count: 1};
        }else{
            acc.departments[curr.department].count++;
        }

        return acc;
  },{
     highestSalary: -Infinity,
     lowestSalary: Infinity,
     totalSalaryPaid: 0,
     activeEmployees: 0,
     inActiveEmployees: 0,
     departments: {}
  })

  const {highestSalary, lowestSalary,  totalSalaryPaid, activeEmployees, inActiveEmployees, departments} = processEmployees;
  const averageSalary = employeesData.length > 0 ? totalSalaryPaid / employeesData.length : 0;

  const formattedHighest = highestSalary === -Infinity ? 0 : highestSalary;
  const formattedLowest = lowestSalary === Infinity ? 0: lowestSalary;
  const formattedAverageSalary = new Intl.NumberFormat("en-In", {style: 'currency', currency: 'INR'}).format(averageSalary);
  
  const departmentsCount = Object.values(departments);
  
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
                <p className='text-xl'>{formattedAverageSalary}</p>
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
        <div className="grid grid-cols-2 gap-6 mt-10">
            <CustomBarChart data = {departmentsCount} xKey="department" yKey="count"/>
            <CustomBarChart data = {employeesData} xKey="name" yKey="salary"/>
        </div>
    </div>
  )
}

export default Statistics