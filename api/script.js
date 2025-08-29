// Toggle between Login & Register
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

loginBtn.addEventListener("click", () => {
  loginForm.classList.add("active");
  registerForm.classList.remove("active");
  loginBtn.classList.add("active");
  registerBtn.classList.remove("active");
});

registerBtn.addEventListener("click", () => {
  registerForm.classList.add("active");
  loginForm.classList.remove("active");
  registerBtn.classList.add("active");
  loginBtn.classList.remove("active");
});

// Handle Register
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  try {
    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    alert(data.message || "Registration successful!");
  } catch (err) {
    alert("Error: " + err.message);
  }
});

// Handle Login
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Login successful! ✅");
      // Save token if backend sends JWT
      if (data.token) localStorage.setItem("token", data.token);
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    alert("Error: " + err.message);
  }
});
