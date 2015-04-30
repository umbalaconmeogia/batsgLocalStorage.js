/**
 * BatsgLocalStorage
 * Javascript library to help passing parameters between web pages using web storage (local or session storage).
 */

/**
 * @param string uniqueKeyPrefix (Optional)
 */
function BatsgLocalStorage(uniqueKeyPrefix) {

  var urlParamName = 'batsgLocalStorageKey';
  var uniqueKey;

  /**
   * Get value of specified parameter from url.
   * Copy from http://stackoverflow.com/a/11582513
   * @param string name Parameter name.
   * @return string
   */
  getUrlParameter = function(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
  };
  
  /**
   * Storage to save data. Default to localStorage.
   * Set this.storage = localStorage to use localStorage.
   * Set this.storage = sessionStorage to use sessionStorage.
   */
  this.storage = window.localStorage;
  
  this.setUrlParamName = function(paramName) {
    urlParamName = paramName;
  };
  
  /**
   * Get unique key from GET url parameter.
   * @return string.
   */
  this.getUniqueKeyFromUrl = function() {
    uniqueKey = getUrlParameter(urlParamName);
    return uniqueKey;
  };
  
  /**
   * Generate string batsgLocalStorageKey=<uniqueKey> to add to URL GET parameter.
   * @return string.
   */
  this.urlParamForUniqueKey = function() {
    return urlParamName + '=' + uniqueKey;
  };

  /**
   * Generate a random string used as unique key.
   * @param string prefix (Optional) String append to the prefix of the random string.
   * @return string
   */
  this.generateRandomKey = function(prefix) {
    if (typeof prefix === 'undefined') {
      prefix = uniqueKeyPrefix;
    }
    return prefix + Math.random().toString(36).substr(2);
  };

  /**
   * Set item value into local storage.
   * @param string key
   * @param string value
   */
  this.setItem = function(key, value) {
    this.storage.setItem(this.fullKey(key), value);
  };
  
  /**
   * Get item value from local storage.
   * @param string key
   */
  this.getItem = function(key) {
    var key = this.fullKey(key);
    return this.storage.getItem(key);
  };
  
  /**
   * Remove an item or group of item from local storage.
   * @param string key (Optional)
   */
  this.removeItem = function(key) {
    if (typeof key === 'undefined') {
      // Remove all key belongs to uniqueKey group.
      key = this.fullKey('');
      var len = this.storage.length;
      for ( var i = 0; i < len; ++i ) {
        var subKey = this.storage.key(i);
        // subKey may be null if some key is deleted just before this method called.
        if (subKey !== null && subKey.indexOf(key) == 0) {
          this.storage.removeItem(subKey);
        }
      }
    } else {
      // Remove specified key.
      this.storage.removeItem(this.fullKey(key));
    }
  };

  /**
   * Generate string by concatenate uniqueKey and key, separating by dot (.)
   * @param key If key is undefined, then return only uniqueKey. If key is null or any string, return uniqueKey.<key>
   * @return string
   */
  this.fullKey = function(key) {
    key = (typeof key === 'undefined') ? uniqueKey : uniqueKey + '.' + key;
    return key;
  };

  // Set default value to uniqueKeyPrefix if not specified.
  uniqueKeyPrefix = (typeof uniqueKeyPrefix !== 'undefined') ? uniqueKeyPrefix : '';
  // Generate uniqueKey.
  uniqueKey = this.generateRandomKey(uniqueKeyPrefix);
}