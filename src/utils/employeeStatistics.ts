
interface Employee {
  name: string;
  department: string;
  salary: number;
  isActive?: boolean
}

interface DepartmentStatistics {
  department: string;
  count: number;
  totalSalary: number;
  highestSalary: number;
}

interface EmployeeReducerResult {
  totalEmployees: number;
  highestSalary: number;
  lowestSalary: number;
  totalSalaryPaid: number;
  activeEmployees: number;
  inActiveEmployees: number;
  averageSalary: number;
  departments: DepartmentStatistics[];
  groupByDepartment: Record<string, Employee[]>;   
  uniqueDepartments: string[];
}

interface EmployeeStatsAccumulator{
  highestSalary: number;
  lowestSalary: number;
  totalSalaryPaid: number;
  activeEmployees: number;
  inActiveEmployees: number;
  departments: Record<string, DepartmentStatistics>
  groupByDepartment: Record<string, Employee[]>
}

function calculateEmployeeStatistics(employees:Employee[]): EmployeeReducerResult {

  if(!employees.length){
      return {
          totalEmployees: 0,
          highestSalary:0,
          lowestSalary:0,
          totalSalaryPaid:0,
          activeEmployees:0,
          averageSalary: 0,
          inActiveEmployees:0,
          departments:[],
          groupByDepartment: {},
          uniqueDepartments: []
      }
  }

  const stats = employees.reduce<EmployeeStatsAccumulator>((acc, employee) => {
      const salary = Number(employee.salary) || 0;
      
      acc.highestSalary = Math.max(acc.highestSalary, salary);
      acc.lowestSalary = Math.min(acc.lowestSalary, salary);
      acc.totalSalaryPaid += salary;

      if(employee.isActive){
          acc.activeEmployees++
      }else{
          acc.inActiveEmployees++
      }

      if(!acc.departments[employee.department]){
          acc.departments[employee.department] = {
              department: employee.department,
              count: 0,
              totalSalary: 0,
              highestSalary: -Infinity
          }
      }

      const departmentStats = acc.departments[employee.department];

      departmentStats.count++;
      departmentStats.totalSalary += salary;
      departmentStats.highestSalary = Math.max(departmentStats.highestSalary, salary);

      // Group Employees by Department
      acc.groupByDepartment[employee.department] ??= [];
      acc.groupByDepartment[employee.department].push(employee);

      return acc;
},{
   highestSalary: -Infinity,
   lowestSalary: Infinity,
   totalSalaryPaid: 0,
   activeEmployees: 0,
   inActiveEmployees: 0,
   departments: {},
   groupByDepartment: {},
});

const uniqueDepartments = Object.keys(stats.departments);

return {
    highestSalary: stats.highestSalary,
    lowestSalary: stats.lowestSalary,
    totalSalaryPaid: stats.totalSalaryPaid,
    activeEmployees: stats.activeEmployees,
    inActiveEmployees: stats.inActiveEmployees,
    departments: Object.values(stats.departments),
    totalEmployees: employees.length,
    averageSalary: stats.totalSalaryPaid / employees.length,
    groupByDepartment: stats.groupByDepartment,
    uniqueDepartments
}
}

export default calculateEmployeeStatistics;


// V1:

/*


  interface Employee {
    name: string;
    department: string;
    salary: number;
    isActive?: boolean
  }

  interface DepartmentSummary {
    department: string,
    count: number
  }

  interface SalaryByDept{
    department: string,
    totalSalary: number
  }

  interface HighestSalByDept{
    department: string,
    highestSalary: number,
  }

  interface EmployeeReducerResult {
       totalEmployees: number;
       highestSalary: number;
       lowestSalary: number;
       totalSalaryPaid: number;
       activeEmployees: number;
       inActiveEmployees: number;
       averageSalary: number;
       departments: DepartmentSummary[];
       groupByDepartment: Record<string, Employee[]>;
       totalSalaryByDepartment: SalaryByDept[];
       highestSalaryByDepartment: HighestSalByDept[];
  }

  function calculateEmployeeStatistics(employees:Employee[]): EmployeeReducerResult {

    if(!employees.length){
        return {
            totalEmployees: 0,
            highestSalary:0,
            lowestSalary:0,
            totalSalaryPaid:0,
            activeEmployees:0,
            averageSalary: 0,
            inActiveEmployees:0,
            departments:[],
            groupByDepartment: {},
            totalSalaryByDepartment: [],
            highestSalaryByDepartment: []
        }
    }

    const stats = employees.reduce((acc, employee) => {
        const salary = Number(employee.salary) || 0;
        
        acc.highestSalary = Math.max(acc.highestSalary, salary);
        acc.lowestSalary = Math.min(acc.lowestSalary, salary);
        acc.totalSalaryPaid += salary;

        if(employee.isActive){
            acc.activeEmployees++
        }else{
            acc.inActiveEmployees++
        }

        // Group employees by department and count them
        if(!acc.departments[employee.department]){
            acc.departments[employee.department] = {department: employee.department, count: 0};
        }
        acc.departments[employee.department].count++;
        
        // Group employees by department for detailed listing
        if(!acc.groupByDepartment[employee.department]){
            acc.groupByDepartment[employee.department] = []
        }
        acc.groupByDepartment[employee.department].push(employee);

        // Total Salary paid by Department
        acc.totalSalaryByDepartment[employee.department] ??= {department:employee.department, totalSalary: 0}
        acc.totalSalaryByDepartment[employee.department].totalSalary += salary;
        
        // Highest Salary by department
        acc.highestSalaryByDepartment[employee.department] ??= {department: employee.department, highestSalary: -Infinity};
        acc.highestSalaryByDepartment[employee.department].highestSalary = Math.max(acc.highestSalaryByDepartment[employee.department].highestSalary, salary)

        return acc;
  },{
     highestSalary: -Infinity,
     lowestSalary: Infinity,
     totalSalaryPaid: 0,
     activeEmployees: 0,
     inActiveEmployees: 0,
     departments: {} as Record<string, DepartmentSummary>,
     groupByDepartment: {} as Record<string, Employee[]>,
     totalSalaryByDepartment: {} as Record<string, SalaryByDept>,
     highestSalaryByDepartment: {} as Record<string, HighestSalByDept>
  });

  return {
      highestSalary: stats.highestSalary,
      lowestSalary: stats.lowestSalary,
      totalSalaryPaid: stats.totalSalaryPaid,
      activeEmployees: stats.activeEmployees,
      inActiveEmployees: stats.inActiveEmployees,
      departments: Object.values(stats.departments),
      totalEmployees: employees.length,
      averageSalary: stats.totalSalaryPaid / employees.length,
      groupByDepartment: stats.groupByDepartment,
      totalSalaryByDepartment: Object.values(stats.totalSalaryByDepartment),
      highestSalaryByDepartment: Object.values(stats.highestSalaryByDepartment)
  }
}

export default calculateEmployeeStatistics;

*/


// V2: Map and Set

/*
  interface Employee {
    name: string;
    department: string;
    salary: number;
    isActive?: boolean
  }

  interface DepartmentStatistics {
    department: string;
    count: number;
    totalSalary: number;
    highestSalary: number;
  }

  interface EmployeeReducerResult {
    totalEmployees: number;
    highestSalary: number;
    lowestSalary: number;
    totalSalaryPaid: number;
    activeEmployees: number;
    inActiveEmployees: number;
    averageSalary: number;
    departments: DepartmentStatistics[];
    groupByDepartment: Map<string, Employee[]>;   
    uniqueDepartments: string[];
  }

  interface EmployeeStatsAccumulator{
    highestSalary: number;
    lowestSalary: number;
    totalSalaryPaid: number;
    activeEmployees: number;
    inActiveEmployees: number;
    departments: Map<string, DepartmentStatistics>
    groupByDepartment: Map<string, Employee[]>
    uniqueDepartments: Set<string>
  }

  function calculateEmployeeStatistics(employees:Employee[]): EmployeeReducerResult {

    if(!employees.length){
        return {
            totalEmployees: 0,
            highestSalary:0,
            lowestSalary:0,
            totalSalaryPaid:0,
            activeEmployees:0,
            averageSalary: 0,
            inActiveEmployees:0,
            departments:[],
            groupByDepartment: new Map(),
            uniqueDepartments: []
        }
    }

    const stats = employees.reduce<EmployeeStatsAccumulator>((acc, employee) => {
        const salary = Number(employee.salary) || 0;
        
        acc.highestSalary = Math.max(acc.highestSalary, salary);
        acc.lowestSalary = Math.min(acc.lowestSalary, salary);
        acc.totalSalaryPaid += salary;

        if(employee.isActive){
            acc.activeEmployees++
        }else{
            acc.inActiveEmployees++
        }

        // Set - unique departments
        acc.uniqueDepartments.add(employee.department);

        // Map - department statistics
        if(!acc.departments.has(employee.department)){
          acc.departments.set(employee.department, {
            department: employee.department,
            count: 0,
            totalSalary: 0,
            highestSalary: -Infinity
          })
        }

        const departmentStats = acc.departments.get(employee.department)!;

        departmentStats.count++;
        departmentStats.totalSalary+= salary;
        departmentStats.highestSalary = Math.max(departmentStats.highestSalary, salary);

        // Map - employees by department
        if(!acc.groupByDepartment.has(employee.department)){
          acc.groupByDepartment.set(employee.department, []);
        }
        acc.groupByDepartment.get(employee.department)?.push(employee);

        return acc;
  },{
     highestSalary: -Infinity,
     lowestSalary: Infinity,
     totalSalaryPaid: 0,
     activeEmployees: 0,
     inActiveEmployees: 0,
     departments: new Map(),
     groupByDepartment: new Map(),
     uniqueDepartments: new Set()
  });

  return {
      highestSalary: stats.highestSalary,
      lowestSalary: stats.lowestSalary,
      totalSalaryPaid: stats.totalSalaryPaid,
      activeEmployees: stats.activeEmployees,
      inActiveEmployees: stats.inActiveEmployees,
      departments: Array.from(stats.departments.values()),
      totalEmployees: employees.length,
      averageSalary: stats.totalSalaryPaid / employees.length,
      groupByDepartment: stats.groupByDepartment,
      uniqueDepartments: Array.from(stats.uniqueDepartments)
  }
}

export default calculateEmployeeStatistics;

*/