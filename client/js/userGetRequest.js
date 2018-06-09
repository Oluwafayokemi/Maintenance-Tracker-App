/**
 * JS file to handle users get request.
 */
const getRequestUrl = 'https://calm-fortress-33069.herokuapp.com';
const requestUrl = window.location.href;
document.querySelector('#name').textContent = `Welcome ${localStorage.firstName.toLowerCase()}`;

const requestTable = document.querySelector('#tableItem');

const request = new Request(`${getRequestUrl}/api/v1/users/requests`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'x-access-token': `${localStorage.token}`,
  },
});

const getRequestObject = (response) => {
  const tableBody = document.querySelector('#reqBody');
  for (let i = 0; i < response.requests.length; i++) {
    // creates a table row
    const row = document.createElement('tr');

    const cell1 = document.createElement('td');
    const cell2 = document.createElement('td');
    const cell3 = document.createElement('td');
    const cell4 = document.createElement('td');
    const cell5 = document.createElement('td');
    const cell6 = document.createElement('BUTTON');
    cell6.setAttribute('id', 'myBtn');
    cell6.setAttribute('class', 'submitbtn');


    const cellText1 = document.createTextNode(response.requests[i].requestid);
    const cellText2 = document.createTextNode(new Date(response.requests[i].date).toLocaleString('en-GB', { hour12: true }));
    const cellText3 = document.createTextNode(response.requests[i].equipment);
    const cellText4 = document.createTextNode(response.requests[i].description);
    const cellText5 = document.createTextNode(response.requests[i].status);
    const cellText6 = document.createTextNode('Edit');

    cell1.appendChild(cellText1);
    cell2.appendChild(cellText2);
    cell3.appendChild(cellText3);
    cell4.appendChild(cellText4);
    cell5.appendChild(cellText5);
    cell6.appendChild(cellText6);

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);
    row.appendChild(cell5);
    row.appendChild(cell6);

    tableBody.appendChild(row);
  }
};
const getAllRequest = () => {
  fetch(request)
    .then(response => response.json())
    .then((data) => {
      // if (data.status === 200) {
        getRequestObject(data);
      // }
      // const error = Object.assign({}, {
      //   status: data.status,
      //   message: data.message,
      // });
      // return Promise.reject(error);
    })
    .catch(error => alert(error));
};
