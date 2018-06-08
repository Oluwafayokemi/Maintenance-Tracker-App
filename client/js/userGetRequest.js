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
    'x-access-token': `${localStorage.token}`
  },
});
const getRequestObject = (response) => {
  const tableBody = document.createElement('tbody');
  response.forEach((request) => {
    const row = document.createElement('tr');
    const requestid = row.insertCell(0);
    const requestDate = row.insertCell(1);
    const requestEquipment = row.insertCell(2);
    const requestDescription = row.insertCell(3);
    const requestStatus = row.insertCell(4);
    const requestUpdate = row.insertCell(5);
    const requestDelete = row.insertCell(6);
    requestid.textContent = request.requests.requestid;
    requestDate.textContent = new Date(request.requests.date).toLocaleString('en-GB', { hour12: true });
    requestEquipment.textContent = request.requests.equipment;
    requestDescription.textContent = request.requests.description;
    requestStatus.textContent = request.requests.status;
    requestUpdate.textContent = `<button type="submit" id="myBtn" onclick="getRequest(${request.requests.requestid}, 'update')">
      <i class="far fa-edit"></i>
    </button>`;
    requestDelete.textContent = `<button type="submit" onclick="getRequest(${request.requests.requestsid}, 'update')">
        <i class="fas fa-trash-alt"></i>
      </button>`;
    tableBody.append(row);
  });
  requestTable.removechild(requestTable.lastChild);
  return requestTable.getRequestObject(tableBody);
}
const getAllRequest = () => {
  fetch(request)
    .then(response => response.json())
    .then((data) => {
      if (data.status === 201) {
        getRequestObject(data);
      }
      let error = Object.assign({}, {
        status: data.status,
        message: data.message,
      });
      return Promise.reject(error);
    })
    .catch(err => alert(err));
}
