package com.curriculo.projetotreina.repository;

import com.curriculo.projetotreina.model.Graduacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GraduacaoRepository extends JpaRepository<Graduacao, Integer> {
    
}
