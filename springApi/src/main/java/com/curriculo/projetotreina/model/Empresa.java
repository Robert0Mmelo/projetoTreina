package com.curriculo.projetotreina.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@Entity 
@Table(name = "empresa")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Empresa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 70)
    private String nome;

    @Temporal(TemporalType.DATE)
    @Column(nullable = true)
    private Date inicio;


    @Column( nullable = true, length = 30)
    private String fim;

    @OneToMany(mappedBy = "empresa", cascade = CascadeType.ALL)
    private List<Funcao> funcoes;
}
