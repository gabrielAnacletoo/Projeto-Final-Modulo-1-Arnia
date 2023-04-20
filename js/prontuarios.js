//Exibe o  conteudo do paciente
let ShowName = document.querySelector("#NomeURL");
let ShowData = document.querySelector("#NascimentoURL");
let ShowProfession = document.querySelector("#ProfissaoURL");
let ShowEscolaridade = document.querySelector("#EscolaridadeURL");


//==========================================>> BUTTON LOGOUT

const bntLogOut = document.querySelector("#logOut");
bntLogOut.addEventListener("click", () => {
  localStorage.clear();
  window.location.replace("../index.html");
});

// Dados Vindo por URL
let urlParams = new URLSearchParams(window.location.search);
const nomeParam = urlParams.get("nome");
let dataParam = new Date(urlParams.get("data"));
dataParam.setDate(dataParam.getDate() + 1); // Incrementa a data em 1 dia
let datenew = new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(
  dataParam
);

const profissaoParam = urlParams.get("profissao");
const escolaridadeParam = urlParams.get("escolaridade");

ShowName.innerHTML = `${nomeParam}`;
ShowData.innerHTML = `${datenew}`;
ShowProfession.innerHTML = `${profissaoParam}`;
ShowEscolaridade.innerHTML = `${escolaridadeParam}`;






//carrega o nome do usuario e email no canto direito superior
window.addEventListener("load", async () => {
  try {
    //exibe o nome  no canto direito superior
    let user = localStorage.getItem("user");
    let JSONuser = JSON.parse(user);
    if (user === null) {
      window.location.replace("../index.html");
    } else {
      let Showuser = document.querySelector("#ShowName");
      let ShowEmailuser = document.querySelector("#showEmail");
      Showuser.innerHTML += JSONuser.nameUser;
      ShowEmailuser.innerHTML += JSONuser.email;
    }
  } catch (error) {
    console.log(error);
  }
});





//Criando novo fato
const CreateFato = async (id, newFato) => {
  const url = `https://pacientes.onrender.com/pacientes/${id}/`;
  const response = await fetch(url);
  const fatosresult = await response.json();

  let maxID = 0;
  for (const fatos of fatosresult.FatoRelevante) {
    // percore sessoespaciente
    if (fatos.id > maxID) {
      // se
      maxID = fatos.id;
    }
  }

  // Incrementa o ID pra ter o proximo livre
  let nextID = maxID + 1;

  newFato.id = nextID; // Adicionar o ID no objeto que esta sendo criado, até entao o id era vazio ""

  // Adicionar o novo objeto de sessão ao array de sessões do paciente
  fatosresult.FatoRelevante.push(newFato);

  const update = await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fatosresult),
  });
};





// Criar novo fato relevante
const btnFatos = document.querySelector("#NewFato");
btnFatos.addEventListener("click", async () => {
  let id = urlParams.get("id");
  const dataFatos = new Date(document.querySelector("#DataFato").value);
  dataFatos.setDate(dataFatos.getDate() + 1); // adiciona mais 1 dia
  const DataFormatada = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
  }).format(dataFatos);
  const titleFato = document.querySelector("#TituloFato").value;
  const description = document.querySelector("#AreatextFatos").value;

  const newFato = {
    data: DataFormatada,
    titulo: titleFato,
    descricao: description,
  };

  await CreateFato(id, newFato);
  setTimeout(function() {
    location.reload();
  }, 500);

})






const CreateSession = async (id, NewSession) => {
  const url = `https://pacientes.onrender.com/pacientes/${id}/`;
  const response = await fetch(url);
  const sessions = await response.json();

  let maxID = 0;
  for (const sessao of sessions.sessoesPaciente) {
    // percore sessoespaciente
    if (sessao.id > maxID) {
      // se
      maxID = sessao.id;
    }
  }
  // Incrementa o ID pra ter o proximo livre
  let nextID = maxID + 1;
  NewSession.id = nextID; // Adicionar o ID no objeto que esta sendo criado, até entao o id era vazio ""
  // Adicionar o novo objeto de sessão ao array de sessões do paciente
  sessions.sessoesPaciente.push(NewSession);

  const update = await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sessions),
  });
};








//Criando a sessão com id da URL
let btnNewSession = document.querySelector("#NewSession");
btnNewSession.addEventListener("click", async () => {
  try {
    let id = urlParams.get("id");
    const DataSessao = new Date(document.querySelector("#dataSessao").value);
    DataSessao.setDate(DataSessao.getDate() + 1);
    const DataFormatada = new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "long",
    }).format(DataSessao);

    const menuHour = document.querySelector("#HoraStart");
    const HoraStartSS = menuHour.value;
    const menuHourEnd = document.querySelector("#HoraFim");
    const HoraEndSS = menuHourEnd.value;
    const title = document.querySelector("#titleSessao").value;
    const resume = document.querySelector("#TextAreaSession").value;
    const Pay = parseFloat(document.querySelector("#ValuePayment").value);
    const payformated = Pay.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
    const menuPayment = document.querySelector("#PaymentMethods");
    const PaymentValue = menuPayment.value;
    const Pago = document.querySelector('input[name="status"]:checked').value;

    const NewSession = {
      id: "",
      data: DataFormatada,
      HoraInicio: HoraStartSS,
      HoraFim: HoraEndSS,
      Titulo: title,
      Resumo: resume,
      Valor: payformated,
      Forma: PaymentValue,
      Status: Pago,
    };

    if (DataSessao == "" || title == "") {
      alert("Todos os campos precisam ser Preenchidos.");
    } else {
      await CreateSession(id, NewSession);
      setTimeout(function() {
        location.reload();
      }, 500);
  
    }
  } catch (error) {
    console.log(error);
  }
});






// exibi os conteudos de fatos e sessoes juntos
window.addEventListener("load", async () => {
  let id = urlParams.get("id");
  let url = `https://pacientes.onrender.com/pacientes/${id}`;
  try {
    const show = document.querySelector("#SessionResult");
    const conn = await fetch(url);
    const result = await conn.json();
    let arr = result.sessoesPaciente;
    arr.reverse();
    let HTML = "";
    if (result.sessoesPaciente.length > 0) {
      for (const session of result.sessoesPaciente) {
        HTML += `
      <div class="d-flex flex-column w-100 align-items-center" id="resultApi">
        <div class="card w-100 mt-3 shadow mb-4" id="SessaoDiv">
        ${
          session.id === 1
            ? ""
            : `<img src="../img/divisorGreen.png" id="divisorGreen">`
        }
          <div class="card-body border-start border-success border-4" >
            <img src="../img/circleGreen.png" class="position-absolute top-0 translate-middle circleResult">
            <img src="../img/health.png" class="position-absolute top-0 translate-middle conteudoCircleResult">

            <div class="d-flex justify-content-between mb-1 align-items-center">
            <a href="sessions.html?id=${session.id}&data=${
          session.data
        }&resumo=${session.Resumo}&horastart=${
          session.HoraInicio
        }&horatermino=${session.HoraFim}&valor=${session.Valor}&forma=${
          session.Forma
        }&status=${session.Status}" class="btn btn-outline btn-sm"}">Sessão ${
          session.id
        }</a>


            <div class="dropdown">
            <button class="btn btn-outline" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              ...
            </button>
            <ul class="dropdown-menu custom-dropdown py-2" id="uldrop">
            
            <li class="linksul"><a class="dropdown-item text-primary ms-3 pt-0 pe-0 btn-editar" onclick="editar(${session.id})" href="#" >
            <img src="../img/pen.png" id="editsessionpng" class="me-2"><small>Editar</small></a></li>
                          
              <li class="linksul"><a class="dropdown-item text-danger ms-3 pt-1 pb-2 pe-0" href="#" onclick="deleteSession(${session.id})">
              <img src="../img/deletes.png" id="deletesessionpng" class="me-2"><small>Excluir</small></a></li>
              </ul>
          </div>
            </div>

            <p class="text-secondary">${session.data}</p> 
            <p class="text-secondary" id="ResumoOriginal">${session.Resumo}</p>

            <div id="DivArea" data-id="${session.id}">
            <textarea name="" id="Textarearesumo">${session.Resumo}</textarea>
            <div class="d-flex justify-content-end">
            <button class="btn btn-sm btn-outline text-secondary me-3" id="CancelarEdition"><small>Cancelar</small></button>
            <button class="btn btn-sm btn-success text-light py-0" id="SalvarEdition"><small>Salvar Alterações</small></button>
            </div>
            </div>
            
          </div>
        </div>
      </div>`;

        for (const fato of result.FatoRelevante) {
          if (fato.id === session.id) {
            HTML += `
            <div class="d-flex flex-column w-100 align-items-center" id="resultApi">
          <div class="card w-100 mt-3 shadow mb-4" id="FatosDiv">
  ${fato.id === 1 ? `<img src="../img/rectangleBluea.png" id="divisorBlue">` : ""}
             
            <div class="card-body border-start border-primary border-4">
              <img src="../img/circleBlue.png" class="position-absolute top-0 translate-middle circleResult">
              <img src="../img/fatosb.png" class="position-absolute top-0 translate-middle conteudoCircleResult">
              <div class="d-flex justify-content-between mb-1 align-items-center">
              <p class="h6 mt-3 mb-2">Fato relevante</p>

              <div class="dropdown">
              <button class="btn btn-outline" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                ...
              </button>
              <ul class="dropdown-menu custom-dropdown" id="uldrop">
                <li class="linksul"><a class="dropdown-item text-primary ms-3 pt-0 pe-0 pb-1" href="#"  onclick="editarFatos(${fato.id})"><img src="../img/pen.png" id="editsessionpng" class="me-2" ><small>Editar</small></a></li>
              </ul>
            </div>

              </div>
              <p class="text-secondary">${fato.data}</p>
              <p class="text-secondary" id="FatoOriginal">${fato.descricao}</p>

              <div id="DivFatosEdit" data-id="${fato.id}">
              <textarea id="TextAreaFatos">${fato.descricao}</textarea>
              <div class="d-flex justify-content-end">
              <button class="btn btn-sm btn-outline text-secondary me-3" id="CancelarFato"><small>Cancelar</small></button>
              <button class="btn btn-sm btn-success text-light py-0" id="SalvarFato"><small>Salvar Alterações</small></button>
              </div>
              </div>


            </div>
          </div>
        </div>`;
          }
        }

        
      }
      show.innerHTML = HTML;
    } else {
      show.innerHTML += `
    <div class="d-flex flex-column w-100 align-items-center" id="resultApi">
      <div class="card w-100 mt-3 shadow mb-4">
        <div class="card-body">
          <p class="text-secondary">Nenhuma Sessão Registrada</p> 
        </div>
      </div>
    </div>`;
    }
  } catch (error) {
    console.log(error);
  }
/*
Função para Filtrar sessões e Fatos Relevantes
f*/
const FiltrarProntuario = () => {
  const btnTodos = document.querySelector('#todosFS')
  const btnSessoes = document.querySelector('#ApenasSessao')
  const btnFatos = document.querySelector('#ApenasFatos')
  const divisorb = document.querySelector('#divisorBlue')

  const divSessao = document.querySelector('#SessaoDiv')
  const divFatos = document.querySelector('#FatosDiv')

  btnTodos.addEventListener('click', () => {
    divSessao.style.display = 'block'
    divFatos.style.display = 'block'
    divisorb.style.display = 'block'

  })
  btnSessoes.addEventListener('click', () => {
    divFatos.style.display = 'none'
    divSessao.style.display = 'block'
  })
  btnFatos.addEventListener('click', () => {
    divFatos.style.display = 'block'
    divSessao.style.display = 'none'
    divisorb.style.display = 'none'
  })
}
FiltrarProntuario()

})


/*
função para editar sessão sem sair da pagina
(deu muito trabalho) ela usa o atributo data-id
é uma função async que verfica os dados direto na api
*/
const editar = async (idSessao) => {
  
  try {
    
    const divArea = document.querySelector(`#DivArea[data-id="${idSessao}"]`);
    const original = document.querySelector(`#ResumoOriginal`);
  
    original.style.display = 'none';
    divArea.style.display = 'block';
  
    const btnCancel = divArea.querySelector('#CancelarEdition');
    const btnSave = divArea.querySelector('#SalvarEdition');

    const response = await fetch(`https://pacientes.onrender.com/${urlParams.get('id')}`);
    const result = await response.json();

    const sessionIndex = result.sessoesPaciente.findIndex((sessao) => sessao.id === idSessao);

    btnCancel.addEventListener('click', () => {
      divArea.style.display = 'none';
      original.style.display = 'block';
    });

    btnSave.addEventListener('click', async () => {
      const newResumo = divArea.querySelector('#Textarearesumo').value;
      result.sessoesPaciente[sessionIndex].Resumo = newResumo;

      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(result)
      };

      const response = await fetch(`https://pacientes.onrender.com/pacientes/${urlParams.get('id')}`, options);
      const updatedSession = await response.json();

    });
  } catch (error) {
    console.error('Erro: ' + error);
  }
}




/*
filter()
splice()
index encontra a sessão com id 

o if verifica se existe um indice com id maior que zero
Se for maior ou igual a 0, então a sessão existe no array vai ser excluida.
Então a variavel sessaoDeletada  armazena a sessão que vai ser excluida

Depois o metodo filter() busca no array fatosdelet se tem algum fato relevante com o id igual da sessão que vai ser excluida
Se sim,o array sessoesDelet.FatoRelevante  vai ser atualizado com o  filter() para excluir todos os fatos relevantes que possuem o mesmo id da sessão
que vai ser excluida

A sessão é excluida do array sessoesDelet.sessoesPaciente usando o método splice()
com o parâmetro index e 1 (só um elemento vai ser excluido pelo indice encontrado(index,1) (pesquisar mais sobre isso)) 
Se não tiver fatos relevantes com o mesmo id da sessão excluida, o array sessoesDelet.FatoRelevante permanece o mesmo.

*/

/* Deletar Sessões */
const deleteSession = async (id) => {
  try {
    const idurl = urlParams.get("id");
    const url = `https://pacientes.onrender.com/pacientes/${idurl}`;
    const conn = await fetch(url);
    const sessoesDelet = await conn.json();
    const fatosdelet = sessoesDelet.FatoRelevante;
    const index = sessoesDelet.sessoesPaciente.findIndex(
      (sessao) => sessao.id === id
    );
    if (index >= 0) {
      const sessaoDeletada = sessoesDelet.sessoesPaciente[index];
      const fatosExcluidos = fatosdelet.filter(
        (fato) => fato.id === sessaoDeletada.id
      );
      sessoesDelet.sessoesPaciente.splice(index, 1);
      if (fatosExcluidos.length > 0) {
        sessoesDelet.FatoRelevante = fatosdelet.filter(
          (fato) => fato.id !== sessaoDeletada.id
        );
      }
    }
    await fetch(`https://pacientes.onrender.com/pacientes/${idurl}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sessoesDelet),
    });
  } catch (error) {
    console.log(error);
  }
setTimeout(function() {
          location.reload();
        }, 500);
}






/* Função para Editar Fatos Relevantes */
const editarFatos = async (idFato) => {
  let DivFatosEdit = null; // Definida como null por que dava erro de acessar antes de inicializar
  try {
    DivFatosEdit = document.querySelector(`#DivFatosEdit[data-id="${idFato}"]`);
    const Fatooriginal = document.querySelector(`#FatoOriginal`);
    Fatooriginal.style.display = 'none';
    DivFatosEdit.style.display = 'block';
  
    const btnCancel = DivFatosEdit.querySelector('#CancelarFato');
    const btnSave = DivFatosEdit.querySelector('#SalvarFato');
    const response = await fetch(`https://pacientes.onrender.com/pacientes/${urlParams.get('id')}`);
    const result = await response.json();
    const sessionIndex = result.FatoRelevante.findIndex((Fato) => Fato.id === idFato);
    btnCancel.addEventListener('click', () => {
      DivFatosEdit.style.display = 'none';
      Fatooriginal.style.display = 'block';
    })
    btnSave.addEventListener('click', async () => {
      const NewDescricao = DivFatosEdit.querySelector('#TextAreaFatos').value;
      result.FatoRelevante[sessionIndex].descricao = NewDescricao;
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(result)
      };

      const response = await fetch(`https://pacientes.onrender.com/pacientes/${urlParams.get('id')}`, options);
      const updatedSession = await response.json();
    })
  } catch (error) {
    console.error('erro: ' + error);
  }
}
