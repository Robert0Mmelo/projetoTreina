package com.curriculo.projetotreina.controller;

import com.curriculo.projetotreina.model.Graduacao;
import com.curriculo.projetotreina.service.GraduacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5174")
@RestController
@RequestMapping("/api/graduacoes")
public class GraduacaoController {
    @Autowired
    private GraduacaoService graduacaoService;

    @GetMapping
    public List<Graduacao> getAllGraduacoes() {
        return graduacaoService.getAllGraduacoes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Graduacao> getGraduacaoById(@PathVariable Integer id) {
        Optional<Graduacao> graduacao = graduacaoService.getGraduacaoById(id);
        return graduacao.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Graduacao createGraduacao(@RequestBody Graduacao graduacao) {
        return graduacaoService.createGraduacao(graduacao);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Graduacao> updateGraduacao(@PathVariable Integer id, @RequestBody Graduacao graduacaoDetails) {
        try {
            Graduacao updatedGraduacao = graduacaoService.updateGraduacao(id, graduacaoDetails);
            return ResponseEntity.ok(updatedGraduacao);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGraduacao(@PathVariable Integer id) {
        try {
            graduacaoService.deleteGraduacao(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}

