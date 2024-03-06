
const apiUrl = 'http://localhost:5193';
const checkAuth = () => {
  let x = document.cookie;
  if (!x.includes("autenticated=true"))
  {
    window.location.href = "login.html";
  }
}

const loginUser = () => {
  let userName = document.getElementById("login").value;
  let userPassword = document.getElementById("password").value;
  const data ={
    CLogin: userName,
    CPassword: userPassword,
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include',
    body: JSON.stringify(data),
  };

  fetch(`${apiUrl}/auth`, requestOptions)
    .then(response =>{
      if (!response.ok) {
        if (response.status === 401) {
          alert("Niepoprawny login lub hasło!")
        } else {
          alert ("Nieznany błąd!")
        }
      } else {
        // window.location.href = "index.html";
        console.log(response)
      }
    });
}

const logRequire = () => {
  let x = document.cookie;
  if (x.includes("autenticated=true"))
  {
    window.location.href = "index.html";
  }

}


