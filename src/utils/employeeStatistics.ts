
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

  interface EmployeeReducerResult {
       totalEmployees: number
       highestSalary: number,
       lowestSalary: number,
       totalSalaryPaid: number,
       activeEmployees: number,
       inActiveEmployees: number,
       averageSalary: number,
       departments: DepartmentSummary[]
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
            departments:[]
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

        if(!acc.departments[employee.department]){
            acc.departments[employee.department] = {department: employee.department, count: 1};
        }else{
            acc.departments[employee.department].count++;
        }

        return acc;
  },{
     highestSalary: -Infinity,
     lowestSalary: Infinity,
     totalSalaryPaid: 0,
     activeEmployees: 0,
     inActiveEmployees: 0,
     departments: {} as Record<string, DepartmentSummary>
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
  }
}

export default calculateEmployeeStatistics;