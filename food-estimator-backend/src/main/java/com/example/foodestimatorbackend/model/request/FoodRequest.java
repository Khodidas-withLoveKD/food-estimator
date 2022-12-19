package com.example.foodestimatorbackend.model.request;

import com.example.foodestimatorbackend.constants.enums.Category;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

@Getter
@Setter
@Slf4j
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(doNotUseGetters = true)
@JsonIgnoreProperties(ignoreUnknown = true)
public class FoodRequest {
    private String name;
    private Category category;
    private String img_url;
    private String description;
}
