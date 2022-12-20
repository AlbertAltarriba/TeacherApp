// USERS
const getUserById= async (user_id:string) => {
    return await db.query('select * from Appteachers.Users where user_id = ?',[user_id]);
}

const getUserByEmail= async (user_email:string) => {
    return await db.query('select * from Appteachers.Users where user_email = ?',[user_email]);
}

const getAll_users= async () => {
    return await db.query('select * from Appteachers.Users');
}

const insert_users= async ({user_email,user_password,user_type,user_deleted}:TipoUser) => {
    return await db.query('insert into Appteachers.Users (user_id,user_email,user_password,user_type,user_deleted) values (?,?,?,?,?)',[null,user_email,user_password,user_type,user_deleted]);
}

const update_users = async (user_id:string, {user_type,user_deleted}:TipoUser) => {
        return await db.query('update Appteachers.Users set user_type = ?, user_deleted = ? where user_id = ?',[user_type,user_deleted, user_id]);
}

const setdeleted_user_ById = async (user_id:string) => {
    return await db.query(
    'update Appteachers.Users set user_deleted = "SI" where user_id = ?',[user_id]
    );
}

// esta función no la usamos:
const delete_user_ById = async (user_id:string) => {
    return await db.query(
    'delete from Appteachers.Users where user_id = ?',[user_id]
    );
}


module.exports = {
    getAll_users,
    insert_users,
    update_users,
    delete_user_ById,
    setdeleted_user_ById,
    getUserById,
    getUserByEmail
}




