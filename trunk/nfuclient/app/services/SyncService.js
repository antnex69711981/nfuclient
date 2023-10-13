Ext.define('antnex.services.SyncService', {
    requires: [],

    constructor: function (config) {
        this.initConfig(config);
    },

    load: async function () {
        return new Promise((resolve, reject) => {
            try {
                // 存取service清單
                let serviceList = [];

                let finishCnt = 0;
                let chkFinish = function () {
                    finishCnt++
                    if (finishCnt == serviceList.length) resolve('資料同步完成');
                }
                serviceList.forEach((service, idx, self) => {
                    service.load().then(chkFinish).catch(e => {
                        reject(e);
                    })
                });
            } catch (e) {
                reject(`資料同步失敗: ${e}`);
            }
        })
    },

    showMessage: message => {
        Ext.Msg.alert("異常通知", message);
    },
    showError: function (path, message) {
        this.showMessage(message);
        console.log(path + message)
    }
});
