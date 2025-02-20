package com.curriculo.projetotreina.controller;

import com.curriculo.projetotreina.model.Empresa;
import com.curriculo.projetotreina.service.EmpresaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5174")
@RestController
@RequestMapping("/api/empresas")
public class EmpresaController {

    @Autowired
    private EmpresaService empresaService;

    @GetMapping
    public List<Empresa> getAllEmpresas() {
        return empresaService.getAllEmpresas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Empresa> getEmpresaById(@PathVariable Integer id) {
        Optional<Empresa> empresa = empresaService.getEmpresaById(id);
        return empresa.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Empresa createEmpresa(@RequestBody Empresa empresa) {
        return empresaService.createEmpresa(empresa);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Empresa> updateEmpresa(@PathVariable Integer id, @RequestBody Empresa empresaDetails) {
        try {
            Empresa updatedEmpresa = empresaService.updateEmpresa(id, empresaDetails);
            return ResponseEntity.ok(updatedEmpresa);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmpresa(@PathVariable Integer id) {
        try {
            empresaService.deleteEmpresa(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}