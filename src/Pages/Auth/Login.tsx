import { useState } from 'react'
import chgLogo from '../../assets/chg-app.svg'
import LoginForm from './LoginForm'
// import './App.css'

function Login() {

  return (
    <div className="App h-full shadow-inner relative">
      <div className="flex flex-col text-center items-center justify-evenly h-full">

        <div className='flex flex-col justify-center items-center min-h-[400px]'>
          <a href="https://clinicahospitalguadalupe.com" className='flex flex-col items-center' target="_blank">
            <img src={chgLogo} className="max-w-xs w-8/12" alt="CHG APP logo" />
            <h1 className='text-2xl font-bold text-purple-700'>CHG<br /> App</h1>
          </a>
        </div>
        <div className="max-w-4xl w-10/12 h-[50%] flex justify-center items-center">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default Login
