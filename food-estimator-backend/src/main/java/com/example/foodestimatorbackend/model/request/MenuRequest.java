package com.example.foodestimatorbackend.model.request;

import com.example.foodestimatorbackend.constants.enums.Day;
import com.example.foodestimatorbackend.constants.enums.Meal;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@Slf4j
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(doNotUseGetters = true)
@JsonIgnoreProperties(ignoreUnknown = true)
public class MenuRequest {

    private Map<String, Map<String, List<Integer>>> newMenu;

}
