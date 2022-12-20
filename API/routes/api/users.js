"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { checkToken, accesoTeachers, accesoAdministrator, accesoStudents } = require('../middlewares');
const userModel = require('../../models/user');
const { getAll_users, insert_users, update_users, delete_user_ById, getUserById, setdeleted_user_ById, getUserByEmail } = userModel;
const teacherModel = require('../../models/teacher');
const { insert_Teachers, getTeacherByIdUser, update_Teachers, getDataTeacherAndUser } = teacherModel;
const studentModel = require('../../models/student');
const { insert_Students, getStudentByIdUser, update_Students, getDataStudentAndUser } = studentModel;
const adminModel = require('../../models/admin');
const { insert_Admins, getAdminByIdUser, getDataAdminAndUser, update_Admins } = adminModel;
const app = require('../../app');
const { sendWelcomeEmail } = require('../../emails/account');
// // INTERCAMBIO FRONT-BACK SUBJECTS
// let front ={id:"", email:"", active:false, password:"", tipo:""};
// type TipoFront=typeof front;
// let back={user_id:"", user_email:"", user_password:"", user_deleted:"",user_type:""};
// type TipoBack=typeof back;
// let fronts:TipoFront[]=[];
// function convertir_a_front(row:TipoBack){
//   front.id=row.user_id;
//   front.email=row.user_email;
//   front.password=row.user_password;
//   front.tipo=row.user_type;
//   front.active=(row.user_deleted=="SI")?false:true;
//   return front;}
/* GET users listing. con async/await */
// GET http://localhost:3333/api/users
// MIDDLEWARES DE CONTROL DE ACCESO IMPLMENTADO NO EN API.JS(A NIVEL DE RUTA), SIN A NIVEL DE VERBO HTTP
//function handler1(req,res,next) {next();}
//function handler2(req,res,next) {next();}
//router.get('/',handler1, handler2 ,async (req, res) => {
const router_getAll_users = async (req, res) => {
    try {
        console.log('---- DENTRO DE /API/USER ------');
        const [rows] = await getAll_users();
        // rows.map((el:any)=>{
        //   front=convertir_a_front(el);
        //   fronts.push(front);
        //   console.log(fronts)
        //  });
        // console.log('---- &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& ------');
        // console.log(rows);
        // let pipi:any=[{}];
        // frontsUser=[];
        // let sumat=[{email:"",active:false,password:"",tipo:""}];
        // rows.forEach((el:any, indice:number) => {
        //   console.log(' resultado de ... un solo elemento: ',el);
        //   //    front=convertir_a_front(el);
        //    const kk=convertir_a_front_user(el);
        //   let pipi={email:"",active:false,password:"",tipo:""};
        //    pipi.email=kk.user_email;
        //    pipi.active=((kk.user_deleted=="SI")?false:true);
        //    pipi.password=kk.user_password;
        //    pipi.tipo=kk.user_type;
        //    console.log(' resultado de ... un solo elemento CONVERTIDO:---------------------TU - TU - TU -TU ');
        //    console.log(pipi);
        //    sumat[indice]=pipi;
        //    console.log(sumat)        
        //   }
        //    );
        // rows.map((el:any)=>{
        //         console.log(' resultado de ... un solo elemento: ',el);
        //        //    front=convertir_a_front(el);
        //         frontUser=[{}];
        //         frontUser=convertir_a_front_user(el);
        //         console.log(' resultado de ... un solo elemento CONVERTIDO:---------------------TU - TU - TU -TU ');
        //         console.log(frontUser);
        //         frontsUser.push(frontUser);
        //         console.log(frontsUser)
        //    });
        res.status(200).send(rows);
        //  res.send(rows);
    }
    catch (err) {
        res.status(200).send({ error: err.message });
    }
};
router.get('/', checkToken, accesoAdministrator, accesoTeachers, router_getAll_users);
const router_getUserById = async (req, res) => {
    try {
        console.log('---- DENTRO DE /API/USER ------');
        const [rows] = await getUserById(req.params.userId);
        //  frontUser= convertir_a_front_user([rows]);
        res.send(rows);
    }
    catch (err) {
        res.status(200).send({ error: err.message });
    }
};
router.get('/:userId', checkToken, router_getUserById);
// Registrar un nuevo usuario
// POST http://localhost:3333/api/users/register
const router_Register_User = async (req, res) => {
    //  req.body.email = (req.body as { email: string }).email; 
    //  req.body.password = (req.body as { password: string }).password; 
    //  req.body.tipo = (req.body as { tipo: string }).tipo; 
    // ESTRUCTURA USER
    //  id_user
    //  email: "teacher1@gmail.com",
    //  password: "teacher1",
    //  tipo: "TEACHER",
    //  active: true
    try {
        console.log('---- DENTRO DE /API/USER/REGISTER -------');
        console.log('---- DENTRO DE /API/USER/REGISTER -----req.body:----------------------', req.body);
        req.body.user_password = await bcrypt.hash(req.body.user_password, 10);
        console.log('---- DENTRO DE /API/USER/REGISTER Y ANTES DE LLAMAR A insert USER');
        console.log('----------------------------------convertir_de_front_user-----------user.body antes conversion----------------------');
        console.log(req.body);
        //req.body=convertir_de_front_user(req.body);  //CAMBIO DATOS FRONT A BACK
        console.log('----------------------------------convertir_de_front_user-----------user.body desñues conversion----------------------');
        console.log(req.body);
        const emailduplicado = await getUserByEmail(req.body.email); //ya de alta, lo busco para obtner su user_id
        // console.log('---- ------------------------EMAIL DUPLICADO------------------------------------------------------------∫---:',emailduplicado);
        if (emailduplicado.length == 0) {
            res.status(500).send({ error: 'El email está duplicado' });
        }
        const [result] = await insert_users(req.body);
        /*******************  SACAR EL user_id INSERTADO ********************/
        console.log('---- RETORNO de insert USER:', result);
        const resultado = await getUserByEmail(req.body.user_email); //ya de alta, lo busco para obtner su user_id
        console.log('---------------------------------- DESPUES DE  getUserByEmail ---------resultado-------------');
        console.log(resultado[0][0].user_id);
        const usuario_id_creado = resultado[0][0].user_id;
        // console.log('---- insertado el USER, hgo un getUserByEmail para ver el user_id',);
        if (req.body.user_type == 'STUDENT') {
            console.log('---------------------------------- ANTES INSERT STUDENT Y DESPUES INSERT USER----------------------');
            //          const newStudent={student_name:"",student_last_name:"",student_image:"",student_zip:"",student_address:"",student_phone:"",student_id_user:usuario_id_creado,student_city:""}
            const newStudent = { student_name: "", student_last_name: "", student_image: "", student_zip: "", student_address: "", student_phone: "", student_id_user: usuario_id_creado, student_city: "" };
            const row = await insert_Students(newStudent);
            console.log('---- DENTRO DE /API/USER/REGISTER Y ANTES DE LLAMAR  a buscar por id. Resultado de INSERTAR STUDENT NUEVO:');
            console.log(row);
            const row2 = await getStudentByIdUser(usuario_id_creado);
            console.log('---- DENTRO DE /API/USER/REGISTER Y DESPUES DE LLAMAR  a buscar por id.:', row2[0]);
            const student_id_creado = row2[0][0].student_id;
            console.log('---- DENTRO DE /API/USER/REGISTER Y  STUDENT ID:', student_id_creado);
            const row3 = await getDataStudentAndUser(student_id_creado);
            console.log('---- DENTRO DE /API/USER/REGISTER despues de get Data student y user:', row3[0]);
            res.status(200).send(row3[0]); //devuelve el Student+User creado para que lo visualice el Formulario de Alta y lo modifique   
        }
        else if (req.body.user_type == 'TEACHER') {
            const newTeacher = { teach_name: "de test", teach_last_name: "", teach_image: "", teach_zip: "", teach_price_an_hour: 0, teach_description: "", teach_experience_years: 0, teach_address: "", teach_phone: "", teach_validated: "NO", teach_id_user: usuario_id_creado, teach_city: "" };
            const row = await insert_Teachers(newTeacher);
            // email teacher
            console.log('--------------------------------------ANTES DE -------- sendWelcomeEmail ********req.body.user_email*************************************************');
            console.log(req.body.user_email, process.env.EMAIL_EMPRESA);
            const resultado = await sendWelcomeEmail(req.body.user_email);
            console.log('-----------------------------------------------RESULTADO sendWelcomeEmail *********************************************************');
            console.log(resultado);
            console.log('---- DENTRO DE /API/USER/REGISTER despues de INSET TEACHER:');
            const row2 = await getTeacherByIdUser(usuario_id_creado);
            console.log('---- DENTRO DE /API/USER/REGISTER despues de BUSCAR TEACHER por id User:');
            const teacher_id_creado = row2[0][0].teach_id;
            console.log('---------teacher_id_creado------  :', teacher_id_creado);
            const row3 = await getDataTeacherAndUser(teacher_id_creado);
            console.log('---- DENTRO DE /API/USER/REGISTER despues de get Data teache y user:', row3[0]);
            // frontUT=convertir_a_front_teacher_user(row3[0]);
            // console.log('---- ------DESPUES -------convertir_a_front_teacherRRRRRRRRRRRRRRRRRRR-----');
            // console.log(frontUT);
            res.status(200).send(row3[0]); //devuelve el Teacher+User creado para que lo visualice el Formulario de Alta y lo modifique
        }
        if (req.body.user_type == 'ADMIN') {
            //la relacion usuario-administrador
            const newAdmin = { admin_name: "", admin_last_name: "", admin_image: "", admin_zip: "", admin_address: "", admin_phone: "", admin_id_user: usuario_id_creado, admin_city: "" };
            const row = await insert_Admins(newAdmin);
            console.log('---- DENTRO DE /API/USER/REGISTER Y ANTES DE LLAMAR  a buscar por id. Resultado de INSERTAR ADMIN NUEVO:', row);
            const row2 = await getAdminByIdUser(usuario_id_creado);
            console.log('---- DENTRO DE /API/USER/REGISTER Y DESPUES DE LLAMAR  a buscar por id.:', row2[0]);
            const admin_id_creado = row2[0][0].admin_id;
            console.log('---- DENTRO DE /API/USER/REGISTER Y  ADMIN ID:', admin_id_creado);
            const row3 = await getDataAdminAndUser(admin_id_creado);
            console.log('---- DENTRO DE /API/USER/REGISTER despues de get Data Admin y user:', row3[0]);
            // llamar a PUT http://localhost:3333/api/users/register/admin con datos de admin menos id y el foreign key
            // EL USUARIO DEBE RELLENAR EL FORMULARIO QUE RELLENE EL BODY QUE PASAMO AL REDIRECCIONAMIENTO Y ENVIARLO A 
            // PUT http://localhost:3333 "api/users/register/admin/"+admin_id que se obtiene de row3[0][0]
            res.status(200).send(row3[0]); //devuelve el Admin+User creado para que lo visualice el Formulario de Alta y lo modifique          
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message });
    }
};
router.post('/register', router_Register_User);
const createToken = async (user) => {
    console.log('/api/users/login -> dentro de CREATE TOKEN, user: ', user);
    const payload = {
        user_email: user.user_email,
        //user_username: user.user_username ||"sin username"
    };
    return await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.VIDA_TOKEN });
};
// CREAR EL LOGIN DE USUARIO, COMPROBAR PASSORD, SI DELETED, SI VALIDADO EL STUDENT.. CREAR TOKEN Y GUARDARLO EN LOS COOKIES.
// login de usuario, comprueba passwords, si son iguales genera un TOKEN
// POST http://localhost:3333/api/users/login
const router_Login = async (req, res) => {
    const [rows] = await getUserByEmail(req.body.user_email);
    console.log('/api/users/login -> USUARIO LEIDO POR EMAIL: ', rows);
    //app.activeUser=req.body;
    app.activeUser = rows;
    console.log('............................ login  : app.activeUser ......................................');
    console.log(app.activeUser);
    if (rows.length === 1) {
        // El usuario existe
        const user = rows[0];
        console.log('/api/users/login -> USUARIO LEIDO POR EMAIL: rows[0]: ', user);
        console.log('/api/users/login -> user.user_password): ', user.user_password);
        console.log('/api/users/login -> req.body.user_password: ', req.body.user_password);
        const distintos = await bcrypt.compareSync(req.body.user_password, user.user_password);
        console.log('/api/users/login -> iguales: ', distintos);
        if (distintos) {
            const token_creado = await createToken(user);
            //global.token=req.cookies.token_creado;
            //console.log('---token creado: ',token_creado)
            console.log('--------user.user_id-------------------------- ', user.user_id);
            let id_de_usuario;
            if (user.user_type == "ADMIN") {
                const [result] = await getAdminByIdUser(user.user_id);
                id_de_usuario = result[0].admin_id;
            }
            else if (user.user_type == "TEACHER") {
                const [result] = await getTeacherByIdUser(user.user_id);
                id_de_usuario = result[0].teach_id;
            }
            else if (user.user_type == "STUDENT") {
                const [result] = await getStudentByIdUser(user.user_id);
                console.log('--------result-------------------------- ', result[0]);
                id_de_usuario = result[0].student_id;
            }
            console.log('--------id_user-------------------------- ', id_de_usuario);
            res.cookie('token', token_creado); //crea la cookie con el token y la almacena en el Chrome 
            res.status(200).send({
                success: 'Login correcto',
                token: token_creado,
                tipo_user: user.user_type,
                id_usuario: id_de_usuario
            });
        }
        else {
            res.status(400).send({ error: 'email y/o password no coinciden con el registrado  - email y/o password incorrecto' });
        }
    }
    else {
        // El usuario no existe
        res.status(400).send({ error: 'Usuario no existe - email y/o password incorrecto' });
    }
};
router.post('/login', router_Login);
/* PUT users (ACTUALIZAR TODO EL REGISTRO) con async/await */
// PUT http://localhost:3333/api/users/register/admin/:adminid'
const router_update_Admins = async (req, res) => {
    // const [result] = await update_users(req.params.user_id, req.body);
    //en req.body van los datos de admin leidos de la pantalla (menos id y el admin_user_id que es el foreign key)
    // DEL FORMULARIO NOS ENVIA en req.body -> {admin_name,admin_zip,admin_address,admin_phone,admin_city}
    try {
        console.log(' -----api/users/register/admin/:adminid-------req.body:-----');
        console.log(req.body);
        console.log(' -----api/users/register/admin/:adminid-------req.params:-----');
        console.log(req.params);
        const [result] = await update_Admins(req.params.adminid, req.body);
        console.log('----------------- dDESPUES dE updateDataadminAndUser------result--');
        console.log(result);
        res.status(200).send(result);
    }
    catch (err) {
        res.status(500).send({ error: err.message });
    }
};
router.put('/register/admin/:adminid', router_update_Admins);
/* PUT users (ACTUALIZAR TODO EL REGISTRO) con async/await */
// PUT http://localhost:3333/api/users/register/students/:student_id'
const router_update_Students = async (req, res) => {
    // const [result] = await update_users(req.params.user_id, req.body);
    //en req.body van los datos de admin leidos de la pantalla (menos id y el admin_user_id que es el foreign key)
    // DEL FORMULARIO NOS ENVIA en req.body -> {admin_name,admin_zip,admin_address,admin_phone,admin_city}
    try {
        console.log(' -----api/users/register/students/:student_id-------req.body:-----&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&--');
        console.log(req.body);
        console.log(' -----api/users/register/students/:student_id-------req.params:----&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&---');
        console.log(req.params);
        const [result] = await update_Students(req.params.studentid, req.body);
        console.log('----------------- dDESPUES dE updateDataStudentAndUser------result-&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-');
        console.log(result);
        res.status(200).send(result);
    }
    catch (err) {
        res.status(500).send({ error: err.message });
    }
};
router.put('/register/students/:studentid', router_update_Students);
/* PUT users (ACTUALIZAR TODO EL REGISTRO) con async/await */
// PUT http://localhost:3333/api/users/register/teachers/:teach_id'
const router_update_Teachers = async (req, res) => {
    // const [result] = await update_users(req.params.user_id, req.body);
    //en req.body van los datos de teachers leidos de la pantalla (menos id y el admin_user_id que es el foreign key)
    // DEL FORMULARIO NOS ENVIA en req.body -> {admin_name,admin_zip,admin_address,admin_phone,admin_city}
    try {
        console.log(' -----api/users/register/students/:teachtid-------req.body:-----');
        console.log(req.body);
        //  console.log(' ----- ANTES convertir_de_front_teacher ---TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT---------');
        //   backTeacher=convertir_de_front_teacher(req.body);
        //  console.log(' -----DESPUES   convertir_de_front_teacher ---TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT---------');
        //  console.log(backTeacher);
        console.log(' -----api/users/register/students/:teachid-------req.params:-----');
        console.log(req.params);
        const [result] = await update_Teachers(req.params.teachid, req.body);
        console.log('----------------- dDESPUES dE updateDataTeacherAndUser------result--');
        console.log(result);
        res.status(200).send(result);
    }
    catch (err) {
        res.status(500).send({ error: err.message });
    }
};
router.put('/register/teachers/:teachid', router_update_Teachers);
// DELETE http://localhost:3333/api/users/23
// router.delete('/:user_id', async (req, res) => {
//   try {
//     const [result] = await delete_user_ById(req.params.user_id);
//     res.status(200).send(result);
//   } catch (err:any) {
//    res.status(400).send({ error: err.message })
//   }
//   });
// PATCH http://localhost:3333/api/users/23
const router_setdeleted_user_ById = async (req, res) => {
    try {
        console.log('parametros: ', req.params.user_id);
        const [result] = await setdeleted_user_ById(req.params.user_id);
        res.status(200).send(result);
    }
    catch (err) {
        res.status(400).send({ error: err.message });
    }
};
router.delete('/:user_id', router_setdeleted_user_ById);
module.exports = router;
