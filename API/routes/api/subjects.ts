const express = require('express');
import { RequestHandler } from 'express'; //TS
import { stringify } from 'querystring';

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

  // // INTERCAMBIO FRONT-BACK SUBJECTS
  // let front ={id:"", name:""};
  // type TipoFront=typeof front;
  // let back={subj_id:"", subj_name:""};
  // type TipoBack=typeof back;
  // let fronts:TipoFront[]=[];
  // function convertir_a_front(row:TipoBack){
  //   front.id=row.subj_id;
  //   front.name=row.subj_name;
  //   return front;}
  // function convertir_de_front(front:TipoFront){
  //   back.subj_id=front.id;
  //   back.subj_name=front.name;
  //   return back;}

// login como administrador para accede a todas las rutas

  /************* LOGIN REAL DE ADMIN Y USER   */

  // El ultimo alta de usuario:
  //nuevoAdmin.user_email
  //nuevoAdmin.user_password
  // Registrar un nuevo usuario
  // POST http://localhost:3333/api/subjects
  const router_insert_Subject:RequestHandler =async (req, res) => {
    try {
      //req.body.subj_name= (req.body as { subj_name: string }).subj_name;
      console.log('---- DENTRO DE /API/subjects/ ----req.body---');
    //  back= convertir_de_front(req.body);
      console.log(req.body);
      console.log('---- DENTRO DE /API/SUBJECT Y ANTES DE LLAMAR A insert SUBJECT');
      const [result] = await insert_Subject(req.body);
      console.log('---- RETORNO de insert SUBJECT:', result);
      res.status(200).send(result);
    } catch (err:any) {
      res.status(500).send({ error: err.message });
    }
    }
  router.post('/',checkToken, router_insert_Subject);
  
/* GET http://localhost:3333/api/subjects */
const router_getAll_Subjects:RequestHandler=async (req, res) => {
  try {
   console.log('---- DENTRO de GET DE SUBJECTS - ------');
   const [rows] = await getAll_Subjects();
  // ANTES CONVERSION res.status(200).send(rows);
   // CONVERSION A FRONTEND
  // rows.map((el:any)=>{
  //   front=convertir_a_front(el);
  //   fronts.push(front);
  //   console.log(fronts)
  //  });
    res.status(200).send(rows);
 } catch (err:any) {
   res.status(500).send({ error: err.message });
 }
}
router.get('/', router_getAll_Subjects);


/* GET http://localhost:3333/api/subjects/:subjectId */

const router_getSubjectById:RequestHandler=async (req, res, next) =>{
 try {
  //req.params.subjectId= (req.params as { subjectId: string }).subjectId;
   console.log('---- DENTRO de GET DE SUBJECTS  -------');
   console.log('-------- el parametro de GET SUBJECT es:------');
   console.log(req.params.subjectId);
   const [rows] = await getSubjectById(req.params.subjectId)
 //  front=convertir_a_front(rows[0]);
   res.status(200).send(rows);
 } catch (err:any) {
   res.status(500).send({ error: err.message });
 }
}
router.get('/:subjectId', router_getSubjectById);



/* PUT http://localhost:3333/api/subjects/:subjectId */

const router_update_Subject:RequestHandler=async (req, res, next) =>{
try {
  //req.params.subjectId= (req.params as { subjectId: number }).subjectId;
  console.log('---- DENTRO de PUT DE SUBJECT -------');
  console.log('-------- el parametro de PUT SUBJECT es:------');
  console.log(req.params.subjectId);
  console.log('-------- el BODY de PUT SUBJECT es:------');
//  back= convertir_de_front(req.body);
  console.log(req.body);
  const [rows] = await update_Subject(req.params.subjectId,req.body)
  res.status(200).send(rows);
} catch (err:any) {
  res.status(500).send({ error: err.message });
}
}
router.put('/:subjectId',checkToken, router_update_Subject);


/* DELETE http://localhost:3333/api/subjects/:subjectId */
const router_delete_Subject:RequestHandler= async (req, res) => {
try {
//  req.params.subjectId= (req.params as { subjectId: string }).subjectId;
  console.log('---- DENTRO de DELETE DE SUBJECTS -------');
  console.log('-------- el parametro de DELETE SUBJECTS es:------');
  console.log(req.params.subjectId);
  const [rows] = await delete_Subject(req.params.subjectId)
  res.status(200).send(rows);
} catch (err:any) {
  res.status(500).send({ error: err.message });
}
}
router.delete('/:subjectId',checkToken,router_delete_Subject);


  module.exports = router;
