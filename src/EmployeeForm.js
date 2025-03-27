import { useState, useEffect } from "react";
import { setupEmployeeFormValidation, destroyEmployeeFormValidation } from "./Validation";
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
      setPhone(editingEmployee.phone);
    } else {
      setName('');
      setEmail('');
      setAddress('');
      setPhone('');
    }
  }, [editingEmployee]);
  // Hàm reset form
  const resetForm = () => {
    setName(''); setEmail(''); setAddress(''); setPhone('');
    // Xóa các thông báo lỗi nếu có
    const form = $("#employeeForm");
    if (form.length) {
      form.validate().resetForm();
      form.find('.is-invalid').removeClass('is-invalid');
      form.find('.invalid-feedback').remove();
    }
  };
  // Xử lý sự kiện modal
  useEffect(() => {
    const handleModalShow = () => {
      setupEmployeeFormValidation();
    };

    const handleModalHidden = () => {
      resetForm();
      destroyEmployeeFormValidation();
    };

    const modal = $("#employeeModal");
    modal.on("shown.bs.modal", handleModalShow);
    modal.on("hidden.bs.modal", handleModalHidden);

    return () => {
      modal.off("shown.bs.modal", handleModalShow);
      modal.off("hidden.bs.modal", handleModalHidden);
    };
  }, []);
  //Xử lý form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!$("#employeeForm").valid()) return; // Kiểm tra validation trước khi xử lý

    if (editingEmployee) {
      // Update
      onUpdate({
        ...editingEmployee,
        name,
        email,
        address,
        phone,
      });
    } else {
      // Add
      const newEmployee = {
        id: Date.now(), // Tạo ID tạm
        name,
        email,
        address,
        phone,
      };
      onAdd(newEmployee);
    }
    resetForm();
    $("#employeeModal").modal("hide"); // Đóng modal jquery
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
            <form id="employeeForm" onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <input type="text" className="form-control" name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input type="text" className="form-control" name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
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