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
["elevated-button", "@material/button--elevated-button.js"],
["filled-button", "@material/button--filled-button.js"],
["filled-tonal-button", "@material/button--filled-tonal-button.js"],
["outlined-button", "@material/button--outlined-button.js"],
["text-button", "@material/button--text-button.js"],
["checkbox", "@material/checkbox.js"],
["chip-set", "@material/chips--chip-set.js"],
["assist-chip", "@material/chips--assist-chip.js"],
["filter-chip", "@material/chips--filter-chip.js"],
["input-chip", "@material/chips--input-chip.js"],
["suggestion-chip", "@material/chips--suggestion-chip.js"],
["dialog", "@material/dialog.js"],
["divider", "@material/divider.js"],
["elevation", "@material/elevation.js"],
["fab", "@material/fab--fab.js"],
["branded-fab", "@material/fab--branded-fab.js"],
["filled-field", "@material/field--filled-field.js"],
["outlined-field", "@material/field--outlined-field.js"],
["focus-ring", "@material/focus.js"],
["icon", "@material/icon.js"],
["icon-button", "@material/iconbutton--icon-button.js"],
["filled-icon-button", "@material/iconbutton--filled-icon-button.js"],
["filled-tonal-icon-button", "@material/iconbutton--filled-tonal-icon-button.js"],
["outlined-icon-button", "@material/iconbutton--outlined-icon-button.js"],
["list", "@material/list--list.js"],
["list-item", "@material/list--list-item.js"],
["menu", "@material/menu--menu.js"],
["menu-item", "@material/menu--menu-item.js"],
["sub-menu", "@material/menu--sub-menu.js"],
["linear-progress", "@material/progress--linear-progress.js"],
["circular-progress", "@material/progress--circular-progress.js"],
["radio", "@material/radio.js"],
["ripple", "@material/ripple.js"],
["filled-select", "@material/select--filled-select.js"],
["outlined-select", "@material/select--outlined-select.js"],
["select-option", "@material/select--select-option.js"],
["slider", "@material/slider.js"],
["switch", "@material/switch.js"],
["tabs", "@material/tabs--tabs.js"],
["primary-tab", "@material/tabs--primary-tab.js"],
["secondary-tab", "@material/tabs--secondary-tab.js"],
["filled-text-field", "@material/textfield--filled-text-field.js"],
["outlined-text-field", "@material/textfield--outlined-text-field.js"]
// Elements not part of the material design web components library should start with "x-" (e.g. x-layout)
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