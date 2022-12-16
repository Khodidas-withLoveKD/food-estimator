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

        for (int i = 0; i < breakfast.size(); i++) {
          switch (Day.valueOf(breakfast.get(i))) {
            case MON:
              headCountRepository.insertIntoHeadCount(employee_id, "BREAKFAST", "MON");
              break;
            case TUE:
              headCountRepository.insertIntoHeadCount(employee_id, "BREAKFAST", "TUE");
              break;
            case WED:
              headCountRepository.insertIntoHeadCount(employee_id, "BREAKFAST", "WED");
              break;
            case THURS:
              headCountRepository.insertIntoHeadCount(employee_id, "BREAKFAST", "THURS");
              break;
            case FRI:
              headCountRepository.insertIntoHeadCount(employee_id, "BREAKFAST", "FRI");
              break;
            case SAT:
              headCountRepository.insertIntoHeadCount(employee_id, "BREAKFAST", "SAT");
              break;
            case SUN:
              headCountRepository.insertIntoHeadCount(employee_id, "BREAKFAST", "SUN");
              break;
            default:
              break;
          }
        }
      }
      if (Objects.nonNull(selectionRequest.getLunch())) {
        ArrayList<String> lunch = selectionRequest.getLunch();
        for(int i=0;i<lunch.size();i++) {
          switch (Day.valueOf(lunch.get(i))) {
            case MON:
              headCountRepository.insertIntoHeadCount(employee_id, "LUNCH", "MON");
              break;
            case TUE:
              headCountRepository.insertIntoHeadCount(employee_id, "LUNCH", "TUE");
              break;
            case WED:
              headCountRepository.insertIntoHeadCount(employee_id, "LUNCH", "WED");
              break;
            case THURS:
              headCountRepository.insertIntoHeadCount(employee_id, "LUNCH", "THURS");
              break;
            case FRI:
              headCountRepository.insertIntoHeadCount(employee_id, "LUNCH", "FRI");
              break;
            case SAT:
              headCountRepository.insertIntoHeadCount(employee_id, "LUNCH", "SAT");
              break;
            case SUN:
              headCountRepository.insertIntoHeadCount(employee_id, "LUNCH", "SUN");
              break;
            default:
              break;

          }

        }
      }
      if (Objects.nonNull(selectionRequest.getDinner())) {
        ArrayList<String> dinner = selectionRequest.getDinner();
        for(int i=0;i<dinner.size();i++) {
          switch (Day.valueOf(dinner.get(i))) {
            case MON:
              headCountRepository.insertIntoHeadCount(employee_id, "DINNER", "MON");
              break;
            case TUE:
              headCountRepository.insertIntoHeadCount(employee_id, "DINNER", "TUE");
              break;
            case WED:
              headCountRepository.insertIntoHeadCount(employee_id, "DINNER", "WED");
              break;
            case THURS:
              headCountRepository.insertIntoHeadCount(employee_id, "DINNER", "THURS");
              break;
            case FRI:
              headCountRepository.insertIntoHeadCount(employee_id, "DINNER", "FRI");
              break;
            case SAT:
              headCountRepository.insertIntoHeadCount(employee_id, "DINNER", "SAT");
              break;
            case SUN:
              headCountRepository.insertIntoHeadCount(employee_id, "DINNER", "SUN");
              break;
            default:
              break;

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

}
