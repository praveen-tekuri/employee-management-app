import type { Employee } from "../models/employee.types";

type EmployeeFormData = Omit<Employee, 'isActive'>

const employeesMockData:EmployeeFormData[] = [
  { id: 1, name: "John Doe", gender: "Male", email: "john@example.com", mobile: "1234567890", salary: 50000, role: "Developer", department: "IT", skills: ["React", "JavaScript"], address: "New York, USA" },
  { id: 2, name: "Jane Smith", gender: "Female", email: "jane@example.com", mobile: "0987654321", salary: 60000, role: "Designer", department: "UI/UX", skills: ["Figma", "CSS"], address: "London ,UK"}
]

export default employeesMockData;