DROP TRIGGER IF EXISTS `Appteachers`.`Teachers_BEFORE_INSERT_VALIDATED`;
CREATE DEFINER = CURRENT_USER TRIGGER `Appteachers`.`Teachers_BEFORE_INSERT_VALIDATED` 
BEFORE INSERT ON `Appteachers`.`Teachers` FOR EACH ROW
IF (NEW.teach_validated <> "SI") THEN SET NEW.teach_validated  = "NO";
END IF;