// TeacherS
const e = require("express");

const getAll_Subjects= async () => {
    return await db.query('select * from AppTeachers.Subjects');
}

const getSubjectById= async (subj_id) => {
    return await db.query('select * from AppTeachers.Subjects where subj_id = ?',[subj_id]);
}
const insert_Subject= async ({subj_name}) => {
    console.log('********añadiré en Subject:  ',subj_name);
    return await db.query('insert into Subjects (subj_id,subj_name) values (?,?)',[null,subj_name]);
}

const update_Subject = async (subj_id, {subj_name}) => {
    console.log('----------------- dentro dE UPDATE subject --------');
    return await db.query('update AppTeachers.Subjects set subj_name = ? where subj_id = ?',[subj_name,subj_id]);
}

const delete_Subject = async (subj_id) => {
    return await db.query(
    'delete from AppTeachers.Subjects where subj_id = ?',[subj_id]
    );
}

module.exports={
    getAll_Subjects,
    getSubjectById,
    insert_Subject,
    update_Subject,
    delete_Subject,
}

