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
  const tableBody = document.createElement('tbody');
  const row = document.createElement('tr');
  const requestid = row.insertCell(0);
  const requestDate = row.insertCell(1);
  const requestEquipment = row.insertCell(2);
  const requestDescription = row.insertCell(3);
  const requestStatus = row.insertCell(4);
  const requestUpdate = row.insertCell(5);
  const requestDelete = row.insertCell(6);
  requestid.textContent = response.requests.requestid;
  requestDate.textContent = new Date(response.requests.date).toLocaleString('en-GB', { hour12: true });
  requestEquipment.textContent = response.requests.equipment;
  requestDescription.textContent = response.requests.description;
  requestStatus.textContent = response.requests.status;
  requestUpdate.textContent = `<button type="submit" id="myBtn" onclick="getRequest(${response.requests.id}, 'update')">
      <i class="far fa-edit"></i>
    </button>`;
  requestDelete.textContent = `<button type="submit" onclick="getRequest(${response.requests.id}, 'delete')">
        <i class="fas fa-trash-alt"></i>
      </button>`;
};
const getAllRequest = () => {
  fetch(request)
    .then(response => response.json())
    .then((data) => {console.log(data.requests);    //  {
      if (data.status === 201) {
        data.map((result) => {
          request.appendChild(getRequestObject(result));
        });
      }
      const error = Object.assign({}, {
        status: data.status,
        message: data.message,
      });
      return Promise.reject(error);
    })
    .catch(err => alert(err));
};
