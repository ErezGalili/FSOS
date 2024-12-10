class Car{
    constructor(brand, image, year, price){
        this.brand = brand;
        this.image = image;
        this.year = year;
        this.price = price;
    }
    render(){
        const carDiv = document.createElement('div');
        carDiv.classList.add('col-3');
        carDiv.innerHTML =`
        <h2>${this.brand}</h2>
        <img src="${this.image}" alt="${this.brand}">
        <p>year: ${this.year}. Price: ${this.price}$</p>`
        const divRow = document.querySelector('.row')
        divRow.append(carDiv)
    }
}