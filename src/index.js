import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
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
// searching through the bar
function onSearchBarHandler(e) {
    const inputValue = e.target.value.trim();
    if (inputValue === '') {
        clearData();
        return;
    }
// Якщо бекенд повернув від 2 - х до 10 - и країн, під тестовим полем 
// відображається список знайдених країн.Кожен елемент списку складається
//  з прапора та назви країни.
    fetchCountries(inputValue)
        .then(countries => {
            if (countries.length > 10) {
                clearData();
                Notify.info('Too many matches found. Please enter a more specific query!');
                return;
            }
        })
}




// Якщо у відповіді бекенд повернув більше ніж 10 країн, в
// інтерфейсі з'являється повідомлення про те, що назва повинна 
// бути специфічнішою. 
