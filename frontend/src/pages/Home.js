import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../utils'
import {ToastContainer} from 'react-toastify'

function Home() {
  const [LoggedInUser,setLoggedInUser]=useState('')
  const [products,setProducts]=useState('')

  const navigate=useNavigate()

  useEffect(()=>{
    setLoggedInUser(localStorage.getItem('logedInUser'))
  },[])

const handleLogout=(e)=>{
  localStorage.removeItem('token')
  localStorage.removeItem('logedInUser')
  handleSuccess('User Logout...')
  setTimeout(()=>{
    navigate('/login')
  },1000)
}

const fetchProduct=async()=>{
  try{
    const url="https://login-mern-app-api.vercel.app/products"
    const headers={
      headers:{
        'Authorization':localStorage.getItem('token')
      }
    }
    const response=await fetch(url,headers)
    const result=await response.json()
    console.log(result)
    setProducts(result)

  }catch(err){
    handleError(err)
  }
}

useEffect(()=>{
  fetchProduct()
},[])

  return (
    <div>
      <h1>{LoggedInUser}</h1>
      <button onClick={handleLogout}>logout</button>
      <div>
        {
          products && products?.map((item,index)=>(
            <ul key={index}>
              <span>{item.name}:{item.price}</span>
            </ul>
          ))
        }
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Home

