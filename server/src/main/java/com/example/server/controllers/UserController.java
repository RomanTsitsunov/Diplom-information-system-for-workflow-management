package com.example.server.controllers;

import com.example.server.models.User;
import com.example.server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public List<User> users() {
        return userService.getAll();
    }

    @GetMapping("/login/{login}")
    public User userlogin(@PathVariable("login") String login) {
        return userService.getByLogin(login);
    }

    @GetMapping("/id/{id}")
    public User userid(@PathVariable("id") int id) {
        return userService.getById(id);
    }

    @PostMapping()
    public User add(@RequestBody User user) {
        try {
            userService.save(user);
            return user;
        }
        catch (Exception e) {
            return null;
        }
    }
}