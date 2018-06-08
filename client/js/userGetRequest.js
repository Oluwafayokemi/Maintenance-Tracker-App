/**
 * JS file to handle users get request.
 */
const getRequestUrl = 'https://calm-fortress-33069.herokuapp.com';
const requestUrl = window.location.href;
const url = new URL(requestUrl);
document.querySelector('#name').textContent = `Welcome ${localStorage.firstName.toLowerCase()}`

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
  response.forEach((data) => {
    const row = document.createElement('tr');
    const requestid = row.insertCell(0);
    const requestDate = row.insertCell(1);
    const requestEquipment = row.insertCell(2);
    const requestDescription = row.insertCell(3);
    const requestStatus = row.insertCell(4);
    requestid.textContent = data.requestid;
    requestDate.textContent = new Date(data.date).toLocaleString('en-GB', { hour12: true });
    requestEquipment.textContent = data.equipment;
    requestDescription.textContent = data.description;
    requestStatus.textContent = data.status;
    tableBody.append(row);
  });
  requestTable.removechild(requestTable.lastChild);
  return requestTable.append(tableBody);
}
const fetchAllRequest = () => {
  fetch(request)
    .then(response => response.json())
    .then((data) => {
      if (data.status === 201) {
        getRequestObject(data.response);
      }
      let error = Object.assign({}, {
        status: data.status,
        message: data.message,
      });
      return Promise.reject(error);
    })
    .catch(err => alert(err));
}
