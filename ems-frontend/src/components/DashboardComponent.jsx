import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardComponent.css';

const DashboardComponent = () => {
    const navigator = useNavigate();

    function viewEmployees() {
        navigator('/employees');
    }

    function addEmployee() {
        navigator('/add-employee');
    }

    return (
        <div className="dashboard-container">
            <div className="glass-card">
                <h1>Welcome to Employee Management System</h1>
                <p>Manage your employees easily and efficiently.</p>
                <div className="dashboard-buttons">
                    <button className="btn-primary" onClick={viewEmployees}>View Employees</button>
                    <button className="btn-success" onClick={addEmployee}>Add Employee</button>
                </div>
            </div>
            <footer>All Copyright © 2025 Reserved By Navin Singh</footer>
        </div>
    );
};

export default DashboardComponent;
