# batsgLocalStorage.js

We can use web storage (local storage or session storage) to pass information (called parameter) between web pages.
The page that passes parameter is called parent page, the page that receives parameter is called child page.
Sometimes several child pages can be opened simultaneously, and we must ensure that the parameters passed to each page (in same parameter name) are individual for each page.

BatsgLocalStorage.js is a library written in pure javascript to help in this case.
It stores parameters in web storage with unique string (called unique key) as parameter name's prefix.
This unique key is passed to child page via HTTP parameter.
In child page, we use this unique key in BatsgLocalStorage to retrieved parameters (and delete them).

See index.html for example of usage.

# Basic usage:

## To set parameter in parent page.
```javascript
var batsgLocalStorage = new BatsgLocalStorage('anyPrefix_');
// Set parameter "param1" into local storage.
batsgLocalStorage.setItem('param1', param1);

// Add unique key to URL get parameter batsgLocalStorageKey=<uniqueKey>.
var url = 'child.html' + '?' + batsgLocalStorage.urlParamForUniqueKey();
// Open child window.
window.open(url, '_blank');
```

## To get parameter in child page.
```javascript
var batsgLocalStorage = new BatsgLocalStorage();
// Get unique key from URL GET parameter.
batsgLocalStorage.getUniqueKeyFromUrl();
// Get param1 value.
var param1 = batsgLocalStorage.getItem('param1');
// Clear parameters passed to this page in local storage.
batsgLocalStorage.removeItem();
```
