<img id="licenca" src="https://img.shields.io/badge/Licen%C3%A7a-MIT-green"/>
<h1 align="center">Cota Cursos</h1>
 <h6 align="center" id="status"> 
  Status do projeto: Concluído ✅
</h6>
<p align="center">👉 <a href="https://cota-cursos.herokuapp.com">cota-cursos.herokuapp.com </a>💻</p>
<h4 align="center">🔗 Consumo de APIs externas, utilizando Node.Js, Javascript Vanilla, SCSS e Bootstrap.</h4>

<p align="center">
  <a href="#features">Funcionalidades</a> • 
 <a href="#sobre">Detalhes da aplicação</a> •
  <a href="#install">Instalando</a> • 
  <a href="#erros">Erros</a> • 
  <a href="#API_teste">API de teste</a> •
 <a href="#tecnologias">Tecnologias</a> • 
 <a href="#autor">Autor</a>
</p>

<hr>

<h3 id="features">⚙️ Funcionalidades</h3>

- [x] Busca por: Cursos, Cidade e Preço.
- [x] Ordenar por: score, graduação, maior ou menor valor e alfabeticamente.
- [x] Visualizar detalhes no modal.
- [X] Rotas para troca de API.

<h3 id="sobre">🔖 Detalhes da aplicação</h3>

O **Cota Cusos** apresenta informações de cursos contidas na **API** *https://testapi.io/api/Jonas-buriti/scholarships*, inseridas dinamicamente através de manipulação de DOM.

A aplicação se encontra hospedada na Heroku e pode ser acessada em *https://cota-cursos.herokuapp.com*.

A informações foram paginadas, com **JavaScript**, exibindo 10 cursos por vez. Ainda com o JavaScript Vanilla, foram feitas as regras de validação nos inputs de busca, apresentações de erros, assim como máscara de número e troca da ordem dos cursos.

Para agilizar o desenvolvimento, **Bootstrap** foi um recurso utilizado para configurações de responsividade e posicionamento dos elementos da página. As folhas de estilo garanharam organização e legibilidade com o pré-processamento do **Sass**.

<img width="400" src="https://raw.githubusercontent.com/GugaAraujo/Cota-Cursos/main/public/assets/cota-cursos_desktop.jpg" alt="Testando responsividade com o app Responsively"/>
<h3 id="install">🗂 Instalando</h3>

    # Clonar o repositório
    $ git clone https://github.com/GugaAraujo/Cota-Cursos

    # Entrar no diretório
    $ cd Cota-Cursos

    # Instalar as dependências
    $ npm init

    # Iniciar o projeto
    $ node app
    
<h4 id="erros">🚫 Tratando Erros</h4>

<img width="400" src="https://raw.githubusercontent.com/GugaAraujo/Cota-Cursos/main/public/assets/erro_api.jpg" alt="Testando erro em leitura de API"/>

É importante lembrar que na API original constam alguns links publicados em protocolo HTTP, passíveis de bloqueios por parte dos navegadores. Há um título que descreve a logo da universidade, auxiliando a quem possa ter dificuldades de enxergar, que podem ser exibidos nos casos de bloqueio da imagem.

Se ao acaso a API não estiver disponível, uma mensagem de erro surgirá por alguns instantes ao usuário, indicando a falha.
Também há avisos indicando quando os inputs de busca não podem receber um caracter contra indicado para a busca em questão.

<img width="160" src="https://raw.githubusercontent.com/GugaAraujo/Cota-Cursos/main/public/assets/cota-cursos.gif" alt="Testando erros em dispositivo mobile"/>


<h4 id="API_teste"> Teste de API</h4>
Para minizar falhas, foi desenvolvida uma API de teste, com maior quantidade de informações. Esta API pode ser consumida através da rota <a href="https://cota-cursos.herokuapp.com/api/teste"><i>https://cota-cursos.herokuapp.com/api/teste</i></a>.

É possível voltar a consumir a API anterior pela rota <a href="https://cota-cursos.herokuapp.com/api/padrao"><i>https://cota-cursos.herokuapp.com/api/padrao</i></a>.

Caso haja alguma nova API hospedada na <a href="https://testapi.io">*testapi.io*</a> com objetos de propriedades semelhantes, pode-se consumir a nova API informando o Usuário e o Nome da API pela url da seguinte maneira:

    # https://cota-cursos.herokuapp.com/api/USUARIO/NOME_DA_API
    Por exemplo: https://cota-cursos.herokuapp.com/api/Jonas-buriti/scholarships
    
Ao informar Usuário e Nome da API, os parâmetros serão reorganizados em um novo link que será enviado pela rota "/api/" para consumo no front-end.

<img width="760" src="https://raw.githubusercontent.com/GugaAraujo/Cota-Cursos/main/public/assets/custom_api.jpg" alt="API customizada"/>


<h3 id="tecnologias"> Tecnologias</h3>

- [Heroku](https://www.heroku.com/about)
- [Node.js](https://nodejs.org/en/)
- [Bootstrap](https://getbootstrap.com/)
- [SCSS-SASS](https://sass-lang.com/)
- [Express](https://expressjs.com/pt-br/)
- [JavaScript](https://www.javascript.com/)


<h3 id="autor">Autor</h3>
<table>
  <tr>
    <td align="center"><a href="https://www.guga-araujo.dev.br/"><img style="border-radius: 50%;" src="https://www.guga-araujo.dev.br/img/perfil.jpg" width="100px;" alt="Gustavo Araújo - www.guga-araujo.dev.br"/><br /><sub><b>Gustavo Araújo</b></sub></a><br /><p>Desenvolvedor Fullstack 💻</p></td>
    <td align="center"><p> Desenvolvedor Node.Js, Python e JavaScript, trabalhando com as tecnologias:
Flask, HTML5, CSS3 e SASS, com noções de UX/UI.

Cursando Análise e Desenvolvimento de Sistemas na Estácio.

https://www.guga-araujo.dev.br/
</td>
   </tr>
</table>
