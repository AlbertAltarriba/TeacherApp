const supertest_request = require("supertest"); //yarn add -D supertest
const app = require("../../app");
const {nuevoStudent} = require("../mock-data/new-user.js"); //el nuevo registro a añadir
const {updateStudent} = require("../mock-data/complete-new-user.js"); //el nuevo registro a añadir
const { createTestScheduler } = require("jest");
var funcionesUsers = require("../../routes/api/users");
const authHeaders ={Authorization: 'test'};

let endpointUrl ="/api/users/";
var firstTodo,nuevoAdminId,nuevoStudentId,nuevoTeacherId;

/*************************  STUDENT ************************************************************************************/

/*****  REGISTER STUDENT ***************** POST - INTEGRACION - REGISTER - USER Y STUDENT ******************/
describe("POST-INTEGRACIÓN -  STUDENT1: "+endpointUrl, ()=>{
    it("POST -  INTEGRADAS - REGISTER -STUDENT1 - CORRECTO: " + endpointUrl, async ()=>{
        endpointUrl="/api/users/register/";
        const response =  await supertest_request(app)
        .post(endpointUrl) //NO hacemos POST en Postman NI la extension de VSCode 'REST Client" en fichero peticiones.rest
        .send(nuevoStudent) // enviamos datos en el body del POST para que lo cree
        .set(authHeaders);
        expect(response.statusCode).toBe(200);
        expect(response._body[0].user_email).toStrictEqual(nuevoStudent.user_email);
        nuevoStudentId=response._body[0].student_id; // Guardamo la ultima inserción para hacer otras operaciones
        firstTodo=nuevoStudentId;
    })   

  
    it("POST -  INTEGRADAS - LOGIN -STUDENTS1 - CORRECTO: " + endpointUrl, async ()=>{
      endpointUrl="/api/users/login/";
      const response =  await supertest_request(app)
      .post(endpointUrl) //NO hacemos POST en Postman NI la extension de VSCode 'REST Client" en fichero peticiones.rest
      .send(nuevoStudent) // enviamos datos en el body del POST para que lo cree
      .set(authHeaders);
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toStrictEqual('Login correcto');
    }) 

    /*****  SELECT TODOS  STUDENTS ****** -INTEGRACIÓN -USER Y STUDENTS- *****************/
    it("GET ALL - STUDENTS - INTEGRACION-CORRECTO" + endpointUrl, async ()=>{
        endpointUrl="/api/students/";
        const response = await supertest_request(app)
        .get(endpointUrl) //hacemos GET en Postman o en la extension de VSCode 'REST Client" en fichero peticiones.rest
        .send({tipo_usuario: 'STUDENT'})
        .set(authHeaders);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body).toBeDefined();
        firstTodo=response.body[0];     
    }) 

    /*****  DELETE FAKE ADMIN - ****** PUT (DELETE FAKE) -INTEGRACIÓN -USER Y ADMIN- *****************/
      it(' DELETE FAKE - INTEGRACION'+endpointUrl , async()=>{
        /*****+ debe ejecutarse despues de GET ALL para que haya algun valor en fistTodo */
        endpointUrl="/api/students/";
        const response = await supertest_request(app)
        .delete(endpointUrl + 1)  
        .send() // SET DELTETED='SI'
        .set(authHeaders);
        expect(response.body.affectedRows).toBe(1);
        expect(response.statusCode).toBe(200);
    })


    /*****  MODIF ADMIN ****** PUT -INTEGRACIÓN -USER Y ADMIN- *****************/
    // Un admin creado como usuario y que sus campos estan vacíos. Se actualizan los datos sólo de Admins
    /*****+ debe ejecutarse despues de GET ALL para que haya algun valor en fistTodo */
    // PUT http://localhost:3333/api/users/register/admin/:admin_id'
    it(' MODIFI CAMPOS DE STUDENT TRAS ALTA USUARIO - INTEGRACION'+endpointUrl , async()=>{
      endpointUrl="/api/users/register/students/";
      const response = await supertest_request(app)
      .put(endpointUrl + 1)
      .send(updateStudent) // SET DELTETED='SI'
      .set(authHeaders);
      expect(response.ok).toBe(true);
      expect(response.statusCode).toBe(200);
    })

    // GET http://localhost:3333/api/students/23  -----  /** consultar un sólo usuario  */
    it("GET ONE - STUDENT  - INTEGRACION-CORRECTO" + endpointUrl, async ()=>{
      endpointUrl="/api/students/";
      const response = await supertest_request(app)
      .get(endpointUrl + 1)
      .send()
      .set(authHeaders);
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body).toBeDefined();
      expect(response.body[0].student_id).toBe(firstTodo.student_id);
    }) 
}) 

