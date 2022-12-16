package com.example.foodestimatorbackend.model.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "employee")
public class Employee {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private int employee_id;

  @Column(name = "name")
  private String name;

  @Column(name = "is_admin")
  private Boolean is_admin;

}
