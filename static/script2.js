import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const but = document.getElementById("submit");
const sta = document.getElementById("sta");

but.addEventListener('click', (event) => {
    event.preventDefault();
    const Desid = generateUserId();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const desc = document.getElementById('des').value;
    writeUserData(Desid, name, email, desc);
    console.log("submitted...!");
    sta.style.display="block";
    setTimeout(()=>
    {
        sta.style.display="none";
    },2000)
});




// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDOUEIZIu3wL36nOZa-XLzgShv0hQ76qeM",
    authDomain: "contactform-ea43d.firebaseapp.com",
    projectId: "contactform-ea43d",
    storageBucket: "contactform-ea43d.appspot.com",
    messagingSenderId: "670193488048",
    appId: "1:670193488048:web:6bdd71f713a3774caeeb75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

function writeUserData(Desid, name, email, desc) {
    set(ref(database, 'loggers/' + Desid), {
        name: name,
        email: email,
        description: desc
    });
}
function generateUserId() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}
// Example usage
