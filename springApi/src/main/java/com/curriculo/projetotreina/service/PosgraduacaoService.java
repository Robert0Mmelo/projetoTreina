package com.curriculo.projetotreina.service;

import com.curriculo.projetotreina.model.Posgraduacao;
import com.curriculo.projetotreina.repository.PosgraduacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class PosgraduacaoService {
     @Autowired
    private PosgraduacaoRepository posgraduacaoRepository;

    public List<Posgraduacao> getAllPosgraduacoes() {
        return posgraduacaoRepository.findAll();
    }

    public Optional<Posgraduacao> getPosgraduacaoById(Integer id) {
        return posgraduacaoRepository.findById(id);
    }

    public Posgraduacao createPosgraduacao(Posgraduacao posgraduacao) {
        return posgraduacaoRepository.save(posgraduacao);
    }

    public Posgraduacao updatePosgraduacao(Integer id, Posgraduacao posgraduacaoDetails) {
        Posgraduacao posgraduacao = posgraduacaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pós-graduação não encontrada pelo id " + id));
        posgraduacao.setInicio(posgraduacaoDetails.getInicio());
        posgraduacao.setFim(posgraduacaoDetails.getFim());
        posgraduacao.setCurso(posgraduacaoDetails.getCurso());
        posgraduacao.setIe(posgraduacaoDetails.getIe());
        posgraduacao.setTitulo(posgraduacaoDetails.getTitulo());
        return posgraduacaoRepository.save(posgraduacao);
    }

    public void deletePosgraduacao(Integer id) {
        Posgraduacao posgraduacao = posgraduacaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pós-graduação não encontrada pelo id " + id));
        posgraduacaoRepository.delete(posgraduacao);
    }
}
