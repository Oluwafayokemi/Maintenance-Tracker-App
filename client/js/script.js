const coll = document.getElementsByClassName('collapsible');
let i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener('click', function () {
    this.classList.toggle('active');
    const content = this.nextElementSibling;
    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }
  });
}

// -----------------displayAlert ----------------------------------

const displayAlert = (message) => {
  document.getElementById('display').style.display = 'block';
  document.getElementById('alert').textContent = message;
  setTimeout(() => {
    document.getElementById('display').style = 'none';
  }, 4000);
};

// -------------------myFunction ---------------------------------

const myFunction = () => {
  // Declare variables
  let input,
    filter,
    table,
    tr,
    td,
    j;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  table = document.getElementById('tableItem');
  tr = table.getElementsByTagName('tr');

  // Loop through all table rows, and hide those who don't match the search query
  for (j = 0; j < tr.length; j++) {
    td = tr[j].getElementsByTagName('td')[5];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[j].style.display = '';
      } else {
        tr[j].style.display = 'none';
      }
    }
  }
}

// -----------------------------modal-----------------

const modal = document.getElementById('myModal');

// Get the button that opens the modal
const btn = document.getElementById('myBtn');

// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};