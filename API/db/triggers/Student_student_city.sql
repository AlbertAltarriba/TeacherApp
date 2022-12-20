DROP TRIGGER IF EXISTS `Appteachers`.`Students_BEFORE_INSERT_student_city`;
CREATE DEFINER = CURRENT_USER TRIGGER `Appteachers`.`Students_BEFORE_INSERT_student_city` BEFORE INSERT ON `Students` FOR EACH ROW
SET NEW.student_city = UPPER(NEW.student_city);
