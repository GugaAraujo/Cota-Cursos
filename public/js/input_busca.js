//buscando por Cidade e Curso
let input_busca_cidades_e_cursos = document.getElementById("input_busca_cidades_e_cursos")
input_busca_cidades_e_cursos.value = ""

//buscando por Preços
let input_busca_preco = document.getElementById("input_busca_preco")
input_busca_preco.value = ""

//Evento para "escutar" input de Cidades e Cursos
input_busca_cidades_e_cursos.addEventListener("input",()=>{

    //Representa cada linha na tabela renderizada na página
    let linha_tabela = document.querySelectorAll(".linha")

    //para cada inserção no input, uma busca será feita
    if(input_busca_cidades_e_cursos.value.length>0){

        // Validando input para que somente letras sejam aceitas
        validando_input_cidadades_e_cursos()


        for(let i=0; i<linha_tabela.length; i++){
            let linha = linha_tabela[i]

            let consulta_cidade = linha.cells.td_cidade.textContent
            let cidade_confirma = true

            let consulta_curso = linha.cells.td_curso.textContent
            let curso_confirma = true

            //Utilizando Expressão Regular para testar o valor do input
            let expressao = new RegExp(input_busca_cidades_e_cursos.value,"i")
            
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
                linha.classList.remove("invisivel")
            }
            //Caso contrário, receberá display:none.
            else{
                linha.classList.add("invisivel")
            }

        }
    }
    else{
        //Se input for zerado novamento, tudo volta a ser exibido.
        for(let i=0; i<linha_tabela.length; i++){
            let linha = linha_tabela[i];
            linha.classList.remove("invisivel")
        }
    }
})

//Evento para "escutar" input de Preços
input_busca_preco.addEventListener("input",()=>{
    if(input_busca_preco.value.length>0){

        // Validando input para que somente números sejam aceitos
        validando_input_precos()
    }
        
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