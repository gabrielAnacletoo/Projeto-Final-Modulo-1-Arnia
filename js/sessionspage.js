//carrega o nome do usuario e email no canto direito superior
window.addEventListener("load", async () => {
    try {//exibe o nome  no canto direito superior
      let user = localStorage.getItem("user");
      let JSONuser = JSON.parse(user)
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
})



window.addEventListener('load', () =>{
    // Dados Vindo por URL
let urlParams = new URLSearchParams(window.location.search);
const data = urlParams.get('data');
const horastart = urlParams.get('horastart');
const horatermino = urlParams.get('horatermino')
const resumo = urlParams.get('resumo')
const status = urlParams.get('status')
const valor = urlParams.get('valor')
const forma = urlParams.get('forma')
const showTop = document.querySelector('#dados');
const showMiddle = document.querySelector('#content')
const valorsessao = document.querySelector('#valorsessao')
const formapagamento = document.querySelector('#formasessao')
const statuspagamento = document.querySelector('#statuspagamento')

showTop.innerHTML = `${data} | ${horastart}h - ${horatermino}h`
showMiddle.innerHTML = `${resumo}`
valorsessao.innerHTML= `${valor}`
formapagamento.innerHTML = `${forma}`
statuspagamento.innerHTML = `${status}`

})
