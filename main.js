function parseCurrentDOM() {
    // Get the entire HTML content of the current webpage
    const doc = document;

    // Example: Find elements with `name` or `id` attributes
    const elementsWithNameOrId = document.querySelectorAll('form, input');
    const elementDetails = Array.from(elementsWithNameOrId).map(element => ({
        tagname: element.tagName,
        id: element.id || null,
        name: element.getAttribute('name') || null
    }));

    console.log("Elements with 'name' or 'id' attributes:", elementDetails);
}
function parseJSvariables(){
    // Example: Extract inline JavaScript and parse for variables and JSON objects
    const scripts = Array.from(document.querySelectorAll('script'));
    const variables = [];
    
    const variablePattern = /(?:var|let|const)\s+(\w+)\s*=/gm;
    

    scripts.forEach(script => {
        if (!script.src) {
            const jsContent = script.innerText;
            // Extract variable names
            let varMatch;
            while ((varMatch = variablePattern.exec(jsContent)) !== null) {
                variables.push(varMatch[1]);
            }
        }
    }
        )
    console.log(variables);
}
function parseJSjsonpbjects(){

    const scripts = Array.from(document.querySelectorAll('script'));
    const jsonObjects = [];
    const jsonPattern = /(?<=")([^"]+)(?=":)/gm;
    scripts.forEach(script => {
        if (!script.src) { // Only process inline scripts
            const jsContent = script.innerText;
            // Extract JSON objects
            let jsonMatch;
            while ((jsonMatch = jsonPattern.exec(jsContent)) !== null) {
                try {
                    // Attempt to parse JSON to ensure it's valid
                    const jsonObject = JSON.parse(jsonMatch[0]);
                    jsonObjects.push(jsonObject);
                } catch (e) {
                    // Skip invalid JSON matches
                }
            }
        }
    });
    console.log(jsonObjects)
}
