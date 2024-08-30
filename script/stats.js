document.addEventListener("DOMContentLoaded", () => {
  fetch('https://aulamindhub.github.io/amazing-api/events.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const events = data.events;
      const currentDate = new Date(data.currentDate);

      const pastEvents = events.filter(event => new Date(event.date) < currentDate);
      const upcomingEvents = events.filter(event => new Date(event.date) >= currentDate);

      // Calcular estadísticas
      const eventsStats = calculateEventsStats(events, pastEvents);
      const upcomingStats = calculateCategoryStats(upcomingEvents, true);
      const pastStats = calculateCategoryStats(pastEvents, false);

      // Actualizar tablas
      updateEventsStatsTable(eventsStats);
      updateCategoryStatsTable('table2-body', upcomingStats, true);
      updateCategoryStatsTable('table3-body', pastStats, false);
    })
    .catch(error => {
      console.error('Error fetching events:', error);
    });
});

function calculateEventsStats(allEvents, pastEvents) {
  const sortedByAttendance = pastEvents.sort((a, b) => 
    (b.assistance / b.capacity) - (a.assistance / a.capacity)
  );

  const largestCapacityEvent = allEvents.reduce((max, event) => 
    event.capacity > max.capacity ? event : max
  );

  return {
    highestAttendance: {
      name: sortedByAttendance[0].name,
      percentage: ((sortedByAttendance[0].assistance / sortedByAttendance[0].capacity) * 100).toFixed(2)
    },
    lowestAttendance: {
      name: sortedByAttendance[sortedByAttendance.length - 1].name,
      percentage: ((sortedByAttendance[sortedByAttendance.length - 1].assistance / sortedByAttendance[sortedByAttendance.length - 1].capacity) * 100).toFixed(2)
    },
    largestCapacity: {
      name: largestCapacityEvent.name,
      capacity: largestCapacityEvent.capacity
    }
  };
}

function calculateCategoryStats(events, isUpcoming) {
  const stats = {};
  events.forEach(event => {
    if (!stats[event.category]) {
      stats[event.category] = { revenue: 0, attendance: 0, count: 0 };
    }
    const attendance = isUpcoming ? event.estimate : event.assistance;
    stats[event.category].revenue += attendance * event.price;
    stats[event.category].attendance += (attendance / event.capacity) * 100;
    stats[event.category].count++;
  });

  return Object.entries(stats).map(([category, data]) => ({
    category,
    revenue: data.revenue.toFixed(2),
    attendance: (data.attendance / data.count).toFixed(2)
  }));
}

function updateEventsStatsTable(stats) {
  const tableBody = document.getElementById('table1-body');
  tableBody.innerHTML = `
    <tr class="text-center table-secondary border-dark">
      <td>Events with highest % of attendance</td>
      <td>Events with lowest % of attendance</td>
      <td>Events with larger capacity</td>
    </tr>
    <tr class="text-center">
      <td>${stats.highestAttendance.name} with ${stats.highestAttendance.percentage}%</td>
      <td>${stats.lowestAttendance.name} with ${stats.lowestAttendance.percentage}%</td>
      <td>${stats.largestCapacity.name} with capacity of ${stats.largestCapacity.capacity}</td>
    </tr>
  `;
}

function updateCategoryStatsTable(tableId, stats, isUpcoming) {
  const tableBody = document.getElementById(tableId);
  tableBody.innerHTML = `
    <tr class="text-center table-secondary border-dark">
      <td>Categories</td>
      <td>Revenues</td>
      <td>Percentage of attendance</td>
    </tr>
    ${stats.map(stat => `
      <tr>
        <td>${stat.category}</td>
        <td>$${stat.revenue}</td>
        <td>${stat.attendance}%</td>
      </tr>
    `).join('')}
  `;
}