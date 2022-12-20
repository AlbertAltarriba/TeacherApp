// TeacherS
type TipoTeacherCompleto={
    user_id:string,
    user_email?: string,
    user_password?: string,
    user_type: string,
    user_deleted: string,

    teach_id: string,
    teach_name: string,
    teach_zip: string,
    teach_address: string,
    teach_phone: string,
    teach_city: string,
    teach_last_name:string,
    teach_image?:string,
    teach_price_an_hour:string,
    teach_description:string,
    teach_experience_years:string,
    teach_validated: string,
    teach_id_user:string,
    teach_id_subject:string
}; 
type TipoTeacher={
    teach_id: string,
    teach_name: string,
    teach_zip: string,
    teach_address: string,
    teach_phone: string,
    teach_city: string,
    teach_price_an_hour:string,
    teach_description:string,
    teach_experience_years:string,
    teach_last_name:string,
    teach_image?:string,
    teach_validated: string,
    teach_id_user:string,
    teach_id_subject:string
};
type TipoUser={
    user_id:string,
     user_email?: string,
     user_password?: string,
     user_type: string,
     user_deleted: string
   };
const userModelito = require("../models/user");

require("../models/teacher");

const getTeacherNearByCPandSubject:Function= async (cp:string,subject:string) =>{
    const consulta:string='SELECT s.subj_name as Materia, t.teach_name as Profesor, t.teach_city as Ciudad, t.teach_zip as CP, avg(e.enroll_assessment) as Valoracion FROM Appteachers.Teachers As t JOIN AppTeachers.Subjects as s ON s.subj_id=t.teach_id_subject and s.subj_name='+ subject.toString() +' JOIN Appteachers.Users AS u ON u.user_id=t.teach_id_user JOIN Appteachers.Enrollments as e ON e.enroll_id_teacher=t.teach_id WHERE (u.user_deleted ="NO" and t.teach_validated = "SI" and t.teach_zip= '+cp.toString()+') GROUP BY Materia, Profesor, Ciudad, CP ORDER BY Valoracion DESC';
    const rows = await db.query(consulta);
    return rows; 
}
  
const getTeacherById:Function= async (teach_id:number) => {
    return await db.query('select * from Appteachers.Teachers where teach_id = ?',[teach_id]);
}
const getDataTeacherAndUser:Function = async (teach_id:number) =>{
const result=await db.query('select * from Appteachers.Teachers JOIN Appteachers.Users ON user_id=teach_id_user where teach_id = ?',[teach_id]);
   return result[0];
}
const updateDataTeacherAndUser:Function = async({teach_id,teach_id_user, teach_id_subject,teach_name,teach_zip,teach_price_an_hour,teach_last_name,teach_image,teach_description,teach_experience_years,teach_address,teach_phone,teach_city,teach_validated,user_id,user_type,user_deleted}:TipoTeacherCompleto) =>{
   const updatedTeacher:TipoTeacher={teach_id,teach_id_user, teach_id_subject,teach_name,teach_zip,teach_price_an_hour,teach_last_name,teach_image,teach_description,teach_experience_years,teach_address,teach_phone,teach_city,teach_validated}
   const updatedUser:TipoUser={user_id,user_type,user_deleted}

   // ESPERAR DOS PROMESAS O HACER UN COMMIT EN LA BDD DE LAS DOS OPERACIONES.
   const promesa1:Function = await update_Teachers(teach_id, updatedTeacher);
   const promesa2:Function = await userModelito.update_users(teach_id_user,updatedUser);

   const data:[Function,Function] = await Promise.all([promesa1, promesa2]);
   const [dataDePromesa1, dataDePromesa2]  = data;
   return data;
}

    const updateDataTeacherAndUser_noimage:Function = async({teach_id,teach_id_user, teach_id_subject,teach_name,teach_zip,teach_price_an_hour,teach_last_name,teach_description,teach_experience_years,teach_address,teach_phone,teach_city,teach_validated,user_id,user_type,user_deleted}:TipoTeacherCompleto) =>{
    const updatedTeacher_noimage:TipoTeacher={teach_id,teach_id_user, teach_id_subject,teach_name,teach_zip,teach_price_an_hour,teach_last_name,teach_description,teach_experience_years,teach_address,teach_phone,teach_city,teach_validated}
    const updatedUser:TipoUser={user_id,user_type,user_deleted}
  
    // ESPERAR DOS PROMESAS O HACER UN COMMIT EN LA BDD DE LAS DOS OPERACIONES.
    const promesa1:Function = await update_Teachers_noimage(teach_id, updatedTeacher_noimage);
    const promesa2:Function = await userModelito.update_users(teach_id_user,updatedUser);
 
    const data:[Function,Function] = await Promise.all([promesa1, promesa2]);
    const [dataDePromesa1, dataDePromesa2]  = data;
    return data;
 }


const getTeacherByIdUser:Function= async (teach_id_user:number) => {
    return await db.query('select * from Appteachers.Teachers where teach_id_user = ?',[teach_id_user]);
}
const getAll_TeachersAndUsers:Function= async () => {
   return await db.query('select * from Appteachers.Teachers JOIN Appteachers.Users ON user_id=teach_id_user');
}
const getAll_TeachersAndUsers_paginacion:Function= async (desde:number, cant:number) => {
   return await db.query('select * from Appteachers.Teachers JOIN Appteachers.Users ON user_id=teach_id_user LIMIT ?,?',[desde,cant]);
 }

const insert_Teachers:Function= async ({teach_name,teach_zip,teach_last_name,teach_image,teach_price_an_hour,teach_description,teach_experience_years,teach_address,teach_phone,teach_validated,teach_id_user,teach_id_subject,teach_city}:TipoTeacher) => {
    return await db.query('insert into Teachers (teach_id,teach_name,teach_zip,teach_last_name,teach_image,teach_price_an_hour,teach_description,teach_experience_years,teach_address,teach_phone,teach_validated,teach_id_user,teach_id_subject,teach_city) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[null,teach_name,teach_zip,teach_last_name,teach_image,teach_price_an_hour,teach_description,teach_experience_years,teach_address,teach_phone,teach_validated,teach_id_user,teach_id_subject,teach_city]);
}

const update_Teachers:Function = async (teach_id:string, {teach_name,teach_last_name,teach_image,teach_zip,teach_price_an_hour,teach_description,teach_experience_years,teach_address,teach_phone,teach_validated,teach_id_subject,teach_city}:TipoTeacher) => {
    const result=await db.query('update Appteachers.Teachers set teach_name = ?,teach_last_name = ?,teach_image = ?,teach_zip = ?,teach_price_an_hour = ?,teach_description = ?,teach_experience_years = ?,teach_address = ?,teach_phone = ?,teach_validated = ?, teach_id_subject = ?,teach_city = ? where teach_id = ?',[teach_name,teach_last_name,teach_image,teach_zip,teach_price_an_hour,teach_description,teach_experience_years,teach_address,teach_phone,teach_validated,teach_id_subject,teach_city,teach_id]);
    return result;
    }

const update_Teachers_noimage:Function = async (teach_id:string, {teach_name,teach_last_name,teach_zip,teach_price_an_hour,teach_description,teach_experience_years,teach_address,teach_phone,teach_validated,teach_id_subject,teach_city}:TipoTeacher) => {
    const result=await db.query('update Appteachers.Teachers set teach_name = ?,teach_last_name = ?,teach_zip = ?,teach_price_an_hour = ?,teach_description = ?,teach_experience_years = ?,teach_address = ?,teach_phone = ?,teach_validated = ?, teach_id_subject = ?,teach_city = ? where teach_id = ?',[teach_name,teach_last_name,teach_zip,teach_price_an_hour,teach_description,teach_experience_years,teach_address,teach_phone,teach_validated,teach_id_subject,teach_city,teach_id]);
    return result;
    }


const setdeleted_Teacher_ById:Function = async (teach_id:number) => {
    return await db.query(
    'update Appteachers.Users set user_deleted = "SI" where user_id = (select teach_id_user from Appteachers.Teachers where teach_id = ?)',[teach_id]
    );
}
const setvalidated_Teacher_ById:Function = async (teach_id:number) => {
    return await db.query(
    'update Teachers set teach_validated = "SI" where teach_id = ?',[teach_id]
    );
}

// esta función no la usamos:
const delete_Teacher_ById:Function = async (teach_id:number) => {
    return await db.query(
    'delete from Teachers where teach_id = ?',[teach_id]
    );
}

module.exports={
    getTeacherById,
    getTeacherByIdUser,
    getAll_TeachersAndUsers,
    getAll_TeachersAndUsers_paginacion,
    insert_Teachers,
    update_Teachers,
    update_Teachers_noimage,
    delete_Teacher_ById,
    setdeleted_Teacher_ById,
    setvalidated_Teacher_ById,
    getTeacherNearByCPandSubject,
    getDataTeacherAndUser,
    updateDataTeacherAndUser,
    updateDataTeacherAndUser_noimage
}
