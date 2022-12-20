<<<<<<< HEAD
# appTFM

## Grupo TFM Full Stack Developer. UNIR

### Bienvenid@ al repositorio

Iremos creando el trabajo de fin de master. Colgaremos la documentación y los avances del mismo.

### Buenas practicas para comitear 

https://midu.dev/buenas-practicas-escribir-commits-git/
=======
## Instalación del backend de Appteachers


Descargar este código en tu directorio de trabajo actual.

```sh
git clone https://github.com/wyyy/xx.git
cd xxxx
yarn install
```

Instalar mysql en tu computadora y abrir el fichero Appteacherssql 
```sh
Abrir un cliente de MySQL como Workbench/HeidiSQL/phpmyadmin...
En Workbench: File. Run SQL Script
Ir a la carpeta bdd del proyecto
Seleccionar Appteacher.sql
```

Ejecutar los test de integración y creación del administrador
```sh
yarn run test
```
El control de acceso a cada ruta se permite en función del tipo de usuario ('ADMIN','STUDENT','TEACHER') y en función de si se enviar en la cabecera 'authoritation' en token en vigor y creado en el login del usuario. Las rutas con el token válido y permiso para acceder, accederan sin problemas. En caso contrario, el acceso está prohibido.
Al realizar el login, se crea el cookie 'token' con un token válido que debe enviarse como 'authorization' en cada acceso a una API. El tiempo en el que el 'token' es válido se indica en el fichero .env. En producción puede ser de 1h, pero en desarrollo debe de ser mayor para facilitar el trabajo de los desarrolladores de la parte cliente.

Si observas algún error, por favor, comunícalo. Por cierto, también puedes realizar pruebas manuales de las apis usando el fichero "peticiones.rest" dentro del Visual Studio Code usando la extensión "REST Client"



> "Hay una fuerza motriz más poderosa que el vapor,
> la electricidad y la energía atómica: la voluntad"
> Albert Einstein

La siguiente tabla explica las APIs que ofrece el backend para ser llamadas desde un software cliente o Postman, por ejemplo.
Añadimos antes de la API la url del servidor con su puerto. Por ejemplo: http://localhost:3333
Los campos booleanos son del tipo SET('SI','NO')
### Listado de APIs 
| Acceso | HTTP | Ruta | Acción |
| ------| ------ | ------ |------ |
| PUBLICO| GET | /api?materia='LENGUA'&cp='46702' | ¿lo mismo que abajo?| 
| PUBLICO| GET | /api/teachers/teachersnear?materia='LENGUA'&cp='46702' | Muestra los profesores cercanos (por Código Postal) y que imparten la materia seleccionada. Los muestra por orden de mayor valoración| 
| PUBLICO| POST| /api/users/register | Crea un usuario con los campos comunes a Administracor/Estudiante/Profesor  {user_email,user_password,user_username,user_type,user_deleted}. Devuelve información al cliente y éste rellena el resto de campos desde un formulario y los envía como a la dirección de abajo:| 
| PUBLICO| PUT | /api/users/register/admin/1  |  {admin_name,admin_zip,admin_address,admin_phone,admin_city}| 
| PUBLICO| PUT | /api/users/register/student/1  | {student_name,student_zip,student_address,student_phone,student_city}| 
| PUBLICO| PUT | /api/users/register/teacher/1  | {teach_name,teach_zip,teach_address,teach_phone,teach_city,teach_price_an_hour,teach_description,teach_experience_years,teach_validated,teach_id_subject}|
| PUBLICO|POST | /api/users/login | {user_email,user_password} Sirve para Administradores/Estudiantes/Profesores|

### APIs para el usuario Student:

| Acceso | HTTP | Ruta | Acción |
| ------ | ------ | ------ |------ |
| PUBLICO| GET | /api/students  | Consulta todos los estudiantes| 
| PUBLICO| GET | /api/students/1  | Consulta del student por nº de 'student_id'| 
| PUBLICO| PUT | /api/students/1  | Actualiza los datos del student con 'student_id' a 1 -> {student_name,student_id(pk),student_zip,student_address,student_phone,student_city,student_id_user(fk),user_id(pk),user_email,user_password,user_username,user_type('ADMIN','STUDENT','TEACHER'),user_deleted('SI,'NO'). Los campos pk(Primary Key) y fk(Foreign Key) no son modificables| 
| PUBLICO| DELETE | /api/students/1   | Marca el campo user_deleted a 'SI'| 

### APIs para el usuario Admin:

| Acceso | HTTP | Ruta | Acción |
| ------ | ------ | ------ |------ |
| ADMIN | GET | /api/admin  | Consulta todos los estudiantes| 
| ADMIN | GET | /api/admin/1  | Consulta del student por nº de 'student_id'| 
| ADMIN | PUT | /api/admin/1  | Actualiza los datos del student con 'student_id' a 1 -> {student_name,student_id(pk),student_zip,student_address,student_phone,student_city,student_id_user(fk),user_id(pk),user_email,user_password,user_username,user_type('ADMIN','STUDENT','TEACHER'),user_deleted('SI,'NO'). Los campos pk(Primary Key) y fk(Foreign Key) no son modificables| 
| ADMIN| DELETE | /api/admin/1   | Marca el campo user_deleted a 'SI'| 

### APIs para el usuario Enrollments 
(Matrícula de un alumno a las clases de un profesor)
| Acceso | HTTP | Ruta | Acción |
| ------ | ------ | ------ |------ |
| PUBLICO| POST | /api/enrollments  | Matrícula de un alumno a un profesor -> {enroll_id(pk),enroll_start_date,enroll_end_date,enroll_comments,enroll_assessment,enroll_id_student(fk),enroll_id_teacher(fk),enroll_deleted}| 
| PUBLICO| GET | /api/enrollments  | Consulta todos los estudiantes| 
| PUBLICO| POST | /api/enrollments  | Consulta todos los estudiantes| 
| PUBLICO| POST | /api/enrollments  | Consulta todos los estudiantes| 
| PUBLICO| POST | /api/enrollments  | Consulta todos los estudiantes| 
| PUBLICO| POST | /api/enrollments  | Consulta todos los estudiantes| 


### APIs para el usuario Teachers:

| Acceso | HTTP | Ruta | Acción |
| ------ | ------ | ------ |------ |
| PUBLICO| GET | /api/teachers  | Consulta todos los profesores| 
| PUBLICO| GET | /api/teachers/1  | Consulta de un profesor por nº de 'teach_id'| 
| PUBLICO| PUT | /api/teachers/1  | Actualiza los datos del profesor con 'teach_id' a 1 -> {teach_name,teach_id(pk),teach_zip,teach_price_an_hour DECIMAL(10,2),teach_description,teach_experience_years(natural),teach_address,teach_phone,teach_city,teach_id_user(fk),teach_validated('SI,'NO'),user_id(pk),user_email,user_password,user_username,user_type('ADMIN','STUDENT','TEACHER'),user_deleted('SI,'NO'). Los campos pk(Primary Key) y fk(Foreign Key) no son modificables| 
| PUBLICO| DELETE | /api/teachers/1   | Marca el campo user_deleted a 'SI'| 


## Trabajo Final del Master de la [UNIR](https://www.unir.net/)
**Mater en FullStack Developer**
>>>>>>> c812f18 (primera version)
