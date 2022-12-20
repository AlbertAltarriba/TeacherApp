"use strict";
const userModelito = require("../models/user");
require("../models/teacher");
const getTeacherNearByCPandSubject = async (cp, subject) => {
    const consulta = 'SELECT s.subj_name as Materia, t.teach_name as Profesor, t.teach_city as Ciudad, t.teach_zip as CP, avg(e.enroll_assessment) as Valoracion FROM Appteachers.Teachers As t JOIN AppTeachers.Subjects as s ON s.subj_id=t.teach_id_subject and s.subj_name=' + subject.toString() + ' JOIN Appteachers.Users AS u ON u.user_id=t.teach_id_user JOIN Appteachers.Enrollments as e ON e.enroll_id_teacher=t.teach_id WHERE (u.user_deleted ="NO" and t.teach_validated = "SI" and t.teach_zip= ' + cp.toString() + ') GROUP BY Materia, Profesor, Ciudad, CP ORDER BY Valoracion DESC';
    const rows = await db.query(consulta);
    return rows;
};
const getTeacherById = async (teach_id) => {
    return await db.query('select * from Appteachers.Teachers where teach_id = ?', [teach_id]);
};
const getDataTeacherAndUser = async (teach_id) => {
    const result = await db.query('select * from Appteachers.Teachers JOIN Appteachers.Users ON user_id=teach_id_user where teach_id = ?', [teach_id]);
    return result[0];
};
const updateDataTeacherAndUser = async ({ teach_id, teach_id_user, teach_id_subject, teach_name, teach_zip, teach_price_an_hour, teach_last_name, teach_image, teach_description, teach_experience_years, teach_address, teach_phone, teach_city, teach_validated, user_id, user_type, user_deleted }) => {
    const updatedTeacher = { teach_id, teach_id_user, teach_id_subject, teach_name, teach_zip, teach_price_an_hour, teach_last_name, teach_image, teach_description, teach_experience_years, teach_address, teach_phone, teach_city, teach_validated };
    const updatedUser = { user_id, user_type, user_deleted };
    // ESPERAR DOS PROMESAS O HACER UN COMMIT EN LA BDD DE LAS DOS OPERACIONES.
    const promesa1 = await update_Teachers(teach_id, updatedTeacher);
    const promesa2 = await userModelito.update_users(teach_id_user, updatedUser);
    const data = await Promise.all([promesa1, promesa2]);
    const [dataDePromesa1, dataDePromesa2] = data;
    return data;
};
const updateDataTeacherAndUser_noimage = async ({ teach_id, teach_id_user, teach_id_subject, teach_name, teach_zip, teach_price_an_hour, teach_last_name, teach_description, teach_experience_years, teach_address, teach_phone, teach_city, teach_validated, user_id, user_type, user_deleted }) => {
    const updatedTeacher_noimage = { teach_id, teach_id_user, teach_id_subject, teach_name, teach_zip, teach_price_an_hour, teach_last_name, teach_description, teach_experience_years, teach_address, teach_phone, teach_city, teach_validated };
    const updatedUser = { user_id, user_type, user_deleted };
    // ESPERAR DOS PROMESAS O HACER UN COMMIT EN LA BDD DE LAS DOS OPERACIONES.
    const promesa1 = await update_Teachers_noimage(teach_id, updatedTeacher_noimage);
    const promesa2 = await userModelito.update_users(teach_id_user, updatedUser);
    const data = await Promise.all([promesa1, promesa2]);
    const [dataDePromesa1, dataDePromesa2] = data;
    return data;
};
const getTeacherByIdUser = async (teach_id_user) => {
    return await db.query('select * from Appteachers.Teachers where teach_id_user = ?', [teach_id_user]);
};
const getAll_TeachersAndUsers = async () => {
    return await db.query('select * from Appteachers.Teachers JOIN Appteachers.Users ON user_id=teach_id_user');
};
const getAll_TeachersAndUsers_paginacion = async (desde, cant) => {
    return await db.query('select * from Appteachers.Teachers JOIN Appteachers.Users ON user_id=teach_id_user LIMIT ?,?', [desde, cant]);
};
const insert_Teachers = async ({ teach_name, teach_zip, teach_last_name, teach_image, teach_price_an_hour, teach_description, teach_experience_years, teach_address, teach_phone, teach_validated, teach_id_user, teach_id_subject, teach_city }) => {
    return await db.query('insert into Teachers (teach_id,teach_name,teach_zip,teach_last_name,teach_image,teach_price_an_hour,teach_description,teach_experience_years,teach_address,teach_phone,teach_validated,teach_id_user,teach_id_subject,teach_city) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [null, teach_name, teach_zip, teach_last_name, teach_image, teach_price_an_hour, teach_description, teach_experience_years, teach_address, teach_phone, teach_validated, teach_id_user, teach_id_subject, teach_city]);
};
const update_Teachers = async (teach_id, { teach_name, teach_last_name, teach_image, teach_zip, teach_price_an_hour, teach_description, teach_experience_years, teach_address, teach_phone, teach_validated, teach_id_subject, teach_city }) => {
    const result = await db.query('update Appteachers.Teachers set teach_name = ?,teach_last_name = ?,teach_image = ?,teach_zip = ?,teach_price_an_hour = ?,teach_description = ?,teach_experience_years = ?,teach_address = ?,teach_phone = ?,teach_validated = ?, teach_id_subject = ?,teach_city = ? where teach_id = ?', [teach_name, teach_last_name, teach_image, teach_zip, teach_price_an_hour, teach_description, teach_experience_years, teach_address, teach_phone, teach_validated, teach_id_subject, teach_city, teach_id]);
    return result;
};
const update_Teachers_noimage = async (teach_id, { teach_name, teach_last_name, teach_zip, teach_price_an_hour, teach_description, teach_experience_years, teach_address, teach_phone, teach_validated, teach_id_subject, teach_city }) => {
    const result = await db.query('update Appteachers.Teachers set teach_name = ?,teach_last_name = ?,teach_zip = ?,teach_price_an_hour = ?,teach_description = ?,teach_experience_years = ?,teach_address = ?,teach_phone = ?,teach_validated = ?, teach_id_subject = ?,teach_city = ? where teach_id = ?', [teach_name, teach_last_name, teach_zip, teach_price_an_hour, teach_description, teach_experience_years, teach_address, teach_phone, teach_validated, teach_id_subject, teach_city, teach_id]);
    return result;
};
const setdeleted_Teacher_ById = async (teach_id) => {
    return await db.query('update Appteachers.Users set user_deleted = "SI" where user_id = (select teach_id_user from Appteachers.Teachers where teach_id = ?)', [teach_id]);
};
const setvalidated_Teacher_ById = async (teach_id) => {
    return await db.query('update Teachers set teach_validated = "SI" where teach_id = ?', [teach_id]);
};
// esta función no la usamos:
const delete_Teacher_ById = async (teach_id) => {
    return await db.query('delete from Teachers where teach_id = ?', [teach_id]);
};
module.exports = {
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
};
