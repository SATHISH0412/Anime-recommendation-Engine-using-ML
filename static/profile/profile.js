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

  // Function to create a table row with user data
  function createTableRow(table, key, value) {
    const row = table.insertRow();
    const attributeCell = row.insertCell(0);
    const valueCell = row.insertCell(1);

    attributeCell.textContent = key;
    valueCell.textContent =
      key === "password" ? `*****${value.slice(4)}` : value;
  }

  // Function to populate the profile table
  function populateProfileTable(userData) {
    const loadingElement = document.getElementById("Loading");
    loadingElement.innerHTML = "";

    for (let key in userData) {
      if (userData.hasOwnProperty(key)) {
        if (
          key !== "uid" &&
          key !== "UserLoggedIn" &&
          key !== "emailVerified" &&
          key !== "wishlist"
        ) {
          createTableRow(profileTable, key, userData[key]);
        }

        if (key === "wishlist") {
          populateWishlist(userData[key]);
        } else {
          document.getElementById("wishlist-list").innerHTML = "";
        }
      }
    }
  }

  // Function to populate the wishlist
  function populateWishlist(wishlist) {
    const wishlistContainer = document.getElementById("wishlist-list");
    wishlistContainer.innerHTML = ""; // Clear any existing items

    for (let item in wishlist) {
      if (wishlist.hasOwnProperty(item)) {
        const wishlistItem = document.createElement("div");
        wishlistItem.classList.add("wishlist-item");
        wishlistItem.innerHTML = `
        <img src="${wishlist[item].imageURL}" alt="${wishlist[item].animeName}">
        <h3>${wishlist[item].animeName}</h3>
      `;
        wishlistContainer.appendChild(wishlistItem);
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
