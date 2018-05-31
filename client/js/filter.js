const signupForm = document.getElementById('signup-form'); // get the form id//
const signout = document.getElementById('sign-out');
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
      'x-access-token': `token ${token}`
    },
    body: JSON.stringify(newUser),
  };
  // Create our request constructor with all the parameters we need
  const status = ((response) => {
    console.log(response);
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
      alert(`welcome ${firstName}`)
    }
    return Promise.reject(alert(new Error(response.statusText))
      .then(res => alert('email already exist')));
  });
  const json = (response => response.json());

  fetch(`${apiURL}/api/v1/auth/signup`, request)
    .then(status)
    .then(json);
  try {
    setInterval(() => {
      localStorage.setItem('token', `${token}`);
    }, 1000);
  } catch (et) {
    if (et == 'QUOTA_EXCEEDED_ERR') {
      alert('Quota exceeded!');
    }
  }
  window.location.href = './admin.index.html';
  // });
};
