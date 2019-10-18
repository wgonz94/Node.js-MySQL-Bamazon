var mysql = require("mysql");
var inquirer = require("inquirer")

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: 'root',

    password: 'Redfaltor1!',
    database: 'bamazon_db'
});

connection.connect(function(err){
    if(err) throw err;
    console.log("connected as id " + connection.threadId + "\n\n");
    dispManagerList();
});

function dispManagerList() {
    inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to view?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View Products for Sale":
        viewProducts();
        break;

      case "View Low Inventory":
        lowInventory();
        break;

      case "Add to Inventory":
        addMore();
        break;

      case "Add New Product":
        addNew();
        break;

      case "exit":
        connection.end();
        break;
      }
    });

};

function viewProducts(){
    console.log("\nHere are your products")

    connection.query("SELECT * FROM products", function(err, res){
        if(err) throw err;
        for(var i = 0; i < res.length; i++) {
            console.log("====================================================================================")
            console.log("\n" + res[i].id + " || " + res[i].product_name +  " || Price: " + res[i].price + " || In-stock: " + res[i].stock_quantity + " ||\n")
            console.log("====================================================================================")   
           }
    
    });
    

};

function lowInventory(){
    console.log("\n Let's check for low inventory")
    connection.query("SELECT * FROM products", function(err, res){
        if(err) throw err;
        for(var i = 0; i < res.length; i++){
            if(res[i].stock_quantity <= 5) {
                console.log("Here are the items with low quantities:\n\n");
                console.log("\n" + res[i].id + " || " + res[i].product_name + " || In-stock: " + res[i].stock_quantity + " ||\n");

            } else {
                console.log("No low quantity items");
            }
        }
    });
    dispManagerList();
}

function addMore(){
    inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Which products would you like to restock?",
      filter: Number
      
    })
    .then(function(answer) {
      switch (answer.action) {
      
      }
    });

};

function addNew(){

};