import { createCard, renderCards, formHTML, fetchData } from "../modules/functions.js";

const contenedor = document.getElementById("cards-container");
const formContainer = document.getElementById("form-container");
const mensaje = document.getElementById("mensaje");

formContainer.innerHTML = formHTML;

const searchInput = document.getElementById("search-input");
const checkboxes = document.querySelectorAll(".form-check-input");

let events = [];
let currentDate = "";

function init() {
    fetchData()
        .then(data => {
            currentDate = new Date(data.currentDate);
            events = data.events;
            filterEvents(); 
        })
        .catch(error => {
            mensaje.textContent = 'Error al cargar los eventos. Por favor, inténtalo de nuevo más tarde.';
            console.error(error);
        });
}

const filterEvents = () => {
    const searchText = searchInput.value.toLowerCase();
    const selectedCategories = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    const filteredEvents = events.filter(event => {
        const isFutureEvent = new Date(event.date) > currentDate;
        const matchesSearchText = event.name.toLowerCase().includes(searchText) || event.description.toLowerCase().includes(searchText);
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(event.category);

        return isFutureEvent && matchesSearchText && matchesCategory;
    });

    if (filteredEvents.length === 0) {
        mensaje.textContent = 'No se encontraron eventos futuros que coincidan con los criterios.';
    } else {
        mensaje.textContent = ''; 
    }

    renderCards(filteredEvents, contenedor, mensaje);
};

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
    init();
    searchInput.addEventListener("input", filterEvents);
    checkboxes.forEach(checkbox => checkbox.addEventListener("change", filterEvents));
});