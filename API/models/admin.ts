// Admin
type TipoAdminCompleto={
    user_id:string,
    user_email: string,
    user_password: string,
    user_type: string,
    user_deleted: string,
    admin_id: string,
    admin_name: string,
    admin_zip: string,
    admin_address: string,
    admin_phone: string,
    admin_id_user: string,
    admin_city: string
}; 
type TipoAdmin={
    admin_id:string,
    admin_name: string,
    admin_zip: string,
    admin_address: string,
    admin_phone: string,
    admin_id_user: string,
    admin_city: string
};

const userModel = require('../models/user');
require("../models/admin");
require("../emails/account");

const getAdminById:Function= async (admin_id:string) => {
    return await db.query('select * from Appteachers.Admins where admin_id = ?',[admin_id]);
}

const getDataAdminAndUser:Function = async (admin_id:string) =>{
   return await db.query('select *  from Appteachers.Admins as a JOIN Appteachers.Users as u ON u.user_id=a.admin_id_user where a.admin_id = ?',[admin_id]);

}

const getAdminByIdUser:Function= async (admin_id_user:string) => {
    return await db.query('select * from Appteachers.Admins as a join Appteachers.Users as u on u.user_id=a.admin_id_user where u.user_id = ?',[admin_id_user]);
}
const getAll_Admins:Function= async () => {
    return await db.query('select * from Appteachers.Admins as a join Appteachers.Users as u on u.user_id=a.admin_id_user');
}

const insert_Admins:Function= async ({admin_name,admin_zip,admin_address,admin_phone,admin_id_user,admin_city}:TipoAdmin) => {
   return await db.query('insert into Appteachers.Admins (admin_id,admin_name,admin_zip,admin_address,admin_phone,admin_id_user,admin_city) values (?,?,?,?,?,?,?)',[null,admin_name,admin_zip,admin_address,admin_phone,admin_id_user,admin_city]);
}
const update_Admins:Function = async (admin_id:string, {admin_name,admin_zip,admin_address,admin_phone,admin_city}:TipoAdmin) => {
        return await db.query('update Appteachers.Admins set admin_name = ?,admin_zip = ?,admin_address = ?,admin_phone = ?,admin_city = ? where admin_id = ?',[admin_name,admin_zip,admin_address,admin_phone,admin_city,admin_id]
        );
}

const setdeleted_admin_ById:Function = async (admin_id:string) => {
    const [userToDelete]=await db.query('select * from Appteachers.Users where user_id =(select admin_id_user from Appteachers.Admins where admin_id = ?)',[admin_id]);
    return await db.query('update Appteachers.Users as u set u.user_deleted = "SI" where u.user_id = (select a.admin_id_user from Appteachers.Admins as a where a.admin_id = ?)',[admin_id]
    );
}

const updateDataAdminAndUser:Function = async({admin_id,admin_name,admin_zip,admin_address,admin_id_user,admin_phone,admin_city,user_id,user_email,user_password,user_type,user_deleted}:TipoAdminCompleto) =>{
    const updatedAdmin:TipoAdmin={admin_id,admin_name,admin_zip,admin_address,admin_phone,admin_city,admin_id_user}
    const updatedUser:TipoUser={user_id,user_password,user_email,user_type,user_deleted}
    // ESPERAR DOS PROMESAS O HACER UN COMMIT EN LA BDD DE LAS DOS OPERACIONES.
    const promesa1:Function = await update_Admins(admin_id, updatedAdmin);
    const promesa2:Function = await userModel.update_users(user_id,updatedUser);
    const data:[Function,Function] = await Promise.all([promesa1, promesa2]);
    const [dataDePromesa1, dataDePromesa2]  = data;
    return data;
}

module.exports={
    getAdminById,
    getAdminByIdUser,
    getAll_Admins,
    insert_Admins,
    update_Admins,
    setdeleted_admin_ById,
    getDataAdminAndUser,
    updateDataAdminAndUser
}
