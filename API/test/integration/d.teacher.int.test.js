const supertest_request = require("supertest"); //yarn add -D supertest
const app = require("../../app");
const {nuevoTeacher} = require("../mock-data/new-user.js"); //el nuevo registro a añadir
const {updateTeacher} = require("../mock-data/complete-new-user.js"); //el nuevo registro a añadir
var funcionesUsers = require("../../routes/api/users");
const authHeaders ={Authorization: 'test'}

let endpointUrl ="/api/users/";
const { createTestScheduler } = require("jest");
const nuevoSubjects = require("../mock-data/new-subjects.js"); //el nuevo registro a añadir
var firstTodo,nuevoAdminId,nuevoStudentId,nuevoTeacherId;
const nonExistingTodoId = -5;

/******************* 1º desde WORKBENCH, CREAR LA BDD Y TABLAS - INTEGRACION ****************/
/*************************  TEACHER ************************************************************************************/
/*****  REGISTER TEACHER ***************** POST - INTEGRACION - REGISTER - USER Y TEACHER ******************/
describe("POST-INTEGRACIÓN -  TEACHER1: "+endpointUrl, ()=>{
    it("POST -  INTEGRADAS - REGISTER -TEACHER1 - CORRECTO: " + endpointUrl, async ()=>{
        endpointUrl="/api/users/register/";
        const response =  await supertest_request(app)
        .post(endpointUrl) //NO hacemos POST en Postman NI la extension de VSCode 'REST Client" en fichero peticiones.rest
        .send(nuevoTeacher) // enviamos datos en el body del POST para que lo cree
        .set(authHeaders);
        expect(response.statusCode).toBe(200);
        expect(response.ok).toStrictEqual(true);
        nuevoTeacherId=response.body.teach_id; // Guardamo la ultima inserción para hacer otras operaciones
        firstTodo=nuevoTeacherId;
    }) 
    
    /*****  REGISTER STUDENT ****** POST-INTEGRACIÓN-ERROR -REGISTER-USER- CREAMOS ERRORES INTENCIONADOS *****************/
    it("POST - PRUEBAS INTEGRADAS AUTOMATIZADAS - - ERROR 500, falta un cammpo en el body del POST"+endpointUrl , async ()=>{
        endpointUrl="/api/users/register/";
        const response =  await supertest_request(app)
        .post(endpointUrl) //hacemos POST en Postman o en la extension de VSCode 'REST Client" en fichero peticiones.rest
        .send({title:"faltan campos requerido en el POST"}) // enviamos datos en el body del POST para que lo cree
        .set(authHeaders);
        expect(response.statusCode).toBe(500);
        expect(response.created).not.toBeTruthy(); //created:false
        expect(response.body.affectedRows).toBe(undefined);
    });

    /************* LOGIN REAL DE ADMIN Y USER   */
    it("POST -  INTEGRADAS - LOGIN -TEACHERS1 - CORRECTO: " + endpointUrl, async ()=>{
        endpointUrl="/api/users/login/";
        const response =  await supertest_request(app)
        .post(endpointUrl) //NO hacemos POST en Postman NI la extension de VSCode 'REST Client" en fichero peticiones.rest
        .send(nuevoTeacher) // enviamos datos en el body del POST para que lo cree
        .set(authHeaders);
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toStrictEqual('Login correcto');
    }) 

    /*****  SELECT TODOS  STUDENTS ****** -INTEGRACIÓN -USER Y STUDENTS- *****************/
    it("GET ALL - TEACHERS - INTEGRACION-CORRECTO" + endpointUrl, async ()=>{
        endpointUrl="/api/teachers/";
        const response = await supertest_request(app)
        .get(endpointUrl) //hacemos GET en Postman o en la extension de VSCode 'REST Client" en fichero peticiones.rest
        .send({tipo_usuario: 'TEACHER'})
        .set(authHeaders);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body).toBeDefined();
        firstTodo=response.body[0][0];     
    }) 

    /*****  DELETE FAKE ADMIN - ****** PUT (DELETE FAKE) -INTEGRACIÓN -USER Y ADMIN- *****************/
    it(' DELETE FAKE - INTEGRACION'+endpointUrl , async()=>{
        /*****+ debe ejecutarse despues de GET ALL para que haya algun valor en fistTodo */
        endpointUrl="/api/teachers/";
        const response = await supertest_request(app)
        .delete(endpointUrl + 1) 
        .send() // SET DELETED='SI'
        .set(authHeaders);
        expect(response.ok).toStrictEqual(true);
        expect(response.statusCode).toBe(200);
    })

    /*****  MODIF ADMIN ****** PUT -INTEGRACIÓN -USER Y ADMIN- *****************/
    // Un admin creado como usuario y que sus campos estan vacíos. Se actualizan los datos sólo de Admins
    /*****+ debe ejecutarse despues de GET ALL para que haya algun valor en fistTodo */
    // PUT http://localhost:3333/api/users/register/admin/:admin_id'
    it(' MODIFI CAMPOS DE TEACHER TRAS ALTA USUARIO - INTEGRACION'+endpointUrl , async()=>{
        endpointUrl="/api/users/register/teachers/";
        const response = await supertest_request(app)
        .put(endpointUrl + 1)  
        .send(updateTeacher) // SET DELTETED='SI'
        .set(authHeaders);
        expect(response.ok).toBe(true);
        expect(response.statusCode).toBe(200);
    })

// GET http://localhost:3333/api/teachers/1  -----  /** consultar un sólo usuario  */
    it("GET ONE - TEACHER  - INTEGRACION-CORRECTO" + endpointUrl, async ()=>{
        endpointUrl="/api/teachers/";
        const response = await supertest_request(app)
        .get(endpointUrl + 1)
        .send()
        .set(authHeaders);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body).toBeDefined();
        expect(response._body[0].teach_id).toBe(1);
    }) 
}) 

