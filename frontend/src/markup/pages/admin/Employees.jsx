import React, { use } from 'react'
import { useAuth } from '../../../Context/AuthContext'
import LoginForm from '../../components/LoginForm/LoginForm';
const Employees = () => {
  // destructure the auth hoook
  const {isLogged, isAdmin} = useAuth();
  if(isLogged){
    if(isAdmin){
     return (
      <div>
        <h2>Employee page</h2>
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
