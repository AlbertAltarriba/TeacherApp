var express = require('express');
var router = express.Router();
const teacherModel = require('../../../models/teacher');
const {getTeacherNearByCPandSubject} = teacherModel;

/* GET home page. */
router.get('/', async function(req, res, next) {
 // GET http://localhost:3333/api/teachers/teachersnear?materia='LENGUA'&cp='46702'
 console.log('http://localhost:3333/api/ req.params.cp,req.params.materia:',req.query.cp,req.query.materia);
 try {
   const  [result] = await getTeacherNearByCPandSubject(req.query.cp,req.query.materia);
   res.status(200).send(result);
 } catch (err) {res.status(500).send({ error: err.message });}
   
  //res.send('--- TEACHERSNEAR ------');
});

module.exports = router;
