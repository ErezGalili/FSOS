const renderCars = () =>{
    const car1 = new Car ('Mercedes', 'cars/mercedes.jpg', 2014, 100000);
    car1.render();
    const car2 = new Car ('Audi', 'cars/audi.jpg', 2016, 80000);
    car2.render();
    const car3 = new Car ('BMW', 'cars/BMW.jpg', 2018, 150000);
    car3.render();
    const car4 = new Car ('maserati', 'cars/maserati.jpg', 2019, 200000);
    car4.render();
    const car5 = new Car ('range rover', 'cars/range rover.jpg', 2020, 250000);
    car5.render();
}
renderCars();