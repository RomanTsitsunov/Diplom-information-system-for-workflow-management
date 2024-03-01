package com.example.server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "kanban", schema = "bms")
public class Kanban {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_kanban")
    private int idKanban;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "id_kanban", updatable = false)
    private List<Spisok> spisoks;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_workspace")
    private Workspace workspace;
}
