const loginForm = document.getElementById('signin-form'); // get the form id//
const signinURL = 'https://calm-fortress-33069.herokuapp.com'; // production url//

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
    .then((user) => {
      localStorage.setItem('token', user.token);
      localStorage.setItem('email', existingUser.email);

      if (user.isadmin) {
        window.location.href = 'user.index.html';
      }
      else {
        window.location.href = 'admin.index.html';
      }
    })
    .catch(err => alert('somehting went wrong', err));
};
