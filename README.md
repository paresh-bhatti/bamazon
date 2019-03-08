# bamazon
Bamazon (Node.js &amp; MySQL) homework


BAMAZON

This application implements a simple command line based storefront using Node.js and MySQL. There are two interfaces available in this application: customer and manager

Technologies Used
1. Javascript
2. nodeJS
3. MySQL
4. npm packages:
    * mysql
    * inquirer

Customer Interface
The customer interface allows the user to view the current inventory of store items: item IDs, descriptions, department in which the item is located and price. The user is then able to purchase one of the existing items by entering the item ID and the desired quantity. If the selected quantity is currently in stock, the user's order is fulfilled, displaying the total purchase price and updating the store database.

Screenprint: https://drive.google.com/file/d/1kFtd1oe-8l_uLcbZ0t2Z6kDuGoURbvq9/view?usp=sharing
Video: https://drive.google.com/file/d/1eZK039DuVmmOi_ItyLDi1mJ0rh6fDpXO/view?usp=sharing

Manager Interface
The manager interface presents a list of five options:
* View Products for Sale: If the manager selects View Products for Sale, it lists all of the products in the store including all of their details.
* View Low Inventory: If the manager selects View Low Inventory, it'll list all the products with less than five items in its StockQuantity column.
* Add to Inventory: If the manager selects Add to Inventory, it allows the manager to select a product and add inventory.
* Add New Product: If the manager selects Add New Product, it allows the manager to add a new product to the store.
* End Session: If the manager selects End Session, it ends the session and doesn't go back to the menu.
* 

Screenprint: https://drive.google.com/file/d/1aP6hNoX7blSHYP00GqxocOgGtvJ7S5uW/view?usp=sharing
Video: https://drive.google.com/file/d/1MKcK-kx09QtvPHSEvVNUz2iSPGEhEMAP/view?usp=sharing
