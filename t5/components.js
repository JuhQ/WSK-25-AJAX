import {apiUrl} from './variables.js';
import {fetchData} from '../lib/fetchData.js';
import {sortByName} from './utils.js';

// your code here
const taulukko = document.querySelector('#target');
const modal = document.querySelector('#modal');
let restaurants = [];

// html funktiot
// vanha
// function createRestaurantCells(restaurant, tr) {
//     // nimisolu
//     const nameTd = document.createElement('td');
//     nameTd.innerText = restaurant.name;
//     // osoitesolu
//     const addressTd = document.createElement('td');
//     addressTd.innerText = restaurant.address;
//     // kaupunkisolu
//     const cityTd = document.createElement('td');
//     cityTd.innerText = restaurant.city;
//     tr.append(nameTd, addressTd, cityTd);
//   };

// arrow funktio + object destructuring
const createRestaurantCells = ({name, address, city}, tr) => {
  // nimisolu
  const nameTd = document.createElement('td');
  nameTd.innerText = name;
  // osoitesolu
  const addressTd = document.createElement('td');
  addressTd.innerText = address;
  // kaupunkisolu
  const cityTd = document.createElement('td');
  cityTd.innerText = city;
  tr.append(nameTd, addressTd, cityTd);
};

// function createModalHtml(restaurant, modal) {
//   const nameH3 = document.createElement('h3');
//   nameH3.innerText = restaurant.name;
//   const addressP = document.createElement('p');
//   addressP.innerText = `${restaurant.address}, puhelin: ${restaurant.phone}`;
//   modal.append(nameH3, addressP);
// };
const createModalHtml = ({name, address, phone}, modal) => {
  const restaurantName = document.createElement('h1');
  restaurantName.innerText = name;
  const addressP = document.createElement('p');
  addressP.innerText = `${address}, puhelin: ${phone}`;
  modal.append(restaurantName, addressP);
};

const createMenuHtml = (courses) => {
  console.log(courses);
  let html = '';
  for (const {name, price, diets} of courses) {
    html += `
    <article class="course">
        <p><strong>${name}</strong>,
        Hinta: ${price},
        Allergeenit: ${diets}</p>
    </article>
  `;
  }
  return html;
};

// hae kaikki ravintolat
export const getRestaurants = async () => {
  try {
    restaurants = await fetchData(`${apiUrl}/restaurants`);
  } catch (error) {
    console.error(error);
  }
};

// hae tietyn ravintolan päivän menu
const getDailyMenu = async (id, lang) => {
  try {
    return await fetchData(`${apiUrl}/restaurants/daily/${id}/${lang}`);
  } catch (error) {}

  huhhei;
};

// "ongelmallinen" destrukturointi, selvitä mitä {name: bName} tekee
// const sortByName = ({name}, {name: bName}) =>
//   name.toUpperCase() > bName.toUpperCase() ? 1 : -1;

// restaurants aakkosjärjestykseen
export const sortRestaurants = () => {
  // restaurants.sort(function (a, b) {
  //   return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1;
  // });

  // passataan funktio .sort() metodin callback arvoksi
  restaurants.sort(sortByName);
};

export const createTable = () => {
  for (const restaurant of restaurants) {
    // rivi
    const tr = document.createElement('tr');
    // tr.addEventListener('click', async function () {
    tr.addEventListener('click', async () => {
      try {
        for (const elem of document.querySelectorAll('.highlight')) {
          elem.classList.remove('highlight');
        }

        tr.classList.add('highlight');
        // hae menu
        const coursesResponse = await getDailyMenu(restaurant._id, 'fi');
        // hae menu html
        const menuHtml = createMenuHtml(coursesResponse.courses);

        // tyhjennä modal
        modal.innerHTML = '';
        // avaa modal
        modal.showModal();
        // tee modalin sisältö
        createModalHtml(restaurant, modal);
        // lisää menu html
        modal.insertAdjacentHTML('beforeend', menuHtml);
      } catch (error) {
        console.error(error);
      }
    });

    // lisätään solut riviin
    createRestaurantCells(restaurant, tr);
    taulukko.append(tr);
  }
};
