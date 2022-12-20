const nuevoSubjects = require("../mock-data/new-subjects.js");
const supertest_request = require("supertest"); 
const app = require("../../app");
const { createTestScheduler } = require("jest");
var funcionesUsers = require("../../routes/api/users");
const authHeaders ={Authorization: 'test'};

const {nuevoAdmin} = require("../mock-data/new-user"); 


var firstSubject,nuevoAdminId,nuevoStudentId,nuevoTeacherId;
const nonExistingTodoId = -5;

let endpointUrl ="";

/*************************  SUBJECT ************************************************************************************/

    /*****  REGISTER SUBJECT ***************** POST - INTEGRACION - REGISTER - SUBJECT ******************/
  describe("POST-INTEGRACIÓN -  SUBJECT: "+endpointUrl, ()=>{
      it("POST -  INTEGRADAS - LOGIN -ADMIN1 - CORRECTO: " + endpointUrl, async ()=>{
        endpointUrl="/api/users/login/";
        const response =  await supertest_request(app)
        .post(endpointUrl) //NO hacemos POST en Postman NI la extension de VSCode 'REST Client" en fichero peticiones.rest
        .send(nuevoAdmin) // enviamos datos en el body del POST para que lo cree
        .set(authHeaders);
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toStrictEqual('Login correcto');
  }) 
     
      it("POST -  INTEGRADAS - REGISTER -SUBJECT 0 - CORRECTO: " + endpointUrl, async ()=>{
          endpointUrl="/api/subjects/";
          const response =  await supertest_request(app)
          .post(endpointUrl) //NO hacemos POST en Postman NI la extension de VSCode 'REST Client" en fichero peticiones.rest
          .send(nuevoSubjects[0]) // enviamos datos en el body del POST para que lo cree
          .set(authHeaders);
           expect(response.statusCode).toBe(200);
          expect(response.body.affectedRows).toBe(1);
      }) 

  // MODIFICAR DATOS
      it("PUT -INTEGRACIÓN -  SUBJECT: " + endpointUrl, async ()=>{
          endpointUrl="/api/subjects/";
          const response =  await supertest_request(app)
          .put(endpointUrl + 1)
          .send({subj_name:"Mofificado"}) // enviamos datos en el body del POST para que lo cree
          .set(authHeaders);
          expect(response.statusCode).toBe(200);
          expect(response.ok).toStrictEqual(true);
        }) 

 /**** LISTAR DE TODOS LOS ALUMOS DE UN PROFE por orden de inicio matrñicula DESC (por más reciente) sin limite de fechas
los 20 primeros LIMIT */

      it("GET -  INTEGRADAS - SUBJECTS- CORRECTO: " + endpointUrl, async ()=>{
          endpointUrl="/api/subjects/";
          const response =  await supertest_request(app)
          .get(endpointUrl) //NO hacemos POST en Postman NI la extension de VSCode 'REST Client" en fichero peticiones.rest
          .send() // enviamos datos en el body del POST para que lo cree
          .set(authHeaders);
          expect(response.statusCode).toBe(200);
          expect(Array.isArray(response.body)).toBeTruthy();
          expect(response.body).toBeDefined();
          firstSubject=response.body[0][0];  
      }) 

/* GET http://localhost:3333/api/subjects/:subjectId */
      it("GET ONE -studentId-  INTEGRADAS - SUBJECT - CORRECTO: " + endpointUrl, async ()=>{
          endpointUrl="/api/subjects/";
          const response =  await supertest_request(app)
          .get(endpointUrl + 1) //NO hacemos POST en Postman NI la extension de VSCode 'REST Client" en fichero peticiones.rest
          .send() // enviamos datos en el body del POST para que lo cree
          .set(authHeaders);
          expect(response.statusCode).toBe(200);
          expect(Array.isArray(response.body)).toBeTruthy();
          expect(response.body).toBeDefined();
      }) 
}) 
