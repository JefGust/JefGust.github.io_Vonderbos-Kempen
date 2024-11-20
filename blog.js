document.addEventListener('DOMContentLoaded', function() {
    const blogPosts = [
        { id: 1, title: "Welkom bij Vonderbos-Kempen", content: "Ontdek ons prachtige vakantiehuisje." },
        { id: 2, title: "Activiteiten in de omgeving", content: "Er is veel te doen in de omgeving van de Kempen." }
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
        // Hier zou je de post bijwerken in de database
        alert(`Post ${postId} bijgewerkt: ${title}`);
    });
});

function editPost(id) {
    const post = blogPosts.find(post => post.id === id);
    document.getElementById('post-id').value = post.id;
    document.getElementById('title').value = post.title;
    document.getElementById('content').value = post.content;
}
