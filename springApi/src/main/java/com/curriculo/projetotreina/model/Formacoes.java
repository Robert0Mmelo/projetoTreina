package com.curriculo.projetotreina.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "formacoes")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Formacoes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "idformacao") 
    @OrderBy("inicio ASC")
    @JsonManagedReference
    private List<Graduacao> graduacoes;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "idformacao")
    @OrderBy("inicio ASC")
    @JsonManagedReference
    private List<Posgraduacao> posgraduacoes;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "idformacao")
    @OrderBy("inicio ASC")
    @JsonManagedReference
    private List<Tecnico> tecnicos;

}
