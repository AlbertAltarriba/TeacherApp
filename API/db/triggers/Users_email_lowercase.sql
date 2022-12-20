DROP TRIGGER IF EXISTS `Appteachers`.`Users_BEFORE_INSERT_email`;
CREATE DEFINER = CURRENT_USER TRIGGER `Appteachers`.`Users_BEFORE_INSERT_email` BEFORE INSERT ON `Users` FOR EACH ROW
SET NEW.user_email = LOWER(NEW.user_email);