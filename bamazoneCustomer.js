var mysql = require("mysql")
var inquirer = require("inquirer")

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "ginger106",
    database: "bamazon"
  });

  connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });

  function start() {
    inquirer
      .prompt({
        name: "choice",
        type: "rawlist",
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            choiceArray.push(results[i].item_name);
          }
          return choiceArray;
        },
        message: "What item would you like to buy?"
      },
      {
        name: "units",
        type: "input",
        message: `How many ${answer.choices}would you like?`
      })
      .then(function(answer) {
        if (answer.units <= results.stock_quanity) {
          console.log(`You have bought ${answer.units} of ${answer.choice}`)
          results.stock_quanity -= answer.units
        }
        else if(answer.units >= results.stock_quanity) {
          console.log(`There are not enough for you to buy. Come again later.`)
        } else{
          connection.end();
        }
      });
  }