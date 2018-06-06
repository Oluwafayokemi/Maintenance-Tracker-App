const signupForm = document.getElementById('signup-form'); // get the form id//
const apiURL = 'https://calm-fortress-33069.herokuapp.com'; // production url//
signupForm.onsubmit = (e) => {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const department = document.getElementById('department').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const newUser = {
    firstName,
    lastName,
    department,
    email,
    password,
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
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.user.email);
      if (data.user.isAdmin) {
        window.location.href = 'user.index.html';
      }
      else {
        window.location.href = 'admin.index.html';
      }
    })
    .catch(err => alert('somehting went wrong', err));
};
