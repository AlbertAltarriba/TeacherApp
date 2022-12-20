

//const router = express.Router();
import {Router} from 'express'; //TS
const router= Router(); //TS




//const app = require('../app');

// llamamos checkToken a los recursos no publicos con el formato:
// router.use('/products', checkToken,accesoTipo('ADMIN','STUDENT','TEACHER'),apiProductsRouter);
const { checkToken,accesoTeachers,accesoAdministrator,accesoStudents,accesoTeachersORAdministrator } = require('./middlewares');

//
//ya vienen con el prefijo /api
// EL CONTRO DE ACCESO AQUI AFECTA A TODOS LOS VERBOS: PUT,GET, UPDATE, PATCH, DELETE...
// para un control de acceso a nivel de Verbo, añadir los middleware en users.js, teachers.js....

//*******************************  APIS PUBLICAS******************************/
//OK- GET /api -> pantalla ppal. Selecciona materia y CP y click boton "Buscar profesores cerca y con mejor puntuación", 
// lee una lista de materias para el dropdown, ->Procedimiento/Funcion "Teachers-Zona" al ir a GET /api/teachers/teachersnear 
// http://localhost:3333/api/  -> Pantalla principal
const indexRouter = require('./api/index');

router.use('/',indexRouter);//es publico

// OK- GET http://localhost:3333/api/teachers/teachersnear -> PUBLICO
const teachersnearRouter = require('./api/teachers/teachersnear');

router.use('/teachers/teachersnear',teachersnearRouter); //-publico

//POST http://localhost:3333/api/users/register (al hacer click sobre "Registrarse en la Aplicación") -> introducir nombre, 
// email, password, tipo de usuario y nombre de usuario -> POST /api/users/register -> encripta password e inserta en tabla 'users'. 
// OK- A) Si es de tipo 'TEACHER' POST /api/teachers (nuevo teacher vacío con el id de usario en su clave foránea), Se abre un formulario para introducir los campos de profesor y actualiza la tabla 'teachers' con id del teacher creado antes. UPDATE /api/teachers/:teach_id
// OK- B) Si es de tipo 'STUDENT' POST /api/students (nuevo students vacío con el id de usario en su clave foránea), Se abre un formulario para introducir los campos de student y actualiza la tabla 'students' con id del student creado antes. UPDATE /api/students/:student_id

//// http://localhost:3333/api/users/register   
const usersRouter = require('./api/users'); // POST PUBLICO dentro de users.js
// OK- POST nuevo en users y si TEACHER nuevo (teach_id_user=user_id) en POST /api/teachers y dar teach_id para el formulario TEACHER
// NO- POST nuevo en users y si STUDENT nuevo (student_id_user=user_id) en POST /api/students y r dar student_id para el formulario STUDENT
router.use('/users', usersRouter); 
// ADMIN borra TEACHER (y su USER) y STUDENT(y su USER) Borrar en b.1) -> PATCH /api/teachers/:teacher_id y PATCH /api/users/:user_id(=teacher_id_user) el campo 'deleted' se pone a 'SI'.
//     EL DELETE (lo convertimos en un PATCH) http://localhost:3333/api/users/:user_id  -> solo acesso ADMIN
// STUDENT actualiza sus datos de STUDENT y de USER -> PUT /api/students/:student_id y PUT /api/users/:user_id 
// OK- TEACHER actualiza sus datos de TEACHER y de USER-> PUT /api/teachers/:teach_id y PUT /api/users/:user_id
// ADMIN actualiza sus datos de ADMIN y de USER-> PUT /api/admin/:admin_id y PUT /api/users/:user_id


// http://localhost:3333/api/teachers
const apiTeachersRouter = require('./api/teachers'); // PUBLICO -> POST api/teachers -> formulario alta 
                                                    //  PUBLICO -> GET api/teachers/teachersnear 
router.use('/teachers',apiTeachersRouter); // PUBLICO DURANTE EL DESARROLLO                                
// PRODUCCION router.use('/teachers', checkToken, accesoTeachersORAdministrator,apiTeachersRouter); // EL Resto:logueados si son ADMIN y TEACHER tienen acceso
// ADMIN -> GET api/teachers/borrar b.1) -> ejecutar Proced/Funcion "Buscar-Teachers" y devolverlo al cliente
// ADMIN Borrar en b.1) -> PATCH /api/teachers/:teacher_id y PATCH /api/users/:user_id(=teacher_id_user) el campo 'deleted' se pone a 'SI'.
// ADMIN GET api/teachers/novalidados b.2)
// ADMIN  PATCH /api/teachers/:teacher_id y actualizamos el campo 'Validado' a 'SI'.
// TEACHER /api/teachers/board (tras el login)
// TEACHER En c.2) PATCH /api/teachers/:teacher_id el campo de teacher_deleted a 'SI' y user_deleted correspondiente a 'SI'
// OK-TEACHER (JOIN) se leen sus datos de TEACHER y de USER para mostrar el formualio de TEACHER-> GET /api/teachers/:teach_id(de ahi sacamos el user_id) y GET /api/users/:user_id
// OK-TEACHER actualiza sus datos de TEACHER y de USER-> PUT /api/teachers/:teach_id y PUT /api/users/:user_id


//// http://localhost:3333/api/students
const studentsRouter = require('./api/students'); // POST api/students -> formulario alta -> PUBLICO
router.use('/students', studentsRouter);// PRODUCCIÓN: router.use('/students', checkToken, studentsRouter); //LOGEADOS y -> control por verbos dentro de students.js
//GET /api/students/board (sólo STUDENT)
// Teachers listado de sus alumnos
// STUDENT (JOIN) se leen sus datos de STUDENT y de USER para mostrar el formualio de STUDENT-> GET /api/students/:student_id(de ahi sacamos el user_id) y GET /api/users/:user_id
// STUDENT actualiza sus datos de STUDENT y de USER -> PUT /api/students/:student_id y PUT /api/users/:user_id 


// http://localhost:3333/api/users/login
const loginRouter = require('./api/users'); // POST PUBLICO dentro de users.js
router.use('/users/login', loginRouter); // redireccion si user_type='ADMIN' a GET api/admin/board
// redireccion si user_type='STUDENT' a GET api/students/board
// redireccion si user_type='TEACHER' a GET /api/teachers/board

// http://localhost:3333/api/admin  // autorizacion: token valido y administrador
const adminRouter = require('./api/admins');
router.use('/admin',adminRouter);//PRODUCCION router.use('/admin',  checkToken, accesoAdministrator,adminRouter); //sólo administrador
// ADMIN actualiza sus datos de ADMIN y de USER-> PUT /api/admin/:admin_id y PUT /api/users/:user_id


// http://localhost:3333/api/enrollments
const enrollmentsRouter = require('./api/enrollments'); // Teachers GET, student POST..
//STUDENT -> POST /api/enrollments para matricularse  
//STUDENT -> PATCH /api/enrollments para valoració (campos de Valoración y Comentarios).
router.use('/enrollments',enrollmentsRouter);// PRODUCCION: router.use('/enrollments', checkToken,enrollmentsRouter);///LOGEADOS y -> control por verbos dentro de enrollments.js
//TEACHER -> c.1) GET /api/enrollments/studentsofateacher consulta los estudianes que tiene matriculado entre dos fechas determinadas.

const subjectsRouter = require('./api/subjects');
router.use('/subjects', subjectsRouter); 

module.exports = router;