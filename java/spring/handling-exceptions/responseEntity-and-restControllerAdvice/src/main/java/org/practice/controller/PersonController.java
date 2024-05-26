package org.practice.controller;

import org.practice.exception.CustomException;
import org.practice.model.Person;
import org.practice.service.PersonService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/")
public class PersonController {

    private final PersonService personService;

    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping
    public String personGet() {
        return "person";
    }

//exception handling approach-1:

//    @GetMapping("/person")
//    @ResponseBody
//    public ResponseEntity<?> getAllPeople() throws CustomException {
//        try {
//            return ResponseEntity
//                    .status(HttpStatus.OK)
//                    .body(this.personService.findAllPeople());
//        } catch (CustomException customException) {
//            RestErrorDetail restErrorDetail = new RestErrorDetail(customException.getMessage());
//
//            return ResponseEntity
//                    .status(HttpStatus.I_AM_A_TEAPOT)
//                    .body(restErrorDetail);
//        }
//    }
//
//    @GetMapping("/person/{id}")
//    @ResponseBody
//    public ResponseEntity<?> getPersonById(@PathVariable int id) throws CustomException {
//        try {
//            return ResponseEntity
//                    .of(this.personService.findPersonById(id));
//        } catch (CustomException customException) {
//            RestErrorDetail restErrorDetail = new RestErrorDetail(customException.getMessage());
//
//            return ResponseEntity
//                    .status(HttpStatus.I_AM_A_TEAPOT)
//                    .body(restErrorDetail);
//        }
//    }

//exception handling approach-2:

    @GetMapping("/person")
    @ResponseBody
    public List<Person> getAllPeople() throws CustomException {
        return this.personService.findAllPeople();
    }

    @GetMapping("/person/{id}")
    @ResponseBody
    public ResponseEntity<Person> getPersonById(@PathVariable int id) throws CustomException {
        return ResponseEntity
                .of(this.personService.findPersonById(id));
    }
}
