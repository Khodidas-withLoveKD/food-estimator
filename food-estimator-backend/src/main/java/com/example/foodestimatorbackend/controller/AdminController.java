package com.example.foodestimatorbackend.controller;

import com.example.foodestimatorbackend.constants.enums.ApiPathConstants;
import com.example.foodestimatorbackend.constants.enums.Category;
import com.example.foodestimatorbackend.model.entity.Food;
import com.example.foodestimatorbackend.model.request.FoodRequest;
import com.example.foodestimatorbackend.model.request.MenuRequest;
import com.example.foodestimatorbackend.model.response.Response;
import com.example.foodestimatorbackend.services.AdminService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(ApiPathConstants.ADMIN_API_BASE_PATH)
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @RequestMapping(value = ApiPathConstants.GET_HEAD_COUNT, method = RequestMethod.GET)
    public Response<Map<String, Map<String,Integer>>> getHeadCount() {
        Response<Map<String,Map<String,Integer>>> response = adminService.getHeadCount();
        return response;
    }

    @RequestMapping(value = ApiPathConstants.SET_MENU_OF_THE_WEEK, method = RequestMethod.POST)
    public Response<String> editMenu(@RequestBody MenuRequest menuRequest) {
        Response<String> response = adminService.editMenu(menuRequest);
        return response;
    }

    @GetMapping(value = ApiPathConstants.GET_ALL_FOOD_ITEMS)
    public Response<List<Food>> getAllFoodItems() {
        return adminService.getAllFoodItems();
    }

    @GetMapping(value = ApiPathConstants.GET_FOOD_ITEMS_BY_CATEGORY_SORTED_BY_RATING_DESC)
    public Response<List<Food>> getFoodItemsOfCategorySortedByRatingDesc(@RequestParam Category category) {
        return adminService.getFoodItemsOfCategorySortedByRatingDesc(category);
    }

    @GetMapping(value = ApiPathConstants.GET_FOOD_ITEMS_BY_CATEGORY_SORTED_BY_RATING_ASC)
    public Response<List<Food>> getFoodItemsOfCategorySortedByRatingAsc(@RequestParam Category category) {
        return adminService.getFoodItemsOfCategorySortedByRatingAsc(category);
    }

    @GetMapping(value = ApiPathConstants.GET_ALL_FOOD_ITEMS_SORTED_BY_RATING_DESC)
    public Response<List<Food>> getAllFoodItemsSortedByRatingDescending() {
        return adminService.getAllFoodItemsSortedByRatingDesc();
    }

    @GetMapping(value = ApiPathConstants.GET_ALL_FOOD_ITEMS_SORTED_BY_RATING_ASC)
    public Response<List<Food>> getAllFoodItemsSortedByRatingAscending() {
        return adminService.getAllFoodItemsSortedByRatingAsc();
    }

    @GetMapping(value = ApiPathConstants.GET_ALL_FOOD_ITEMS_SORTED_BY_DATE_DESC)
    public Response<List<Food>> getAllFoodItemsSortedByDateDesceding() {
        return adminService.getAllFoodItemsSortedByDateDesc();
    }

    @PostMapping(value = ApiPathConstants.ADD_FOOD)
    public Response<String> addFood(@RequestBody FoodRequest foodRequest)
    {
        return adminService.addFood(foodRequest);
    }

    @GetMapping(value = ApiPathConstants.GET_FOOD_ITEMS_BY_CATEGORY_SORTED_BY_DATE_DESC)
    public Response<List<Food>> getFoodItemsByCategorySortedByDateDesc(@RequestParam Category category) {
        return adminService.getFoodByCategorySortedByDateDesc(category);
    }

    @PostMapping(value = ApiPathConstants.UPDATE_FOOD_RATING)
    public Response<String> updateFoodRating(@PathVariable(value = "food_id") Integer foodId, @RequestParam Float rating) {
        return adminService.updateFoodRating(foodId, rating);
    }
}
