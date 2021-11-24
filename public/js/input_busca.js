//buscando por Cidade e Curso

let input_busca = document.getElementById("input_busca")
input_busca.value = ""

input_busca.addEventListener("input",()=>{

    //Representa cada linha na tabela renderizada na página
    let linha_tabela = document.querySelectorAll(".linha")

    //para cada inserção no input, uma busca será feita
    if(input_busca.value.length>0){

        // Validando input para que somente letras sejam aceitas
        validando_input()


        for(let i=0; i<linha_tabela.length; i++){
            let linha = linha_tabela[i]

            let consulta_cidade = linha.cells.td_cidade.textContent
            let cidade_confirma = true

            let consulta_curso = linha.cells.td_curso.textContent
            let curso_confirma = true

            //Utilizando Expressão Regular para testar o valor do input
            let expressao = new RegExp(input_busca.value,"i")
            
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



// Validando input para que somente letras sejam aceitas
function validando_input(){
    let apenas_letras = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/

    if(!apenas_letras.test(input_busca.value)){
        //apagando o que não atender ao filtro
        input_busca.value = input_busca.value.replace(/[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+/, '');
        exibe_erro("Utilize somente letras em sua busca","erro_proibido")
    }else{
      
    }
}  