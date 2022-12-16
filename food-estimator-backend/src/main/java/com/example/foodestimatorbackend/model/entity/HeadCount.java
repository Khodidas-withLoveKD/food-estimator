package com.example.foodestimatorbackend.model.entity;

import com.example.foodestimatorbackend.constants.enums.Day;
import com.example.foodestimatorbackend.constants.enums.Meal;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "head_count")
public class HeadCount {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "employee_id")
    private int employee_id;

    @Column(name = "meal")
    private Meal meal;

    @Column(name = "day")
    private Day day;
}
