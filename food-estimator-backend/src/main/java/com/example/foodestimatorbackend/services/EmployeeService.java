package com.example.foodestimatorbackend.services;

import com.example.foodestimatorbackend.constants.enums.Day;
import com.example.foodestimatorbackend.constants.enums.Meal;
import com.example.foodestimatorbackend.model.dto.MenuOfTheWeek;
import com.example.foodestimatorbackend.model.entity.Food;
import com.example.foodestimatorbackend.model.request.SelectionRequest;
import com.example.foodestimatorbackend.model.response.Response;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface EmployeeService {

    Response addSelection(int employee_id, SelectionRequest selectionRequest);

    Response<Map<Day, Map<Meal, List<Food>>>> getMenuOfTheWeek();

    Response<HashMap<String, String>> getSelection(int employee_id);

}
