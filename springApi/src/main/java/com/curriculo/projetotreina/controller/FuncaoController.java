package com.curriculo.projetotreina.controller;

import com.curriculo.projetotreina.model.Funcao;
import com.curriculo.projetotreina.service.FuncaoService;
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
@RequestMapping("/api/funcoes")
public class FuncaoController {

    @Autowired
    private FuncaoService funcaoService;

    @GetMapping
    public List<Funcao> getAllFuncoes() {
        return funcaoService.getAllFuncoes();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Funcao> getFuncaoById(@PathVariable Integer id) {
        Optional<Funcao> funcao = funcaoService.getFuncaoById(id);
        return funcao.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Funcao createFuncao(@RequestBody Funcao funcao) {
        return funcaoService.createFuncao(funcao);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Funcao> updateFuncao(@PathVariable Integer id, @RequestBody Funcao funcaoDetails) {
        try {
            Funcao updatedFuncao = funcaoService.updateFuncao(id, funcaoDetails);
            return ResponseEntity.ok(updatedFuncao);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFuncao(@PathVariable Integer id) {
        try {
            funcaoService.deleteFuncao(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
