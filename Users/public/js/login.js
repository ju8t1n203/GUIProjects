document.getElementById("login").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (res.ok) {
    location.href = "/imin.html";
  } else {
    document.getElementById("error-msg").textContent = "Invalid login";
  }
});