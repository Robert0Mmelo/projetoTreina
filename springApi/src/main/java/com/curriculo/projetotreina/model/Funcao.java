package com.curriculo.projetotreina.model;

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
import java.util.Date;



@Entity 
@Table(name = "funcao")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Funcao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 70)
    private String nome;

   @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date inicio;

    @Column( nullable = false, length = 30)
    private String fim;

    @ManyToOne
    @JoinColumn(name = "idempresa")
    private Empresa empresa;  

}
