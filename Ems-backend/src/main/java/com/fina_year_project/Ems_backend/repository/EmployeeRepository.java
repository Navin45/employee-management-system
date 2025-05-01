package com.fina_year_project.Ems_backend.repository;

import com.fina_year_project.Ems_backend.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {


}
