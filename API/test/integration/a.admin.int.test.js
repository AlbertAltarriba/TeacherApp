
const { createTestScheduler } = require("jest");
const supertest_request = require("supertest"); //yarn add -D supertest
const app = require("../../app");
var funcionesUsers = require("../../routes/api/users");
const {nuevoAdmin} = require("../mock-data/new-user.js"); //el nuevo registro a añadir
const {updateAdmin} = require("../mock-data/complete-new-user.js"); //el nuevo registro a añadir
const authHeaders ={Authorization: 'test'};


var firstTodo,nuevoAdminId,nuevoStudentId,nuevoTeacherId;
const nonExistingTodoId = -5;

let endpointUrl ="/api/users/";
/******************* 1º desde WORKBENCH, CREAR LA BDD Y TABLAS - INTEGRACION ****************/
/*****  REGISTER ADMIN ********* POST - INTEGRACION - REGISTER - USER Y ADMIN *************/
describe("POST-INTEGRACIÓN -  ADMIN1: "+endpointUrl,()=>{
    it("POST -  INTEGRADAS - REGISTER -ADMIN1 - CORRECTO: " + endpointUrl, async ()=>{
        console.log('TEST---------POST - INTEGRACION');
        endpointUrl="/api/users/register/";
        const response =  await supertest_request(app)
        .post(endpointUrl) 
        .send(nuevoAdmin) 
        .set(authHeaders);
        expect(response.statusCode).toBe(200);
        expect(response.body[0].user_email).toEqual(nuevoAdmin.user_email);
        expect(response.body[0].user_username).toEqual(nuevoAdmin.user_username);
    nuevoAdminId=response.body[0].admin_id; // Guardamo la ultima inserción para hacer otras operaciones
    }) 
    
  /*****  REGISTER ADMIN ****** POST-INTEGRACIÓN-ERROR -REGISTER-USER- CREAMOS ERRORES INTENCIONADOS *****************/
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
  it("POST -  INTEGRADAS - LOGIN -ADMIN1 - CORRECTO: " + endpointUrl, async ()=>{
    endpointUrl="/api/users/login/";
    const response =  await supertest_request(app)
    .post(endpointUrl) //NO hacemos POST en Postman NI la extension de VSCode 'REST Client" en fichero peticiones.rest
    .send(nuevoAdmin) // enviamos datos en el body del POST para que lo cree
    .set(authHeaders);
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toStrictEqual('Login correcto');
 }) 


  /*****  SELECT TODOS  ADMIN ****** -INTEGRACIÓN -USER Y ADMIN- *****************/
      it("GET ALL - ADMIN - INTEGRACION-CORRECTO" + endpointUrl, async ()=>{
          endpointUrl="/api/admin/";
          const response = await supertest_request(app)
          .get(endpointUrl) //hacemos GET en Postman o en la extension de VSCode 'REST Client" en fichero peticiones.rest
          .send({tipo_usuario: 'ADMIN'})
          .set(authHeaders);
          expect(response.statusCode).toBe(200);
          expect(Array.isArray(response.body)).toBeTruthy();
          expect(response.body).toBeDefined();
          firstTodo=response.body[0][0];     
      }) 

  /*****  DELETE FAKE ADMIN - ****** PUT (DELETE FAKE) -INTEGRACIÓN -USER Y ADMIN- *****************/
    it(' DELETE FAKE - INTEGRACION'+endpointUrl , async()=>{
      /*****+ debe ejecutarse despues de GET ALL para que haya algun valor en fistTodo */
      endpointUrl="/api/admin/";
      const response = await supertest_request(app)
      .delete(endpointUrl + firstTodo.admin_id)  
      .send() // SET DELTETED='SI'
      .set(authHeaders);
      expect(response.body.affectedRows).toBe(1);
      expect(response.statusCode).toBe(200);
  })

  
    /*****  MODIF ADMIN ****** PUT -INTEGRACIÓN -USER Y ADMIN- *****************/
    /*****+ debe ejecutarse despues de GET ALL para que haya algun valor en fistTodo */
    // PUT http://localhost:3333/api/users/register/admin/:admin_id'
    it(' MODIFI CAMPOS DE ADMIN TRAS ALTA USUARIO - INTEGRACION'+endpointUrl , async()=>{
      /*****+ debe ejecutarse despues de GET ALL para que haya algun valor en fistTodo */
      endpointUrl="/api/users/register/admin/";
      const response = await supertest_request(app)
      .put(endpointUrl + firstTodo.admin_id)  
      .send(updateAdmin); // SET DELTETED='SI'
      expect(response.ok).toBe(true);
      expect(response.statusCode).toBe(200);
    })

    // GET http://localhost:3333/api/admin/23  -----  /** consultar un sólo usuario  */
  it("GET ONE - ADMIN - INTEGRACION-CORRECTO" + endpointUrl, async ()=>{
    endpointUrl="/api/admin/";
    const response = await supertest_request(app)
    .get(endpointUrl + firstTodo.admin_id) //hacemos GET en Postman o en la extension de VSCode 'REST Client" en fichero peticiones.rest
    .send()
    .set(authHeaders);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body).toBeDefined();
    expect(response.body[0].admin_id).toBe(firstTodo.admin_id);
  }) 
})


