package com.curriculo.projetotreina.service;

import com.curriculo.projetotreina.model.Identificacao;
import com.curriculo.projetotreina.repository.IdentificacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IdentificacaoService {

    @Autowired
    private IdentificacaoRepository identificacaoRepository;
    
    public List<Identificacao> getAllIdentificacoes(){
       return identificacaoRepository.findAll();
    }
    
    public Optional<Identificacao> getIdentificacaoById(Integer id){
       return identificacaoRepository.findById(id);
    }
    
    public Identificacao createIdentificacao(Identificacao identificacao) {
       return identificacaoRepository.save(identificacao);
    }
    
    public Identificacao updateIdentificacao(Integer id, Identificacao identificacaoDetails) {
       Identificacao identificacao = identificacaoRepository.findById(id)
           .orElseThrow(() -> new RuntimeException("Identificação não encontrada pelo id " + id));
       identificacao.setNome(identificacaoDetails.getNome());
       identificacao.setTelefone(identificacaoDetails.getTelefone());
       identificacao.setEndereco(identificacaoDetails.getEndereco());
       identificacao.setWhatsapp(identificacaoDetails.isWhatsapp());
       return identificacaoRepository.save(identificacao);
    }
    
    public void deleteIdentificacao(Integer id) {
       Identificacao identificacao = identificacaoRepository.findById(id)
           .orElseThrow(() -> new RuntimeException("Identificação não encontrada pelo id " + id));
       identificacaoRepository.delete(identificacao);
    }
}