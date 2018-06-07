/**
 * JS file to handle users get request.
 */
const getRequestUrl = 'https://calm-fortress-33069.herokuapp.com';
const requestUrl = window.location.href;
const url = new URL(requestUrl);

const myList = document.querySelector('#tableItem');

// fetchRequest();
const request = new Request(`${getRequestUrl}/api/v1/users/requests`, {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': `${localStorage.token}`
    },
  });

// function fetchRequest() {
    fetch(request)
    .then(response => response.json())
    .then((data) => {
        document.querySelector('#id').textContent = data.id;
        document.querySelector('#date').textContent = data.date;
        document.querySelector('#equipment').textContent = data.equipment;
        document.querySelector('#description').textContent = data.description;
        document.querySelector('#status').textContent = data.status;
    });
// }
