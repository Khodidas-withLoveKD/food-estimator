package com.example.foodestimatorbackend.model.entity;

import com.example.foodestimatorbackend.constants.enums.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "food")
@AllArgsConstructor
@NoArgsConstructor
public class Food {
  @Id
  @GeneratedValue(strategy =  GenerationType.AUTO)
  @Column(name = "food_id")
  private Integer foodId;

  @Column(name = "img_url")
  private String imgUrl;
  private String name;
  @Enumerated(EnumType.STRING)
  private Category category;
  private Float rating;
  @Column(name = "persons_rated")
  private Integer personsRated;

  @Column(name = "food_description")
  private String foodDescription;

  @Column(name = "created_at")
  private LocalDateTime createdAt;
}
