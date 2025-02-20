package com.curriculo.projetotreina.controller;

import com.curriculo.projetotreina.model.InformacoesAdc;
import com.curriculo.projetotreina.service.InformacoesAdcService;
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
@RequestMapping("/api/informacoesadc")
public class InformacoesAdcController {

    @Autowired
    private InformacoesAdcService informacoesAdcService;
    
    @GetMapping
    public List<InformacoesAdc> getAllInformacoesAdc(){
        return informacoesAdcService.getAllInformacoesAdc();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<InformacoesAdc> getInformacoesAdcById(@PathVariable Integer id) {
        Optional<InformacoesAdc> informacoesAdc = informacoesAdcService.getInformacoesAdcById(id);
        return informacoesAdc.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public InformacoesAdc createInformacoesAdc(@RequestBody InformacoesAdc informacoesAdc) {
        return informacoesAdcService.createInformacoesAdc(informacoesAdc);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<InformacoesAdc> updateInformacoesAdc(@PathVariable Integer id,
                                                               @RequestBody InformacoesAdc informacoesAdcDetails) {
        try {
            InformacoesAdc updatedInformacoesAdc = informacoesAdcService.updateInformacoesAdc(id, informacoesAdcDetails);
            return ResponseEntity.ok(updatedInformacoesAdc);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInformacoesAdc(@PathVariable Integer id) {
        try {
            informacoesAdcService.deleteInformacoesAdc(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}