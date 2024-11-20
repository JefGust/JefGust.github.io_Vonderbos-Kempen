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

    // Hier zou je de boekingsgegevens naar een server sturen
});
