package com.example.foodestimatorbackend.model.dto;

import com.example.foodestimatorbackend.constants.enums.Category;
import com.example.foodestimatorbackend.constants.enums.Day;
import com.example.foodestimatorbackend.constants.enums.Meal;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Id;

@Data
//@NoArgsConstructor
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

//  public foodOfDayAndMealDTO(Day day, Meal meal, Integer foodId, String name, String imgUrl,
//                             Category category, Float rating, Integer personsRated) {
//    this.day = day;
//    this.meal = meal;
//    this.foodId = foodId;
//    this.name = name;
//    this.imgUrl = imgUrl;
//    this.category = category;
//    this.rating = rating;
//    this.personsRated = personsRated;
//  }
}
