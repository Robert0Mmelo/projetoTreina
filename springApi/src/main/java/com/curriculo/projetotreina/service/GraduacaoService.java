package com.curriculo.projetotreina.service;

import com.curriculo.projetotreina.model.Graduacao;
import com.curriculo.projetotreina.repository.GraduacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GraduacaoService {

    @Autowired
    private GraduacaoRepository graduacaoRepository;

    public List<Graduacao> getAllGraduacoes() {
        return graduacaoRepository.findAll();
    }

    public Optional<Graduacao> getGraduacaoById(Integer id) {
        return graduacaoRepository.findById(id);
    }

    public Graduacao createGraduacao(Graduacao graduacao) {
        return graduacaoRepository.save(graduacao);
    }

    public Graduacao updateGraduacao(Integer id, Graduacao graduacaoDetails) {
        Graduacao graduacao = graduacaoRepository.findById(id).orElseThrow(() -> new RuntimeException("Graduação não encontrada pelo id" + id));
        graduacao.setInicio(graduacaoDetails.getInicio());
        graduacao.setFim(graduacaoDetails.getFim());
        graduacao.setCurso(graduacaoDetails.getCurso());
        graduacao.setIes(graduacaoDetails.getIes());
        
        return graduacaoRepository.save(graduacao);
    }

    public void deleteGraduacao(Integer id) {
        Graduacao graduacao = graduacaoRepository.findById(id).orElseThrow(() -> new RuntimeException("Graduação não encontrada pelo id" + id));
        graduacaoRepository.delete(graduacao);
    }
}
