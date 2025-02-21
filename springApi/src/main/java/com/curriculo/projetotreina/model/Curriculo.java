package com.curriculo.projetotreina.model;

import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "curriculo")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Curriculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "identificacao_id", referencedColumnName = "id")
    private Identificacao identificacao;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "endereco_id", referencedColumnName = "id")
    private Endereco endereco;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "formacoes_id", referencedColumnName = "id")
    private Formacoes formacoes;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "curriculo_id") 
    private List<Empresa> empresas;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "informacoesadc_id", referencedColumnName = "id")
    private InformacoesAdc informacoesAdc;
}
