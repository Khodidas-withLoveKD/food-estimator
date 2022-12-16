package com.example.foodestimatorbackend.controller;

import com.example.foodestimatorbackend.constants.enums.ApiPathConstants;
import com.example.foodestimatorbackend.model.request.SelectionRequest;
import com.example.foodestimatorbackend.model.response.SelectionResponse;
import com.example.foodestimatorbackend.services.EmployeeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ApiPathConstants.API_BASE_PATH)
@Slf4j
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @RequestMapping(value = ApiPathConstants.POST_SELECTION_API, method = RequestMethod.POST)
    public SelectionResponse addSelection(@PathVariable(value = ApiPathConstants.EMPLOYEE_ID) int employee_id, @RequestBody SelectionRequest selectionRequest) {
        log.info("Entered adding selection for employee_id:{}", employee_id);
        SelectionResponse selectionResponse = employeeService.addSelection(employee_id, selectionRequest);
//        return new ResponseEntity<>(selectionResponse, selectionResponse.getStatusCode());
        return selectionResponse;
    }

}
