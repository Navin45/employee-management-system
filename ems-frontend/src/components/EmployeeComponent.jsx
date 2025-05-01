import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'
import './EmployeeComponent.css';

const EmployeeComponent = () => {

    const[firstName, setFirstName] = useState('')
    const[lastName, setLastName] = useState('')
    const[email,setEmail] = useState('')

    const {id} = useParams();
    const[errors, setErrors] = useState({ firstName:'', lastName:'', email:'' })
    const navigator = useNavigate();

    useEffect(() =>{
        if(id){
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error => console.error(error))
        }
    }, [id])

    function handleFirstName(e){ setFirstName(e.target.value) }
    function handleLastName(e){ setLastName(e.target.value) }
    function handleEmail(e){ setEmail(e.target.value) }

    function saveOrUpdateEmployee(e){
        e.preventDefault();
        if(validateForm()){
            const employee = {firstName, lastName, email}
            if(id){
                updateEmployee(id, employee).then(() => navigator('/employees')).catch(error => console.error(error))
            } else {
                createEmployee(employee).then(() => navigator('/employees')).catch(error => console.error(error))
            }
        }
    }

    function validateForm(){
        let valid = true;
        const errorsCopy = {...errors}
        if(firstName.trim()){ errorsCopy.firstName ='' } else { errorsCopy.firstName ='First name is required'; valid = false }
        if(lastName.trim()){ errorsCopy.lastName ='' } else { errorsCopy.lastName ='Last name is required'; valid = false }
        if(email.trim()){ errorsCopy.email ='' } else { errorsCopy.email ='Email is required'; valid = false }
        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle(){
        return id ? <h2 className='text-center mb-4'>Update Employee</h2> : <h2 className='text-center mb-4'>Add Employee</h2>
    }

    return (
        <div className='background'>
            <div className='container d-flex justify-content-center align-items-center min-vh-100'>
                <div className='card custom-card p-4'>
                    { pageTitle() }
                    <form>
                        <div className='form-group mb-3'>
                            <label className='form-label'>First Name:</label>
                            <input 
                                type="text"
                                placeholder='Enter Employee First Name'
                                name='firstName'
                                value={firstName}
                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                onChange={handleFirstName}
                            />
                            {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                        </div>
                        <div className='form-group mb-3'>
                            <label className='form-label'>Last Name:</label>
                            <input 
                                type="text"
                                placeholder='Enter Employee Last Name'
                                name='lastName'
                                value={lastName}
                                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                onChange={handleLastName}
                            />
                            {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                        </div>
                        <div className='form-group mb-4'>
                            <label className='form-label'>Email:</label>
                            <input 
                                type="email"
                                placeholder='Enter Employee Email'
                                name='email'
                                value={email}
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                onChange={handleEmail}
                            />
                            {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                        </div>

                        <button className='btn btn-primary w-100' onClick={saveOrUpdateEmployee}>
                            {id ? 'Update' : 'Save'} Employee
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EmployeeComponent;
