package com.curriculo.projetotreina.controller;

import com.curriculo.projetotreina.model.Posgraduacao;
import com.curriculo.projetotreina.service.PosgraduacaoService;
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
@RequestMapping("/api/posgraduacoes")
public class PosgraduacaoController {

    @Autowired
    private PosgraduacaoService posgraduacaoService;

    @GetMapping
    public List<Posgraduacao> getAllPosgraduacoes() {
        return posgraduacaoService.getAllPosgraduacoes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Posgraduacao> getPosgraduacaoById(@PathVariable Integer id) {
        Optional<Posgraduacao> posgraduacao = posgraduacaoService.getPosgraduacaoById(id);
        return posgraduacao.map(ResponseEntity::ok)
                           .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Posgraduacao createPosgraduacao(@RequestBody Posgraduacao posgraduacao) {
        return posgraduacaoService.createPosgraduacao(posgraduacao);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Posgraduacao> updatePosgraduacao(@PathVariable Integer id,
                                                           @RequestBody Posgraduacao posgraduacaoDetails) {
        try {
            Posgraduacao updatedPosgraduacao = posgraduacaoService.updatePosgraduacao(id, posgraduacaoDetails);
            return ResponseEntity.ok(updatedPosgraduacao);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePosgraduacao(@PathVariable Integer id) {
        try {
            posgraduacaoService.deletePosgraduacao(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}