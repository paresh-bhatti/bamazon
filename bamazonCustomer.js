var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",
  port: "8889",
  user: "root",
  password: "yourPasswordHere",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    console.log(' ');
    //start();
  });


function start(){
//prints all items for sale and their details...
 connection.query('SELECT * FROM products', function(err, response){ //why do I write this twice??
   if(err) throw err;

 connection.query('SELECT * FROM products', function(err, response){
    console.log(' ');
    console.log("======================================================================================================================================");
  for (var i = 0; i < response.length; i++) {
    console.log(response[i].item_id + " | " + response[i].product_name + " ||| " + response[i].department_name + " ||| " + response[i].price + " ||| " + response[i].stock_quantity);
  
}
    console.log("======================================================================================================================================");
 });


  console.log(' ');

  inquirer.prompt([
    {
      type: "input",
      name: "item_id",
      message: "What is the ID of the product you would like to buy?",
      validate: function(value){
        if(isNaN(value) == false && parseInt(value) <= response.length && parseInt(value) > 0){
          return true;
        } else{
          return false;
        }
      }
    },
    {
      type: "input",
      name: "stock_quantity",
      message: "How many units of the product would you like to buy?",
      validate: function(value){
        if(isNaN(value)){
          return false;
        } else{
          return true;
        }
      }
    }
    ]).then(function(answer){
      var whatProduct = (answer.item_id)-1;
      var whatQuantity = parseInt(answer.stock_quantity);
      var grandTotal = parseFloat(((response[whatProduct].price)*whatQuantity).toFixed(2));

      //check if quantity is sufficient
      if(response[whatProduct].stock_quantity >= whatQuantity){
        //after purchase, updates quantity in products in the MySqlWorkbench
        connection.query("UPDATE products SET ? WHERE ?", [
        {stock_quantity: (response[whatProduct].stock_quantity - whatQuantity)},
        {item_id: answer.item_id}
        ], function(err, result){
            if(err) throw err;
            console.log("Success! Your total is $" + grandTotal.toFixed(2) + ". Your item will be shipped to you in 3-5 business days.\n\n");
            reprompt();
        });

        connection.query("SELECT * FROM department_name", function(err, deptRes){
          if(err) throw err;
          var index;
          for(var i = 0; i < deptRes.length; i++){
            if(deptRes[i].department_name === response[whatProduct].department_name){
              index = i;
            }
          }
          
          //updates totalSales in departments table
          connection.query("UPDATE department_name SET ? WHERE ?", [
          {TotalSales: deptRes[index].TotalSales + grandTotal},
          {department_name: response[whatProduct].department_name}
          ], function(err, deptRes){
              if(err) throw err;
              //console.log("Updated Dept Sales.");
          });
        });

      } else{
        console.log("Insufficient quantity!\n\n");
        reprompt();
      }

    })
})
}

//asks if they would like to purchase another item
function reprompt(){
  inquirer.prompt([{
    type: "confirm",
    name: "reply",
    message: "Would you like to purchase another item?"
  }]).then(function(answer){
    if(answer.reply){
      start();
    } else{
      console.log("Thank you for visiting Bamazon. See you later!");
      connection.end();
    }
  });
}

start();
