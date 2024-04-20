# Material Design Library for SolidJS

In order to use this library, you must use SolidJS and Vite.

Add the following two elements to your project:

```html
<div id="launch-activity"></div>
<div id="content-activity" style="display: none;"></div>
```

And add the following script to your index file:

```javascript
// Note that as long as you define these three variables, the library will work just fine:"
// document.documentElement.initialResourceCount <Number>
document.documentElement.initialResourceCount = 6;
// document.documentElement.initialResourceLoaded <Number>
document.documentElement.initialResourceLoaded = 0;
const STYLESHEET = 0;
const JAVASCRIPT = 1;
function resourceLoaded(type, elm){
    if(type === STYLESHEET){
        elm.media = "all";
    }
    elm.onload = null;
    document.documentElement.initialResourceLoaded++;
    if(typeof document.documentElement.signalResourceCount === "function"){
        document.documentElement.signalResourceCount();
    }
}
// document.documentElement.resourceLoaded <Function>
document.documentElement.resourceLoaded = resourceLoaded;
```

Make sure to trigger the `resourceLoaded` function when a resource is loaded:

```html
<link rel="stylesheet" href="./material/theme.css" media="print" onload="resourceLoaded(STYLESHEET, this);" />
```
