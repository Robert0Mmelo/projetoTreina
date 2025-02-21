package com.curriculo.projetotreina.controller;

import com.curriculo.projetotreina.model.Formacoes;
import com.curriculo.projetotreina.service.FormacoesService;
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

@CrossOrigin(origins = "http://localhost:5176")
@RestController
@RequestMapping("/api/formacoes")
public class FormacoesController {

    @Autowired
    private FormacoesService formacoesService;

    @GetMapping
    public List<Formacoes> getAllFormacoes() {
        return formacoesService.getAllFormacoes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Formacoes> getFormacoesById(@PathVariable Integer id) {
        Optional<Formacoes> formacoes = formacoesService.getFormacoesById(id);
        return formacoes.map(ResponseEntity::ok)
                        .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Formacoes createFormacoes(@RequestBody Formacoes formacoes) {
        return formacoesService.createFormacoes(formacoes);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Formacoes> updateFormacoes(@PathVariable Integer id,
                                                     @RequestBody Formacoes formacoesDetails) {
        try {
            Formacoes updatedFormacoes = formacoesService.updateFormacoes(id, formacoesDetails);
            return ResponseEntity.ok(updatedFormacoes);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFormacoes(@PathVariable Integer id) {
        try {
            formacoesService.deleteFormacoes(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}