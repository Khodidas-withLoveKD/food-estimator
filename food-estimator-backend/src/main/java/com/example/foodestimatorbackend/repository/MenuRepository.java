package com.example.foodestimatorbackend.repository;

import com.example.foodestimatorbackend.constants.enums.Day;
import com.example.foodestimatorbackend.constants.enums.Meal;
import com.example.foodestimatorbackend.model.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

public interface MenuRepository extends JpaRepository<Menu, Integer> {

    @Modifying
    @Transactional
    @Query(value = "delete from menu where day in :days", nativeQuery = true)
    void deleteFromMenu(@Param("days") Set<String> day);

    @Modifying
    @Transactional
    @Query(value = "insert into menu(food_id, day, meal) values(:food_id, :day, :meal)", nativeQuery = true)
    void insertIntoMenu(@Param("food_id") Integer food_id, @Param("meal") String meal, @Param("day") String day);

}
