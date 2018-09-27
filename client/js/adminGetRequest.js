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
const tableItem = document.getElementById('tableItem');

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
const logoutBtn = document.querySelector('#logoutBtn');
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
});
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
        const selectBox = document.createElement('select');
        selectBox.setAttribute('class', 'submitBtn');
        selectBox.setAttribute('id', 'mySelect');
        selectBox.addEventListener('change', () => {
          requestStatus(response.requests[i].requestid, selectBox);
        });
        const createNewOption = (newElement, attributesObj, elementText) => {
          const element = document.createElement(newElement);
          for (const key in attributesObj) {
            element.setAttribute(key, attributesObj[key]);
            let text;
            text = document.createTextNode(elementText);
            element.appendChild(text);
            selectBox.appendChild(element);
          }
          cell.append(selectBox);
          row.append(cell);
        };
        createNewOption('option', {
          value: 'pending',
        }, '--select--');
        createNewOption('option', {
          value: 'approve',
        }, 'Approve');
        createNewOption('option', {
          value: 'disapprove',
        }, 'Disapprove');
        createNewOption('option', {
          value: 'resolve',
        }, 'Resolve');
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
        window.location.href = 'index.html';
        displayAlert('Please sign in or sign up if you are a new user');
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
