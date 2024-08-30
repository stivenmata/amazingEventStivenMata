import { createCard, renderCards, formHTML, fetchData } from "../modules/functions.js";

const contenedor = document.getElementById("cards-container");
const formContainer = document.getElementById("form-container");
const mensaje = document.getElementById("mensaje");

formContainer.innerHTML = formHTML;

const searchInput = document.getElementById("search-input");
const checkboxes = document.querySelectorAll(".form-check-input");

let events = [];


function initHome() {
  fetchData()
    .then(data => {
      events = data.events; 
      renderCards(events, contenedor, mensaje); 
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      mensaje.textContent = 'Error al cargar los eventos. Intente nuevamente más tarde.';
    });
}


function filterEvents() {
  const searchText = searchInput.value.toLowerCase();
  const selectedCategories = Array.from(checkboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);

  const filteredEvents = events.filter(event => {
    const matchesSearchText = event.name.toLowerCase().includes(searchText) || event.description.toLowerCase().includes(searchText);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(event.category);
    return matchesSearchText && matchesCategory;
  });

  renderCards(filteredEvents, contenedor, mensaje);
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  initHome(); // Inicializamos la página de inicio
  searchInput.addEventListener("input", filterEvents); // Agregamos eventos para filtrar
  checkboxes.forEach(checkbox => checkbox.addEventListener("change", filterEvents));
});