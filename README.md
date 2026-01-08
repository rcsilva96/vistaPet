# 🐾 VistaPet

VistaPet é um projeto **open source** criado como uma carta de amor aos pets e às pessoas que cuidam deles.  
A proposta é oferecer uma base sólida, simples e extensível para sistemas de gestão veterinária, clínicas, ONGs ou projetos educacionais.

Este projeto **não nasce com foco comercial**, mas sim como:
- um projeto de aprendizado real
- um portfólio técnico
- uma base aberta para quem quiser adaptar, evoluir ou contribuir

---

## 🎯 Objetivo do Projeto

O VistaPet busca modelar o **ciclo administrativo de um pet** dentro de um sistema, com cuidado técnico e sensibilidade humana.

Alguns princípios:
- Nenhum pet é “apagado” do sistema sem necessidade
- Estados são tratados com clareza e respeito
- O código deve ser legível, extensível e honesto

---

## 🧱 Estrutura do Projeto

```text
vistapet/
├── vistapet-backend/     # API REST (Spring Boot)
├── vistapet-frontend/    # Frontend (React - projeto inicial)
├── extras/               # Collections do Postman e materiais auxiliares
└── README.md
```
⚙️ Backend — vistapet-backend

API REST desenvolvida em Java + Spring Boot, responsável por toda a lógica de negócio.
Tecnologias utilizadas

    Java 17+

    Spring Boot

    Spring Data JPA

    PostgreSQL

    Maven

Conceitos aplicados

    Arquitetura em camadas

    DTOs para isolamento de domínio

    Soft delete via status administrativo

    Enum para modelagem clara de estados

    Transações bem definidas

    Código orientado à legibilidade

Status do Pet

O estado de um pet é representado por um enum administrativo:
```
public enum PetStatus {
    ATIVO,
    INATIVO,
    ADOTADO,
    ARQUIVADO,
    DESCONHECIDO
}
```
    ⚠️ Este status não representa condição clínica ou biológica, apenas o estado do pet dentro do sistema.

🌐 Frontend — vistapet-frontend

Frontend iniciado com React, ainda em estágio inicial.

No momento:

    Apenas o projeto base foi criado

    Nenhuma regra de negócio implementada

A ideia é evoluir o frontend aos poucos, mantendo alinhamento com a API.
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

Passos básicos

cd vistapet-backend
mvn spring-boot:run

A API ficará disponível em:

http://localhost:8080

🛠️ Exemplos de uso (API)
Criar um pet

POST /api/pets
```
{
  "nome": "test",
  "especie": "test",
  "peso": 0.1,
  "raca": "test",
  "cor": "test",
  "observacao": "Isso não é um pet!",
  "status": "ATIVO"
}
```
Desativar um pet (soft delete)
```
PATCH /api/pets/{id}/disable
```
O pet não é removido do banco, apenas marcado como INATIVO.


🤝 Contribuição

Este projeto é 100% open source.

Sinta-se à vontade para:

    abrir issues

    sugerir melhorias

    criar forks

    adaptar para sua realidade

Toda contribuição respeitosa é bem-vinda.
📜 Licença: Creative Commons — CC BY-NC 4.0

Este projeto é licenciado sob a **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)**.

Você pode:
- Usar
- Estudar
- Modificar
- Compartilhar

Desde que:
- Dê os créditos ao autor
- **Não utilize para fins comerciais**

Para mais detalhes, consulte o arquivo LICENSE.

Este projeto é distribuído sob licença open source.
Sinta-se livre para usar, estudar e modificar.


❤️ Considerações finais

VistaPet não é apenas código.
É uma tentativa de fazer software com respeito, clareza e propósito.

Se este projeto ajudar alguém — seja um desenvolvedor, uma clínica ou um pet — ele já cumpriu sua missão.
