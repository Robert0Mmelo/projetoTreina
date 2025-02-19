package com.curriculo.projetotreina.service;

import com.curriculo.projetotreina.model.Endereco;
import com.curriculo.projetotreina.repository.EnderecoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnderecoService {
    
    @Autowired
    private EnderecoRepository enderecoRepository;

    public List<Endereco> getAllEnderecos() {
        return enderecoRepository.findAll();
    }

    public Optional <Endereco> getEnderecoById(Integer id) {
        return enderecoRepository.findById(id);
    }

    public Endereco createEndereco(Endereco endereco) {
        return enderecoRepository.save(endereco);
    }

    public Endereco updateEndereco(Integer id, Endereco enderecoDetails) {
        Endereco endereco = enderecoRepository.findById(id).orElseThrow(() -> new RuntimeException("Endereço não encontrado pelo id" + id));

        endereco.setCep(enderecoDetails.getCep());
        endereco.setCidade(enderecoDetails.getCidade());
        endereco.setBairro(enderecoDetails.getBairro());
        endereco.setRua(enderecoDetails.getRua());
        endereco.setNumero(enderecoDetails.getNumero());
        endereco.setUf(enderecoDetails.getUf());

        return enderecoRepository.save(endereco);
    }

    public void deleteEndereco(Integer id) {
        Endereco endereco = enderecoRepository.findById(id).orElseThrow(() -> new RuntimeException("Endereço não encontrado pelo id" + id));
        enderecoRepository.delete(endereco);
    }
}
