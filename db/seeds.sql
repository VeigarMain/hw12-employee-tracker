USE employee_db;


INSERT INTO department (name)
VALUES ("Sales"), ("Finance"), ("Legal"), ("Engineering");

INSERT INTO roles (salary, title, department_id)
VALUES ("Jr Sales", 100000, 1), ("Salesperson", 60000, 1), ("Engineer", 90000, 2), ("Software Engineer", 120000, 2), ("Accountant", 112000, 3), ("Legal Lead", 135000, 6), ("Lawyer", 190000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("John", "Adams", 1, null), ("George", "Washington", 3, null), ("Thomas", "Jefferson", 4, 2), ("Ben", "Franklin", 6, null), ("Paul", "Revere", 2, 1), ("James", "Madison", 2, 1);
