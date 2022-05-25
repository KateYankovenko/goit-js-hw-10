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






// Якщо у відповіді бекенд повернув більше ніж 10 країн, в
// інтерфейсі з'являється повідомлення про те, що назва повинна 
// бути специфічнішою. 
// Якщо бекенд повернув від 2 - х до 10 - и країн, під тестовим полем 
// відображається список знайдених країн.Кожен елемент списку складається
//  з прапора та назви країни.