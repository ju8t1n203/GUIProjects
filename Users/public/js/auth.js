async function checkLogin() {
  const res = await fetch("/api/me");
  if (!res.ok) location.href = "/login.html";
}

function logout() {
  window.location.href = "/auth/logout";
}