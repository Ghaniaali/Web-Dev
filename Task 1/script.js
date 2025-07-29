const arr = [];
let editIndex = -1;


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

    const jsonoutput = document.getElementById("jsonoutput");
    jsonoutput.textContent = JSON.stringify(userData, null, 2);
    document.getElementById("registrationform").reset();

    document.getElementById("info").click();

  });


  document.getElementById("info").addEventListener( "click" , function() {
    const tableContainer = document.getElementById("userContainer");

    let HTMLtable = '<table class="table table-bordered table-striped">';
    HTMLtable += ' <thead class= "table-black"> <tr> <th>Name</th> <th>Email</th> <th>DOB</th> <th>Age</th> <th>Gender</th> <th>CNIC</th> </tr> </thead> '
    HTMLtable += '<tbody>';

    arr.forEach((userData, index) => {
       HTMLtable += ` <tr> <td>${userData.name}</td> <td>${userData.email}</td> <td>${userData.dob}</td> <td>${userData.age}</td> <td>${userData.gender}</td> <td>${userData.cnic}</td> <td> <button class="btn btn-sm btn-warning" onclick="editUser(${index})"> Edit </button>  <button class="btn btn-sm btn-danger" onclick="deleteUser(${index})"> Delete </button> </td> </tr> `;
    });


     HTMLtable += '</tbody> </table>';
     tableContainer.innerHTML = HTMLtable;
     tableContainer.style.display = "block"; 
     
  });

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
        document.getElementById("info").click(); 
    }

    if (arr.length === 0) {
    document.getElementById("userContainer").style.display = "none";
}
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
        if ((event.key >= 'a' && event.key <= 'z') || (event.key >= 'A' && event.key <= 'Z')){
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
