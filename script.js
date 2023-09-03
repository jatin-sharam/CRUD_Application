// document.addEventListener("DOMContentLoaded", () => {
//   const studentsList = JSON.parse(localStorage.getItem("studentsList")) || [];

//   const list = document.querySelector("#student-list");

//   studentsList.forEach((student) => {
//     const row = document.createElement("tr");

//     row.innerHTML = `
//             <td>${student.UserName}</td>
//             <td>${student.MobileNo}</td>
//             <td>${student.Email}</td>
//             <td>${student.State}</td>
//             <td>${student.Pincode}</td>
//             <td>
//                 <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
//                 <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
//             `;

//     list.appendChild(row);
//   });
// });
var selectedRow = null;

//Show alerts
function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;

  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const main = document.querySelector(".main");
  container.insertBefore(div, main);

  setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

//Clear All Fields

function clearFields() {
  document.querySelector("#UserName").value = "";
  document.querySelector("#MobileNo").value = "";
  document.querySelector("#Email").value = "";
  document.querySelector("#State").value = "";
  document.querySelector("#Pincode").value = "";
}

//Add Data

document.querySelector("#student-form").addEventListener("submit", (e) => {
  e.preventDefault();

  //Storing data in local storage
  // var UserName =localStorage.setItem("Username",UserName);
  // var MobileNo =localStorage.setItem("MobileNo", MobileNo);
  // var Email =localStorage.setItem("Email",Email);
  // var State =localStorage.setItem("State",State);
  // var Pincode =localStorage.setItem("Pincode",Pincode);

  //Get Form Values

  const UserName = document.querySelector("#UserName").value;
  const MobileNo = document.querySelector("#MobileNo").value;
  const Email = document.querySelector("#Email").value;
  const State = document.querySelector("#State").value;
  const Pincode = document.querySelector("#Pincode").value;

  //validate
  if (
    UserName == "" ||
    MobileNo == "" ||
    Email == "" ||
    State == "" ||
    Pincode == ""
  ) {
    showAlert("Please fill in all fileds", "danger");
  } else {
    if (selectedRow == null) {

      const student = {
        UserName,
        MobileNo,
        Email,
        State,
        Pincode,
      };
      //             row.innerHTML = `
      //             <td>${UserName}</td>
      //             <td>${MobileNo}</td>
      //             <td>${Email}</td>
      //             <td>${State}</td>
      //             <td>${Pincode}</td>
      //             <td>
      //             <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
      //             <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
      //             `;
      //             list.appendChild(row);
      //             selectedRow = null;
      //             showAlert("Student Added","success");
      //         }
      //         else{
      //             selectedRow.children[0].textContent = UserName;
      //             selectedRow.children[1].textContent = MobileNo;
      //             selectedRow.children[2].textContent = Email;
      //             selectedRow.children[3].textContent = State;
      //             selectedRow.children[4].textContent = Pincode;
      //             selectedRow = null;
      //             showAlert("Student Info Edited", "info");

      //         }
      //         clearFields();
      //     }
      // });
      // Check if there is existing data in local storage
      let studentsList = JSON.parse(localStorage.getItem("studentsList")) || [];

      // Add the new student to the list
      studentsList.push(student);

      // Save the updated list to local storage
      localStorage.setItem("studentsList", JSON.stringify(studentsList));

      // Update the table
      const list = document.querySelector("#student-list");
      const row = document.createElement("tr");

      row.innerHTML = `
    <td>${UserName}</td>
    <td>${MobileNo}</td>
    <td>${Email}</td>
    <td>${State}</td>
    <td>${Pincode}</td>
    <td>
        <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
        <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
    `;
      list.appendChild(row);
      selectedRow = null;
      showAlert("Student Added", "success");
    } else {
      // Update the data in local storage
      const studentsList = JSON.parse(localStorage.getItem("studentsList"));

      const updatedStudent = {
        UserName,
        MobileNo,
        Email,
        State,
        Pincode,
      };

      // Find the index of the selectedRow in the studentsList
      const index = studentsList.findIndex((student) => {
        return (
          student.UserName === selectedRow.children[0].textContent &&
          student.MobileNo === selectedRow.children[1].textContent &&
          student.Email === selectedRow.children[2].textContent &&
          student.State === selectedRow.children[3].textContent &&
          student.Pincode === selectedRow.children[4].textContent
        );
      });

      // Update the student data in the list
      studentsList[index] = updatedStudent;

      // Save the updated list back to local storage
      localStorage.setItem("studentsList", JSON.stringify(studentsList));

      // Update the table
      selectedRow.children[0].textContent = UserName;
      selectedRow.children[1].textContent = MobileNo;
      selectedRow.children[2].textContent = Email;
      selectedRow.children[3].textContent = State;
      selectedRow.children[4].textContent = Pincode;
      selectedRow = null;
      showAlert("Student Info Edited", "info");
    }
    clearFields();
  }
});

//Edit Data

document.querySelector("#student-list").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("edit")) {
    selectedRow = target.parentElement.parentElement;
    document.querySelector("#UserName").value =
      selectedRow.children[0].textContent;
    document.querySelector("#MobileNo").value =
      selectedRow.children[1].textContent;
    document.querySelector("#Email").value =
      selectedRow.children[2].textContent;
    document.querySelector("#State").value =
      selectedRow.children[3].textContent;
    document.querySelector("#Pincode").value =
      selectedRow.children[4].textContent;
  }
});

//Delete Data
document.querySelector("#student-list").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();
    showAlert("Student Data Deleted", "Danger");
  }
});
