package com.rdp.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "anime")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Anime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long level;

    @Column(name = "Name")
    private String name;

    @Column(name = "Age")
    private Integer age;

    @Column(name = "Universe")
    private String universe;

    @Column(name = "Power")
    @Enumerated(EnumType.STRING)
    private SignaturePower power;

    @Column(name = "Intelligence")
    private Integer intelligence;

    @Column(name = "Weakness")
    private String weakness;

}

