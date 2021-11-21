const express = require('express')
const app = express()
const server = require("http").createServer(app);
const path = require("path")

//Configurando porta no servidor Heroku, ou em local host
const porta = process.env.PORT || 3000 

app.use(express.static(path.join(__dirname,"public")))
app.set('views',path.join(__dirname,"public"))
app.engine("html",require("ejs").renderFile)
app.set("view engine","html")

app.use("/",(req,res)=> res.render("index.html"))

server.listen(porta, ()=>console.log(`Server conectado!`))