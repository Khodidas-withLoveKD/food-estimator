package com.example.foodestimatorbackend.services;

import com.example.foodestimatorbackend.model.request.SelectionRequest;
import com.example.foodestimatorbackend.model.response.SelectionResponse;

public interface EmployeeService {

    SelectionResponse addSelection(int employee_id, SelectionRequest selectionRequest);
}
