package com.example.server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "workspace", schema = "bms")
public class Workspace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_workspace")
    private int idWorkspace;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_workspace", updatable = false)
    private List<Kanban> kanbans;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "user_workspace",
            schema = "bms",
            joinColumns = @JoinColumn(name = "id_workspace"),
            inverseJoinColumns = @JoinColumn(name = "id_user")
    )
    private List<User> users;
}
