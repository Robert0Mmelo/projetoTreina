import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaWhatsapp, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { MdPrint } from 'react-icons/md';
import defaultAvatar from '../../assets/Avatar-Default.png';

function Exibir() {
  const [curriculo, setCurriculo] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(defaultAvatar);
  const [refresh, setRefresh] = useState(window.localStorage.getItem("avatarRefresh") || 0);

  // Carrega os dados do currículo (ID=1)
  useEffect(() => {
    axios.get('http://localhost:8080/api/curriculo/1')
      .then(response => {
        const data = response.data;
        // Converte as datas para objetos Date, se necessário
        if (data.formacoes) {
          data.formacoes.graduacoes = (data.formacoes.graduacoes || []).map(g => ({
            ...g,
            inicio: g.inicio ? new Date(g.inicio) : null,
          }));
          data.formacoes.posgraduacoes = (data.formacoes.posgraduacoes || []).map(p => ({
            ...p,
            inicio: p.inicio ? new Date(p.inicio) : null,
          }));
          data.formacoes.tecnicos = (data.formacoes.tecnicos || []).map(t => ({
            ...t,
            inicio: t.inicio ? new Date(t.inicio) : null,
          }));
        }
        if (data.empresas) {
          data.empresas = data.empresas.map(emp => ({
            ...emp,
            inicio: emp.inicio ? new Date(emp.inicio) : null,
            funcoes: (emp.funcoes || []).map(f => ({
              ...f,
              inicio: f.inicio ? new Date(f.inicio) : null,
            })),
          }));
        }
        setCurriculo(data);
      })
      .catch(error => {
        console.error('Erro ao carregar currículo:', error);
      });
  }, []);

  // Carrega o avatar usando o ID salvo no localStorage (ignora fotoPerfil)
  useEffect(() => {
    const imageId = window.localStorage.getItem("avatarImageId") || "1";
    axios.get(`http://localhost:8080/api/images/${imageId}?t=${refresh}`, { responseType: 'blob' })
      .then(response => {
        const url = URL.createObjectURL(response.data);
        setAvatarUrl(url);
      })
      .catch(error => {
        console.error('Erro ao buscar avatar:', error);
        setAvatarUrl(defaultAvatar);
      });
  }, [refresh]);

  // Atualiza o refresh se a chave "avatarRefresh" mudar
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "avatarRefresh") {
        setRefresh(event.newValue);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!curriculo) {
    return <div>Carregando currículo...</div>;
  }

  // Caso o objeto informacoesAdc não exista, usamos um objeto vazio para evitar erros
  const { identificacao, endereco, formacoes, empresas, informacoesAdc = {} } = curriculo;

  return (
    <div className="container mt-5" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* CSS para esconder a navbar na impressão */}
      <style>
        {`
          @media print {
            .navbar {
              display: none !important;
            }
          }
        `}
      </style>

      <div className="card shadow">
        <div className="card-body">
          <div className="row">
            {/* Coluna do perfil */}
            <div className="col-md-4 text-center border-right">
              <img 
                src={avatarUrl} 
                alt="Avatar" 
                className="img-fluid rounded-circle mb-3" 
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              <h2>{identificacao?.nome}</h2>
              <p>
                {identificacao?.telefone}
                {identificacao?.whatsapp && (
                  <FaWhatsapp color="green" style={{ marginLeft: '5px' }} />
                )}
              </p>
              <hr />
              <h5>Endereço</h5>
              <p>
                {endereco?.rua}, {endereco?.numero} - {endereco?.bairro}<br/>
                {endereco?.cidade} - {endereco?.uf}<br/>
                CEP: {endereco?.cep}
              </p>
              <hr />
              <h5>Contato</h5>
              <div className="text-center">
                <p>
                  <strong>Email:</strong> {informacoesAdc?.email}
                </p>
                {informacoesAdc?.linkedin && (
                  <p className="d-flex justify-content-center align-items-center mb-2">
                    <FaLinkedin size={20} style={{ marginRight: '5px' }} />
                    {informacoesAdc.linkedin}
                  </p>
                )}
                {informacoesAdc?.github && (
                  <p className="d-flex justify-content-center align-items-center mb-2">
                    <FaGithub size={20} style={{ marginRight: '5px' }} />
                    {informacoesAdc.github}
                  </p>
                )}
                {informacoesAdc?.instagram && (
                  <p className="d-flex justify-content-center align-items-center mb-2">
                    <FaInstagram size={20} style={{ marginRight: '5px' }} />
                    {informacoesAdc.instagram}
                  </p>
                )}
              </div>
            </div>

            {/* Coluna de formações e experiência */}
            <div className="col-md-8">
              <h4 className="mb-3">Formações</h4>
              {formacoes && (
                <>
                  {formacoes.graduacoes && formacoes.graduacoes.length > 0 && (
                    <div className="mb-3">
                      <h5>Graduações</h5>
                      {formacoes.graduacoes.map((grad, i) => (
                        <div key={i}>
                          <strong>{grad.curso}</strong> em {grad.ies}<br/>
                          <small>
                            Início: {grad.inicio ? grad.inicio.toLocaleDateString() : '-'} | Fim: {grad.fim || '-'}
                          </small>
                        </div>
                      ))}
                    </div>
                  )}
                  {formacoes.posgraduacoes && formacoes.posgraduacoes.length > 0 && (
                    <div className="mb-3">
                      <h5>Pós-Graduações</h5>
                      {formacoes.posgraduacoes.map((pos, i) => (
                        <div key={i}>
                          <strong>{pos.curso}</strong> em {pos.ie} - {pos.titulo}<br/>
                          <small>
                            Início: {pos.inicio ? pos.inicio.toLocaleDateString() : '-'} | Fim: {pos.fim || '-'}
                          </small>
                        </div>
                      ))}
                    </div>
                  )}
                  {formacoes.tecnicos && formacoes.tecnicos.length > 0 && (
                    <div className="mb-3">
                      <h5>Cursos Técnicos</h5>
                      {formacoes.tecnicos.map((tec, i) => (
                        <div key={i}>
                          <strong>{tec.curso}</strong> em {tec.ic}<br/>
                          <small>
                            Início: {tec.inicio ? tec.inicio.toLocaleDateString() : '-'} | Fim: {tec.fim || '-'}
                          </small>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
              <hr />
              <h4 className="mb-3">Experiência</h4>
              {empresas && empresas.length > 0 ? (
                empresas.map((empresa, i) => (
                  <div key={i} className="mb-3">
                    <h5>{empresa.nome}</h5>
                    <p>
                      <small>
                        Início: {empresa.inicio ? empresa.inicio.toLocaleDateString() : '-'} | Fim: {empresa.fim || '-'}
                      </small>
                    </p>
                    {empresa.funcoes && empresa.funcoes.length > 0 && (
                      <div className="ml-3">
                        <h6>Funções:</h6>
                        {empresa.funcoes.map((funcao, j) => (
                          <p key={j}>
                            <strong>{funcao.nome}</strong>: 
                            <small> Início: {funcao.inicio ? funcao.inicio.toLocaleDateString() : '-'} | Fim: {funcao.fim || '-'}</small>
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>Sem experiência.</p>
              )}
            </div>
          </div>
          <div className="text-right mt-4">
            <button onClick={handlePrint} className="btn btn-primary">
              <MdPrint style={{ marginRight: '5px' }}/>
              Imprimir Currículo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Exibir;

