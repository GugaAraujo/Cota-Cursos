//Modal
let modal = document.getElementById("modal")
let conteudo_modal = document.getElementById("modal-content")

//seção para exibição de erros
let span_erro = document.getElementById("span_erro")

//seção que receberá os cursos via DOM
let div_conteudo = document.getElementById("conteudo")

//esta formatação será utilizada em informalções monetárias
let formatacao_monetaria = { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' }

//Receberá as informações da API, com variáveis de melhor leitura
let lista_cursos = []

// receberá temporariamente as informações da API, antes de as ordenarmos e parsearmos o JSON
let temporario = ""

//limite_por_pagina de itens por página
let limite_por_pagina = 10

//array qye abrigará todos as linhas de tabela, antes de serem quebradas em grupos de 10.
let arraTr = []

//UL botão de paginação, proximo e anterior
let ul = document.querySelector(".lista_paginacao_ul")


consulta_api()



// Consultando API
function consulta_api(){
    fetch(`https://helper-guga.herokuapp.com`)
    //Aguardando Resultado
    .then(resultado => resultado.json())
    .then(resultado => recebe_json_API(resultado))
    .catch((error)=> {
      console.log(error)
      exibe_erro("Não foi possível consultar a API. Tente novamente em algumas horas.","erro_alerta")
    })


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

          //Filtrando objetos que pussuam Enable=True
          if(diponivel){
            //Adicionado ID para cada objeto
              lista_cursos.push(`{"id":"${contador}","preco_cheio":${preco_cheio},"preco_desconto":${preco_desconto},"percentual_de_desconto":${percentual_de_desconto},"campus_bairro":"${campus_bairro}","campus_cidade":"${campus_cidade}","curso_nome":"${curso_nome}","curso_titulo":"${curso_titulo}","curso_subtitulo":"${curso_subtitulo}","diponivel":"${diponivel}","inscricao":"${inscricao}","data_inicio":"${data_inicio}","universidade":"${universidade}","universidade_score":"${universidade_score}","universidade_logo":"${universidade_logo}"}`)

            }

      }

      //parseando em JSON
      temporario = JSON.parse(`[${lista_cursos}]`)

      //ordenando array de cursos de acordo com a escolha do usuário
      ordena_cursos("alfabetica")

    }
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

//ordenando array de cursos de acordo com a escolha do usuário
function ordena_cursos(ordem){

  //removendo decoração underline de toda a lista de ordenação
  let btn_ordem_class = document.querySelectorAll(".btn_ordem_class")
  for(var i=0;i<btn_ordem_class.length;i++){
    let btn = btn_ordem_class[i]
    btn.style.textDecoration="none"
  }

  //adicionando decoração underline apenas a lista de ordenação escolhida
  let btn_ordem_id = document.getElementById(`btn_ordem_id_${ordem}`)
  btn_ordem_id.style.textDecoration = "underline"


    if(ordem==="alfabetica"){
      lista_cursos = temporario.sort(function(a,b){ 
        return a.curso_nome.localeCompare(b.curso_nome)
      });
     }
    else if(ordem==="score"){
      lista_cursos = temporario.sort(function(a,b){
        return b.universidade_score - a.universidade_score
      });
    }

   else if(ordem==="mais_caro"){
      lista_cursos = temporario.sort(function(a,b){ 
      return b.preco_cheio - a.preco_cheio
    });
  }

  else if(ordem==="mais_barato"){
    lista_cursos = temporario.sort(function(a,b){ 
      return a.preco_cheio - b.preco_cheio
    });
  }
  else if(ordem==="graduacao"){
    lista_cursos = temporario.sort(function(a,b){ 
      return a.curso_titulo.localeCompare(b.curso_titulo)
    });
  }
  else{
    lista_cursos = temporario.sort(function(a,b){ 
      return a.curso_nome.localeCompare(b.curso_nome)
    });
  }



  //renderizando após ordenado
  rendiza_tabela()

  //Paginação de 10 em 10
  //limita_itens_paginação(limite_por_pagina)

  btn_gerador(limite_por_pagina)
}

//criando elementos da tabela
function rendiza_tabela(){
  div_conteudo.innerHTML=""
  var tabela = document.createElement("table");
  var tbody = document.createElement("tbody");
  tbody.className= "list-group"

  // criando as celulas
  for (var contador=0; contador<limite_por_pagina;contador++) {
    // criando as linhas e inserindo dinamicamente cada elemento do json
    var row = document.createElement("tr")
    row.className = "list-group-item linha" 

    row.id = `tr_${lista_cursos[contador].id}`

    //Coluna com imagem recebeu também atributo Title, para melhorar acessibilidade.
    row.innerHTML=`<td class="td_logo"><img class="img_logo"
    title="Universidade ${lista_cursos[contador].universidade}. ${lista_cursos[contador].curso_nome} - ${lista_cursos[contador].campus_cidade}. Valor: ${(lista_cursos[contador].preco_cheio).toLocaleString('pt-BR', formatacao_monetaria)}" 
    src="${lista_cursos[contador].universidade_logo}"/></td>`

    row.innerHTML+=`<td class="td_curso" name="td_curso">${lista_cursos[contador].curso_nome}</td>`
    row.innerHTML+=`<td class="td_cidade" name="td_cidade">${lista_cursos[contador].campus_cidade}</td>`
    row.innerHTML+=`<td class="td_preco_cheio">${(lista_cursos[contador].preco_cheio).toLocaleString('pt-BR', formatacao_monetaria)}</td>`
    row.innerHTML+=`<td class="td_link"><a 
    href="#" class="link_tabela" id="${lista_cursos[contador].id}" onclick="abrir_modal(${contador})">
    <i class="fas fa-plus-circle"></i>
    </a></td>`

  // add as linhas em tbody
    tbody.appendChild(row);  
  }

  // inserindo <tbody> na <table>
  tabela.appendChild(tbody);
  // inserindo <table> em <section> div_conteudo
  div_conteudo.appendChild(tabela);
}

//exibindo erro ao usuário, informando a mensagem a ser exiba e também a classe (css) que receberá.
function exibe_erro(string_erro,classe_erro){
  span_erro.textContent = string_erro
  span_erro.classList.add(classe_erro)
  span_erro.classList.remove("invisivel")

  //removendo aviso após contagem, com efeito de transição
  setTimeout(() => {
    span_erro.classList.add("invisivel")
  }, 6000);
}



//Paginação de 10 em 10
// function limita_itens_paginação(limite_por_pagina){


//   //pegando os elementos da tabela renderizada
//   let tbody = document.getElementsByClassName("list-group")[0]
//   let tr = document.getElementsByClassName("list-group-item linha")

//   //contador, inserindo linha por linha na array de Tr's
//   for(var i=0; i<tr.length;i++){
//     arraTr.push(tr[i])
//   }
  
//   //zerando a tabela, para não sobrepor dados
//   tbody.innerHTML = ""

//   //adiconando a tabela até atingir o limite_por_pagina estabelecido
//   for(var i=0; i<limite_por_pagina;i++){
//     tbody.appendChild(arraTr[i])
//   }

// }


  function btn_gerador(limite_por_pagina)
  {
    ul.innerHTML=
    `<li class="proximo d-inline-flex"> 
    <a href="#" id="anterior">&#139;</a>
  </li>
  <li class="anterior d-inline-flex">
    <a href="#" id="proximo">&#155;</a>
  </li>`

    let tbody = document.getElementsByClassName("list-group")[0]
    //totald de itens da array
    const numero_Tr = lista_cursos.length
    
    if(numero_Tr <= limite_por_pagina){
      ul.style.display = "none"
    }
    else{
      ul.style.display = "flex"
      const divisao = Math.ceil(numero_Tr/limite_por_pagina)


      for(let contador=1; contador<=divisao;contador++){
        let li = document.createElement("li")
        li.className = "lista_pagina d-inline-flex"
        let a = document.createElement("a")
        a.href = "#"
        a.setAttribute("data-page",contador)
        li.appendChild(a)
        a.innerHTML = contador;
        ul.insertBefore(li,ul.querySelector(".anterior"))

        
        a.onclick = e=>{
          //número da página clicada
          let x = e.target.getAttribute("data-page")
          //limpando a tabela
          tbody.innerHTML = ""
          //reduzindo um, para bater com número da índice
          x--

          //defininfo em qual indice começaremos a "cortar" o array de TRs
          let inicio_trecho = limite_por_pagina * x
          //defininfo em qual indice terminaremos de "cortar" o array de TRs
          let final_trecho = inicio_trecho + limite_por_pagina
          //"cortando" o array de TRs para exibir somente este trecho na página clicada
          let pagina = lista_cursos.slice(inicio_trecho,final_trecho)



          //adicionando cada item do trecho no corpo da tabela
          for(let contador=0; contador<pagina.length; contador++){
            let item = pagina[contador]
            // criando as linhas e inserindo dinamicamente cada elemento do json
            var row = document.createElement("tr")
            row.className = "list-group-item linha" 

            row.id = `tr_${item.id}`

            //Coluna com imagem recebeu também atributo Title, para melhorar acessibilidade.
            row.innerHTML=`<td class="td_logo"><img class="img_logo"
            title="Universidade ${item.universidade}. ${item.curso_nome} - ${item.campus_cidade}. Valor: ${(item.preco_cheio).toLocaleString('pt-BR', formatacao_monetaria)}" 
            src="${item.universidade_logo}"/></td>`

            row.innerHTML+=`<td class="td_curso" name="td_curso">${item.curso_nome}</td>`
            row.innerHTML+=`<td class="td_cidade" name="td_cidade">${item.campus_cidade}</td>`
            row.innerHTML+=`<td class="td_preco_cheio">${(item.preco_cheio).toLocaleString('pt-BR', formatacao_monetaria)}</td>`
            row.innerHTML+=`<td class="td_link"><a 
            href="#" class="link_tabela" id="${item.id}" onclick="abrir_modal(${contador})">
            <i class="fas fa-plus-circle"></i>
            </a></td>`

            tbody.appendChild(row)
          }
        }
      }


      
    }

    let z = 0;
    function btn_proximo(){

      if(this.id=="proximo"&&z<=limite_por_pagina){
        z == arraTr.length - limite_por_pagina ? (z=0) : (z+= limite_por_pagina)      
      }
      if(this.id=="anterior"){
        z == 0 ? arraTr.length - limite_por_pagina : (z -= limite_por_pagina)
      } 

      tbody.innerHTML = "";
      for(let contador=z; contador<z+limite_por_pagina; contador++){
        tbody.appendChild(arraTr[contador])
      }
    }

    document.getElementById("anterior").onclick = btn_proximo
    document.getElementById("proximo").onclick = btn_proximo

  }
  
  
  




