package com.example.server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.util.List;

@Data
@Entity
@Table(name = "card", schema = "bms")
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_card")
    private int idCard;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "date")
    private Date date;

    @Column(name = "priority")
    private int priority;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_spisok")
    private Spisok spisok;

    @ManyToMany
    @JoinTable(
            name = "card_mark",
            schema = "bms",
            joinColumns = @JoinColumn(name = "id_card"),
            inverseJoinColumns = @JoinColumn(name = "id_mark")
    )
    private List<Mark> marks;

    @ManyToMany
    @JoinTable(
            name = "user_card",
            schema = "bms",
            joinColumns = @JoinColumn(name = "id_card"),
            inverseJoinColumns = @JoinColumn(name = "id_user")
    )
    private List<User> users;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "id_card")
    private List<Comment> comments;
}
