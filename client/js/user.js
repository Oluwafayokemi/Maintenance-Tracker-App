// const signupForm = document.getElementById('signup-form'); //get the form id//
// const apiURL = 'https://calm-fortress-33069.herokuapp.com/'; //production url//

// signupForm.onsubmit = (e) => {
//     e.preventDefault();

//     const firstName = document.getElementById('firstName').value;
//     const lastName = document.getElementById('lastName').value;
//     const department = document.getElementById('department').value;
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     const newUser = {
//         firstName, lastName, department, email, password,
//     };

//     fetch(`${apiURL}/api/v1/auth/signup`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json', 'x-access-token': 'token' },
//         body: JSON.stringify(newUser),
//     })
//         .then(json)
//     console.log('Request succeeded with JSON response', data);
// })
//   .catch (function (error) {
//     console.log('Request failed', error);
// });
// localStorage.setItem(email, user.email);

// window.location.href = './user.index.html';
//     });
// };


const url = 'https://calm-fortress-33069.herokuapp.com/';
// The data we are going to send in our request
const data = {
    name: 'Sara',
};
// Create our request constructor with all the parameters we need
let request = new Request(url, {
    method: 'POST',
    body: data,
    headers: new Headers(),
});

status((response) => {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
})

json((response) => {
    return response.json()
})

fetch(`${request}/api/v1/auth/signup`, {
    .then(() => {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-access-token': 'token' },
        body: JSON.stringify(newUser),
    })
    .then(status)
    .then(json)
    .then((data) => {
        console.log('Request succeeded with JSON response', data);
    });
  })
  .catch((error) => {
    console.log('Request failed', error);
});
