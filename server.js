const inquirer = require("inquirer");
const db = require("./db/connections");

db.connect(function (err) {
  if (err) throw error;
  startMenu();
});

function menuQuestions() {
  [
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
}

function insertQuestions() {
  [
    {
      type: "input",
      name: "department",
      message: "What is the name of the new Department?",
    },
    {
      type: "input",
      name: "role",
      message: "What is the name of the new Role?",
    },
  ];
}

function newEmpQuestions() {
  [
    {
      type: "input",
      name: "fname",
      message: "What is the new employee's first name?",
    },
    {
      type: "input",
      name: "lname",
      message: "What is the new employee's last name?",
    },
    {
      type: "input",
      name: "roleid",
      message: "What is the new employee's role?",
    },
    {
      type: "input",
      name: "manid",
      message: "Who is the new employee's manager?",
    },
  ];
}

function viewDep() {
  db.query(`SELECT * FROM department`, (err, rows) => {
    console.table(rows);
  });
}

function viewRole() {
  db.query(`SELECT * FROM role`, (err, rows) => {
    console.table(rows);
  });
}

function viewEmp() {
  db.query(`SELECT * FROM employee`, (err, rows) => {
    console.table(rows);
  });
}

function viewEmpByMan() {
  db.query(`SELECT * FROM employee WHERE manager =?`, (err, rows) => {
    console.table(rows);
  });
}

function addDep() {
  db.query(
    `INSERT INTO department VALUES (${insertQuestions.department})`,
    (err, rows) => {
      console.table(rows);
    }
  );
}

function addRole() {
  db.query(`INSERT INTO role VALUES (${insertQuestions.role})`, (err, rows) => {
    console.table(rows);
  });
}

function addEmp() {
  db.query(
    `INSERT INTO employee VALUES (${newEmpQuestions.fname}, ${newEmpQuestions.lname},  ${newEmpQuestions.roleid}, ${newEmpQuestions.manid})`,
    (err, rows) => {
      console.table(rows);
    }
  );
}

function updateEmpRole() {
  db.query(`UPDATE employee SET role_id = ?`);
  console.table(rows);
}

function updateEmpMan() {
  db.query(`UPDATE employee SET manager_id = ?`);
  console.table(rows);
}

function startMenu() {
  inquirer.prompt(menuQuestions).then((answer) => {
    if (answer.menu === "View All Departments") {
      viewDep().then(inquirer.prompt(menuQuestions));
    } else if (answer.menu === "View All Roles") {
      viewRole().then(inquirer.prompt(menuQuestions));
    } else if (answer.menu === "View All Employees") {
      viewEmp(inquirer.prompt(menuQuestions));
    } else if (answer.menu === "View Employees by Manager") {
      viewEmpByMan().then(inquirer.prompt(menuQuestions));
    } else if (answer.menu === "Add a Department") {
      addDep().then(inquirer.prompt(menuQuestions));
    } else if (answer.menu === "Add a Role") {
      addRole().then(inquirer.prompt(menuQuestions));
    } else if (answer.menu === "Add an Employee") {
      addEmp().then(inquirer.prompt(menuQuestions));
    } else if (answer.menu === "Update an Employee's Role") {
      updateEmpRole().then(inquirer.prompt(menuQuestions));
    } else if (answer.menu === "Update an Employee's Manager") {
      updateEmpMan().then(inquirer.prompt(menuQuestions));
    }
  });
}

startMenu();
