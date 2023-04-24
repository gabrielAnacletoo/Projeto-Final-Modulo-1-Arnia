window.addEventListener("load", async () => {
  try {
    let user = localStorage.getItem("user");
    let JSONuser = JSON.parse(user);
    if (user === null || user === "") {
      window.location.replace("../index.html");
    } else {
      let Showuser = document.querySelector("#ShowName");
      let ShowEmailuser = document.querySelector("#showEmail");
      Showuser.innerHTML += JSONuser.nameUser;
      ShowEmailuser.innerHTML = JSONuser.email;
    }
  } catch (error) {
    console.log(error);
  }
});

//==========================================>> Logout

const bntLogOut = document.querySelector("#logOut");
bntLogOut.addEventListener("click", () => {
  localStorage.clear();
  window.location.replace("../index.html");
});

//=====================================================>>> Metodos
let url = "https://pacientes.onrender.com/pacientes";

const createPatient = async (post) => {
  // Obtenho a lista de pacientes
  const response = await fetch(url);
  const patients = await response.json();
  // Encontrar o maior ID
  let maxID = 0;
  for (const patient of patients) {
    //patient percorre todo patients id
    if (patient.id > maxID) {
      maxID = patient.id;
    }
  }
  // Incrementa o ID pra ter proximo ID livre
  let nextID = maxID + 1;
  // Adiciona o ID ao objeto, nao esquercer disso!!!
  post.id = nextID;
  // Envia a solicitação POST pra criar novo paciente
  await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
};

//EDIT
const editPatient = async (id, post) => {
  await fetch(`https://pacientes.onrender.com/pacientes/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
};

//DELETE
const deletePatient = async (id) => {
  await fetch(`https://pacientes.onrender.com/pacientes/${id}`, {
    method: "DELETE",
  });
}

//====================================>>> VERIFICAR SE PACIENTE JA EXISTE

const patientExists = async (CPF) => {
  const url = "https://pacientes.onrender.com/pacientes";
  const request = await fetch(url);
  const data = await request.json();
  const patient = data.find((patient) => patient.CPF === CPF);
  return patient;
};


//====================================>> Cadastrar Paciente

  const btnCreate = document.querySelector("#btnRegisterPaciente");
  btnCreate.addEventListener("click", async () => {
    try {
      const PacienteCPF = document.querySelector("#cpf").value;
      const PacienteNome = document.querySelector("#nome").value;
      const PacienteNascimento = document.querySelector("#dataNascimento").value;
      const PacienteEmail = document.querySelector("#email").value;
      const PacienteSexo = document.querySelector("#MenuSexo");
      const SelecSexo = PacienteSexo.value;
      const PacienteNacionalidade = document.querySelector("#nacionalidade").value;
      const PacienteNaturalidade = document.querySelector("#naturalidade").value;
      const PacienteProfissao = document.querySelector("#profissao").value;
      const PacienteEscolaridade = document.querySelector("#escolaridade").value;
      const PacienteEstadoCivil = document.querySelector("#estadoCivil");
      const SelecEstavo = PacienteEstadoCivil.value;
      const PacienteMae = document.querySelector("#mae").value;
      const PacientePai = document.querySelector("#pai").value;

      const NewPatient = {
        id: "",
        CPF: PacienteCPF,
        NomeCompleto: PacienteNome,
        DataNascimento: PacienteNascimento,
        Email: PacienteEmail,
        Sexo: SelecSexo,
        Nacionalidade: PacienteNacionalidade,
        Naturalidade: PacienteNaturalidade,
        Profissao: PacienteProfissao,
        Escolaridade: PacienteEscolaridade,
        EstadoCivil: SelecEstavo,
        Mae: PacienteMae,
        Pai: PacientePai,
        sessoesPaciente: [],
        FatoRelevante: [],
      };

  // VERIFICA OS CAMPOS E SE JA EXISTE UM PACIENTE COM ESSE CPF
  const PatientCheck = await patientExists(PacienteCPF)
  const inputsCadastro = document.querySelectorAll('input[name="inputCadastro"]')
  if (inputsCadastro === "" || inputsCadastro === null) {
    alert("Todos os campos precisam ser preenchidos");
  } else if (PatientCheck) {
    alert("ja existe um paciente com esse CPF cadastrado");
  } else {
    await createPatient(NewPatient)
  const modal = new bootstrap.Modal(document.querySelector('#modalOK'))
  modal.show()
  setTimeout(function() {
    location.reload();
  }, 3000)    
  }
    } catch (error) {
      console.log(error);
    }
  })
  // document.querySelector("#cpf").addEventListener("input", function(e) {
  //   let cpf = e.target.value;
  
  //   // Remove tudo o que não é dígito
  //   cpf = cpf.replace(/\D/g, '');
  
  //   // Adiciona os separadores
  //   cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  
  //   // Atualiza o valor do campo
  //   e.target.value = cpf;
  // });
  
  
  









//===========================================>> Exibir pacientes

window.addEventListener("load", async () => {

  const showPatients = await fetch(url);
  const response = await showPatients.json();
  const content = document.querySelector("#PatientsContent");
 


  response.forEach((Patients) => {
   const perPage = 4; // quantidade de pacientes por pagina
   const pages = Math.ceil(response.length / perPage); // quantidade total de paginas
   let currentPage = 1; // página atual

function renderPatients(page) {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const patients = response.slice(start, end);

  let tablePatients = "";
  patients.forEach((Patients) => {
   
 if (Patients.id > 0) {
      tablePatients += `
          <tr>
          <th class="border"><button class="btn btn-outline"  data-bs-toggle="modal" data-bs-target="#ViewPatient-${Patients.id}">${Patients.id}</button></th>
          <td class="border"><button class="btn btn-outline"  data-bs-toggle="modal" data-bs-target="#ViewPatient-${Patients.id}">${Patients.NomeCompleto}</button></td>
          <td class="border"><button class="btn btn-outline"  data-bs-toggle="modal" data-bs-target="#ViewPatient-${Patients.id}">${Patients.CPF}</button></td>
          <td class="border text-center align-middle">
          
          <!-- Button Prontuario -->
          <a href="prontuario.html?id=${Patients.id}&nome=${Patients.NomeCompleto}&data=${Patients.DataNascimento}&profissao=${Patients.Profissao}&escolaridade=${Patients.Escolaridade}"><button  type="button" class="btn btn-outline-success rounded-3 px-1 py-1 d-inline-flex justify-content-center shadow-sm me-1 btnTabela"
          data-bs-target="#ViewPatient-${Patients.id}" title="Prontuario"> <i class="fa-solid fa-clipboard-user"></i> </button></a>
          



          <!-- Modal informações  -->
          <div class="modal fade" id="ViewPatient-${Patients.id}" tabindex="-1" aria-labelledby="ViewPatient" aria-hidden="true">
            <div class="modal-dialog modal-xl">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5 text-success" id="ViewPatient"><strong>Informações do Paciente </strong></h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="modal-body"> 
                <!-- CONTEUDO MODAL -->
          
                  <form>
                    <div class="col-md-11 d-flex justify-content-between flex-column flex-sm-row">
                    <div class="mb-3  col-md-4 ms-4 d-inline-block text-start">
                      <label for="cpf" class="form-label text-secondary">CPF</label>
                      <input type="number" class="form-control py-2" id="cpf" disabled value="${Patients.CPF}">
                    </div>
          
                    <div class="mb-3 col-md-4 ms-4 d-inline-block text-start">
                      <label for="nome" class="form-label text-secondary">Nome</label>
                      <input type="text" class="form-control py-2 text-capitalize" id="nome" disabled value="${Patients.NomeCompleto}">
                    </div>
          
                    <div class="mb-3 col-md-4 ms-4 d-inline-block text-start">
                      <label for="dataNascimento" class="form-label text-secondary">Data de Nascimento</label>
                      <input type="date" class="form-control py-2" id="dataNascimento" disabled value="${Patients.DataNascimento}">
                    </div>
                  </div>
                  <!-- ========================================================================================== -->
                  <div class="col-md-11 d-flex justify-content-between flex-column flex-sm-row">
                    <div class="mb-3  col-md-4 ms-4 d-inline-block text-start">
                      <label for="email" class="form-label text-secondary">E-mail</label>
                      <input type="email" class="form-control py-2" id="email" disabled value="${Patients.Email}">
                    </div>
          
                    <div class="mb-3 col-md-4 ms-4 d-inline-block text-start">
                      <label for="sexoGenero" class="form-label text-secondary">Sexo/Gênero</label>
                      <input type="text" class="form-control py-2" id="sexoGenero" disabled value="${Patients.Sexo}">
                    </div>
          
                    <div class="mb-3 col-md-4 ms-4 d-inline-block text-start">
                      <label for="nacionalidade" class="form-label text-secondary">Nacionalidade</label>
                      <input type="text" class="form-control py-2 text-capitalize" id="nacionalidade" disabled value="${Patients.Nacionalidade}">
                    </div>
                  </div>
                  <!-- ========================================================================================== -->
                  <div class="col-md-11 d-flex justify-content-between flex-column flex-sm-row">
                    <div class="mb-3  col-md-4 ms-4 d-inline-block text-start">
                      <label for="naturalidade" class="form-label text-secondary">Naturalidade</label>
                      <input type="text" class="form-control py-2 text-capitalize" id="naturalidade" disabled value="${Patients.Naturalidade}">
                    </div>
          
                    <div class="mb-3 col-md-4 ms-4 d-inline-block text-start">
                      <label for="profissao" class="form-label text-secondary">Profissão</label>
                      <input type="text" class="form-control py-2 text-capitalize" id="profissao" disabled value="${Patients.Profissao}">
                    </div>
          
                    <div class="mb-3 col-md-4 ms-4 d-inline-block text-start">
                      <label for="escolaridade" class="form-label text-secondary">Escolaridade</label>
                      <input type="text" class="form-control py-2 text-capitalize" id="escolaridade" disabled value="${Patients.Escolaridade}">
                    </div>
                  </div>
                    <!-- ========================================================================================== -->
                  <div class="col-md-11 d-flex justify-content-between flex-column flex-sm-row">
                    <div class="mb-3  col-md-4 ms-4 d-inline-block text-start">
                      <label for="estadoCivil" class="form-label text-secondary">Estado Civil</label>
                      <input type="text" class="form-control py-2 text-capitalize" id="estadoCivil" disabled value="${Patients.EstadoCivil}">
                    </div>
          
                    <div class="mb-3 col-md-4 ms-4 d-inline-block text-start">
                      <label for="mae" class="form-label text-secondary">Mãe</label>
                      <input type="text" class="form-control py-2 text-capitalize" id="mae" disabled value="${Patients.Mae}">
                    </div>
          
                    <div class="mb-3 col-md-4 ms-4 d-inline-block text-start">
                      <label for="pai" class="form-label text-secondary">Pai</label>
                      <input type="text" class="form-control py-2 text-capitalize" id="pai" disabled value="${Patients.Pai}">
                    </div>
                  </div>
                  </form>
          
                </div>
              </div>
            </div>
          </div>




          <!-- Button Edit modal -->
          <button  type="button" class="btn btn-outline-primary rounded-3 btnTabela px-1 py-1 d-inline-flex justify-content-center shadow-sm me-1"
          data-bs-toggle="modal" data-bs-target="#EditModal-${Patients.id}"  title="Editar">
          <i class="fa-solid fa-pen"></i></button>
          
          <!-- Modal -->
          <div class="modal fade" id="EditModal-${Patients.id}" tabindex="-1" aria-labelledby="" aria-hidden="true">
            <div class="modal-dialog modal-xl">
              <div class="modal-content"  data-id="${Patients.id}">
                <div class="modal-header">
                  <h1 class="modal-title fs-5 text-success" id="EditModalLabel"><strong>Editar dados do Paciente </strong></h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body conteudo-modal" id="modal-body"> <!-- CONTEUDO MODAL -->
          
                  <form>
                    <div class="col-md-11 d-flex justify-content-between flex-column flex-sm-row">
                    <div class="mb-3  col-md-4 ms-4 d-inline-block text-start">
                      <label for="cpf" class="form-label text-secondary">CPF</label>
                      <input type="number" class="form-control py-2" id="cpfEdit" value="${Patients.CPF}">
                    </div>
          
                    <div class="mb-3 col-md-4 ms-4 d-inline-block text-start">
                      <label for="nome" class="form-label text-secondary">Nome</label>
                      <input type="text" class="form-control py-2" id="nomeEdit" value="${Patients.NomeCompleto}">
                    </div>
          
                    <div class="mb-3 col-md-4 ms-4 d-inline-block text-start">
                      <label for="dataNascimento" class="form-label text-secondary">Data de Nascimento</label>
                      <input type="date" class="form-control py-2" id="dataNascimentoEdit" value="${Patients.DataNascimento}">
                    </div>
                  </div>
                  <!-- ========================================================================================== -->
                  <div class="col-md-11 d-flex justify-content-between flex-column flex-sm-row">
                    <div class="mb-3  col-md-4 ms-4 d-inline-block text-start">
                      <label for="email" class="form-label text-secondary">E-mail</label>
                      <input type="email" class="form-control py-2" id="emailEdit" value="${Patients.Email}">
                    </div>
          
                    <div class="mb-3 col-md-4 ms-4 d-inline-block text-start">
                      <label for="sexoGenero" class="form-label text-secondary">Sexo/Gênero</label>
                      <input type="text" class="form-control py-2" id="sexoEdit" value="${Patients.Sexo}">
                    </div>
          
                    <div class="mb-3 col-md-4 ms-4 d-inline-block text-start">
                      <label for="nacionalidade" class="form-label text-secondary">Nacionalidade</label>
                      <input type="text" class="form-control py-2" id="nacionalidadeEdit" value="${Patients.Nacionalidade}">
                    </div>
                  </div>
                  <!-- ========================================================================================== -->
                  <div class="col-md-11 d-flex justify-content-between flex-column flex-sm-row">
                    <div class="mb-3  col-md-4 ms-4 d-inline-block text-start">
                      <label for="naturalidade" class="form-label text-secondary">Naturalidade</label>
                      <input type="text" class="form-control py-2" id="naturalidadeEdit" value="${Patients.Naturalidade}">
                    </div>
          
                    <div class="mb-3 col-md-4 ms-4 d-inline-block text-start">
                      <label for="profissao" class="form-label text-secondary">Profissão</label>
                      <input type="text" class="form-control py-2" id="profissaoEdit" value="${Patients.Profissao}">
                    </div>
          
                    <div class="mb-3 col-md-4 ms-4 d-inline-block text-start">
                      <label for="escolaridade" class="form-label text-secondary">Escolaridade</label>
                      <input type="text" class="form-control py-2" id="escolaridadeEdit" value="${Patients.Escolaridade}">
                    </div>
                  </div>
                    <!-- ========================================================================================== -->
                  <div class="col-md-11 d-flex justify-content-between flex-column flex-sm-row">
                    <div class="mb-3  col-md-4 ms-4 d-inline-block text-start">
                      <label for="estadoCivil" class="form-label text-secondary">Estado Civil</label>
                      <input type="text" class="form-control py-2" id="estadoCivilEdit" value="${Patients.EstadoCivil}">
                    </div>
          
                    <div class="mb-3 col-md-4 ms-4 d-inline-block text-start">
                      <label for="mae" class="form-label text-secondary">Mãe</label>
                      <input type="text" class="form-control py-2" id="maeEdit" value="${Patients.Mae}">
                    </div>
          
                    <div class="mb-3 col-md-4 ms-4 d-inline-block text-start">
                      <label for="pai" class="form-label text-secondary">Pai</label>
                      <input type="text" class="form-control py-2" id="paiEdit" value="${Patients.Pai}">
                    </div>
                  </div>
                  </form>
          
                </div>
                <!-- BUTTONS -->
                <div class="modal-footer py-4 d-flex justify-content-between flex-column flex-sm-row">
                  <div class="align-self-center">
                    <p class="text-secondary mb-0"><span class="text-danger">*</span>Campos obrigatórios</p>
                  </div>
                  <div>
                    <button type="button" class="btn btn-outline text-secondary me-2" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" data-id="${Patients.id}" class="btn btn-success px-4" id="EditSave">Salvar Alterações</button>
                  </div>
                </div>   
                  <!-- BUTTONS -->
              </div>
            </div>
          </div>

          <button id="DeletePatient" data-id="${Patients.id}" title="Deletar" class="btn btn-outline-danger rounded-3 px-1 py-1 d-inline-flex justify-content-center shadow-sm me-1 btnTabela"><i class="fa-solid fa-trash-can"></i></button>
          </td>
        </tr>
      `;
    }
  });

  content.innerHTML = tablePatients;
}

/*
a função createPagination gera os botões de paginação
ela usa um loop for pra criar um botao pra cada pagina o numero do botão é o [i]
A função renderPatients(currentPage) é
 a que exibe na tela os pacientes da página currentPage
*/

function createPagination() {
  const pagination = document.querySelector("#pagination");
  pagination.innerHTML = ""

  for (let i = 1; i <= pages; i++) {
    const button = document.createElement("a");
    button.innerText = i;    
    button.classList.add("btn", "btn-outline", "py-1", "px-1");
    button.addEventListener("click", () => {
      currentPage = i;
      renderPatients(currentPage);
    });
    pagination.appendChild(button);
  }
}

renderPatients(currentPage);
createPagination();

  })
  
  /*
  Botão para editar os dados do paciente
  o botao abre um modal com os dados do paciente ja exibidos pelo forEach
  */

  const SaveEdit = document.querySelectorAll("#EditSave");
  SaveEdit.forEach((btnEdit) => {
    btnEdit.addEventListener("click", async () => {

      let id = btnEdit.getAttribute("data-id");
      const modalEditor = document.querySelector(
        `.modal-content[data-id="${id}"]`
      );
      try {
        //PEGA OS INPUTS
        const CPFPatient = modalEditor.querySelector(`[data-id="${id}"] #cpfEdit`).value;
        const NomePatient = modalEditor.querySelector(
          `[data-id="${id}"] #nomeEdit`
        ).value;
        const dataPatient = modalEditor.querySelector(
          `[data-id="${id}"] #dataNascimentoEdit`
        ).value;
        const emailPatient = modalEditor.querySelector(
          `[data-id="${id}"] #emailEdit`
        ).value;
        const SexoPatient = modalEditor.querySelector(
          `[data-id="${id}"] #sexoEdit`
        ).value;
        const NacionalidadePatiet = modalEditor.querySelector(
          `[data-id="${id}"] #nacionalidadeEdit`
        ).value;
        const NaturalidadePatient = modalEditor.querySelector(
          `[data-id="${id}"] #naturalidadeEdit`
        ).value;
        const ProfissaoPatient = modalEditor.querySelector(
          `[data-id="${id}"] #profissaoEdit`
        ).value;
        const EscolaridadePatient = modalEditor.querySelector(
          `[data-id="${id}"] #escolaridadeEdit`
        ).value;
        const EstadoPatient = modalEditor.querySelector(
          `[data-id="${id}"] #estadoCivilEdit`
        ).value;
        const MaePatient = modalEditor.querySelector(
          `[data-id="${id}"] #maeEdit`
        ).value;
        const PaiPatient = modalEditor.querySelector(
          `[data-id="${id}"] #paiEdit`
        ).value;

        const PatientEdited = {
          id: id,
          CPF: CPFPatient,
          NomeCompleto: NomePatient,
          DataNascimento: dataPatient,
          Email: emailPatient,
          Sexo: SexoPatient,
          Nacionalidade: NacionalidadePatiet,
          Naturalidade: NaturalidadePatient,
          Profissao: ProfissaoPatient,
          Escolaridade: EscolaridadePatient,
          EstadoCivil: EstadoPatient,
          Mae: MaePatient,
          Pai: PaiPatient
        };

        await editPatient(id, PatientEdited);
        setTimeout(function() {
          location.reload();
        }, 10);
    
      } catch (error) {
        console.error(error);
      }
    });
  });


 



  const deleteBtn = document.querySelectorAll("#DeletePatient"); //precisa selecionar todos os botoes
  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", async () => {
      //evento de click em todos os botoes
      const id = btn.getAttribute("data-id"); //pega o valor de data id e atribui a id
      await deletePatient(id); //passa id para deletepatient
      setTimeout(function() {
        location.reload();
      }, 10);
  
    });
  })

  
});




/*
Função para pesquisar nomes
na linha tabela.rows[i].cells[1].innter text cells representa a coluna da tabela
que ia ser procura se deixar 0 a função ira procurar pelo id, se colocar 1 ela procura pela coluna nome

na linha correspondente ela acessa indexof do objeto e verifica se retorna true o nome do input 
se sim, exibe correspondente se nao , nada é feito
*/
const input = document.querySelector('#inputFiltrar');
const tabela = document.querySelector('#tabela');
  input.onkeyup = function() {
      const nomeInput = input.value;
      for (let i = 1; i < tabela.rows.length; i++) {
  const conteudoCelula = tabela.rows[i].cells[1].innerText;
const corresponde = conteudoCelula.toLowerCase().indexOf(nomeInput) >= 0;
tabela.rows[i].style.display = corresponde ? '' : 'none';
}
}


// criar array global para pessquisar por ela 