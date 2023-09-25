package filecompression.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import filecompression.models.User;
import filecompression.service.UserService;

@RestController
@CrossOrigin
public class AuthController {
    @Autowired
    private UserService userService;
    
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.registerUser(user);
    }
    
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
    	User authenticatedUser = userService.loginUser(user.getUsername(), user.getPassword());

        if (authenticatedUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(authenticatedUser);
    }
}