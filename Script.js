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

import { getDatabase, ref, get, onValue, set, child, update, remove }
    from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const db = getDatabase();
const DoSang = ref(db, "IOT");

// Hiển thị độ sáng bóng đèn
var sliderNgang = document.getElementById("sliderNgangID");
var bulb01 = document.getElementById("bulb01");
sliderNgang.oninput = function () {
    document.getElementById("sliderNgangValue").innerHTML = sliderNgang.value;
    bulb01.style.opacity = sliderNgang.value / 100;
    update(DoSang, { 'Light': Number(sliderNgang.value) });
};


// // Cập nhật giá trị nhiệt độ
// onValue(DoAm,(snapshot) => {
//     const data = snapshot.val();
//     console.log(data);
//     HumidData = data;
//     document.getElementById("do am").innerHTML = data;
//     //return data
// });


// toggle button

var btnOpen = document.querySelector('.setting-btn')
var modal = document.querySelector('.setting')
var iconClose = document.querySelector('.setting__header i')
var btnClose = document.querySelector('.setting__footer button')

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

const DoAm1 = ref(db, "IOT/Area1/Humid");
const NhietDo1 = ref(db, "IOT/Area1/Temp");

onValue(NhietDo1, (snapshot) => {
    const data = snapshot.val();
    updateChart(0, data, 100)
    //setTimeout(function () { updateChart(data, 20) }, 1);
    document.getElementById("do am").innerHTML = data;
});

onValue(DoAm1, (snapshot) => {
    const data = snapshot.val();
    updateChart(1, data, 100)
    //setTimeout(function () { updateChart(data, 20) }, 1);
    document.getElementById("nhiet do").innerHTML = data;
});


var dps0 = []
var dps1 = []; // dataPoints
var dpsNumber = [dps0, dps1]

const ElementChart0 = {
    axisX: {
        labelFormatter: function (e) {
            return CanvasJS.formatDate(e.value, "hh:mm TT");
        }
    },

    axisY: {
        includeZero: false,
        minimum: 0,
        maximum: 50
    },
    title: {
        text: "Biểu đồ Nhiệt độ"
    },
    data: [{
        type: "line",
        dataPoints: dps0,
        xValueType: "dateTime",
        xValueFormatString: " hh:mm:ss TT",
        lineDashType: "solid",
        markerType: "triangle",
    }],
}

const ElementChart1 = {
    axisX: {
        labelFormatter: function (e) {
            return CanvasJS.formatDate(e.value, "hh:mm TT");
        }
    },

    axisY: {
        includeZero: false,
        minimum: 0,
        maximum: 100
    },

    title: {
        text: "Biểu đồ Độ ẩm"
    },
    data: [{
        type: "line",
        dataPoints: dps1,
        xValueType: "dateTime",
        xValueFormatString: " hh:mm:ss TT",
        lineDashType: "solid",
    }],
}


var chart1 = new CanvasJS.Chart("chartHumid1", ElementChart0);
var chart2 = new CanvasJS.Chart("chartTemp1", ElementChart1);

var charNumber = [chart1, chart2]

var xVal = 0;
var yVal = 0;
var updateInterval = 1000;
var dataLength = 20; // number of dataPoints visible at any point

var updateChart = function (index, valueindex, count) {
    count = count || 1;
    var time = new Date;

    time.getHours();
    time.getMinutes();
    time.getSeconds();
    time.setTime(time.getTime() + updateInterval);

    yVal = valueindex
    //console.log(valuehumid)

    //console.log(ElementChart.data[2].dataPoints) 
    //= "shortDot";
    //ElementChart.update();

    // if (index == 0) {
    //     dps0.push({
    //         x: time.getTime(),
    //         y: yVal
    //     });
    // }
    // else if (index == 1) {
    //     dps1.push({
    //         x: time.getTime(),
    //         y: yVal
    //     });
    // }
    dpsNumber[index].push({
        x: time.getTime(),
        y: yVal
    });

    if (dpsNumber[index].length > dataLength) {
        console.log(dpsNumber[index])
        dpsNumber[index].shift();
    }

    charNumber[index].render();
    // if (index == 0) {
    //     chart1.render();
    // }
    // else if (index == 1) {
    //     chart2.render();
    // }
    // else if (index == 2) {
    //     chart3.render();
    // }
    // else if (index == 3) {
    //     chart4.render();
    // }
};