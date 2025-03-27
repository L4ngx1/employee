import "./App.css";
import { useState } from "react";
import EmployeeForm from "./EmployeeForm";

function App() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  //Hàm thêm
  const handleAddEmployee = (employee) => {
    setEmployees([...employees, employee]);
  };
  // Hàm cập nhật
  const handleUpdateEmployee = (updatedEmployee) => {
    const newList = employees.map(b =>
      b.id === updatedEmployee.id ? updatedEmployee : b
    );
    setEmployees(newList);
    setEditingEmployee(null); // Thoát chế độ sửa
  };
  // Khi bấm nút "Sửa"
  const handleEditClick = (employee) => {
    setEditingEmployee(employee);
  };
  //Hàm xóa
  const handleDeleteEmployee = (id) => {
    const newList = employees.filter(b => b.id !== id);
    setEmployees(newList);
  };
  
  const handleCloseEmployeeForm = () => {
    setEditingEmployee(null); // Reset về chế độ thêm
  };
  
  return (
    <div className="app d-flex flex-column min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand fs-3 ms-3" href="/">Manage Employees</a>
          <ul className="navbar-nav justify-content-end ">
            <li className="nav-item me-2 me-lg-3">
              <button type="button" className="btn btn-danger w-100">Delete</button>
            </li>
            <li className="nav-item">
              <button type="button" className="btn btn-success w-100" data-bs-toggle="modal" data-bs-target="#employeeModal">
                Add Employee
              </button>
              <EmployeeForm
                onAdd={handleAddEmployee}
                onUpdate={handleUpdateEmployee}
                editingEmployee={editingEmployee}
                onClose={handleCloseEmployeeForm}
              />
            </li>
          </ul>
        </div>
      </nav>

      <div id="body" className="flex-grow-1">
        <div className="container-fluid">
          <table className="table table-striped table-hover table-responsive text-center">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">Phone</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <th scope="row"><input type="checkbox" className="checkbox" /></th>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.address}</td>
                  <td>{emp.phone}</td>
                  <td>
                    <i type="button" data-bs-toggle="modal" data-bs-target="#employeeModal"
                      className="fa-solid fa-pen fa-lg me-4" style={{ color: "#FFD43B" }}
                      onClick={() => handleEditClick(emp)}>
                    </i>
                    <i type="button"
                      className="fa-solid fa-trash fa-lg" style={{ color: "#ff0000" }}
                      onClick={() => handleDeleteEmployee(emp.id)}>
                    </i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div id="footer" className="bg-light mt-auto">
        <nav className="me-4">
          <ul className="pagination justify-content-end">
            <li className="page-item"><a className="page-link" href="/" tabIndex="-1">Previous</a></li>
            <li className="page-item active"><a className="page-link" href="/">1</a></li>
            <li className="page-item"><a className="page-link" href="/">2</a></li>
            <li className="page-item"><a className="page-link" href="/">3</a></li>
            <li className="page-item"><a className="page-link" href="/">Next</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default App;
