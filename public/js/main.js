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

//receberá do servidor qual a API a ser consumida
let link_api = ""


verifica_link_api()
//Consultando qual API será consumida
function verifica_link_api(){
  fetch(`https://cota-cursos.herokuapp.com/api/`)
    //Aguardando Resultado
    .then(resultado => resultado.text())
    .then(resultado => recebe_link(resultado))
    .catch((error)=> {
      console.log(error)
      exibe_erro("Não foi possível consultar a API. Tente novamente em algumas horas.","erro_alerta")
    })

    let recebe_link = (resultado) =>{
      link_api = resultado
      // Consumindo API indicada pelo servidor
      consome_api(link_api)
    }

}


// Consumindo API indicada pelo servidor
function consome_api(link_api){
    fetch(link_api)
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
  lista_cursos.map((elemento)=>{

    modal.style.display ="block"

    //localizando informações do curso, através do ID que ele recebeu.
    if(elemento.id==id_curso){

    conteudo_modal.innerHTML = 
    `<div class="row w-100 h-100 coluna_principal">
        <div class="col-6 d-flex align-items-center coluna_secundaria">
          <img class="modal__logo img-fluid" 
          title="Universidade ${elemento.universidade}"
           src="${elemento.universidade_logo}" />
        </div>
        <div class="col-6 coluna_secundaria">
          <span class="titulo">${elemento.curso_titulo}</span> - <span class="subtitulo">${elemento.curso_subtitulo}</span>
          <div class="row mt-4">
            <div class="col-6">
              <p>${elemento.universidade}</p>
              <p>${elemento.campus_bairro}</p>
            </div>
            <div class="col-6">
              <p>${elemento.universidade_score}</p>
              <p>${elemento.campus_cidade}</p>
            </div>
            <div class="row">
              <div class="col-12 ms-3">
                <p class="preco">${(elemento.preco_cheio.toLocaleString('pt-BR', formatacao_monetaria))}</p>
              </div>
            </div>
          </div>        
        </div>
    </div>`


  }
  })



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
  renderiza_tabela()

   btn_gerador(limite_por_pagina)
}

//criando elementos da tabela
function renderiza_tabela(){
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
    row.innerHTML=`<td class="td_logo"><img class="img_logo img-fluid"
    title="Universidade ${lista_cursos[contador].universidade}"
    src="${lista_cursos[contador].universidade_logo}"/></td>`

    row.innerHTML+=`<td class="td_curso" name="td_curso">${lista_cursos[contador].curso_nome}</td>`
    row.innerHTML+=`<td class="td_cidade" name="td_cidade">${lista_cursos[contador].campus_cidade}</td>`
    row.innerHTML+=`<td class="td_preco_cheio">${(lista_cursos[contador].preco_cheio).toLocaleString('pt-BR', formatacao_monetaria)}</td>`
    row.innerHTML+=`<td class="td_link"><a 
    href="#" class="link_tabela" id="${lista_cursos[contador].id}" onclick="abrir_modal(${lista_cursos[contador].id})">
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


//gerando os botões de paginação
  function btn_gerador(limite_por_pagina)
  {
    //limpando o quantidade de botões, deixando somente o "Próximo" e "Anterior"
    ul.innerHTML=
    `<li class="proximo d-inline-flex"> 
    <a href="#" id="anterior">&#139;</a>
  </li>
  <li class="anterior d-inline-flex">
    <a href="#" id="proximo">&#155;</a>
  </li>`

    //corpor da tabela
    let tbody = document.getElementsByClassName("list-group")[0]

    //totald de itens da array
    const numero_Tr = lista_cursos.length
    
    if(numero_Tr <= limite_por_pagina){
      ul.style.display = "none"
    }
    else{
      ul.style.display = "flex"
      //obtendo o numero de paginas
      const numero_de_paginas = Math.ceil(numero_Tr/limite_por_pagina)

      //criando os links de cada pagina dinamicamente
      for(let contador=1; contador<=numero_de_paginas;contador++){
      
        let li = document.createElement("li")
        li.className = "lista_pagina d-inline-flex"
        let a = document.createElement("a")
        a.href = "#"
        a.setAttribute("data-page",contador)
        li.appendChild(a)
        a.innerHTML = contador;
        ul.insertBefore(li,ul.querySelector(".anterior"))

        //renderizando os dados a partir do click de cada link
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
            row.innerHTML=`<td class="td_logo"><img class="img_logo img-fluid"
            title="Universidade ${item.universidade}" 
            src="${item.universidade_logo}"/></td>`

            row.innerHTML+=`<td class="td_curso" name="td_curso">${item.curso_nome}</td>`
            row.innerHTML+=`<td class="td_cidade" name="td_cidade">${item.campus_cidade}</td>`
            row.innerHTML+=`<td class="td_preco_cheio">${(item.preco_cheio).toLocaleString('pt-BR', formatacao_monetaria)}</td>`
            row.innerHTML+=`<td class="td_link"><a 
            href="#" class="link_tabela" id="${item.id}" onclick="abrir_modal(${item.id})">
            <i class="fas fa-plus-circle"></i>
            </a></td>`

            tbody.appendChild(row)
          }
        }
      }


      
    }

    let z = 0;
    //definindo o avanço dos botões de avançar ou retornar pagina
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

    //atribuindo a função ao click
    document.getElementById("anterior").onclick = btn_proximo
    document.getElementById("proximo").onclick = btn_proximo

  }
  
  
  




