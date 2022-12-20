var express = require('express');
var router = express.Router();
const studentModel = require('../../models/student');
const  autorizacion=require("../middlewares");
const {
  checkToken,
  accesoTeachers,
  accesoAdministrator,
  accesoStudents,
  accesoTeachersORAdministrator
} = autorizacion;

const { 
  getStudentByIdUser,//usada en users.js //DENTRO DE OTROS TESTEOS MAYORES
  getAll_Students,//usada en students.js //GET http://localhost:3333/api/students //TESTEAR
  insert_Students,//usada en users.js //DENTRO DE OTROS TESTEOS MAYORES
  update_Students,//usada en users.js //DENTRO DE OTROS TESTEOS MAYORES
  setdeleted_Student_ById,//usada en students.js // DELETE http://localhost:3333/api/students/23 //TESTEAR
  getDataStudentAndUser,//usada en students.js  // GET http://localhost:3333/api/students/23 //TESTEAR
  updateDataStudentAndUser//usada en students.js // PUT http://localhost:3333/api/students/23 //TESTEAR
} = studentModel;

/* GET home page. */

// GET http://localhost:3333/api/students
 router.get('/', checkToken, accesoStudents, async function(req, res, next) {
  try {
    console.log('###################### DENTRO DE LA FUNCION GET  http://localhost:3333/api/students #############################################');
     const row =  await getAll_Students();
   //   console.log(' resultado de ...........getAll_Students: ');
   //   console.log(row);
     res.status(200).send(row);
    } catch (err) {res.status(500).send({ error: err.message });}
 });



// GET http://localhost:3333/api/students/23
router.get('/:studentId', checkToken, accesoStudents, async function(req, res, next) {
  //  console.log(' EL USUARIO LOGEADO EN TODA LA APP (EN MIDDLEWARE DE CHECKTOKEN):',req.user);
  try {
    console.log('###################### DENTRO DE LA FUNCION  GET http://localhost:3333/api/students/23 #############################################');
    console.log(' El parametro es: ',req.params.studentId);
    const row = await getDataStudentAndUser(req.params.studentId);
   // console.log(row);
    res.status(200).send(row);
  } catch (err) {res.status(500).send({ error: err.message });}
  });

// POST http://localhost:3333/api/students
// router.post('/', async function(req, res, next) {

//   res.status(200).send('--- ENVIAR EL RESULTADO DE LA OPERACIÓN DE POST DE STUDENTS ------',);
// });

// PUT http://localhost:3333/api/students/2
router.put('/:studentId' ,checkToken, accesoStudents, async function(req, res, next) {
  console.log('###################### DENTRO DE LA FUNCION  PUT http://localhost:3333/api/students/23 #############################################');
  const updateStudent=req.body
  console.log(' -----api/students/2---a modificar---------',req.body);
  // req.body.teacher con los campos: {teach_name,teach_zip,teach_price_an_hour,teach_description,teach_experience_years,teach_address,teach_phone,teach_validated,teach_id_user,teach_id_subject}
    try {
      const  result = await updateDataStudentAndUser(updateStudent);
      console.log('----------------- dDESPUES dE updateDataStudentAndUser (2 promesas juntas)--------',result);
      res.status(200).send(result);
    } catch (err) {res.status(500).send({ error: err.message });}
    // res.send('--- ENVIAR EL RESULTADO DE LA OPERACIÓN DE PUT DE STUDENTS ------',);
    });


// DELETE http://localhost:3333/api/students/23
router.delete('/:studentId',checkToken, accesoStudents, async function(req, res, next) {
  // COMO UN PUT DEL CAMPO DELETE
    console.log('###################### DENTRO DE LA FUNCION  DELETE http://localhost:3333/api/students/23 #############################################');
    console.log(' -----DELETE api/students/2---id del students: ---------',req.params.studentId);
      try {
        const  [result] = await setdeleted_Student_ById(req.params.studentId);
        console.log('----------------- dDESPUES dE setdeleted_Student_ById-----result---');
        console.log(result);
        res.status(200).send(result);
      } catch (err) {res.status(500).send({ error: err.message });}
      // res.send('--- ENVIAR EL RESULTADO DE LA OPERACIÓN DE PUT DE admin ------',);
      }); 


module.exports = router;

