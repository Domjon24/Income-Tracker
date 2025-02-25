var selectedRow = null;

function showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3500);
}

//Delete button
document.querySelector("#groceryList").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Student Data Deleted", "danger")
    }
})

//Clear Fields
function clearFields() {
    document.querySelector("#paycheckDate").value = "";
    document.querySelector("#netPay").value = "";
    document.querySelector("#hoursWorked").value = "";
}
//add data
document.querySelector("#grocery-form").addEventListener("submit", (e) =>{
    e.preventDefault();

    const paycheckDate = document.querySelector("#paycheckDate").value;
    const netPay = document.querySelector("#netPay").value;
    const hoursWorked = document.querySelector("#hoursWorked").value;

    if (paycheckDate == "" || netPay == "" || hoursWorked == "") {
        showAlert("Please fill in all fields", "danger")
    }
    else {
        if (selectedRow == null) {
            const list = document.querySelector("#groceryList");
            const row = document.createElement("tr");

            row.innerHTML = `
            <td>${paycheckDate}</td>
            <td>${netPay}</td>
            <td>${hoursWorked}</td>
            <td>
            <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
            <a href="#" class="btn btn-danger btn-sm delete">Delete</a>`;

            list.appendChild(row);
            selectedRow = null;
            showAlert("Item Added", "success");
        }
        else {
            selectedRow.children[0].textContent = paycheckDate;
            selectedRow.children[1].textContent = netPay;
            selectedRow.children[2].textContent = hoursWorked;
            selectedRow = null;
            showAlert("Item Edited", "info")
        }
        clearFields();
    }
})

document.querySelector("#groceryList").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("edit")) {
        selectedRow = target.parentElement.parentElement;

        document.querySelector("#paycheckDate").value = selectedRow.children[0].textContent;
        document.querySelector("#netPay").value = selectedRow.children[1].textContent;
        document.querySelector("#hoursWorked").value = selectedRow.children[2].textContent;
    }
})