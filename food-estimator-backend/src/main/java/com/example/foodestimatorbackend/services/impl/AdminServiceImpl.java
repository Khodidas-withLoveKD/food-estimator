package com.example.foodestimatorbackend.services.impl;

import com.example.foodestimatorbackend.constants.enums.Day;
import com.example.foodestimatorbackend.constants.enums.Meal;
import com.example.foodestimatorbackend.model.entity.Food;
import com.example.foodestimatorbackend.model.request.MenuRequest;
import com.example.foodestimatorbackend.model.response.Response;
import com.example.foodestimatorbackend.repository.FoodRepository;
import com.example.foodestimatorbackend.repository.HeadCountRepository;
import com.example.foodestimatorbackend.repository.MenuRepository;
import com.example.foodestimatorbackend.services.AdminService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Slf4j
public class AdminServiceImpl implements AdminService {

    @Autowired
    private HeadCountRepository headCountRepository;

    @Autowired
    private MenuRepository menuRepository;

    @Autowired
    private FoodRepository foodRepository;

    @Override
    public Response<Map<String, Map<String,Integer>>> getHeadCount() {

        List<Map<String,Object>>headCountFromDB = new ArrayList<>();

        headCountFromDB = headCountRepository.getHeadCount();

        Map<String,Map<String,Integer>> headCount = new HashMap<>();
        Map<String,Integer>mealCount = new HashMap<>();
        headCountFromDB.forEach(jsonObject -> {
            mealCount.put(jsonObject.get("meal").toString(), Integer.valueOf(jsonObject.get("count").toString()));
//            mealCount.put(jsonObject.get("meal").toString(), jsonObject.get("count").size());
            headCount.put(jsonObject.get("day").toString(), mealCount);
        });

        Response<Map<String,Map<String,Integer>>> response = new Response<>(headCount);
        return response;
    }

    @Override
    @Transactional
    public Response<String> editMenu(MenuRequest menuRequest) {

        Set<String> days = menuRequest.getNewMenu().keySet();
        menuRepository.deleteFromMenu(days);
        Response<String> response =new Response<>();

        for(String day:days) {
            Set<String>meals = menuRequest.getNewMenu().get(day).keySet();

            for(String meal:meals) {
                List<Integer> foodIds = menuRequest.getNewMenu().get(day).get(meal);

                for(Integer foodId:foodIds) {
                    menuRepository.insertIntoMenu(foodId, meal,day);
                }
            }
        }

        response.setResponseObject("Menu added successfully");
        return response;
    }

    @Override
    public Response<List<Food>> getAllFoodItems() {
        Response<List<Food>> response = new Response<>();
        response.setResponseObject(foodRepository.findAll(Sort.by("category")));

        return response;
    }

}
