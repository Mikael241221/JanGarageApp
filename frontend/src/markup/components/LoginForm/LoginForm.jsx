import React, { useState } from 'react';
import {useNavigate, useLocation} from 'react-router-dom'

function LoginForm(props) {

 const navigate = useNavigate();
 const location = useLocation();
 const [employee_email, setEmail] = useState('')
 const [employee_password, setPassword] = useState('')
 const [emailError, setEmailError] = useState('')
 const [passwordError, setPasswordError] = useState('')
 const [serverError, setServerError] = useState('')

 const handleSubmit  = (e) =>{
  // prevent the default submission
  e.preventDefault();
  // handle client side validation 
  let valid = true;
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

    // handle form submission
    const formData = {
      employee_email,
      employee_password
    }
    console.log(formData);
     
    // pass the form to the service
    const loginEmployee = loginService.logIn(formData)
    newLogin.then((response) => response.json())
    .then ((response) =>{
      console.log(response);
      if(response.status ==="success"){
        // save the user into the local storage
        if (response.data.employee_token){
          console.log(response.data)
          localStorage.setItem("employee",JSON.stringify(response.data, loginEmployee))
        }
        // redirect the user to the dashboard
        //navigate('/admin')
        console.log(location);
        if(location.pathname === '/login'){
          //navigate('/admin')
          // window.location.replace('/admin')
          // to home for now
          window.location.replace('/')

        } else{
          window.location.reload()
        }
        
      }
      else{
          // show the error
          setServerError(response.message)
        }
    })
    .catch((err) => {
      console.log(err)
      setServerError('an error has occured please try again later.')

    })


 }
 

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Login to your account</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
              <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                       {serverError && <div className="validation-error">{serverError}</div>}
                      <input type="email" value={employee_email} name="employee_email" onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
                      {emailError && <div className="validation-error">{emailError}</div>}
                    </div>
                    <div className="form-group col-md-12">
                      <input type="password" value={employee_password} name="employee_password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                      {passwordError && <div className="validation-error">{passwordError}</div>}
                    </div>
                    <div className="form-group col-md-12">
                      <button className="theme-btn btn-style-one" type="submit" data-loading-text="Please wait..."><span>Login</span></button>
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

export default LoginForm;