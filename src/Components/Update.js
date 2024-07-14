import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Update() {
    const navigate = useNavigate();
  return (
    <div style={{margin:40}}>
      <h3>You will be re-directed to Product List. Please select product from product list first!!</h3>
      <button className='button' onClick={()=>{navigate('/')}}>Click here</button>
    </div>
  )
}
