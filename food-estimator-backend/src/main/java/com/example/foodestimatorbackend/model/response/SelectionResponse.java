package com.example.foodestimatorbackend.model.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.springframework.http.HttpStatus;

import java.io.Serializable;

@Getter
@Setter
@ToString
@JsonInclude
@AllArgsConstructor
public class SelectionResponse<T> implements Serializable {

    private T responseObject;
    private HttpStatus statusCode;

    public SelectionResponse() {
        this.statusCode = HttpStatus.OK;
    }

    public SelectionResponse(T responseObject) {
        this.responseObject = responseObject;
        this.statusCode = HttpStatus.OK;
    }

}
