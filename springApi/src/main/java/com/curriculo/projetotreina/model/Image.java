package com.curriculo.projetotreina.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
// import org.hibernate.annotations.Type;
import lombok.Setter;

import jakarta.persistence.*;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Images")
@Getter
@Setter
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    private String name;

    private String type;

    @Lob
    private byte[] imageData;

}