const input = document.getElementById('pdf-upload');
const output = document.getElementById('pdf-content');

let fileCount = 0;
let allPDFText = [];
function findValues (payIndex, dateIndex, hrs, text){ //finds values & pushes into allPDFText arr
        let a = payIndex-8;
        let b = dateIndex + 19;
        let c = dateIndex + 30;
        let d = hrs + 10
        let e = hrs + 23
        // console.log(text.slice(a, payIndex).trim())
        // console.log(text.slice(b, c).trim())
        // console.log(text.slice(d, e).trim())
        allPDFText.push(text.slice(a, payIndex).trim())
        allPDFText.push(text.slice(b, c).trim())
        allPDFText.push(text.slice(d, e).trim())

}


async function parsePDF(){
input.addEventListener('change', async () => {

    const files = input.files;
    let allText = [];

    for (let file of files){
        if (file) {
            const fileReader = new FileReader();

            fileReader.onload = async function() {
                try {
                    const typedArray = new Uint8Array(this.result);
                    const pdf = await pdfjsLib.getDocument(typedArray).promise;
                    const numPages = pdf.numPages;
                    
                    let thisText = "";
                        
                    for (let i = 1; i <= numPages; i++) {
                        
                        const page = await pdf.getPage(i);
                        const textContent = await page.getTextContent();
                        const pageText = textContent.items.map(item => item.str).join(" ");

                        thisText += pageText.toString();

                        if (thisText.search('GLENLAKE') < 1 || thisText.search('BFTAX') < 1 || thisText.search('Rate Miles') < 1) {
                                showAlert2(`${document.getElementById('pdf-upload').value} is invalid, try again`, "danger")
                                return;  //conditional validates pdf & returns filepath that didn't upload. else, it runs
                        }

                        thisIndex = thisText.search('Earnings Tax');
                        dateIndex = thisText.search('XXX');
                        hours = thisText.search('RS WORKED');

                        findValues(thisIndex, dateIndex, hours, thisText)
                    }
                        allText.push(thisText);//pushes all pdf text into array within big arr
                        // output.textContent = allText.join(''); //displays all pdftext on page
                        console.log(allPDFText)
                    
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

parsePDF()

const myForm = document.getElementById('pdfForm');

    myForm.addEventListener('submit', async e => { //submit button function
        e.preventDefault();
                
                let fileCount = 0;
                const files = input.files.length;
                fileCount += files
                console.log(`submit button pressed. Filename is: ${input.value} current file count is ${fileCount}`)
                console.log("pdf array is " + allPDFText)

                        const paycheckDate = allPDFText[1];
                        const netPay = allPDFText[0];
                        const hoursWorked = allPDFText[2];

                       
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
                                console.log(yAxisDate);
                                updateMyChart()
                                
                                showAlert("Item Added", "success");   
                            }
                    })
    

