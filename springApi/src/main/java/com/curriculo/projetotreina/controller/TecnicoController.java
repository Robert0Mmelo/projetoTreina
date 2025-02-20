package com.curriculo.projetotreina.controller;

import com.curriculo.projetotreina.model.Tecnico;
import com.curriculo.projetotreina.service.TecnicoService;
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
@RequestMapping("/api/tecnicos")
public class TecnicoController {

    @Autowired
    private TecnicoService tecnicoService;

    @GetMapping
    public List<Tecnico> getAllTecnicos() {
        return tecnicoService.getAllTecnicos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tecnico> getTecnicoById(@PathVariable Integer id) {
        Optional<Tecnico> tecnico = tecnicoService.getTecnicoById(id);
        return tecnico.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Tecnico createTecnico(@RequestBody Tecnico tecnico) {
        return tecnicoService.createTecnico(tecnico);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tecnico> updateTecnico(@PathVariable Integer id,
                                                 @RequestBody Tecnico tecnicoDetails) {
        try {
            Tecnico updatedTecnico = tecnicoService.updateTecnico(id, tecnicoDetails);
            return ResponseEntity.ok(updatedTecnico);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTecnico(@PathVariable Integer id) {
        try {
            tecnicoService.deleteTecnico(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}