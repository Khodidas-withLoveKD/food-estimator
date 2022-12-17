package com.example.foodestimatorbackend.services.impl;

import com.example.foodestimatorbackend.model.response.Response;
import com.example.foodestimatorbackend.repository.HeadCountRepository;
import com.example.foodestimatorbackend.services.AdminService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class AdminServiceImpl implements AdminService {

    @Autowired
    private HeadCountRepository headCountRepository;

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
    public Response<String> editMenu() {

        return null;
    }

}
