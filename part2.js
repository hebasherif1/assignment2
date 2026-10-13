const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

const file = "./users.json";



//q1
app.post("/user", (req, res) => {
    const { name, age, email } = req.body;

    const users = JSON.parse(fs.readFileSync(file, "utf8"));

    // Check if email already exists
    const emailExists = users.some(user => user.email === email);

    if (emailExists) {
        return res.json({
            message: "Email already exists."
        });
    }

    // Generate new ID
    let newId = 1;

    if (users.length > 0) {
        newId = users[users.length - 1].id + 1;
    }

    const newUser = {
        id: newId,
        name: name,
        age: age,
        email: email
    };

    users.push(newUser);

    fs.writeFileSync(file, JSON.stringify(users, null, 2));

    res.json({
        message: "User added successfully."
    });
});


//q2
app.patch("/user/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const users = JSON.parse(fs.readFileSync(file, "utf8"));

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.json({
            message: "User ID not found."
        });
    }

    if (req.body.name !== undefined) {
        user.name = req.body.name;
    }

    if (req.body.age !== undefined) {
        user.age = req.body.age;
    }

    if (req.body.email !== undefined) {
        user.email = req.body.email;
    }

    fs.writeFileSync(file, JSON.stringify(users, null, 2));

    res.json({
        message: "User updated successfully."
    });
});



//q3
app.delete("/user/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const users = JSON.parse(fs.readFileSync(file, "utf8"));

    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
        return res.json({
            message: "User ID not found."
        });
    }

    users.splice(userIndex, 1);

    fs.writeFileSync(file, JSON.stringify(users, null, 2));

    res.json({
        message: "User deleted successfully."
    });
});




//q4
app.get("/user", (req, res) => {
    const users = JSON.parse(fs.readFileSync(file, "utf8"));

    res.json(users);
});



//q5
app.get("/user/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const users = JSON.parse(fs.readFileSync(file, "utf8"));

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.json({
            message: "User not found."
        });
    }

    res.json(user);
});


//server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});