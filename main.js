//Para ejecutar este archivo, en Windows o Linux escribimos en la terminal:
//  #  node main.js



//es necesario tener node y npm instalado:
//  En windows, el instalador de node nos instala el gestor de paquetes npm por defecto.

//  En ubuntu, debemos instalar node y npm con apt
//  #  apt install nodejs 
//  #  apt install npm
//  (Podemos instalar ambos en la misma instrucción:   #apt install nodejs npm    )




//Utilizamos la dependencia express 
//Si nos da un error al ejecutar el programa es muy probable que no tengamos express instalado.
//Para instalar la dependencia express, ya sea Windows o Linux escribimos en la terminal:
//  #npm i express    (Es una abrebiación de   #npm install express   Utiliza la que más te guste). 


const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/userdata', (req, res) => {
  res.send({usuario:"David",color:"FF0000"})
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
