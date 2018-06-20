const toggleModal = () => {
  const displayModal = document.getElementById('myModal').style.display;

  if (displayModal === 'block') {
    document.getElementById('myModal').style.display = 'none';
  } else {
    document.getElementById('myModal').style.display = 'block';
  }
};
