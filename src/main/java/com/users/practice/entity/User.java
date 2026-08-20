package com.users.practice.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;



@Entity
@Table(name = "app_users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    private String firstName;
    private String lastName;
    private int age;
    private float salary;
    private String email;
    private String department;


    public User (){

    }


    public User(String firstName, String lastName, int age, float salary, String email, String department){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.salary = salary;
        this.email = email;
        this.department = department;
    }



    public Long getId() {
        return id;
    }

    public String getFirstName(){
        return firstName;
    }

    public String getLastName(){
        return  lastName;
    }

    public int getAge(){
        return age;
    }

    public float getSalary(){
        return salary;
    }

    public String getEmail(){
        return email;
    }

    public String getDepartment(){
        return department;
    }



    public void setId(Long id){
        this.id = id;
    }

    public void setFirstName(String firstName){
        this.firstName = firstName;
    }

    public void setLastName(String lastName){
        this.lastName = lastName;
    }

    public void setAge(int age){
        this.age = age;
    }

    public void setSalary(float salary){
        this.salary = salary;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public void setDepartment(String department){
        this.department = department;
    }
}

