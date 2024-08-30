

import { fetchData, displayEventDetails, displayErrorMessage } from '../modules/functions.js';


function getEventIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}


function findEventById(events, eventId) {
  return events.find(event => event._id.toString() === eventId);
}

function init() {
  const eventId = getEventIdFromUrl();

  if (!eventId) {
    displayErrorMessage("No event ID provided");
    return;
  }

  fetchData()
    .then(data => {
      if (!data || !Array.isArray(data.events)) {
        throw new Error("Invalid data structure");
      }

      const event = findEventById(data.events, eventId);

      if (!event) {
        throw new Error("Event not found");
      }

      displayEventDetails(event);
    })
    .catch(error => {
      displayErrorMessage(error.message || "Error loading event details. Please try again later.");
    });
}
document.addEventListener('DOMContentLoaded', init);