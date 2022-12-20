// Admin

const { update_users } = require("./user");
const { sendCancelationEmail } = require('../emails/account');

const getAdminById= async (admin_id) => {
    return await db.query('select * from Appteachers.Admins where admin_id = ?',[admin_id]);
}

const getDataAdminAndUser = async (admin_id) =>{
    // crea una union de datos de Teacher y User
   // return await db.query('select teach_name, teach_zip, teach_price_an_hour, teach_description, teach_experience_years, teach_address, teach_phone, teach_city, user_email, user_password, user_deleted, user_username from Teachers JOIN users ON user_id=teach_id_user where teach_id = ?',[teach_id]);
   return await db.query('select *  from Appteachers.Admins as a JOIN Appteachers.Users as u ON u.user_id=a.admin_id_user where a.admin_id = ?',[admin_id]);
 // return await db.query('select * from Appteachers.Teachers JOIN Appteachers.Users ON user_id=teach_id_user where teach_id = 2');

}

const getAdminByIdUser= async (admin_id_user) => {
    console.log('********añadiré en getAdminByIdUser:  ',admin_id_user);
    return await db.query('select * from Appteachers.Admins as a join Appteachers.Users as u on u.user_id=a.admin_id_user where u.user_id = ?',[admin_id_user]);
}
const getAll_Admins= async () => {
    console.log('********a en getAll_Admins:  ');
    return await db.query('select * from Appteachers.Admins as a join Appteachers.Users as u on u.user_id=a.admin_id_user;');
}

const insert_Admins= async ({admin_name,admin_zip,admin_address,admin_phone,admin_id_user,admin_city}) => {
    console.log('********añadiré en Admins:  ',admin_name);
   return await db.query('insert into Appteachers.Admins (admin_id,admin_name,admin_zip,admin_address,admin_phone,admin_id_user,admin_city) values (?,?,?,?,?,?,?)',[null,admin_name,admin_zip,admin_address,admin_phone,admin_id_user,admin_city]);
  //   return await db.query('insert into Admins (admin_id,admin_name,admin_zip,admin_address,admin_phone,admin_id_user,admin_city) VALUES (NULL,"","","","","NO",11,"")');
}
const update_Admins = async (admin_id, {admin_name,admin_zip,admin_address,admin_phone,admin_city}) => {
        console.log('********añadiré en update_Admins:  ',admin_id);
        return await db.query(
        'update Appteachers.Admins set admin_name = ?,admin_zip = ?,admin_address = ?,admin_phone = ? ,admin_city = ? where admin_id = ?',
        [admin_name,admin_zip,admin_address,admin_phone,admin_city,admin_id]
        );
}

const setdeleted_admin_ById = async (admin_id) => {
    console.log('********* setdeleted_admin_ById: ',admin_id)
    const [userToDelete]=await db.query('select * from Appteachers.Users where user_id =(select admin_id_user from Appteachers.Admins where admin_id = ?)',[admin_id]);
    console.log('----------------------------------------------- setdeleted_admin_ById PARA EMAIL -DELETE *********************************************************')
    console.log(userToDelete[0].user_email,userToDelete[0].user_username);
    const resultado= await sendCancelationEmail(userToDelete[0].user_email,userToDelete[0].user_username);
    console.log('-----------------------------------------------RESULTADO sendCancelationEmail *********************************************************');
    console.log(resultado);
    console.log(process.env.EMAIL_EMPRESA);


    return await db.query('update Appteachers.Users as u set u.user_deleted = "SI" where u.user_id = (select a.admin_id_user from Appteachers.Admins as a where a.admin_id = ?)',[admin_id]
    );
}



// esta función no la usamos:
// const delete_admin_ById = async (admin_id) => {
//     console.log('********* delete_admin_ById: ',admin_id)
//     return await db.query(
//     'delete from Admins where admin_id = ?',[admin_id]
//     );
// }

const updateDataAdminAndUser = async({admin_id,admin_name,admin_zip,admin_address,admin_id_user,admin_phone,admin_city,user_id,user_email,user_password,user_username,user_type,user_deleted}) =>{
 console.log('----------------- dentro de updateDataAdminAndUser--------');
    const updatedAdmin={admin_name,admin_zip,admin_address,admin_id_user,admin_phone,admin_city}
    const updatedUser={user_password,user_username,user_email,user_type,user_deleted}

    // ESPERAR DOS PROMESAS O HACER UN COMMIT EN LA BDD DE LAS DOS OPERACIONES.
    const promesa1 = await update_Admins(admin_id, updatedAdmin);
    const promesa2 = await update_users(user_id,updatedUser);
    const data = await Promise.all([promesa1, promesa2]);
    const [dataDePromesa1, dataDePromesa2]  = data;
    console.log('----------------- dDESPUES dE ADMIN Y USERS--------',data);
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
