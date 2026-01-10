# 🐾 VistaPet

VistaPet é um projeto **open source de caráter educacional** criado como uma carta de amor aos pets e às pessoas que cuidam deles.

A proposta é oferecer uma **base sólida, simples e extensível** para sistemas de gestão veterinária, clínicas, ONGs ou projetos de aprendizado — sempre com respeito ao domínio e às histórias que ele representa.

Este projeto **não nasce com foco comercial**, mas como:

- um projeto de aprendizado real
- um portfólio técnico
- uma base aberta para quem quiser adaptar, evoluir ou contribuir

---

## 🎯 Objetivo do Projeto

O VistaPet busca modelar o **ciclo administrativo de um pet** dentro de um sistema, com cuidado técnico e sensibilidade humana.

Princípios que guiam o desenvolvimento:

- Nenhum pet é “apagado” do sistema sem necessidade
- Estados são tratados de forma explícita e compreensível
- Regras administrativas não se misturam com regras clínicas
- O código deve ser legível, extensível e honesto

---

## 🧱 Estrutura do Projeto

```text
vistapet/
├── vistapet-backend/     # API REST (Spring Boot)
├── vistapet-frontend/    # Frontend (React)
├── extras/               # Postman, exemplos e materiais auxiliares
└── README.md
```

⚙️ Backend — vistapet-backend

API REST desenvolvida em Java + Spring Boot, responsável pela lógica de negócio e regras administrativas do sistema.
Tecnologias utilizadas

    Java 17+

    Spring Boot

    Spring Data JPA

    PostgreSQL

    Maven

Conceitos aplicados

    Arquitetura em camadas (com separação clara de responsabilidades)

    Uso de DTOs para isolamento entre API e domínio

    Soft delete via status administrativo

    Enums para modelagem explícita de estados

    Transações bem definidas

    Código orientado à legibilidade e manutenção

Status do Pet

O estado de um pet é representado por um enum administrativo:

public enum PetStatus {
    ATIVO,
    INATIVO,
    ADOTADO,
    ARQUIVADO,
    DESCONHECIDO
}

⚠️ Importante: este status não representa condição clínica ou biológica, apenas o estado do pet dentro do sistema.


🌐 Frontend — vistapet-frontend

Frontend desenvolvido em React, atualmente em estágio inicial, com foco em integração direta com a API.
Funcionalidades atuais

    CRUD completo de Pets

    CRUD completo de Tutores

    Comunicação funcional com o backend

A ideia é evoluir o frontend gradualmente, mantendo alinhamento conceitual com a API e evitando complexidade prematura.


🧪 Extras — extras

Pasta destinada a materiais auxiliares, como:

    Collections do Postman

    Exemplos de payloads

    Documentação de testes manuais da API

Ideal para quem quiser testar ou contribuir rapidamente.



🚀 Como executar o projeto (Backend)
Pré-requisitos

    Java 17+

    Maven

    PostgreSQL

Execução

cd vistapet-backend
mvn spring-boot:run

A API ficará disponível em:

http://localhost:8080

🚀 Como executar o projeto (Frontend)
Pré-requisitos

    Node.js

    NPM

    React

Execução

cd vistapet-frontend
npm install
npm run dev

A aplicação ficará disponível em:

http://localhost:5173

🛠️ Exemplos de uso (API)
Criar um pet

POST /api/pets

{
  "nome": "test",
  "especie": "test",
  "peso": 0.1,
  "raca": "test",
  "cor": "test",
  "observacao": "Isso não é um pet!",
  "status": "ATIVO"
}

Desativar um pet (soft delete)

PATCH /api/pets/{id}/disable

O pet não é removido do banco, apenas marcado como INATIVO.
🤝 Contribuição

Este projeto é aberto à comunidade.

Sinta-se à vontade para:

    abrir issues

    sugerir melhorias

    criar forks

    adaptar o projeto à sua realidade

Toda contribuição respeitosa é bem-vinda.
📜 Licença

Este projeto é licenciado sob a Creative Commons Attribution–NonCommercial 4.0 (CC BY-NC 4.0).

Você pode:

    Usar

    Estudar

    Modificar

    Compartilhar

Desde que:

    Dê os créditos ao autor

    Não utilize para fins comerciais

Para mais detalhes, consulte o arquivo LICENSE.
❤️ Considerações finais

VistaPet não é apenas código.

É uma tentativa de fazer software com respeito, clareza e propósito.

Se este projeto ajudar alguém — seja um desenvolvedor, uma clínica, uma ONG ou um pet — ele já cumpriu sua missão.