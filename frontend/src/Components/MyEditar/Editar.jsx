import { useEffect, useState } from "react";
import axios from "axios";

function Editar() {
  // -----------------------------
  // 1. Estados Gerais
  // -----------------------------
  const [existe, setExiste] = useState(false);

  // Identificação
  const [identificacao, setIdentificacao] = useState({
    nome: "",
    telefone: "",
    isWhatsApp: false,
    fotoPerfil: "",
  });
  const [fotoFile, setFotoFile] = useState(null);

  // Endereço
  const [endereco, setEndereco] = useState({
    cep: "",
    rua: "",
    bairro: "",
    numero: "",
    cidade: "",
    uf: "",
  });

  // Formações (arrays)
  const [graduacoes, setGraduacoes] = useState([]);
  const [posgraduacoes, setPosgraduacoes] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);

  // Experiência: cada empresa terá também um campo "isAtuais" para marcar fim como "Atualmente"
  const [semExperiencia, setSemExperiencia] = useState(false);
  const [empresas, setEmpresas] = useState([
    {
      nome: "",
      inicio: null,
      fim: "",
      isAtuais: false, // novo campo para empresa
      funcoes: [
        { nome: "", inicio: null, fim: "", isAtualmente: false },
      ],
    },
  ]);

  // Informações Adicionais
  const [informacoesAdc, setInformacoesAdc] = useState({
    linkedin: "",
    github: "",
    instagram: "",
    email: "",
  });

  // -----------------------------
  // 2. Carregar Dados do Currículo (ID=1)
  // -----------------------------
  useEffect(() => {
    axios.get("http://localhost:8080/api/curriculo/1")
      .then((response) => {
        if (response.status === 200) {
          setExiste(true);
          const data = response.data;
          setIdentificacao(data.identificacao || {});
          setEndereco(data.endereco || {});
          setEmpresas(
            (data.empresas || []).map((empresa) => ({
              ...empresa,
              inicio: empresa.inicio ? new Date(empresa.inicio) : null,
              // Se o backend enviar "fim" já como string, mantém
              funcoes: (empresa.funcoes || []).map((f) => ({
                ...f,
                inicio: f.inicio ? new Date(f.inicio) : null,
              })),
            }))
          );
          setInformacoesAdc(data.informacoesAdc || {});
          if (data.formacoes) {
            setGraduacoes(
              (data.formacoes.graduacoes || []).map((g) => ({
                ...g,
                inicio: g.inicio ? new Date(g.inicio) : null,
              }))
            );
            setPosgraduacoes(
              (data.formacoes.posgraduacoes || []).map((p) => ({
                ...p,
                inicio: p.inicio ? new Date(p.inicio) : null,
              }))
            );
            setTecnicos(
              (data.formacoes.tecnicos || []).map((t) => ({
                ...t,
                inicio: t.inicio ? new Date(t.inicio) : null,
              }))
            );
          }
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setExiste(false);
          console.log("Currículo com ID=1 não existe. Criando novo.");
        } else {
          console.error("Erro ao carregar o currículo:", error);
        }
      });
  }, []);

  // -----------------------------
  // 3. Manipulação de Dados
  // -----------------------------

  // IDENTIFICAÇÃO
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
      // Supondo que response.data.url retorne algo como "/api/images/3"
      const imageUrl = response.data.url;
      // Extraia o ID da imagem (última parte da URL)
      const parts = imageUrl.split("/");
      const newImageId = parts[parts.length - 1];
      // Salve o novo ID e force o refresh
      window.localStorage.setItem("avatarImageId", newImageId);
      window.localStorage.setItem("avatarRefresh", new Date().getTime());
      alert("Foto enviada com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar foto:", error);
      alert("Erro ao enviar foto.");
    }
  };
  


  // ENDEREÇO
  const handleChangeEndereco = (e) => {
    const { name, value } = e.target;
    setEndereco((prev) => ({ ...prev, [name]: value }));
  };

  const handleCepBlur = () => {
    if (!endereco.cep) return;
    axios.get(`http://localhost:8080/api/enderecos/cep/${endereco.cep}`)
      .then((res) => {
        const data = res.data;
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

  // FORMAÇÕES - Graduação
  const addGraduacao = () => {
    setGraduacoes((prev) => [
      ...prev,
      { inicio: null, fim: "", curso: "", ies: "", isEmAndamento: false },
    ]);
  };

  const handleChangeGraduacao = (index, e) => {
    const { name, value,type, checked } = e.target;
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

  // FORMAÇÕES - Pós-Graduação
  const addPosgraduacao = () => {
    setPosgraduacoes((prev) => [
      ...prev,
      { inicio: null, fim: "", curso: "", ie: "", titulo: "MBA", isEmAndamento: false },
    ]);
  };

  const handleChangePosgraduacao = (index, e) => {
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

  // FORMAÇÕES - Curso Técnico
  const addTecnico = () => {
    setTecnicos((prev) => [
      ...prev,
      { inicio: null, fim: "", curso: "", ic: "", isEmAndamento: false },
    ]);
  };

  const handleChangeTecnico = (index, e) => {
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

  // EXPERIÊNCIA - Empresas
  const toggleSemExperiencia = () => {
    setSemExperiencia((prev) => !prev);
    if (!semExperiencia) {
      setEmpresas([
        {
          nome: "",
          inicio: null,
          fim: "",
          isAtuais: false,
          funcoes: [{ nome: "", inicio: null, fim: "", isAtualmente: false }],
        },
      ]);
    }
  };

  const handleChangeEmpresa = (empresaIndex, e) => {
    const { name, value, checked } = e.target;
    setEmpresas((prev) => {
      const newArr = [...prev];
      if (name === "inicio") {
        newArr[empresaIndex][name] = value ? new Date(value) : null;
      } else if (name === "isAtuais") {
        newArr[empresaIndex].isAtuais = checked;
        newArr[empresaIndex].fim = checked ? "Atualmente" : "";
      } else {
        newArr[empresaIndex][name] = value;
      }
      return newArr;
    });
  };

  const addEmpresa = () => {
    setEmpresas((prev) => [
      ...prev,
      {
        nome: "",
        inicio: null,
        fim: "",
        isAtuais: false,
        funcoes: [{ nome: "", inicio: null, fim: "", isAtualmente: false }],
      },
    ]);
  };

  const removeEmpresa = (empresaIndex) => {
    setEmpresas((prev) => prev.filter((_, i) => i !== empresaIndex));
  };

  // EXPERIÊNCIA - Funções dentro de uma Empresa
  const handleChangeFuncao = (empresaIndex, funcaoIndex, e) => {
    const { name, value, type, checked } = e.target;
    setEmpresas((prev) => {
      const newArr = [...prev];
      const funcoes = [...newArr[empresaIndex].funcoes];
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
      newArr[empresaIndex].funcoes = funcoes;
      return newArr;
    });
  };

  const addFuncao = (empresaIndex) => {
    setEmpresas((prev) => {
      const newArr = [...prev];
      newArr[empresaIndex].funcoes.push({ nome: "", inicio: null, fim: "", isAtualmente: false });
      return newArr;
    });
  };

  const removeFuncao = (empresaIndex, funcaoIndex) => {
    setEmpresas((prev) => {
      const newArr = [...prev];
      newArr[empresaIndex].funcoes = newArr[empresaIndex].funcoes.filter((_, i) => i !== funcaoIndex);
      return newArr;
    });
  };

  // INFORMAÇÕES ADICIONAIS
  const handleChangeInfoAdc = (e) => {
    const { name, value } = e.target;
    setInformacoesAdc((prev) => ({ ...prev, [name]: value }));
  };

  // -----------------------------
  // 9. Envio dos Dados: POST (se não existir) ou PUT (se existir)
  // -----------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    const saveCurriculo = (fotoUrl = identificacao.fotoPerfil) => {
      const payload = {
        identificacao: {
          ...identificacao,
          whatsapp: identificacao.isWhatsApp,
          fotoPerfil: fotoUrl,
        },
        endereco,
        formacoes: {
          graduacoes,
          posgraduacoes,
          tecnicos,
        },
        empresas: semExperiencia ? [] : empresas,
        informacoesAdc,
      };

      if (existe) {
        axios.put("http://localhost:8080/api/curriculo/1", payload)
          .then((response) => {
            console.log("Currículo atualizado:", response.data);
            alert("Currículo atualizado!");
          })
          .catch((error) => {
            console.error("Erro ao atualizar currículo:", error);
            alert("Erro ao atualizar currículo.");
          });
      } else {
        axios.post("http://localhost:8080/api/curriculo", payload)
          .then((response) => {
            console.log("Currículo criado:", response.data);
            alert("Currículo criado!");
            setExiste(true);
          })
          .catch((error) => {
            console.error("Erro ao criar currículo:", error);
            alert("Erro ao criar currículo.");
          });
      }
    };

    if (fotoFile) {
      const formData = new FormData();
      formData.append("file", fotoFile);
      axios.post("http://localhost:8080/api/images/upload", formData)
        .then((res) => {
          const imageUrl = res.data.url;
          // Atualiza o avatar para forçar o refresh (se usado no Navbar)
          window.localStorage.setItem("avatarRefresh", new Date().getTime());
          saveCurriculo(imageUrl);
        })
        .catch((err) => {
          console.error("Erro no upload da foto:", err);
          alert("Erro no upload da foto.");
        });
    } else {
      saveCurriculo();
    }
  };

  // -----------------------------
  // 10. Renderização
  // -----------------------------
  return (
    <div style={{ marginTop: "80px", padding: "20px" }}>
      <h2>Editar Currículo</h2>
      
      {/* Seção para alterar a foto de perfil */}
      <section>
        <h4>Foto de Perfil</h4>
        <input type="file" onChange={(e) => setFotoFile(e.target.files[0])} />
        <button type="button" onClick={handleUploadFoto}>Upload Foto</button>
        {identificacao.fotoPerfil && (
          <div>
            <img
              src={identificacao.fotoPerfil}
              alt="Avatar"
              style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover" }}
            />
          </div>
        )}
      </section>

      <form onSubmit={handleSubmit}>
        {/* IDENTIFICAÇÃO */}
        <section>
          <h4>Identificação</h4>
          <div>
            <label>Nome:</label>
            <input type="text" name="nome" value={identificacao.nome || ""} onChange={handleChangeIdentificacao} />
          </div>
          <div>
            <label>Telefone:</label>
            <input type="text" name="telefone" value={identificacao.telefone || ""} onChange={handleChangeIdentificacao} />
            <label style={{ marginLeft: "10px" }}>
              <input type="checkbox" name="isWhatsApp" checked={identificacao.isWhatsApp || false} onChange={handleChangeIdentificacao} />
              É WhatsApp?
            </label>
          </div>
        </section>

        {/* ENDEREÇO */}
        <section>
          <h4>Endereço</h4>
          <div>
            <label>CEP:</label>
            <input type="text" name="cep" value={endereco.cep || ""} onChange={handleChangeEndereco} onBlur={handleCepBlur} />
          </div>
          <div>
            <label>Rua:</label>
            <input type="text" name="rua" value={endereco.rua || ""} onChange={handleChangeEndereco} />
          </div>
          <div>
            <label>Bairro:</label>
            <input type="text" name="bairro" value={endereco.bairro || ""} onChange={handleChangeEndereco} />
          </div>
          <div>
            <label>Número:</label>
            <input type="text" name="numero" value={endereco.numero || ""} onChange={handleChangeEndereco} />
          </div>
          <div>
            <label>Cidade:</label>
            <input type="text" name="cidade" value={endereco.cidade || ""} onChange={handleChangeEndereco} />
          </div>
          <div>
            <label>UF:</label>
            <input type="text" name="uf" value={endereco.uf || ""} onChange={handleChangeEndereco} />
          </div>
        </section>

        {/* FORMAÇÕES */}
        <section>
          <h4>Formações</h4>
          {/* GRADUAÇÃO */}
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
                    value={
                      grad.inicio && typeof grad.inicio.toISOString === "function"
                        ? grad.inicio.toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) => handleChangeGraduacao(index, e)}
                  />
                </div>
                <div>
                  <label>Fim:</label>
                  <input
                    type="text"
                    name="fim"
                    placeholder="Ex: 2022 ou Atuais"
                    value={grad.fim}
                    onChange={(e) => handleChangeGraduacao(index, e)}
                    disabled={grad.isEmAndamento}
                  />
                  <label style={{ marginLeft: "10px" }}>
                    <input
                      type="checkbox"
                      name="isEmAndamento"
                      checked={grad.isEmAndamento}
                      onChange={(e) => handleChangeGraduacao(index, e)}
                    />
                    Em andamento?
                  </label>
                </div>
                <div>
                  <label>Curso:</label>
                  <input type="text" name="curso" value={grad.curso} onChange={(e) => handleChangeGraduacao(index, e)} />
                </div>
                <div>
                  <label>Instituição (IES):</label>
                  <input type="text" name="ies" value={grad.ies} onChange={(e) => handleChangeGraduacao(index, e)} />
                </div>
                <button type="button" onClick={() => removeGraduacao(index)}>Remover Graduação</button>
              </div>
            ))}
          </div>
          
          {/* PÓS-GRADUAÇÃO */}
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
                    value={
                      pos.inicio && typeof pos.inicio.toISOString === "function"
                        ? pos.inicio.toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) => handleChangePosgraduacao(index, e)}
                  />
                </div>
                <div>
                  <label>Fim:</label>
                  <input
                    type="text"
                    name="fim"
                    placeholder="Ex: 2022 ou Atuais"
                    value={pos.fim}
                    onChange={(e) => handleChangePosgraduacao(index, e)}
                    disabled={pos.isEmAndamento}
                  />
                  <label style={{ marginLeft: "10px" }}>
                    <input
                      type="checkbox"
                      name="isEmAndamento"
                      checked={pos.isEmAndamento}
                      onChange={(e) => handleChangePosgraduacao(index, e)}
                    />
                    Em andamento?
                  </label>
                </div>
                <div>
                  <label>Curso:</label>
                  <input type="text" name="curso" value={pos.curso} onChange={(e) => handleChangePosgraduacao(index, e)} />
                </div>
                <div>
                  <label>Instituição (IE):</label>
                  <input type="text" name="ie" value={pos.ie} onChange={(e) => handleChangePosgraduacao(index, e)} />
                </div>
                <div>
                  <label>Título:</label>
                  <select name="titulo" value={pos.titulo} onChange={(e) => handleChangePosgraduacao(index, e)}>
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

          {/* TÉCNICO */}
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
                    value={
                      tec.inicio && typeof tec.inicio.toISOString === "function"
                        ? tec.inicio.toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) => handleChangeTecnico(index, e)}
                  />
                </div>
                <div>
                  <label>Fim:</label>
                  <input
                    type="text"
                    name="fim"
                    placeholder="Ex: 2022 ou Atuais"
                    value={tec.fim}
                    onChange={(e) => handleChangeTecnico(index, e)}
                    disabled={tec.isEmAndamento}
                  />
                  <label style={{ marginLeft: "10px" }}>
                    <input
                      type="checkbox"
                      name="isEmAndamento"
                      checked={tec.isEmAndamento}
                      onChange={(e) => handleChangeTecnico(index, e)}
                    />
                    Em andamento?
                  </label>
                </div>
                <div>
                  <label>Curso:</label>
                  <input type="text" name="curso" value={tec.curso} onChange={(e) => handleChangeTecnico(index, e)} />
                </div>
                <div>
                  <label>Instituição (IC):</label>
                  <input type="text" name="ic" value={tec.ic} onChange={(e) => handleChangeTecnico(index, e)} />
                </div>
                <button type="button" onClick={() => removeTecnico(index)}>Remover Curso Técnico</button>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIÊNCIA */}
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
                      value={
                        empresa.inicio && typeof empresa.inicio.toISOString === "function"
                          ? empresa.inicio.toISOString().split("T")[0]
                          : ""
                      }
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
                    <label style={{ marginLeft: "10px" }}>
                      <input
                        type="checkbox"
                        name="isAtuais"
                        checked={empresa.isAtuais || false}
                        onChange={(e) => handleChangeEmpresa(empresaIndex, e)}
                      />
                      Em andamento?
                    </label>
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
                          value={funcao.inicio && typeof funcao.inicio.toISOString === "function" ? funcao.inicio.toISOString().split("T")[0] : ""}
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

        {/* INFORMAÇÕES ADICIONAIS */}
        <section>
          <h4>Informações Adicionais</h4>
          <div>
            <label>Linkedin:</label>
            <input type="text" name="linkedin" value={informacoesAdc.linkedin || ""} onChange={handleChangeInfoAdc} />
          </div>
          <div>
            <label>Github:</label>
            <input type="text" name="github" value={informacoesAdc.github || ""} onChange={handleChangeInfoAdc} />
          </div>
          <div>
            <label>Instagram:</label>
            <input type="text" name="instagram" value={informacoesAdc.instagram || ""} onChange={handleChangeInfoAdc} />
          </div>
          <div>
            <label>Email:</label>
            <input type="text" name="email" value={informacoesAdc.email || ""} onChange={handleChangeInfoAdc} />
          </div>
        </section>

        <button type="submit" style={{ marginTop: "20px" }}>
          {existe ? "Atualizar" : "Criar (POST)"}
        </button>
      </form>
    </div>
  );
}

export default Editar;
