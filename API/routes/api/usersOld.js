var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { checkToken,accesoTeachers,accesoAdministrator,accesoStudents } = require('../middlewares');
const userModel = require('../../models/user');
const {getAll_users,insert_users,update_users,delete_user_ById,setdeleted_user_ById,getUserByEmail} = userModel;
const teacherModel = require('../../models/teacher');
const { insert_Teachers,getTeacherByIdUser,update_Teachers,getDataTeacherAndUser} = teacherModel;
const studentModel = require('../../models/student');
const { insert_Students,getStudentByIdUser,update_Students,getDataStudentAndUser} = studentModel;
const adminModel = require('../../models/admin');
const { insert_Admins,getAdminByIdUser,getDataAdminAndUser,update_Admins} = adminModel;
const app=require('../../app');
const { sendWelcomeEmail } = require('../../emails/account');

/* GET users listing. con async/await */
// GET http://localhost:3333/api/users

// MIDDLEWARES DE CONTROL DE ACCESO IMPLMENTADO NO EN API.JS(A NIVEL DE RUTA), SIN A NIVEL DE VERBO HTTP
//function handler1(req,res,next) {next();}
//function handler2(req,res,next) {next();}
//router.get('/',handler1, handler2 ,async (req, res) => {
  router.get('/',checkToken, accesoAdministrator,accesoTeachers, async (req, res) => {
    try {
      console.log('---- DENTRO DE /API/USER ------');
      const [rows] = await getAll_users()
      res.send(rows);
    } catch (err) {
      res.status(200).send({ error: err.message });}
  });


  router.get('/:userId',checkToken , async (req, res) => {
    try {
      console.log('---- DENTRO DE /API/USER ------');
      const [rows] = await getUserById(req.params.userId)
      res.send(rows);
    } catch (err) {
      res.status(200).send({ error: err.message });}
  });

  // Registrar un nuevo usuario
  // POST http://localhost:3333/api/users/register
  router.post('/register', async (req, res) => {
  
    try {
      console.log('---- DENTRO DE /API/USER/REGISTER -------');
      console.log('---- DENTRO DE /API/USER/REGISTER -----req.body:-',req.body);
      req.body.user_password = await bcrypt.hash(req.body.user_password, 10);


      console.log('---- DENTRO DE /API/USER/REGISTER Y ANTES DE LLAMAR A insert USER');

      const [result] = await insert_users(req.body);
         /*******************  SACAR EL user_id INSERTADO ********************/
        console.log('---- RETORNO de insert USER:', result);
        const resultado = await getUserByEmail(req.body.user_email); //ya de alta, lo busco para obtner su user_id
        const usuario_id_creado= resultado[0][0].user_id;
       // console.log('---- insertado el USER, hgo un getUserByEmail para ver el user_id',);

        if (req.body.user_type == 'STUDENT'){
          const newStudent={student_name:"",student_zip:"",student_address:"",student_phone:"",student_id_user:usuario_id_creado,student_city:""}
        
          const [row]= await insert_Students(newStudent);
          console.log('---- DENTRO DE /API/USER/REGISTER Y ANTES DE LLAMAR  a buscar por id. Resultado de INSERTAR STUDENT NUEVO:');
          console.log(row);
          const row2 = await getStudentByIdUser(usuario_id_creado);
          console.log('---- DENTRO DE /API/USER/REGISTER Y DESPUES DE LLAMAR  a buscar por id.:',row2[0][0]);
          const student_id_creado= row2[0][0].student_id;
          console.log('---- DENTRO DE /API/USER/REGISTER Y  STUDENT ID:',student_id_creado);
          const row3 = await getDataStudentAndUser(student_id_creado);
          console.log('---- DENTRO DE /API/USER/REGISTER despues de get Data student y user:',row3[0][0]);
          res.status(200).send(row3[0][0]); //devuelve el Student+User creado para que lo visualice el Formulario de Alta y lo modifique
          
        }
        else if (req.body.user_type == 'TEACHER'){
           const newTeacher={teach_name:"de test",teach_zip:"",teach_price_an_hour:0,teach_description:"",teach_experience_years:0,teach_address:"",teach_phone:"",teach_validated:"NO",teach_id_user:usuario_id_creado,teach_city:""}
          
           const row = await insert_Teachers(newTeacher);
           console.log('---- DENTRO DE /API/USER/REGISTER despues de INSET TEACHER:');
           const row2 = await getTeacherByIdUser(usuario_id_creado);
           console.log('---- DENTRO DE /API/USER/REGISTER despues de BUSCAR TEACHER por id User:');
           const teacher_id_creado= row2[0][0].teach_id;
           console.log('---------teacher_id_creado------  :',teacher_id_creado);
          const row3 = await getDataTeacherAndUser(teacher_id_creado);
          console.log('---- DENTRO DE /API/USER/REGISTER despues de get Data teache y user:',row3[0][0]);
          res.status(200).send(row3[0][0]); //devuelve el Teacher+User creado para que lo visualice el Formulario de Alta y lo modifique
        }
        if (req.body.user_type == 'ADMIN'){
          //la relacion usuario-administrador
          const newAdmin={admin_name:"",admin_zip:"",admin_address:"",admin_phone:"",admin_id_user:usuario_id_creado,admin_city:""};
          const row = await insert_Admins(newAdmin);

          const resultado= await sendWelcomeEmail(req.body.user_email,req.body.user_username);
          console.log('-----------------------------------------------RESULTADO sendWelcomeEmail *********************************************************');
          console.log(resultado);
          console.log(req.body.user_email,req.body.user_username,process.env.EMAIL_EMPRESA);


          console.log('---- DENTRO DE /API/USER/REGISTER Y ANTES DE LLAMAR  a buscar por id. Resultado de INSERTAR ADMIN NUEVO:',row);
          const row2 = await getAdminByIdUser(usuario_id_creado);
          console.log('---- DENTRO DE /API/USER/REGISTER Y DESPUES DE LLAMAR  a buscar por id.:',row2[0][0]);
          const admin_id_creado= row2[0][0].admin_id;
          console.log('---- DENTRO DE /API/USER/REGISTER Y  ADMIN ID:',admin_id_creado);
          const row3 = await getDataAdminAndUser(admin_id_creado);
          console.log('---- DENTRO DE /API/USER/REGISTER despues de get Data Admin y user:',row3[0][0]);
         // llamar a PUT http://localhost:3333/api/users/register/admin con datos de admin menos id y el foreign key

          // EL USUARIO DEBE RELLENAR EL FORMULARIO QUE RELLENE EL BODY QUE PASAMO AL REDIRECCIONAMIENTO Y ENVIARLO A 
          // PUT http://localhost:3333 "api/users/register/admin/"+admin_id que se obtiene de row3[0][0]
        res.status(200).send(row3[0][0]); //devuelve el Admin+User creado para que lo visualice el Formulario de Alta y lo modifique          
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
    });

    // a partir del email obtenemos el usuario
    const getByEmail = async (user_email) => {
      return await db.query('select * from Appteachers.Users where user_email = ?', [user_email]);
      }

const createToken = async (user) => {
  console.log('/api/users/login -> dentro de CREATE TOKEN, user: ',user)
 
  const payload = {
    user_id: user.user_id,
    user_username: user.user_username
  };
  return await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.VIDA_TOKEN})

  }

// CREAR EL LOGIN DE USUARIO, COMPROBAR PASSORD, SI DELETED, SI VALIDADO EL STUDENT.. CREAR TOKEN Y GUARDARLO EN LOS COOKIES.
// login de usuario, comprueba passwords, si son iguales genera un TOKEN
// POST http://localhost:3333/api/users/login
router.post('/login', async (req, res) => {
    const [rows] = await getUserByEmail(req.body.user_email);
    console.log('/api/users/login -> USUARIO LEIDO POR EMAIL: ',rows)
    //app.activeUser=req.body;
    app.activeUser=rows;
    console.log('............................ login  : app.activeUser ......................................');
    console.log(app.activeUser);
  
  if (rows.length === 1) {
    // El usuario existe
    const user = rows[0];
    console.log('/api/users/login -> USUARIO LEIDO POR EMAIL: rows[0]: ',user)
    console.log('/api/users/login -> user.user_password): ',user.user_password)
    console.log('/api/users/login -> req.body.user_password: ',req.body.user_password)
    const distintos = await bcrypt.compareSync(req.body.user_password, user.user_password);
    console.log('/api/users/login -> iguales: ',distintos);
    if (distintos) {
      const token_creado= await createToken(user);
      //global.token=req.cookies.token_creado;
      //console.log('---token creado: ',token_creado)
      res.cookie('token', token_creado); //crea la cookie con el token y la almacena en el Chrome 
      res.status(200).send({ //enviarmos el TOKEN al cliente
      success: 'Login correcto',
      token: token_creado//genera un TOKEN si son iguales.
       })
    } else {
      res.status(400).send({ error: 'email y/o password no coinciden con el registrado  - email y/o password incorrecto' });
    }
  } else {
    // El usuario no existe
    res.status(400).send({ error: 'Usuario no existe - email y/o password incorrecto'});
    }
  });

/* PUT users (ACTUALIZAR TODO EL REGISTRO) con async/await */
// PUT http://localhost:3333/api/users/register/admin/:adminid'
router.put('/register/admin/:adminid', async (req, res) => {
 // const [result] = await update_users(req.params.user_id, req.body);
  //en req.body van los datos de admin leidos de la pantalla (menos id y el admin_user_id que es el foreign key)
  // DEL FORMULARIO NOS ENVIA en req.body -> {admin_name,admin_zip,admin_address,admin_phone,admin_city}
    try {
      console.log(' -----api/users/register/admin/:adminid-------req.body:-----');
      console.log(req.body);
      console.log(' -----api/users/register/admin/:adminid-------req.params:-----');
      console.log(req.params);
      const  [result] = await update_Admins(req.params.adminid,req.body);
      console.log('----------------- dDESPUES dE updateDataadminAndUser------result--');
      console.log(result);
      res.status(200).send(result);
    } catch (err) {res.status(500).send({ error: err.message });}
});

/* PUT users (ACTUALIZAR TODO EL REGISTRO) con async/await */
// PUT http://localhost:3333/api/users/register/students/:student_id'
router.put('/register/students/:studentid', async (req, res) => {
  // const [result] = await update_users(req.params.user_id, req.body);
   //en req.body van los datos de admin leidos de la pantalla (menos id y el admin_user_id que es el foreign key)
   // DEL FORMULARIO NOS ENVIA en req.body -> {admin_name,admin_zip,admin_address,admin_phone,admin_city}
     try {
       console.log(' -----api/users/register/students/:student_id-------req.body:-----&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&--');
       console.log(req.body);
       console.log(' -----api/users/register/students/:student_id-------req.params:----&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&---');
       console.log(req.params);
       const  [result] = await update_Students(req.params.studentid,req.body);
       console.log('----------------- dDESPUES dE updateDataStudentAndUser------result-&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-');
       console.log(result);
       res.status(200).send(result);
     } catch (err) {res.status(500).send({ error: err.message });}
 });

/* PUT users (ACTUALIZAR TODO EL REGISTRO) con async/await */
// PUT http://localhost:3333/api/users/register/teachers/:teach_id'
router.put('/register/teachers/:teachid', async (req, res) => {
  // const [result] = await update_users(req.params.user_id, req.body);
   //en req.body van los datos de teachers leidos de la pantalla (menos id y el admin_user_id que es el foreign key)
   // DEL FORMULARIO NOS ENVIA en req.body -> {admin_name,admin_zip,admin_address,admin_phone,admin_city}
     try {
       console.log(' -----api/users/register/students/:teachtid-------req.body:-----');
       console.log(req.body);
       console.log(' -----api/users/register/students/:teachid-------req.params:-----');
       console.log(req.params);
       const  [result] = await update_Teachers(req.params.teachid,req.body);
       console.log('----------------- dDESPUES dE updateDataTeacherAndUser------result--');
       console.log(result);
       res.status(200).send(result);
     } catch (err) {res.status(500).send({ error: err.message });}
 });

// DELETE http://localhost:3333/api/users/23
// router.delete('/:user_id', async (req, res) => {
//   try {
//     const [result] = await delete_user_ById(req.params.user_id);
//     res.status(200).send(result);
//   } catch (err) {
//    res.status(400).send({ error: err.message })
//   }
//   });

// PATCH http://localhost:3333/api/users/23
  router.delete('/:user_id', async (req, res) => {
    try {
      console.log('parametros: ',req.params.user_id)
      const [result] = await setdeleted_user_ById(req.params.user_id);
      res.status(200).send(result);
    } catch (err) {
     res.status(400).send({ error: err.message })
    }
    });
module.exports = router;
