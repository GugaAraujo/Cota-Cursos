
//Receberá as informações da API, com variáveis de melhor leitura
let lista_cursos = []

// Consultando API
fetch(`https://testapi.io/api/Jonas-buriti/scholarships`)
//Aguardando Resultado
.then(resultado => resultado.json())
.then(resultado => recebe_json_API(resultado))

const recebe_json_API = (resultado)=>{
    for (var i=0; i<resultado.length; i++){
        let preco_cheio = resultado[i].full_price
        let preco_desconto = resultado[i].price_with_discount
        let percentual_de_desconto = resultado[i].discount_percentage
        let campus_bairro = resultado[i].campus.name
        let campus_cidade = resultado[i].campus.city
        let curso_nome = resultado[i].course.name
        let curso_titulo = resultado[i].course.kind
        let curso_subtitulo = resultado[i].course.level
        let diponivel = resultado[i].enabled
        let inscricao = resultado[i].enrollment_semester
        let data_inicio = resultado[i].start_date
        let universidade = resultado[i].university.name
        let universidade_score = resultado[i].university.score
        let universidade_logo = resultado[i].university.logo_url

        if(diponivel){
            lista_cursos.push(`{"preco_cheio":"${preco_cheio}","preco_desconto":"${preco_desconto}","percentual_de_desconto":"${percentual_de_desconto}","campus_bairro":"${campus_bairro}","campus_cidade":"${campus_cidade}","curso_nome":"${curso_nome}","curso_titulo":"${curso_titulo}","curso_subtitulo":"${curso_subtitulo}","diponivel":"${diponivel}","inscricao":"${inscricao}","data_inicio":"${data_inicio}","universidade":"${universidade}","universidade_score":"${universidade_score}","universidade_logo":"${universidade_logo}"}`)
        }

    }
    console.log(JSON.parse(`[${lista_cursos}]`))
}