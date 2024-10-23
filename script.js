'use strict';
const select = document.getElementById('select-cars');
const spanCar = document.querySelector('.span-car');
const spanPrice = document.querySelector('.span-price');

const arr = [];

const getData = async () => {
  try {
    const responseCars = await fetch('./cars.json');
    const cars = await responseCars.json();
    return cars;
  } catch (error) {
    throw new Error(error);
  }
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

select.addEventListener('change', async () => {
  try {
    if (select.value !== 'Выбери тачку') {
      const data = await getData();
      data.cars.forEach((car) => {
        if (select.value === car.brand) {
          spanCar.innerHTML = `Тачка ${car.brand} ${car.model}`;
          spanPrice.innerHTML = `Цена: ${car.price}`;
        }
      });
    }
  } catch (error) {
    console.warn(error);
  }
});

getData().then((data) => {
  data.cars.forEach((car) => {
    arr.push(car);
  });
  render(arr);
});
