import React from 'react';

const About: React.FC = () => {
    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-10">

                    <div className="card shadow-sm mb-4">
                        <div className="card-body">
                            <h2 className="mb-3">🐾 Sobre o VistaPet</h2>

                            <p>
                                O <strong>VistaPet</strong> é um projeto open source criado com o objetivo
                                de servir como base técnica e conceitual para sistemas de gestão voltados
                                ao cuidado de pets, tutores, clínicas e iniciativas sociais.
                            </p>

                            <p>
                                Mais do que um CRUD, o VistaPet busca modelar o <strong>ciclo administrativo
                                de um pet</strong> com clareza, respeito e boas práticas de engenharia de software.
                            </p>

                            <ul className="mt-3">
                                <li>Arquitetura organizada e extensível</li>
                                <li>Estados explícitos via enums</li>
                                <li>Soft delete consciente (nada some sem motivo)</li>
                                <li>Frontend simples, funcional e em evolução</li>
                            </ul>
                        </div>
                    </div>

                    <div className="card shadow-sm mb-4">
                        <div className="card-body">
                            <h3 className="mb-3">👨‍💻 Sobre o Autor</h3>

                            <p className="mb-1">
                                <strong>Renato Carvalho Silva</strong>
                            </p>

                            <p>
                                Desenvolvedor backend com foco em Java e Spring Boot, apaixonado por
                                tecnologia desde a infância e interessado em construir software com
                                propósito, clareza e responsabilidade técnica.
                            </p>

                            <p>
                                O VistaPet também funciona como um projeto de aprendizado contínuo,
                                portfólio técnico e laboratório de boas decisões arquiteturais.
                            </p>

                            <div className="d-flex flex-wrap gap-3 mt-3">
                                <a
                                    href="https://github.com/rcsilva96"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-outline-dark"
                                >
                                    🐙 GitHub
                                </a>

                                <a
                                    href="https://www.linkedin.com/in/silva-renato-carvalho"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-outline-primary"
                                >
                                    💼 LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h4 className="mb-3">🧭 Filosofia do Projeto</h4>

                            <p className="mb-2">
                                O VistaPet segue alguns princípios simples:
                            </p>

                            <ul>
                                <li>Código deve ser legível antes de ser esperto</li>
                                <li>Estados importam mais do que flags soltas</li>
                                <li>Software também é uma forma de cuidado</li>
                                <li>Aprender bem é mais importante do que “entregar rápido”</li>
                            </ul>

                            <p className="mt-3 text-muted fst-italic">
                                “Se este projeto ajudar alguém — um desenvolvedor, uma ONG ou um pet —
                                então ele já cumpriu seu papel.”
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default About;
