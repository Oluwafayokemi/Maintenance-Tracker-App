const requestForm = document.getElementById('request-form'); // get the form id//
const requestURL = 'https://calm-fortress-33069.herokuapp.com'; // production url//

requestForm.onsubmit = (e) => {
  e.preventDefault();

  const firstName = document.querySelector('#firstName').value;
  const lastName = document.querySelector('#lastName').value;
  const department = document.querySelector('#department').value;
  const equipment = document.querySelector('#equip').value;
  const description = document.querySelector('#descrip').value;

  const createRequest= {
    firstName,
    lastName,
    department,
    equipment,
    description,
  };
console.log(createRequest)
  const request = new Request(`${requestURL}/api/v1/users/requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': `${localStorage.token}`,
    },
    body: JSON.stringify(createRequest),
  });

  fetch(request)
    .then(response => response.json())
    .then((data) => {
      localStorage.getItem('token', `${localStorage.token}`);
        if ( data.status === 201) {
            alert(data.message)
        } 
        let error = Object.assign({}, {
          status: data.status,
          message: data.message,
        });
        return Promise.reject(error);
    })
    .catch(err => alert(err));
};
