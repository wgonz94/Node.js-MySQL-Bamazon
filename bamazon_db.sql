CREATE DATABASE bamazon_db;
USE bamazon_db;

SELECT * FROM bamazon_db.products;

INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity)
VALUES("bicycle", "BB's Bikes", 129.99, 20),
("designer jeans", "DJ Clothes", 69.99, 20),
("robo-vaccuum", "Roboto Industry", 79.99, 20),
("ear buds", "MusicWorld", 39.99, 20),
("laptop", "Nerd's Palace", 279.99, 20),
("box water", "GG's Health Inc", 6.99, 20),
("baseball cap", "Backyard Games", 9.99, 20),
("80' LCD Flat Screen TV", "Tom's Electronics", 299.99, 20),
("PlayStation Cinco", "EarlyBird Tech", 599.99, 20),
("Dog Food", "Heart Pets", 24.99, 20);