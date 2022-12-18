package com.example.foodestimatorbackend.services;

import com.example.foodestimatorbackend.model.entity.Food;
import com.example.foodestimatorbackend.model.request.MenuRequest;
import com.example.foodestimatorbackend.model.response.Response;

import java.util.List;
import java.util.Map;

public interface AdminService {
    Response<Map<String, Map<String,Integer>>> getHeadCount();

    Response<String> editMenu(MenuRequest menuRequest);

    Response<List<Food>> getAllFoodItems();

}
