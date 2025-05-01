import React, { useEffect, useState } from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'
import './EmployeeComponent.css';

const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, [])

    function getAllEmployees() {
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewEmployee() {
        navigator('/add-employee');
    }

    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`);
    }

    function removeEmployee(id) {
        deleteEmployee(id).then(() => {
            getAllEmployees();
        }).catch(error => {
            console.error(error);
        })
    }

    return (
        <div className='background'>
            <div className='container py-5'>
                <div className='card custom-card p-4'>
                    <h2 className='text-center mb-4'>Employee Directory</h2>
                    <div className='d-flex justify-content-end mb-3'>
                        <button className='btn btn-success' onClick={addNewEmployee}>
                            Add Employee
                        </button>
                    </div>
                    <div className='table-responsive'>
                        <table className='table table-striped table-hover'>
                            <thead className='table-dark'>
                                <tr>
                                    <th>ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    employees.map(employee => (
                                        <tr key={employee.id}>
                                            <td>{employee.id}</td>
                                            <td>{employee.firstName}</td>
                                            <td>{employee.lastName}</td>
                                            <td>{employee.email}</td>
                                            <td>
                                                <button 
                                                    className='btn btn-primary btn-sm me-2'
                                                    onClick={() => updateEmployee(employee.id)}>
                                                    Update
                                                </button>
                                                <button 
                                                    className='btn btn-danger btn-sm'
                                                    onClick={() => removeEmployee(employee.id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListEmployeeComponent;
