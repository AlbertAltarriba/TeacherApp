const {nuevoEnroll,modificadoEnroll} = require("../mock-data/new-enrollments.js"); 
const supertest_request = require("supertest"); 
const app = require("../../app");
let endpointUrl ="";
let ultimoEnroll; 
let firstEnroll;
const authHeaders ={Authorization: 'test'};

var funcionesUsers = require("../../routes/api/users");
const {nuevoAdmin,nuevoTeacher} = require("../mock-data/new-user.js");
const nuevoSubjects = require("../mock-data/new-subjects.js"); 

var firstTodo,nuevoAdminId,nuevoStudentId,nuevoTeacherId;
const nonExistingTodoId = -5;

/******************* 1º desde WORKBENCH, CREAR LA BDD Y TABLAS - INTEGRACION ****************/

const {nuevoStudent} = require("../mock-data/new-user.js"); //el nuevo registro a añadir

/************************* ENROLLMENT ************************************************************************************/

/*****  REGISTER ENROLLMENT ***************** POST - INTEGRACION - ENROLLMENT ******************/
describe("POST-INTEGRACIÓN -  ENROLLMENT: "+endpointUrl,()=>{
    it("POST -  INTEGRADAS - REGISTER -ENROLLMENT - CORRECTO: " + endpointUrl, async ()=>{
        endpointUrl="/api/enrollments/";
        const response =  await supertest_request(app)
        .post(endpointUrl) 
        .send(nuevoEnroll) 
        .set(authHeaders);
        expect(response.statusCode).toBe(200);
        expect(response.ok).toStrictEqual(true);
        ultimoEnroll=response.body[0];
    }) 

  // MODIFICAR DATOS
    it("PUT -  INTEGRADAS - REGISTER -ENROLLMENT - CORRECTO: " + endpointUrl, async ()=>{
        // PUT http://localhost:3333/api/enrollments/1
        endpointUrl="/api/enrollments/";
        const response =  await supertest_request(app)
        .put(endpointUrl + 1)
        .send(modificadoEnroll) // enviamos datos en el body del POST para que lo cree
        .set(authHeaders);
        expect(response.statusCode).toBe(200);
        expect(response.ok).toStrictEqual(true);
    }) 

    it("GET -  INTEGRADAS - REGISTER -ENROLLMENT - CORRECTO: " + endpointUrl, async ()=>{
    /* GET http://localhost:3333/api/enrollments */
        endpointUrl="/api/enrollments/";
        const response =  await supertest_request(app)
        .get(endpointUrl) //NO hacemos POST en Postman NI la extension de VSCode 'REST Client" en fichero peticiones.rest
        .send() // enviamos datos en el body del POST para que lo cree
        .set(authHeaders);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body).toBeDefined();
        firstEnroll=response.body[0];  
    }) 

    /* DELETE http://localhost:3333/api/enrollments/:enrollmentId */
    it(' DELETE FAKE - ENROLLMENT - INTEGRACION'+endpointUrl , async()=>{
        /*****+ debe ejecutarse despues de GET ALL para que haya algun valor en fistTodo */
        endpointUrl="/api/enrollments/";
        const response = await supertest_request(app)
        .delete(endpointUrl + 1)  
        .send() // SET DELTETED='SI'
        .set(authHeaders);
        expect(response.body.affectedRows).toBe(1);
        expect(response.statusCode).toBe(200);
    })


    it("GET ONE BY ID  - INTEGRACION" + endpointUrl + ":todoId" ,async ()=>{
        endpointUrl="/api/enrollments/";
        const response = await supertest_request(app)
        .get( endpointUrl + 1) //hacemos POST en Postman o en la extension de VSCode 'REST Client" en fichero peticiones.rest
        .send()// enviamos datos en el body del POST para que lo cree
        .set(authHeaders);
        expect(response.statusCode).toBe(200);
        expect(response.body[0].enroll_id_teacher).toBe(firstEnroll.enroll_id_teacher);
        expect(response.body[0].enroll_id_student).toBe(firstEnroll.enroll_id_student);

    }) 
}) 


 


