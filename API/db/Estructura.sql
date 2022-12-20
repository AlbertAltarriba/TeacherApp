-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema Appteachers
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Appteachers
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Appteachers` ;
USE `Appteachers` ;

-- -----------------------------------------------------
-- Table `Appteachers`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Appteachers`.`Users` (
  `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_email` VARCHAR(45) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' NOT NULL COMMENT 'Debe ser único y debe tener un índice para consultas rápidas. Lo convertimos a mayúsculas y lo grabamos en mayúsculas',
  `user_password` VARCHAR(100) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' NOT NULL COMMENT 'AES_ENCRYPT(password,’frase’) -> 32 caracteres',
  `user_type` ENUM('ADMIN', 'TEACHER', 'STUDENT') CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' NOT NULL COMMENT 'Puede ser ADMIN, TEACHER, STUDENT',
  `user_deleted` ENUM('SI', 'NO') CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' NOT NULL DEFAULT 'NO' COMMENT 'Si se ‘borra’ el campo, se pone a ‘1’ o verdadero',
  `user_created` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `email_user_UNIQUE` (`user_email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Appteachers`.`Admins`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Appteachers`.`Admins` (
  `admin_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `admin_name` VARCHAR(45) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' NOT NULL,
  `admin_phone` VARCHAR(13) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' NOT NULL,
  `admin_zip` VARCHAR(10) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' NOT NULL,
  `admin_city` VARCHAR(45) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' NOT NULL,
  `admin_address` VARCHAR(45) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' NOT NULL,
  `admin_id_user` INT UNSIGNED NOT NULL,
  `admin_validated` VARCHAR(45) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' NULL DEFAULT 'NO',
  `admin_last_name` VARCHAR(45) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' NULL DEFAULT NULL,
  `admin_image` VARCHAR(45) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' NULL DEFAULT NULL,
  PRIMARY KEY (`admin_id`),
  INDEX `fk_Admins_Users1_idx` (`admin_id_user` ASC),
  CONSTRAINT `fk_Admins_Users1`
    FOREIGN KEY (`admin_id_user`)
    REFERENCES `Appteachers`.`Users` (`user_id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Appteachers`.`Students`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Appteachers`.`Students` (
  `student_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `student_name` VARCHAR(45) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NOT NULL,
  `student_phone` VARCHAR(13) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' NOT NULL,
  `student_zip` VARCHAR(10) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' NOT NULL,
  `student_city` VARCHAR(45) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' NOT NULL COMMENT 'Se convierte a mayúsculas y se guarda sólo en mayúsculas',
  `student_address` VARCHAR(45) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' NOT NULL,
  `student_id_user` INT UNSIGNED NOT NULL,
  `student_last_name` VARCHAR(45) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' NULL DEFAULT NULL,
  `student_image` VARCHAR(45) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' NULL DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  UNIQUE INDEX `id_student_UNIQUE` (`student_id` ASC),
  INDEX `fk_Students_Users1_idx` (`student_id_user` ASC),
  CONSTRAINT `fk_Students_Users1`
    FOREIGN KEY (`student_id_user`)
    REFERENCES `Appteachers`.`Users` (`user_id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Appteachers`.`Subjects`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Appteachers`.`Subjects` (
  `subj_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `subj_name` VARCHAR(45) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' NULL DEFAULT NULL COMMENT 'Estará en mayúsculas y tiene un índice para acceder más rápidamente',
  PRIMARY KEY (`subj_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Appteachers`.`Teachers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Appteachers`.`Teachers` (
  `teach_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `teach_name` VARCHAR(45) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' NOT NULL COMMENT 'Se permiten mayúsculas y minúsculas',
  `teach_zip` VARCHAR(10) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' NOT NULL COMMENT 'Código postal del profe. Puede ser número o letras, según el país. Crearemos un índice.',
  `teach_price_an_hour` DECIMAL(10,2) NOT NULL COMMENT 'Usamos 10 dígitos en total porque no sabemos la moneda del país y puede ser una moneda con poco valor y haber un número muy grande.',
  `teach_description` TEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' NULL DEFAULT NULL COMMENT 'Puede no haber una descripción inicial y añadirse posteriormente',
  `teach_experience_years` TINYINT NOT NULL,
  `teach_address` VARCHAR(45) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' NOT NULL,
  `teach_phone` VARCHAR(13) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' NOT NULL COMMENT 'Podemos poner +34, por tanto son caracteres.',
  `teach_validated` ENUM('SI', 'NO') CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' NOT NULL DEFAULT 'NO' COMMENT 'P¿Ha sido validado por el Administrador? Por defecto, no está validado.',
  `teach_id_user` INT UNSIGNED NULL DEFAULT NULL,
  `teach_id_subject` INT UNSIGNED NULL DEFAULT NULL,
  `teach_city` VARCHAR(45) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' NULL DEFAULT NULL,
  `teach_last_name` VARCHAR(45) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' NULL DEFAULT NULL,
  `teach_image` VARCHAR(45) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' NULL DEFAULT NULL,
  PRIMARY KEY (`teach_id`),
  UNIQUE INDEX `id_profe_UNIQUE` (`teach_id` ASC, `teach_zip` ASC),
  INDEX `fk_Teachers_Users_idx` (`teach_id_user` ASC),
  INDEX `fk_Teachers_Subject1_idx` (`teach_id_subject` ASC),
  CONSTRAINT `fk_Teachers_Subject1`
    FOREIGN KEY (`teach_id_subject`)
    REFERENCES `Appteachers`.`Subjects` (`subj_id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_Teachers_Users`
    FOREIGN KEY (`teach_id_user`)
    REFERENCES `Appteachers`.`Users` (`user_id`)
    ON DELETE SET NULL
    ON UPDATE SET NULL)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Appteachers`.`Enrollments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Appteachers`.`Enrollments` (
  `enroll_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `enroll_start_date` DATE NULL DEFAULT NULL,
  `enroll_end_date` DATE NULL DEFAULT NULL COMMENT 'Dentro de 30 dias',
  `enroll_comments` TEXT CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_unicode_ci' NULL DEFAULT NULL COMMENT 'Valoración de 1 a 5 estrellas',
  `enroll_assessment` TINYINT UNSIGNED NULL DEFAULT '3' COMMENT 'Valoración del profesor de 1 a 5 estrellas',
  `enroll_id_student` INT UNSIGNED NOT NULL,
  `enroll_id_teacher` INT UNSIGNED NOT NULL,
  `enroll_deleted` SET('SI', 'NO') NULL DEFAULT 'NO',
  PRIMARY KEY (`enroll_id`),
  INDEX `fk_Enrollments_Students1_idx` (`enroll_id_student` ASC),
  INDEX `fk_Enrollments_Teachers1_idx` (`enroll_id_teacher` ASC),
  CONSTRAINT `fk_Enrollments_Students1`
    FOREIGN KEY (`enroll_id_student`)
    REFERENCES `Appteachers`.`Students` (`student_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Enrollments_Teachers1`
    FOREIGN KEY (`enroll_id_teacher`)
    REFERENCES `Appteachers`.`Teachers` (`teach_id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
