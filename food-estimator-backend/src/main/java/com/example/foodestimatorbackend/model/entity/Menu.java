package com.example.foodestimatorbackend.model.entity;

import com.example.foodestimatorbackend.constants.enums.Day;
import com.example.foodestimatorbackend.constants.enums.Meal;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "menu")
public class Menu {
  @Id
  @GeneratedValue(strategy =  GenerationType.AUTO)
  private Integer id;
  @Enumerated(EnumType.STRING)
  private Day day;
  @Enumerated(EnumType.STRING)
  private Meal meal;
  @Column(name = "food_id")
  private Integer foodId;
}
