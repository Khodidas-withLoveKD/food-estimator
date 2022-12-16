package com.example.foodestimatorbackend.services.impl;

import com.example.foodestimatorbackend.constants.enums.Day;
import com.example.foodestimatorbackend.constants.enums.Meal;
import com.example.foodestimatorbackend.model.dto.MenuOfTheWeek;
import com.example.foodestimatorbackend.model.dto.foodOfDayAndMealDTO;
import com.example.foodestimatorbackend.model.entity.Food;
import com.example.foodestimatorbackend.model.request.SelectionRequest;
import com.example.foodestimatorbackend.model.response.Response;
import com.example.foodestimatorbackend.repository.EmployeeRepository;
import com.example.foodestimatorbackend.repository.HeadCountRepository;
import com.example.foodestimatorbackend.services.EmployeeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Slf4j
@Service
public class EmployeeServiceImpl implements EmployeeService {
  @Autowired
  private EmployeeRepository employeeRepository;

  @Autowired
  private HeadCountRepository headCountRepository;

  @Override
  @Transactional
  public Response addSelection(int employee_id, SelectionRequest selectionRequest)
  {
    log.info("SelectionRequest:{}",selectionRequest);
    Response response = new Response<>();

    try {
      headCountRepository.deleteFromHeadCount(employee_id);

      if (Objects.nonNull(selectionRequest.getBreakfast())) {
        ArrayList<String> breakfast = selectionRequest.getBreakfast();

        for(int i=0;i<breakfast.size();i++) {
          if (breakfast.get(i) == "Monday")
          {
            headCountRepository.insertIntoHeadCount(employee_id, Meal.BREAKFAST, Day.MON);
          }
          else if (breakfast.get(i) == "Tuesday")
          {
            headCountRepository.insertIntoHeadCount(employee_id, Meal.BREAKFAST, Day.TUE);
          }
          else if (breakfast.get(i) == "Wednesday")
          {
            headCountRepository.insertIntoHeadCount(employee_id, Meal.BREAKFAST, Day.WED);
          }
          else if (breakfast.get(i) == "Thursday")
          {
            headCountRepository.insertIntoHeadCount(employee_id, Meal.BREAKFAST, Day.THURS);
          }
          else if (breakfast.get(i) == "Friday")
          {
            headCountRepository.insertIntoHeadCount(employee_id, Meal.BREAKFAST, Day.FRI);
          }
          else if (breakfast.get(i) == "Saturday")
          {
            headCountRepository.insertIntoHeadCount(employee_id, Meal.BREAKFAST, Day.SAT);
          }
          else if (breakfast.get(i) == "Sunday")
          {
            headCountRepository.insertIntoHeadCount(employee_id, Meal.BREAKFAST, Day.SUN);
          }

        }
      }

    }
    catch(Exception e){
      log.error("Exception while adding/updating selection for employee_id:{}",employee_id);
    }

    response.setResponseObject(null);
    return response;
  }

  @Override
  public Response<Map<Day, Map<Meal, List<Food>>>> getMenuOfTheWeek() {
    List<foodOfDayAndMealDTO> foodsOfDayAndMeal = employeeRepository.getFoodOfDayAndMeal();
    System.out.println("foodsOfDayAndMeal = " + foodsOfDayAndMeal);

    Map<Day, Map<Meal, List<Food>>> menuOfTheWeek = generateMenuOfTheWeek();
    System.out.println("VEFORE EVERYTHING menuOfTheWeek = " + menuOfTheWeek);

    for (foodOfDayAndMealDTO food: foodsOfDayAndMeal) {
      List<Food> existingFoodItems = menuOfTheWeek.get(food.getDay()).get(food.getMeal());
      Food newFood = new Food();
      BeanUtils.copyProperties(food, newFood);
      existingFoodItems.add(newFood);
      Map<Meal, List<Food>> menuOfTheMeal = new HashMap<Meal, List<Food>>(){{
        put(food.getMeal(), existingFoodItems);
      }};

      menuOfTheWeek.put(food.getDay(), menuOfTheMeal);
    }

    System.out.println("AFTER ADDING ALL \nmenuOfTheWeek = " + menuOfTheWeek);
    Response<Map<Day, Map<Meal, List<Food>>>> response = new Response<>();
    response.setResponseObject(menuOfTheWeek);
    return response;
  }

  private static Map<Day, Map<Meal, List<Food>>> generateMenuOfTheWeek() {
    Map<Day, Map<Meal, List<Food>>> menuOfTheWeek = new HashMap<>();
    Map<Meal, List<Food>> menuOfDay = new HashMap<>();
    menuOfDay.put(Meal.BREAKFAST, new ArrayList<>());
    menuOfDay.put(Meal.LUNCH, new ArrayList<>());
    menuOfDay.put(Meal.DINNER, new ArrayList<>());

    menuOfTheWeek.put(Day.MON, menuOfDay);
    menuOfTheWeek.put(Day.TUE, menuOfDay);
    menuOfTheWeek.put(Day.WED, menuOfDay);
    menuOfTheWeek.put(Day.THURS, menuOfDay);
    menuOfTheWeek.put(Day.FRI, menuOfDay);
    menuOfTheWeek.put(Day.SAT, menuOfDay);
    menuOfTheWeek.put(Day.SUN, menuOfDay);

    return menuOfTheWeek;
  }

}
