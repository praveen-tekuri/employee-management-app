import { useMemo, useState } from 'react';
import EmployeeRow from '../../../../components/shared/EmployeeRow'
import { useGlobalEmployee } from '../../../../context/EmployeeContext';

const Employees = () => {
    const [term, setTerm] = useState("");
    const [sortBy, setSortBy] = useState("");
    
    const {employees: {employeesData}} = useGlobalEmployee();

    const filteredEmployees = useMemo(() => employeesData.filter((emp) => 
        [emp.name, emp.gender, emp.role, emp.skills.join(" ")].join(" ").toLowerCase().includes(term.toLowerCase())
    ),[employeesData, term]);

  const sortAndFilteredEmployees = useMemo(() => [...filteredEmployees].sort((a, b) => {
    if(sortBy === "name-asc"){
        return a.name.localeCompare(b.name)
    }else if(sortBy === "name-desc"){
        return b.name.localeCompare(a.name);
    }else if(sortBy === "salary-asc"){
        return a.salary - b.salary;
    }else if(sortBy === "salary-desc"){
        return b.salary - a.salary;
    }
    return 0;
  }),
  [filteredEmployees, sortBy])

  if(employeesData.length < 1) return <h1>No Employees Found</h1>
  
  return (
    <div>
        <h1>Employees</h1>
        <div className="my-5 grid grid-cols-2 gap-6">
            <div className="filter-employees">
                <input value={term} onChange={(e) => setTerm(e.target.value)} type="text" className='border rounded p-2 w-full' placeholder='Search Employee...' />
            </div>
            <div className="sort">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} name="sortBy" id="sortBy" className='border rounded p-2 w-full'>
                    <option value="">Sort By</option>
                    <option value="name-asc">Name (A - Z)</option>
                    <option value="name-desc">Name (Z - A)</option>
                    <option value="salary-asc">Salary (Low to High)</option>
                    <option value="salary-desc">Salary (High to Low)</option>
                </select>
            </div>
        </div>
        <div className="w-full overflow-x-auto">
            <table className='w-full min-w-200'>
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
                    {sortAndFilteredEmployees.map((employee) => (
                        <EmployeeRow key={employee._id} employee={employee}/>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Employees