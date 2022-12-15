package com.example.foodestimatorbackend.services.impl;

import com.example.foodestimatorbackend.model.entity.Employee;
import com.example.foodestimatorbackend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.annotation.PostConstruct;
import java.util.List;

public class EmployeeServiceImpl {
  @Autowired
  EmployeeRepository employeeRepository;

  @PostConstruct
  public void testDBConnection() {
    List<Employee> listOfEmployees = employeeRepository.findAll();
    System.out.println("listOfEmployees = " + listOfEmployees);
  }
}
