(function (w) {
        var isSupportLocalStorage = !!window.localStorage, isSupportBehavior = false;
        if (!isSupportLocalStorage) {
            var dataObj = document.createElement('input');
            dataObj.type = 'hidden';
            document.body.appendChild(dataObj);
            isSupportBehavior = !!dataObj.addBehavior;
            isSupportBehavior && dataObj.addBehavior('#default#userData');
        }
        var configs = { storeName: 'editorContent' };
        w.storage = {
            retrieve: function (name) {
                if (!isSupportLocalStorage && isSupportBehavior) {
                    dataObj.load(configs.storeName);
                    return dataObj.getAttribute(name);
                } else {
                    return w.localStorage.getItem(name);
                }
                return null;
            },
            save: function (name, value) {
                if (!isSupportLocalStorage && isSupportBehavior) {
                    dataObj.setAttribute(name, value);
                    dataObj.save(configs.storeName);
                    return true;
                } else {
                    w.localStorage.setItem(name, value);
                    return true;
                }
                return false;
            }
        };
    })(window);