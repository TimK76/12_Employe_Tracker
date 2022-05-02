const inquirer = require("inquirer");
const db = require("./db/connections");

db.connect(function (err) {
  if (err) throw error;
  startMenu();
});

const menuQuestions = [
  {
    type: "list",
    name: "menu",
    message: "What would you likd to do?",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "View Employees by Manager",
      "Add a Department",
      "Add a Role",
      "Add an Employee",
      "Update an Employee's Role",
      "Update an Employee's Manager",
    ],
  },
];

function startMenu() {
  inquirer.prompt(menuQuestions).then((answer) => {
    if (answer.menu === "View All Departments") {
      db.query(`SELECT * FROM department`, (err, rows) => {
        console.table(rows);
        inquirer.prompt(menuQuestions);
      });
    } else if (answer.menu === "View All Roles") {
      db.query(`SELECT * FROM role`, (err, rows) => {
        console.table(rows);
        inquirer.prompt(menuQuestions);
      });
    } else if (answer.menu === "View All Employees") {
      db.query(`SELECT * FROM employee`, (err, rows) => {
        console.table(rows);
        inquirer.prompt(menuQuestions);
      });
    } else if (answer.menu === "View Employees by Manager") {
      // run query SELECT * FROM employee WHERE manager = ?
      db.query(`SELECT * FROM employee WHERE manager =?`);
    } else if (answer.menu === "Add a Department") {
      // run query INSERT INTO department;
      db.query(`INSERT INTO  department`);
    } else if (answer.menu === "Add a Role") {
      // run query INSERT INTO role
    } else if (answer.menu === "Add an Employee") {
      // run query INSERT INTO employee
    } else if (answer.menu === "Update an Employee's Role") {
      // run query UPDATE
    } else if (answer.menu === "Update an Employee's Manager") {
      // run query UPDATE manager
    }
  });
}
