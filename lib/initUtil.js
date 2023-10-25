const logger = new Log(Log.DEBUG, Log.consoleLogger, "CEP");
const CONST_STATUS_OK = 0x9000; //十六進制=36864 (十進制)
const CONST_IPOS_STATUS_OK = '9000';

// 設定模式 0-local開發機 1-正式機 9-測試機
const CONST_SYS_MODE = 9;
const CONST_LOADING_HINT = '資料存取中...';

// 資料串接應用程式名稱
const CONST_SYS_API_APP = "nfuapi";

const ROOT_USER_CODE = "root";

const locationurl = window.location.hash.substring(1);
var isDevelopment = false;
var isProduction = false;
// include port
const BASE_HOST = document.location.host;
var is_security = 0;
var deviceOS = "";
var deviceType = "";

// Google驗證服務
var ENABLE_GOOGLE_RECAPTCHA = true;

// 螞蟻帳戶模式
var ANTNEX_USER_MODE = false;

// 印出電文內容
const DEBUG_MODE_MESSAGE = true;

const SYS_DEBUG_LEVEL = 0;

var isSSLOn = false;
var isChrome = false;

// 1- WS  2- REST  force use REST forever
var PRN_COMM_MODE = 2;

var CONST_PRN_REST_PORT = 8756;
var CONST_PRN_WS_PORT = 8757;

// 頁面跳轉函數
let PAGE_SWITCHER = function () { };

try {
    let protocol = "";
    //console.log("navigator.userAgent:" + navigator.userAgent);

    if (navigator.userAgent.toLowerCase().indexOf("chrome") !== -1) {
        isChrome = true;
    }

    if (navigator.userAgent.toLowerCase().indexOf("Firefox") !== -1) {
        isFirefox = true;
    }

    let browserAgent = navigator.userAgent.toLowerCase();
    //logger.debug("isChrome:" + isChrome);
    //logger.debug("browserAgent: " + browserAgent);

    protocol = window.location.protocol;
    //logger.debug("window.location.origin: " + document.location.origin);
    //logger.debug("protocol: " + protocol);
    logger.debug("CONST_SYS_MODE: " + CONST_SYS_MODE);
    if (CONST_SYS_MODE === 1) {
        isProduction = true;
    } else {
        isDevelopment = true;
        ENABLE_GOOGLE_RECAPTCHA = false;
    }

    if (protocol === "https:") isSSLOn = true;
    //logger.debug('SSL:' + isSSLOn);

    logger.debug('isProduction:' + isProduction);

    // 正式機強制走　https
    if (isProduction && !isSSLOn) {
        window.location = document.URL.replace("http://", "https://");
    }

    // 本地端開發測試使用/ 非正式機強制走 http
    if (isDevelopment && isSSLOn) {
        window.location = document.URL.replace("https://", "http://");
    }


} catch (e) {
    console.error("initUtil 異常:" + e);
    alert('初始化異常:' + e);
}



const SYS_DATA_USER_PROFILE = "userprofile";
const SYS_DATA_DEVICE_PROFILE = "deviceprofile";
const SYS_DATA_APP_SETTING = "appsetting";
