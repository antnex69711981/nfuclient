/**
 *
 * Application defaults
 * Singleton that contains base webservice url and outputs
 * version number
 */

Ext.define('antnex.ProxyService', {
    singleton: true,

    requires: [
        'antnex.AppDefaults',
        // 'Ext.state.Manager'
    ],

    // 0-本地端開發 9-測試機主機 1-正式機主機
    config: {
        mode: CONST_SYS_MODE
    },

    constructor: function (config) {
        this.initConfig(config);
        return this;
    },
    // function: 客戶端電文
    send: function (data, companycode) {
        let me = this;
        let msgBody = "";
        let txcode = "";
        let companyCode = S(companycode).isEmpty() ? antnex.AppDefaults.getConfig('companycode') : companycode;
        let machineCode = "";
        let token = "";
        let datetime = moment().format();
        try {
            if (!data.hasOwnProperty('txcode')) {
                throw "缺少txcode";
            }

            txcode = data.txcode;

            if (S(txcode).isEmpty()) {
                throw new Error("查無上行資料 TXCODE");
            }

            // remove txcode
            Reflect.deleteProperty(data, 'txcode');

            msgBody = data;

            // header調整時, sendCore需同步調整
            let messageBody = {
                header: {
                    txcode: txcode,
                    usercode: antnex.AppDefaults.getConfig('usercode'),
                    token: "token",
                    datetime: datetime,
                    appversion: Ext.manifest.version,
                },
                message: msgBody
            };

            let sendMessageBody = JSON.stringify(messageBody);
            let d = new Date();
            let n = d.getTime();
            let host = antnex.AppDefaults.getApiserver();
            let sendurl = host + "?_dc=" + n;

            if (DEBUG_MODE_MESSAGE) {
                logger.info("上行電文:\n" + JSON.stringify(messageBody));
            } else if (ANTNEX_USER_MODE) {
                logger.info("上行電文:\n" + JSON.stringify(messageBody));
            }

            return me.doFetch(sendurl, sendMessageBody)
        } catch (e) {
            console.log('fuck you:', e)
            // logger.error('send err:' + e);
            throw e;
        }
    },
    // function: 執行fetch
    doFetch: function (sendurl, sendMessageBody) {
        try {
            let checkStatus1 = function (response) {
                if (response.status >= 200 && response.status < 300) {
                    return response;
                } else {
                    let msg = '錯誤訊息：status:' + response.status +
                        '/ statusText:' + response.statusText;
                    logger.error("checkStatus: " + msg);
                    Ext.MessageBox.alert("通訊異常通知", msg);

                    throw new Error(msg);
                }
            }

            let checkStatus2 = function (response) {
                try {
                    if (!response.ok || response.status !== 200) {
                        logger.warn('ProxyService sendRequest/ Looks like there was a problem. Status Code: ' +
                            response.status);
                        return Promise.reject('錯誤訊息：' + response.statusText);
                    }
                } catch (e) {
                    let msg = '錯誤訊息：' + response.statusText;
                    logger.error(msg);
                    Ext.MessageBox.alert("通訊異常通知", msg);
                    return Promise.reject('錯誤訊息：' + response.statusText);
                }
                return response.json();
            }

            let doResponse = function (json) {
                try {
                    return Promise.resolve(json);
                } catch (e) {
                    let msg = 'Decode 錯誤訊息：' + e;
                    logger.error(msg);
                    return Promise.reject('錯誤訊息：' + response.statusText);
                }
            }

            let err = function (error) {
                if (error.message == 'Failed to fetch') error = '無法連線到伺服器，請檢查網路連線狀況。';
                logger.error('ProxyService 交易失敗 catch: ' + error);
                return Promise.reject(error);
            }

            let requestInit = {
                method: "POST",
                mode: 'cors',
                cache: 'no-cache',
                body: sendMessageBody,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    'Accept': 'application/json'
                }
            }
            return fetch(sendurl, requestInit)
                .then(checkStatus1)
                .then(checkStatus2)
                .then(doResponse)
                .catch(err);
        } catch (error) {
            console.log(`doFetch error`);
            throw e;
        }

    },






    encodeJWT: function (content, password) {
        let jwt = "";
        try {
            // Header
            let header = {
                "alg": "HS256",
                "typ": "JWT"
            };

            // Payload
            let oPayload = {
                "iss": "ANTNEX",
                "sub": "POS",
                "aud": "ANTNEX",
                "content": content
            };

            jwt = antnex.AppTool.createJWTToken(header, oPayload, password);
            //console.log("jwt token:\n" + jwt);
        } catch (e) {
            logger.error('generateJWT err:' + e);
            throw e;
        }
        return jwt;
    },
    getClientIP: function () {
        try {
            return fetch("https://ipapi.co/json/", {
                method: "GET",
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Accept": "application/json",
                    "origin": document.location.origin
                }
            })
                .then((response) => {
                    try {
                        if (!response.ok || response.status !== 200) {
                            logger.warn('getClientIP Status Code: ' +
                                response.status);
                            return Promise.reject('getClientIP 狀態：' + response.statusText);
                        }

                    } catch (e) {
                        logger.error('getClientIP Error：' + e);
                        return Promise.reject('getClientIP Error：' + e);
                    }
                    return response.json();
                })
                .catch(function (error) {
                    if (error.message == 'Failed to fetch') error = '無法連線到伺服器，請檢查網路連線狀況。';
                    logger.error('getClientIP 通訊異常: ' + error);
                    return Promise.reject('getClientIP 通訊異常: ' + error);
                });
        } catch (err) {
            logger.error('getClientIP err:' + err);
            return Promise.reject('getClientIP err: ' + err);
        }
    },
    showMessage: function (message) {
        Ext.Msg.alert("通訊異常", message);
    }
});
