const updateForm = document.getElementById('update-form'); // get the form id//
const requestURL = 'https://calm-fortress-33069.herokuapp.com'; // production url//

updateForm.onsubmit = (getRequests) => {
  getRequests.preventDefault();

  const equipment = document.querySelector('#editEquip').value;
  const description = document.querySelector('#editDescrip').value;

  const editRequest = {
    equipment,
    description,
  };
  const request = new Request(`${requestURL}/api/v1/users/requests/${requestId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': `${localStorage.token}`,
    },
    body: JSON.stringify(editRequest),
  });

  fetch(request)
    .then(response => response.json())
    .then((data) => {
      if (data.status >= 201 && data.status < 300) {
        displayAlert(data.message);
        toggleModal('modal-content');
      } else {
        const error = Object.assign({}, {
          status: data.status,
          message: data.message,
        });
        return Promise.reject(error);
      }
    })
    .catch(error => console.log(error.message));
};
