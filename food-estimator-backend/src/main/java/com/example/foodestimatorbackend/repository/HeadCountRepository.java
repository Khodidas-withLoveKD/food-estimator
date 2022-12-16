package com.example.foodestimatorbackend.repository;

import com.example.foodestimatorbackend.constants.enums.Day;
import com.example.foodestimatorbackend.constants.enums.Meal;
import com.example.foodestimatorbackend.model.entity.HeadCount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface HeadCountRepository extends JpaRepository<HeadCount, Integer> {

    @Modifying
    @Query(value = "delete from head_count where employee_id = :employee_id", nativeQuery = true)
    void deleteFromHeadCount(@Param("employee_id") int employee_id);

    @Modifying
    @Query(value = "insert into head_count (employee_id, meal, day) values(:employee_id, :meal, :day)", nativeQuery = true)
    void insertIntoHeadCount(@Param("employee_id") int employee_id, @Param("meal")Meal meal, @Param("day")Day day);

}
