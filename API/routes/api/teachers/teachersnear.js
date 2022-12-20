"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
const teacherModel = require('../../../models/teacher');
const { getTeacherNearByCPandSubject } = teacherModel;
/* GET home page. */
const router_getTeacherNearByCPandSubject = async function (req, res, next) {
    // GET http://localhost:3333/api/teachers/teachersnear?materia='LENGUA'&cp='46702'
    console.log('http://localhost:3333/api/ req.params.cp,req.params.materia:', req.query.cp, req.query.materia);
    try {
        const [result] = await getTeacherNearByCPandSubject(req.query.cp, req.query.materia);
        res.status(200).send(result);
    }
    catch (err) {
        res.status(500).send({ error: err.message });
    }
    //res.send('--- TEACHERSNEAR ------');
};
router.get('/', router_getTeacherNearByCPandSubject);
module.exports = router;
