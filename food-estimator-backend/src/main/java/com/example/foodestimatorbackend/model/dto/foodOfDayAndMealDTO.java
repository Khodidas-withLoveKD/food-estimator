package com.example.foodestimatorbackend.model.dto;

import com.example.foodestimatorbackend.constants.enums.Category;
import com.example.foodestimatorbackend.constants.enums.Day;
import com.example.foodestimatorbackend.constants.enums.Meal;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class foodOfDayAndMealDTO {
  private Day day;
  private Meal meal;
  private Integer foodId;
  private String name;
  private String imgUrl;
  private Category category;
  private Float rating;
  private Integer personsRated;
}
