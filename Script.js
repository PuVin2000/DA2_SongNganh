
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
const DoSang = ref(db, "IOT/Update");

// CheckLoraConncet
const CheckLoraConnect = ref(db, "IOT/Area1/LoRa")

onValue(CheckLoraConnect, (snapshot) => {
    const data = snapshot.val();
    console.log(data)
    if (data == 0) {
        alert("Lora Node 1 Disconnect")
    }
});

// Get Temp & Humid and Draw Chart



const DoAm1 = ref(db, "IOT/Area1/Getting/Humid");
const NhietDo1 = ref(db, "IOT/Area1/Getting/Temp");

const DoAm2 = ref(db, "IOT/Area2/Getting/Humid");
const NhietDo2 = ref(db, "IOT/Area2/Getting/Temp");


//Chart
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


function Vui2() {
    get(DoAm1).then((snapshot) => {
        updateChart(1, snapshot.val(), 100)
        document.getElementById("do am khu vuc 1").innerHTML = snapshot.val();
    })

    get(NhietDo1).then((snapshot) => {
        updateChart(0, snapshot.val(), 100)
        document.getElementById("nhiet do khu vuc 1").innerHTML = snapshot.val();
    })


    get(DoAm2).then((snapshot) => {
        updateChart(3, snapshot.val(), 100)
        document.getElementById("do am khu vuc 2").innerHTML = snapshot.val();
    })


    get(NhietDo2).then((snapshot) => {
        updateChart(2, snapshot.val(), 100)
        document.getElementById("nhiet do khu vuc 2").innerHTML = snapshot.val();
    })
}

Vui2()
setInterval(Vui2, 5000)





// Thu Hoach

const ThuHoachCay = ref(db, "IOT/Update");
function ThuHoach() {
    const day = new Date()
    if (day.getHours() == 0) {
        update(ThuHoachCay, { 'ThuHoach': Boolean(true) })
    }
    else {
        update(ThuHoachCay, { 'ThuHoach': Boolean(false) })
    }
}

ThuHoach();

// Setting Temp & Humid
const CapNhatGiatriArea1 = ref(db, "IOT/Update");
const CapNhatGiatriArea2 = ref(db, "IOT/Update");

function SettingTemp(IDValue, PathFireBase) {
    var SettingValue = document.getElementById(IDValue);
    //String(SettingFirebase);
    // const BTNSettingOK = document.getElementById("BtnSettingOk");
    // BTNSettingOK.addEventListener("click", function () {
        if (IDValue == "UpdateTempArea1") {
            SettingValue.oninput = function () {
                update(PathFireBase, { 'TempArea1': Number(SettingValue.value) });
            }
        }
        else if (IDValue == "UpdateTempArea2") {
            SettingValue.oninput = function () {
                update(PathFireBase, { 'TempArea2': Number(SettingValue.value) });
            }
        }
    //});
}


function SettingHumid(IDValue, PathFireBase) {
    var SettingValue = document.getElementById(IDValue);
    //String(SettingFirebase);
        if (IDValue == "UpdateHumidArea1") {
            SettingValue.oninput = function () {
                update(PathFireBase, { 'HumidArea1': Number(SettingValue.value) });
            }
        }
        else if (IDValue == "UpdateHumidArea2") {
            SettingValue.oninput = function () {
                update(PathFireBase, { 'HumidArea2': Number(SettingValue.value) });
            }
        }
}


SettingTemp("UpdateTempArea1", CapNhatGiatriArea1)
SettingTemp("UpdateTempArea2", CapNhatGiatriArea2)
SettingHumid("UpdateHumidArea1", CapNhatGiatriArea1)
SettingHumid("UpdateHumidArea2", CapNhatGiatriArea2)
// alert("adfsdaf")



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
// modal.addEventListener('click', function (e) {
//     if (e.target == e.currentTarget) {
//         toggleModal();
//     }
// })


// ON OFF Devices
const buttonON = ['KHUVUC1_MAYBOM_ON',
    'KHUVUC1_LUOICHANNANG_OPEN',

    'KHUVUC1_QUATTHONGGIO1_ON', 'KHUVUC1_QUATTHONGGIO2_ON', 'KHUVUC1_QUATTHONGGIO3_ON',
    'KHUVUC1_QUATTHONGGIO4_ON', 'KHUVUC1_QUATTHONGGIO5_ON', 'KHUVUC1_QUATTHONGGIO6_ON',

    'KHUVUC2_MAYBOM_ON',
    'KHUVUC2_LUOICHANNANG_OPEN',

    'KHUVUC2_QUATTHONGGIO1_ON', 'KHUVUC2_QUATTHONGGIO2_ON', 'KHUVUC2_QUATTHONGGIO3_ON',
    'KHUVUC2_QUATTHONGGIO4_ON', 'KHUVUC2_QUATTHONGGIO5_ON', 'KHUVUC2_QUATTHONGGIO6_ON'
];

const buttonOFF = ['KHUVUC1_MAYBOM_OFF',
    'KHUVUC1_LUOICHANNANG_CLOSE',

    'KHUVUC1_QUATTHONGGIO1_OFF', 'KHUVUC1_QUATTHONGGIO2_OFF', 'KHUVUC1_QUATTHONGGIO3_OFF',
    'KHUVUC1_QUATTHONGGIO4_OFF', 'KHUVUC1_QUATTHONGGIO5_OFF', 'KHUVUC1_QUATTHONGGIO6_OFF',

    'KHUVUC2_MAYBOM_OFF',
    'KHUVUC2_LUOICHANNANG_CLOSE',

    'KHUVUC2_QUATTHONGGIO1_OFF', 'KHUVUC2_QUATTHONGGIO2_OFF', 'KHUVUC2_QUATTHONGGIO3_OFF',
    'KHUVUC2_QUATTHONGGIO4_OFF', 'KHUVUC2_QUATTHONGGIO5_OFF', 'KHUVUC2_QUATTHONGGIO6_OFF'
];

const buttonAUTO = ['KHUVUC1_MAYBOM_AUTO', 'KHUVUC1_LUOICHANNANG_AUTO',
    'KHUVUC2_MAYBOM_AUTO', 'KHUVUC2_LUOICHANNANG_AUTO'];

const DieuKhienKhuVuc1 = ref(db, "IOT/Update");
const DieuKhienKhuVuc2 = ref(db, "IOT/Update");

const IDImageOnOFF = document.querySelectorAll('.ImageButtonOnOff')
const IDButtonOnOFF = document.querySelectorAll('.BUTTON_ON_OFF')
const IDButtonAUTO = document.querySelectorAll('.BUTTON_AUTO')

let statusButtonOnOff = [false, false, false, false, false, false, false
    , false, false, false, false, false, false, false];

let statusButtonAUTO = [false, false, false, false];

console.log(IDButtonAUTO)

IDButtonOnOFF.forEach(function (button, Index) {
    button.addEventListener('click', function () {
        IDImageOnOFF[Index].src = statusButtonOnOff[Index] ? 'picture/RedButton.png' : 'picture/GreenButton.png'
        if (Index > 7) {
            if (Index == 8 || Index == 9) {
                IDButtonAUTO[Index - 6].style.background = null;
            }

            if (statusButtonOnOff[Index] == false) {
                update(DieuKhienKhuVuc2, { 'DieuKhienKhuVuc2': String(buttonON[Index]) });
            }
            else {
                update(DieuKhienKhuVuc2, { 'DieuKhienKhuVuc2': String(buttonOFF[Index]) });
            }
        }

        else if (Index <= 7) {
            if (Index == 0 || Index == 1) {
                IDButtonAUTO[Index].style.background = null;
            }
            if (statusButtonOnOff[Index] == false) {
                update(DieuKhienKhuVuc1, { 'DieuKhienKhuVuc1': String(buttonON[Index]) });
            }
            else {
                update(DieuKhienKhuVuc1, { 'DieuKhienKhuVuc1': String(buttonOFF[Index]) });
            }
        }
        statusButtonOnOff[Index] = !statusButtonOnOff[Index]
    })
})

IDButtonAUTO.forEach(function (button, Index) {
    IDButtonAUTO[Index].addEventListener('click', function () {
        IDButtonAUTO[Index].style.background = "#DFDF30"
        if (Index > 1) {
            update(DieuKhienKhuVuc2, { 'DieuKhienKhuVuc2': String(buttonAUTO[Index]) });
        }
        else if (Index <= 1) {
            update(DieuKhienKhuVuc2, { 'DieuKhienKhuVuc1': String(buttonAUTO[Index]) });
        }
    })
})

const SunNet1 = ref(db, "/IOT/Area1/Getting/SunNet");


const StatusSunNetArea = ['Lưới che nắng đang quá tải(SunNet is Overload)', 'Lưới che nắng đang dừng(SunNet is Stopping)',
    'Lưới che nắng đang đóng(SunNet is Closing)', 'Lưới che nắng đã đóng(SunNet is Closed)',
    'Lưới che nắng đang mở(SunNet is Opening)', 'Lưới che nắng đã mở(SunNet is Opened)'];
onValue(SunNet1, (snapshot) => {
    const data = snapshot.val();
    document.getElementById("SunNetArea1").innerHTML = StatusSunNetArea[data];
});

