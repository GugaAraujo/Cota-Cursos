//Modal
let modal = document.getElementById("modal")
let conteudo_modal = document.getElementById("modal-content")

//seção para exibição de erros
let span_erro = document.getElementById("span_erro")

//seção que receberá os cursos via DOM
let div_conteudo = document.getElementsByTagName("section")[0]

//esta formatação será utilizada em informalções monetárias
let formatacao_monetaria = { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' }

//Receberá as informações da API, com variáveis de melhor leitura
let lista_cursos = []


consulta_api()



// Consultando API
function consulta_api(){
  

    fetch(`https://testapi.io/api/Jonas-buriti/scholarship`)
    //Aguardando Resultado
    .then(resultado => {
      console.log(resultado.status)
      return resultado.json()
    })
    .then(resultado => recebe_json_API(resultado))
    .catch(()=> exibe_erro("Não foi possível consultar a API. Tente novamente em algumas horas.","erro_alerta"))
  

}

//Alterando variáveis para facilitar a leitura...
const recebe_json_API = (resultado)=>{
    for (var contador=0; contador<resultado.length; contador++){
        let preco_cheio = resultado[contador].full_price
        let preco_desconto = resultado[contador].price_with_discount
        let percentual_de_desconto = resultado[contador].discount_percentage
        let campus_bairro = resultado[contador].campus.name
        let campus_cidade = resultado[contador].campus.city
        let curso_nome = resultado[contador].course.name
        let curso_titulo = resultado[contador].course.kind
        let curso_subtitulo = resultado[contador].course.level
        let diponivel = resultado[contador].enabled
        let inscricao = resultado[contador].enrollment_semester
        let data_inicio = resultado[contador].start_date
        let universidade = resultado[contador].university.name
        let universidade_score = resultado[contador].university.score
        let universidade_logo = resultado[contador].university.logo_url

        if(diponivel){
          //Adicionado ID para cada objeto
            lista_cursos.push(`{"id":"${contador}","preco_cheio":${preco_cheio},"preco_desconto":${preco_desconto},"percentual_de_desconto":${percentual_de_desconto},"campus_bairro":"${campus_bairro}","campus_cidade":"${campus_cidade}","curso_nome":"${curso_nome}","curso_titulo":"${curso_titulo}","curso_subtitulo":"${curso_subtitulo}","diponivel":"${diponivel}","inscricao":"${inscricao}","data_inicio":"${data_inicio}","universidade":"${universidade}","universidade_score":"${universidade_score}","universidade_logo":"${universidade_logo}"}`)
        }

    }
    //... e adicionando a lista_cursos, já em formato JSON
    lista_cursos = JSON.parse(`[${lista_cursos}]`)



    rendiza_tabela()




}

// Fechar modal
window.onclick = function(event) {
  if (event.target === modal) {
    fechar_modal()
  }
}
window.addEventListener("keyup",(event)=>{
  if (event.key === "Enter"||event.key === "Escape" ) {
    fechar_modal()
  }
})
     
function fechar_modal(){
  modal.style.display ="none"
}

function abrir_modal(id_curso){
  modal.style.display ="block"
  conteudo_modal.innerHTML = 
  `<div class="row w-100 h-100 coluna_principal">
      <div class="col-6 d-flex align-items-center coluna_secundaria">
        <img class="modal__logo" 
        title="Universidade ${lista_cursos[id_curso].universidade}. ${lista_cursos[id_curso].curso_titulo} - ${lista_cursos[id_curso].campus_bairro}, ${lista_cursos[id_curso].campus_cidade}. Score: ${lista_cursos[id_curso].universidade_score}. Valor: ${(lista_cursos[id_curso].preco_cheio.toLocaleString('pt-BR', formatacao_monetaria))}"
        img-fluid" src="${lista_cursos[id_curso].universidade_logo}" />
      </div>
      <div class="col-6 coluna_secundaria">
        <span class="titulo">${lista_cursos[id_curso].curso_titulo}</span> - <span class="subtitulo">${lista_cursos[id_curso].curso_subtitulo}</span>
        <div class="row mt-4">
          <div class="col-6">
            <p>${lista_cursos[id_curso].universidade}</p>
            <p>${lista_cursos[id_curso].campus_bairro}</p>
          </div>
          <div class="col-6">
            <p>${lista_cursos[id_curso].universidade_score}</p>
            <p>${lista_cursos[id_curso].campus_cidade}</p>
          </div>
          <div class="row">
            <div class="col-12 ms-3">
              <p class="preco">${(lista_cursos[id_curso].preco_cheio.toLocaleString('pt-BR', formatacao_monetaria))}</p>
            </div>
          </div>
        </div>        
      </div>
  </div>`
}

//criando elementos da tabela
function rendiza_tabela(){

  var tabela = document.createElement("table");
  var tblBody = document.createElement("tbody");

  // criando as celulas
  for (var contador=0; contador<lista_cursos.length;contador++) {
    // criando as linhas e inserindo dinamicamente cada elemento do json
    var row = document.createElement("tr");

    row.id = `tr_${lista_cursos[contador].id}`
    //Coluna com imagem recebeu também atributo Title, para melhorar acessibilidade.
    row.innerHTML=`<td class="td_logo"><img class="img_logo"
    title="Universidade ${lista_cursos[contador].universidade}. ${lista_cursos[contador].curso_nome} - ${lista_cursos[contador].campus_cidade}. Valor: ${(lista_cursos[contador].preco_cheio).toLocaleString('pt-BR', formatacao_monetaria)}" 
    src="${lista_cursos[contador].universidade_logo}"/></td>`

    row.innerHTML+=`<td class="td_curso">${lista_cursos[contador].curso_nome}</td>`
    row.innerHTML+=`<td class="td_cidade">${lista_cursos[contador].campus_cidade}</td>`
    row.innerHTML+=`<td class="td_preco_cheio">${(lista_cursos[contador].preco_cheio).toLocaleString('pt-BR', formatacao_monetaria)}</td>`
    row.innerHTML+=`<td class="td_link"><a 
    href="#" class="link_tabela" id="${lista_cursos[contador].id}" onclick="abrir_modal(${lista_cursos[contador].id})">
    <i class="fas fa-plus-circle"></i>
    </a></td>`

  // add as linhas em tblBody
    tblBody.appendChild(row);
  }

  // inserindo <tbody> na <table>
  tabela.appendChild(tblBody);
  // inserindo <table> em <section> div_conteudo
  div_conteudo.appendChild(tabela);
  }

//exibindo erro ao usuário, informando a mensagem a ser exiba e também a classe (css) que receberá.
function exibe_erro(string_erro,classe_erro){
  span_erro.textContent = string_erro
  span_erro.classList.add(classe_erro)

  //removendo aviso após contagem, com efeito de transição
setTimeout(() => {
  span_erro.classList.add("fadeOut")
  setTimeout(()=>{
    span_erro.style.display = "none"
  },400)
}, 8000);
  

}