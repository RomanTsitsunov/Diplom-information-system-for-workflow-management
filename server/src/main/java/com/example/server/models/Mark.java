package com.example.server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "mark", schema = "bms")
public class Mark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_mark")
    private int idMark;

    @Column(name = "name")
    private String name;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "card_mark",
            schema = "bms",
            joinColumns = @JoinColumn(name = "id_mark"),
            inverseJoinColumns = @JoinColumn(name = "id_card")
    )
    private List<Card> cards;

    @Column(name = "color")
    private String color;
}
