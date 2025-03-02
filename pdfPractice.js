const input = document.getElementById('pdf-upload');
const output = document.getElementById('pdf-content');
const myForm = document.getElementById('pdfForm');
let fileCount = 0;
let allPDFText = [];

function findValues (payStartingIndex, dateStartingIndex, hoursStartingIndex, parsedPDFText){ //finds values & pushes into sub-array within allPDFText arr
        let values = [];
        let a = payStartingIndex-8;
        let b = dateStartingIndex + 19;
        let c = dateStartingIndex + 30;
        let d = hoursStartingIndex + 10
        let e = hoursStartingIndex + 23
        values.push(parsedPDFText.slice(a, payStartingIndex).trim());
        values.push(parsedPDFText.slice(b, c).trim());
        values.push(parsedPDFText.slice(d, e).trim());
        allPDFText.push(values)
            //finds pay, hours & date values. removes whitespace & pushes into addPDFText array
}


async function parsePDF(){
    input.addEventListener('change', async () => {
        const files = input.files;

        for (let file of files){
            if (file) {
                const fileReader = new FileReader();

                fileReader.onload = async function() {
                    try {
                        const typedArray = new Uint8Array(this.result);
                        const pdf = await pdfjsLib.getDocument(typedArray).promise;
                        const numPages = pdf.numPages;
                        console.log("length is: " + numPages)
                        
                        let thisText = "";  //each file gets all their text put into here before going into allPDFText Arr
                            
                        for (let i = 1; i <= numPages; i++) {
                            
                            const page = await pdf.getPage(i);
                            const textContent = await page.getTextContent();
                            thisText += textContent.items.map(item => item.str).join(" ").toString();

                            if (thisText.search('GLENLAKE') < 1 || thisText.search('BFTAX') < 1 || thisText.search('Rate Miles') < 1) {
                                showAlert2(`${document.getElementById('pdf-upload').value} is invalid, try again`, "danger")
                                return false;  //conditional validates pdf & returns filepath that didn't upload. else, it runs
                            }
                                else{
                                    thisIndex = thisText.search('Earnings Tax');
                                    dateIndex = thisText.search('XXX');
                                    hours = thisText.search('RS WORKED');

                                    findValues(thisIndex, dateIndex, hours, thisText)
                                
                                    // output.textContent = allPDFText.join(''); //displays all pdftext on page
                                    console.log(allPDFText)
                                }
                        }
                    } catch (error) {
                        showAlert(`${error.message}`, "danger")
                        output.textContent = "Error parsing PDF: " + error.message;
                    }
                };
                fileReader.readAsArrayBuffer(file);   
            }
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
    

