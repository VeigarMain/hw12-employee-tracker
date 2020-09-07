-- Drops the employee_db if it already exists --
DROP DATABASE IF EXISTS employee_db;

-- Create the database employee_db and specified it for use.
CREATE DATABASE employee_db;

USE employee_db;

-- Create the tables .
CREATE TABLE departments (
  id INT AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE roles (
    -- maybe add an increment here??
    id INT PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(8,3) NOT NULL,
    department_id INT NOT NULL
);

CREATE TABLE employees (
      id INT AUTO_INCREMENT, 
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL, 
    role_id INT NOT NULL, 
    manager_id INT,
    PRIMARY KEY(id),

    FOREIGN KEY(role_id),
    REFERENCES role(id),

    FOREIGN KEY(manager_id),
    REFERENCES employee(id)
);
