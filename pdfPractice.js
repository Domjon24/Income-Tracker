const input = document.getElementById('pdf-upload');
const output = document.getElementById('pdf-content');
const myForm = document.getElementById('pdfForm');
let fileCount = 0;
let allPDFText = [];
let fileName = [];


function convertDateFormat (date){ //converts date to yyyy-mm-dd so form can accept it
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
            //finds all 3 values, formats them & pushes into addPDFText array
}
function resetInputValues(){
    document.getElementById('pdf-upload').value = null;
    allPDFText.length = 0
}

function previewFileValues(index){
    output.textContent = ' '
    console.log('File name:', index.name)
    fileName.push(index.name)
    output.textContent += fileName + '\n';
}
async function parsePDF(){
    input.addEventListener('change', async () => {
        allPDFText.length = 0 //resets selected file if it's changed before submitting to prevent duplicates
        fileName.length = 0;
        const files = input.files;

        for (let file of files){ // loops through all input files and parses text

                // console.log('File name:', file.name);
                previewFileValues(file)
                const fileReader = new FileReader(); //new obj constructor
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
                                showAlert2(`${document.getElementById('pdf-upload').value} is invalid, try again`, "danger")
                                return false;  //conditional validates pdf & returns filepath that didn't upload. else, it runs
                            }
                               
                                    thisIndex = thisText.search('Earnings Tax');
                                    dateIndex = thisText.search('XXX');
                                    hours = thisText.search('RS WORKED');

                                    findValues(thisIndex, dateIndex, hours, thisText)
                                
                                    // output.textContent = allPDFText.join(''); //displays pdf values on page
                                    
                                    console.log(allPDFText)
                                    
                                
                    } catch (error) {
                        showAlert(`${error.message}`, "danger")
                        output.textContent = "Error parsing PDF: " + error.message;
                    }
                };
                fileReader.readAsArrayBuffer(file);  
        } 
        return;      
    })
}

/*Calling main PDF Function*/     parsePDF()

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
                console.log("index is " + i)
                console.log("file check " + allPDFText[i])

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
                        updateMyChart()
                        
                        showAlert("Item Added", "success");   
                    }
            
        }
        resetInputValues()
})