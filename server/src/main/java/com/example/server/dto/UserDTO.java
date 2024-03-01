package com.example.server.dto;

import jakarta.persistence.*;
import lombok.Data;

public interface UserDTO {
    int getIdUser();
    String getEmail();
    String getLogin();
}