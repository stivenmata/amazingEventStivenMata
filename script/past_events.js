import { createCard, renderCards, formHTML, fetchData } from "../modules/functions.js";

const contenedor = document.getElementById("cards-container");
const formContainer = document.getElementById("form-container");
const mensaje = document.getElementById("mensaje");

formContainer.innerHTML = formHTML;

const searchInput = document.getElementById("search-input");
const checkboxes = document.querySelectorAll(".form-check-input");

let events = [];
let currentDate = ""; 


function initPastEvents() {
  fetchData()
    .then(data => {
      events = data.events; 
      currentDate = data.currentDate; 
      filterEvents(); 
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      mensaje.textContent = 'Error al cargar los eventos. Intente nuevamente más tarde.';
    });
}


const filterEvents = () => {
  const searchText = searchInput.value.toLowerCase();
  const selectedCategories = Array.from(checkboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);

  const filteredEvents = events.filter(event => {
    const isPastEvent = new Date(event.date) < new Date(currentDate);
    const matchesSearchText = event.name.toLowerCase().includes(searchText) || event.description.toLowerCase().includes(searchText);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(event.category);

    return isPastEvent && matchesSearchText && matchesCategory;
  });

  if (filteredEvents.length === 0) {
    mensaje.textContent = 'No se encontraron eventos pasados que coincidan con los criterios.';
  } else {
    mensaje.textContent = ''; 
  }

  renderCards(filteredEvents, contenedor, mensaje);
};

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  initPastEvents(); 
  searchInput.addEventListener("input", filterEvents); 
  checkboxes.forEach(checkbox => checkbox.addEventListener("change", filterEvents));
});