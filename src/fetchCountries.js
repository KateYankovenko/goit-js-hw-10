export function fetchCountries(name){
    const countries = "https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages";
    return fetch(countries).then(response => {
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    return response.json();
  }
  );
}