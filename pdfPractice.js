const input = document.getElementById('pdf-upload');
const output = document.getElementById('pdf-content');

//function will push each pdf into array. this array will be push int global variable array which will be pushed into table
//click button to run loop. if array size < pdfInputLength, run pdfparse function. else, return Big arr
        //if(fileinputlength < arrayLength) run parse function,else run function that pushes table data into table.
//parse function needs to get data into string, push into new array, and send to array to big array
        //run pdfparse function & return pdfTextArray.
//parse function needs to be nested in conditional that checks file input size against new array size
//

let fileAMount = 0;

const fileInput = document.getElementById('pdf-upload');//display amount of files uploaded

  fileInput.addEventListener('change', () => {
    const files = fileInput.files.length;
    fileAMount += files
    console.log(`file amount is ${fileAMount}`)
  });


// input.addEventListener('change', async () => {
//     // const file = input.files[0];
//     const files = input.files;
//     let allText = [];

//     for (let file of files){
//         if (file) {
//             const fileReader = new FileReader();

//             fileReader.onload = async function() {
//                 try {
//                     const typedArray = new Uint8Array(this.result);
//                     const pdf = await pdfjsLib.getDocument(typedArray).promise;
//                     const numPages = pdf.numPages;
                    
//                     let thisText = "";

//                     for (let i = 1; i <= numPages; i++) {
                        
//                         const page = await pdf.getPage(i);
//                         const textContent = await page.getTextContent();
//                         const pageText = textContent.items.map(item => item.str).join(" ");
//                         thisText += pageText.toString();

//                         thisIndex = thisText.search('DOMINIQUE');
//                         // console.log(pageText)
//                         console.log("index " + thisIndex)
//                     }
//                         allText.push(thisText);
//                         // output.textContent = allText.join('');
//                         console.log(allText)
//                         console.log(thisText)
                    
//                 } catch (error) {
//                     output.textContent = "Error parsing PDF: " + error.message;
//                 }
//             };
//               fileReader.readAsArrayBuffer(file);
//         }
//     }
// })

const myForm = document.getElementById('pdfForm');
const inpFile = document.getElementById('pdf-upload');

    myForm.addEventListener('submit', e => {
        e.preventDefault();

            console.log(inpFile)
    });
    