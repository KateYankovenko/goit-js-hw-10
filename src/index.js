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

refs.searchBox.addEventListener('input', debounce(onSearchBarHandler, DEBOUNCE_DELAY));
// function clearDat
function clearData() {
  refs.countriesList.innerHTML = '';
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
            }
            else if (countries.length === 1) {
                clearData();
                countryItemRendering(countries[0]);
                return;
            }
            renderCountries(countries);
        })
        .catch(error => {
            clearData();
            Notify.failure('Oops, there is no country with that name!');
            return;
        });
// rendering a single item
function countryItemRendering(country) {
    refs.countryInfo.innerHTML = `
        <div class='info-title'>
        <img src = '${country.flags.svg}'alt = Flag of'${country.name}' 
        class='flag'><h1>${country.name.official}</h1>
        <p><span>Capital:</span> ${country.capital}</p>
        <p><span>Population:</span> ${country.population}</p>
        <p><span>Languages:</span> ${country.languages}</p>
        </div>
        `;
}
}





