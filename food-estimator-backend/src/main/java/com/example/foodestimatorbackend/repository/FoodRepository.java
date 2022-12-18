package com.example.foodestimatorbackend.repository;

import com.example.foodestimatorbackend.constants.enums.Category;
import com.example.foodestimatorbackend.model.entity.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodRepository extends JpaRepository<Food, Integer> {

  List<Food> findByCategoryOrderByRatingDesc(@Param("category") Category category);
}
