// building a RESTfull APIs using node and express.js

const express = require('express');
const users = require("./data.json");
const fs = require('fs');

const app = express();
const port = 1000;
 
app.use(express.urlencoded({extended : false}));
app.route('/api/users')
  .get((req, res) => {
    return res.json(users);
  });

// REST APIs
app
.route('/api/users/:id')
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user || { error: "User not found" });
  })
  .patch((req, res) => {
    return res.json({ status: "pending" }); // Later: update logic
  })
  .delete((req, res) => {
    return res.json({ status: "pending" }); // Later: deletion logic
  });
app.post('/api/users',(req, res) => {
    const body = req.body;
    users.push({...body , id: users.length+1});
    fs.writeFile('./data.json', JSON.stringify(users) , (err, result) =>{
      
        return res.json({ status: "Success" ,id : users.length}); // You can later implement actual creation
    });
  });

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
