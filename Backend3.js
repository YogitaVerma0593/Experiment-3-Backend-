var http = require("http");
var fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signupB-3.html"));
});

app.post("/register", (req, res) => {
  const formData = req.body;

  // Format the data as a string
  const dataToSave = `
    Username: ${formData.username}
    Password: ${formData.password}
    Id: ${formData.Id}
    Age: ${formData.age}
    Date of Joining: ${formData.DOJ}
    Salary: ${formData.Salary}
    Email: ${formData.Email}
    Department: ${formData.Department}
    Post: ${formData.Post}
    ----------------------------------------
    `;

  // Save the data to a text file
  fs.appendFile("userData.txt", dataToSave, (err) => {
    if (err) {
      console.error("Error saving data:", err);
      return res.status(500).send("Error saving data");
    }
    res.status(201).send("User registered and data saved");
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});