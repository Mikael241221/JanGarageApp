import React, { use } from 'react'
import { useAuth } from '../../../Context/AuthContext'
import LoginForm from '../../components/LoginForm/LoginForm';
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu'
import EmployeeLists from '../../components/Admin/EmployeeLists/EmployeeLists';
const Employees = () => {
  // destructure the auth hoook
  const {isLogged, isAdmin} = useAuth();
  if(isLogged){
    if(isAdmin){
     return (
      <div>
        <div className='container-fluid admin-pages'>
          <div className='row'>
            <div className='col-md-3 admin-left-side'>
              <AdminMenu/>
            </div>
            <div className='col-md-9'>
             <EmployeeLists/>
              </div> 
          </div>
        </div>
      </div>
     ) 
    }else{
      return(
        <div>
          <h2>You are not authorize to access this page</h2>
        </div>
      )
    }
  }else{
    return(
      <LoginForm/>
    )
  }
}

export default Employees
