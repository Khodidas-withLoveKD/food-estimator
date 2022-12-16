package com.example.foodestimatorbackend.model.dto;

import com.example.foodestimatorbackend.constants.enums.Meal;
import com.example.foodestimatorbackend.model.entity.Food;

import java.util.List;
import java.util.Map;

public class MenuOfTheDay {
  Map<Meal, List<Food>> menuOfTheDay;
}
