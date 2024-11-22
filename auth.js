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
