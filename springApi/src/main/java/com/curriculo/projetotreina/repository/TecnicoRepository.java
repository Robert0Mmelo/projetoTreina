package com.curriculo.projetotreina.repository;

import com.curriculo.projetotreina.model.Tecnico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TecnicoRepository extends JpaRepository<Tecnico, Integer> { 
    
}