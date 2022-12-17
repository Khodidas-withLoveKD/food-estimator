package com.example.foodestimatorbackend.services;

import com.example.foodestimatorbackend.model.response.Response;

import java.util.Map;

public interface AdminService {
    Response<Map<String, Map<String,Integer>>> getHeadCount();

    Response<String> editMenu();

}
