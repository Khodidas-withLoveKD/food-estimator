package com.example.foodestimatorbackend.controller;

import com.example.foodestimatorbackend.constants.enums.Day;
import com.example.foodestimatorbackend.constants.enums.Meal;
import com.example.foodestimatorbackend.model.dto.MenuOfTheWeek;
import com.example.foodestimatorbackend.model.entity.Food;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.foodestimatorbackend.constants.enums.ApiPathConstants;
import com.example.foodestimatorbackend.model.request.SelectionRequest;
import com.example.foodestimatorbackend.model.response.Response;
import com.example.foodestimatorbackend.services.EmployeeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(ApiPathConstants.EMPLOYEE_API_BASE_PATH)
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

  @GetMapping(ApiPathConstants.GET_MENU_OF_THE_WEEK)
  public Response<Map<Day, Map<Meal, List<Food>>>> getMenuOfTheWeek() {
    return employeeService.getMenuOfTheWeek();
  }

  @RequestMapping(value = ApiPathConstants.POST_SELECTION_API, method = RequestMethod.POST)
  public Response addSelection(@PathVariable(value = ApiPathConstants.EMPLOYEE_ID) int employee_id, @RequestBody SelectionRequest selectionRequest) {
      log.info("Entered adding selection for employee_id:{}", employee_id);
      Response response = employeeService.addSelection(employee_id, selectionRequest);
//        return new ResponseEntity<>(selectionResponse, selectionResponse.getStatusCode());
      return response;
  }
}
