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
    private Integer id;

    @Column(name = "employee_id")
    private Integer employee_id;

    @Column(name = "meal")
    @Enumerated(EnumType.STRING)
    private Meal meal;

    @Column(name = "day")
    @Enumerated(EnumType.STRING)
    private Day day;
}
