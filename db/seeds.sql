USE employee_db;


INSERT INTO department (name)
VALUES ("Sales"), ("Finance"), ("Legal"), ("Engineering");

INSERT INTO roles (salary, title, department_id)
VALUES ("Jr Sales", 100000, 1), ("Salesperson", 60000, 1), ("Engineer", 90000, 2), ("Software Engineer", 120000, 2), ("Accountant", 112000, 3), ("Legal Lead", 135000, 6), ("Lawyer", 190000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("John", "Adams", 1, null), ("George", "Washington", 3, null), ("Thomas", "Jefferson", 4, 2), ("Ben", "Franklin", 6, null), ("Paul", "Revere", 2, 1), ("James", "Madison", 2, 1);


-- USE employee_db;

-- INSERT INTO department (name) VALUES ("Human Resources");
-- INSERT INTO department (name) VALUES ("Marketing");
-- INSERT INTO department (name) VALUES ("Information Technology");
-- INSERT INTO department (name) VALUES ("Corporate");

-- INSERT INTO role (title, salary, department_id) VALUES ("Analyst", 70, 3);
-- INSERT INTO role (title, salary, department_id) VALUES ("Communications Associate", 50, 2);
-- INSERT INTO role (title, salary, department_id) VALUES ("Social Media Manager", 50, 2);
-- INSERT INTO role (title, salary, department_id) VALUES ("Director", 100, 1);
-- INSERT INTO role (title, salary, department_id) VALUES ("Director", 100, 4);

-- INSERT INTO employee (first_name, last_name, role_id) VALUES ("David", "Jester", 2);
-- INSERT INTO employee (first_name, last_name, role_id) VALUES ("Abby", "Whiteman", 1);
-- INSERT INTO employee (first_name, last_name, role_id) VALUES ("Katie", "Pieto", 3);
-- INSERT INTO employee (first_name, last_name, role_id) VALUES ("Rachael", "Squirm", 4);
-- INSERT INTO employee (first_name, last_name, role_id) VALUES ("Lizzie", "Halep", 5);