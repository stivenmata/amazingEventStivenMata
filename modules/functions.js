// Función para obtener datos de la API usando fetch puro
export function fetchData() {
  // Hacemos una petición a la API
  return fetch('https://aulamindhub.github.io/amazing-api/events.json')
    .then(response => {
    
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
     
      return response.json();
    })
    .catch(error => {
     
      console.error('Error fetching data:', error);
      throw error;
    });
}



export const formHTML = `
<div class="container-fluid">
  <div class="row flex-wrap justify-content-between align-items-center p-2 p-md-4">
    <div class="col-12 col-md-9 d-flex flex-wrap flex-md-row flex-column mb-3 mb-md-0">
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="FoodFair" value="Food">
        <label class="form-check-label" for="FoodFair">Food Fair</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="Museum" value="Museum">
        <label class="form-check-label" for="Museum">Museum</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="CostumeParty" value="Party">
        <label class="form-check-label" for="CostumeParty">Costume Party</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="MusicConcert" value="Concert">
        <label class="form-check-label" for="MusicConcert">Music Concert</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="Race" value="Race">
        <label class="form-check-label" for="Race">Race</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="BookExchange" value="Books">
        <label class="form-check-label" for="BookExchange">Book Exchange</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="Cinema" value="Cinema">
        <label class="form-check-label" for="Cinema">Cinema</label>
      </div>
    </div>

    <div class="col-12 col-md-3">
          <div class="input-group rounded-pill">
            <input class="form-control border-end-0 rounded-pill" type="search" placeholder="Buscar" id="search-input">
            <button class="btn btn-outline-secondary border-0 rounded-pill ms-n5" type="button">
              <i class="bi bi-search"></i>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;


export function createCard(event) {
      return `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        <div class="card h-100 m-1">
          <img src="${event.image}" class="card-img-top" alt="${event.name}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text flex-grow-1">${event.description}</p>
            
            <div class="d-flex justify-content-between align-items-center mt-auto">
              <p class="text-secondary mb-0">Price: $${event.price}</p>
             <a href="details.html?id=${event._id}" class="btn btn-primary">Details</a>
            </div>
          </div>
        </div>
      </div>
      `;
    }

    export function renderCards(events, contenedor, mensaje) {
      contenedor.innerHTML = "";
      if (events.length === 0) {
        mensaje.classList.add("visible");
        mensaje.classList.remove("noVisible");
      } else {
        mensaje.classList.add("noVisible");
        mensaje.classList.remove("visible");
        const cardsHTML = events.map(event => createCard(event)).join('');
        contenedor.innerHTML = cardsHTML;
      }
    }

    export function displayEventDetails(event) {
      const detailsContainer = document.getElementById('eventDetails');
      // Creamos el HTML para mostrar los detalles del evento
      detailsContainer.innerHTML = `
        <div class="ContainerDetails">
          <div class="row">
            <div class="col-12">
              <div class="card shadow" style="max-width: 1000px; margin: auto;">
                <div class="row g-0">
                  <div class="col-md-6 p-0">
                    <img src="${event.image}" class="img-fluid w-100 h-100" style="object-fit: cover; max-height: 404px;" alt="${event.name}">
                  </div>
                  <div class="col-md-6">
                    <div class="card-body h-100 d-flex flex-column">
                      <h2 class="card-title mb-4">${event.name}</h2>
                      <ul class="list-group list-group-flush flex-grow-1">
                        <li class="list-group-item"><strong>Date:</strong> ${event.date}</li>
                        <li class="list-group-item"><strong>Description:</strong> ${event.description}</li>
                        <li class="list-group-item"><strong>Category:</strong> ${event.category}</li>
                        <li class="list-group-item"><strong>Place:</strong> ${event.place}</li>
                        <li class="list-group-item"><strong>Capacity:</strong> ${event.capacity}</li>
                        ${event.assistance ? `<li class="list-group-item"><strong>Assistance:</strong> ${event.assistance}</li>` : ''}
                        ${event.estimate ? `<li class="list-group-item"><strong>Estimate:</strong> ${event.estimate}</li>` : ''}
                        <li class="list-group-item"><strong>Price:</strong> $${event.price}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
    
    // Función para mostrar un mensaje de error
    export function displayErrorMessage(message) {
      const detailsContainer = document.getElementById('eventDetails');
      detailsContainer.innerHTML = `<p class="text-center text-danger">${message}</p>`;
    }
    
