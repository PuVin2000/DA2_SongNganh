
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
const DoSang = ref(db, "IOT/Area1");
const CapNhatGiatriArea1 = ref(db, "IOT/Area1/Update");
const CapNhatGiatriArea2 = ref(db, "IOT/Area2/Update");

const DoAm1 = ref(db, "IOT/Area1/Getting/Humid");
const NhietDo1 = ref(db, "IOT/Area1/Getting/Temp");

const DoAm2 = ref(db, "IOT/Area2/Getting/Humid");
const NhietDo2 = ref(db, "IOT/Area1/Getting/Temp");


onValue(DoAm1, (snapshot) => {
    const data = snapshot.val();
    updateChart(1, data, 100)
    //setTimeout(function () { updateChart(data, 20) }, 1);
    document.getElementById("do am khu vuc 1").innerHTML = data;
});

onValue(NhietDo1, (snapshot) => {
    const data = snapshot.val();
    updateChart(0, data, 100)
    //setTimeout(function () { updateChart(data, 20) }, 1);
    document.getElementById("nhiet do khu vuc 1").innerHTML = data;
});

onValue(DoAm1, (snapshot) => {
    const data = snapshot.val();
    updateChart(3, data, 100)
    //setTimeout(function () { updateChart(data, 20) }, 1);
    document.getElementById("do am khu vuc 2").innerHTML = data;
});

onValue(NhietDo1, (snapshot) => {
    const data = snapshot.val();
    updateChart(2, data, 100)
    //setTimeout(function () { updateChart(data, 20) }, 1);
    document.getElementById("nhiet do khu vuc 2").innerHTML = data;
});

var sliderNgang = document.getElementById("sliderNgangID");
var bulb01 = document.getElementById("bulb01");
sliderNgang.oninput = function () {
    document.getElementById("sliderNgangValue").innerHTML = sliderNgang.value;
    bulb01.style.opacity = sliderNgang.value / 100;
    update(DoSang, { 'Light': Number(sliderNgang.value) });
};

function SettingTemp(IDValue, PathFireBase) {
    var SettingValue = document.getElementById(IDValue);
    //String(SettingFirebase);
    SettingValue.oninput = function () {
        update(PathFireBase, { 'Temp': Number(SettingValue.value) });
    }
}

SettingTemp("UpdateTempArea1", CapNhatGiatriArea1)
SettingTemp("UpdateTempArea2", CapNhatGiatriArea2)

function SettingHumid(IDValue, PathFireBase) {
    var SettingValue = document.getElementById(IDValue);
    //String(SettingFirebase);
    SettingValue.oninput = function () {
        update(PathFireBase, { 'Humid': Number(SettingValue.value) });
    }
}

SettingHumid("UpdateHumidArea1", CapNhatGiatriArea1)
SettingHumid("UpdateHumidArea2", CapNhatGiatriArea2)
// Setting("UpdateTempArea1",CapNhatGiatriArea1,'Temp');
// Setting("UpdateHumidArea1",CapNhatGiatriArea1,'Humid');
// Setting("UpdateTempArea2",CapNhatGiatriArea2,'Temp');
// Setting("UpdateHumidArea2",CapNhatGiatriArea2,'Humid');

var dpsTempArea1 = []
var dpsHumidArea1 = []; // dataPoints
var dpsTempArea2 = [];
var dpsHumidArea2 = [];
var dpsNumber = [dpsTempArea1, dpsHumidArea1, dpsTempArea2, dpsHumidArea2]

const ElementChartTempArea1 = {
    axisX: {
        labelFormatter: function (e) {
            return CanvasJS.formatDate(e.value, "hh:mm TT");
        }
    },

    axisY: {
        minimum: 0,
        maximum: 50
    },
    title: {
        text: "Nhiet do"
    },
    data: [{
        type: "line",
        dataPoints: dpsTempArea1,
        xValueType: "dateTime",
        xValueFormatString: " hh:mm:ss TT",
        lineDashType: "solid",
    }],
}

const ElementChartHumidArea1 = {
    axisX: {
        labelFormatter: function (e) {
            return CanvasJS.formatDate(e.value, "hh:mm TT");
        }
    },

    axisY: {
        minimum: 40,
        maximum: 90
    },
    title: {
        text: "Do am"
    },
    data: [{
        type: "line",
        dataPoints: dpsHumidArea1,
        xValueType: "dateTime",
        xValueFormatString: " hh:mm:ss TT",
        lineDashType: "solid",
    }],
}

const ElementChartTempArea2 = {
    axisX: {
        labelFormatter: function (e) {
            return CanvasJS.formatDate(e.value, "hh:mm TT");
        }
    },
    axisY: {
        minimum: 0,
        maximum: 50
    },
    title: {
        text: "Nhiet do"
    },
    data: [{
        type: "line",
        dataPoints: dpsTempArea2,
        xValueType: "dateTime",
        xValueFormatString: " hh:mm:ss TT",
        lineDashType: "solid",
    }],
}

const ElementChartHumidArea2 = {
    axisX: {
        labelFormatter: function (e) {
            return CanvasJS.formatDate(e.value, "hh:mm TT");
        }
    },

    axisY: {
        minimum: 40,
        maximum: 90
    },

    title: {
        text: "Do am"
    },
    data: [{
        type: "line",
        dataPoints: dpsHumidArea2,
        xValueType: "dateTime",
        xValueFormatString: " hh:mm:ss TT",
        lineDashType: "solid",
    }],
}


var chartTempArea1 = new CanvasJS.Chart("chartTemp1", ElementChartTempArea1);
var chartHumidArea1 = new CanvasJS.Chart("chartHumid1", ElementChartHumidArea1);

var chartTempArea2 = new CanvasJS.Chart("chartTemp2", ElementChartTempArea2);
var chartHumidArea2 = new CanvasJS.Chart("chartHumid2", ElementChartHumidArea2);

var charNumber = [chartTempArea1, chartHumidArea1, chartTempArea2, chartHumidArea2]

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

    dpsNumber[index].push({
        x: time.getTime(),
        y: yVal
    });

    if (dpsNumber[index].length > dataLength) {
        console.log(dpsNumber[index])
        dpsNumber[index].shift();
    }

    charNumber[index].render();
};


const tabs = document.querySelectorAll('.tab-btn')
const all_content = document.querySelectorAll('.content')

tabs.forEach((tab, index) => {
    tab.addEventListener('click', (e) => {
        tabs.forEach(tab => { tab.classList.remove('active') })
        tab.classList.add('active');

        var line = document.querySelector('.line');
        line.style.width = e.target.offsetWidth + "px";
        line.style.left = e.target.offsetLeft + "px";

        all_content.forEach(content => { content.classList.remove('active') })
        all_content[index].classList.add('active')
    })
})

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




