package com.example.foodestimatorbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.example.foodestimatorbackend"})
public class FoodEstimatorBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(FoodEstimatorBackendApplication.class, args);
	}

}
