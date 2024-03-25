
const apiUrl = 'http://localhost:5193';

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
    body: JSON.stringify(data),
  };

  fetch(`${apiUrl}/auth`, requestOptions)
    .then(response => {
      if (!response.ok) {
        if (response.status === 401) {
          alert("Niepoprawny login lub hasło!")
        } else {
          alert ("Nieznany błąd!")
        }
      }
      else {
        response.text().then(data =>
          document.cookie = `auth_token=${data}`
        )
        window.location.href = "index.html";
      }
    });
}



const UserData = () => {
  var cookies = document.cookie.split("; ");
  var token = cookies.find(i => i.startsWith("auth_token=")).split("=")[1]

  const requestOptions = {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  };

  fetch(`${apiUrl}/client`, requestOptions)
  .then(response => {
    if (!response.ok) {
      window.location.href = "login.html";
    }
    else {
      response.json().then(data =>
        document.getElementById('data').innerHTML = JSON.stringify(data)
      )
    }
  })
}



const CreateClient = () => {
  let userName = document.getElementById("FirstName").value;
  let userSecondName = document.getElementById("SecondName").value;
  let userLastName = document.getElementById("LastName").value;
  let userDateOfBirth = document.getElementById("DateOfBirth").value;
  let userLogin = document.getElementById("login").value;
  let userPassword = document.getElementById("password").value;

  const data ={
    FirstName: userName,
    SecondName: userSecondName,
    LastName: userLastName,
    DateOfBirth: userDateOfBirth,
    CLogin: userLogin,
    CPassword: userPassword,
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      "Content-Type": `application/json`
    },
    body: JSON.stringify(data),
  };

  fetch(`${apiUrl}/client`, requestOptions)
  .then(response => {
    if (!response.ok) {
      alert ("Błąd!")
    }
    else {
      alert ("Wysłano email!")
      window.location.href = 'code.html'
    }
  })
}

const VerifyCod = () => {
  let UserCode = document.getElementById("code").value;

const data ={
  verifyCod: UserCode,
};

const requestOptions = {
  method: 'POST',
  headers: {
    "Content-Type": `application/json`
  },
  body: JSON.stringify(data),
};

  fetch(`${apiUrl}/client`, requestOptions)
  .then(response => {
    if (!response.ok) {
      alert ("Błąd!")
    }
    else {
      alert ("Poprawny kod!")
      window.location.href = 'login.html'
    }
  })
}
