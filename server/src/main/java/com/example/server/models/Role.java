package com.example.server.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "role", schema = "bms")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_role")
    private int idRole;

    @Column(name = "name")
    private String name;

    @Column(name = "level access")
    private int levelAccess;
}
