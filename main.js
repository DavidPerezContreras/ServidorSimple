//Para ejecutar este archivo, en Windows o Linux escribimos en la terminal:
//  #  node main.js
//Hay que asegurarse de que el directorio actual es la carpeta del proyecto, porque intentará buscar las 
//dependencias en la subcarpeta node_modules junto con otra información porque hace uso de rutas relativas.
//Nos saltarían errorres MODULE_NOT_FOUND cuando utilizamos dependencias.

//Otro error muy común es que intentemos iniciar el servidor a través de un puerto ya en uso,
//Ya sea por otra instancia de node o por cualquier otro proceso.



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
//const { get } = require('express/lib/response') Esto no sé que es hice copia pega
const mysql = require('mysql')  //Importa el conector con mysql







const app = express()
const port = 3000 //Puerto a través del cual tenemos que realizar las consultas HTTP

app.get('/', (req, res) => {
  res.send('Hello World!')
})


//Necesitamos pasarle el id en la url:
//Ejemplo   misitio.com:3000/userdata?id=1

//Desde el servidor accedemos al parámetro que hemos recibido en la URL con req.query.NOMBREDELPARAMETRO
//Son diferentes a los parámetros recibidos en el BODY (Cuerpo de la petición, los cuales vienen cifrados,
//es donde debemos mandar las contraseñas y demás)
app.get('/userdata', (req, res) => {
  console.log("Endpoint called: userdata    id="+req.query.id);

  res.send({id:req.query.id,usuario:"David",color:"FF0000"})
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})








//Crea una conexion a la base de datos y la devuelve
function getConnection(){
  return con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "faltas"
  });
}
//En la base de datos "faltas" ahora mismo sólo hay una tabla, llamada "usuarios" con:
  //id int NOT NULL AUTO_INCREMENT PRIMARY KEY
  //username varchar(20)

//Muestra el primer usuario de la base de datos
//(En esa consulta es el que tiene id 1) (Posicion 0 del array)
//id es un campo    int NOT NULL AUTO_INCREMENT PRIMARY KEY  
// por lo que cuando creamos uno,
//El id cogerá un valor automáticemente. Empezando por el 1, el segundo tendrá id 2, etc.

//Como necesitamos pasarle un número y no texto,
///En este caso es suficiente con hacer if(!isNaN(id))
//Que devolverá true encaso de que sea un número

//En cualquier caso siempre que necesitamos dar parámetros desde
//Javascript en sentencias SQL deberíamos hacer consultas preparadas

function getUserById(id){
  let con=getConnection()
  if(!isNaN(id)){
    con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT * FROM usuarios WHERE id="+id, function (err, result, fields) {
        if (err) throw err;
        console.log(result[0].username);
      });
    });
  }
}
//Hace un console.log del usuario con id 2
getUserById(2)


//Devuelve lo mismo que getUserById(id)  sólo que esta vez
//mediante el uso de consultas preparadas
function preparedStatementGetUserById(id){
  let con=getConnection()

  if(!isNaN(id)){
    con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT * FROM usuarios WHERE id = ?",[1], function (err, result, fields) {
        if (err) throw err;
        console.log(result[0].username);
      });
    });
  }
}

//Hace un console.log del usuario con id 2
preparedStatementGetUserById(2)