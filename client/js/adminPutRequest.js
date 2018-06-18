const btnStatus = document.getElementById('myStatus');
const requestURL = 'https://calm-fortress-33069.herokuapp.com'; // production url//

const requestStatus = (requestId, selectElement) => {
  const { value: statusText } = selectElement;
  console.log(statusText);
  const request = new Request(`${requestURL}/api/v1/requests/${requestId}/${statusText}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': `${localStorage.token}`,
    },
  });

  fetch(request)
    .then(response => response.json())
    .then((data) => {
      if (data.status >= 201 && data.status < 300) {
        displayAlert(data.message);
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
