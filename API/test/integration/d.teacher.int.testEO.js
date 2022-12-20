const supertest_request = require("supertest"); //yarn add -D supertest
const app = require("../../app");
const {nuevoTeacher} = require("../mock-data/new-user.js"); //el nuevo registro a añadir
const {updateTeacher} = require("../mock-data/complete-new-user.js"); //el nuevo registro a añadir
var funcionesUsers = require("../../routes/api/users");
const authHeaders ={Authorization: 'test'}

let endpointUrl ="/api/users/";

//const allTodos = require("../mock-data/all-todos.js");
//const modifiedData = { title: "Modificado otra vez con PUT", done: true };



const { createTestScheduler } = require("jest");
const nuevoSubjects = require("../mock-data/new-subjects.js"); //el nuevo registro a añadir

//const allTodos = require("../mock-data/all-todos.js");
var firstTodo,nuevoAdminId,nuevoStudentId,nuevoTeacherId;
const nonExistingTodoId = -5;
//const modifiedData = { title: "Modificado otra vez con PUT", done: true };

/******************* 1º desde WORKBENCH, CREAR LA BDD Y TABLAS - INTEGRACION ****************/



/*************************  TEACHER ************************************************************************************/

/*****  REGISTER TEACHER ***************** POST - INTEGRACION - REGISTER - USER Y TEACHER ******************/
describe("POST-INTEGRACIÓN -  TEACHER1: "+endpointUrl, ()=>{
    it("POST -  INTEGRADAS - REGISTER -TEACHER1 - CORRECTO: " + endpointUrl, async ()=>{
        console.log('TEST---------POST - INTEGRACION');
        endpointUrl="/api/users/register/";
        console.log(endpointUrl);
        console.log(endpointUrl);
        console.log('------------NUEVO TEACHER:');
        console.log(nuevoTeacher);
        const response =  await supertest_request(app)
        .post(endpointUrl) //NO hacemos POST en Postman NI la extension de VSCode 'REST Client" en fichero peticiones.rest
        .send(nuevoTeacher) // enviamos datos en el body del POST para que lo cree
        .set(authHeaders);
        console.log('----------------------------------const response =  await supertest_request(app-------------------------------------------:');

        console.log(response);

        expect(response.statusCode).toBe(200);
        expect(response.ok).toStrictEqual(true);
        nuevoTeacherId=response.body.teach_id; // Guardamo la ultima inserción para hacer otras operaciones
        firstTodo=nuevoTeacherId;
    }) 
    
    /*****  REGISTER STUDENT ****** POST-INTEGRACIÓN-ERROR -REGISTER-USER- CREAMOS ERRORES INTENCIONADOS *****************/
    it("POST - PRUEBAS INTEGRADAS AUTOMATIZADAS - - ERROR 500, falta un cammpo en el body del POST"+endpointUrl , async ()=>{
    console.log('TEST---------POST - ERROR - 404 - INTEGRACION');
    endpointUrl="/api/users/register/";
    const response =  await supertest_request(app)
    .post(endpointUrl) //hacemos POST en Postman o en la extension de VSCode 'REST Client" en fichero peticiones.rest
    .send({title:"faltan campos requerido en el POST"}) // enviamos datos en el body del POST para que lo cree
   // console.log('@@@@@@@@@@@@@@@@@@@@@@@LA RESPEUESTA DE LLAMAR A SUPERTEST_REQUEST ES: ', response);
    .set(authHeaders);
    expect(response.statusCode).toBe(500);
    expect(response.created).not.toBeTruthy(); //created:false
    expect(response.body.affectedRows).toBe(undefined);
    });//en Mongo es "response._boy" y en Mysql es "response.body"

    /************* LOGIN REAL DE ADMIN Y USER   */

    // El ultimo alta de usuario:
    //nuevoAdmin.user_email
    //nuevoAdmin.user_password
    it("POST -  INTEGRADAS - LOGIN -TEACHERS1 - CORRECTO: " + endpointUrl, async ()=>{
    console.log('TEST---------POST - INTEGRACION');
    endpointUrl="/api/users/login/";
    //  console.log('---valor de endpointUrl para registrar un administrador');
    console.log(endpointUrl)
    const response =  await supertest_request(app)
    .post(endpointUrl) //NO hacemos POST en Postman NI la extension de VSCode 'REST Client" en fichero peticiones.rest
    .send(nuevoTeacher) // enviamos datos en el body del POST para que lo cree
    .set(authHeaders);
    //console.log('@@@@@@@@@@@@@@@@@@@@@@@LA RESPEUESTA DE LLAMAR A SUPERTEST_REQUEST ES: ', response);
    // response.text ->  [{"fieldCount":0,"affectedRows":1,"insertId":13,"info":"","serverStatus":2,"warningStatus":0},null]
    // console.log('@@@@@@@@@@@@@@@@@@@@@@@ Numero de filas afectadas ',response.body[0].affectedRows);
    // console.log('@@@@@@@@@@@@@@@@@@@@@@@ Respuesta tras el POST REGISTER ADMIN ',response.body);
    // console.log('@@@@@@@@@@@@@@@@@@@@@@@ Estado tras POST REGISTER ADMIN ',response.statusCode);
    // console.log('@@@@@@@@@@@@@@@@@@@@@@@ response tras POST REGISTER ADMIN ',response);
    expect(response.statusCode).toBe(200);
    // console.log('==================================== respnse del LOGIIN ======================== ',response.body);
    expect(response.body.success).toStrictEqual('Login correcto');
    // expect(response.body.user_username).toStrictEqual(nuevoAdmin.user_username);
    // nuevoAdminId=response.body.admin_id; // Guardamo la ultima inserción para hacer otras operaciones
    }) 

    /*****  SELECT TODOS  STUDENTS ****** -INTEGRACIÓN -USER Y STUDENTS- *****************/
  it("GET ALL - TEACHERS - INTEGRACION-CORRECTO" + endpointUrl, async ()=>{
      console.log('TEST---------GET ALL- TEACHERS - INTEGRACION');
      endpointUrl="/api/teachers/";
      const response = await supertest_request(app)
      .get(endpointUrl) //hacemos GET en Postman o en la extension de VSCode 'REST Client" en fichero peticiones.rest
      .send({tipo_usuario: 'TEACHER'})
      .set(authHeaders);
      //console.log('@@@@@@@@@@@   GET ALL - INTEGRACION-CORRECTO @@@@@@@@@@@@  respuesta lectura ',response.body);
     // console.log('TEST---------POST - INTEGRACION------------------ RESPONSE---------------------------------&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&---------------------------------------------');
     // console.log(response);
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body).toBeDefined();
      firstTodo=response.body[0][0];     
   }) 

    /*****  DELETE FAKE ADMIN - ****** PUT (DELETE FAKE) -INTEGRACIÓN -USER Y ADMIN- *****************/
    it(' DELETE FAKE - INTEGRACION'+endpointUrl , async()=>{
    /*****+ debe ejecutarse despues de GET ALL para que haya algun valor en fistTodo */
    console.log('TEST---------DELETE FAKE - INTEGRACION');
    console.log("---------DELETE FAKE A: ---firstTodo &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&------ en DELETE---&&&&: ");
    console.log(firstTodo);
    endpointUrl="/api/teachers/";
    const response = await supertest_request(app)
    //.delete(endpointUrl + firstTodo.teach_id)  
    .delete(endpointUrl + 1) 
    .send() // SET DELETED='SI'
    .set(authHeaders);
    //console.log('TEST---------POST - INTEGRACION------------------ RESPONSE------------DELETE FAKE---------------------&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&---------------------------------------------');
    //console.log(response);
    expect(response.ok).toStrictEqual(true);
    expect(response.statusCode).toBe(200);
    })


/*****  MODIF ADMIN ****** PUT -INTEGRACIÓN -USER Y ADMIN- *****************/
// Un admin creado como usuario y que sus campos estan vacíos. Se actualizan los datos sólo de Admins
/*****+ debe ejecutarse despues de GET ALL para que haya algun valor en fistTodo */
// PUT http://localhost:3333/api/users/register/admin/:admin_id'
it(' MODIFI CAMPOS DE TEACHER TRAS ALTA USUARIO - INTEGRACION'+endpointUrl , async()=>{
/*****+ debe ejecutarse despues de GET ALL para que haya algun valor en fistTodo */
console.log('TEST---------MODIFIC TEACHER - INTEGRACION');
console.log(updateTeacher); // NO actualizamos: admin_di ni admin_id_user,
//endpointUrl="/api/users/register/admin/";
 endpointUrl="/api/users/register/teachers/";
const response = await supertest_request(app)
.put(endpointUrl + 1)  
//.put(endpointUrl + firstTodo.teach_id)  
.send(updateTeacher) // SET DELTETED='SI'
.set(authHeaders);
//console.log('---- resultado de MODIFICAR DATOS DE TEACHER--------------------------¬&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&-');
//console.log(response);
//expect(response.body.affectedRows).toBe(1);
expect(response.ok).toBe(true);
expect(response.statusCode).toBe(200);
})

// GET http://localhost:3333/api/teachers/23  -----  /** consultar un sólo usuario  */
it("GET ONE - TEACHER  - INTEGRACION-CORRECTO" + endpointUrl, async ()=>{
console.log('TEST---------GET ONE- TEACHER ------ INTEGRACION');
endpointUrl="/api/teachers/";
const response = await supertest_request(app)
.get(endpointUrl + f1)
//.get(endpointUrl + firstTodo.teach_id) //hacemos GET en Postman o en la extension de VSCode 'REST Client" en fichero peticiones.rest
.send()
.set(authHeaders);
//console.log('@@@@@@@@@@@   GET ONE - INTEGRACION-CORRECTO @@@@@@@@@@@@  respuesta lectura ',response.body[0]);
expect(response.statusCode).toBe(200);
expect(Array.isArray(response.body)).toBeTruthy();
expect(response.body).toBeDefined();
//console.log('@@@@@@@@@@@   GET ONE - INTEGRACION-CORRECTO @@@@@@@@@@@@  respuesta lectura ',firstTodo.teach_id);
expect(response.body[0].teach_id).toBe(firstTodo.teach_id);
}) 
}) 

