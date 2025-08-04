
let editIndex = -1;
let currentPage = 1;
const usersPerPage = 5;
let sortDirection = {};
let savedUsers = localStorage.getItem("users");
let arr = savedUsers ? JSON.parse(savedUsers) : [];

document.getElementById("registrationform").addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("fname").value + " " + document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let dob = document.getElementById("bdate").value;
    let age = parseInt(document.getElementById("age").value);
    let cnic = document.getElementById("cnic").value;
    let gender = document.querySelector('input[name="gender"]:checked').value;

    let userData = {
      name: name,
      email: email,
      dob: dob,
      age: age,
      gender: gender,
      cnic: cnic,
    };

     if (editIndex === -1) {
         arr.push(userData); 
       } else {
         arr[editIndex] = userData; 
         editIndex = -1;
       }

    localStorage.setItem("users", JSON.stringify(arr));
    const jsonoutput = document.getElementById("jsonoutput");
    jsonoutput.textContent = JSON.stringify(userData, null, 2);
    document.getElementById("registrationform").reset();
    currentPage = Math.ceil(arr.length / usersPerPage);    
    Displaytable(); 
  });

  document.getElementById("info").addEventListener("click", function () {
     currentPage = 1;    
      Displaytable();
    });

function Displaytable() {
  const tableWrapper = document.getElementById("userContainer");
  const tableContainer = document.getElementById("tableContent");
  const paginationContainer = document.getElementById("pagination");
  tableWrapper.style.display = "block";

  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = arr.slice(startIndex, endIndex);

  let HTMLtable = `<table id="myTable" class="table table-bordered table-striped align-middle text-center">
    <thead class="table-dark">
      <tr>
        <th class="sort" onclick="sortTable(0)">Name</th>
        <th class="sort" onclick="sortTable(1)">Email</th>
        <th class="sort" onclick="sortTable(2)">CNIC</th>
        <th class="sort" onclick="sortTable(3)">DOB</th>
        <th class="sort" onclick="sortTable(4)">Age</th>
        <th class="sort" onclick="sortTable(5)">Gender</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>`;

  currentUsers.forEach((userData, index) => {
    let realIndex = startIndex + index;
    HTMLtable += `<tr>
      <td>${userData.name}</td>
      <td>${userData.email}</td>
      <td>${userData.cnic}</td>
      <td>${userData.dob}</td>
      <td>${userData.age}</td>
      <td>${userData.gender}</td>
      <td>
        <button class="btn btn-sm btn-warning" onclick="editUser(${realIndex})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteUser(${realIndex})">Delete</button>
      </td>
    </tr>`;
  });

  HTMLtable += '</tbody></table>';
  tableContainer.innerHTML = HTMLtable;

  generatePagination();
}

function generatePagination() {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(arr.length / usersPerPage);

  if (totalPages <= 1) return;

  let buttonsHTML = "";

  buttonsHTML += `<button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>`;

  for (let i = 1; i <= totalPages; i++) {
    buttonsHTML += `<button onclick="changePage(${i})" ${i === currentPage ? 'disabled' : ''}>${i}</button>`;
  }

  buttonsHTML += `<button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>`;

  paginationContainer.innerHTML = buttonsHTML;
}

window.changePage = function (page) {
  const totalPages = Math.ceil(arr.length / usersPerPage);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  Displaytable();
};

 window.editUser = function(index) {
    const user = arr[index];
    const nameParts = user.name.split(" ");
    document.getElementById("fname").value = nameParts[0];
    document.getElementById("lname").value = nameParts.slice(1).join(" ");
    document.getElementById("email").value = user.email;
    document.getElementById("bdate").value = user.dob;
    document.getElementById("age").value = user.age;
    document.getElementById("cnic").value = user.cnic;
    document.querySelector(`input[name="gender"][value="${user.gender}"]`).checked = true;

    editIndex = index;
};

window.deleteUser = function(index) {
    if (confirm("Are you sure you want to delete this user?")) {
        arr.splice(index, 1); 
        localStorage.setItem("users", JSON.stringify(arr));

        const totalPages = Math.ceil(arr.length / usersPerPage);
        if (currentPage > totalPages) {
            currentPage = totalPages;
        }
        if (arr.length === 0) {
            document.getElementById("userContainer").style.display = "none";
        } else {
            Displaytable();
        }
    }
};

function SearchTable() {
      const input = document.getElementById("myInput").value.toUpperCase();
      const table = document.getElementById("myTable");
      const tr = table.getElementsByTagName("tr");

      for (let i = 1; i < tr.length; i++) {
        const name = tr[i].getElementsByTagName("td")[0]?.textContent.toUpperCase() || "";
        const email = tr[i].getElementsByTagName("td")[1]?.textContent.toUpperCase() || "";
        const cnic = tr[i].getElementsByTagName("td")[2]?.textContent.toUpperCase() || "";

        if (name.includes(input) || email.includes(input) || cnic.includes(input)) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }

  window.sortTable = function (columnIndex) {
  const keyMap = ["name", "email", "cnic", "dob", "age", "gender"];
  const key = keyMap[columnIndex];

  const dir = sortDirection[columnIndex] === "asc" ? "desc" : "asc";
  sortDirection[columnIndex] = dir;

  arr.sort((a, b) => {
    let valA = a[key];
    let valB = b[key];

    if (typeof valA === "string") valA = valA.toLowerCase();
    if (typeof valB === "string") valB = valB.toLowerCase();

    if (dir === "asc") return valA > valB ? 1 : valA < valB ? -1 : 0;
    else return valA < valB ? 1 : valA > valB ? -1 : 0;
  });

  localStorage.setItem("users", JSON.stringify(arr)); 
  Displaytable(); 
};

   function clearform(){
        document.getElementById("registrationform").reset();
    }

   const today = new Date().toISOString().split("T")[0];
   document.getElementById("bdate").max = today;

   document.getElementById("fname").addEventListener('keydown', function(event) {
        if (event.key >= '0' && event.key <= '9') {
            event.preventDefault();
        }
    });

   document.getElementById("lname").addEventListener('keydown', function(event) {
        if (event.key >= '0' && event.key <= '9') {
            event.preventDefault();
        }
    });

   document.getElementById("cnic").addEventListener('keydown', function(event) {
  if ((event.key >= '0' && event.key <= '9') || 
    event.key === 'Backspace' || 
    event.key === 'ArrowLeft' || 
    event.key === 'ArrowRight' ||
    event.key === 'Delete' ||
    event.key === 'Tab'
  ) {
  } else {
    event.preventDefault(); 
  }
});

   function ValidateEmail() {
      let email = document.forms["myform"]["emailadd"].value;
      let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (pattern.test(email)) {
        return true;
      } else {
        alert("You have entered an invalid email address");
        return false;
      }
    }
