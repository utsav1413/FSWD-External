// app.js

const express = require("express");
const bodyParser = require("body-parser");
const employees = [
  {
    employeeId: "1",
    employeeName: "XYZ",
    employeePost: "Manager",
 
  },
  {
    employeeId: "2",
    employeeName: "ABC",
    employeePost: "Assistant Manager",
  },
];

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", function (req, res) {
  res.render("home", {
    data: employees,
  });
});

app.post("/", (req, res) => {
  const inputEmployeeId = employees.length + 1;
  const inputEmployeeName = req.body.employeeName;
  const inputEmployeePost = req.body.employeePost;
 

  employees.push({
    employeeId: inputEmployeeId,
    employeeName: inputEmployeeName,
    employeePost: inputEmployeePost,

  });

  res.render("home", {
    data: employees,
  });
});

app.post("/delete", (req, res) => {
  var requestedEmployeeId = req.body.employeeId;
  var j = 0;
  employees.forEach((employee) => {
    j = j + 1;
    if (employee.employeeId === requestedEmployeeId) {
      employees.splice(j - 1, 1);
    }
  });
  res.render("home", {
    data: employees,
  });
});

app.post("/update", (req, res) => {
  const requestedEmployeeId = req.body.employeeId;
  const inputEmployeeName = req.body.employeeName;
  const inputEmployeePost = req.body.employeePost;
  

  var j = 0;
  employees.forEach((employee) => {
    j = j + 1;
    if (employee.employeeId == requestedEmployeeId) {
      (employee.employeeName = inputEmployeeName),
        (employee.employeePost = inputEmployeePost);
  
    }
  });
  res.render("home", {
    data: employees,
  });
});

app.listen(3000, (req, res) => {
  console.log("App is running on port 3000");
});