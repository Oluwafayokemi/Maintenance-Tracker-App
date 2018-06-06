
const toggleModal = (modal) => {
  const displayModal = document.getElementById('modal').style.display;

  if (displayModal === 'block') {
    document.getElementById('modal').style.display = 'none';
    document.getElementById(modal).style.display = 'none';
  } else {
    document.getElementById('modal').style.display = 'block';
    document.getElementById(modal).style.display = 'block';
  }
};
