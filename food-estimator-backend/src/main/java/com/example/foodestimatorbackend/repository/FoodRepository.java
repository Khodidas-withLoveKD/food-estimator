package com.example.foodestimatorbackend.repository;

import com.example.foodestimatorbackend.model.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends JpaRepository<Food, Integer> {
}
