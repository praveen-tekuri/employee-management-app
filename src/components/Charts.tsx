import {BarChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Bar} from "recharts"
import { useGlobalEmployee } from "../context/EmployeeContext";

interface DepartmentSummary{
    department: string,
    count: number
}

type DepartmentAccumulator = Record<string, DepartmentSummary>

const Charts = () => {
  const {employees} = useGlobalEmployee();
  const employeeData = employees?.employeesData || [];

  const processEmployee = employeeData.reduce<DepartmentAccumulator>((acc, curr) => {
     if(!acc[curr.department]){
        acc[curr.department] = {department: curr.department, count: 1}
     }else{
        acc[curr.department].count++;
     }
     return acc;   
  },{})

  const departmentCount = Object.values(processEmployee);
 
  return (
    <div className='mt-10'>
        <div className="grid grid-cols-2 gap-6">
            <BarChart width={600} height={300} data={departmentCount}>
                <XAxis dataKey="department" stroke="#8884d8" />
                <YAxis />
                <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
                <Legend 
                    width={100}
                    wrapperStyle={{top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px',}}
                    />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="count" fill="#8884d8" barSize={30} />
            </BarChart>

            <BarChart width={600} height={300} data={employeeData}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis />
                <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
                <Legend 
                    width={100}
                    wrapperStyle={{top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px',}}
                    />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="salary" fill="#8884d8" barSize={30} />
            </BarChart>
        </div>
    </div>
  )
}

export default Charts