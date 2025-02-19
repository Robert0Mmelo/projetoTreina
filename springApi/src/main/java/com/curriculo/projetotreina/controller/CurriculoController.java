package com.curriculo.projetotreina.controller;

import com.curriculo.projetotreina.model.Curriculo;
import com.curriculo.projetotreina.repository.CurriculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/curriculo")
public class CurriculoController {

    @Autowired
    private CurriculoRepository curriculoRepository;

    @GetMapping
    public List<Curriculo> getAllCurriculos() {
        return curriculoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Curriculo> getCurriculoById(@PathVariable Integer id) {
        Optional<Curriculo> curriculo = curriculoRepository.findById(id);
        return curriculo.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Curriculo> createCurriculo(@RequestBody Curriculo curriculo) {
        Curriculo saved = curriculoRepository.save(curriculo);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Curriculo> updateCurriculo(@PathVariable Integer id, @RequestBody Curriculo updatedCurriculo) {
        Optional<Curriculo> optional = curriculoRepository.findById(id);
        if (!optional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Curriculo existing = optional.get();
        existing.setIdentificacao(updatedCurriculo.getIdentificacao());
        existing.setEndereco(updatedCurriculo.getEndereco());
        existing.setFormacoes(updatedCurriculo.getFormacoes());
        existing.setEmpresas(updatedCurriculo.getEmpresas());
        existing.setInformacoesAdc(updatedCurriculo.getInformacoesAdc());

        Curriculo saved = curriculoRepository.save(existing);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCurriculo(@PathVariable Integer id) {
        Optional<Curriculo> optional = curriculoRepository.findById(id);
        if (!optional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        curriculoRepository.delete(optional.get());
        return ResponseEntity.noContent().build();
    }
}
