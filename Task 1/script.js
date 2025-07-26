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

    const jsonoutput = document.getElementById("jsonoutput");
    jsonoutput.textContent = JSON.stringify(userData, null, 2);
    document.getElementById("registrationform").reset();

  });

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

  
