document.addEventListener("DOMContentLoaded", function () {
     let careerItems = document.querySelectorAll(".career-item");
 
     window.addEventListener("scroll", function () {
         let scrollPos = window.scrollY + window.innerHeight;
 
         careerItems.forEach((item) => {
             let itemPos = item.getBoundingClientRect().top + window.scrollY;
             if (scrollPos > itemPos) {
                 item.style.opacity = "1";
                 item.style.transform = "translateY(0)";
             }
         });
     });
 });
//  document.addEventListener("DOMContentLoaded", function () {
//     fetch("/ABT-PROJECT/Frontend/components/footer.html")  // Footer ka sahi path set karo
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             return response.text();
//         })
//         .then(data => {
//             document.getElementById("footer-container").innerHTML = data;
//         })
//         .catch(error => console.error("Error loading footer:", error));
// });
