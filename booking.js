document.addEventListener('DOMContentLoaded', function() {
    const blogPosts = [
        { id: 1, title: "Welkom bij Vonderbos-Kempen", content: "Ontdek ons prachtige vakantiehuisje." },
        { id: 2, title: "Activiteiten in de omgeving", content: "Er is veel te doen in de omgeving van de Kempen." },
        { id: 3, title: "Geniet van de natuur", content: "Onze ligging in de Kempen biedt veel natuurpracht." },
        { id: 4, title: "Accommodatie", content: "Bekijk onze comfortabele accommodaties." }
    ];

    const blogPostsDiv = document.getElementById('blog-posts');

    blogPosts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            ${isAdmin() ? `<button onclick="editPost(${post.id})">Bewerken</button>` : ""}
        `;
        blogPostsDiv.appendChild(postDiv);
    });

    if (isAdmin()) {
        document.getElementById('edit-section').style.display = 'block';
    }

    document.getElementById('edit-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const postId = document.getElementById('post-id').value;
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        alert(`Post ${postId} bijgewerkt: ${title}`);
    });
});

function editPost(id) {
    const post = blogPosts.find(post => post.id === id);
    document.getElementById('post-id').value = post.id;
    document.getElementById('title').value = post.title;
    document.getElementById('content').value = post.content;
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

function generateCalendar() {
    const calendar = document.getElementById('calendar');
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(today.getFullYear(), today.getMonth(), day).toISOString().split('T')[0];
        const div = document.createElement('div');
        div.id = date;
        div.textContent = day;
        div.className = 'available';
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

function login(username, password) {
    const users = {
        "admin": { password: "admin123", role: "admin" },
        "user": { password: "user123", role: "user" }
    };

    if (users[username] && users[username].password === password) {
        sessionStorage.setItem("user", JSON.stringify({ username: username, role: users[username].role }));
        return true;
    }
    return false;
}

function getUser() {
    return JSON.parse(sessionStorage.getItem("user"));
}

function isLoggedIn() {
    return getUser() !== null;
}

function isAdmin() {
    const user = getUser();
    return user && user.role === "admin";
}

generateCalendar();
