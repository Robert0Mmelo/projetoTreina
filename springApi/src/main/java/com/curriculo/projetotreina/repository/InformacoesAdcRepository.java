package com.curriculo.projetotreina.repository;

import com.curriculo.projetotreina.model.InformacoesAdc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InformacoesAdcRepository extends JpaRepository<InformacoesAdc, Integer> { }