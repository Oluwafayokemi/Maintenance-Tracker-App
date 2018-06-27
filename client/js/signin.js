const loginForm = document.getElementById('signin-form'); // get the form id//
const signinURL = 'https://calm-fortress-33069.herokuapp.com'; // production url//
const displayAlert = (message) => {
  document.getElementById('display').style.display = 'block';
  document.getElementById('alert').textContent = message;
  setTimeout(() => {
    document.getElementById('display').style = 'none';
  }, 4000);
};

loginForm.onsubmit = (e) => {
  e.preventDefault();

  const email = document.getElementById('signin').value;
  const password = document.getElementById('psw').value;
  const existingUser = {
    email,
    password,
  };

  const request = new Request(`${signinURL}/api/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(existingUser),
  });

  fetch(request)
    .then(response => response.json())
    .then((data) => {
      if (data.status !== 200) {
        displayAlert(data.message);
      } else if (data.user.isAdmin === false) {
        displayAlert(`success login in ${data.user.firstName}`);
        localStorage.setItem('token', data.token);
        localStorage.setItem('firstName', data.user.firstName);
        window.location.href = 'user.index.html';
      } else if (data.user.isAdmin === true) {
        displayAlert(`success login in Admin ${data.user.firstName}`);
        localStorage.setItem('token', data.token);
        localStorage.setItem('firstName', data.user.firstName);
        window.location.href = 'admin.index.html';
      } else {
        const error = Object.assign({}, {
          status: data.status,
          message: data.message,
        });
        return Promise.reject(error);
      }
    })
    .catch(error => displayAlert(error.message));
};