"use strict";
const userModel = require('../models/user');
require("../models/admin");
require("../emails/account");
const getAdminById = async (admin_id) => {
    return await db.query('select * from Appteachers.Admins where admin_id = ?', [admin_id]);
};
const getDataAdminAndUser = async (admin_id) => {
    return await db.query('select *  from Appteachers.Admins as a JOIN Appteachers.Users as u ON u.user_id=a.admin_id_user where a.admin_id = ?', [admin_id]);
};
const getAdminByIdUser = async (admin_id_user) => {
    return await db.query('select * from Appteachers.Admins as a join Appteachers.Users as u on u.user_id=a.admin_id_user where u.user_id = ?', [admin_id_user]);
};
const getAll_Admins = async () => {
    return await db.query('select * from Appteachers.Admins as a join Appteachers.Users as u on u.user_id=a.admin_id_user');
};
const insert_Admins = async ({ admin_name, admin_zip, admin_address, admin_phone, admin_id_user, admin_city }) => {
    return await db.query('insert into Appteachers.Admins (admin_id,admin_name,admin_zip,admin_address,admin_phone,admin_id_user,admin_city) values (?,?,?,?,?,?,?)', [null, admin_name, admin_zip, admin_address, admin_phone, admin_id_user, admin_city]);
};
const update_Admins = async (admin_id, { admin_name, admin_zip, admin_address, admin_phone, admin_city }) => {
    return await db.query('update Appteachers.Admins set admin_name = ?,admin_zip = ?,admin_address = ?,admin_phone = ?,admin_city = ? where admin_id = ?', [admin_name, admin_zip, admin_address, admin_phone, admin_city, admin_id]);
};
const setdeleted_admin_ById = async (admin_id) => {
    const [userToDelete] = await db.query('select * from Appteachers.Users where user_id =(select admin_id_user from Appteachers.Admins where admin_id = ?)', [admin_id]);
    return await db.query('update Appteachers.Users as u set u.user_deleted = "SI" where u.user_id = (select a.admin_id_user from Appteachers.Admins as a where a.admin_id = ?)', [admin_id]);
};
const updateDataAdminAndUser = async ({ admin_id, admin_name, admin_zip, admin_address, admin_id_user, admin_phone, admin_city, user_id, user_email, user_password, user_type, user_deleted }) => {
    const updatedAdmin = { admin_id, admin_name, admin_zip, admin_address, admin_phone, admin_city, admin_id_user };
    const updatedUser = { user_id, user_password, user_email, user_type, user_deleted };
    // ESPERAR DOS PROMESAS O HACER UN COMMIT EN LA BDD DE LAS DOS OPERACIONES.
    const promesa1 = await update_Admins(admin_id, updatedAdmin);
    const promesa2 = await userModel.update_users(user_id, updatedUser);
    const data = await Promise.all([promesa1, promesa2]);
    const [dataDePromesa1, dataDePromesa2] = data;
    return data;
};
module.exports = {
    getAdminById,
    getAdminByIdUser,
    getAll_Admins,
    insert_Admins,
    update_Admins,
    setdeleted_admin_ById,
    getDataAdminAndUser,
    updateDataAdminAndUser
};
