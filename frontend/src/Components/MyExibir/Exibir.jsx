import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaWhatsapp, FaGithub, FaInstagram } from 'react-icons/fa';
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
            inicio: g.inicio ? new Date(g.inicio) : null
          }));
          data.formacoes.posgraduacoes = (data.formacoes.posgraduacoes || []).map(p => ({
            ...p,
            inicio: p.inicio ? new Date(p.inicio) : null
          }));
          data.formacoes.tecnicos = (data.formacoes.tecnicos || []).map(t => ({
            ...t,
            inicio: t.inicio ? new Date(t.inicio) : null
          }));
        }
        if (data.empresas) {
          data.empresas = data.empresas.map(emp => ({
            ...emp,
            inicio: emp.inicio ? new Date(emp.inicio) : null,
            funcoes: (emp.funcoes || []).map(f => ({
              ...f,
              inicio: f.inicio ? new Date(f.inicio) : null
            }))
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

  // Atualiza refresh se a chave "avatarRefresh" mudar
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

  // Desestruturação dos dados do currículo
  const { identificacao, endereco, formacoes, empresas, informacoesAdc } = curriculo;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      {/* Cabeçalho */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <img 
          src={avatarUrl} 
          alt="Avatar" 
          style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', marginRight: '20px' }} 
        />
        <div>
          <h1 style={{ margin: 0 }}>{identificacao.nome}</h1>
          <p style={{ margin: 0, fontSize: '16px' }}>
            {identificacao.telefone}
            {identificacao.isWhatsApp && <FaWhatsapp color="green" style={{ marginLeft: '5px' }} />}
          </p>
        </div>
      </div>

      {/* Endereço */}
      <section style={{ marginBottom: '20px' }}>
        <h2>Endereço</h2>
        <p>
          {endereco.rua}, {endereco.numero} - {endereco.bairro} <br />
          {endereco.cidade} - {endereco.uf} <br />
          CEP: {endereco.cep}
        </p>
      </section>

      {/* Formações */}
      <section style={{ marginBottom: '20px' }}>
        <h2>Formações</h2>
        {formacoes && (
          <>
            {formacoes.graduacoes && formacoes.graduacoes.length > 0 && (
              <div>
                <h3>Graduações</h3>
                {formacoes.graduacoes.map((grad, i) => (
                  <div key={i} style={{ marginBottom: '10px' }}>
                    <strong>{grad.curso}</strong> em {grad.ies} <br />
                    Início: {grad.inicio ? grad.inicio.toLocaleDateString() : '-'} - Fim: {grad.fim || '-'}
                  </div>
                ))}
              </div>
            )}
            {formacoes.posgraduacoes && formacoes.posgraduacoes.length > 0 && (
              <div>
                <h3>Pós-Graduações</h3>
                {formacoes.posgraduacoes.map((pos, i) => (
                  <div key={i} style={{ marginBottom: '10px' }}>
                    <strong>{pos.curso}</strong> em {pos.ie} - {pos.titulo} <br />
                    Início: {pos.inicio ? pos.inicio.toLocaleDateString() : '-'} - Fim: {pos.fim || '-'}
                  </div>
                ))}
              </div>
            )}
            {formacoes.tecnicos && formacoes.tecnicos.length > 0 && (
              <div>
                <h3>Cursos Técnicos</h3>
                {formacoes.tecnicos.map((tec, i) => (
                  <div key={i} style={{ marginBottom: '10px' }}>
                    <strong>{tec.curso}</strong> em {tec.ic} <br />
                    Início: {tec.inicio ? tec.inicio.toLocaleDateString() : '-'} - Fim: {tec.fim || '-'}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      {/* Experiência */}
      <section style={{ marginBottom: '20px' }}>
        <h2>Experiência</h2>
        {empresas && empresas.length > 0 ? (
          empresas.map((empresa, i) => (
            <div key={i} style={{ marginBottom: '15px' }}>
              <h3>{empresa.nome}</h3>
              <p>
                Início: {empresa.inicio ? empresa.inicio.toLocaleDateString() : '-'} - Fim: {empresa.fim || '-'}
              </p>
              {empresa.funcoes && empresa.funcoes.length > 0 && (
                <div style={{ paddingLeft: '15px' }}>
                  <h4>Funções:</h4>
                  {empresa.funcoes.map((funcao, j) => (
                    <p key={j}>
                      <strong>{funcao.nome}</strong>: Início: {funcao.inicio ? funcao.inicio.toLocaleDateString() : '-'} - Fim: {funcao.fim || '-'}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Sem experiência.</p>
        )}
      </section>

      {/* Informações Adicionais */}
      <section style={{ marginBottom: '20px' }}>
        <h2>Informações Adicionais</h2>
        <p>
          {informacoesAdc.linkedin && (
            <a href={informacoesAdc.linkedin} target="_blank" rel="noreferrer" style={{ marginRight: '10px' }}>
              <FaGithub size={20} />
            </a>
          )}
          {informacoesAdc.github && (
            <a href={informacoesAdc.github} target="_blank" rel="noreferrer" style={{ marginRight: '10px' }}>
              <FaGithub size={20} />
            </a>
          )}
          {informacoesAdc.instagram && (
            <a href={`https://instagram.com/${informacoesAdc.instagram}`} target="_blank" rel="noreferrer" style={{ marginRight: '10px' }}>
              <FaInstagram size={20} />
            </a>
          )}
          <br />
          <strong>Email:</strong> {informacoesAdc.email}
        </p>
      </section>

      {/* Botão de Imprimir */}
      <button onClick={handlePrint} style={{ padding: '10px 15px', fontSize: '16px', cursor: 'pointer' }}>
        <MdPrint style={{ marginRight: '5px' }} />
        Imprimir Currículo
      </button>
    </div>
  );

}

export default Exibir;
