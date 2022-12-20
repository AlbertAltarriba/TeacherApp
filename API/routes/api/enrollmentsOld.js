var express = require('express');
var router = express.Router();
const enrollmentModel = require('../../models/enrollment');
const { getAll_enrolls,
  insert_enrolls,
  update_enrolls,
  getEnrollById,
  setdeleted_enroll_ById,
  getEnrollByStudent,
  getEnrollByTeacher} = enrollmentModel;
const  autorizacion=require("../middlewares");
const {
  checkToken,
  accesoTeachers,
  accesoAdministrator,
  accesoStudents,
  accesoTeachersORAdministrator
} = autorizacion;

/* GET http://localhost:3333/api/enrollments */
router.get('/', checkToken, async (req, res) => {
       try {
        console.log('---- DENTRO de GET DE ENROLLMENTS - ------');
        const [rows] = await getAll_enrolls()
        res.status(200).send(rows);
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
  });

/* POST http://localhost:3333/api/enrollments */
router.post('/', checkToken,async (req, res) => {
  try {
    console.log('---- DENTRO de POST DE ENROLLMENTS - crear ENROLLMENT------');
    console.log('-------- el Body del Post Enrollment es:------');
    console.log(req.body);
    const [rows] = await insert_enrolls(req.body)
    res.status(200).send(rows);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
  });


/* GET http://localhost:3333/api/enrollments/students/:studentId */
router.get('/students/:studentId', checkToken, async (req, res, next) =>{
      try {
        console.log('---- DENTRO de GET DE TEACHERS POR ID DE STUDENT DE ENROLLMENTS -------');
        console.log('-------- el parametro de GET Enrollment es:------');
        console.log(req.params.studentId);
        const [rows] = await getEnrollByStudent(req.params.studentId)
        res.status(200).send(rows);
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
  });


/* GET http://localhost:3333/api/enrollments/teachers/:teacherId */
router.get('/teachers/:teacherId', checkToken, async (req, res, next) =>{
      try {
        console.log('---- DENTRO de GET DE STUDENTS POR ID DE TEACHER DE ENROLLMENTS -------');
        console.log('-------- el parametro de GET Enrollment es:------');
        console.log(req.params.teacherId);
        const [rows] = await getEnrollByTeacher(req.params.teacherId)
        res.status(200).send(rows);
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
});

/* GET http://localhost:3333/api/enrollments/:enrollmentId */
router.get('/:enrollmentId', checkToken, async (req, res, next) =>{
  try {
    console.log('---- DENTRO de GET DE ENROLLMENT POR ID DE ENROLLMENTS -------');
    console.log('-------- el parametro de GET Enrollment es:------');
    console.log(req.params.enrollmentId);
    const [rows] = await   getEnrollById(req.params.enrollmentId)
    res.status(200).send(rows);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}); 
/* PUT http://localhost:3333/api/enrollments/:enrollmentId */
router.put('/:enrollmentId', checkToken, async (req, res, next) =>{
// req.body debe tener  {enroll_start_date,enroll_end_date,enroll_comments,enroll_assessment,enroll_id_student,enroll_id_teacher}
try {
  console.log('---- DENTRO de PUT DE ENROLLMENTS -------');
  console.log('-------- el parametro de PUT Enrollment es:------');
  console.log(req.params.enrollmentId);
  console.log('-------- el BODY de PUT Enrollment es:------');
  console.log(req.body);
  const [rows] = await update_enrolls(req.params.enrollmentId,req.body)
  res.status(200).send(rows);
} catch (err) {
  res.status(500).send({ error: err.message });
}
});

/* DELETE http://localhost:3333/api/enrollments/:enrollmentId */
router.delete('/:enrollmentId', checkToken,async (req, res) => {
  try {
    console.log('---- DENTRO de DELETE DE ENROLLMENTS -------');
    console.log('-------- el parametro de DELETE Enrollment es:------');
    console.log(req.params.enrollmentId);
    const [rows] = await setdeleted_enroll_ById(req.params.enrollmentId)
    res.status(200).send(rows);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
  });

module.exports = router;
