var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}


// const show = (id) => {

//     document.getElementById("col1").style.display = "none";
//     document.getElementById("col2").style.display = "none";
//     document.getElementById("col3").style.display = "none";
//     document.getElementById("col4").style.display = "none";
//     document.getElementById("col5").style.display = "none";

//     document.getElementById(id).style.display = "block";
// }
