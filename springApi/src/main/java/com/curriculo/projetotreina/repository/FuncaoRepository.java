package com.curriculo.projetotreina.repository;

import com.curriculo.projetotreina.model.Funcao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FuncaoRepository extends JpaRepository<Funcao, Integer> { 
    
}