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
public class Response<T> implements Serializable {

    private T responseObject;
    private HttpStatus statusCode;

    public Response() {
        this.statusCode = HttpStatus.OK;
    }

    public Response(T responseObject) {
        this.responseObject = responseObject;
        this.statusCode = HttpStatus.OK;
    }

}
