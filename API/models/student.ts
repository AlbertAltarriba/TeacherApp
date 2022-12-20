// Student
type TipoStudentCompleto={
    user_id:string,
    user_email?: string,
    user_password?: string,
    user_type: string,
    user_deleted: string,
    student_id: string,
    student_name: string,
    student_last_name:string,
    student_image?:string,
    student_zip: string,
    student_address: string,
    student_phone: string,
    student_id_user: string,
    student_city: string
}; 
type TipoStudent={
    student_id: string,
    student_name: string,
    student_last_name:string,
    student_image?:string,
    student_zip: string,
    student_address: string,
    student_phone: string,
    student_id_user: string,
    student_city: string
};

const userModelo = require('../models/user');


const getDataStudentAndUser:Function = async (student_id:number) =>{
    return await db.query('select * from Appteachers.Students JOIN Appteachers.Users ON user_id=student_id_user where student_id = ?',[student_id]);
}
 
const getStudentByIdUser:Function = async (student_id_user:number) => {
    return await db.query('select * from Appteachers.Students where student_id_user = ?',[student_id_user]);
}
const getAll_StudentsAndUsers:Function= async () => {
    return await db.query('select * from Appteachers.Students JOIN Appteachers.Users ON user_id=student_id_user');
}

const getAll_StudentsAndUsers_paginacion:Function= async (desde:number, cant:number) => {
    return await db.query('select * from Appteachers.Students JOIN Appteachers.Users ON user_id=student_id_user LIMIT ?,?',[desde,cant]);
}

const insert_Students:Function = async ({student_name,student_last_name,student_image,student_zip,student_address,student_phone,student_id_user,student_city}:TipoStudent) => {
 return await db.query('insert into Appteachers.Students (student_id,student_name,student_last_name,student_image,student_zip,student_address,student_phone,student_id_user,student_city) values(null,?,?,?,?,?,?,?,?)',[student_name,student_last_name,student_image,student_zip,student_address,student_phone,student_id_user,student_city]);
}
const update_Students:Function  = async (student_id:number, {student_name,student_last_name,student_image,student_zip,student_address,student_phone,student_city}:TipoStudent) => {
        return await db.query(
        'update Appteachers.Students set student_name = ?,student_last_name = ?,student_image = ?,student_zip = ?,student_address = ?,student_phone = ?,student_city = ? where student_id = ?',
        [student_name,student_last_name,student_image,student_zip,student_address,student_phone,student_city,student_id]
        );
}

const setdeleted_Student_ById:Function = async (student_id:number) => {
    console.log('setdeleted_student_ById: ',student_id)
    return await db.query('update Appteachers.Users set user_deleted = "SI" where user_id = (select student_id_user from Appteachers.Students where student_id = ?)',[student_id]
    );
}

 const updateDataStudentAndUser:Function = async ({student_id,student_name,student_last_name,student_image,student_zip,student_address,student_id_user,student_phone,student_city,user_id,user_type,user_deleted}:TipoStudentCompleto) =>{
    const updatedStudent:TipoStudent={student_id,student_name,student_last_name,student_image,student_zip,student_address,student_id_user,student_phone,student_city}
    const updatedUser:TipoUser={user_id,user_type,user_deleted}
 
    // ESPERAR DOS PROMESAS O HACER UN COMMIT EN LA BDD DE LAS DOS OPERACIONES.
    const promesa1:Function = await update_Students(student_id, updatedStudent);
    const promesa2:Function = await userModelo.update_users(user_id,updatedUser);
    const data: [Function,Function] = await Promise.all([promesa1, promesa2]);
    const [dataDePromesa1, dataDePromesa2]  = data;
    return data;
 }
 
module.exports={
    getStudentByIdUser,
    getAll_StudentsAndUsers,
    getAll_StudentsAndUsers_paginacion,
    insert_Students,
    update_Students,
    setdeleted_Student_ById,
    getDataStudentAndUser,
    updateDataStudentAndUser
}
