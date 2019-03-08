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
    start();
  });


function start(){
    inquirer.prompt([{
        type: "list",
        name: "doThing",
        message: "Please select an option: ",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "End Session"]
    }]).then (function(answer){
        switch(answer.doThing){
            case "View Products for Sale": viewProducts();
            break;
            case "View Low Inventory": viewLowInventory();
            break;
            case "Add to Inventory": addToInventory();
            break;
            case "Add New Product": addNewProduct();
            break;
            case "End Session": console.log("Ending Manager session -- see you later!");
            connection.end();
            break;
        }    
        });
    }

    //View all inventory
    function viewProducts(){
        console.log('\n')
        connection.query('SELECT * FROM products', function(err, response){
        if (err) throw err;
        connection.query('SELECT * FROM products', function(err, response){
            console.log(' ');
            console.log("======================================================================================================================================");
          for (var i = 0; i < response.length; i++) {
            console.log(response[i].item_id + " | " + response[i].product_name + " ||| " + response[i].department_name + " ||| " + response[i].price + " ||| " + response[i].stock_quantity);
          
        }
            console.log("======================================================================================================================================");
         });
        
        
          console.log(' ');

          start();
        })
    }

    function viewLowInventory(){
        console.log('\n')
        connection.query('SELECT * FROM products where stock_quantity < 5', function(err, response){
        if (err) throw err;
        connection.query('SELECT * FROM products where stock_quantity < 5', function(err, response){
            console.log(' ');
            console.log("======================================================================================================================================");
          for (var i = 0; i < response.length; i++) {
            console.log(response[i].item_id + " | " + response[i].product_name + " ||| " + response[i].department_name + " ||| " + response[i].price + " ||| " + response[i].stock_quantity);
          
        }
            console.log("======================================================================================================================================");
         });
        
        
          console.log(' ');

          start();
        })
    }
    
    function addToInventory(){
        console.log('\n')
        connection.query('SELECT * FROM products', function(err, response){
            if (err) throw err;
            var itemArray = [];

            for(var i=0; i<response.length; i++){
                itemArray.push(response[i].product_name);
            }

            inquirer.prompt([{
                type: "list",
                name: "product_name",
                choices: itemArray,
                message: "Add inventory to what item?"
            }, {
                type: "input",
                name: "qty",
                message: "How much would you like to add?",
                validate: function(value){
                    if(isNaN(value) === false){return true;}
                    else{return false;}
                } 
            }]).then(function(answer){
                    var currentQty;
                    for(var i=0; i<response.length; i++){
                        if(response[i].product_name === answer.product_name){
                            currentQty = response[i].stock_quantity;
                        }
                    }
                    connection.query('UPDATE products SET ? WHERE ?', [
                        {stock_quantity: currentQty + parseInt(answer.qty)},
                        {product_name: answer.product_name}
                    ], function(err, response){
                        if(err) throw err;
                        console.log("The quantity was updated.");
                        start();
                    });
                })
            });
        }

        function addNewProduct(){
            console.log('\n');
            var deptNames = [];

            connection.query('SELECT * FROM products', function(err, response){
                if(err) throw err;
                for(var i = 0; i<response.length; i++){
                    deptNames.push(response[i].department_name);
                }
            })

            inquirer.prompt([{ 
                type: "input",
                name: "product_name",
                message: "Product Name: ",
                validate: function(value){
                    if(value){return true;}
                    else{return false;}
                }
            }, {
                type: "input",
                name: "department_name",
                message: "Department Name: ",
                choices: deptNames
            }, {
                type: "input",
                name: "price",
                message: "Price: ",
                validate: function(value){
                    if(isNaN(value) === false){return true;}
                    else{return false;}
                }
            }, {
                type: "input",
                name: "stock_quantity",
                message: "Stock Quantity: ",
                validate: function(value){
                    if(isNaN(value) === false){return true;}
                    else{return false;}
            }
        }]).then(function(answer){
            connection.query('INSERT INTO products SET ?',{
                product_name: answer.product_name,
                department_name: answer.department_name,
                price: answer.price,
                stock_quantity: answer.stock_quantity
            }, function(err, response){
                if(err) throw err;
                console.log('\n');
                console.log("New item added into Bamazon...");
            })
            start();
        });
        }

        //start();
                
         
    