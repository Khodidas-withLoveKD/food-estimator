package com.example.foodestimatorbackend.model.dto;


import com.example.foodestimatorbackend.constants.enums.Day;
import com.example.foodestimatorbackend.constants.enums.Meal;
import com.example.foodestimatorbackend.model.entity.Food;

import java.util.List;
import java.util.Map;

public class MenuOfTheWeek {
  Map<Day, Map<Meal, List<Food>>> menuOfTheWeek;
}
