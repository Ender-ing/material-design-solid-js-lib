/**
 * 
 * Index file
 * 
**/

let sourceBase = null;

// Set the source URL of the material design resources needed for the library to work!
export function setupSource(base){
    if(base[base.length - 1] != "/"){
        sourceBase = base + "/";
    }else{
        sourceBase = base;
    }
}

// Load a script
function loadScript(src, onload, onerror){
    //
    let script = document.createElement("script");
    script.setAttribute("src", src);
    script.setAttribute("async", "true");
    script.addEventListener("load", onload);
    script.addEventListener("error", onerror);
    document.body.appendChild(script);
    script = null;
}

const resourceList = [
    ["linear-progress", "@material/linear-progress.js"]
], flatResourceList = resourceList.flat(Infinity);

// Process .design XML data and load needed resources
// Input: xmlDoc <XMLDocument>, callback <Function>, onerror <Function>, ignore <Array>
// Output (callback): loaded <Number>, needed <Number>
export function processDesign(xmlDoc, callback, onerror, ignore = []){
    // Mark the processing session
    let processID = Number(new Date());
    // Keep track of loaded resources
    let neededResources = null, loadedResources = 0,
    usedElements = [];
    // Get the number of needed resources
    var tags = xmlDoc.getElementsByTagName('*');
    for (var i = 0; i < tags.length; i++) {
        // ~ Exclude elements on [ignore] list! ~
        if((!usedElements.includes(tags[i].nodeName)) && (!ignore.includes(tags[i].nodeName))){
            // Check if this element needs any resources to be loaded
            if(flatResourceList.includes(tags[i].nodeName)){
                usedElements.push(tags[i].nodeName);
            }
        }
    }
    tags = null;
    // Update resource tracking info
    neededResources = usedElements.length;
    callback(neededResources, loadedResources);

    // Start loading resources
    // LOOP {to load needed resources}
    for(var i = 0; i < usedElements.length; i++){
        let flatIndex = flatResourceList.indexOf(usedElements[i]);
        let src = sourceBase + flatResourceList[flatIndex + 1];
        loadScript(src, () => {
            callback(processID, neededResources, ++loadedResources);
        }, (...args) => {
            onerror(processID, ...args);
        })
    }
    console.log(usedElements);
    usedElements = null;
}