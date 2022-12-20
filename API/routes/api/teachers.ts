const express = require('express');
import { RequestHandler } from 'express'; //TS
const multer = require('multer'); //MULTER8

const fs = require('fs'); //MULTER

const router = express.Router();
const teacherModel = require('../../models/teacher');
const { 
  getDataTeacherAndUser,
  updateDataTeacherAndUser,
  updateDataTeacherAndUser_noimage,
  getAll_TeachersAndUsers,
  getAll_TeachersAndUsers_paginacion,
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

const upload = multer({ dest: 'public/images', 
    limits:{fileSize:10000000},
    fileFilter(req:any,file:any,cb:Function){
      // GUARDA LA IMAGEN EN UN CAMPO BINARY O BLOB EN LA TABLA req.body.teach_image=req.file.buffer o file.buffer
      // DEBE ELIMINARSE EL dest: 'public/images' para que no grabe allí
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
       cb(new Error('Please, upload an image'))}
    cb(undefined, true); //ok
  
  } }); //MULTER 10Mb max Size
  

// GET http://localhost:3333/api/teachers/0/1
const router_getAll_Teachers:RequestHandler= async function(req, res, next) {
  //console.log(' EL USUARIO LOGEADO EN TODA LA APP (EN MIDDLEWARE DE CHECKTOKEN):',req.user);
  try {
    console.log('###################### DENTRO DE LA FUNCION GET  http://localhost:3333/api/teachers #############################################');
     const[rows] =  await getAll_TeachersAndUsers();
   //   console.log(' resultado de ...........getAll_Teachers: ');
    //  console.log(rows[0]);
    //  frontsUT=[];
    //     rows.map((el:any)=>{
    //   console.log(' resultado de ... un solo elemento: ',el);
    //   //    front=convertir_a_front(el);

    //       frontUT=convertir_a_front_teacher_user(el);


    //       console.log(' resultado de ... un solo elemento CONVERTIDO:---------------------TU - TU - TU -TU ',frontUT);

    //       frontsUT.push(frontUT);
    //       console.log(frontsUT)
    //     });

        
    res.status(200).send(rows);
    } catch (err:any) {res.status(500).send({ error: err.message });}
 }
 router.get('/', checkToken, accesoTeachers, router_getAll_Teachers);


 const router_getAll_Teachers_paginacion:RequestHandler= async function(req, res, next) {
  //console.log(' EL USUARIO LOGEADO EN TODA LA APP (EN MIDDLEWARE DE CHECKTOKEN):',req.user);
  try {
    console.log('###################### DENTRO DE LA FUNCION GET  http://localhost:3333/api/teachers/0/1 #############################################');
    console.log(' OFFSET Y CANT');
    console.log(req.params.offset,req.params.cant);
    const[rows] =  await getAll_TeachersAndUsers_paginacion(parseInt(req.params.offset),parseInt(req.params.cant));
    res.status(200).send(rows);
    } catch (err:any) {res.status(500).send({ error: err.message });}
 }
 router.get('/:offset/:cant', checkToken, accesoTeachers, router_getAll_Teachers_paginacion);


// GET http://localhost:3333/api/teachers/23
const router_getDataTeacherAndUser:RequestHandler= async function(req, res, next) {
// //  console.log(' EL USUARIO LOGEADO EN TODA LA APP (EN MIDDLEWARE DE CHECKTOKEN):',req.user);
//   console.log(' En GET http://localhost:3333/api/teachers/23): el parametro es: ',req.params.teacherId);

//   const row = await getDataTeacherAndUser(req.params.teacherId);
//   console.log(' -----api/teachers/1 getDataTeacherAndUser------------',row[0][0]);
//   res.status(200).send(row[0][0]);
//   //res.send('--- ENVIAR EL RESULTADO DE LA OPERACIÓN DE GET DE TEACHERS ------',);
// });


 //  console.log(' EL USUARIO LOGEADO EN TODA LA APP (EN MIDDLEWARE DE CHECKTOKEN):',req.user);
 try {
  //req.params.teacherId= (req.params as { teacherId: number }).teacherId;
    console.log('###################### DENTRO DE LA FUNCION  GET http://localhost:3333/api/teachers/23 #############################################');
    console.log(' En GET http://localhost:3333/api/teachers/23): el parametro es: ',req.params.teacherId);
    const row = await getDataTeacherAndUser(req.params.teacherId);
    console.log(row);
    // console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM devuelve de Teacher y User juntos:");
    // const devuelve=convertir_a_front(row[0]);
    // console.log(devuelve);
    //console.log(row);
    // frontUT=convertir_a_front_teacher_user(row);
    // console.log(' resultado de ... un solo elemento CONVERTIDO:---------------------TU - TU - TU -TU ',frontUT);


    res.status(200).send(row); 
  } catch (err:any) {res.status(500).send({ error: err.message });}
}
router.get('/:teacherId', checkToken, accesoTeachers, router_getDataTeacherAndUser);




// // POST http://localhost:3333/api/teachers
// router.post('/', checkToken, accesoTeachersORAdministrator, async function(req, res, next) {
//   res.status(200).send('--- ENVIAR EL RESULTADO DE LA OPERACIÓN DE POST DE TEACHERS ------',);
// });

// PUT http://localhost:3333/api/teachers/2
const router_updateDataTeacherAndUser:RequestHandler= async function(req:any, res, next) {


    //AÑADIMOS LA EXTENSION A REQ.FILE.PATH Y A REQ.BODY.IMAGE
          // Antes de guardar el producto en la base de datos, modificamos la imagen para situarla donde nos interesa
       if (req.file !== undefined) {
          const extension = '.' + req.file.mimetype.split('/')[1];
          console.log('-------------------req.file.mimetype.split(/)------------MULTER-------------');
          console.log(req.file.mimetype.split('/'))
          // Obtengo el nombre de la nueva imagen
          
          const newName = req.file.filename + extension;
          console.log('--req.file.filename + extension ----------MULTER-------------');
          console.log(newName);

          // Obtengo la ruta donde estará, adjuntándole la extensión
          const newPath = req.file.path + extension;
          console.log('--req.file.path + extension ----------MULTER-------------');
          console.log(newPath)
          // Muevo la imagen para que resiba la extensión
          fs.renameSync(req.file.path, newPath); // cambiamos nombre(con su path) añadiendo la extensión.

          // Modifico el BODY para poder incluir el nombre de la imagen en la BD
          req.body.teach_image = newName; //usamos el nuevo nombre para grabarlo.
          console.log('--newName ----------MULTER-------------');
          console.log(newName)

          // try {
          //     const newProducto = await Producto.create(req.body); //INSERT ONE DE SQL

          //     res.json(newProducto);
          // } catch (err) {
          //     res.json(err);
          // }

        //req.body
        const updateTeacher=req.body
        console.log(' -----api/teachers/2---a modificar---------',req.body);
        // req.body.teacher con los campos: {teach_name,teach_zip,teach_price_an_hour,teach_description,teach_experience_years,teach_address,teach_phone,teach_validated,teach_id_user,teach_id_subject}
          try {

            // backUT=convertir_de_front_teacher_user(req.body);

            // console.log(' -----convertir_de_front_teacher------UPDATE UPDATE UPDATE UPDATE UPDATE UPDATEUPDATE UPDATE UPDATEUPDATE UPDATE UPDATE---');
            // console.log(backUT);
            const  result = await updateDataTeacherAndUser(req.body);
            console.log('----------------- dDESPUES dE updateDataTeacherAndUser (2 promesas juntas)--------',result);
            // OPCION 1 ->ahora hace una lectura y devuelve el registro modificado
          // console.log(' -----api/teachers/2-- ANTES DE getDataTeacherAndUser----TEACHER ID ES -----',req.params.teacherId);
            //  const row = await getDataTeacherAndUser(req.params.teacherId);
            // res.status(200).send(row[0][0]);
            // OPCION 2 -> 


            res.status(200).send(result);
          } catch (err:any) {res.status(500).send({ error: err.message });}
          // res.send('--- ENVIAR EL RESULTADO DE LA OPERACIÓN DE PUT DE TEACHERS ------',);
          }
  
  else { // UPDATE SIN IMAGEN DEL TEACHER
    console.log('---------dentro de -router_updateDataTeacherAndUser_noimage ------- ');
    try {
      const  result = await updateDataTeacherAndUser_noimage(req.body);
      console.log('----------------- dDESPUES dE updateDataTeacherAndUser (2 promesas juntas)-- NO IMAGEN------',result);
      
      res.status(200).send(result);
    } catch (err:any) {res.status(500).send({ error: err.message });}

  }}
    router.put('/:teacherId', checkToken, accesoTeachers,upload.single('teach_image'),router_updateDataTeacherAndUser);

// GET http://localhost:3333/api/teachers/1/image
const router_readImageTeacher:RequestHandler= async function(req:any, res, next) {
  // Devolvemos la imagen guarda en un campo BINARY de Mongo o BLOB de MySQL
    try{
      const profesor= await getTeacherById(req.params.id);
      if (!profesor || !profesor.teach_image) {
        throw new Error('')
      }
      res.set('Content-Type','image/jpg');
      res.send(profesor.teach_image); //muestra directamente en el navegador o lo ponemos en un campo img src como ya sabemos
    //res.status(200).send(result);
  } catch (err:any) {res.status(404).send({ error: err.message });}
  // res.send('--- ENVIAR EL RESULTADO DE LA OPERACIÓN DE PUT DE TEACHERS ------',);
  }
  router.get('/:teacherId/image', checkToken, accesoTeachers,router_readImageTeacher);


// // DELETE http://localhost:3333/api/teachers/23
// router.delete('/:teacherId', checkToken, accesoTeachersORAdministrator, async function(req, res, next) {
//   res.status(200).end('--- ENVIAR EL RESULTADO DE LA OPERACIÓN DE DELETE DE TEACHERS ------',);
// });


// DELETE http://localhost:3333/api/teachers/23
const router_setdeleted_Teacher_ById:RequestHandler=async function(req, res, next) {
  // COMO UN PUT DEL CAMPO DELETE
    console.log('###################### DENTRO DE LA FUNCION  DELETE http://localhost:3333/api/teachers/23 #############################################');
    console.log(' -----DELETE api/students/2---id del students: ---------',req.params.teacherId);
      try {
        const  [result] = await setdeleted_Teacher_ById(req.params.teacherId);
        console.log('----------------- dDESPUES dE setdeleted_Teacher_ById-----result---');
        console.log(result);
        res.status(200).send(result);
      } catch (err:any) {res.status(500).send({ error: err.message });}
      // res.send('--- ENVIAR EL RESULTADO DE LA OPERACIÓN DE PUT DE admin ------',);
      }
      router.delete('/:teacherId',checkToken, accesoTeachers, router_setdeleted_Teacher_ById);

module.exports = router;



