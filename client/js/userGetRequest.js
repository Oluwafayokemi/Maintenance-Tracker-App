/* eslint-disable no-continue, no-plusplus, no-loop-func */

/**
 * JS file to handle users get request.
 */
const getRequestUrl = 'https://calm-fortress-33069.herokuapp.com';
const updateEquip = document.getElementById('editEquip');
const updateDesc = document.getElementById('editDescrip');
const previousButton = document.getElementById('left');
const nextButton = document.getElementById('right');
const tableItem = document.getElementById('table');

let offset = 0;
const limit = 10;

const previous = () => {
  if (offset === 0) {
    return;
  }
  offset -= 10;
  getAllRequest();
};
const next = () => {
  if (userRequestArr.length < 10) {
    return;
  }
  offset += 10;
  getAllRequest();
};

previousButton.addEventListener('click', () => {
  previous();
});
nextButton.addEventListener('click', () => {
  next();
});

document.querySelector('#name').textContent = `Welcome ${localStorage.firstName.toLowerCase()}`;
let userRequestArr;

const getOneRequest = (requestId) => {
  const requestObject = userRequestArr.find(currRequest => currRequest.requestid === parseInt(requestId, 10));
  updateEquip.value = requestObject.equipment;
  updateDesc.value = requestObject.description;
};
const updateRequest = (id) => {
  requestId = id;
  getOneRequest(id);
};
const getRequestObject = (response) => {
  const tableBody = document.createElement('tbody');
  const arr = ['id', 'date', 'equipment', 'description', 'status', 'edit'];
  userRequestArr = response.requests;
  for (let i = 0; i < response.requests.length; i++) {
    // creates a table row
    const row = document.createElement('tr');

    for (let j = 0; j < arr.length; j++) {
      const cell = document.createElement('td');
      if (arr[j] === 'date') {
        const cellText = document.createTextNode(new Date(response.requests[i].date).toLocaleString('en-GB', {
          hour12: true,
        }));
        cell.appendChild(cellText);
        row.appendChild(cell);
        continue;
      }
      if (arr[j] === 'edit') {
        const button = document.createElement('button');
        button.setAttribute('class', 'updateBtn');
        button.addEventListener('click', () => {
          updateRequest(response.requests[i].requestid);
          toggleModal('modal-content');
        });
        const editText = document.createTextNode('Edit');
        if (response.requests[i].status !== 'pending') {
          button.disabled = true;
        }
        button.appendChild(editText);
        cell.append(button);
        row.append(cell);
        continue;
      }
      if (arr[j] === 'id') {
        const id = document.createElement('td');
        const idValue = document.createTextNode(i + 1);
        id.appendChild(idValue);
        cell.appendChild(id);
        row.appendChild(cell);
        continue;
      }
      const cellText = document.createTextNode(response.requests[i][arr[j]]);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    tableBody.appendChild(row);
  }
  tableItem.removeChild(tableItem.lastChild);
  tableItem.appendChild(tableBody);
};
const getAllRequest = () => {
  const request = new Request(`${getRequestUrl}/api/v1/users/requests?offset=${offset}&limit=${limit}`, {
    method: 'GET',
    cache: 'reload',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': `${localStorage.token}`,
    },
  });
  fetch(request)
    .then(response => response.json())
    .then((data) => {
      if (data.status === 401) {
        displayAlert('Please sign in or sign up if you are a new user');
        window.location.href = 'index.html';
      } else if (data.status >= 200 && data.status < 300) {
        getRequestObject(data);
      } else {
        const error = Object.assign({}, {
          status: data.status,
          message: data.message,
        });
        return Promise.reject(error);
      }
    })
    .catch(error => displayAlert(error.message));
};

getAllRequest();
