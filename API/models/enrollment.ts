
type TipoEnrollment={
    enroll_start_date:string,
    enroll_end_date:string,
    enroll_comments?:string,
    enroll_assessment?:string,
    enroll_id_student:string,
    enroll_id_teacher:string,
    enroll_deleted:string
};

const getEnrollById= async (enroll_id:string) => {
    return await db.query('select * from Appteachers.Enrollments where enroll_id = ?',[enroll_id]);
}

const getEnrollByStudent= async (enroll_id_student:string) => {
    return await db.query('select * from Appteachers.Enrollments where enroll_id_student = ?',[enroll_id_student]);
}
const getEnrollByTeacher= async (enroll_id_teacher:string) => {
    return await db.query('select * from Appteachers.Enrollments where enroll_id_teacher = ?',[enroll_id_teacher]);
}

const getAll_enrolls= async () => {
    return await db.query('select * from Appteachers.Enrollments');
}

const getAll_enrolls_paginacion= async (desde:number, cant:number) => {
    return await db.query('select * from Appteachers.Enrollments LIMIT ?,?',[desde,cant]);
}

const insert_enrolls= async ({enroll_start_date,enroll_end_date,enroll_comments,enroll_assessment,enroll_id_student,enroll_id_teacher,enroll_deleted}:TipoEnrollment) => {
    return await db.query('insert into Appteachers.Enrollments (enroll_id,enroll_start_date,enroll_end_date,enroll_comments,enroll_assessment,enroll_id_student,enroll_id_teacher,enroll_deleted) values (?,?,?,?,?,?,?,?)',[null,enroll_start_date,enroll_end_date,enroll_comments,enroll_assessment,enroll_id_student,enroll_id_teacher,enroll_deleted]);
}

const update_enrolls = async (enroll_id:string, {enroll_start_date,enroll_end_date,enroll_comments,enroll_assessment,enroll_id_student,enroll_id_teacher,enroll_deleted}:TipoEnrollment) => {
        return await db.query('update Appteachers.Enrollments set enroll_start_date = ?,enroll_end_date = ?,enroll_comments = ?,enroll_assessment = ?,enroll_id_student = ?,enroll_id_teacher = ?, enroll_deleted = ? where enroll_id = ?',[enroll_start_date,enroll_end_date,enroll_comments,enroll_assessment,enroll_id_student,enroll_id_teacher,enroll_deleted,enroll_id]);
}

const setdeleted_enroll_ById = async (enroll_id:string) => {
    return await db.query(
    'update Appteachers.Enrollments set enroll_deleted = "SI" where enroll_id = ?',[enroll_id]
    );
}

module.exports = {
    getEnrollById,
    getAll_enrolls,
    getAll_enrolls_paginacion,
    insert_enrolls,
    update_enrolls,
    setdeleted_enroll_ById,
    getEnrollByStudent,
    getEnrollByTeacher
}




