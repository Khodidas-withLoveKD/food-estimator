package com.example.foodestimatorbackend.repository;

import com.example.foodestimatorbackend.model.dto.foodOfDayAndMealDTO;
import com.example.foodestimatorbackend.model.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

  List<Employee> findAll();

  @Query(value = "select new com.example.foodestimatorbackend.model.dto.foodOfDayAndMealDTO" +
          "(M.day, M.meal, F.foodId, F.name, F.imgUrl, F.category, F.rating, F.personsRated) " +
          "FROM Menu M " +
          "inner join Food F " +
          "on M.foodId = F.foodId " +
          "group by M.day, M.meal, M.foodId")
  List<foodOfDayAndMealDTO> getFoodOfDayAndMeal();

  @Query(value = "select cast(employee_id as varchar(10)) as employee_id, cast(is_admin as varchar(10)) as is_admin from employee where employee_id = :employee_id",nativeQuery = true)
  Map<String, String> getAdminStatus(@Param("employee_id") Integer employee_id);


}
