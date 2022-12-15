package com.example.foodestimatorbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
public class FoodEstimatorBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(FoodEstimatorBackendApplication.class, args);
	}

}
