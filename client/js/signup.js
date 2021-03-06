const signupForm = document.getElementById('signup-form'); // get the form id//
const apiURL = 'https://calm-fortress-33069.herokuapp.com'; // production url//

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const department = document.getElementById('department').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('passwordCheck').value;

  const newUser = {
    firstName,
    lastName,
    department,
    email,
    password,
    confirmPassword,
  };
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  headers.set('Content-Type', 'application/json');

  const request = new Request(`${apiURL}/api/v1/auth/signup`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(newUser),
  });

  fetch(request)
    .then(response => response.json())
    .then((data) => {
      if (password != confirmPassword) {
        displayAlert('password not matching');
      } else if (data.status !== 200) {
        displayAlert(data.message);
      } else if (data.user.isAdmin === false) {
        displayAlert(data.message);
        localStorage.setItem('token', data.token);
        localStorage.setItem('firstName', data.user.firstName);
        window.location.href = 'user.index.html';
      } else if (data.user.isAdmin === true) {
        displayAlert(data.message);
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
});
