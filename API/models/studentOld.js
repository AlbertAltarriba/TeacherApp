
const { update_users } = require("./user");

// const getStudentById= async (student_id) => {
//     return await db.query('select * from AppteachersStudents where student_id = ?',[student_id]);
// }

const getDataStudentAndUser = async (student_id) =>{
    // crea una union de datos de Teacher y User
   // return await db.query('select teach_name, teach_zip, teach_price_an_hour, teach_description, teach_experience_years, teach_address, teach_phone, teach_city, user_email, user_password, user_deleted, user_username from Teachers JOIN users ON user_id=teach_id_user where teach_id = ?',[teach_id]);
   return await db.query('select student_id, student_name, student_zip, student_address, student_phone, student_city, user_id, user_email, user_password, user_deleted, user_username from Appteachers.Students JOIN Appteachers.Users ON user_id=student_id_user where student_id = ?',[student_id]);
 // return await db.query('select * from Appteachers.Teachers JOIN Appteachers.Users ON user_id=teach_id_user where teach_id = 2');

}
 
const getStudentByIdUser= async (student_id_user) => {
    return await db.query('select * from Appteachers.Students where student_id_user = ?',[student_id_user]);
}
const getAll_Students= async () => {
    return await db.query('select * from Appteachers.Students');
}

const insert_Students= async ({student_name,student_zip,student_address,student_phone,student_id_user,student_city}) => {
    console.log('********añadiré en Students:  ',student_name);
   return await db.query('insert into Appteachers.Students (student_id,student_name,student_zip,student_address,student_phone,student_id_user,student_city) values (?,?,?,?,?,?,?)',[null,student_name,student_zip,student_address,student_phone,student_id_user,student_city]);
  //   return await db.query('insert into Students (student_id,student_name,student_zip,student_address,student_phone,student_id_user,student_city) VALUES (NULL,"","","","","NO",11,"")');
}
const update_Students = async (student_id, {student_name,student_zip,student_address,student_phone,student_city}) => {
        return await db.query(
        'update Appteachers.Students set student_name = ?,student_zip = ?,student_address = ?,student_phone = ?,student_city = ? where student_id = ?',
        [student_name,student_zip,student_address,student_phone,student_city,student_id]
        );
}

const setdeleted_Student_ById = async (student_id) => {
    console.log('setdeleted_student_ById: ',student_id)
    return await db.query('update Appteachers.Users set user_deleted = "SI" where user_id = (select student_id_user from Appteachers.Students where student_id = ?)',[student_id]
    );
}

// esta función no la usamos:
// const delete_Student_ById = async (student_id) => {
//     return await db.query(
//     'delete from Students where student_id = ?',[student_id]
//     );
// }

// const updateDataStudentAndUser = async({student_id,student_name,student_zip,student_address,student_phone,student_city,user_id,user_email,user_password,user_username,user_type,user_deleted}) =>{
//  console.log('----------------- dentro de updateDataStudentAndUser--------');
//     const updatedStudent={student_name,student_zip,student_address,student_phone,student_city}
//     const updatedUser={user_password,user_username,user_email,user_type,user_deleted}
//     console.log('----------------- ANTES DE UPDATE_STUDENTS--------',student_id,updatedStudent);
//     const row1= await update_Students (student_id, updatedStudent);
//     console.log('----------------- despues DE UPDATE_STUDENTS--------',row1[0][0]);

//     const row2= await update_users(user_id,updatedUser);
//     console.log('----------------- despues DE UPDATE_usersS--------',row2[0][0]);
//     return row2;
//     // return {...row1,...row2}
//  }

 const updateDataStudentAndUser = async({student_id,student_name,student_zip,student_address,student_id_user,student_phone,student_city,user_id,user_email,user_password,user_username,user_type,user_deleted}) =>{
    const updatedStudent={student_name,student_zip,student_address,student_id_user,student_phone,student_city}
    const updatedUser={user_password,user_username,user_email,user_type,user_deleted}
 
    // ESPERAR DOS PROMESAS O HACER UN COMMIT EN LA BDD DE LAS DOS OPERACIONES.
    const promesa1 = await update_Students(student_id, updatedStudent);
    const promesa2 = await update_users(user_id,updatedUser);
    const data = await Promise.all([promesa1, promesa2]);
    const [dataDePromesa1, dataDePromesa2]  = data;
    console.log('----------------- dDESPUES dE STUDENT Y USERS--------',data);
    return data;
 }
 

module.exports={
    getStudentByIdUser,
    getAll_Students,
    insert_Students,
    update_Students,
    setdeleted_Student_ById,
    getDataStudentAndUser,
    updateDataStudentAndUser
}
