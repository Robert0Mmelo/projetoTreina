package com.curriculo.projetotreina;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@Service
public class ViaCepService {
    private final RestTemplate restTemplate;

    public ViaCepService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Map<String,String> buscarEnderecoPorCep(String cep) {
        String url = UriComponentsBuilder.fromUriString("https://viacep.com.br/ws/{cep}/json/").buildAndExpand(cep).toString();
        return restTemplate.getForObject(url, Map.class);
    }
}
