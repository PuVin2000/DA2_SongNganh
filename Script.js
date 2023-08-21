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

import {getDatabase, ref, get, onValue, set, child, update, remove} 
from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const db = getDatabase();
const DoSang = ref(db, "IOT");
const NhietDo = ref(db, "IOT/Temp");

// Hiển thị độ sáng bóng đèn
var sliderNgang = document.getElementById("sliderNgangID");
var bulb01 = document.getElementById("bulb01");
sliderNgang.oninput = function(){
    document.getElementById("sliderNgangValue").innerHTML = sliderNgang.value;
    bulb01.style.opacity = sliderNgang.value/100;
    update(DoSang, {'Light': Number(sliderNgang.value)});
};

// Cập nhật giá trị nhiệt độ
onValue(NhietDo, (snapshot) => {
    const data = snapshot.val();
    document.getElementById("nhiet do").innerHTML = data;
});

