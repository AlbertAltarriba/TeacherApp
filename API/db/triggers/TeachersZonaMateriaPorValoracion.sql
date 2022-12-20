SELECT teach_name as Profesor, teach_city as Ciudad, teach_zip as CP, avg(enroll_assessment) as Valoracion 
FROM Appteachers.Teachers 
JOIN AppTeachers.Subjects ON subj_id=teach_id_subject and subj_name= "LENGUA" 
JOIN Appteachers.Users ON user_id=teach_id_user 
JOIN Appteachers.Enrollments ON enroll_id_teacher=teach_id 
WHERE (user_deleted ="NO" and teach_validated = "SI" and teach_zip= "46702") 
GROUP BY Profesor, Ciudad, CP ORDER BY Valoracion DESC