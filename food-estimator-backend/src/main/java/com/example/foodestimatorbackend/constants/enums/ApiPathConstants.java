package com.example.foodestimatorbackend.constants.enums;

public class ApiPathConstants {

    public static final String EMPLOYEE_API_BASE_PATH = "/v1/food-estimator/employee";
    public static final String ADMIN_API_BASE_PATH = "/v1/food-estimator/admin";
    public static final String POST_SELECTION_API = "/{employee_id}/selection";
    public static final String EMPLOYEE_ID = "employee_id";
    public static final String GET_MENU_OF_THE_WEEK = "/get-menu-of-the-week";
    public static final String GET_SELECTION_API = "/{employee_id}/getSelection";
    public static final String GET_HEAD_COUNT = "/getHeadCount";
    public static final String SET_MENU_OF_THE_WEEK = "/editMenu";
    public static final String GET_ALL_FOOD_ITEMS = "/get-all-food-items";
    public static final String GET_FOOD_ITEMS_BY_CATEGORY_SORTED_BY_RATING_DESC = "/get-sorted-food-items-by-category-desc";
    public static final String GET_FOOD_ITEMS_BY_CATEGORY_SORTED_BY_RATING_ASC = "/get-sorted-food-items-by-category-asc";
    public static final String GET_ALL_FOOD_ITEMS_SORTED_BY_RATING_DESC = "/get-all-food-items-sorted-by-rating-desc";
    public static final String GET_ALL_FOOD_ITEMS_SORTED_BY_RATING_ASC = "/get-all-food-items-sorted-by-rating-asc";
    public static final String GET_ALL_FOOD_ITEMS_SORTED_BY_DATE_DESC = "/get-all-food-items-sorted-by-date-desc";
    public static final String GET_FOOD_ITEMS_BY_CATEGORY_SORTED_BY_DATE_DESC = "get-food-items-by-category-sorted-by-date-desc";
    public static final String ADD_FOOD = "/addFood";
    public static final String GET_ADMIN_STATUS = "/{employee_id}/getAdminStatus";
    public static final String UPDATE_FOOD_RATING = "/{food_id}/update-food-rating";
}
