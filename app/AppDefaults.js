/**
 *
 * Application defaults
 * Singleton that contains base webservice url and outputs
 * version number
 */
Ext.define('antnex.AppDefaults', {
    singleton: true,
    properties: new Map(),
    permission: new Map(),
    config: {
        // system
        servername: '',
        masterkey: "frbcslOb5XjhihmUO2hfbKK2",
        apiserver: "",
        serverhost: "",
        webapp: CONST_SYS_API_APP,
        modename: "",
        open: false,
        development: false,
        security: false,
        appurl: '',
        servleturl: '',
        frsurl: '',
        clientinfo: {},
        isFullscreen: false, // 全螢幕模式

        // device
        sysserial: 0,
        deviceid: '',
        devicetoken: '',
        machinecode: '',
        machinename: '',
        companycode: '',
        companyname: '',
        branchcode: '',
        branchname: '',
        ishead: 0,
        isstock: 0,
        isantnex: 0,
        accountlist: [],

        // user
        usercode: "",
        username: "",
        employee: '',
        employeeid: 0,
        roleid: 0,
        rolename: '',
        token: '',
        function: [],
        userfile: null,
    },
    constructor: function (config) {
        this.initConfig(config);
        return this;
    },
    clearProperties: function () {
        this.properties.clear();
    },
    version: function () {
        Ext.Msg.alert("nexpos", "版本:" + Ext.manifest.version);
    },

    isLogin: function () {
        let state = false;
        try {
            let me = this;
            state = S(me.getConfig('userfile')).isEmpty() ? false : true;
        } catch (e) {
            logger.error('AppDefaults/isLogin err:' + e);
        } finally { }
        return state;
    },

    isFront: function () {
        let state = false;
        try {
            let vc = antnex.app.getController('AppMain');
            if (vc) {
                curView = vc.getCurrentPerspective();
                if ("frontend" === curView) {
                    state = true;
                }
            }
        } catch (e) {
            logger.error('AppDefaults/isFront e:' + e);
        }
        return state;
    },

    buildDeviceprofile: async function (data) {
        let me = this;
        try {
            Ext.state.Manager.set('sysserial', data.sysserial);
            Ext.state.Manager.set('deviceid', data.deviceid);
            Ext.state.Manager.set('machinecode', data.sysserial.toString());
            Ext.state.Manager.set('machinename', data.machinename);

            me.setSysserial(data.sysserial);
            me.setDeviceid(data.deviceid);
            me.setMachinecode(data.sysserial.toString());
            me.setMachinename(data.machinename);
            me.setCompanycode(data.companycode);
            me.setBranchcode(data.branchcode);
            me.setBranchname(data.branchname);
            me.setIshead(data.ishead);
            me.setIsstock(data.isstock);
            me.setIsantnex(data.isantnex);
            me.setAccountlist(data.accountlist);
        } catch (e) {
            logger.error('AppDefaults buildDeviceprofile:' + e);
            me.showMessage(e);
        }
    },

    buildUserprofile: async function () {
        let me = this;
        try {
            let account = Ext.state.Manager.get('account', '');
            let accountid = Ext.state.Manager.get('accountid', '');
            let usercode = Ext.state.Manager.get('usercode', '');
            let username = Ext.state.Manager.get('username', '');
            let roleid = Ext.state.Manager.get('roleid', 0);
            let rolename = Ext.state.Manager.get('rolename', '');
            let token = Ext.state.Manager.get('token', '');
            let userid = Ext.state.Manager.get('userid', '');
            let functionString = Ext.state.Manager.get('function', '');

            me.setConfig('usercode', usercode);
            me.setConfig('username', username);
            me.setConfig('roleid', roleid);
            me.setConfig('rolename', rolename);
            me.setConfig('token', token);
            me.setConfig('userid', userid);
            me.setConfig('function', JSON.parse(functionString));

            if (S(functionString).isEmpty() == false) {
                me.getConfig('function').forEach(function (item, index, array) {
                    me.permission.set(item.code, item);
                });
            }

            let json = await antnex.ProxyService.send({ txcode: 'BASIC_EMPLOYEE_FIND_BY_ID', ids: me.getConfig('userid') })
            switch (json.status) {
                case CONST_STATUS_OK:
                    let data = json.message.data;
                    delete data.password
                    me.setConfig('userfile', data);
                    break;
                default:
                    me.showMessage(json.statusText)
                    break;
            }
        } catch (e) {
            logger.error('AppDefaults buildUserprofile:' + e);
            me.showMessage(e);
        }
    },

    // 清空設定
    clear: function () {
        try {
            let me = this;
            me.properties.clear();
            me.permission.clear();

            me.setUsercode("");
            me.setUsername("");
            me.setDeviceid("");
            me.setSysserial(0);
            me.setMachinecode("");
            me.setMachinename("");
            me.setCompanycode("");
            me.setCompanyname("");
            me.setBranchname("");
            me.setBranchcode("");
            me.setRoleid(0);
            me.setRolename("");
            me.setFunction([]);
            me.setToken("");
            me.setOpen(false);


            me.setIshead(0);
            me.setIsstock(0);
            me.setEmployee("");
            me.setEmployeeid(0);


            Ext.state.Manager.set("deviceid", "");
            Ext.state.Manager.set("machinecode", "");
            Ext.state.Manager.set("machinename", "");
            Ext.state.Manager.set("sysserial", 0);

            Ext.state.Manager.set("usercode", "");
            Ext.state.Manager.set("username", "");
            Ext.state.Manager.set("token", "");
            Ext.state.Manager.set("function", "");
            Ext.state.Manager.set("roleid", "");

        } catch (e) {
            logger.warn("clear err:" + e);
        }
    },

    doLogout: function () {
        try {
            let me = this;
            me.properties.clear();
            me.permission.clear();

            me.setUsercode("");
            me.setDeviceid("");
            me.setSysserial(0);
            me.setMachinecode("");
            me.setMachinename("");
            me.setCompanycode("");
            me.setCompanyname("");
            me.setBranchname("");
            me.setBranchcode("");
            me.setRoleid(0);
            me.setRolename("");
            me.setFunction([]);
            me.setToken("");
            me.setOpen(false);

            me.setEmployee('');
            me.setEmployeeid(0);
            me.setUsername('');

            Ext.state.Manager.set("usercode", "");
            Ext.state.Manager.set("username", "");
            Ext.state.Manager.set("token", "");
            Ext.state.Manager.set("function", "");
            Ext.state.Manager.set("roleid", "");
            Ext.state.Manager.set("token", "");

        } catch (e) {
            logger.warn("doLogout err:" + e);
        }
    },

    doColdStart: function () {
        try {
            let me = this;
            me.clear();
            me.doLogout();
            //me.initProfile();
        } catch (e) {
            logger.warn("doColdStart err:" + e);
        }
    },


    /**
     * 檢查是否擁有這個功能權限
     */
    havePermission: function (code) {
        return this.permission.has(code) ? true : false;
    },

    getHostURL: function () {
        let me = this;
        let u = me.getApiserver();

        return u;
    },

    getPoscfg: function (item) { //回傳poscfg
        let value = "";
        let rec = antnex.app.getPoscfgStore().findRecord('item', item);
        if (rec) {
            value = rec.get("value");
        }
        return value;
    },

    // 處理權限細項設定
    getRolefunctionconfig: function (reference) { //回傳Rolefunctionconfig
        var rec = Ext.getStore('Rolefunctionconfig').getRange().find(v => v.get('reference') == reference && v.get('status') == 1);
        if (!S(rec).isEmpty()) {
            return true;
        } else {
            return false;
        }
    },

    initappinfo: function () {
        let me = this;
        let u = '';
        let appurl = '';
        let servleturl = "";
        let aHost = "";

        me.setServerhost(document.location.hostname);
        me.setWebapp(CONST_SYS_API_APP);



        try {


            switch (CONST_SYS_MODE) {
                case 0: // 本地端開發
                    me.setMasterkey("4bPaAPn7xuftP4WR3bR6ugeK");
                    aHost = "127.0.0.1:8080";

                    u = `http://${aHost}/${CONST_SYS_API_APP}/api/v1/tx`;
                    appurl = `http://${aHost}/${CONST_SYS_API_APP}`;
                    servleturl = `http://${aHost}/${CONST_SYS_API_APP}/s/v1`;
                    // frsurl = `http://smart3ctest.antnex.com.tw/frsapi`;
                    frsurl = `http://192.168.192.42:8984/frsapi`;
                    break;
                case 1: // 正式機主機
                    me.setMasterkey("frbcslOb5XjhihmUO2hfbKK2");
                    aHost = "aiot0616.antnex.com.tw:21443";

                    if (isSSLOn) {
                        u = `https://${aHost}/${CONST_SYS_API_APP}/api/v1/tx`;
                        appurl = `https://${aHost}/${CONST_SYS_API_APP}`;
                        servleturl = `https://${aHost}/${CONST_SYS_API_APP}/s/v1`;
                        frsurl = `https://nexpos.antnex.com.tw/frsapi`;
                    } else {
                        u = `http://${aHost}/${CONST_SYS_API_APP}/api/v1/tx`;
                        appurl = `http://${aHost}/${CONST_SYS_API_APP}`;
                        servleturl = `http://${aHost}/${CONST_SYS_API_APP}/s/v1`;
                        frsurl = `http://nexpos.antnex.com.tw/frsapi`;
                    }
                    break;
                case 9: // 測試機主機
                    me.setMasterkey("4bPaAPn7xuftP4WR3bR6ugeK");
                    aHost = "aiot0616.antnex.com.tw:21443";

                    if (isSSLOn) {
                        u = `https://${aHost}/${CONST_SYS_API_APP}/api/v1/tx`;
                        appurl = `https://${aHost}/${CONST_SYS_API_APP}`;
                        servleturl = `https://${aHost}/${CONST_SYS_API_APP}/s/v1`;
                        frsurl = `https://smart3ctest.antnex.com.tw/frsapi`;
                    } else {
                        u = `http://${aHost}/${CONST_SYS_API_APP}/api/v1/tx`;
                        appurl = `http://${aHost}/${CONST_SYS_API_APP}`;
                        servleturl = `http://${aHost}/${CONST_SYS_API_APP}/s/v1`;
                        frsurl = `http://smart3ctest.antnex.com.tw/frsapi`;
                    }
                    break;
                default:
                    me.setMasterkey("4bPaAPn7xuftP4WR3bR6ugeK");
                    aHost = "http://127.0.0.1:8080";

                    u = `http://${aHost}/${CONST_SYS_API_APP}/api/v1/tx`;
                    appurl = `http://${aHost}/${CONST_SYS_API_APP}`;
                    servleturl = `http://${aHost}/${CONST_SYS_API_APP}/s/v1`;
                    frsurl = `http://smart3ctest.antnex.com.tw/frsapi`;
                    break;

            }

            logger.debug("Apiserver: " + u);
            me.setApiserver(u);
            me.setAppurl(appurl);
            me.setServleturl(servleturl);
            me.setFrsurl(frsurl);
        } catch (e) {
            logger.error('AppDefaults err:' + e);
        }
    },

    updateUI: function () {
        //logger.debug("updateUI");
        try {
            let hpanels = Ext.ComponentQuery.query('panel[reference="headview_panel"]');
            if (hpanels) {
                let h = hpanels[0];
                h.getController().refreshPanel();

            }

            let bpanels = Ext.ComponentQuery.query('panel[reference="bottomview_panel"]');
            if (bpanels) {
                let b = bpanels[0];
                b.getController().refreshPanel();

            }
        } catch (e) {
            logger.error('AppDefaults/updateUI err:' + e);
        }
    },

    showMessage: function (message) {
        Ext.MessageBox.alert('AppDefaults 錯誤', message);
    }
});
