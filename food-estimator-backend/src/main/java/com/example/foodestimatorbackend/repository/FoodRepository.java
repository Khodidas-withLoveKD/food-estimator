package com.example.foodestimatorbackend.repository;

import com.example.foodestimatorbackend.constants.enums.Category;
import com.example.foodestimatorbackend.model.entity.Food;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodRepository extends JpaRepository<Food, Integer> {

  List<Food> findByCategoryOrderByRatingDesc(@Param("category") Category category);

  List<Food> findByCategoryOrderByRatingAsc(@Param("category") Category category);

  @Modifying
  @Query(value = "insert into food(name,category, img_url, food_description) values(:name, :category, :imgUrl, :foodDescription)", nativeQuery = true)
  void insertIntoFood(@Param("name") String name, @Param("category") String category,
                      @Param("imgUrl") String imgUrl, @Param("foodDescription") String foodDescription);
}