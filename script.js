'use strict';
const select = document.getElementById('select-cars');
const spanCar = document.querySelector('.span-car');
const spanPrice = document.querySelector('.span-price');

let arr = [];

const getData = async () => {
  const responseCars = await fetch('./cars.json');
  const cars = await responseCars.json();
  return cars;
};

const render = (cars) => {
  const startOption = document.createElement('option');

  startOption.innerHTML = 'Выбери тачку';
  select.append(startOption);

  cars.forEach((car) => {
    const option = document.createElement('option');

    option.innerHTML = car.brand;
    select.append(option);
  });
};

select.addEventListener('change', () => {
  arr.forEach((car) => {
    if (select.value === car.brand) {
      spanCar.innerHTML = `Тачка ${car.brand} ${car.model}`;
      spanPrice.innerHTML = `Цена: ${car.price}`;
    }
  });
});

getData().then((data) => {
  data.cars.forEach((car) => {
    arr.push(car);
  });
  render(arr);
});
