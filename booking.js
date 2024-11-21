document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault();

    
    // Verzamel de gegevens uit het formulier
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const date = document.getElementById('date').value;

    // Hier zou je normaal gesproken de gegevens naar je server sturen
    // Voor nu laten we een bevestiging zien
    document.getElementById('booking-result').innerHTML = `
        <p>Bedankt, ${name}! Je boeking voor ${date} is ontvangen. Een bevestigingsmail is verstuurd naar ${email}.</p>
    `;

    // Boekingsstatus bijwerken (dit zou normaal via de server gebeuren)
    bookings[date] = 'booked';
    updateCalendar();
});

// Simuleer wat bestaande boekingen en reserveringen
const bookings = {
    '2024-11-20': 'booked',
    '2024-11-21': 'reserved'
};

// Genereer de agenda
function generateCalendar() {
    const calendar = document.getElementById('calendar');
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(today.getFullYear(), today.getMonth(), day).toISOString().split('T')[0];
        const div = document.createElement('div');
        div.id = date;
        div.textContent = day;
        div.className = 'available'; // Standaard naar beschikbaar
        calendar.appendChild(div);
    }

    updateCalendar();
}

function updateCalendar() {
    for (const date in bookings) {
        const div = document.getElementById(date);
        if (div) {
            div.className = bookings[date];
        }
    }
}

generateCalendar();
