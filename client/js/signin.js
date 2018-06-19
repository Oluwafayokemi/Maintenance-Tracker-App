const loginForm = document.getElementById('signin-form'); // get the form id//
const signinURL = 'https://calm-fortress-33069.herokuapp.com'; // production url//

loginForm.addEventListener('submit', (e) => {
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
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.user.email);
      localStorage.setItem('firstName', data.user.firstName);

      if (data.status === 200 && data.user.isAdmin === false) {
        displayAlert(data.message);
        window.location.href = 'user.index.html';
      } else if (data.status === 200 && data.user.isAdmin === true) {
        displayAlert(`success login in Admin ${data.user.firstName}`);
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
});
