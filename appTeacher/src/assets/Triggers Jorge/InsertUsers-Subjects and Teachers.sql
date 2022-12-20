
Use appteachers;
##Insertamos 21 Users

INSERT INTO `appteachers`.`users` (`user_id`, `user_email`, `user_password`, `user_type`, `user_deleted`, `user_username`) 
VALUES 
('1', 'Estudiante1@gmail.com', '12345', 'STUDENT', 'NO', 'Student1'),
('2', 'Estudiante2@gmail.com', '12345', 'STUDENT', 'NO', 'Student2'),
('3', 'Estudiante3@gmail.com', '12345', 'STUDENT', 'NO', 'Student3'),
('4', 'Estudiante4@gmail.com', '12345', 'STUDENT', 'NO', 'Student4'),
('5', 'Estudiante5@gmail.com', '12345', 'STUDENT', 'NO', 'Student5'),
('6', 'Estudiante6@gmail.com', '12345', 'STUDENT', 'NO', 'Student6'),
('7', 'Estudiante7@gmail.com', '12345', 'STUDENT', 'NO', 'Student7'),
('8', 'Estudiante8@gmail.com', '12345', 'STUDENT', 'NO', 'Student8'),
('9', 'Estudiante9@gmail.com', '12345', 'STUDENT', 'NO', 'Student9'),
('10', 'Estudiante10@gmail.com', '12345', 'STUDENT', 'NO', 'Student10'),
('11', 'Teacher11@gmail.com', '12345', 'TEACHER', 'NO', 'Teacher1'),
('12', 'Teacher12@gmail.com', '12345', 'TEACHER', 'NO', 'Teacher2'),
('13', 'Teacher13@gmail.com', '12345', 'TEACHER', 'NO', 'Teacher3'),
('14', 'Teacher14@gmail.com', '12345', 'TEACHER', 'NO', 'Teacher4'),
('15', 'Teacher15@gmail.com', '12345', 'TEACHER', 'NO', 'Teacher5'),
('16', 'Teacher16@gmail.com', '12345', 'TEACHER', 'NO', 'Teacher6'),
('17', 'Teacher17@gmail.com', '12345', 'TEACHER', 'NO', 'Teacher7'),
('18', 'Teacher18@gmail.com', '12345', 'TEACHER', 'NO', 'Teacher8'),
('19', 'Teacher19@gmail.com', '12345', 'TEACHER', 'NO', 'Teacher9'),
('20', 'Teacher20@gmail.com', '12345', 'TEACHER', 'NO', 'Teacher10'),
('21', 'Admin@gmail.com', '12345', 'ADMIN', 'NO', 'Admin');


##insertamos subjects

INSERT INTO AppTeachers.Subjects(subj_id, subj_name) VALUES(1,'MATES');
INSERT INTO AppTeachers.Subjects(subj_id, subj_name) VALUES(2,'FÍSICA');
INSERT INTO AppTeachers.Subjects(subj_id, subj_name) VALUES(3,'JAVASCRIPT');
INSERT INTO AppTeachers.Subjects(subj_id, subj_name) VALUES(4,'ANGULAR');
INSERT INTO AppTeachers.Subjects(subj_id, subj_name) VALUES(5,'MYSQL');
INSERT INTO AppTeachers.Subjects(subj_id, subj_name) VALUES(6,'NODE');
INSERT INTO AppTeachers.Subjects(subj_id, subj_name) VALUES(7,'PYTHON');
INSERT INTO AppTeachers.Subjects(subj_id, subj_name) VALUES(8,'HTML');
INSERT INTO AppTeachers.Subjects(subj_id, subj_name) VALUES(9,'CSS');

##Insertamos el admin
INSERT INTO `appteachers`.`admins` (`admin_id`, `admin_name`, `admin_phone`, `admin_zip`, `admin_city`, `admin_address`, `admin_id_user`, `admin_validated`) 
VALUES ('1', 'Admin', '12346789', '28290', 'Madrid', 'Calle del admin', '21', 'SI');


##Insertamos Teachers

INSERT INTO `appteachers`.`teachers` 
(`teach_id`, `teach_name`, `teach_zip`, `teach_price_an_hour`, `teach_description`, `teach_experience_years`, `teach_address`, `teach_phone`, `teach_validated`, `teach_id_user`, `teach_id_subject`, `teach_city`) 
VALUES
('1', 'Profesor 1', '28564', '10.00', 'Profesor 1 es un profe', '2', 'Calle Profesor 1', '632323130', 'NO', '11', '1', 'Madrid'),
('2', 'Profesor 2', '28565', '12.00', 'Profesor 2 es un profe', '3', 'Calle Profesor 2', '632323131', 'NO', '12', '2', 'Madrid'),
('3', 'Profesor 3', '28566', '14.00', 'Profesor 3 es un profe', '5', 'Calle Profesor 3', '632323132', 'NO', '13', '3', 'Madrid'),
('4', 'Profesor 4', '28567', '16.00', 'Profesor 4 es un profe', '7', 'Calle Profesor 4', '632323133', 'NO', '14', '4', 'Madrid'),
('5', 'Profesor 5', '28290', '18.00', 'Profesor 5 es un profe', '10', 'Calle Profesor 5', '632323134', 'NO', '15', '5', 'Madrid'),
('6', 'Profesor 6', '28291', '20.00', 'Profesor 6 es un profe', '12', 'Calle Profesor 6', '632323135', 'NO', '16', '6', 'Madrid'),
('7', 'Profesor 7', '28290', '22.00', 'Profesor 7 es un profe', '15', 'Calle Profesor 7', '632323136', 'NO', '17', '7', 'Madrid'),
('8', 'Profesor 8', '28291', '24.00', 'Profesor 8 es un profe', '17', 'Calle Profesor 8', '632323137', 'SI', '18', '8', 'Madrid'),
('9', 'Profesor 9', '28567', '26.00', 'Profesor 9 es un profe', '28', 'Calle Profesor 9', '632323138', 'NO', '19', '9', 'Madrid'),
('10', 'Profesor 10', '28568', '28.00', 'Profesor 10 es un profe', '20', 'Calle Profesor 10', '632323139', 'NO', '20', '1', 'Madrid');

##Insertamos Students
INSERT INTO `appteachers`.`students` (`student_id`, `student_name`, `student_phone`, `student_zip`, `student_city`, `student_address`, `student_id_user`) 
VALUES 
('1', 'Estudiante 1', '123456789', '28290', 'Madrid', 'Calle Student 1', '1'),
('2', 'Estudiante 2', '123456789', '28291', 'Madrid', 'Calle Student 2', '2'),
('3', 'Estudiante 3', '123456789', '28290', 'Madrid', 'Calle Student 3', '3'),
('4', 'Estudiante 4', '123456789', '28291', 'Madrid', 'Calle Student 4', '4'),
('5', 'Estudiante 5', '123456789', '28567', 'Madrid', 'Calle Student 5', '5'),
('6', 'Estudiante 6', '123456789', '28566', 'Madrid', 'Calle Student 6', '6'),
('7', 'Estudiante 7', '123456789', '28567', 'Madrid', 'Calle Student 7', '7'),
('8', 'Estudiante 8', '123456789', '28568', 'Madrid', 'Calle Student 8', '8'),
('9', 'Estudiante 9', '123456789', '28568', 'Madrid', 'Calle Student 9', '9'),
('10', 'Estudiante 10', '123456789', '28566', 'Madrid', 'Calle Student 10', '10');
