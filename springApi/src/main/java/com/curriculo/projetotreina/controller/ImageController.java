package com.curriculo.projetotreina.controller;

import com.curriculo.projetotreina.model.Image;
import com.curriculo.projetotreina.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/images")
@CrossOrigin(origins = "http://localhost:5174")
public class ImageController {

    @Autowired
    private ImageRepository imageRepository;

    // Endpoint para upload de imagem
    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            Image image = Image.builder()
                    .name(file.getOriginalFilename())
                    .type(file.getContentType())
                    .imageData(file.getBytes())
                    .build();
            Image savedImage = imageRepository.save(image);
            // Retorne a URL para acessar a imagem (supondo que o endpoint GET exista)
            String imageUrl = "/api/images/" + savedImage.getId();
            return ResponseEntity.ok(imageUrl);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erro ao salvar imagem");
        }
    }

    // Endpoint para recuperar a imagem pelo ID
    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable Integer id) {
        Image image = imageRepository.findById(id).orElse(null);
        if (image == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + image.getName() + "\"")
                .contentType(MediaType.valueOf(image.getType()))
                .body(image.getImageData());
    }
}
