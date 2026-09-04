
type Gender = "male" | "female" | "others";
type Role = "admin" | "employee";
type Department = "IT" | "HR" | "Finance";

export interface Employee{
    _id: number | string;
    name: string;
    gender: Gender;
    email: string;
    mobile: string;
    address: string;
    department: Department;
    skills: string[];
    salary: number;
    role: Role;
    isActive: boolean;
}