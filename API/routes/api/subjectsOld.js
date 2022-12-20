const express = require('express');
const router = express.Router();
const subjectModel = require('../../models/subject');
const { 
  getAll_Subjects,
  getSubjectById,
  insert_Subject,
  update_Subject,
  delete_Subject
} = subjectModel;

const  autorizacion=require("../middlewares");
const {
  checkToken,
  accesoTeachers,
  accesoAdministrator,
  accesoStudents,
  accesoTeachersORAdministrator
} = autorizacion;


// login como administrador para accede a todas las rutas

  /************* LOGIN REAL DE ADMIN Y USER   */

  // El ultimo alta de usuario:
  //nuevoAdmin.user_email
  //nuevoAdmin.user_password
  // Registrar un nuevo usuario
  // POST http://localhost:3333/api/subjects
  router.post('/',checkToken, async (req, res) => {
    try {
      console.log('---- DENTRO DE /API/subjects/ ----req.body---');
      console.log(req.body);
      console.log('---- DENTRO DE /API/SUBJECT Y ANTES DE LLAMAR A insert SUBJECT');
      const [result] = await insert_Subject(req.body);
      console.log('---- RETORNO de insert SUBJECT:', result);
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
    });

/* GET http://localhost:3333/api/subjects */
router.get('/', async (req, res) => {
  try {
   console.log('---- DENTRO de GET DE SUBJECTS - ------');
   const [rows] = await getAll_Subjects()
   res.status(200).send(rows);
 } catch (err) {
   res.status(500).send({ error: err.message });
 }
});

/* GET http://localhost:3333/api/subjects/:subjectId */
router.get('/:subjectId', async (req, res, next) =>{
 try {
   console.log('---- DENTRO de GET DE SUBJECTS  -------');
   console.log('-------- el parametro de GET SUBJECT es:------');
   console.log(req.params.subjectId);
   const [rows] = await getSubjectById(req.params.subjectId)
   res.status(200).send(rows);
 } catch (err) {
   res.status(500).send({ error: err.message });
 }
});


/* PUT http://localhost:3333/api/subjects/:subjectId */
router.put('/:subjectId',checkToken, async (req, res, next) =>{
try {
  console.log('---- DENTRO de PUT DE SUBJECT -------');
  console.log('-------- el parametro de PUT SUBJECT es:------');
  console.log(req.params.subjectId);
  console.log('-------- el BODY de PUT SUBJECT es:------');
  console.log(req.body);
  const [rows] = await update_Subject(req.params.subjectId,req.body)
  res.status(200).send(rows);
} catch (err) {
  res.status(500).send({ error: err.message });
}
});

/* DELETE http://localhost:3333/api/subjects/:subjectId */
router.delete('/:subjectId',checkToken,async (req, res) => {
try {
  console.log('---- DENTRO de DELETE DE SUBJECTS -------');
  console.log('-------- el parametro de DELETE SUBJECTS es:------');
  console.log(req.params.subjectId);
  const [rows] = await delete_Subject(req.params.subjectId)
  res.status(200).send(rows);
} catch (err) {
  res.status(500).send({ error: err.message });
}
});

  module.exports = router;
