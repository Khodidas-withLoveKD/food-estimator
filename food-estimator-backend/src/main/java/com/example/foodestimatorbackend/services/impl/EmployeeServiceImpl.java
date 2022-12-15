package com.example.foodestimatorbackend.services.impl;

import com.example.foodestimatorbackend.model.entity.Employee;
import com.example.foodestimatorbackend.repository.EmployeeRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;

@Slf4j
@Service
public class EmployeeServiceImpl {
  @Autowired
  private EmployeeRepository employeeRepository;

  @PostConstruct
  private void testDBConnection() {
    List<Employee> listOfEmployees = employeeRepository.findAll();
    log.info("listOfEmployees = " + listOfEmployees);
  }
}
