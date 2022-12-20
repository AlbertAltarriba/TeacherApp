const {nuevoEnroll,modificadoEnroll} = require("../mock-data/new-enrollments.js"); //el nuevo registro a añadir
const supertest_request = require("supertest"); //yarn add -D supertest
const app = require("../../app");
let endpointUrl ="";
let ultimoEnroll; //=nuevoEnroll;
let firstEnroll;
const authHeaders ={Authorization: 'test'};

 
var funcionesUsers = require("../../routes/api/users");
const {nuevoAdmin,nuevoTeacher} = require("../mock-data/new-user.js"); //el nuevo registro a añadir
const nuevoSubjects = require("../mock-data/new-subjects.js"); //el nuevo registro a añadir

//const allTodos = require("../mock-data/all-todos.js");
var firstTodo,nuevoAdminId,nuevoStudentId,nuevoTeacherId;
const nonExistingTodoId = -5;
//const modifiedData = { title: "Modificado otra vez con PUT", done: true };

/******************* 1º desde WORKBENCH, CREAR LA BDD Y TABLAS - INTEGRACION ****************/

const {nuevoStudent} = require("../mock-data/new-user.js"); //el nuevo registro a añadir


/************************* ENROLLMENT ************************************************************************************/

/*****  REGISTER ENROLLMENT ***************** POST - INTEGRACION - ENROLLMENT ******************/
describe("POST-INTEGRACIÓN -  ENROLLMENT: "+endpointUrl,()=>{
    it("POST -  INTEGRADAS - REGISTER -ENROLLMENT - CORRECTO: " + endpointUrl, async ()=>{
        // POST http://localhost:3333/api/enrollments
        console.log('TEST---------POST - INTEGRACION');
        endpointUrl="/api/enrollments/";
       //  console.log('---valor de endpointUrl para registrar un administrador');
        console.log(endpointUrl)
        const response =  await supertest_request(app)
        .post(endpointUrl) //NO hacemos POST en Postman NI la extension de VSCode 'REST Client" en fichero peticiones.rest
        .send(nuevoEnroll) // enviamos datos en el body del POST para que lo cree
        .set(authHeaders);
        expect(response.statusCode).toBe(200);
        expect(response.ok).toStrictEqual(true);
        ultimoEnroll=response.body[0];
    }) 

  // MODIFICAR DATOS
  it("PUT -  INTEGRADAS - REGISTER -ENROLLMENT - CORRECTO: " + endpointUrl, async ()=>{
    // PUT http://localhost:3333/api/enrollments/1
    console.log('TEST---------PUT ENROLLMENT - INTEGRACION');
    endpointUrl="/api/enrollments/";
   //  console.log('---valor de endpointUrl para registrar un administrador');
    console.log(endpointUrl)
    const response =  await supertest_request(app)
    //.put(endpointUrl + ultimoEnroll.enroll_id) //NO hacemos POST en Postman NI la extension de VSCode 'REST Client" en fichero peticiones.rest
    .put(endpointUrl + 1)
    .send(modificadoEnroll) // enviamos datos en el body del POST para que lo cree
    .set(authHeaders);
    console.log('TEST---------PUT ENROLLMENT - INTEGRACION ---- response');
   // console.log(response);
    expect(response.statusCode).toBe(200);
    expect(response.ok).toStrictEqual(true);
    }) 

 /**** LISTAR DE TODOS LOS ALUMOS DE UN PROFE por orden de inicio matrñicula DESC (por más reciente) sin limite de fechas
los 20 primeros LIMIT */

    it("GET -  INTEGRADAS - REGISTER -ENROLLMENT - CORRECTO: " + endpointUrl, async ()=>{
    /* GET http://localhost:3333/api/enrollments */
        console.log('TEST---------GET ENROLLMENT - INTEGRACION');
        endpointUrl="/api/enrollments/";
    //  console.log('---valor de endpointUrl para registrar un administrador');
        console.log(endpointUrl)
        const response =  await supertest_request(app)
        .get(endpointUrl) //NO hacemos POST en Postman NI la extension de VSCode 'REST Client" en fichero peticiones.rest
        .send() // enviamos datos en el body del POST para que lo cree
        .set(authHeaders);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body).toBeDefined();
        firstEnroll=response.body[0];  
       // console.log('----------- FIRST ENROLL-----------------');
        //console.log(response.body[0]);

        // expect(response.statusCode).toBe(200);
        // expect(response.ok).toStrictEqual(true);
    }) 


    /* GET http://localhost:3333/api/enrollments/students/:studentId */
    it("GET ONE -studentId-  INTEGRADAS - REGISTER -ENROLLMENT - CORRECTO: " + endpointUrl, async ()=>{
        /* GET http://localhost:3333/api/enrollments/students/:studentId */
        console.log('TEST---------GET ONE STUDENT ENROLLMENT - INTEGRACION');
        endpointUrl="/api/enrollments/students/";
    //  console.log('---valor de endpointUrl para registrar un administrador');
        console.log(endpointUrl)
        const response =  await supertest_request(app)
        .get(endpointUrl + 1) //NO hacemos POST en Postman NI la extension de VSCode 'REST Client" en fichero peticiones.rest
        .send() // enviamos datos en el body del POST para que lo cree
        .set(authHeaders);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body).toBeDefined();
        }) 


    /* GET http://localhost:3333/api/enrollments/teachers/:teacherId */
    it("GET ONE -teacherId-  INTEGRADAS - REGISTER -ENROLLMENT - CORRECTO: " + endpointUrl, async ()=>{
    /* GET http://localhost:3333/api/enrollments/teachers/:teacherId */
    console.log('TEST---------GET ONE TEACHERID ENROLLMENT - INTEGRACION');
        endpointUrl="/api/enrollments/teachers/";
    //  console.log('---valor de endpointUrl para registrar un administrador');
        console.log(endpointUrl)
        const response =  await supertest_request(app)
        .get(endpointUrl + 1) //NO hacemos POST en Postman NI la extension de VSCode 'REST Client" en fichero peticiones.rest
        .send() // enviamos datos en el body del POST para que lo cree
        .set(authHeaders);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body).toBeDefined();
        }) 

    /* DELETE http://localhost:3333/api/enrollments/:enrollmentId */
    it(' DELETE FAKE - ENROLLMENT - INTEGRACION'+endpointUrl , async()=>{
        /*****+ debe ejecutarse despues de GET ALL para que haya algun valor en fistTodo */
        console.log('TEST---------DELETE FAKE - INTEGRACION');
        // console.log("---------DELETE FAKE A: ---firstTodo: ");
        // console.log(firstEnroll);
        endpointUrl="/api/enrollments/";
        const response = await supertest_request(app)
        .delete(endpointUrl + 1)  
        .send() // SET DELTETED='SI'
        .set(authHeaders);
        expect(response.body.affectedRows).toBe(1);
        expect(response.statusCode).toBe(200);
    })


    it("GET ONE BY ID  - INTEGRACION" + endpointUrl + ":todoId" ,async ()=>{
        console.log('TEST--------GET ON BY ID - INTEGRACION');
        endpointUrl="/api/enrollments/";
        // poner un res.params.id =9
        const response = await supertest_request(app)
        .get( endpointUrl + 1) //hacemos POST en Postman o en la extension de VSCode 'REST Client" en fichero peticiones.rest
        .send()// enviamos datos en el body del POST para que lo cree
        .set(authHeaders);
        console.log("--------**************---  GET ON BY ID OK ---- DESPUES LEER POR ID :");
        console.log(response.body);
        expect(response.statusCode).toBe(200);
        // expect(typeof response.body).toBe("array");
        //expect(Array.isArray(response.body)).toBeTruthy();
      //  expect(response.body.enroll_id).toBe(firstTodo.enroll_id);
        expect(response.body[0].enroll_id_teacher).toBe(firstEnroll.enroll_id_teacher);
        expect(response.body[0].enroll_id_student).toBe(firstEnroll.enroll_id_student);

    }) 
}) 


 


