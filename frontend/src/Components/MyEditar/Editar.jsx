import { useState } from "react";

function Editar() {
  const [identificacao, setIdentificacao] = useState({
    nome: "",
    telefone: "",
    isWhatsApp: false,
    fotoPerfil: "",
  });

  const handleChangeIdentificacao = (e) => {
    const { name, type, checked, value } = e.target;
    setIdentificacao((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const [endereco, setEndereco] = useState({
    cep: "",
    rua: "",
    bairro: "",
    numero: "",
    cidade: "",
    uf: "",
  });

  const handleChangeEndereco = (e) => {
    const { name, value } = e.target;
    setEndereco((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCepBlur = () => {
    if (!endereco.cep) return;
    fetch(`http://localhost:8080/api/enderecos/cep/${endereco.cep}`)
      .then((res) => {
        if (!res.ok) throw new Error("CEP inválido ou erro na API");
        return res.json();
      })
      .then((data) => {
        setEndereco((prev) => ({
          ...prev,
          rua: data.logradouro || "",
          bairro: data.bairro || "",
          cidade: data.localidade || "",
          uf: data.uf || "",
        }));
      })
      .catch((err) => console.error("Erro ao buscar CEP:", err));
  };


  const [formacoes, setFormacoes] = useState({
    semGraduacao: false,
    semPos: false,
    semTecnico: false,
    graduacao: {
      inicio: null,
      fim: "",
      curso: "",
      ise: "",
      isEmAndamento: false,
    },
    pos: {
      inicio: null,
      fim: "",
      curso: "",
      ie: "",
      titulo: "MBA",
      isEmAndamento: false,
    },
    tecnico: {
      inicio: null,
      fim: "",
      curso: "",
      ic: "",
      isEmAndamento: false,
    },
  });

  const handleChangeGraduacao = (e) => {
    const { name, value, type, checked } = e.target;
    setFormacoes((prev) => {
      const updated = { ...prev.graduacao };
      if (type === "checkbox") {
        updated.isEmAndamento = checked;
        updated.fim = checked ? "Em andamento" : "";
      } else {
        if (name === "inicio") {
          updated.inicio = value ? new Date(value) : null;
        } else {
          updated[name] = value;
        }
      }
      return { ...prev, graduacao: updated };
    });
  };

  const handleChangePos = (e) => {
    const { name, value, type, checked } = e.target;
    setFormacoes((prev) => {
      const updated = { ...prev.pos };
      if (type === "checkbox") {
        updated.isEmAndamento = checked;
        updated.fim = checked ? "Em andamento" : "";
      } else {
        if (name === "inicio") {
          updated.inicio = value ? new Date(value) : null;
        } else {
          updated[name] = value;
        }
      }
      return { ...prev, pos: updated };
    });
  };

  const handleChangeTecnico = (e) => {
    const { name, value, type, checked } = e.target;
    setFormacoes((prev) => {
      const updated = { ...prev.tecnico };
      if (type === "checkbox") {
        updated.isEmAndamento = checked;
        updated.fim = checked ? "Em andamento" : "";
      } else {
        if (name === "inicio") {
          updated.inicio = value ? new Date(value) : null;
        } else {
          updated[name] = value;
        }
      }
      return { ...prev, tecnico: updated };
    });
  };

  const toggleSemGraduacao = () => {
    setFormacoes((prev) => ({
      ...prev,
      semGraduacao: !prev.semGraduacao,
      graduacao: !prev.semGraduacao
        ? { inicio: null, fim: "", curso: "", ise: "", isEmAndamento: false }
        : prev.graduacao,
    }));
  };

  const toggleSemPos = () => {
    setFormacoes((prev) => ({
      ...prev,
      semPos: !prev.semPos,
      pos: !prev.semPos
        ? { inicio: null, fim: "", curso: "", ie: "", titulo: "MBA", isEmAndamento: false }
        : prev.pos,
    }));
  };

  const toggleSemTecnico = () => {
    setFormacoes((prev) => ({
      ...prev,
      semTecnico: !prev.semTecnico,
      tecnico: !prev.semTecnico
        ? { inicio: null, fim: "", curso: "", ic: "", isEmAndamento: false }
        : prev.tecnico,
    }));
  };


  const [semExperiencia, setSemExperiencia] = useState(false);
  const [empresas, setEmpresas] = useState([
    {
      nome: "",
      inicio: null,
      fim: "",
      funcoes: [
        {
          nome: "",
          inicio: null,
          fim: "",
          isAtualmente: false,
        },
      ],
    },
  ]);

  const toggleSemExperiencia = () => {
    setSemExperiencia((prev) => !prev);
    if (!semExperiencia) {
      setEmpresas([
        {
          nome: "",
          inicio: null,
          fim: "",
          funcoes: [{ nome: "", inicio: null, fim: "", isAtualmente: false }],
        },
      ]);
    }
  };

  const handleChangeEmpresa = (index, e) => {
    const { name, value } = e.target;
    setEmpresas((prev) => {
      const newEmpresas = [...prev];
      if (name === "inicio") {
        newEmpresas[index][name] = value ? new Date(value) : null;
      } else {
        newEmpresas[index][name] = value;
      }
      return newEmpresas;
    });
  };

  const addEmpresa = () => {
    setEmpresas((prev) => [
      ...prev,
      {
        nome: "",
        inicio: null,
        fim: "",
        funcoes: [{ nome: "", inicio: null, fim: "", isAtualmente: false }],
      },
    ]);
  };

  const removeEmpresa = (index) => {
    setEmpresas((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChangeFuncao = (empresaIndex, funcaoIndex, e) => {
    const { name, value, type, checked } = e.target;
    setEmpresas((prev) => {
      const newEmpresas = [...prev];
      const newFuncoes = [...newEmpresas[empresaIndex].funcoes];
      if (type === "checkbox") {
        newFuncoes[funcaoIndex] = {
          ...newFuncoes[funcaoIndex],
          isAtualmente: checked,
          fim: checked ? "Atualmente" : "",
        };
      } else {
        if (name === "inicio") {
          newFuncoes[funcaoIndex][name] = value ? new Date(value) : null;
        } else {
          newFuncoes[funcaoIndex][name] = value;
        }
      }
      newEmpresas[empresaIndex].funcoes = newFuncoes;
      return newEmpresas;
    });
  };

  const addFuncao = (empresaIndex) => {
    setEmpresas((prev) => {
      const newEmpresas = [...prev];
      newEmpresas[empresaIndex].funcoes.push({
        nome: "",
        inicio: null,
        fim: "",
        isAtualmente: false,
      });
      return newEmpresas;
    });
  };

  const removeFuncao = (empresaIndex, funcaoIndex) => {
    setEmpresas((prev) => {
      const newEmpresas = [...prev];
      newEmpresas[empresaIndex].funcoes = newEmpresas[empresaIndex].funcoes.filter(
        (_, i) => i !== funcaoIndex
      );
      return newEmpresas;
    });
  };

  const [informacoesAdc, setInformacoesAdc] = useState({
    linkedin: "",
    github: "",
    instagram: "",
    email: "",
  });

  const handleChangeInfoAdc = (e) => {
    const { name, value } = e.target;
    setInformacoesAdc((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      identificacao: {
        ...identificacao,
        whatsapp: identificacao.isWhatsApp,
      },
      endereco,
      formacoes: {
        graduacoes: formacoes.semGraduacao
          ? []
          : [
              {
                inicio: formacoes.graduacao.inicio
  ? formacoes.graduacao.inicio.toISOString().split("T")[0]:null,
                fim: formacoes.graduacao.fim,
                curso: formacoes.graduacao.curso,
                ies: formacoes.graduacao.ise, 
              },
            ],
        posgraduacoes: formacoes.semPos
          ? []
          : [
              {
                inicio: formacoes.pos.inicio,
                fim: formacoes.pos.fim,
                curso: formacoes.pos.curso,
                ie: formacoes.pos.ie,
                titulo: formacoes.pos.titulo,
              },
            ],
        tecnicos: formacoes.semTecnico
          ? []
          : [
              {
                inicio: formacoes.tecnico.inicio,
                fim: formacoes.tecnico.fim,
                curso: formacoes.tecnico.curso,
                ic: formacoes.tecnico.ic,
              },
            ],
      },
      empresas: semExperiencia ? [] : empresas,
      informacoesAdc,
    };

    fetch("http://localhost:8080/api/curriculo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((data) => {
        console.log("Currículo salvo com sucesso:", data);
        alert("Currículo salvo!");
      })
      .catch((error) => {
        console.error("Erro ao salvar currículo:", error);
        alert("Ocorreu um erro ao salvar.");
      });
  };

  return (
    <div style={{ marginTop: "80px", padding: "20px" }}>
      <h2>Editar Currículo</h2>
      <form onSubmit={handleSubmit}>
        <section>
          <h4>Identificação</h4>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              name="nome"
              value={identificacao.nome}
              onChange={handleChangeIdentificacao}
            />
          </div>
          <div>
            <label>Telefone:</label>
            <input
              type="text"
              name="telefone"
              value={identificacao.telefone}
              onChange={handleChangeIdentificacao}
            />
            <label style={{ marginLeft: "10px" }}>
              <input
                type="checkbox"
                name="isWhatsApp"
                checked={identificacao.isWhatsApp}
                onChange={handleChangeIdentificacao}
              />
              É WhatsApp?
            </label>
          </div>
        </section>

        <section>
          <h4>Endereço</h4>
          <div>
            <label>CEP:</label>
            <input
              type="text"
              name="cep"
              value={endereco.cep}
              onChange={handleChangeEndereco}
              onBlur={handleCepBlur}
            />
          </div>
          <div>
            <label>Rua:</label>
            <input
              type="text"
              name="rua"
              value={endereco.rua}
              onChange={handleChangeEndereco}
            />
          </div>
          <div>
            <label>Bairro:</label>
            <input
              type="text"
              name="bairro"
              value={endereco.bairro}
              onChange={handleChangeEndereco}
            />
          </div>
          <div>
            <label>Número:</label>
            <input
              type="text"
              name="numero"
              value={endereco.numero}
              onChange={handleChangeEndereco}
            />
          </div>
          <div>
            <label>Cidade:</label>
            <input
              type="text"
              name="cidade"
              value={endereco.cidade}
              onChange={handleChangeEndereco}
            />
          </div>
          <div>
            <label>UF:</label>
            <input
              type="text"
              name="uf"
              value={endereco.uf}
              onChange={handleChangeEndereco}
            />
          </div>
        </section>
        <section>
          <h4>Formações</h4>
          <button type="button" onClick={toggleSemGraduacao}>
            {formacoes.semGraduacao ? "Tenho Graduação" : "Não tenho Graduação"}
          </button>
          {!formacoes.semGraduacao && (
            <div style={{ border: "1px solid #ccc", padding: "10px", marginTop: "5px" }}>
              <h5>Graduação</h5>
              <div>
                <label>Início:</label>
                <input
                  type="date"
                  name="inicio"
                  value={
                    formacoes.graduacao.inicio
                      ? formacoes.graduacao.inicio.toISOString().split("T")[0]
                      : ""
                  }
                  onChange={handleChangeGraduacao}
                />
              </div>
              <div>
                <label>Fim:</label>
                <input
                  type="text"
                  name="fim"
                  placeholder="Ex: 2022 ou Atuais"
                  value={formacoes.graduacao.fim}
                  onChange={handleChangeGraduacao}
                  disabled={formacoes.graduacao.isEmAndamento}
                />
                <label style={{ marginLeft: "10px" }}>
                  <input
                    type="checkbox"
                    name="isEmAndamento"
                    checked={formacoes.graduacao.isEmAndamento}
                    onChange={handleChangeGraduacao}
                  />
                  Em andamento?
                </label>
              </div>
              <div>
                <label>Curso:</label>
                <input
                  type="text"
                  name="curso"
                  value={formacoes.graduacao.curso}
                  onChange={handleChangeGraduacao}
                />
              </div>
              <div>
                <label>Instituição</label>
                <input
                  type="text"
                  name="ise"
                  value={formacoes.graduacao.ise}
                  onChange={handleChangeGraduacao}
                />
              </div>
            </div>
          )}

          <button type="button" onClick={toggleSemPos}>
            {formacoes.semPos ? "Tenho Pós-Graduação" : "Não tenho Pós-Graduação"}
          </button>
          {!formacoes.semPos && (
            <div style={{ border: "1px solid #ccc", padding: "10px", marginTop: "5px" }}>
              <h5>Pós-Graduação</h5>
              <div>
                <label>Início:</label>
                <input
                  type="date"
                  name="inicio"
                  value={
                    formacoes.pos.inicio
                      ? formacoes.pos.inicio.toISOString().split("T")[0]
                      : ""
                  }
                  onChange={handleChangePos}
                />
              </div>
              <div>
                <label>Fim:</label>
                <input
                  type="text"
                  name="fim"
                  placeholder="Ex: 2022 ou Atuais"
                  value={formacoes.pos.fim}
                  onChange={handleChangePos}
                  disabled={formacoes.pos.isEmAndamento}
                />
                <label style={{ marginLeft: "10px" }}>
                  <input
                    type="checkbox"
                    name="isEmAndamento"
                    checked={formacoes.pos.isEmAndamento}
                    onChange={handleChangePos}
                  />
                  Em andamento?
                </label>
              </div>
              <div>
                <label>Curso:</label>
                <input
                  type="text"
                  name="curso"
                  value={formacoes.pos.curso}
                  onChange={handleChangePos}
                />
              </div>
              <div>
                <label>Instituição (IE):</label>
                <input
                  type="text"
                  name="ie"
                  value={formacoes.pos.ie}
                  onChange={handleChangePos}
                />
              </div>
              <div>
                <label>Título:</label>
                <select
                  name="titulo"
                  value={formacoes.pos.titulo}
                  onChange={handleChangePos}
                >
                  <option value="MBA">MBA</option>
                  <option value="ESPECIALIZACAO">Especialização</option>
                  <option value="MESTRADO">Mestrado</option>
                  <option value="DOUTORADO">Doutorado</option>
                  <option value="POS DOUTORADO">Pós Doutorado</option>
                </select>
              </div>
            </div>
          )}

          <button type="button" onClick={toggleSemTecnico}>
            {formacoes.semTecnico ? "Tenho Curso Técnico" : "Não tenho Curso Técnico"}
          </button>
          {!formacoes.semTecnico && (
            <div style={{ border: "1px solid #ccc", padding: "10px", marginTop: "5px" }}>
              <h5>Curso Técnico</h5>
              <div>
                <label>Início:</label>
                <input
                  type="date"
                  name="inicio"
                  value={
                    formacoes.tecnico.inicio
                      ? formacoes.tecnico.inicio.toISOString().split("T")[0]
                      : ""
                  }
                  onChange={handleChangeTecnico}
                />
              </div>
              <div>
                <label>Fim:</label>
                <input
                  type="text"
                  name="fim"
                  placeholder="Ex: 2022 ou Atuais"
                  value={formacoes.tecnico.fim}
                  onChange={handleChangeTecnico}
                  disabled={formacoes.tecnico.isEmAndamento}
                />
                <label style={{ marginLeft: "10px" }}>
                  <input
                    type="checkbox"
                    name="isEmAndamento"
                    checked={formacoes.tecnico.isEmAndamento}
                    onChange={handleChangeTecnico}
                  />
                  Em andamento?
                </label>
              </div>
              <div>
                <label>Curso:</label>
                <input
                  type="text"
                  name="curso"
                  value={formacoes.tecnico.curso}
                  onChange={handleChangeTecnico}
                />
              </div>
              <div>
                <label>Instituição (IC):</label>
                <input
                  type="text"
                  name="ic"
                  value={formacoes.tecnico.ic}
                  onChange={handleChangeTecnico}
                />
              </div>
            </div>
          )}
        </section>
        <section>
          <h4>Experiência</h4>
          <button type="button" onClick={toggleSemExperiencia}>
            {semExperiencia ? "Tenho Experiência" : "Não tenho Experiência"}
          </button>
          {!semExperiencia && (
            <div style={{ marginTop: "10px" }}>
              <button type="button" onClick={addEmpresa}>
                Adicionar Empresa
              </button>
              {empresas.map((empresa, empresaIndex) => (
                <div
                  key={empresaIndex}
                  style={{ border: "1px solid #aaa", margin: "10px 0", padding: "10px" }}
                >
                  <button type="button" onClick={() => removeEmpresa(empresaIndex)}>
                    Remover esta Empresa
                  </button>
                  <div>
                    <label>Empresa:</label>
                    <input
                      type="text"
                      name="nome"
                      value={empresa.nome}
                      onChange={(e) => handleChangeEmpresa(empresaIndex, e)}
                    />
                  </div>
                  <div>
                    <label>Início:</label>
                    <input
                      type="date"
                      name="inicio"
                      value={empresa.inicio ? empresa.inicio.toISOString().split("T")[0] : ""}
                      onChange={(e) => handleChangeEmpresa(empresaIndex, e)}
                    />
                    <label>Fim:</label>
                    <input
                      type="text"
                      name="fim"
                      placeholder="Ex: 2022 ou Atuais"
                      value={empresa.fim}
                      onChange={(e) => handleChangeEmpresa(empresaIndex, e)}
                    />
                  </div>
                  <h5>Funções</h5>
                  <button type="button" onClick={() => addFuncao(empresaIndex)}>
                    Adicionar Função
                  </button>
                  {empresa.funcoes.map((funcao, funcaoIndex) => (
                    <div
                      key={funcaoIndex}
                      style={{ border: "1px solid #ccc", margin: "5px 0", padding: "5px" }}
                    >
                      <button
                        type="button"
                        onClick={() => removeFuncao(empresaIndex, funcaoIndex)}
                      >
                        Remover Função
                      </button>
                      <div>
                        <label>Nome da Função:</label>
                        <input
                          type="text"
                          name="nome"
                          value={funcao.nome}
                          onChange={(e) =>
                            handleChangeFuncao(empresaIndex, funcaoIndex, e)
                          }
                        />
                      </div>
                      <div>
                        <label>Início:</label>
                        <input
                          type="date"
                          name="inicio"
                          value={funcao.inicio ? funcao.inicio.toISOString().split("T")[0] : ""}
                          onChange={(e) =>
                            handleChangeFuncao(empresaIndex, funcaoIndex, e)
                          }
                        />
                        <label>Fim:</label>
                        <input
                          type="text"
                          name="fim"
                          placeholder="Ex: 2022 ou Atuais"
                          value={funcao.fim}
                          onChange={(e) =>
                            handleChangeFuncao(empresaIndex, funcaoIndex, e)
                          }
                          disabled={funcao.isAtualmente}
                        />
                        <label style={{ marginLeft: "10px" }}>
                          <input
                            type="checkbox"
                            name="isAtualmente"
                            checked={funcao.isAtualmente}
                            onChange={(e) =>
                              handleChangeFuncao(empresaIndex, funcaoIndex, e)
                            }
                          />
                          Atualmente?
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </section>
        <section>
          <h4>Informações Adicionais</h4>
          <div>
            <label>Linkedin:</label>
            <input
              type="text"
              name="linkedin"
              value={informacoesAdc.linkedin}
              onChange={handleChangeInfoAdc}
            />
          </div>
          <div>
            <label>Github:</label>
            <input
              type="text"
              name="github"
              value={informacoesAdc.github}
              onChange={handleChangeInfoAdc}
            />
          </div>
          <div>
            <label>Instagram:</label>
            <input
              type="text"
              name="instagram"
              value={informacoesAdc.instagram}
              onChange={handleChangeInfoAdc}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={informacoesAdc.email}
              onChange={handleChangeInfoAdc}
            />
          </div>
        </section>

        <button type="submit" style={{ marginTop: "20px" }}>
          Salvar
        </button>
      </form>
    </div>
  );
}

export default Editar;
