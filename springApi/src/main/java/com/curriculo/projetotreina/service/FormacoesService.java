package com.curriculo.projetotreina.service;

import com.curriculo.projetotreina.model.Formacoes;
import com.curriculo.projetotreina.repository.FormacoesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FormacoesService {

    @Autowired
    private FormacoesRepository formacoesRepository;

    public List<Formacoes> getAllFormacoes() {
        return formacoesRepository.findAll();
    }

    public Optional<Formacoes> getFormacoesById(Integer id) {
        return formacoesRepository.findById(id);
    }

    public Formacoes createFormacoes(Formacoes formacoes) {
        return formacoesRepository.save(formacoes);
    }

    public Formacoes updateFormacoes(Integer id, Formacoes formacoesDetails) {
        Formacoes formacoes = formacoesRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Formações não encontradas pelo id " + id));
        formacoes.setGraduacoes(formacoesDetails.getGraduacoes());
        formacoes.setPosgraduacoes(formacoesDetails.getPosgraduacoes());
        formacoes.setTecnicos(formacoesDetails.getTecnicos());
        return formacoesRepository.save(formacoes);
    }

    public void deleteFormacoes(Integer id) {
        Formacoes formacoes = formacoesRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Formações não encontradas pelo id " + id));
        formacoesRepository.delete(formacoes);
    }
}
