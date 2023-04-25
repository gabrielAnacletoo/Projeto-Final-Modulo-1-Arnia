/*
===========>>> METHODS  
*/
const url = "https://pacientes.onrender.com/users"
const createPost = async (post) => {
  await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
};

// ===========>>> EDIT METHOD PUT
const edit = async (id, post) => {
  await fetch(`https://pacientes.onrender.com/users/${id}`, {
    method: "PUT",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  })
};

// ===========>>> DELETE METHOD 
const deletePost = async (id) => {
  await fetch(`https://pacientes.onrender.com/users/${id}`, {
    method: "DELETE"
  })
}

/*
===========>>> VERIFICAR SE USUARIO JA EXISTE  
*/
const userExists = async(nameUser, email) => {
  const url = "https://pacientes.onrender.com/users";
  const request = await fetch(url);
  const data = await request.json();
  const user = data.find((user) => user.nameUser === nameUser || user.email === email);
  return user;
}

/*
===========>>> TRANSICAO DE CARDS E VERIFICAR SE CAMPOS ESTÃO VAZIOS 
*/

const btnP = document.querySelector('#btnProsseguir1');
const container = document.querySelector('#container');

btnP.addEventListener('click', (e) => {
  e.preventDefault(); 
  
  let errorC1 = document.querySelector("#errorPassword1")
  const nameRegister = document.querySelector("#nameRegInput").value;
  const regexName = /^[a-zA-Z]+$/;
  const emailRegister = document.querySelector("#EmailRegInput").value;
  
  if(nameRegister === '' || emailRegister === '') {
    errorC1.innerHTML = "Preencha todos os campos";
    setTimeout(() => {
      location.reload();
    }, 1000);
  } if (!regexName.test(nameRegister)) {
    errorC1.innerHTML = "<small>O Nome deve ter apenas Letras, sem espaços.</small>";
    setTimeout(() => {
      location.reload();
    }, 2500);
  } else {
    container.classList.add('flip');
  }
});

const card1 = document.querySelector('#cardRegister1');
const card2 = document.querySelector('#cardRegister2');

const btnVoltar = document.querySelector('#back');
const card2Inputs = card2.querySelectorAll('input');
const botoescard2 = card2.querySelectorAll('button')
const bodycard = card2.querySelector('#back')

btnVoltar.addEventListener('click', (e) => {
  e.preventDefault();
  container.classList.remove('flip');
});

// impede que ao clicar nos inputs do card 2 a página volte ao card 1
botoescard2.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.stopPropagation()
  })
})
bodycard.forEach((body) => { 
  body.addEventListener('click', (e) => {
    e.stopPropagation()
  })
})
card2Inputs.forEach((input) => {
  input.addEventListener('click', (e) => {
    e.stopPropagation();

    /*
    e.stopPropagation() é usada para impedir a propagação do evento de
     se propagar para os elementos pai. Isso significa que,
     se você tiver um elemento filho e um elemento pai que estejam ouvindo o mesmo evento, a função e.stopPropagation() impede que o evento
      seja disparado no elemento pai quando ocorrer no filho. 
    Essa função é útil em situações onde você deseja executar uma ação em um elemento específico
     e não quer que o evento se propague para os elementos pai.

    */
  });
});


/* 
===========>>>  COMEÇANDO JS DE REGISTRO  
*/

let SmallError = document.querySelector("#smallc2")
const btnRegister = document.querySelector("#btnReg");
btnRegister.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const nameRegister = document.querySelector("#nameRegInput").value;
    const EmailRegister = document.querySelector("#EmailRegInput").value;
    const PasswordRegister = document.querySelector("#PasswordInput").value;
    const PasswordRegisterC = document.querySelector("#PassConfirmInput").value;
    
    //VERIFICANDO SE USUARIO EXISTE
    const existingUser = await userExists(nameRegister, EmailRegister);
    if (existingUser) {
      SmallError.innerHTML = "Usuário já existe"
      setTimeout(() => {
        location.reload();
      }, 1000);
      return;
    }
    
    const NewUser = {
      "id": "",
      "nameUser": nameRegister,
      "email": EmailRegister,
      "level":0,
      "Password": PasswordRegister,
      "ConfirmPassword": PasswordRegisterC
    }

    //===========>>> VERIFICA SE OS CAMPOS ESTAO VAZIOS E PREENCHIDOS CORRETAMENTE
    if(nameRegister === '' || EmailRegister === '' || PasswordRegister === '' || PasswordRegisterC === ''){
      //VERIFICA SE OS CAMPOS ESTÃO VAZIOS
      SmallError.innerHTML = "Preencha os dados corretamente"; 
    } else if (PasswordRegister !== PasswordRegisterC ) {
      // VERIFCA SE AS SENHAS CONHECIDEM
      SmallError.innerHTML = "Senhas não correspondem";
    } else if(PasswordRegister.length < 8 && PasswordRegisterC.length < 8) {
      // VERIFICA SE AS SENHAS TEM NO MINIMO 8 CARACTERES
      SmallError.innerHTML = "A senha precisa ter no mínimo 8 dígitos";
    } else if (/^(?=.*[@!#$%^&*()/\\])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(PasswordRegister) && /^(?=.*[@!#$%^&*()/\\])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(PasswordRegisterC)) {
      //VERIFICA SE AS SENHAS ATENDEM AOS REQUISITOS DA REGEX
      await createPost(NewUser)
      alert("Usuario Cadastrado com sucesso")
      setTimeout(() => {
        window.location.replace("../index.html");
      }, 10);
      
    } else {
      SmallError.innerHTML = "As senhas devem conter pelo menos um caractere especial, letra minúscula e letra maiúscula";
    }
    
  } catch (error) {
    console.log(error)
  }
});



/*
função olho para exibir senha
*/
const btnViewPass = document.querySelectorAll('.size-eye');
const passInputs = document.querySelectorAll('input[name="inputSenhas"]');

btnViewPass.forEach((button, index) => {
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    const passInput = passInputs[index];
    passInput.type = passInput.type == 'text' ? 'password' : 'text';
  });
})


