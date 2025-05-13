import React, { useState } from 'react';
import employeeService from '../../../../services/employee.service';

function AddEmployeeForm(props) {
  const [employee_email, setEmail] = useState("");
  const [employee_first_name, setFirstName] = useState("");
  const [employee_last_name, setLastName] = useState("");
  const [employee_phone, setPhoneNumber] = useState("");
  const [employee_password, setPassword] = useState("");
  const [active_employee, setActiveEmployee] = useState(1);
  const [company_role_id, setCompany_role_id] = useState(1);

  //errors
  const [emailError, setEmailError] = useState("");
  const [firstNameRequired, setFirstNameRequired] = useState("");
  const [lastNameRequired, setLastNameRequired] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState("");
  const [serverError, setServerError] = useState("");
  const [companyRoleError, setCompanyRoleError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleSubmit = (e) => { 
    // Prevent the default form submission
    e.preventDefault();
    // handle client side validation
    let valid = true;//flag
    // first name is required
    if (!employee_first_name) {
      setFirstNameRequired("First name is required");
      valid = false;
    }
    else {
      setFirstNameRequired("");
    }
    // Email is required
    if (!employee_email) {
      setEmailError("Email is required");
      valid = false;
    }else if (!employee_email.includes("@")){
      setEmailError("Email is not valid");
      
    } else {
      const regex =/^\S+@\S+\.\S+$/;
      if (!regex.test(employee_email)) {
        setEmailError("Email is not valid");
        valid = false;
      } else {
        setEmailError("");
      }
    }
    // password has to be at least 6 characters long
    if (!employee_password || employee_password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      valid = false;
    }
    else {
      setPasswordError("");
    }
    if (!valid) {
      return;
    }
    const formData = {
     employee_email,
     employee_first_name,
     employee_last_name,
     employee_phone,
     employee_password,
     active_employee,
     company_role_id
    };
    // pass the form data to the service
    const newEmployee = employeeService.createEmployee(formData);
    newEmployee.then((Response)=>Response.json())
    .then((data) =>{
      if(data.error){
        setServerError(data.error)
      }else{
        setSuccess(true)
        setServerError('')


        setTimeout(() => {
          //window.location.href ='/admin/employees'
          window.location.href ='/'
        }, 2000);
      }
    })
    // handle catch
    .catch((error) =>{
      const resMessage = 
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString()
        setServerError(resMessage)
    })
  }

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Add a new employee</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit} >
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      {serverError && <div className="validation-error">{serverError}</div>}
                      <input type="email" value={employee_email} name="employee_email" onChange={(e) => setEmail(e.target.value)} placeholder="Employee email" />
                      {emailError && <div className="validation-error">{emailError}</div>}
                    </div>
                    <div className="form-group col-md-12">
                      <input type="text" value={employee_first_name} name="employee_first_name" onChange={(e) => setFirstName(e.target.value)} placeholder="Employee first name" />
                      {firstNameRequired && <div className="validation-error">{firstNameRequired}</div>}
                    </div>

                    <div className="form-group col-md-12">
                      <input type="text" value={employee_last_name} name="employee_last_name" onChange={(e) => setLastName(e.target.value)} placeholder="Employee last name" required />
                      {lastNameRequired && <div className="validation-error">{lastNameRequired}</div>}
                    </div>

                    <div className="form-group col-md-12">
                      <input type="text" value={employee_phone} name="employee_phone" onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Employee phone (555-555-5555)" required />
                      {phoneError && <div className="validation-error">{phoneError}</div>}
                    </div>

                    <div className="form-group col-md-12">
                      <select name="employee_role" className="custom-select-box" value={company_role_id} onChange={(e) => setCompany_role_id(e.target.value)}>

                        <option value="1">Employee</option>
                        <option value="2">Manager</option>
                        <option value="3">Admin</option>
                      </select>
                      {companyRoleError && <div className="validation-error">{companyRoleError}</div>}
                    </div>

                    <div className="form-group col-md-12">
                      <input type="password" name="employee_password" value={employee_password} onChange={(e) => setPassword(e.target.value)} placeholder="Employee password" />
                      {passwordError && <div className="validation-error">{passwordError}</div>}
                    </div>

                    <div className="form-group col-md-12">
                      <button className="theme-btn btn-style-one" type="submit" data-loading-text="Please wait..."><span>Add employee</span></button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AddEmployeeForm;