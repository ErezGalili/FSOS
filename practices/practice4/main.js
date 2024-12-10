class Car{
    constructor(brand, model, image, year, color, price){
        this.brand = brand;
        this.model = model;
        this.image = image;
        this.year = year;
        this.color = color;
        this.price = price;
    }
    render(){
        const carDiv = document.createElement('div');
        carDiv.classList.add('col-3');
        carDiv.innerHTML =`
        <h2>${this.brand} ${this.model}</h2>
        <img src="${this.image}" alt="${this.brand}">
        <p>Color: ${this.color}. Year: ${this.year}. Price: ${this.price}$</p>`
        const divRow = document.querySelector('.row')
        divRow.append(carDiv)
    }
}