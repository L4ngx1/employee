import { useState, useEffect } from "react";
/* global $ */

function EmployeeForm({ onAdd, onUpdate, editingEmployee, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  // Mỗi khi editingEmployee thay đổi, nạp dữ liệu vào form
  useEffect(() => {
    if (editingEmployee) {
      setName(editingEmployee.name);
      setEmail(editingEmployee.email);
      setAddress(editingEmployee.address);
      setPhone(editingEmployee.phone)
    } else {
      setName('');
      setEmail('');
      setAddress('');
      setPhone('');
    }
  }, [editingEmployee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEmployee) {
      // Update
      onUpdate({
        ...editingEmployee,
        name,
        email,
        address,
        phone,
      });
      $("#employeeModal").modal("hide");//đóng modal jquery
    } else {
      // Add
      const newEmployee = {
        id: Date.now(), // Tạo ID tạm
        name,
        email,
        address,
        phone,
      }; onAdd(newEmployee);
      setName(''); setEmail(''); setAddress(''); setPhone('');
      $("#employeeModal").modal("hide");//đóng modal jquery
    }
  };

  return (
    <div className="modal fade" id="employeeModal" tabIndex="-1" aria-labelledby="employeeModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title" id="employeeModalLabel">
              {editingEmployee ? 'Edit Employee' : 'Add Employee'}
            </h5>
            <button type="button" onClick={onClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" name="name"
                  value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" name="email"
                  value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <input type="text" className="form-control" name="address"
                  value={address} onChange={(e) => setAddress(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input type="text" className="form-control" name="phone"
                  value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-primary w-100 " >
                {editingEmployee ? 'Edit' : 'Add'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default EmployeeForm;
