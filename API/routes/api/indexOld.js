var express = require('express');
var router = express.Router();
require('../../db/dbConfig'); //conexion a mysql
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const { checkToken,accesoTeachers,accesoAdministrator,accesoStudents } = require('../middlewares');
const teacherModel = require('../../models/teacher');
const {getTeacherNearByCPandSubject} = teacherModel;

/*** pueden usarse middleware aqui pero de la forma:
 * router.use() en lugar de app.use()*/

/***** RESPUESTAS DISPONIBLES en RESTAPI ***** 
 res.download(); // Fuerza la descarga de un fichero
 res.end(); // Termina el proceso de la respuesta
 res.send(); // Devuelve una estructura en formato JSON
 res.redirect();// Redirige la petición
 res.render();// A través de un motor de plantillas genera una vista en HTML
 res.send(); // Devuelve una respuesta genérica
*****/

// OK- GET http://localhost:3333/api/  -> Pantalla principal
const funcion= async (req, res, next) => {
  /******** GUARDAR EN COOKIES de los clientes LAS MATERIAS y en una variable local para no buscarla en el fichero cada vez *******/
  const rows = await db.query('select * from subjects');
  //console.log('--- http://localhost:3333/api/ --- rows:',rows[0])
  res.cookie('AppTeachers.Subjects',rows[0]);
  //global.materias=req.cookies.AppTeachers.Subjects;
  // materias.map((el,index)=> console.log('materia: ',el))
  // GET http://localhost:3333/api?materia='LENGUA'&cp='46702'
  console.log('http://localhost:3333/api/ eq.params.cp,req.params.materia:',req.query.cp,req.query.materia);
  try {
    const  [result] = await getTeacherNearByCPandSubject(req.query.cp,req.query.materia);
    res.status(200).send(result);
  } catch (err) {res.status(500).send({ error: err.message });}
    
  //res status array jsons con resultado del Selec
 // res.render('index', { title: 'Express' });
 //res.send({ruta:'/api en el fichero index.js'})
};
router.get('/', funcion);

module.exports = router;
