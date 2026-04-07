function createUser(email, password, errormsg) {
    console.log("creating user");
    if (email === "" || password === "") {
        console.error("Email and password are required to create a user.");
        errormsg.textContent = "Email and password are required to create a user.";
        return;
    }
    location.href = 'imin.html';
}

function userLogon(email, password, errormsg) {
    console.log("logging on");
        if (email === "" || password === "") {
        console.error("Email and password are required to create a user.");
        errormsg.textContent = "Email and password are required to log in.";
        return;
    }
    location.href = 'imin.html';
}

window.onload = function() {
    const errormsg = document.getElementById("error-msg");
    
    document.getElementById("login").addEventListener("click", function() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        userLogon(email, password, errormsg);
    });

    document.getElementById("create").addEventListener("click", function() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        createUser(email, password, errormsg);
    });

}