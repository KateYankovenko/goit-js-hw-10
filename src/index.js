// error_reporting(E_ERROR | E_PARSE);
import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries'; 

const DEBOUNCE_DELAY = 300;

const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};
let country;
refs.searchBox.addEventListener('input', debounce(onSearchBarHandler, DEBOUNCE_DELAY));
// function clearDat
function clearData() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
// Якщо бекенд повернув від 2 - х до 10 - и країн, під тестовим полем 
// відображається список знайдених країн.Кожен елемент списку складається
//  з прапора та назви країни.
function onSearchBarHandler(e) {
    const inputValue = e.target.value.trim();
    if (inputValue === '') {
        clearData();
        return;
    }
    fetchCountries(inputValue)
        .then(countries => {
            if (countries.length > 10) {
                clearData();
                Notify.info('Too many matches found. Please enter a more specific query!');
                return;
            }else if (countries.length === 1) {
                clearData();
                countryItemRendering(countries[0]);
                return;
            }
            renderCountriesList(countries);
        })
        .catch(error => {
            clearData();
            Notify.failure('Oops, there is no country with that name!');
            return;
        }   
    );
    // rendering a single item
    function countryItemRendering(country) {
        refs.countryInfo.innerHTML = `
        <div class='info-title'>
        <img src = '${country.flags.svg}'alt = Flag of'${country.name}' 
        class='flag'><h1>${country.name.official}</h1></div>
        <p><span>Capital:</span> ${country.capital}</p>
        <p><span>Population:</span> ${country.population}</p>
        <p><span>Languages:</span> ${Object.values(country.languages).join(',')}</p>
        `;
        console.log(country);
}
// render list
function renderCountriesList(countries) {
    clearData();//to clear country card (from page) that was choosen before
   refs.countryList.innerHTML = countries.map((country) => {
       return `<li>
        <img src = '${country.flags.svg}'alt = Flag of'${country.name.official}'/>
        <span>${country.name.official}</span>
        </li>`   
   }).join("");
}

}


// if (countries.length === 1) {
//         const country = countries[0];
//         refs.countryInfo.innerHTML = `
//         <div class="info-title">
//         <img src = "${country.flag}" alt = Flag of"${country.name}">
//         <h1>${country.name}</h1>
//         <p><span>Capital:</span> ${country.capital}</p>
//         <p><span>Population:</span> ${country.population}</p>
//         <p><span>Languages:</span> ${country.languages}</p>
//         </div>
//         `;
//         refs.countriesList.innerHTML = '';}
// Достатньо, щоб застосунок працював для більшості країн.
// Деякі країни, як - от Sudan, можуть створювати проблеми,
// оскільки назва країни є частиною назви іншої країни - South Sudan.
// Не потрібно турбуватися про ці винятки.

