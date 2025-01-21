
// ═══════════════ Introduction ═══════════════════ //
/*
    Review the below two classes, Product and BathProduct. Ask yourself the following questions to better understand the syntax you'll be writing in this lab:
    - How are private variables created?
    - What is the syntax for a parent class constructor?
    - What is the syntax for a child class constructor?
    - What is the syntax for overriding a method?
    - What is the syntax for getter and setter methods?
    - What is the syntax for accessing private variables in the class they are defined in?
    - What is the syntax for accessing parent private variables from a subclass?
 */
class Product {

    #name
    #description

    constructor(name, description) {
        this.#name = name;
        this.#description = description;
    }

    print() {
        return "Product name: " + this.#name + "\nProduct description: " + this.#description;
    }

    // getters and setters
    getName() {
        return this.#name;
    }

    setName(name) {
        this.#name = name;
    }

    getDescription() {
        return this.#description;
    }

    setDescription(description) {
        this.#description = description;
    }
}

class BathProduct extends Product {

    #scent

    constructor(name, description, scent) {
        super(name, description);
        this.#scent = scent;
    }

    // overridden print() method
    print() {
        return "Product name: " + this.getName() + "\nProduct description: " + this.getDescription() + "\nScent: " + this.#scent;
    }

    // getter and setter methods
    getScent() {
        return this.#scent;
    }

    setScent(scent) {
        this.#scent = scent;
    }
}

// ════════════════ Exercise 1 ════════════════════ //
/* 
TODO: Edit the class named 'FoodProduct' below so that it extends the Product class and has the following class members:
- a private variable named 'expirationDate' (remember to include the hash symbol to make it private!)
- a constructor that defines the following parameters: name, description, expirationDate
- an overridden print method that prints the values for name, description, and expirationDate (you can write it however you'd like as long as these values are present in the string!)
- getters and setters using the correct naming convention and syntax for the private variable 
*/

class FoodProduct  {

}



// ════════════════════════════════════════════════ //
/* Note: You do not need to edit or view any code below this point. */

// add event listeners needed
document.getElementById("productType")?.addEventListener("change", (event) => {
    // remove any children of optionalInput div
    let optionalInputDiv = document.getElementById("optionalInput");
    optionalInputDiv.innerHTML = '';

    // check type
    let type = event.target.value;

    
    if (type== "") return; // stop here, there's nothing selected!

    // depending on type, create label and input elements and add to form
    let property = type == "BathProduct" ? "scent" : "expirationDate";

    let label = document.createElement('label');
    label.setAttribute('for', property);
    label.textContent = `${property.charAt(0).toUpperCase()}${property.substring(1)}:`;

    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', property);
    input.setAttribute('name', property);

    optionalInputDiv.appendChild(label);
    optionalInputDiv.appendChild(input);
});

document.getElementById("productForm")?.addEventListener("submit", (event) => {
    // Prevent default form submission behavior
    event.preventDefault();

    // Retrieve form data
    const formData = new FormData(event.target);
    
    // make an object of the correct type and initialize state
    let type = document.getElementById("productType").value;
    const dataObj = type == "BathProduct" ? new BathProduct() : new FoodProduct();
    dataObj.setName(formData.get("name"));
    dataObj.setDescription(formData.get("description"));
    if (typeof dataObj === "BathProduct") {
        dataObj.setScent(formData.get("scent"));
    } else {
        dataObj.setExpirationDate(formData.get("expirationDate"));
    }

    // format product string
    let cardText = `Name: ${formData.get("name")}
Description: ${formData.get("description")}
`;

    cardText += 'scent' in dataObj ? `Scent:${formData.get("scent")}` : `Expiration Date: ${formData.get("expirationDate")}`;

    console.log(cardText)

    // add product to list
    let card = document.createElement('div');
    card.setAttribute('class', "card");
    card.innerText = cardText;
    document.querySelector('main').appendChild(card);

    // Reset the form
    event.target.reset();
    let optionalInputDiv = document.getElementById("optionalInput");
    optionalInputDiv.innerHTML = '';
});

// export functions for testing
if (typeof module === 'object') {
    module.exports = { Product, FoodProduct };
}