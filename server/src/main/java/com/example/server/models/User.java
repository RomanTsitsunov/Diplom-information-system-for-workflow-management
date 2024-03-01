package com.example.server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "user", schema = "bms")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user")
    private int idUser;

    @Column(name = "name")
    private String name;

    @Column(name = "surname")
    private String surname;

    @Column(name = "otchestvo")
    private String otchestvo;

    @Column(name = "phone")
    private String phone;

    @Column(name = "email")
    private String email;

    @Column(name = "login")
    private String login;

    @Column(name = "pass")
    private String pass;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "user_workspace",
            schema = "bms",
            joinColumns = @JoinColumn(name = "id_user"),
            inverseJoinColumns = @JoinColumn(name = "id_workspace")
    )
    private List<Workspace> workspaces;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "user_card",
            schema = "bms",
            joinColumns = @JoinColumn(name = "id_user"),
            inverseJoinColumns = @JoinColumn(name = "id_card")
    )
    private List<Card> cards;

    @ManyToOne
    @JoinColumn(name = "id_role")
    private Role role;
}