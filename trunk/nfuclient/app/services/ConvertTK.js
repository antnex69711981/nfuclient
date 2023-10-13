Ext.define('antnex.services.ConvertTK', {
    alternateClassName: ['ConvertTK'],
    singleton: true,
    constructor: function () {
        this.initConfig(arguments);
        return this;
    },
    config: {
        tax: 1.05, // 稅率 105%
    },

    /**
     * store Renderer
     * 
     * @param {Ext.Store} store ExtJS的Store格式物件
     * @param {*} value         要從Store中找出的關鍵值
     * @param {String} valueKey 資料欄位的key
     * @param {String} textKey  顯示欄位的key
     * @returns render過後的值
     */
    storeRenderer: function (store, value, valueKey = 'value', textKey = 'text') {
        let record = store.getRange().find(e => e.get(valueKey) == value);
        if (record) {
            if (record.get('color')) {
                return `<span style="color:${record.get('color')}">${record.get(textKey)}</span>`;
            } else {
                return record.get(textKey);
            }
        } else {
            return value ? `<span style="color:orange">無法辨識: ${value}</span>` : ``;
        }
    },

    /**
     * store 對照
     * 
     * @param {Ext.Store} store ExtJS的Store格式物件
     * @param {*} text          要從Store中找出的關鍵值
     * @param {*} emptyText     若text為空的回傳值
     * @param {String} valueKey 資料欄位的key
     * @param {String} textKey  顯示欄位的key
     * @returns 對應的資料值
     */
    storeFinder: function (errorTip, storeRange, text, emptyText, valueKey = 'value', textKey = 'text') {
        if (S(text).isEmpty()) return emptyText
        text = S(text).trim(' ').s;
        let record = storeRange.find(e => e.get(textKey) == text);
        if (record) {
            return record.get(valueKey);
        } else {
            throw `${errorTip}查無對應資料: ${text}<br>`;
        }
    },

    /**
     * 轉換時間格式用的Renderer
     * 
     * @param {*} time        資料時間
     * @param {String} format 時間格式: 請參考Ext.Date.format
     * @returns render過後的值
     */
    timeRenderer: function (time, format = 'Y-m-d H:i:s') {
        return time ? Ext.Date.format(new Date(time), format) : '';
    },

    /**
     * 取得對應發票期數
     * @param {*} time 要取得的對應其數的日期
     * @returns 期數: String 民國年-月
     */
    invoiceTradeym: function (time) {
        let t = new Date(time);
        let store = Ext.create('antnex.store.privateStore.Invoice.Tradeym');
        let y = `${t.getFullYear() - 1911}`;
        let m = ConvertTK.storeRenderer(store, `${Ext.Date.format(t, 'm')}`, 'value', 'text');
        return `${y}-${m}`;
    },

    /**
     * 四捨五入
     * 
     * @param {*} number  要四捨五入的值
     * @param {*} decimal 小數位數
     * @returns 四捨五入過後的結果
     */
    rounding: function (number = 0, decimal = 0) {
        let dec = 1;
        for (let idx = 0; idx < decimal; idx++) {
            dec = dec * 10
        }
        return Math.round(number * dec) / dec
    },

    /**
     * 依照`含稅額`取得`稅額`
     * 
     * @param {*} price 含稅額
     * @param {*} scale 小數位數
     * @returns 稅額
     */
    priceToTax: function (price = 0, scale = 0) {
        let untaxprice = ConvertTK.priceToUntaxprice(price, scale);
        let tax = price - untaxprice;
        return tax;
    },

    /**
     * 依照`含稅額`取得`未稅額`
     * 
     * @param {*} price 含稅額
     * @param {*} scale 小數位數
     * @returns 未稅額
     */
    priceToUntaxprice: function (price = 0, scale = 0) {
        let untaxprice = ConvertTK.rounding(price / this.getConfig('tax'), scale);
        return untaxprice;
    },

    /**
     * 依照`未稅額`取得`稅額`
     * 
     * @param {*} untaxprice 未稅額
     * @param {*} scale      小數位數
     * @returns 稅額
     */
    untaxpriceToTax: function (untaxprice = 0, scale = 0) {
        let price = ConvertTK.untaxpriceToPrice(untaxprice, scale);
        let tax = price - untaxprice;
        return tax;
    },

    /**
     * 依照`未稅額`取得`含稅額`
     * 
     * @param {*} untaxprice 未稅額
     * @param {*} scale      小數位數
     * @returns 含稅額
     */
    untaxpriceToPrice: function (untaxprice = 0, scale = 0) {
        let price = ConvertTK.rounding(untaxprice * this.getConfig('tax'), scale);
        return price
    },

    /**
     * 將字串轉換為陣列, 並清除空白內容
     * 
     * @param {String} value    字串
     * @param {String} splitter 分隔符號
     * @returns [str, str]
     */
    stringToArray: function (value = '', splitter = ',', filtEmpty = true) {
        value = S(value).isEmpty() ? '' : value;
        let array = value.split(splitter);
        array = array
            .filter(e => S(e).isEmpty() ? filtEmpty == false : true)
            .map(e => S(e).isEmpty() ? '' : S(e).trim(' ').s);
        return array
    },

    /**
     * 排除重複
     * 
     * @param {Array} array 陣列
     * @returns array
     */
    distinctArray: function (array = []) {
        return array.filter((e, i, s) => s.findIndex(v => v == e) == i)
    },

    /**
     * 取得郵遞區號
     * 
     * @param {String} county 縣市
     * @param {String} region 行政區
     * @returns [str, str]
     */
    getZipcode: function (county = '', region = '') {
        county = S(county).trim(' ').s;
        region = S(region).trim(' ').s;
        let record = Ext.getStore('Region').getRange().find(e => {
            return e.get('parentname') == county && e.get('name') == region
        })
        return record ? record.get('zipcode') : '';
    },

    /**
     * 取得該物件所對應的controller
     * 
     * @param {Object} obj 
     * @returns controller || null
     */
    findController: function (obj) {
        return obj.controller ? obj.controller : obj.up() ? ConvertTK.findController(obj.up()) : null;
    },

    /**
     * 執行對應函數
     * 
     * @param {Object} obj           要執行函數的物件
     * @param {Function, String} fn  object key所對應的內容
     * @param {any} defaultReturns   無法執行函數時所預設回傳的內容
     * @param  {...any} args         其他引數
     * @returns 執行函數後所回傳的值
     */
    fireEvent: function (obj, fn, defaultReturns, ...args) {
        switch (typeof fn) {
            case 'string':
                let controller = ConvertTK.findController(obj);
                if (controller && typeof controller[fn] == 'function') {
                    return controller[fn](...args);
                } else {
                    return defaultReturns;
                }
            case 'function':
                return fn(...args);
        }
        return defaultReturns;
    }
});

// ConvertTK.format
Ext.define('antnex.services.ConvertTK.format', {
    alternateClassName: ['ConvertTK.format'],
    singleton: true,
    constructor: function (config) {
        this.initConfig(config);
        return this;
    },

    /**
     * 轉換時間格式用的Renderer
     * 
     * @param {*} format 時間格式: 請參考Ext.Date.format
     * @returns renderer函數
     */
    timeRenderer: function (format = 'Y-m-d H:i:s') {
        let fn = function (time) {
            return ConvertTK.timeRenderer(time, format);
        }
        return fn;
    },

    /**
     * private store 專用renderer
     * 
     * @param {String} storeClass Private Store的Class
     * @param {String} valueKey   資料欄位的key
     * @param {String} textKey    顯示欄位的key
     * @returns renderer函數
     */
    storeRenderer: function (storeClass, valueKey = 'value', textKey = 'text') {
        let classMgr = Ext.ClassManager.get(storeClass);
        let className = classMgr ? classMgr.$className : null;
        let store = className ? Ext.create(className) : null;

        let fn = function (value) {
            return ConvertTK.storeRenderer(store, value, valueKey, textKey);
        }
        let nullFn = function (value) {
            console.log(`storeClass error: ${storeClass}`);
            return value;
        }
        return store ? fn : nullFn;
    },
});
