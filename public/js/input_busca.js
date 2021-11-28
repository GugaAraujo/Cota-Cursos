//buscando por Cidade e Curso
let input_busca_cidades_e_cursos = document.getElementById("input_busca_cidades_e_cursos")
input_busca_cidades_e_cursos.value = ""

//buscando por Preços
let input_busca_preco = document.getElementById("input_busca_preco")
input_busca_preco.value = ""


//Evento para "escutar" input de Cidades e Cursos
input_busca_cidades_e_cursos.addEventListener("input",()=>{

    let tbody = document.getElementsByTagName("tbody")[0]
    

    //para cada inserção no input, uma busca será feita
    if(input_busca_cidades_e_cursos.value.length>0){
        //zerando a tabela a cada busca
        tbody.innerHTML=""

        // Validando input para que somente letras sejam aceitas
        validando_input_cidadades_e_cursos()


        for(let i=0; i<lista_cursos.length; i++){
        

             //cada única linha da tabela
            let linha = lista_cursos[i]

            //Removendo acentuações para comparar o valor do input com o valor em tabela
            let consulta_cidade = (linha.campus_cidade).normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            let cidade_confirma = true

            let consulta_curso = (linha.curso_nome).normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            let curso_confirma = true

            let busca_cidades_e_cursos = (input_busca_cidades_e_cursos.value).normalize("NFD").replace(/[\u0300-\u036f]/g, "")

            //Utilizando Expressão Regular para testar o valor do input
            let expressao = new RegExp(busca_cidades_e_cursos,"i")
            
            //consultando por Cidades
            if(!expressao.test(consulta_cidade)){
                cidade_confirma = false 
            } else {
                cidade_confirma = true  
            }

            //Consultando por Cursos
            if(!expressao.test(consulta_curso)){
                curso_confirma = false 
            } else {
                curso_confirma = true  
            }

            //Se houver o valor inserido no input dentro da linha na tabela, ela se manterá visível...
            if(cidade_confirma||curso_confirma){
                if(linha!=undefined){
                    // criando as linhas e inserindo dinamicamente cada elemento do json
                    var row = document.createElement("tr")
                    row.className = "list-group-item linha" 
                    row.id = `tr_${linha.id}`

                    //Coluna com imagem recebeu também atributo Title, para melhorar acessibilidade.
                    row.innerHTML=`<td class="td_logo"><img class="img_logo"
                    title="Universidade ${linha.universidade}" 
                    src="${linha.universidade_logo}"/></td>`

                    row.innerHTML+=`<td class="td_curso" name="td_curso">${linha.curso_nome}</td>`
                    row.innerHTML+=`<td class="td_cidade" name="td_cidade">${linha.campus_cidade}</td>`
                    row.innerHTML+=`<td class="td_preco_cheio">${(linha.preco_cheio).toLocaleString('pt-BR', formatacao_monetaria)}</td>`
                    row.innerHTML+=`<td class="td_link"><a 
                    href="#" class="link_tabela" id="${linha.id}" onclick="abrir_modal(${linha.id})">
                    <i class="fas fa-plus-circle"></i>
                    </a></td>`

                    // add as linhas em tbody
                    tbody.appendChild(row)  
                }
            }

        }
    }
    else{
        //ao zerar o imput, limpamos a tabela e renderizamos em ordem alfabética
        tbody.innerHTML=""
        ordena_cursos("alfabetica")
    }
})

//Evento para "escutar" input de Preços
input_busca_preco.addEventListener("input",()=>{

    let tbody = document.getElementsByTagName("tbody")[0]


    if(input_busca_preco.value.length>0){
        //zerando a tabela a cada busca
        tbody.innerHTML=""

        // Validando input para que somente números sejam aceitos
        validando_input_precos()
        
        //para cada inserção no input, uma busca será feita
        for(let i=0; i<lista_cursos.length; i++){
            
            //cada única linha da tabela
            let linha = lista_cursos[i]

            //removendo qualquer caracter que não seja um número, para comparar
            //o valor do input com o valor na tabela
            let consulta_preco = (linha.preco_cheio).toFixed(2).replace(/[^0-9]+/g, '')
            let busca_preco = input_busca_preco.value.replace(/[^0-9]+/g, '')

   
            let preco_confirma = true

            //Utilizando Expressão Regular para testar o valor do input
            let expressao = new RegExp(busca_preco,"i")
            
            //consultando por Cidades
            if(!expressao.test(consulta_preco)){
                preco_confirma = false 
            } else {
                preco_confirma = true  
            }

            //Se houver o valor inserido no input dentro da linha na tabela, ela se manterá visível...
            if(preco_confirma){
                if(linha!=undefined){
                    // criando as linhas e inserindo dinamicamente cada elemento do json
                    var row = document.createElement("tr")
                    row.className = "list-group-item linha" 
                    row.id = `tr_${linha.id}`

                    //Coluna com imagem recebeu também atributo Title, para melhorar acessibilidade.
                    row.innerHTML=`<td class="td_logo"><img class="img_logo"
                    title="Universidade ${linha.universidade}" 
                    src="${linha.universidade_logo}"/></td>`

                    row.innerHTML+=`<td class="td_curso" name="td_curso">${linha.curso_nome}</td>`
                    row.innerHTML+=`<td class="td_cidade" name="td_cidade">${linha.campus_cidade}</td>`
                    row.innerHTML+=`<td class="td_preco_cheio">${(linha.preco_cheio).toLocaleString('pt-BR', formatacao_monetaria)}</td>`
                    row.innerHTML+=`<td class="td_link"><a 
                    href="#" class="link_tabela" id="${linha.id}" onclick="abrir_modal(${linha.id})">
                    <i class="fas fa-plus-circle"></i>
                    </a></td>`

                    // add as linhas em tbody
                    tbody.appendChild(row)  
                }
            }
        }
    }
    //Se input for zerado novamento, tudo volta a ser exibido.
    else{
        //ao zerar o imput, limpamos a tabela e renderizamos em ordem alfabética
        tbody.innerHTML=""
        ordena_cursos("alfabetica")
    }

    //Utilizando JQuery para inserir máscara monetária
    $('#input_busca_preco').mask('000.000.000,00', {reverse: true});
        
})

// Validando input para que somente letras sejam aceitas
function validando_input_cidadades_e_cursos(){
    let apenas_letras = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/

    if(!apenas_letras.test(input_busca_cidades_e_cursos.value)){
        //apagando o que não atender ao filtro
        input_busca_cidades_e_cursos.value = input_busca_cidades_e_cursos.value.replace(/[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+/, '')
        exibe_erro("Utilize somente letras em sua busca por cidades ou cursos","erro_proibido")
    }else{
      
    }
}  

// Validando input para que somente números sejam aceitos
function validando_input_precos(){
    let apenas_numeros = /[0-9]+$/

    if(!apenas_numeros.test(input_busca_preco.value)){
        //apagando o que não atender ao filtro
        input_busca_preco.value = input_busca_preco.value.replace(/[^0-9]+/, '');
        exibe_erro("Utilize somente números em sua busca por preços","erro_proibido")
    }else{
      
    }
}  