package com.curriculo.projetotreina.repository;

import com.curriculo.projetotreina.model.Identificacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IdentificacaoRepository extends JpaRepository<Identificacao, Integer> {
    
 }
