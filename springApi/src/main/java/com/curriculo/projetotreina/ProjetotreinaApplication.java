package com.curriculo.projetotreina;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.curriculo.projetotreina.model")
public class ProjetotreinaApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjetotreinaApplication.class, args);
	}

}
