const renderCars = () =>{
    cars_arr.forEach(car => {
        const newCar = new Car(car.brand, car.model, car.image, car.year, car.color, car.price)
        newCar.render();
    });
}
renderCars();