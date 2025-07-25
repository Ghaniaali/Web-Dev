document
  .getElementById("registrationform").addEventListener("submit", function (event) {
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

    console.log("JSON Data:", JSON.stringify(userData, null, 2));
  });
