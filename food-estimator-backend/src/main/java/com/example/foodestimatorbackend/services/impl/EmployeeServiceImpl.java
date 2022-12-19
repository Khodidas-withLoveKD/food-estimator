package com.example.foodestimatorbackend.services.impl;

import com.example.foodestimatorbackend.constants.enums.Day;
import com.example.foodestimatorbackend.constants.enums.Meal;
import com.example.foodestimatorbackend.model.dto.MenuOfTheWeek;
import com.example.foodestimatorbackend.model.dto.SelectedDayofEmployeeDTO;
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

import java.math.BigInteger;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;


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

      Map<String,List<Boolean>> selectedMeals = selectionRequest.getSelectedOptions();

      for(Map.Entry<String,List<Boolean>> mealDay:selectedMeals.entrySet()) {

        List<Boolean> meals = mealDay.getValue();

        String day = mealDay.getKey();

        if(meals.get(0)) {
          headCountRepository.insertIntoHeadCount(employee_id,"BREAKFAST",day);
        }

        if(meals.get(1)) {
          headCountRepository.insertIntoHeadCount(employee_id,"LUNCH",day);
        }

        if(meals.get(2)) {
          headCountRepository.insertIntoHeadCount(employee_id,"DINNER",day);
        }

      }
    }
    catch(Exception e){
      log.error("Exception while adding/updating selection for employee_id:{}",employee_id);
    }

    response.setResponseObject("Added Successfully");
    return response;
  }

  @Override
  public Response<Map<Day, Map<Meal, List<Food>>>> getMenuOfTheWeek() {
    List<foodOfDayAndMealDTO> foodsOfDayAndMeal = employeeRepository.getFoodOfDayAndMeal();
    System.out.println("foodsOfDayAndMeal = " + foodsOfDayAndMeal);

    Map<Day, Map<Meal, List<Food>>> menuOfTheWeek = generateMenuOfTheWeek();

    for (foodOfDayAndMealDTO food: foodsOfDayAndMeal) {
      List<Food> existingFoodItems = menuOfTheWeek.get(food.getDay()).get(food.getMeal());
      Food newFood = new Food();
      BeanUtils.copyProperties(food, newFood);
      existingFoodItems.add(newFood);
      Map<Meal, List<Food>> menuOfTheMeal = menuOfTheWeek.get(food.getDay());
      menuOfTheMeal.put(food.getMeal(), existingFoodItems);

      menuOfTheWeek.put(food.getDay(), menuOfTheMeal);
    }

    Response<Map<Day, Map<Meal, List<Food>>>> response = new Response<>();
    response.setResponseObject(menuOfTheWeek);
    return response;
  }

  private static Map<Day, Map<Meal, List<Food>>> generateMenuOfTheWeek() {
    Map<Day, Map<Meal, List<Food>>> menuOfTheWeek = new HashMap<>();
    for (Day dayOfTheWeek: Day.values()) {
      Map<Meal, List<Food>> menuOfDay = new HashMap<>();
      menuOfDay.put(Meal.BREAKFAST, new ArrayList<>());
      menuOfDay.put(Meal.LUNCH, new ArrayList<>());
      menuOfDay.put(Meal.DINNER, new ArrayList<>());

      menuOfTheWeek.put(dayOfTheWeek, menuOfDay);
    }

    return menuOfTheWeek;
  }

  @Override
  public Response<HashMap<String, String>> getSelection(int employee_id) {
    List<Map<String,String>> selectedDaysFromDB = new ArrayList<>();

    selectedDaysFromDB = headCountRepository.getSelectedDays(employee_id);
    HashMap<String, String> finalList = new HashMap<>();
    selectedDaysFromDB.forEach(jsonObject -> {
      System.out.println(jsonObject);
      finalList.put(jsonObject.get("day").toString(), jsonObject.get("meal").toString());
    });
    Response<HashMap<String, String>> response = new Response<>(finalList);
    return response;

  }

  @Override
  public Response<HashMap<String, String>> getAdminStatus(int employee_id) {

    Response<HashMap<String,String>> response = new Response<>();

    try {
      Map<String, String> employeeDetails = employeeRepository.getAdminStatus(employee_id);
      HashMap<String,String> finalResult = new HashMap<>();
      finalResult.put("employee_id",employeeDetails.get("employee_id").toString());

      if(employeeDetails.get("is_admin").equals("0"))
      {
        finalResult.put("is_admin","False");
      }
      else {
        finalResult.put("is_admin","True");
      }
      response.setResponseObject(finalResult);
    }
    catch (Exception e) {
      log.error("Exception occurred while fetching admin status from DB");
      response.setResponseObject(null);
    }

    return response;

  }

}
