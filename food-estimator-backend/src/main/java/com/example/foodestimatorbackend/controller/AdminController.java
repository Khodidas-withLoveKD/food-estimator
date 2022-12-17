package com.example.foodestimatorbackend.controller;

import com.example.foodestimatorbackend.constants.enums.ApiPathConstants;
import com.example.foodestimatorbackend.model.response.Response;
import com.example.foodestimatorbackend.services.AdminService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping(ApiPathConstants.ADMIN_API_BASE_PATH)
@Slf4j
public class AdminController {

    @Autowired
    private AdminService adminService;

    @RequestMapping(value = ApiPathConstants.GET_HEAD_COUNT, method = RequestMethod.GET)
    public Response<Map<String, Map<String,Integer>>> getHeadCount() {
        Response<Map<String,Map<String,Integer>>> response = adminService.getHeadCount();
        return response;
    }

    @RequestMapping(value = ApiPathConstants.SET_MENU_OF_THE_WEEK, method = RequestMethod.PUT)
    public Response<String> editMenu() {
        Response<String> response = adminService.editMenu();
        return response;
    }

}
