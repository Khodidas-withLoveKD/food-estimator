package com.example.foodestimatorbackend.model.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Data
@Table(name = "employee")
public class Employee {

  @Id
  private int employee_id;

  @Column(name = "name")
  private String name;
}
