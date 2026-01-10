export default function TutorFormTips() {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">

        <h6 className="text-muted mb-3">
          🧭 Orientações de Cadastro
        </h6>

        <ul className="list-unstyled small">
          <li className="mb-2">
            🟣 <strong>APTO</strong><br />
            Tutor avaliado e liberado para adoção.
          </li>

          <li className="mb-2">
            🟢 <strong>ATIVO</strong><br />
            Já possui adoções ou processo em andamento.
          </li>

          <li className="mb-2">
            🔵 <strong>SOB OBSERVAÇÃO</strong><br />
            Utilize quando houver relatos ou dúvidas.
          </li>

          <li className="mb-2">
            🟡 <strong>BLOQUEADO</strong><br />
            Impede novas adoções. Justifique nas ocorrências.
          </li>

          <li className="mb-2">
            ⚫ <strong>ARQUIVADO</strong><br />
            Registro histórico, sem ações futuras.
          </li>
        </ul>

        <hr />

        <div className="alert alert-warning small mb-0">
          ⚠️ Tutores com histórico de maus-tratos
          <strong> não devem ser liberados</strong> sem análise formal.
        </div>

      </div>
    </div>
  );
}
