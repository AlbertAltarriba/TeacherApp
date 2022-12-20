var express = require('express');
const app=require('../../app');
var router = express.Router();
const adminModel = require('../../models/admin');
const  autorizacion=require("../middlewares");
const {
  checkToken,
  accesoTeachers,
  accesoAdministrator,
  accesoStudents,
  accesoTeachersORAdministrator
} = autorizacion;

const { 
    getAdminByIdUser, //usada en users.js //DENTRO DE OTROS TESTEOS MAYORES
    getAll_Admins, //usada en admin.js //GET http://localhost:3333/api/admin //TESTED
    insert_Admins, //usada en users.js //DENTRO DE OTROS TESTEOS MAYORES
    update_Admins, //usada en users.js //DENTRO DE OTROS TESTEOS MAYORES
    setdeleted_admin_ById,//usada en admin.js // DELETE http://localhost:3333/api/admin/23 //TESTED
    getDataAdminAndUser, //usada en admin.js  // GET http://localhost:3333/api/admin/23 //TESTED
    updateDataAdminAndUser//usada en admin.js // PUT http://localhost:3333/api/admin/23 //TESTED

} = adminModel;

// GET http://localhost:3333/api/admin
// autorizacion: token valido y administrador
router.get('/', checkToken, accesoAdministrator, async function(req, res, next) {
  try {
    console.log('###################### DENTRO DE LA FUNCION  http://localhost:3333/api/admin #############################################');
    const row =  await getAll_Admins();
    //  console.log(' resultado de ...........getAll_Admins: ',row);
    res.status(200).send(row);
  } catch (err) {res.status(500).send({ error: err.message });}
  }); 

// GET http://localhost:3333/api/admin/23
router.get('/:adminId', checkToken, accesoAdministrator, async function(req, res, next) {
  //  console.log(' EL USUARIO LOGEADO EN TODA LA APP (EN MIDDLEWARE DE CHECKTOKEN):',req.user);
  try {
    console.log('###################### DENTRO DE LA FUNCION  GET http://localhost:3333/api/admin/23 #############################################');
    console.log(' El parametro es: ',req.params.adminId);
    const [row] = await getDataAdminAndUser(req.params.adminId);
    console.log('----------------- dDESPUES dE getDataAdminAndUser--------');
    console.log(row);
    res.status(200).send(row);
  } catch (err) {res.status(500).send({ error: err.message });}
  // res.send('--- ENVIAR EL RESULTADO DE LA OPERACIÓN DE PUT DE admin ------',);
  }); 


// POST http://localhost:3333/api/admin---> SE REALIZA A TRAVES DE ALTA DE USER INDICANDO 'ADMIN'
// router.post('/', async function(req, res, next) {
//   res.send('--- ENVIAR EL RESULTADO DE LA OPERACIÓN DE POST DE adminS ------',);
// });

// PUT http://localhost:3333/api/admin/23
router.put('/:adminId', checkToken, accesoAdministrator, async function(req, res, next) {
  console.log('###################### DENTRO DE LA FUNCION  PUT http://localhost:3333/api/admin/23 #############################################');
  const updateAdmin=req.body
  console.log(' -----api/admin/2------------',req.body);
    try {
      const  [result] = await updateDataAdminAndUser(updateAdmin);
      console.log('----------------- dDESPUES dE updateDataadminAndUser--------');
      res.status(200).send(result);
    } catch (err) {res.status(500).send({ error: err.message });}
    // res.send('--- ENVIAR EL RESULTADO DE LA OPERACIÓN DE PUT DE admin ------',);
    }); 

// DELETE http://localhost:3333/api/admin/23
router.delete('/:adminId', checkToken, accesoAdministrator, async function(req, res, next) {
// COMO UN PUT DEL CAMPO DELETE
console.log('###################### DENTRO DE LA FUNCION  DELETE http://localhost:3333/api/admin/23 #############################################');
console.log(' -----DELETE api/admin/2---id del admin: ---------',req.params.adminId);
    try {
      const  [result] = await setdeleted_admin_ById(req.params.adminId);
      console.log('----------------- dDESPUES dE setdeleted_admin_ById-----result---');
      console.log(result);


      
      res.status(200).send(result);
    } catch (err) {res.status(500).send({ error: err.message });}
    // res.send('--- ENVIAR EL RESULTADO DE LA OPERACIÓN DE PUT DE admin ------',);
    }); 

module.exports = router;

