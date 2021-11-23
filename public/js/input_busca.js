//buscando por Cidade e Curso

let input_busca = document.getElementById("input_busca")
input_busca.value = ""

input_busca.addEventListener("input",()=>{
    
    //Representa cada linha na tabela renderizada na página
    let linha_tabela = document.querySelectorAll(".linha")

    //para cada inserção no input, uma busca será feita
    if(input_busca.value.length>0){
        for(let i=0; i<linha_tabela.length; i++){
            let linha = linha_tabela[i]

            let consulta_cidade = document.querySelector(".td_cidade")
            let cidade_confirma = true

            let consulta_curso = document.querySelector(".td_curso")
            let curso_confirma = true

            //Utilizando Expressão Regular para testar o valor do input
            let expressao = new RegExp(input_busca.value,"i")
            
            console.log(consulta_curso.textContent)
            //consultando por Cidades
            if(!expressao.test(consulta_cidade.textContent)){
                cidade_confirma = false 
            } else {
                cidade_confirma = true  
            }

            //Consultando por Cursos
            if(!expressao.test(consulta_curso.textContent)){
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