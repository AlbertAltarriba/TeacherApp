"use strict";
const userModelo = require('../models/user');
const getDataStudentAndUser = async (student_id) => {
    return await db.query('select * from Appteachers.Students JOIN Appteachers.Users ON user_id=student_id_user where student_id = ?', [student_id]);
};
const getStudentByIdUser = async (student_id_user) => {
    return await db.query('select * from Appteachers.Students where student_id_user = ?', [student_id_user]);
};
const getAll_StudentsAndUsers = async () => {
    return await db.query('select * from Appteachers.Students JOIN Appteachers.Users ON user_id=student_id_user');
};
const getAll_StudentsAndUsers_paginacion = async (desde, cant) => {
    return await db.query('select * from Appteachers.Students JOIN Appteachers.Users ON user_id=student_id_user LIMIT ?,?', [desde, cant]);
};
const insert_Students = async ({ student_name, student_last_name, student_image, student_zip, student_address, student_phone, student_id_user, student_city }) => {
    return await db.query('insert into Appteachers.Students (student_id,student_name,student_last_name,student_image,student_zip,student_address,student_phone,student_id_user,student_city) values(null,?,?,?,?,?,?,?,?)', [student_name, student_last_name, student_image, student_zip, student_address, student_phone, student_id_user, student_city]);
};
const update_Students = async (student_id, { student_name, student_last_name, student_image, student_zip, student_address, student_phone, student_city }) => {
    return await db.query('update Appteachers.Students set student_name = ?,student_last_name = ?,student_image = ?,student_zip = ?,student_address = ?,student_phone = ?,student_city = ? where student_id = ?', [student_name, student_last_name, student_image, student_zip, student_address, student_phone, student_city, student_id]);
};
const setdeleted_Student_ById = async (student_id) => {
    console.log('setdeleted_student_ById: ', student_id);
    return await db.query('update Appteachers.Users set user_deleted = "SI" where user_id = (select student_id_user from Appteachers.Students where student_id = ?)', [student_id]);
};
const updateDataStudentAndUser = async ({ student_id, student_name, student_last_name, student_image, student_zip, student_address, student_id_user, student_phone, student_city, user_id, user_type, user_deleted }) => {
    const updatedStudent = { student_id, student_name, student_last_name, student_image, student_zip, student_address, student_id_user, student_phone, student_city };
    const updatedUser = { user_id, user_type, user_deleted };
    // ESPERAR DOS PROMESAS O HACER UN COMMIT EN LA BDD DE LAS DOS OPERACIONES.
    const promesa1 = await update_Students(student_id, updatedStudent);
    const promesa2 = await userModelo.update_users(user_id, updatedUser);
    const data = await Promise.all([promesa1, promesa2]);
    const [dataDePromesa1, dataDePromesa2] = data;
    return data;
};
module.exports = {
    getStudentByIdUser,
    getAll_StudentsAndUsers,
    getAll_StudentsAndUsers_paginacion,
    insert_Students,
    update_Students,
    setdeleted_Student_ById,
    getDataStudentAndUser,
    updateDataStudentAndUser
};
