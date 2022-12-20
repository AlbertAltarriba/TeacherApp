// enrollS
const getEnrollById= async (enroll_id) => {
    return await db.query('select * from Appteachers.Enrollments where enroll_id = ?',[enroll_id]);
}

const getEnrollByStudent= async (enroll_id_student) => {
    //enroll_email tiene un índice
    return await db.query('select * from Appteachers.Enrollments where enroll_id_student = ?',[enroll_id_student]);
}
const getEnrollByTeacher= async (enroll_id_teacher) => {
    //enroll_email tiene un índice
    return await db.query('select * from Appteachers.Enrollments where enroll_id_teacher = ?',[enroll_id_teacher]);
}

const getAll_enrolls= async () => {
    return await db.query('select * from Appteachers.Enrollments');
}

const insert_enrolls= async ({enroll_start_date,enroll_end_date,enroll_comments,enroll_assessment,enroll_id_student,enroll_id_teacher,enroll_deleted}) => {
    console.log('********añadiré en enrolls: estudiante-profe  ');
    console.log(enroll_id_student);
    console.log(enroll_id_teacher);
    return await db.query('insert into Appteachers.Enrollments (enroll_id,enroll_start_date,enroll_end_date,enroll_comments,enroll_assessment,enroll_id_student,enroll_id_teacher,enroll_deleted) values (?,?,?,?,?,?,?,?)',[null,enroll_start_date,enroll_end_date,enroll_comments,enroll_assessment,enroll_id_student,enroll_id_teacher,enroll_deleted]);
}

const update_enrolls = async (enroll_id, {enroll_start_date,enroll_end_date,enroll_comments,enroll_assessment,enroll_id_student,enroll_id_teacher,enroll_deleted}) => {
        console.log('----------------- dentro dE UPDATE enrollS--------');
        return await db.query('update Appteachers.Enrollments set enroll_start_date = ?,enroll_end_date = ?,enroll_comments = ?,enroll_assessment = ?,enroll_id_student = ?,enroll_id_teacher = ?, enroll_deleted = ? where enroll_id = ?',[enroll_start_date,enroll_end_date,enroll_comments,enroll_assessment,enroll_id_student,enroll_id_teacher,enroll_deleted,enroll_id]);
}

const setdeleted_enroll_ById = async (enroll_id) => {
    console.log('setdeleted_enroll_ById: ',enroll_id)
    return await db.query(
    'update Appteachers.Enrollments set enroll_deleted = "SI" where enroll_id = ?',[enroll_id]
    );
}

// esta función no la usamos:

module.exports = {
    getEnrollById,
    getAll_enrolls,
    insert_enrolls,
    update_enrolls,
    setdeleted_enroll_ById,
    getEnrollByStudent,
    getEnrollByTeacher
}




