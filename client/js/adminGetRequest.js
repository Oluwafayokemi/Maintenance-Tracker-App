/**
 * JS file to handle users get request.
 */
const getRequestUrl = 'https://calm-fortress-33069.herokuapp.com';
const getFirstName = document.getElementById('firstName');
const getLastName = document.getElementById('lastName');
const getDepartment = document.getElementById('department');
const getEquip = document.getElementById('equip');
const getDesc = document.getElementById('descrip');

document.querySelector('#name').textContent = `Welcome ${localStorage.firstName.toLowerCase()}`;
let userRequestArr;

const requestTable = document.querySelector('#tableItem');

const request = new Request(`${getRequestUrl}/api/v1/requests`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'x-access-token': `${localStorage.token}`,
  },
});

const updateRequest = (id) => {
  requestId = id;
  getOneRequest(id);
};
const getOneRequest = (requestId) => {
  const requestObject = userRequestArr.find(currRequest => currRequest.requestid === parseInt(requestId, 10));
  getFirstName.textContent = requestObject.firstname;
  getLastName.textContent = requestObject.lastname;
  getEquip.textContent = requestObject.equipment;
  getDesc.textContent = requestObject.description;
};
const getRequestObject = (response) => {
  const tableBody = document.querySelector('#userTable');
  const arr = ['requestid', 'date', 'equipment', 'description', 'status', 'details'];
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
      if (arr[j] === 'details') {
        const button = document.createElement('button');
        button.setAttribute('class', 'updateBtn');
        button.setAttribute('id', 'myBtn');
        button.addEventListener('click', () => {
          updateRequest(response.requests[i].requestid);
          toggleModal('modal-content');
        });
        const detail = document.createTextNode('Details');
        button.appendChild(detail)
        cell.append(button);
        row.append(cell);
        continue;
      }
      if (arr[j] === 'status') {
        const button = document.createElement('select');
        button.setAttribute('id', 'mySelect');

        const option1 = document.createElement('option');
        option1.setAttribute('value', 'pending');
        option1.setAttribute('id', 'pen');
        const optionText1 = document.createTextNode('pending');
        const option2 = document.createElement('option');
        option2.setAttribute('id', 'acc');
        option2.setAttribute('value', 'accept');
        const optionText2 = document.createTextNode('Accept');
        const option3 = document.createElement('option');
        option3.setAttribute('id', 'rej');
        option3.setAttribute('value', 'reject');
        const optionText3 = document.createTextNode('Reject');
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
};
const getAllRequest = () => {
  fetch(request)
    .then(response => response.json())
    .then((data) => {
      if (data.status === 200) { console.log(data)
        fetch(request)
        getRequestObject(data);
      }
      const error = Object.assign({}, {
        status: data.status,
        message: data.message,
      });
      return Promise.reject(error);
    })
    .catch(error => console.log(error));
};
