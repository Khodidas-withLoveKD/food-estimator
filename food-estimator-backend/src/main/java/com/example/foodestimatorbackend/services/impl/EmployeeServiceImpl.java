package com.example.foodestimatorbackend.services.impl;

import com.example.foodestimatorbackend.constants.enums.Day;
import com.example.foodestimatorbackend.constants.enums.Meal;
import com.example.foodestimatorbackend.model.entity.Employee;
import com.example.foodestimatorbackend.model.request.SelectionRequest;
import com.example.foodestimatorbackend.model.response.SelectionResponse;
import com.example.foodestimatorbackend.repository.EmployeeRepository;
import com.example.foodestimatorbackend.repository.HeadCountRepository;
import com.example.foodestimatorbackend.services.EmployeeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


@Slf4j
@Service
public class EmployeeServiceImpl implements EmployeeService {
  @Autowired
  private EmployeeRepository employeeRepository;

  @Autowired
  private HeadCountRepository headCountRepository;
//  @PostConstruct
//  private void testDBConnection() {
//    List<Employee> listOfEmployees = employeeRepository.findAll();
//    log.info("listOfEmployees = " + listOfEmployees);
//  }

  @Override
  @Transactional
  public SelectionResponse addSelection(int employee_id, SelectionRequest selectionRequest)
  {
    log.info("SelectionRequest:{}",selectionRequest);
    SelectionResponse selectionResponse = new SelectionResponse<>();

    try {
      headCountRepository.deleteFromHeadCount(employee_id);

      if (Objects.nonNull(selectionRequest.getBreakfast())) {
        ArrayList<String> breakfast = selectionRequest.getBreakfast();

        for (int i = 0; i < breakfast.size(); i++) {
          switch (Day.valueOf(breakfast.get(i))) {
            case MON:
              headCountRepository.insertIntoHeadCount(employee_id, "BREAKFAST", "MON");
              break;
            case TUE:
              headCountRepository.insertIntoHeadCount(employee_id, "BREAKFAST", "TUE");
              break;
            case WED:
              headCountRepository.insertIntoHeadCount(employee_id, "BREAKFAST", "WED");
              break;
            case THURS:
              headCountRepository.insertIntoHeadCount(employee_id, "BREAKFAST", "THURS");
              break;
            case FRI:
              headCountRepository.insertIntoHeadCount(employee_id, "BREAKFAST", "FRI");
              break;
            case SAT:
              headCountRepository.insertIntoHeadCount(employee_id, "BREAKFAST", "SAT");
              break;
            case SUN:
              headCountRepository.insertIntoHeadCount(employee_id, "BREAKFAST", "SUN");
              break;
            default:
              break;
          }
        }
      }
      if (Objects.nonNull(selectionRequest.getLunch())) {
        ArrayList<String> lunch = selectionRequest.getLunch();
        for(int i=0;i<lunch.size();i++) {
          switch (Day.valueOf(lunch.get(i))) {
            case MON:
              headCountRepository.insertIntoHeadCount(employee_id, "LUNCH", "MON");
              break;
            case TUE:
              headCountRepository.insertIntoHeadCount(employee_id, "LUNCH", "TUE");
              break;
            case WED:
              headCountRepository.insertIntoHeadCount(employee_id, "LUNCH", "WED");
              break;
            case THURS:
              headCountRepository.insertIntoHeadCount(employee_id, "LUNCH", "THURS");
              break;
            case FRI:
              headCountRepository.insertIntoHeadCount(employee_id, "LUNCH", "FRI");
              break;
            case SAT:
              headCountRepository.insertIntoHeadCount(employee_id, "LUNCH", "SAT");
              break;
            case SUN:
              headCountRepository.insertIntoHeadCount(employee_id, "LUNCH", "SUN");
              break;
            default:
              break;

          }

        }
      }
      if (Objects.nonNull(selectionRequest.getDinner())) {
        ArrayList<String> dinner = selectionRequest.getDinner();
        for(int i=0;i<dinner.size();i++) {
          switch (Day.valueOf(dinner.get(i))) {
            case MON:
              headCountRepository.insertIntoHeadCount(employee_id, "DINNER", "MON");
              break;
            case TUE:
              headCountRepository.insertIntoHeadCount(employee_id, "DINNER", "TUE");
              break;
            case WED:
              headCountRepository.insertIntoHeadCount(employee_id, "DINNER", "WED");
              break;
            case THURS:
              headCountRepository.insertIntoHeadCount(employee_id, "DINNER", "THURS");
              break;
            case FRI:
              headCountRepository.insertIntoHeadCount(employee_id, "DINNER", "FRI");
              break;
            case SAT:
              headCountRepository.insertIntoHeadCount(employee_id, "DINNER", "SAT");
              break;
            case SUN:
              headCountRepository.insertIntoHeadCount(employee_id, "DINNER", "SUN");
              break;
            default:
              break;

          }

        }
      }

    }
    catch(Exception e){
      log.error("Exception while adding/updating selection for employee_id:{}",employee_id);
    }

    selectionResponse.setResponseObject(null);
    return selectionResponse;
  }

}
