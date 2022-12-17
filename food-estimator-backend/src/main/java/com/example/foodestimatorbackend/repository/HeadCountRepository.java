package com.example.foodestimatorbackend.repository;

import com.example.foodestimatorbackend.constants.enums.Day;
import com.example.foodestimatorbackend.constants.enums.Meal;
import com.example.foodestimatorbackend.model.dto.SelectedDayofEmployeeDTO;
import com.example.foodestimatorbackend.model.entity.HeadCount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;

@Repository
public interface HeadCountRepository extends JpaRepository<HeadCount, Integer> {

    @Modifying
    @Query(value = "delete from head_count where employee_id = :employee_id", nativeQuery = true)
    void deleteFromHeadCount(@Param("employee_id") int employee_id);

    @Modifying
    @Query(value = "insert into head_count (employee_id, meal, day) values(:employee_id, :meal, :day)", nativeQuery = true)
    void insertIntoHeadCount(@Param("employee_id") int employee_id, @Param("meal")String meal, @Param("day")String day);

    @Query(value = "select day, group_concat(meal) as meal from head_count where employee_id = :employee_id group by day", nativeQuery = true)
    List<Map<String,String>> getSelectedDays(@Param("employee_id") int employee_id);

    @Query(value = "select day, meal, count(*) as count from head_count group by day, meal", nativeQuery = true)
    List<Map<String,Object>> getHeadCount();

}
