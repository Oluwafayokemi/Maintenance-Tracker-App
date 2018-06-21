/* eslint-disable no-continue, no-plusplus, no-loop-func */

/**
 * JS file to handle users get request.
 */
const getRequestUrl = 'https://calm-fortress-33069.herokuapp.com';
const getId = document.getElementById('reqId');
const getName = document.getElementById('Name');
const getDepartment = document.getElementById('department');
const getEmail = document.getElementById('Email');
const getEquip = document.getElementById('equ');
const getDesc = document.getElementById('descrip');
const getStatus = document.getElementById('stat');
const getDate = document.getElementById('dat');
const previousBtn = document.getElementById('fa-left');
const nextBtn = document.getElementById('fa-right');
const tableItem = document.getElementById('tableItem')

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
previousBtn.addEventListener('click', () => {
  previous();
});
nextBtn.addEventListener('click', () => {
  next();
});

document.querySelector('#fir_name').textContent = `Welcome ${localStorage.firstName.toLowerCase()}`;
let userRequestArr;

const getOneRequest = (requestId) => {
  const requestObject = userRequestArr.find(currRequest => currRequest.requestid === parseInt(requestId, 10));
  getId.textContent = `Request Id: ${requestObject.requestid}`;
  getName.textContent = `Name: ${requestObject.firstname} ${requestObject.lastname}`;
  getDepartment.textContent = `Department: ${requestObject.department}`;
  getEmail.textContent = `Email: ${requestObject.email}`;
  getEquip.textContent = `Equipment: ${requestObject.equipment}`;
  getDesc.textContent = `Description: ${requestObject.description}`;
  getStatus.textContent = `Status: ${requestObject.status}`;
  getDate.textContent = `Date: ${new Date(requestObject.date).toLocaleString('en-GB', { hour12: true })}`;
};
const updateRequest = (id) => {
  requestId = id;
  getOneRequest(id);
};
const getRequestObject = (response) => {
  const tableBody = document.createElement('tbody');
  const arr = ['id', 'date', 'equipment', 'action', 'status', 'details'];
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
      if (arr[j] === 'id') {
        const id = document.createElement('td');
        const idValue = document.createTextNode(i + 1);
        id.appendChild(idValue);
        cell.appendChild(id);
        row.appendChild(cell);
        continue;
      }
      if (arr[j] === 'details') {
        const button = document.createElement('button');
        button.setAttribute('class', 'submitBtn');
        button.setAttribute('id', 'myBtn');
        button.addEventListener('click', () => {
          updateRequest(response.requests[i].requestid);
          toggleModal('modal-content');
        });
        const detail = document.createTextNode('Details');
        button.appendChild(detail);
        cell.append(button);
        row.append(cell);
        continue;
      }
      if (arr[j] === 'action') {
        const button = document.createElement('select');
        button.setAttribute('class', 'submitBtn');
        button.setAttribute('id', 'mySelect');
        button.addEventListener('change', () => {
          requestStatus(response.requests[i].requestid, button);
        });
        const option1 = document.createElement('option');
        option1.setAttribute('value', 'pending');
        option1.setAttribute('id', 'pen');
        const optionText1 = document.createTextNode('--select--');
        const option2 = document.createElement('option');
        option2.setAttribute('value', 'approve');
        const optionText2 = document.createTextNode('Approve');
        const option3 = document.createElement('option');
        option3.setAttribute('id', 'rej');
        option3.setAttribute('value', 'disapprove');
        const optionText3 = document.createTextNode('Disapprove');
        const option4 = document.createElement('option');
        option4.setAttribute('id', 'res');
        option4.setAttribute('value', 'resolve');
        const optionText4 = document.createTextNode('Resolve');

        option1.appendChild(optionText1);
        option2.appendChild(optionText2);
        option3.appendChild(optionText3);
        option4.appendChild(optionText4);
        button.appendChild(option1);
        button.appendChild(option2);
        button.appendChild(option3);
        button.appendChild(option4);
        cell.append(button);
        row.append(cell);
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
  const request = new Request(`${getRequestUrl}/api/v1/requests?offset=${offset}&limit=${limit}`, {
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
      } else if (data.status === 200) {
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
