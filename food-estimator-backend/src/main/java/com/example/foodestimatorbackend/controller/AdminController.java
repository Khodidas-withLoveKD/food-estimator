package com.example.foodestimatorbackend.controller;

import com.example.foodestimatorbackend.constants.enums.ApiPathConstants;
import com.example.foodestimatorbackend.model.request.MenuRequest;
import com.example.foodestimatorbackend.model.response.Response;
import com.example.foodestimatorbackend.services.AdminService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @RequestMapping(value = ApiPathConstants.SET_MENU_OF_THE_WEEK, method = RequestMethod.POST)
    public Response<String> editMenu(@RequestBody MenuRequest menuRequest) {
        Response<String> response = adminService.editMenu(menuRequest);
        return response;
    }

}
