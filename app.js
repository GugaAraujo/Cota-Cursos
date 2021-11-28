const express = require('express')
const path = require("path")
const cors = require('cors');

//Configurando porta no servidor Heroku, ou em local host
const porta = process.env.PORT || 3000 

const app = express()
const server = require("http").createServer(app);

app.use(cors())
app.use(express.static(path.join(__dirname,"public")))
app.set('views',path.join(__dirname,"public"))
app.engine("html",require("ejs").renderFile)
app.set("view engine","html")

// Por padrão, esta será a API a ser consumida
let link = "https://testapi.io/api/Jonas-buriti/scholarships"

// API utilizada para os testes de desenvolvimento
app.get("/api/teste",(req,res)=> {
    link = "https://helper-guga.herokuapp.com"
    console.log(link) 
    res.redirect('/index.html')
})

// Caso haja uma API atualizada, nos mesmos padrões, poderá ser informada através da rota abaixo
//Por hora o consumo de novas APIs somente serão aceitas se hospedadas no https:testapi.io
app.get("/api/testapi/:user/:api",(req,res)=> {
    link = `https://testapi.io/api/${req.params.user}/${req.params.api}`
    console.log(link) 
    res.redirect('/index.html')
})

//Ao acessar esta rota, a API a ser consumida volta a ser o padrão
app.get("/api/padrao",(req,res)=> {
    link = "https://testapi.io/api/Jonas-buriti/scholarships"
    console.log(link) 
    res.redirect('/index.html')
})


//Rota utilizada para informar o front qual API deve ser consumida
app.get("/api/",(req,res)=> {
    console.log(link) 
    res.send(link)
})

server.listen(porta, ()=>console.log(`Server conectado!`))

app.use("/",(req,res)=> {
    res.render("index.html")
    //Após a contagem, retomamos a API padrão
    setTimeout(() => {
      link = "https://testapi.io/api/Jonas-buriti/scholarships"
    }, 5000);
})