const input = document.getElementById('pdf-upload');
const output = document.getElementById('pdf-content');
const myForm = document.getElementById('pdfForm');
let fileCount = 0;
let allPDFText = [];


function convertDateFormat (date){ //yyyy-mm-dd
    let year = date.slice(6,11) + "-";
    let month = date.slice(0,2) + "-";
    let day = date.slice(3,5);
    return year + month + day;
}

function findValues (payStartingIndex, dateStartingIndex, hoursStartingIndex, parsedPDFText){ //finds values, formats & pushes into sub-array within allPDFText arr
        let values = [];
        let a = payStartingIndex-8;
        let b = dateStartingIndex + 19;
        let c = dateStartingIndex + 30;
        let d = hoursStartingIndex + 10
        let e = hoursStartingIndex + 23
        values.push(Math.round(parsedPDFText.slice(a, payStartingIndex).trim())); //net pay
        values.push(convertDateFormat(parsedPDFText.slice(b, c).trim()));//date
        values.push(Math.round(parsedPDFText.slice(d, e).trim())); //hours
        allPDFText.push(values)
            //finds all 3 values, puts in correct format & pushes into addPDFText array
}


async function parsePDF(){
    input.addEventListener('change', async () => {
        const files = input.files;

        for (let file of files){ // loops through all input files and parses text
            // if (file) { //idk why this is in here
                const fileReader = new FileReader(); //new obj constructor

                fileReader.onload = async function() {
                    try {
                        const typedArray = new Uint8Array(this.result);
                        const pdf = await pdfjsLib.getDocument(typedArray).promise;
                        // const numPages = pdf.numPages; //keeping this handy for scaling reasons
                        const page = await pdf.getPage(1);
                        let thisText = "";  //each file gets all their text put into here before going into allPDFText Arrconst page = await pdf.getPage(1);
                        const textContent = await page.getTextContent();
                        
                        thisText += textContent.items.map(item => item.str).join(" ").toString();

                            if (thisText.search('GLENLAKE') < 1 || thisText.search('BFTAX') < 1 || thisText.search('Rate Miles') < 1) {
                                showAlert2(`${document.getElementById('pdf-upload').value} is invalid, try again`, "danger")
                                return false;  //conditional validates pdf & returns filepath that didn't upload. else, it runs
                            }
                               
                                    thisIndex = thisText.search('Earnings Tax');
                                    dateIndex = thisText.search('XXX');
                                    hours = thisText.search('RS WORKED');

                                    findValues(thisIndex, dateIndex, hours, thisText)
                                
                                    // output.textContent = allPDFText.join(''); //displays all pdftext on page
                                    console.log(allPDFText)
                                
                    } catch (error) {
                        showAlert(`${error.message}`, "danger")
                        output.textContent = "Error parsing PDF: " + error.message;
                    }
                };
                fileReader.readAsArrayBuffer(file);   
            //goes with file conditional }
        }                   
    })
}

/*Calling main PDF Function*/     parsePDF()

myForm.addEventListener('submit', async e => { //submit button function
    e.preventDefault();
        if (allPDFText.length < 1){ //checks if file has been selected
            showAlert(`Please select a valid file`, "danger")
            return;
        }
        
        let fileCount = 0;
        const files = input.files.length;
        fileCount += files
            console.log(`submit button pressed. Filename is: ${input.value} current file count is ${fileCount}`)
            console.log("pdf array is " + allPDFText)
            // for (let i = 0; i <= allPDFText.length; i++) {
                const paycheckDate = allPDFText[0][1];
                const netPay = allPDFText[0][0];
                const hoursWorked = allPDFText[0][2];

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
                        updateMyChart()
                        showAlert("Item Added", "success");   
                    }
            // }
})
    

