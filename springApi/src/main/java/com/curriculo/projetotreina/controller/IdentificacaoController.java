package com.curriculo.projetotreina.controller;

import com.curriculo.projetotreina.model.Identificacao;
import com.curriculo.projetotreina.service.IdentificacaoService;
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
@RequestMapping("/api/identificacoes")
public class IdentificacaoController {

    @Autowired
    private IdentificacaoService identificacaoService;
    
    @GetMapping
    public List<Identificacao> getAllIdentificacoes(){
       return identificacaoService.getAllIdentificacoes();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Identificacao> getIdentificacaoById(@PathVariable Integer id) {
       Optional<Identificacao> identificacao = identificacaoService.getIdentificacaoById(id);
       return identificacao.map(ResponseEntity::ok)
           .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public Identificacao createIdentificacao(@RequestBody Identificacao identificacao) {
       return identificacaoService.createIdentificacao(identificacao);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Identificacao> updateIdentificacao(@PathVariable Integer id,
                                                             @RequestBody Identificacao identificacaoDetails) {
       try {
           Identificacao updatedIdentificacao = identificacaoService.updateIdentificacao(id, identificacaoDetails);
           return ResponseEntity.ok(updatedIdentificacao);
       } catch(RuntimeException e) {
           return ResponseEntity.notFound().build();
       }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIdentificacao(@PathVariable Integer id) {
       try {
           identificacaoService.deleteIdentificacao(id);
           return ResponseEntity.noContent().build();
       } catch(RuntimeException e) {
           return ResponseEntity.notFound().build();
       }
    }
}
