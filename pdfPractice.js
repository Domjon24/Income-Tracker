const input = document.getElementById('pdf-upload');
const output = document.getElementById('pdf-content');

//function will push each pdf into array. this array will be push int global variable array which will be pushed into table
//click button to run loop. if array size < pdfInputLength, run pdfparse function. else, return Big arr
        //if(fileinputlength < arrayLength) run parse function,else run function that pushes table data into table.
//parse function needs to get data into string, push into new array, and send to array to big array
        //run pdfparse function & return pdfTextArray.
//parse function needs to be nested in conditional that checks file input size against new array size
//

let fileCount = 0;
let allPDFText = [];
function findValues (payIndex, dateIndex, hrs, text){
        let a = payIndex-8;
        let b = dateIndex + 19;
        let c = dateIndex + 30;
        let d = hrs + 10
        let e = hrs + 23
        console.log(text.slice(a, payIndex))
        console.log(text.slice(b, c))
        console.log(text.slice(d, e))
}

function parsePDF(){
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

                        thisIndex = thisText.search('Earnings Tax');
                        dateIndex = thisText.search('XXX');
                        hours = thisText.search('RS WORKED');


                        findValues(thisIndex, dateIndex, hours, thisText)
                    }

                    
                        allText.push(thisText);//pushes all pdf text into array within big arr
                        output.textContent = allText.join(''); //displays all pdftext on page
                        // console.log(allPDFText)
                    
                } catch (error) {
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
const inpFile = document.getElementById('pdf-upload');
    myForm.addEventListener('submit', e => { //submit button function
        e.preventDefault();
                
                let fileCount = 0;
                const files = input.files.length;
                fileCount += files
                console.log(`submit button pressed. Filename is: ${inpFile.value} current file count is ${fileCount}`)
                console.log("pdf array count is now " + allPDFText.length)

    });

   