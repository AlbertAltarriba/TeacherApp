const express = require('express');
const router = express.Router();
const teacherModel = require('../../models/teacher');
const { 
  getDataTeacherAndUser,
  updateDataTeacherAndUser,
  getAll_Teachers,
  setdeleted_Teacher_ById
} = teacherModel;
const  autorizacion=require("../middlewares");
const {
  checkToken,
  accesoTeachers,
  accesoAdministrator,
  accesoStudents,
  accesoTeachersORAdministrator
} = autorizacion;

// GET http://localhost:3333/api/teachers
router.get('/', checkToken, accesoTeachers, async function(req, res, next) {
  //console.log(' EL USUARIO LOGEADO EN TODA LA APP (EN MIDDLEWARE DE CHECKTOKEN):',req.user);
  try {
    console.log('###################### DENTRO DE LA FUNCION GET  http://localhost:3333/api/teachers #############################################');
     const row =  await getAll_Teachers();
   //   console.log(' resultado de ...........getAll_Teachers: ');
   //   console.log(row);
     res.status(200).send(row);
    } catch (err) {res.status(500).send({ error: err.message });}
 });


// GET http://localhost:3333/api/teachers/23
router.get('/:teacherId', checkToken, accesoTeachers, async function(req, res, next) {
// //  console.log(' EL USUARIO LOGEADO EN TODA LA APP (EN MIDDLEWARE DE CHECKTOKEN):',req.user);
//   console.log(' En GET http://localhost:3333/api/teachers/23): el parametro es: ',req.params.teacherId);

//   const row = await getDataTeacherAndUser(req.params.teacherId);
//   console.log(' -----api/teachers/1 getDataTeacherAndUser------------',row[0][0]);
//   res.status(200).send(row[0][0]);
//   //res.send('--- ENVIAR EL RESULTADO DE LA OPERACIÓN DE GET DE TEACHERS ------',);
// });


 //  console.log(' EL USUARIO LOGEADO EN TODA LA APP (EN MIDDLEWARE DE CHECKTOKEN):',req.user);
 try {
    console.log('###################### DENTRO DE LA FUNCION  GET http://localhost:3333/api/teachers/23 #############################################');
    console.log(' En GET http://localhost:3333/api/teachers/23): el parametro es: ',req.params.teacherId);
    const row = await getDataTeacherAndUser(req.params.teacherId);
  // console.log(row);
    res.status(200).send(row);
  } catch (err) {res.status(500).send({ error: err.message });}
});





// // POST http://localhost:3333/api/teachers
// router.post('/', checkToken, accesoTeachersORAdministrator, async function(req, res, next) {
//   res.status(200).send('--- ENVIAR EL RESULTADO DE LA OPERACIÓN DE POST DE TEACHERS ------',);
// });

// PUT http://localhost:3333/api/teachers/2
router.put('/:teacherId', checkToken, accesoTeachers, async function(req, res, next) {
  const updateTeacher=req.body
  console.log(' -----api/teachers/2---a modificar---------',req.body);
  // req.body.teacher con los campos: {teach_name,teach_zip,teach_price_an_hour,teach_description,teach_experience_years,teach_address,teach_phone,teach_validated,teach_id_user,teach_id_subject}
    try {
      const  result = await updateDataTeacherAndUser(updateTeacher);
      console.log('----------------- dDESPUES dE updateDataTeacherAndUser (2 promesas juntas)--------',result);
      // OPCION 1 ->ahora hace una lectura y devuelve el registro modificado
     // console.log(' -----api/teachers/2-- ANTES DE getDataTeacherAndUser----TEACHER ID ES -----',req.params.teacherId);
      //  const row = await getDataTeacherAndUser(req.params.teacherId);
       // res.status(200).send(row[0][0]);
      // OPCION 2 -> 
      res.status(200).send(result);
    } catch (err) {res.status(500).send({ error: err.message });}
    // res.send('--- ENVIAR EL RESULTADO DE LA OPERACIÓN DE PUT DE TEACHERS ------',);
    });

// // DELETE http://localhost:3333/api/teachers/23
// router.delete('/:teacherId', checkToken, accesoTeachersORAdministrator, async function(req, res, next) {
//   res.status(200).end('--- ENVIAR EL RESULTADO DE LA OPERACIÓN DE DELETE DE TEACHERS ------',);
// });


// DELETE http://localhost:3333/api/teachers/23
router.delete('/:teacherId',checkToken, accesoTeachers, async function(req, res, next) {
  // COMO UN PUT DEL CAMPO DELETE
    console.log('###################### DENTRO DE LA FUNCION  DELETE http://localhost:3333/api/teachers/23 #############################################');
    console.log(' -----DELETE api/students/2---id del students: ---------',req.params.teacherId);
      try {
        const  [result] = await setdeleted_Teacher_ById(req.params.teacherId);
        console.log('----------------- dDESPUES dE setdeleted_Teacher_ById-----result---');
        console.log(result);
        res.status(200).send(result);
      } catch (err) {res.status(500).send({ error: err.message });}
      // res.send('--- ENVIAR EL RESULTADO DE LA OPERACIÓN DE PUT DE admin ------',);
      }); 


module.exports = router;



