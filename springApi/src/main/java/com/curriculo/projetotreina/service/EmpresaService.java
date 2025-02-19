package com.curriculo.projetotreina.service;

import com.curriculo.projetotreina.model.Empresa;
import com.curriculo.projetotreina.repository.EmpresaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmpresaService {

    @Autowired
    private EmpresaRepository empresaRepository;

    public List<Empresa> getAllEmpresas() {
        return empresaRepository.findAll();
    }

    public Optional<Empresa> getEmpresaById(Integer id) {
        return empresaRepository.findById(id);
    }

    public Empresa createEmpresa(Empresa empresa) {
        return empresaRepository.save(empresa);
    }

    public Empresa updateEmpresa(Integer id, Empresa empresaDetails) {
        Empresa empresa = empresaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empresa não encontrada pelo id " + id));
        empresa.setNome(empresaDetails.getNome());
        empresa.setInicio(empresaDetails.getInicio());
        empresa.setFim(empresaDetails.getFim());
        empresa.setFuncoes(empresaDetails.getFuncoes());
        return empresaRepository.save(empresa);
    }

    public void deleteEmpresa(Integer id) {
        Empresa empresa = empresaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empresa não encontrada pelo id " + id));
        empresaRepository.delete(empresa);
    }
}
