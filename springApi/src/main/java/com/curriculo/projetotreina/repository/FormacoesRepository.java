package com.curriculo.projetotreina.repository;

import com.curriculo.projetotreina.model.Formacoes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FormacoesRepository extends JpaRepository<Formacoes, Integer> {
    
 }