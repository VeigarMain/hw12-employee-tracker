const inquirer = require("inquirer");
const mysql = require("mysql");


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yankees',
    database: 'employee_db',
    port: 3306
  });

  connection.connect((err) => {
      if (err) throw err;
      start();
  });

function start() {
    inquirer.prompt({
        name: "steps",
        type: "list",
        message: "Please pick what applies to you.",
        choices: [
            "Show departments",
            "Show employees",
            "Show roles",
            "Add department",
            "Add employees",
            "Add roles",
            "Update employee roles",
            "End"

        ]
    }).then((response) => {
        switch (response.steps) {
            case "Show departments":
                showDepartments();
                break;
            case "Show employees":
                showEmployees();
                break;
            case "Show roles":
                showRoles();
                break;
            case "Add department":
                addDepartment();
                break;
            case "Add employees":
                addEmployees();
                break;
            case "Add roles":
                addRoles();
                break;
            case "Update role":
                updateRole();
                break; 
            case "End":
                connection.end();
                break;
        }
    });
    
};
// function for command line to show departments after input
function showDepartments() {
    var query = "SELECT * FROM department";
      connection.query(query, function(err, res) {
          console.log(`DEPARTMENTS:`)
        res.forEach(department => {
            console.log(`ID: ${department.id} | Name: ${department.name}`)
        })
        start();
        });
    };

function showRoles() {
    var query = "SELECT * FROM role";
        connection.query(query, function(err, res) {
            console.log(`ROLES:`)
        res.forEach(role => {
            console.log(`ID: ${role.id} | Title: ${role.title} | Salary: ${role.salary} | Department ID: ${role.department_id}`);
        })
        start();
        });
    };

function showEmployees() {
    var query = "SELECT * FROM employee";
        connection.query(query, function(err, res) {
            console.log(`EMPLOYEES:`)
        res.forEach(employee => {
            console.log(`ID: ${employee.id} | Name: ${employee.first_name} ${employee.last_name} | Role ID: ${employee.role_id} | Manager ID: ${employee.manager_id}`);
        })
        start();
        });
    };

function addDepartment() {
    inquirer.prompt({
            name: "department",
            type: "input",
            message: "What is the name of the new department?",
          })
        .then(function(answer) {
        var query = "INSERT INTO department (name) VALUES ( ? )";
        connection.query(query, answer.department, function(err, res) {
            console.log(`You have added this department: ${(answer.department).toUpperCase()}.`)
        })
        showDepartments();
        })
}

function addRoles() {
    connection.query('SELECT * FROM department', function(err, res) {
        if (err) throw (err);
    inquirer.prompt([{
            name: "title",
            type: "input",
            message: "What is the title of their new role?",
          }, 
          {
            name: "salary",
            type: "input",
            message: "What is the salary of this new role?",
          },
          {
            name: "departmentName",
            type: "list",
            message: "Which department does this role fall under?",
            choices: function() {
                var choicesArray = [];
                res.forEach(res => {
                    choicesArray.push(
                        res.name
                    );
                })
                return choicesArray;
              }
          }
          ]) .then(function(answer) {
        const department = answer.departmentName;
        connection.query('SELECT * FROM DEPARTMENT', function(err, res) {
        
            if (err) throw (err);
         let filteredDept = res.filter(function(res) {
            return res.name == department;
        }
        )
        let id = filteredDept[0].id;
       let query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
       let values = [answer.title, Number(answer.salary), id]
       console.log(values);
        connection.query(query, values,
            function(err, res, fields) {
            console.log(`You have added this role: ${(values[0]).toUpperCase()}.`)
        })
            showRoles()
            })
        })
    })
}
function addEmployees() {
    connection.query('SELECT * FROM role', function(err, result) {
        if (err) throw (err);
    inquirer.prompt([{
            name: "firstName",
            type: "input",
            message: "What is the employee's first name?",
          }, 
          {
            name: "lastName",
            type: "input",
            message: "What is the employee's last name?",
          },
          {
            name: "roleName",
            type: "list",
            message: "What role does the employee have?",
            choices: function() {
             rolesArray = [];
                result.forEach(result => {
                    rolesArray.push(
                        result.title
                    );
                })
                return rolesArray;
              }
          }
          ]).then(function(answer) {
        console.log(answer);
        const role = answer.roleName;
        connection.query('SELECT * FROM role', function(err, res) {
            if (err) throw (err);
            let filteredRole = res.filter(function(res) {
                return res.title == role;
            })
        let roleId = filteredRole[0].id;
        connection.query("SELECT * FROM employee", function(err, res) {
                inquirer.prompt ([{
                        name: "manager",
                        type: "list",
                        message: "Who is your manager?",
                        choices: function() {
                            managersArray = []
                            res.forEach(res => {
                                managersArray.push(
                                    res.last_name)
                                
                            })
                            return managersArray;
                        }
                    }
                ]).then(function(managerAnswer) {
                    const manager = managerAnswer.manager;
                connection.query('SELECT * FROM employee', function(err, res) {
                if (err) throw (err);
                let filteredManager = res.filter(function(res) {
                return res.last_name == manager;
            })
            let managerId = filteredManager[0].id;
                    console.log(managerAnswer);
                    let query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
                    let values = [answer.firstName, answer.lastName, roleId, managerId]
                    console.log(values);
                     connection.query(query, values,
                         function(err, res, fields) {
                         console.log(`You have added this employee: ${(values[0]).toUpperCase()}.`)
                        })
                        showEmployees();
                        })
                     })
                })
            })
        })
})
}

function updateRole() {
    connection.query('SELECT * FROM employee', function(err, result) {
        if (err) throw (err);
    inquirer.prompt([
          {
            name: "employeeName",
            type: "list",
            message: "Which employee's role is changing?",
            choices: function() {
             employeeArray = [];
                result.forEach(result => {
                    employeeArray.push(
                        result.last_name
                    );
                })
                return employeeArray;
              }
          }
          ]).then(function(answer) {
        console.log(answer);
        const name = answer.employeeName;
        connection.query("SELECT * FROM role", function(err, res) {
                inquirer.prompt ([{
                        name: "role",
                        type: "list",
                        message: "What is their new role?",
                        choices: function() {
                            rolesArray = [];
                            res.forEach(res => {
                                rolesArray.push(
                                    res.title)                
                            })
                            return rolesArray;
                        }
                    }
                ]).then(function(rolesAnswer) {
                    const role = rolesAnswer.role;
                    console.log(rolesAnswer.role);
                connection.query('SELECT * FROM role WHERE title = ?', [role], function(err, res) {
                if (err) throw (err);
                    let roleId = res[0].id;
                    let query = "UPDATE employee SET role_id ? WHERE last_name ?";
                    let values = [roleId, name]
                    console.log(values);
                     connection.query(query, values,
                         function(err, res, fields) {
                         console.log(`You have updated ${name}'s role to ${role}.`)
                        })
                        showEmployees();
                        })
                     })
                })
       })
})
}





































































































































// showDepartments(() => {
//     const query = "SELECT * FROM department";
//     connection.query(query((err, res)=> {
//         console.log(`DEPARTMENTS:`)
//         res.map
//     }))
// })




  