package com.curriculo.projetotreina.service;

import com.curriculo.projetotreina.model.Tecnico;
import com.curriculo.projetotreina.repository.TecnicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TecnicoService {

    @Autowired
    private TecnicoRepository tecnicoRepository;

    public List<Tecnico> getAllTecnicos() {
        return tecnicoRepository.findAll();
    }

    public Optional<Tecnico> getTecnicoById(Integer id) {
        return tecnicoRepository.findById(id);
    }

    public Tecnico createTecnico(Tecnico tecnico) {
        return tecnicoRepository.save(tecnico);
    }

    public Tecnico updateTecnico(Integer id, Tecnico tecnicoDetails) {
        Tecnico tecnico = tecnicoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Curso técnico não encontrado pelo id " + id));
            tecnico.setInicio(tecnicoDetails.getInicio());
            tecnico.setFim(tecnicoDetails.getFim());
        tecnico.setCurso(tecnicoDetails.getCurso());
        tecnico.setIc(tecnicoDetails.getIc());
        return tecnicoRepository.save(tecnico);
    }

    public void deleteTecnico(Integer id) {
        Tecnico tecnico = tecnicoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Curso técnico não encontrado pelo id " + id));
        tecnicoRepository.delete(tecnico);
    }
}