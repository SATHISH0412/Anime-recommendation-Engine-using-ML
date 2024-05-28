import {
  connectDB,
  ref,
  get,
  child,
} from "../firebaseConnection/firebaseDBconn.js";

document.addEventListener("DOMContentLoaded", function () {
  var profileTable = document.getElementById("profileTable");
  var profileIcon = document.getElementById("profileIcon");
  document.getElementById("Loading").innerHTML = "Fetching Data....";

  // Function to populate the profile table
  function populateProfileTable(userData) {
    document.getElementById("Loading").innerHTML = "";

    for (var key in userData) {
      if (
        userData.hasOwnProperty(key) &&
        key !== "uid" &&
        key !== "UserLoggedIn" &&
        key !== "emailVerified"
      ) {
        var row = profileTable.insertRow();
        var attributeCell = row.insertCell(0);
        var valueCell = row.insertCell(1);
        var value =
          key === "password" ? `*****${userData[key].slice(4)}` : userData[key];

        attributeCell.textContent = key;
        valueCell.textContent = value;
      }
    }
  }

  // Fetch user data from Firebase
  const uid = sessionStorage.getItem("userid<@#(1029384756)#@>");
  if (uid) {
    get(child(ref(connectDB), "users/" + uid))
      .then((snapshot) => {
        let userData = snapshot.val();
        console.log(userData);
        populateProfileTable(userData);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  } else {
    location.replace("error.html");
    console.error("User ID not found in session storage.");
  }
});
