const input = document.getElementById('pdf-upload');
const output = document.getElementById('pdf-content');
const myForm = document.getElementById('pdfForm');
let fileCount = 0;
let allPDFText = [];

function convertDateFormat (date){  //converts date to yyyy-mm-dd so form can accept it
    let year = date.slice(6, 11) + "-";
    let month = date.slice(0, 2) + "-";
    let day = date.slice(3, 5);
    return year + month + day;
}

function findValues (payStartingIndex, dateStartingIndex, hoursStartingIndex, parsedPDFText){ 
    let values = [];
    let a = payStartingIndex - 8;
    let b = dateStartingIndex + 19;
    let c = dateStartingIndex + 30;
    let d = hoursStartingIndex + 10;
    let e = hoursStartingIndex + 23;
    values.push(Math.round(parsedPDFText.slice(a, payStartingIndex).trim())); //net pay
    values.push(convertDateFormat(parsedPDFText.slice(b, c).trim()));//date
    values.push(Math.round(parsedPDFText.slice(d, e).trim())); //hours
    allPDFText.push(values);
    return values; // finds & formats values, pushes into addPDFText, then returns values for card display
}

function resetInputValues(){
    allPDFText.length = 0;
    document.getElementById('pdf-cards').innerHTML = '';
}

function createCard(fileName, hours, date, pay){
    const cardContainer = document.getElementById('pdf-cards'); 
    // const cardContainer = document.getElementById('myModal');
    const card = document.createElement('div');

    console.log('File name:', fileName);
    card.classList.add("card");
    card.innerHTML = `
        <p class="card-text">
            Net Pay: ${pay}<br>
            Date: ${date}<br>
            Hours Worked: ${hours}</p>
            <div class="card-footer">
            <small class="text-muted">${fileName}</small>

        `;
    cardContainer.appendChild(card);
}

async function parsePDF(){
    input.addEventListener('change', async () => {
        allPDFText.length = 0;//resets selected file if it's changed before submitting to prevent duplicates


        const cardContainer = document.getElementById('pdf-cards');
        cardContainer.innerHTML = '';  // Clears the old cards

        const files = input.files;

        for (let file of files) {  // loops through all input files and parses text

            // previewFileValues(file);
            const fileReader = new FileReader();//new obj constructor
            fileReader.onload = async function() {
                try {

                    const typedArray = new Uint8Array(this.result);
                    const pdf = await pdfjsLib.getDocument(typedArray).promise;
                    // const numPages = pdf.numPages; //keeping this handy for scaling reasons
                    const page = await pdf.getPage(1);
                    let thisText = "";  //each file gets all their text put into here before going into allPDFText Arr
                    const textContent = await page.getTextContent();
                    thisText += textContent.items.map(item => item.str).join(" ").toString();

                    if (thisText.search('GLENLAKE') < 1 || thisText.search('BFTAX') < 1 || thisText.search('Rate Miles') < 1) {
                        showAlert2(`${document.getElementById('pdf-upload').value} is invalid, try again`, "danger");
                        return false; //conditional validates pdf & returns filepath that didn't upload. else, it runs
                    }

                    let thisIndex = thisText.search('Earnings Tax');
                    let dateIndex = thisText.search('XXX');
                    let hours = thisText.search('RS WORKED');

                    let values = findValues(thisIndex, dateIndex, hours, thisText); //needs to be called here to make sure values are populated first
                    let hoursWorked = values[2];
                    let date = values[1];
                    let pay = values[0] 
                    console.log("values" + values)
                    createCard(file.name, hoursWorked, date, pay); // Create a card for each file showing each value
                } catch (error) {
                    showAlert(`${error.message}`, "danger");
                }
            };
            fileReader.readAsArrayBuffer(file);
        } 
    });
}

/*main PDF Function*/     parsePDF()

myForm.addEventListener('submit', e => { //submit button function
    e.preventDefault();
        if (allPDFText.length < 1){ //checks if file has been selected
            showAlert(`Please select a valid file`, "danger")
            return;
        }

        // let fileCount = 0;
        // const files = input.files.length;
        // fileCount += files
        //     console.log(`submit button pressed. Filename is: ${input.value} current file count is ${fileCount}`)
            console.log(`pdf array is ${allPDFText} length is ${allPDFText.length}`)

    for (let i = 0; i < allPDFText.length; i++) {

        let paycheckDate = allPDFText[i][1];
        let netPay = allPDFText[i][0];
        let hoursWorked = allPDFText[i][2];
        console.log("loop index is " + i)

        if (selectedRow == null) {
            const list = document.querySelector("#groceryList");
            const row = document.createElement("tr");
            const yAxisDate = myChart1.data.datasets[0].data;
            row.innerHTML = `
                        <td>${paycheckDate}</td>
                        <td>${netPay}</td>
                        <td>${hoursWorked}</td>
                        <td>
                        <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                        <a href="#" class="btn btn-danger btn-sm delete">Delete</a>`;
            list.appendChild(row);
            selectedRow = null;
            // console.log(yAxisDate);
            updateMyChart();
            showAlert("Item Added", "success");
        }
    }
    resetInputValues();
});


// parsePDF();