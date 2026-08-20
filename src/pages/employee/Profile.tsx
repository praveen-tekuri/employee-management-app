import { useNavigate } from "react-router-dom";
import { useGlobalAuthContext } from "../../context/AuthContext"
import { useGlobalEmployee } from "../../context/EmployeeContext";
import type { Employee } from "../../data/models/employee.types";

const Profile = () => {
  const {employees, handleGetEmployee} = useGlobalEmployee();
  const employeeData = employees?.employeesData || [];
  const {user} = useGlobalAuthContext();
  const navigate = useNavigate();

  if(!user) return <h1>No User logged In</h1>;

  const profileData = employeeData.find((emp: Employee) => emp.id === user?.id);

  if(!profileData) return <h1>Profile Not found</h1>;
  
  const {name, gender, email, mobile, address, department, role, salary, skills}= profileData;
  
  const handleEditEmployee = (emp: Employee) => {
      handleGetEmployee(emp);
      navigate("/edit-employee");
  }
  
  return (
    <div>
        <h1>Profile</h1>
        <div className="border p-5 rounded w-[50%] mx-auto grid grid-cols-2">
          <div className="col">
            <p className="mb-3"><span className="font-semibold">Name: </span><span>{name}</span></p>
            <p className="mb-3"><span className="font-semibold">Gender:</span> <span>{gender}</span></p>
            <p className="mb-3"><span className="font-semibold">Email: </span><span>{email}</span></p>
            <p className="mb-3"><span className="font-semibold">Mobile:</span> <span>{mobile}</span></p>
            <p className="mb-3"><span className="font-semibold">Address: </span><span>{address}</span></p>
            <p className="mb-3"><span className="font-semibold">Department: </span><span>{department}</span></p>
            <p className="mb-3"><span className="font-semibold">Role: </span><span>{role}</span></p>
            <p className="mb-3"><span className="font-semibold">Salary: </span><span>{salary}</span></p>
            <p className="mb-3"><span className="font-semibold">Skills: </span><span>{skills.join(", ")}</span></p>
          </div>
          <div className="col justify-self-end">
            <button onClick={() => handleEditEmployee(profileData)} className="border rounded cursor-pointer p-2">Update Profile</button>
          </div>
        </div>
       
    </div>
  )
}

export default Profile