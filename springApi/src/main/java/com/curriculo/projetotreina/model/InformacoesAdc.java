package com.curriculo.projetotreina.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Entity 
@Table(name = "informacoesadc")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class InformacoesAdc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = true, length = 2000)
    private String linkedin;

    @Column(nullable = true, length = 2000)
    private String github;

    @Column(nullable = true, length = 2000)
    private String instagram;

    @Column(nullable = true, length = 200)
    private String email;
}
