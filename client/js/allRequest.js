const toggleModal = (modal) => {
  const displayModal = document.getElementById('myModal').style.display;

  if (displayModal === 'block') {
    document.getElementById('myModal').style.display = 'none';
    document.getElementById(modal).style.display = 'none';
  } else {
    document.getElementById('myModal').style.display = 'block';
    document.getElementById(modal).style.display = 'block';
  }
};
