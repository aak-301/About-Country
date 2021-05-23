// 'use strict';
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const Input = document.querySelector('input');
const btnInput = document.querySelector('.btn--frm');

let inputCountry;
Input.addEventListener('click', function () {
  Input.value = '';
});
btnInput.addEventListener('click', function (e) {
  e.preventDefault();
  getCountry(Input.value);
});

const getCountry = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [...d] = JSON.parse(this.responseText);
    let data;
    for (let i = 0; i < d.length; i++) {
      if (d[i].name.toLowerCase() == country.toLowerCase()) {
        data = d[i];
      }
    }

    const html = `
  <article class="country">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} people</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
</article>
  `;
    countriesContainer.innerHTML = html;
    countriesContainer.style.opacity = 1;
  });
};
