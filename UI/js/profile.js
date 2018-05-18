// var coll = document.getElementsByClassName("collapsible");
// var i;

// for (i = 0; i < coll.length; i++) {
//     coll[i].addEventListener("click", function() {
//         this.classList.toggle("active");
//         var content = this.nextElementSibling;
//         if (content.style.display === "block") {
//             content.style.display = "none";
//         } else {
//             content.style.display = "block";
//         }
//     });
// }


const toggleModal = (modal) => {
    let displayModal = document.getElementById("modal").style.display;
    
    if (displayModal === 'block') {
        document.getElementById("modal").style.display = 'none';
        document.getElementById(modal).style.display = 'none';
    } else {
        document.getElementById("modal").style.display = 'block';
        document.getElementById(modal).style.display = 'block';
    }
}