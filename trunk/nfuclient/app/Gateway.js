Ext.define('antnex.Gateway', {
    alternateClassName: ['Gateway'],
    singleton: true,
    constructor: function (config) {
        this.initConfig(config);
    },
    config: {
        name: 'Gateway',
        forceUpdate: false, // 強制更新

        enableInterval_gateway: false,
        catchTm_gateway: 60000,
        catch_gateway: 0,
        cnt_gateway: 0,

        enableInterval_device: false,
        catchTm_device: 60000,
        catch_device: 0,
        cnt_device: 0,
        host: null,

        gatewaydata: {},
        devicelist: [],
    },
    // function: 取得是否刷新資料 type: gateway, device
    getRefresh: function (type = 'gateway') {
        let me = this;
        try {
            let now = new Date().getTime();
            let lastTm = me.getConfig(`catch_${type}`);
            let catchTm = me.getConfig(`catchTm_${type}`);
            let forceUpdate = me.getConfig('forceUpdate');
            if (now > lastTm || forceUpdate) {
                me.setConfig('forceUpdate', false);
                me.setConfig(`catch_${type}`, (now + catchTm));
                return true;
            }
            return false;
        } catch (e) {
            return me.showError(`antnex.Gateway/ getRefresh error: `, e);
        }
    },


    // function: 下載閘道資訊
    installGatewayInfo: async function (branchcode = '') {
        let me = this
        let doRefresh = me.getRefresh('gateway');
        branchcode = branchcode ? branchcode : antnex.AppDefaults.getBranchcode();

        let refresh = async function () {
            let rptService = Ext.create('antnex.services.RptService2');
            let data = await rptService.queryDevice(branchcode);
            me.setConfig('gatewaydata', data);
        }

        if (doRefresh) {
            await refresh();
        } else {
            refresh();

            // 強制更新刷新時間
            me.setConfig('forceUpdate', true);
            me.getRefresh('gateway');
        }

        return me.getConfig('gatewaydata');
    },
    // function: 下載標籤機連線資訊
    installDeviceInfo: async function (gatewayHost = '') {
        let me = this;
        let doRefresh = me.getRefresh('device');
        let refresh = async function () {
            let host = me.getConfig('host');
            if (gatewayHost) {
                host = gatewayHost;
                me.setConfig('host', gatewayHost);
            }
            let machinecode = antnex.AppDefaults.getMachinecode();
            if (true) {
                // 檢查Gateway狀態: 測試是否能夠取得Gateway資訊, 暫不作其他用途
                let uploadJSON = {
                    txcode: 'GW0001',
                    machinename: machinecode
                }
                await antnex.ProxyService.sendGateway(host, uploadJSON);
            }

            // 取得標籤機資訊
            if (true) {
                let uploadJSON = {
                    txcode: 'GW0002',
                    machinename: machinecode
                }

                let json = await antnex.ProxyService.sendGateway(host, uploadJSON);

                if (json.status == '9000') {
                    me.setConfig('devicelist', json.printers);
                } else {
                    throw `標籤機資訊取得失敗`;
                }
            }
        }
        if (doRefresh) {
            await refresh();
        } else {
            refresh();

            // 強制更新刷新時間
            me.setConfig('forceUpdate', true);
            me.getRefresh('device');
        }

        return me.getConfig('devicelist');
    },



    /************* 提示訊息 *************/
    // function:提示訊息
    showMessage: function (message) {
        Ext.Msg.alert(`${this.getConfig('name')} `, message);
    },
    // function:錯誤訊息
    showError: function (path, e) {
        this.printLog(`${path}${e}`);
        this.showMessage(e);
        return false;
    },
});
