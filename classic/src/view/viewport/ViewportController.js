Ext.define('antnex.view.viewport.ViewportController', {
    extend: 'antnex.default.defaultController',
    alias: 'controller.viewport-viewport',
    config: {
        name: 'viewport',
        currentPerspective: '',
    },
    /**
     * routes流程:
     * home(預設) -> 轉跳至預設頁面
     * login -> 登入: 若未開機會倒回至terminals
     * mainmenu -> 內部系統: 若未開機會倒回至terminals, 若未登入會倒回至login
     */
    // routes相關檔案放在view.system裡面
    routes: {
        // ExtJS 預設主畫面
        'home': {
            action: 'onHomeView',
        },

        'login': {
            action: 'onLoginView',
        },

        'mainmenu': {
            // before: 'onAuthenticate',
            action: 'onMainmenuView',
        },
    },
    /************* 初始化 *************/
    // function: 首次進入觸發(Override)
    initObj: function () {
        let me = this
        try {
            me.viewBody = me.lookupReference('view_viewport_body');
        } catch (e) {
            me.showError('ViewportController/ initObj error:', e);
        }
    },
    // event: config('currentPerspective')更新時觸發
    updateCurrentPerspective: function (newPerspective, oldPerspective) {
        let me = this;
        try {
            if (S(newPerspective).isEmpty()) return;
            console.log(`${oldPerspective} => ${newPerspective}`)
            if (newPerspective !== oldPerspective) {
                let newWidget = Ext.ClassManager.getByAlias(`widget.${newPerspective}`)
                if (newWidget) {
                    me.viewBody.removeAll();
                    me.viewBody.add({ xtype: newPerspective })
                } else {
                    me.showMessage(`畫面定義別名不存在: ${newPerspective}`);
                }
            }
        } catch (e) {
            me.showError('ViewportController/ updateCurrentPerspective error:', e);
        }
    },

    /************* routes *************/
    // routes - action: ExtJS預設主畫面
    onHomeView: function () {
        let me = this;
        try {
            // 重新導向至 login
            me.redirectTo('login')
        } catch (e) {
            me.showError('ViewportController/ onHomeView error:', e);
        }
    },
    // routes - before: 認證檢查
    onAuthenticate: function (action) {
        let me = this;
        try {
            let isPass = S(antnex.AppDefaults.getConfig('userfile')).isEmpty() == false;

            if (isPass) {
                console.log('認證成功', antnex.AppDefaults.getConfig('userfile'))
                action.resume();
            } else {
                console.log('認證失敗', antnex.AppDefaults.getConfig('userfile'))
                action.stop();
                me.redirectTo('login');
            }
        } catch (e) {
            me.showError('ViewportController/ onAuthenticate error:', e);
        }
    },
    // routes - action: 登入畫面
    onLoginView: function () {
        let me = this;
        try {
            me.setConfig('currentPerspective', 'system-login');
        } catch (e) {
            me.showError('ViewportController/ onLoginView error:', e);
        }
    },
    // routes - action: 主功能畫面
    onMainmenuView: function () {
        let me = this;
        try {
            me.setConfig('currentPerspective', 'system-mainmenu');
        } catch (e) {
            me.showError('ViewportController/ onMainmenuView error:', e);
        }
    },
});
