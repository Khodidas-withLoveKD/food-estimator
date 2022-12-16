package com.example.foodestimatorbackend.repository;

import com.example.foodestimatorbackend.model.dto.foodOfDayAndMealDTO;
import com.example.foodestimatorbackend.model.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

  List<Employee>findAll();

//  @Query( value = "select day, meal, food.food_id, name, img_url, category, rating, persons_rated " +
//          "from menu " +
//          "Inner join food " +
//          "on menu.food_id = food.food_id " +
//          "group by day, meal, menu.food_id;", nativeQuery = true)
//  List<foodOfDayAndMealDTO> getFoodOfDayAndMeal();
  @Query(value = "select new com.example.foodestimatorbackend.model.dto.foodOfDayAndMealDTO" +
          "(M.day, M.meal, F.foodId, F.name, F.imgUrl, F.category, F.rating, F.personsRated) " +
          "FROM Menu M " +
          "inner join Food F " +
          "on M.foodId = F.foodId " +
          "group by M.day, M.meal, M.foodId")
  List<foodOfDayAndMealDTO> getFoodOfDayAndMeal();


}
