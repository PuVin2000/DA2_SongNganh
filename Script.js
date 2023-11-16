// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDdVJJ-dfNUXzpf-wCsG3NkudOUO3UB5Bo",
    authDomain: "da2-songnganh.firebaseapp.com",
    databaseURL: "https://da2-songnganh-default-rtdb.firebaseio.com",
    projectId: "da2-songnganh",
    storageBucket: "da2-songnganh.appspot.com",
    messagingSenderId: "150861314719",
    appId: "1:150861314719:web:e8e19bc38ea3083e3780aa",
    measurementId: "G-J2C39LD52P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import { getDatabase, ref, get, onValue, set ,child, update, remove }
    from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const db = getDatabase();
const DoSang = ref(db, "IOT");
const DoAm = ref(db, "IOT/Humid");


let HumidData = 0;

// Hiển thị độ sáng bóng đèn
var sliderNgang = document.getElementById("sliderNgangID");
var bulb01 = document.getElementById("bulb01");
sliderNgang.oninput = function () {
    document.getElementById("sliderNgangValue").innerHTML = sliderNgang.value;
    bulb01.style.opacity = sliderNgang.value / 100;
    update(DoSang, { 'Light': Number(sliderNgang.value) });
};


// // Cập nhật giá trị nhiệt độ
onValue(DoAm,(snapshot) => {
    const data = snapshot.val();
    console.log(data);
    HumidData = data;
    document.getElementById("do am").innerHTML = data;
    //return data
});


console.log(HumidData);

//console.log(getData);

// toggle button

var btnOpen = document.querySelector('.setting-btn')
var modal = document.querySelector('.setting')
var iconClose = document.querySelector('.setting__header i')
var btnClose = document.querySelector('.setting__footer button')

var CapNhatNhietDo = document.getElementById("CapNhatNhietDo");

function toggleModal() {
    modal.classList.toggle('hide')
}

btnOpen.addEventListener('click', toggleModal)
btnClose.addEventListener('click', toggleModal)
iconClose.addEventListener('click', toggleModal)
modal.addEventListener('click', function (e) {
    if (e.target == e.currentTarget) {
        toggleModal();
    }
})



window.onload = function () {

    var dps = []; // dataPoints
    var chart = new CanvasJS.Chart("chartContainer1", {
        title: {
            text: "Dynamic Data"
        },
        data: [{
            type: "line",
            dataPoints: dps,
            xValueType: "dateTime",
            xValueFormatString: " hh:mm TT"
        }]
    });

    var time = new Date;

    time.getHours();
    time.getMinutes();
    //time.getSeconds();
    //time.setMilliseconds(00);

    var xVal = 0;
    var yVal = 0;
    var updateInterval = 1000;
    var dataLength = 20; // number of dataPoints visible at any point

    var updateChart = function (count) {

        count = count || 1;

        for (var j = 0; j < count; j++) {
            time.setTime(time.getTime() + updateInterval);
            yVal = HumidData
            //console.log(HumidData)
            // console.log(onValue(DoAm, (snapshot) => {
            //     const data = snapshot.val()
            // }))

            //console.log(HumidData)
            dps.push({
                x: time.getTime(),
                y: 0
            });
        }

        if (dps.length > dataLength) {
            dps.shift();
        }

        chart.render();
    };

    updateChart(dataLength);
    //setInterval(function () { updateChart() }, updateInterval);
}


// Draw Chart

// const labels = ['January', 'February', 'March', 'April', 'May', 'June']

// const data = {
//     labels: labels,
//     datasets: [
//         {
//             label: 'lượt truy cập',
//             backgroundColor: 'blue',
//             borderColor: 'blue',
//             data: [10, 27, 56, 34, 24, 53],
//             tension: 0.4,
//         },
//     ],
// }
// const config = {
//     type: 'line',
//     data: data,
// }



// const canvas1 = document.getElementById('canvas1')
// const canvas2 = document.getElementById('canvas2')
// const chart1 = new Chart(canvas1, config)
//const char2 = new Chart(canvas2, config)




// var HumidData = 0;

// const getHum = async (DoAm) =>{
//     const valuehumid = await get(DoAm)
//     return valuehumid.val()
// }

// HumidData = await getHum(DoAm)
//console.log(HumidData)


