package com.curriculo.projetotreina.service;

import com.curriculo.projetotreina.model.InformacoesAdc;
import com.curriculo.projetotreina.repository.InformacoesAdcRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InformacoesAdcService {

    @Autowired
    private InformacoesAdcRepository informacoesAdcRepository;
    
    public List<InformacoesAdc> getAllInformacoesAdc(){
        return informacoesAdcRepository.findAll();
    }
    
    public Optional<InformacoesAdc> getInformacoesAdcById(Integer id) {
        return informacoesAdcRepository.findById(id);
    }
    
    public InformacoesAdc createInformacoesAdc(InformacoesAdc informacoesAdc) {
        return informacoesAdcRepository.save(informacoesAdc);
    }
    
    public InformacoesAdc updateInformacoesAdc(Integer id, InformacoesAdc informacoesAdcDetails) {
        InformacoesAdc informacoesAdc = informacoesAdcRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Informações adicionais não encontradas pelo id " + id));
        informacoesAdc.setLinkedin(informacoesAdcDetails.getLinkedin());
        informacoesAdc.setGithub(informacoesAdcDetails.getGithub());
        informacoesAdc.setInstagram(informacoesAdcDetails.getInstagram());
        informacoesAdc.setEmail(informacoesAdcDetails.getEmail());
        return informacoesAdcRepository.save(informacoesAdc);
    }
    
    public void deleteInformacoesAdc(Integer id) {
        InformacoesAdc informacoesAdc = informacoesAdcRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Informações adicionais não encontradas pelo id " + id));
        informacoesAdcRepository.delete(informacoesAdc);
    }
}
