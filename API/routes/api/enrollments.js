"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
const enrollmentModel = require('../../models/enrollment');
const { getAll_enrolls, getAll_enrolls_paginacion, insert_enrolls, update_enrolls, getEnrollById, setdeleted_enroll_ById, getEnrollByStudent, getEnrollByTeacher } = enrollmentModel;
const autorizacion = require("../middlewares");
const { checkToken, accesoTeachers, accesoAdministrator, accesoStudents, accesoTeachersORAdministrator } = autorizacion;
/* GET http://localhost:3333/api/enrollments */
const router_getAll_enrolls = async (req, res) => {
    try {
        console.log('---- DENTRO de GET DE ENROLLMENTS - ------');
        const [rows] = await getAll_enrolls();
        res.status(200).send(rows);
    }
    catch (err) {
        res.status(500).send({ error: err.message });
    }
};
router.get('/', checkToken, router_getAll_enrolls);
// /* GET http://localhost:3333/api/enrollments/:offset/:cant */
// const router_getAll_enrolls_paginacion = async (req, res) => {
//     try {
//         console.log('---- DENTRO de GET DE ENROLLMENTS - ------');
//         const [rows] = await getAll_enrolls_paginacion(parseInt(req.params.offset), parseInt(req.params.cant));
//         res.status(200).send(rows);
//     }
//     catch (err) {
//         res.status(500).send({ error: err.message });
//     }
// };
// router.get('/:offset/:cant', checkToken, router_getAll_enrolls_paginacion);
/* POST http://localhost:3333/api/enrollments */
const router_insert_enrolls = async (req, res) => {
    try {
        console.log('---- DENTRO de POST DE ENROLLMENTS - crear ENROLLMENT------');
        console.log('-------- el Body del Post Enrollment es:------');
        console.log(req.body);
        const [rows] = await insert_enrolls(req.body);
        res.status(200).send(rows);
    }
    catch (err) {
        res.status(500).send({ error: err.message });
    }
};
router.post('/', checkToken, router_insert_enrolls);
/* GET http://localhost:3333/api/enrollments/students/:studentId */
const router_getEnrollByStudent = async (req, res, next) => {
    try {
        console.log('---- DENTRO de  ----GET http://localhost:3333/api/enrollments/students/:studentId-----------------router_getEnrollByStudent-');
        console.log('-------- el parametro de GET Enrollment es:------');
        console.log(req.params.studentId);
        const [rows] = await getEnrollByStudent(req.params.studentId);
        res.status(200).send(rows);
    }
    catch (err) {
        res.status(500).send({ error: err.message });
    }
};
router.get('/students/:studentId', checkToken, router_getEnrollByStudent);
/* GET http://localhost:3333/api/enrollments/teachers/:teacherId */
const router_getEnrollByTeacher = async (req, res, next) => {
    try {
        console.log('---- DENTRO de GET DE STUDENTS POR ID DE TEACHER DE ENROLLMENTS -------');
        console.log('-------- el parametro de GET Enrollment es:------');
        console.log(req.params.teacherId);
        const [rows] = await getEnrollByTeacher(req.params.teacherId);
        res.status(200).send(rows);
    }
    catch (err) {
        res.status(500).send({ error: err.message });
    }
};
router.get('/teachers/:teacherId', checkToken, router_getEnrollByTeacher);
/* GET http://localhost:3333/api/enrollments/:enrollmentId */
const router_getEnrollById = async (req, res, next) => {
    try {
        console.log('---- DENTRO de GET DE ENROLLMENT POR ID DE ENROLLMENTS -------');
        console.log('-------- el parametro de GET Enrollment es:------');
        console.log(req.params.enrollmentId);
        const [rows] = await getEnrollById(req.params.enrollmentId);
        res.status(200).send(rows);
    }
    catch (err) {
        res.status(500).send({ error: err.message });
    }
};
router.get('/:enrollmentId', checkToken, router_getEnrollById);
/* PUT http://localhost:3333/api/enrollments/:enrollmentId */
const router_update_enrolls = async (req, res, next) => {
    // req.body debe tener  {enroll_start_date,enroll_end_date,enroll_comments,enroll_assessment,enroll_id_student,enroll_id_teacher}
    try {
        console.log('---- DENTRO de PUT DE ENROLLMENTS -------');
        console.log('-------- el parametro de PUT Enrollment es:------');
        console.log(req.params.enrollmentId);
        console.log('-------- el BODY de PUT Enrollment es:------');
        console.log(req.body);
        const [rows] = await update_enrolls(req.params.enrollmentId, req.body);
        res.status(200).send(rows);
    }
    catch (err) {
        res.status(500).send({ error: err.message });
    }
};
router.put('/:enrollmentId', checkToken, router_update_enrolls);
/* DELETE http://localhost:3333/api/enrollments/:enrollmentId */
const router_setdeleted_enroll_ById = async (req, res) => {
    try {
        console.log('---- DENTRO de DELETE DE ENROLLMENTS -------');
        console.log('-------- el parametro de DELETE Enrollment es:------');
        console.log(req.params.enrollmentId);
        const [rows] = await setdeleted_enroll_ById(req.params.enrollmentId);
        res.status(200).send(rows);
    }
    catch (err) {
        res.status(500).send({ error: err.message });
    }
};
router.delete('/:enrollmentId', checkToken, router_setdeleted_enroll_ById);
module.exports = router;
