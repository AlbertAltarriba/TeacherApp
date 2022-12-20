DROP TRIGGER IF EXISTS `Appteachers`.`Teachers_BEFORE_INSERT_teacher_city`;
CREATE DEFINER = CURRENT_USER TRIGGER `Appteachers`.`Teachers_BEFORE_INSERT_teacher_city` 
BEFORE INSERT ON `Appteachers`.`Teachers` FOR EACH ROW
SET NEW.teach_city = LOWER(NEW.teach_city);