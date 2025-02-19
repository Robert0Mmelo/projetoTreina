package com.curriculo.projetotreina.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "graduacao")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Graduacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private LocalDate inicio; 

    @Column(nullable = false, length = 30)
    private String fim; 

    @Column(nullable = false, length = 70)
    private String curso;

    @Column(nullable = false, length = 150)
    private String ies;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "idformacao")
    private Formacoes formacoes;
}
