// let tabs = document.querySelectorAll(".tabs h3");
// let tabContents = document.querySelectorAll(".tab-content div");

// tabs.forEach((tab, index) => {
//   tab.addEventListener("click", () => {
//     tabContents.forEach((content) => {
//       content.classList.remove("active");
//     });
//     tabs.forEach((tab) => {
//       tab.classList.remove("active");
//     });
//     tabContents[index].classList.add("active");
//     tabs[index].classList.add("active");
//   });
// });

const tabs=document.querySelectorAll('.tab-btn')
const all_content = document.querySelectorAll('.content')

tabs.forEach((tab,index)=>{
    tab.addEventListener('click',(e)=>{
        tabs.forEach(tab=>{tab.classList.remove('active')})
        tab.classList.add('active');

        var line = document.querySelector('.line');
        line.style.width = e.target.offsetWidth + "px";
        line.style.left = e.target.offsetLeft + "px";

        all_content.forEach(content=>{content.classList.remove('active')})
        all_content[index].classList.add('active')
    })


})