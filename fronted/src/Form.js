import React, { useState } from 'react'
import './frm.css'
import axios from 'axios'

const Form = () => {
    const [name,setName]=useState('')
    const [email, setEmail]=useState('')
    const [phone, setPhone]=useState('')
    const [dob, setDob]=useState('')
    const [nameauth,setNameauth]=useState('')
    const [dobauth,setDobauth]=useState('')
    const [emailauth,setEmailauth]=useState('')

    const handleName=(event)=>{
        setName(event.target.value)
    }
    const handleEmail=(e)=>{
        setEmail(e.target.value)
    }
    const handlePhone=(e)=>{
        setPhone(e.target.value)
    }
    const handleDob=(e)=>{
        setDob(e.target.value)
    }
    const handleSubmit=(event)=>{
        event.preventDefault()
        
        if(name.length==0)
       
        {
            setNameauth(name + 'Name is required')
        }
        else if(name.length<4 || name.length>16)
        {
            
        
            setNameauth('name should be minimum 4 character and maximum 16 character')
        
        }
        const date=new Date()
        const year=date.getFullYear();
        const manAge=dob.slice(0,4);
        const ageDif= manAge-year;

        if(ageDif<18){
            setDobauth('age should be greater than aur equal than 18')
        }
        if(!emailauth.includes('@')){
            setEmailauth('Enter correct email')
        }


        

        axios.post('http://localhost:9090/sendemail',{
            name:name
        })
      
        event.preventDefault()

        

    }
    
    return (
        <>
        <form onSubmit={handleSubmit} className="frm">
            <div>
                <label>Name</label>
              
                <input
                type="text"
                required
                placeholder="Enter name"
                value={name}
                onChange={handleName}
                
                 />
                 <p >{nameauth}</p>
            </div>
            <div>
                <label>Date of Birth</label>
         
                <input
                type="date"
                placeholder="Enter date of birth"
                value={dob}
                onChange={handleDob}
                
                 />
                  <p >{dobauth}</p>
            </div>
            <div>
                <label>Email</label>
             
                <input
                type="email"
                placeholder="Enter name"
                value={email}
                onChange={handleEmail}
                
                 />
                  <p >{emailauth}</p>
            </div>
            <div>
                <label>Phone Number</label>
           
                <input
                type="number"
                placeholder="Enter phone number"
                value={phone}
                onChange={handlePhone}
                
                 />
            </div>
            <button type="submit">submit</button>
        </form>
        </>
    )
}

export default Form
