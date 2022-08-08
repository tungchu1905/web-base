const container = document.getElementById("container");
const btn = document.createElement("button");
btn.innerText = "Test"
btn.className = "btn red";
btn.onclick = function(event) {
 if (this.classList.contains("red")) {
   this.classList.remove("red");
   this.classList.add("blue");
 } else {
   this.classList.remove("blue");
   this.classList.add("red");
 }
};
container.appendChild(btn);

// Imperative programming: để đổi màu của button, 
//ta phải chỉ dẫn (how) từng bước cho máy tính hiểu

// Bai toan To do list, xoa thang thu 3
// Tim DOM thang thu 3
// Remove DOM day di

// React 
// mang gom 4 ptu 
// Mang gom 3 ptu (Dich den)