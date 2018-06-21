/**
 * JS file to handle users update request.
 */
const requestURL = 'https://calm-fortress-33069.herokuapp.com'; // production url//

const requestStatus = (requestId, selectElement) => {
  const { value: statusText } = selectElement;
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
      if (data.status === 401) {
        displayAlert('Please sign in or sign up if you are a new user');
        window.location.href = 'index.html';
      } else if (data.status >= 201 && data.status < 300) {
        displayAlert(data.message);
        window.location.href = 'admin.index.html';
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
