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

  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      mode: 'no-cors',
    },
    body: JSON.stringify(newUser),
  };
  // Create our request constructor with all the parameters we need
  const status = ((response) => {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    }
    return Promise.reject(new Error(response.statusText));
  });

  const json = (response => response.json());

  fetch(`${apiURL}/api/v1/auth/signup`, request)
    .then(status)
    .then(json)
    .then((newuser) => {
      try {
        setInterval(() => {
          localStorage.setItem('token');
        }, 1000);
      } catch (et) {
        if (et == 'QUOTA_EXCEEDED_ERR') {
          alert('Quota exceeded!');
        }
      }
      window.location.href = './admin.index.html';
    });
};

