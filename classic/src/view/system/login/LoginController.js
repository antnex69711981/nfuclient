Ext.define('antnex.view.system.login.LoginController', {
    extend: 'antnex.default.defaultController',
    alias: 'controller.system-login',
    config: {
        name: '登入畫面',
        isantnex: 0,
        ishead: 0,
    },
    // function: 首次進入觸發(Override)
    initObj: function () {
        let me = this
        try {
            me.viewAccount = me.lookupReference('login_field_account');
            me.viewPassword = me.lookupReference('login_field_password');

            me.viewSubmit = me.lookupReference('login_button_submit');
        } catch (e) {
            me.showError('LoginController/ initObj error:', e);
        }
    },
    // function: 初始化頁面狀態 - 首次進入觸發(Override)
    initPageStatus: function () {
        let me = this
        try {
            const model = me.getViewModel();
            model.set('account', '');
            model.set('password', '');

            const account = 'root';
            const password = 'root';

            switch (CONST_SYS_MODE) {
                case 0:
                case 9:
                    me.viewAccount.setValue(account);
                    me.viewPassword.setValue(password);
                    break;
                case 1:
                    break;
            }
        } catch (e) {
            me.showError('LoginController/ initPageStatus error:', e);
        }
    },



    /************* view *************/
    // event: ENTER登入
    enterLogin: function (field, e) {
        let me = this
        try {
            if (e.getKey() === e.ENTER) {
                me.viewSubmit.click();
            }
        } catch (e) {
            me.showError('LoginController/ enterLogin error:', e);
        }
    },
    // button: 登入
    onSubmit: function () {
        let me = this;
        try {
            const account = me.viewAccount.getValue();
            const password = me.viewPassword.getValue();

            if (S(account).isEmpty()) throw `請輸入帳號`
            if (S(password).isEmpty()) throw `請輸入密碼`

            let form = me.lookupReference('login_form');
            if (form) {
                if (form.isValid()) {
                    me.processLogin(account, password);
                } else {
                    throw `輸入資料不符合規則`
                }
            } else {
                throw `無法存取表單資料`;
            }
        } catch (e) {
            me.showError('LoginController/ onSubmit error:', e);
        }
    },
    // function: 登入處理
    processLogin: async function (account, password) {
        let me = this;
        try {
            let uploadJSON = {
                txcode: 'BASIC_USER_LOGIN',
                code: account,
                password: password
            }

            me.getView().mask('登入中...');
            let json = await antnex.ProxyService.send(uploadJSON)
            me.getView().unmask();
            if (S(json.status).isEmpty()) throw "交易訊息資料格式有誤";
            switch (json.status) {
                case CONST_STATUS_OK:
                    let data = json.message.data;
                    antnex.AppDefaults.setConfig('userfile', data);
                    antnex.AppDefaults.setConfig('usercode', data.code);
                    antnex.AppDefaults.setConfig('username', data.name);

                    // 啟用中心管理員模式
                    ANTNEX_USER_MODE = (ROOT_USER_CODE === account) ? true : false;

                    // 同步資料
                    me.getView().mask('同步資料中...');
                    await me.syncData();

                    me.getView().mask('頁面載入中...');
                    me.gotoMenu();
                    break;
                default:
                    throw json.statusText;
            }
        } catch (e) {
            me.showError('LoginController/ processLogin error:', e);
        }
    },
    // function: 資料同步
    syncData: async function () {
        let me = this;
        try {
            let syncService = Ext.create('antnex.services.SyncService');
            await syncService.load();
        } catch (e) {
            me.getView().unmask();
            me.showError('LoginController/ syncData error:', e);
        }
    },
    // function: 進入主畫面
    gotoMenu: function () {
        let me = this;
        try {
            me.getView().mask('頁面載入中，請稍候...');
            setTimeout(() => me.redirectTo('mainmenu'), 100);
        } catch (e) {
            me.showError('LoginController/ gotoMenu error:', e);
        }
    },
});
