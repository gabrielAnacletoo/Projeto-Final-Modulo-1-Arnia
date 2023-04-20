/*
===========>>> VERIFICAR SE USUARIO JA EXISTE  
*/
const userExists = async(userLogin, userPassword) => {
    const url = "https://pacientes.onrender.com/users";
    const request = await fetch(url);
    const data = await request.json();
    const user = data.find((user) => user.nameUser === userLogin || user.passWord === userPassword);
    
    if (user) {
      localStorage.setItem('user', JSON.stringify(user)); // converte o objeto em uma string JSON e armazena no localStorage
    }
    return user;
  }  

/* 
===========>>>  COMEÇANDO JS DE LOGIN 
*/
const login = document.querySelector("#btnEntrar");
const SmallMsgerror = document.querySelector("#smallerror")
login.addEventListener("click" , async(e) => {
  e.preventDefault();
    try {
    const userLogin = document.querySelector("#loginInput").value
    const userPassword = document.querySelector("#passUserInput").value

    //VERIFICANDO SE USUARIO EXISTE
      const existingUser = await userExists(userLogin, userPassword);
      if (existingUser) {
        window.location.replace("content/home.html");
    } else {
        SmallMsgerror.innerHTML = `O nome ${userLogin} não esta cadastrado(a).`
    }
    } catch(error) {
        console.log(error)
    }     

})


/*
função olho para exibir senha
*/
const btnViewPass = document.querySelectorAll('.size-eye');
const passInputs = document.querySelectorAll('input[name="senhaIndex"]');

btnViewPass.forEach((button, index) => {
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    const passInput = passInputs[index];
    passInput.type = passInput.type == 'text' ? 'password' : 'text';
  });
})

