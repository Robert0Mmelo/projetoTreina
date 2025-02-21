# 📄 ProjetoTreina - Currículo Online

Este projeto consiste em um sistema que permite o cadastro, edição e exibição de um curriculo online. Com uma interface intuitiva e interativa, os usuários podem inserir suas informações pessoais, experiências profissionais, formações acadêmicas e gerar um currículo automaticamente. 

## 📂 Estrutura do Projeto
- **Backend:** Desenvolvido em Java com Spring Boot.
- **Frontend:** Criado com React.
- **Banco de Dados:** MySQL.
- **Armazenamento de Imagens:** Banco de Dados (Blob).

---

## 📌 Spring API (pasta `springApi`)

### 📜 Descrição
A API foi desenvolvida utilizando o framework Spring Boot e gerencia todas as operações CRUD do sistema. Ela lida com autenticação, armazenamento de dados no banco MySQL e upload de imagens.

### ✅ Pré-requisitos
- Java 17
- Maven 3
- MySQL Server

### 📥 Como baixar o projeto
```bash
# Clone o repositório
git clone https://github.com/Robert0Mmelo/projetoTreina.git
cd frontend npm install
```

### ▶️ Como rodar o projeto
1. Configure o banco de dados no `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/curriculo
spring.datasource.username=treina
spring.datasource.password=treina
```
2. Compile e execute a aplicação:
```bash
mvnw spring-boot:run
```
3. Acesse a API em `http://localhost:8080/api`


---

## 🎨 Frontend (pasta `frontend`)

### 🖼️ Print de Tela
![Print do Sistema](Print%20exemplo.png)

### ✅ Pré-requisitos
- Node.js 


### ▶️ Como rodar o projeto
1. Instale as dependências:
```bash
cmd cd frontend
npm install 
```
2. Inicie o servidor de desenvolvimento:
```bash
npm run dev 
```
3. Acesse `http://localhost:5176`



---

## 🛠️ Tecnologias Utilizadas
- **Backend:** Java, Spring Boot, MySQL, Maven
- **Frontend:** React, Vite, Axios, Bootstrap
- **Outras:** Docker (opcional), Git

💡 Desenvolvido por **Roberto Mateus** 
