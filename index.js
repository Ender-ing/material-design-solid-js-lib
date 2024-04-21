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
    let script = document.createElement("script");
    script.setAttribute("src", src);
    script.setAttribute("async", "true");
    script.addEventListener("load", onload);
    script.addEventListener("error", onerror);
    document.body.appendChild(script);
    script = null;
}

const resourceList = [
["elevated-button", "@material/buttons.js"],
["filled-button", "@material/buttons.js"],
["filled-tonal-button", "@material/buttons.js"],
["outlined-button", "@material/buttons.js"],
["text-button", "@material/buttons.js"],
["checkbox", "@material/checkbox.js"],
["chip-set", "@material/chips.js"],
["assist-chip", "@material/chips.js"],
["filter-chip", "@material/chips.js"],
["input-chip", "@material/chips.js"],
["suggestion-chip", "@material/chips.js"],
["dialog", "@material/dialog.js"],
["divider", "@material/divider.js"],
["elevation", "@material/elevation.js"],
["fab", "@material/fabs.js"],
["branded-fab", "@material/fabs.js"],
["filled-field", "@material/fields.js"],
["outlined-field", "@material/fields.js"],
["focus-ring", "@material/focus.js"],
["icon", "@material/icon.js"],
["icon-button", "@material/iconbuttons.js"],
["filled-icon-button", "@material/iconbuttons.js"],
["filled-tonal-icon-button", "@material/iconbuttons.js"],
["outlined-icon-button", "@material/iconbuttons.js"],
["list", "@material/lists.js"],
["list-item", "@material/lists.js"],
["menu", "@material/menus.js"],
["menu-item", "@material/menus.js"],
["sub-menu", "@material/menus.js"],
["linear-progress", "@material/progress.js"],
["circular-progress", "@material/progress.js"],
["radio", "@material/radio.js"],
["ripple", "@material/ripple.js"],
["filled-select", "@material/selects.js"],
["outlined-select", "@material/selects.js"],
["select-option", "@material/selects.js"],
["slider", "@material/slider.js"],
["switch", "@material/switch.js"],
["tabs", "@material/tabs.js"],
["primary-tab", "@material/tabs.js"],
["secondary-tab", "@material/tabs.js"],
["filled-text-field", "@material/textfields.js"],
["outlined-text-field", "@material/textfields.js"]
// Elements not part of the material design web components library should start with "x-" (e.g. x-layout)
], flatResourceList = resourceList.flat(Infinity);

// Collect all used tags inside an XMLDocument
function getXDOCTags(xmlDoc) {
    let allTags = new Set();

    const collectTags = (node) => {
        allTags.add(node.nodeName);
        for (const child of node.childNodes) {
            collectTags(child);
        }
    };
    collectTags(xmlDoc.documentElement); // Start from the root element

    return Array.from(allTags);
}

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
    var tags = getXDOCTags(xmlDoc);
    console.log(window.tags = tags)
    for (var i = 0; i < tags.length; i++) {
        // ~ Exclude elements on [ignore] list! ~
        if((!usedElements.includes(tags[i])) && (!ignore.includes(tags[i]))){
            // Check if this element needs any resources to be loaded
            if(flatResourceList.includes(tags[i])){
                usedElements.push(tags[i]);
            }
        }
    }
    tags = null;
    // Update resource tracking info
    console.log(window.usedElements = usedElements);
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