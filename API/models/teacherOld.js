
const { update_users } = require("./user");

const getTeacherNearByCPandSubject= async (cp,subject) =>{
    //FUNCIONA BIEN:  La de abajo AÑADE QUE HAN HABIDO MATRICULADOS y YA HAY VALORACIONES !!!!    
    const rows = await db.query('SELECT teach_name as Profesor, teach_city as Ciudad, teach_zip as CP, avg(enroll_assessment) as Valoracion FROM Appteachers.Teachers JOIN AppTeachers.Subjects ON subj_id=teach_id_subject and subj_name= "?" JOIN Appteachers.Users ON user_id=teach_id_user JOIN Appteachers.Enrollments ON enroll_id_teacher=teach_id WHERE (user_deleted ="NO" and teach_validated = "SI" and teach_zip= "?") GROUP BY Profesor, Ciudad, CP ORDER BY Valoracion DESC',[subject,cp]);
    console.log('---------- SELECT DE PROFES CERCANOS:-------',rows[0]);
    return rows; 
}
  
const getTeacherById= async (teach_id) => {
    return await db.query('select * from Appteachers.Teachers where teach_id = ?',[teach_id]);
}

const getDataTeacherAndUser = async (teach_id) =>{
    // crea una union de datos de Teacher y User
   // return await db.query('select teach_name, teach_zip, teach_price_an_hour, teach_description, teach_experience_years, teach_address, teach_phone, teach_city, user_email, user_password, user_deleted, user_username from Teachers JOIN users ON user_id=teach_id_user where teach_id = ?',[teach_id]);
   const result=await db.query('select teach_id, teach_name, teach_zip, teach_price_an_hour, teach_description, teach_experience_years, teach_address, teach_phone, teach_city, teach_validated, user_id, user_email, user_password, user_deleted, user_username from Appteachers.Teachers JOIN Appteachers.Users ON user_id=teach_id_user where teach_id = ?',[teach_id]);
  // console.log('----------------- QUERY DE getDataTeacherAndUser --------',result);

   return result[0];
   // return await db.query('select * from Appteachers.Teachers JOIN Appteachers.Users ON user_id=teach_id_user where teach_id = 2');

}
const updateDataTeacherAndUser = async({teach_id,teach_name,teach_zip,teach_price_an_hour,teach_description,teach_experience_years,teach_address,teach_phone,teach_city,teach_validated,user_id,user_email,user_password,user_username,user_type,user_deleted}) =>{
   const updatedTeacher={teach_name,teach_zip,teach_price_an_hour,teach_description,teach_experience_years,teach_address,teach_phone,teach_city,teach_validated}
   const updatedUser={user_password,user_username,user_email,user_type,user_deleted}

   // ESPERAR DOS PROMESAS O HACER UN COMMIT EN LA BDD DE LAS DOS OPERACIONES.
   const promesa1 = await update_Teachers(teach_id, updatedTeacher);
   const promesa2 = await update_users(user_id,updatedUser);
   const data = await Promise.all([promesa1, promesa2]);
   const [dataDePromesa1, dataDePromesa2]  = data;
   console.log('----------------- dDESPUES dE UPDATE TEACHER Y USERS--------',data);
   return data;
}

const getTeacherByIdUser= async (teach_id_user) => {
    return await db.query('select * from Appteachers.Teachers where teach_id_user = ?',[teach_id_user]);
}
const getAll_Teachers= async () => {
    return await db.query('select * from Appteachers.Teachers');
}

const insert_Teachers= async ({teach_name,teach_zip,teach_price_an_hour,teach_description,teach_experience_years,teach_address,teach_phone,teach_validated,teach_id_user,teach_id_subject,teach_city}) => {
    console.log('********añadiré en Teachers:  ',teach_name);
    return await db.query('insert into Teachers (teach_id,teach_name,teach_zip,teach_price_an_hour,teach_description,teach_experience_years,teach_address,teach_phone,teach_validated,teach_id_user,teach_id_subject,teach_city) values (?,?,?,?,?,?,?,?,?,?,?,?)',[null,teach_name,teach_zip,teach_price_an_hour,teach_description,teach_experience_years,teach_address,teach_phone,teach_validated,teach_id_user,teach_id_subject,teach_city]);
}

const update_Teachers = async (teach_id, {teach_name,teach_zip,teach_price_an_hour,teach_description,teach_experience_years,teach_address,teach_phone,teach_validated,teach_id_user,teach_city}) => {
        console.log('----------------- dentro de UPDATE_TEACHERS--------');
      //  const consulta='update Appteachers.Teachers set teach_name = ?,teach_zip = ?,teach_price_an_hour = ?,teach_description = ?,teach_experience_years = ?,teach_address = ?,teach_phone = ?,teach_validated = ?,teach_id_user = ? , teach_city = ? where teach_id = ?';
       // console.log('----------------- dentro de UPDATE_TEACHERS-----consulta---',consulta);
        const result=await db.query('update Appteachers.Teachers set teach_name = ?,teach_zip = ?,teach_price_an_hour = ?,teach_description = ?,teach_experience_years = ?,teach_address = ?,teach_phone = ?,teach_validated = ?, teach_city = ? where teach_id = ?',[teach_name,teach_zip,teach_price_an_hour,teach_description,teach_experience_years,teach_address,teach_phone,teach_validated,teach_city,teach_id]);
        //return await db.query('update Appteachers.Teachers set teach_name = "modificado",teach_zip = "modificado",teach_price_an_hour = 0,teach_description = "modificado",teach_experience_years = 0,teach_address = "modificado",teach_phone = "modificado",teach_validated = "NO",teach_id_user = 1,teach_id_subject = 1 , teach_city = "modificado" where teach_id = 8');
        console.log('----------------- dentro de UPDATE_TEACHERS-----consulta---',result);
        return result;
    }

const setdeleted_Teacher_ById = async (teach_id) => {
    console.log('setdeleted_teach_ById: ////////////////////////////////////////////////////',teach_id)
    return await db.query(
    'update Appteachers.Users set user_deleted = "SI" where user_id = (select teach_id_user from Appteachers.Teachers where teach_id = ?)',[teach_id]
    );
}
const setvalidated_Teacher_ById = async (teach_id) => {
    console.log('setdeleted_teach_ById: ',teach_id)
    return await db.query(
    'update Teachers set teach_validated = "SI" where teach_id = ?',[teach_id]
    );
}

// esta función no la usamos:
const delete_Teacher_ById = async (teach_id) => {
    return await db.query(
    'delete from Teachers where teach_id = ?',[teach_id]
    );
}

module.exports={
    getTeacherById,
    getTeacherByIdUser,
    getAll_Teachers,
    insert_Teachers,
    update_Teachers,
    delete_Teacher_ById,
    setdeleted_Teacher_ById,
    setvalidated_Teacher_ById,
    getTeacherNearByCPandSubject,
    getDataTeacherAndUser,
    updateDataTeacherAndUser
}
