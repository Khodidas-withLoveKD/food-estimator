package com.example.foodestimatorbackend.model.dto;

import com.example.foodestimatorbackend.constants.enums.Day;
import com.example.foodestimatorbackend.constants.enums.Meal;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class SelectedDayofEmployeeDTO {

    @JsonProperty(value = "day")
    private Day day;

    @JsonProperty(value = "meal")
    private List<Meal> meal;
}
