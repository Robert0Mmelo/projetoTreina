package com.curriculo.projetotreina.repository;

import com.curriculo.projetotreina.model.Curriculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CurriculoRepository extends JpaRepository<Curriculo, Integer> {
}
