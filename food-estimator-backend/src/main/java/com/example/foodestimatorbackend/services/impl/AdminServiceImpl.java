package com.example.foodestimatorbackend.services.impl;

import com.example.foodestimatorbackend.constants.enums.Category;
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
        Map<String,Integer> mealCountMon = new HashMap<>();
        Map<String,Integer> mealCountTue = new HashMap<>();
        Map<String,Integer> mealCountWed = new HashMap<>();
        Map<String,Integer> mealCountThur = new HashMap<>();
        Map<String,Integer> mealCountFri = new HashMap<>();

        headCountFromDB.forEach(jsonObject -> {
//            if(!jsonObject.get("day").toString().equals(previousDay)) {
////                mealCount.remove();
//                mealCount = new HashMap<>();
//            }
////            Map<String,Integer>mealCount = new HashMap<>();
////            mealCount.put(jsonObject.get("meal").toString(), Integer.valueOf(jsonObject.get("count").toString()));
////            mealCount.put(jsonObject.get("meal").toString(), jsonObject.get("count").size());
//
//
//            Map<String,Integer> currentMealCount = new HashMap<String,Integer>(headCount.get(jsonObject.get("day").toString()));
//
//

//            headCount.put(jsonObject.get("day").toString(), jsonObject.get("day").toString(), Integer.valueOf(jsonObject.get("count").toString()));
            String day = jsonObject.get("day").toString();

            switch (day) {
                case "MON":
                    mealCountMon.put(jsonObject.get("meal").toString(), Integer.valueOf(jsonObject.get("count").toString()));
                    headCount.put(jsonObject.get("day").toString(), mealCountMon);
                    break;
                case "TUE":
                    mealCountTue.put(jsonObject.get("meal").toString(), Integer.valueOf(jsonObject.get("count").toString()));
                    headCount.put(jsonObject.get("day").toString(), mealCountTue);
                    break;
                case "WED":
                    mealCountWed.put(jsonObject.get("meal").toString(), Integer.valueOf(jsonObject.get("count").toString()));
                    headCount.put(jsonObject.get("day").toString(), mealCountWed);
                    break;
                case "THURS":
                    mealCountThur.put(jsonObject.get("meal").toString(), Integer.valueOf(jsonObject.get("count").toString()));
                    headCount.put(jsonObject.get("day").toString(), mealCountThur);
                    break;
                default:
                    mealCountFri.put(jsonObject.get("meal").toString(), Integer.valueOf(jsonObject.get("count").toString()));
                    headCount.put(jsonObject.get("day").toString(), mealCountFri);
                    break;


            }

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

    @Override
    public Response<List<Food>> getFoodItemsOfCategorySortedByRatingDesc(Category category) {
        Response<List<Food>> response = new Response<>();
        response.setResponseObject(foodRepository.findByCategoryOrderByRatingDesc(category));
        return response;
    }

    @Override
    public Response<List<Food>> getFoodItemsOfCategorySortedByRatingAsc(Category category) {
        Response<List<Food>> response = new Response<>();
        response.setResponseObject(foodRepository.findByCategoryOrderByRatingAsc(category));
        return response;
    }

}
