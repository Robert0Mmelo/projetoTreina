package com.curriculo.projetotreina.service;

import com.curriculo.projetotreina.model.Funcao;
import com.curriculo.projetotreina.repository.FuncaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FuncaoService {

    @Autowired
    private FuncaoRepository funcaoRepository;

    public List<Funcao> getAllFuncoes() {
        return funcaoRepository.findAll();
    }

    public Optional<Funcao> getFuncaoById(Integer id) {
        return funcaoRepository.findById(id);
    }

    public Funcao createFuncao(Funcao funcao) {
        return funcaoRepository.save(funcao);
    }

    public Funcao updateFuncao(Integer id, Funcao funcaoDetails) {
        Funcao funcao = funcaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Função não encontrada pelo id " + id));
        funcao.setNome(funcaoDetails.getNome());
        funcao.setInicio(funcaoDetails.getInicio());
        funcao.setFim(funcaoDetails.getFim());
        funcao.setEmpresa(funcaoDetails.getEmpresa());
        return funcaoRepository.save(funcao);
    }

    public void deleteFuncao(Integer id) {
        Funcao funcao = funcaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Função não encontrada pelo id " + id));
        funcaoRepository.delete(funcao);
    }
}
