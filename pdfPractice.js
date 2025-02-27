const input = document.getElementById('pdf-upload');
const output = document.getElementById('pdf-content');



input.addEventListener('change', async () => {
    // const file = input.files[0];
    const files = input.files;
    let allText = "";
    
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
                    thisText += pageText.toString() + "\n";

                    thisIndex = thisText.search('DOMINIQUE');

                    // console.log(pageText)
                    console.log("index " + thisIndex)
                }
                allText += thisText;
                output.textContent = allText;
                
            } catch (error) {
                output.textContent = "Error parsing PDF: " + error.message;
            }
        };
        fileReader.readAsArrayBuffer(file);
    }
}
})

