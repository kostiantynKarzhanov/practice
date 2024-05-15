package org.practice.service;

import org.practice.exception.CustomException;
import org.practice.model.Person;
import org.practice.repository.PersonRepositoryList;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PersonService {
    private final PersonRepositoryList personRepositoryList;

    public PersonService(PersonRepositoryList personRepositoryList) {
        this.personRepositoryList = personRepositoryList;
    }

    public List<Person> findAllPeople() throws CustomException {
        throw new CustomException("custom exception: findAllPeople()");
//        return this.personRepositoryList.findAllPeople();
    }

    public Optional<Person> findPersonById(int id) throws CustomException {
        throw new CustomException("custom exception: findPersonById()");
//        return this.personRepositoryList.findPersonById(id);
    }
}
