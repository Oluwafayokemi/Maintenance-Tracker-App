/**
 * JS file to handle users get request.
 */
const getRequestUrl = 'https://calm-fortress-33069.herokuapp.com';
const requestUrl = window.location.href;
const url = new URL(requestUrl);
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
console.log('55555555555555555555555', response.requests)
  for (let i = 0; i < response.requests.length; i++) {
  // creates a table row
    const row = document.createElement('tr');

    const cell1 = document.createElement('td');
    const cell2 = document.createElement('td');
    const cell3 = document.createElement('td');
    const cell4 = document.createElement('td');
    const cell5 = document.createElement('td');

    const cellText1 = document.createTextNode(response.requests[i].requestid);
    const cellText2 = document.createTextNode(response.requests[i].date);
    const cellText3 = document.createTextNode(response.requests[i].equipment);
    const cellText4 = document.createTextNode(response.requests[i].description);
    const cellText5 = document.createTextNode(response.requests[i].status);

    cell1.appendChild(cellText1);
    cell2.appendChild(cellText2);
    cell3.appendChild(cellText3);
    cell4.appendChild(cellText4);
    cell5.appendChild(cellText5);

    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);
    row.appendChild(cell5);

    tableBody.appendChild(row);

  }

  console.log(tableBody);
  // response.forEach((request) => {
  //   const row = document.createElement('tr');
  //   const cellId = row.insertCell(0);
  //   const cellDate = row.insertCell(1);
  //   const cellEquipment = row.insertCell(2);
  //   const cellDescription = row.insertCell(3);
  //   const cellStatus = row.insertCell(4);
  //   const cellUpdate = row.insertCell(5);
  //   const cellDelete = row.insertCell(6);
  //   cellId.textContent = request.requests.requestid;
  //   cellDate.textContent = new Date(request.requests.date).toLocaleString('en-GB', { hour12: true });
  //   cellEquipment.textContent = request.requests.equipment;
  //   cellDescription.textContent = request.requests.description;
  //   cellStatus.textContent = request.requests.status;
  //   cellUpdate.textContent = `<button type="submit" id="myBtn" onclick="getRequest(${request.requests.requestid}, 'update')">
  //     <i class="far fa-edit"></i>
  //   </button>`;
  //   cellDelete.textContent = `<button type="submit" onclick="getRequest(${request.requests.requestsid}, 'update')">
  //       <i class="fas fa-trash-alt"></i>
  //     </button>`
  //     ;
  //   tableBody.getRequestObject(row);
  // });
  // requestTable.removeChild(requestTable.lastChild);
  // return requestTable.getRequestObject(tableBody);
};
const getAllRequest = () => {
  fetch(request)
    .then(response => response.json())
    .then((data) => {
 console.log(data, '@@@@@@@@@@@@@@@@@@@@@@@');
      getRequestObject(data);
      // }
      // let error = Object.assign({}, {
      //   status: data.status,
      //   message: data.message,
      // });
      // return Promise.reject(error);
    })
    .catch(err => alert(err));
};
