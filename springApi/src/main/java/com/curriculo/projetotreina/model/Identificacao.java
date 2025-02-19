package com.curriculo.projetotreina.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.CascadeType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity 
@Table(name = "identificacao")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Identificacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 70)
    private String nome;

    @Column(nullable = false, length = 15)
    private String telefone;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "idendereco", referencedColumnName = "id")
    private Endereco endereco;

    @Column(nullable = false)
    private boolean whatsapp;

    @Column(length = 2000)
    private String fotoPerfil;
}
