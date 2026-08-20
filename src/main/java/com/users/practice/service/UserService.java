package com.users.practice.service;


import com.users.practice.entity.User;
import com.users.practice.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;

    }

    public User addUser(User user){
        if (user.getAge() < 18){
            throw new RuntimeException("User must be atleast 18 years old");
        }

        return userRepository.save(user);
    }

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public User updateUser(Long id, User updatedUser){
        User existingUser = userRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("User Not Found"));

        if (updatedUser.getAge() < 18) {
            throw new RuntimeException ("User must be atleast 18 years old");
        }
        existingUser.setFirstName(updatedUser.getFirstName());
        existingUser.setLastName(updatedUser.getLastName());
        existingUser.setAge(updatedUser.getAge());
        existingUser.setSalary(updatedUser.getSalary());
        existingUser.setEmail(updatedUser.getEmail());

        return userRepository.save(existingUser);
    }

    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }
}