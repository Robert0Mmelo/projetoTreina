package com.curriculo.projetotreina.model;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "posgraduacao")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Posgraduacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Temporal(TemporalType.DATE)
    @Column(nullable = true)
    private Date inicio;

    
    @Column( nullable = true, length = 30)
    private String fim;

    @Column(nullable = false, length = 70)
    private String curso;

    @Column(nullable = false, length = 150)
    private String ie;

    @Column(nullable = false, length = 13)
    private String titulo;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "idformacao")
    private Formacoes formacoes; 
}
