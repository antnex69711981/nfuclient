Ext.define('antnex.services.FormValidation', {
    alternateClassName: ['FormValidation'],
    // singleton: true,
    constructor: function (config) {
        this.initConfig(config);
        return this;
    },

    isEmpty(input) { //是否為空值
        if (typeof input === "undefined" || input === "" || input === null || input === undefined) {
            return true;
        } else {
            return false;
        }
    },

    uniformno(uniformno) { //統編檢核
        const rule = new RegExp("^[0-9]{8}$");
        if (rule.test(uniformno)) {
            return true;
        } else {
            return false;
        }
    },

    phone(phone) { //電話檢核(允許市話或手機)
        const rule = new RegExp("^[0-9]{7,11}$");
        if (rule.test(phone)) {
            return true;
        } else {
            return false;
        }
    },

    email(email) { //電子信箱檢核
        const rule = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");

        if (rule.test(email)) {
            return true;
        } else {
            return false;
        }
    },

    onlyLetterAndNum(letterAndNum) { //英數字檢核
        const rule = new RegExp("^[a-zA-Z0-9]*$", "g");

        if (rule.test(letterAndNum)) {
            return true;
        } else {
            return false;
        }
    },

    onlyCapitalAndNum(capitalAndNum) { //英數字檢核(只允許大寫)
        const rule = new RegExp("^[A-Z0-9]*$", "g");

        if (rule.test(capitalAndNum)) {
            return true;
        } else {
            return false;
        }
    },

    zipcode(phone) { //郵遞區號檢核
        const rule = new RegExp("^[0-9]{3,5}$");
        if (rule.test(phone)) {
            return true;
        } else {
            return false;
        }
    },

    onlyNum(num) { //僅輸入數字
        const rule = new RegExp("^[0-9]*$", "g");

        if (rule.test(num)) {
            return true;
        } else {
            return false;
        }
    },

    userName(userName) {
        if (typeof userName !== 'string') {
            return "請輸入文字";
        } else {
            const rule = new RegExp("^[\u4e00-\u9fa5_ a-zA-Z]+$");
            if (rule.test(userName)) {
                return true;
            } else {
                return false;
            }
        }
    },

    mobile(mobile) {
        const rule = new RegExp("^[0]{1}[9]{1}[0-9]{8}$");

        if (rule.test(mobile)) {
            return true;
        } else {
            return false;
        }
    },
    tel(tel) {
        const rule = new RegExp("^[0]{1}[0-9]{1}[0-9]{7,8}$");

        if (rule.test(tel)) {
            return true;
        } else {
            return false;
        }
    },

    idcard(idcard) {
        const rule = new RegExp("^[A-Z]{1,2}[1-2]{1}[0-9]{7,8}$");
        if (rule.test(idcard)) {
            return true;
        } else {
            return false;
        }
    },

    healthidcard(healthidcard) {
        const rule = new RegExp("^[0-9]{12}$");

        if (rule.test(healthidcard)) {
            return true;
        } else {
            return false;
        }
    },

    invoice(invoice) {
        const rule = new RegExp("^[a-zA-Z]{2}[0-9]{8}$");

        if (rule.test(invoice)) {
            return true;
        } else {
            return false;
        }
    },

    unicode(unicode) {
        const rule = new RegExp("^[0-9]{8}$");

        if (rule.test(unicode)) {
            return true;
        } else {
            return false;
        }
    },

    taxcode(taxcode) {
        const rule = new RegExp("^[A-Z]{1}[0-9]{11}$");

        if (rule.test(taxcode)) {
            return true;
        } else {
            return false;
        }
    },

    creditCard(creditCard) {
        if (typeof userName !== 'string') {
            return "請輸入文字";
        } else {
            const rule = new RegExp("^\\d{4}-\\d{4}-\\d{4}-\\d{4}$");

            if (rule.test(creditCard)) {
                return true;
            } else {
                return false;
            }
        }
    },

    date(date) {
        const rule = new RegExp("^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$");

        if (rule.test(date)) {
            return true;
        } else {
            return false;
        }
    },

    imei(imei) {
        const rule = new RegExp("^[0-9]{15,20}$");

        if (rule.test(imei)) {
            return true;
        } else {
            return false;
        }
    },

    sim(sim) {
        const rule = new RegExp("^[0-9]{16}$");

        if (rule.test(sim)) {
            return true;
        } else {
            return false;
        }
    },

    onlyRealNumber(num) { // 僅能輸入數字，取小數第二位
        const rule = new RegExp("^[0-9]+(.[0-9]{2})?$", "g");

        if (rule.test(num)) {
            return true;
        } else {
            return false;
        }
    },

    onlyLetterAndNumAndDash(letterAndNumAndDash) {
        const rule = new RegExp("^[-_a-zA-Z0-9]*$", "g");

        if (rule.test(letterAndNumAndDash)) {
            return true;
        } else {
            return false;
        }
    },

    onlyChinese(chinese) {
        const rule = new RegExp("^[\u4e00-\u9fa5]*$", "g");

        if (rule.test(chinese)) {
            return true;
        } else {
            return false;
        }
    },

    onlyLetter(onlyLetter) { //僅輸入英文
        const rule = new RegExp("^[a-zA-Z]*$", "g");

        if (rule.test(onlyLetter)) {
            return true;
        } else {
            return false;
        }
    },

});
