const loginForm = document.getElementById('sign-in'); // get the form id//
const apiURL = 'https://calm-fortress-33069.herokuapp.com'; // production url//
loginForm.onsubmit = (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const user = {
    email,
    password,
  };
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  headers.set('Content-Type', 'application/json');

  const request = new Request(`${apiURL}/api/v1/auth/login`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(user),
  });

  fetch(request)
    .then(response => response.json())
    .then((newUser) => {
      localStorage.setItem('token', newUser.token);
      localStorage.setItem('email', newUser.email);

      window.location.href = 'admin.index.html';
    })
    .catch(err => alert(err))
};
