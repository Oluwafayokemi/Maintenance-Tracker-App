const requestForm = document.getElementById('request-form'); // get the form id//
const apiURL = 'https://calm-fortress-33069.herokuapp.com'; // production url//
requestForm.onsubmit = (e) => {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const equipment = document.getElementById('equipment').value;
  const description = document.getElementById('description').value;
  const newRequest = {
    firstName,
    lastName,
    equipment,
    description,
  };
//   const headers = new Headers();
//   headers.append('Content-Type', 'application/json');

//   headers.set('Content-Type', 'application/json');
//   headers.set('x-access-token', `${localStorage.token}`);

  const request = new Request(`${apiURL}/api/v1/users/request`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': `${localStorage.token}`,
    },
    body: JSON.stringify(newRequest),
  });

  fetch(request)
    .then(response => response.json())
    .then((data) => console.log(data.status))
    // {
    //   if (data.status === 201) {
    //     window.location.href = 'user.index.html';
    //     alert(data.message)
    //   } else {
    //     let error = Object.assign({}, {
    //       status: response.status,
    //       message: response.message,
    //     })
    //     return Promise.reject(error)
    //   }
    // })
    .catch(error => alert('somehting went wrong', error));
};
