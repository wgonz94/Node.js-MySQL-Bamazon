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
    showAll();
});
function showAll(){
    connection.query("SELECT * FROM products", function(err, res){
        if(err) throw err;
        for(var i = 0; i < res.length; i++) {
            console.log("\n" + res[i].id + " || " + res[i].product_name + " || " + res[i].department_name + " || Price: " + res[i].price + " || In-stock: " + res[i].stock_quantity + " ||\n")   
           }
           offerBuy();
    });
    
};

function offerBuy(){
    inquirer.prompt([
        {
        name: "id",
        type: "input",
        message: "Which product would you like to purchase?\n Choose Product ID: ",
        filter: Number
        },
        {
        name: "quantity",
        type: "input",
        message: "How many would you like to purchase?",
        filter: Number
        }
    ]).then(function(answer){
        var idSearch = answer.id;
        var quantity = answer.quantity;
        invoiceOrder(idSearch, quantity);
    });
};

function invoiceOrder(idSearch, amount){
    var query = "SELECT product_name, stock_quantity, price FROM products WHERE ?";
    connection.query(query, {id: idSearch}, function(err, res){
        if(err){console.log(err)};
        if(amount <= res[0].stock_quantity){
            var invoiceList = [1546, 1597, 5437, 1579, 4569, 8749, 1634, 1226, 4968, 3487];
            var invoiceGenerate = invoiceList[Math.floor(Math.random())]
            var total = res[0].price * amount;
            console.log("Order is processing...");
            console.log("Order Complete! Your cost: $" + Math.round(total) + " Here is your Invoice!\n|| #" + invoiceGenerate + "\n\n Item purchased: " + res[0].product_name + "\nQuantity: " + amount + "\nThank you! Come back soon!")
            var query = "UPDATE products SET ? WHERE ?"
            connection.query(query,[{stock_quantity: 20 - amount}, {id: idSearch}])
            endProcess();
        } else {
            console.log("Oh no! it seems we don't have " + res[0].product_name + " in stock!")
            endProcess();
        }
    })
    
    
   
}
function endProcess(){
    console.log("Come back soon!")
    connection.end();
    
};
