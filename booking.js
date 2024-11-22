document.addEventListener('DOMContentLoaded', function() {
    function toggleMenu() {
        document.body.classList.toggle('menu-open');
    }

    document.getElementById('booking-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;

        document.getElementById('booking-result').innerHTML = `
            <p>Bedankt, ${name}! Je boeking van ${startDate} tot ${endDate} is ontvangen. Een bevestigingsmail is verstuurd naar ${email}.</p>
        `;

        let currentDate = new Date(startDate);
        const end = new Date(endDate);

        while (currentDate <= end) {
            const formattedDate = currentDate.toISOString().split('T')[0];
            bookings[formattedDate] = 'booked';
            currentDate.setDate(currentDate.getDate() + 1);
        }

        updateCalendar();
    });

    const bookings = {
        '2024-11-20': 'booked',
        '2024-11-21': 'reserved'
    };

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    function generateCalendar(month, year) {
        const calendar = document.getElementById('calendar');
        calendar.innerHTML = '';
        const firstDay = new Date(year, month).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement('div');
            calendar.appendChild(emptyDiv);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day).toISOString().split('T')[0];
            const div = document.createElement('div');
            div.id = date;
            div.textContent = day;
            div.className = bookings[date] || 'available';
            calendar.appendChild(div);
        }
    }

    function updateCalendar() {
        generateCalendar(currentMonth, currentYear);

        for (const date in bookings) {
            const div = document.getElementById(date);
            if (div) {
                div.className = bookings[date];
            }
        }
    }

    document.getElementById('prev-month').addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar();
    });

    document.getElementById('next-month').addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar();
    });

    updateCalendar();
});
