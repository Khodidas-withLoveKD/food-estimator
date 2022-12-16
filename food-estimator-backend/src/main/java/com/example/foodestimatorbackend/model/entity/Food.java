package com.example.foodestimatorbackend.model.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "food")
public class Food {
  @Id
  @GeneratedValue(strategy =  GenerationType.AUTO)
  private Integer foodId;

  private String imgUrl;
  private String name;
  private
}
