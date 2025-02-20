import { useState } from "react";
import axios from "axios";

function Editar() {

  const [identificacao, setIdentificacao] = useState({
    nome: "",
    telefone: "",
    isWhatsApp: false,
    fotoPerfil: "",
  });
  const [fotoFile, setFotoFile] = useState(null);

  const handleChangeIdentificacao = (e) => {
    const { name, type, checked, value } = e.target;
    setIdentificacao((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUploadFoto = async () => {
    if (!fotoFile) return;
    const formData = new FormData();
    formData.append("file", fotoFile);
    try {

      const response = await axios.post("http://localhost:8080/api/images/upload", formData);
     
      setIdentificacao((prev) => ({
        ...prev,
        fotoPerfil: response.data.url,
      }));
      alert("Foto enviada com sucesso!");
    } catch (error) {
      console.error("Erro no upload da foto:", error);
      alert("Erro ao enviar foto.");
    }
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


  const [graduacoes, setGraduacoes] = useState([]);
  const [posgraduacoes, setPosgraduacoes] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);

  const addGraduacao = () => {
    setGraduacoes((prev) => [
      ...prev,
      { inicio: null, fim: "", curso: "", ies: "", isEmAndamento: false },
    ]);
  };

  const updateGraduacao = (index, e) => {
    const { name, value, type, checked } = e.target;
    setGraduacoes((prev) => {
      const newArr = [...prev];
      if (type === "checkbox") {
        newArr[index].isEmAndamento = checked;
        newArr[index].fim = checked ? "Atualmente" : "";
      } else {
        if (name === "inicio") {
          newArr[index].inicio = value ? new Date(value) : null;
        } else {
          newArr[index][name] = value;
        }
      }
      return newArr;
    });
  };

  const removeGraduacao = (index) => {
    setGraduacoes((prev) => prev.filter((_, i) => i !== index));
  };

  const addPosgraduacao = () => {
    setPosgraduacoes((prev) => [
      ...prev,
      { inicio: null, fim: "", curso: "", ie: "", titulo: "MBA", isEmAndamento: false },
    ]);
  };

  const updatePosgraduacao = (index, e) => {
    const { name, value, type, checked } = e.target;
    setPosgraduacoes((prev) => {
      const newArr = [...prev];
      if (type === "checkbox") {
        newArr[index].isEmAndamento = checked;
        newArr[index].fim = checked ? "Atualmente" : "";
      } else {
        if (name === "inicio") {
          newArr[index].inicio = value ? new Date(value) : null;
        } else {
          newArr[index][name] = value;
        }
      }
      return newArr;
    });
  };

  const removePosgraduacao = (index) => {
    setPosgraduacoes((prev) => prev.filter((_, i) => i !== index));
  };

  const addTecnico = () => {
    setTecnicos((prev) => [
      ...prev,
      { inicio: null, fim: "", curso: "", ic: "", isEmAndamento: false },
    ]);
  };

  const updateTecnico = (index, e) => {
    const { name, value, type, checked } = e.target;
    setTecnicos((prev) => {
      const newArr = [...prev];
      if (type === "checkbox") {
        newArr[index].isEmAndamento = checked;
        newArr[index].fim = checked ? "Atualmente" : "";
      } else {
        if (name === "inicio") {
          newArr[index].inicio = value ? new Date(value) : null;
        } else {
          newArr[index][name] = value;
        }
      }
      return newArr;
    });
  };

  const removeTecnico = (index) => {
    setTecnicos((prev) => prev.filter((_, i) => i !== index));
  };

  const [semExperiencia, setSemExperiencia] = useState(false);
  const [empresas, setEmpresas] = useState([
    {
      nome: "",
      inicio: null,
      fim: "",
      funcoes: [
        { nome: "", inicio: null, fim: "", isAtualmente: false },
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
      const newArr = [...prev];
      if (name === "inicio") {
        newArr[index][name] = value ? new Date(value) : null;
      } else {
        newArr[index][name] = value;
      }
      return newArr;
    });
  };

  const addEmpresa = () => {
    setEmpresas((prev) => [
      ...prev,
      { nome: "", inicio: null, fim: "", funcoes: [{ nome: "", inicio: null, fim: "", isAtualmente: false }] },
    ]);
  };

  const removeEmpresa = (index) => {
    setEmpresas((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChangeFuncao = (empresaIndex, funcaoIndex, e) => {
    const { name, value, type, checked } = e.target;
    setEmpresas((prev) => {
      const newEmpresas = [...prev];
      const funcoes = [...newEmpresas[empresaIndex].funcoes];
      if (type === "checkbox") {
        funcoes[funcaoIndex].isAtualmente = checked;
        funcoes[funcaoIndex].fim = checked ? "Atualmente" : "";
      } else {
        if (name === "inicio") {
          funcoes[funcaoIndex][name] = value ? new Date(value) : null;
        } else {
          funcoes[funcaoIndex][name] = value;
        }
      }
      newEmpresas[empresaIndex].funcoes = funcoes;
      return newEmpresas;
    });
  };

  const addFuncao = (empresaIndex) => {
    setEmpresas((prev) => {
      const newEmpresas = [...prev];
      newEmpresas[empresaIndex].funcoes.push({ nome: "", inicio: null, fim: "", isAtualmente: false });
      return newEmpresas;
    });
  };

  const removeFuncao = (empresaIndex, funcaoIndex) => {
    setEmpresas((prev) => {
      const newEmpresas = [...prev];
      newEmpresas[empresaIndex].funcoes = newEmpresas[empresaIndex].funcoes.filter((_, i) => i !== funcaoIndex);
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
        graduacoes: graduacoes,
        posgraduacoes: posgraduacoes,
        tecnicos: tecnicos,
      },
      empresas: semExperiencia ? [] : empresas,
      informacoesAdc,
    };

    fetch("http://localhost:8080/api/curriculo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao salvar currículo");
        return res.json();
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
          <div>
            <label>Foto de Perfil:</label>
            <input type="file" onChange={(e) => setFotoFile(e.target.files[0])} />
            <button type="button" onClick={handleUploadFoto}>Upload Foto</button>
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
          <div>
            <button type="button" onClick={addGraduacao}>Adicionar Graduação</button>
            {graduacoes.map((grad, index) => (
              <div key={index} style={{ border: "1px solid #ccc", padding: "10px", marginTop: "5px" }}>
                <h5>Graduação #{index + 1}</h5>
                <div>
                  <label>Início:</label>
                  <input
                    type="date"
                    name="inicio"
                    value={grad.inicio ? grad.inicio.toISOString().split("T")[0] : ""}
                    onChange={(e) => updateGraduacao(index, e)}
                  />
                </div>
                <div>
                  <label>Fim:</label>
                  <input
                    type="text"
                    name="fim"
                    placeholder="Ex: 2022 ou Atuais"
                    value={grad.fim}
                    onChange={(e) => updateGraduacao(index, e)}
                    disabled={grad.isEmAndamento}
                  />
                  <label style={{ marginLeft: "10px" }}>
                    <input
                      type="checkbox"
                      name="isEmAndamento"
                      checked={grad.isEmAndamento}
                      onChange={(e) => updateGraduacao(index, e)}
                    />
                    Em andamento?
                  </label>
                </div>
                <div>
                  <label>Curso:</label>
                  <input
                    type="text"
                    name="curso"
                    value={grad.curso}
                    onChange={(e) => updateGraduacao(index, e)}
                  />
                </div>
                <div>
                  <label>Instituição (IES):</label>
                  <input
                    type="text"
                    name="ise"
                    value={grad.ise}
                    onChange={(e) => updateGraduacao(index, e)}
                  />
                </div>
                <button type="button" onClick={() => removeGraduacao(index)}>Remover Graduação</button>
              </div>
            ))}
          </div>
          <div>
            <button type="button" onClick={addPosgraduacao}>Adicionar Pós-Graduação</button>
            {posgraduacoes.map((pos, index) => (
              <div key={index} style={{ border: "1px solid #ccc", padding: "10px", marginTop: "5px" }}>
                <h5>Pós-Graduação #{index + 1}</h5>
                <div>
                  <label>Início:</label>
                  <input
                    type="date"
                    name="inicio"
                    value={pos.inicio ? pos.inicio.toISOString().split("T")[0] : ""}
                    onChange={(e) => updatePosgraduacao(index, e)}
                  />
                </div>
                <div>
                  <label>Fim:</label>
                  <input
                    type="text"
                    name="fim"
                    placeholder="Ex: 2022 ou Atuais"
                    value={pos.fim}
                    onChange={(e) => updatePosgraduacao(index, e)}
                    disabled={pos.isEmAndamento}
                  />
                  <label style={{ marginLeft: "10px" }}>
                    <input
                      type="checkbox"
                      name="isEmAndamento"
                      checked={pos.isEmAndamento}
                      onChange={(e) => updatePosgraduacao(index, e)}
                    />
                    Em andamento?
                  </label>
                </div>
                <div>
                  <label>Curso:</label>
                  <input
                    type="text"
                    name="curso"
                    value={pos.curso}
                    onChange={(e) => updatePosgraduacao(index, e)}
                  />
                </div>
                <div>
                  <label>Instituição (IE):</label>
                  <input
                    type="text"
                    name="ie"
                    value={pos.ie}
                    onChange={(e) => updatePosgraduacao(index, e)}
                  />
                </div>
                <div>
                  <label>Título:</label>
                  <select
                    name="titulo"
                    value={pos.titulo}
                    onChange={(e) => updatePosgraduacao(index, e)}
                  >
                    <option value="MBA">MBA</option>
                    <option value="ESPECIALIZACAO">Especialização</option>
                    <option value="MESTRADO">Mestrado</option>
                    <option value="DOUTORADO">Doutorado</option>
                    <option value="POS DOUTORADO">Pós Doutorado</option>
                  </select>
                </div>
                <button type="button" onClick={() => removePosgraduacao(index)}>Remover Pós-Graduação</button>
              </div>
            ))}
          </div>
          <div>
            <button type="button" onClick={addTecnico}>Adicionar Curso Técnico</button>
            {tecnicos.map((tec, index) => (
              <div key={index} style={{ border: "1px solid #ccc", padding: "10px", marginTop: "5px" }}>
                <h5>Curso Técnico #{index + 1}</h5>
                <div>
                  <label>Início:</label>
                  <input
                    type="date"
                    name="inicio"
                    value={tec.inicio ? tec.inicio.toISOString().split("T")[0] : ""}
                    onChange={(e) => updateTecnico(index, e)}
                  />
                </div>
                <div>
                  <label>Fim:</label>
                  <input
                    type="text"
                    name="fim"
                    placeholder="Ex: 2022 ou Atuais"
                    value={tec.fim}
                    onChange={(e) => updateTecnico(index, e)}
                    disabled={tec.isEmAndamento}
                  />
                  <label style={{ marginLeft: "10px" }}>
                    <input
                      type="checkbox"
                      name="isEmAndamento"
                      checked={tec.isEmAndamento}
                      onChange={(e) => updateTecnico(index, e)}
                    />
                    Em andamento?
                  </label>
                </div>
                <div>
                  <label>Curso:</label>
                  <input
                    type="text"
                    name="curso"
                    value={tec.curso}
                    onChange={(e) => updateTecnico(index, e)}
                  />
                </div>
                <div>
                  <label>Instituição (IC):</label>
                  <input
                    type="text"
                    name="ic"
                    value={tec.ic}
                    onChange={(e) => updateTecnico(index, e)}
                  />
                </div>
                <button type="button" onClick={() => removeTecnico(index)}>Remover Curso Técnico</button>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h4>Experiência</h4>
          <button type="button" onClick={toggleSemExperiencia}>
            {semExperiencia ? "Tenho Experiência" : "Não tenho Experiência"}
          </button>
          {!semExperiencia && (
            <div style={{ marginTop: "10px" }}>
              <button type="button" onClick={addEmpresa}>Adicionar Empresa</button>
              {empresas.map((empresa, empresaIndex) => (
                <div key={empresaIndex} style={{ border: "1px solid #aaa", margin: "10px 0", padding: "10px" }}>
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
                  <button type="button" onClick={() => addFuncao(empresaIndex)}>Adicionar Função</button>
                  {empresa.funcoes.map((funcao, funcaoIndex) => (
                    <div key={funcaoIndex} style={{ border: "1px solid #ccc", margin: "5px 0", padding: "5px" }}>
                      <button type="button" onClick={() => removeFuncao(empresaIndex, funcaoIndex)}>
                        Remover Função
                      </button>
                      <div>
                        <label>Nome da Função:</label>
                        <input
                          type="text"
                          name="nome"
                          value={funcao.nome}
                          onChange={(e) => handleChangeFuncao(empresaIndex, funcaoIndex, e)}
                        />
                      </div>
                      <div>
                        <label>Início:</label>
                        <input
                          type="date"
                          name="inicio"
                          value={funcao.inicio ? funcao.inicio.toISOString().split("T")[0] : ""}
                          onChange={(e) => handleChangeFuncao(empresaIndex, funcaoIndex, e)}
                        />
                        <label>Fim:</label>
                        <input
                          type="text"
                          name="fim"
                          placeholder="Ex: 2022 ou Atuais"
                          value={funcao.fim}
                          onChange={(e) => handleChangeFuncao(empresaIndex, funcaoIndex, e)}
                          disabled={funcao.isAtualmente}
                        />
                        <label style={{ marginLeft: "10px" }}>
                          <input
                            type="checkbox"
                            name="isAtualmente"
                            checked={funcao.isAtualmente}
                            onChange={(e) => handleChangeFuncao(empresaIndex, funcaoIndex, e)}
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
