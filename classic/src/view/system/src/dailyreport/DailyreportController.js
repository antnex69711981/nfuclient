Ext.define('antnex.view.system.src.dailyreport.DailyreportController', {
    extend: 'antnex.default.defaultController',
    alias: 'controller.dailyreport',
    requires: [],
    config: {
        name: '主系統',
    },
    // function: 首次進入觸發(Override)
    initObj: function () {
        let me = this
        try {
            me.viewBody = me.lookupReference('view_mainmenu_body');

            me.switchBodyCard('system-mainmenu-opmanage');
        } catch (e) {
            me.showError('MainmenuController/ initObj error:', e);
        }
    },
    // function: 每次進入觸發(Override)
    refreshObj: async function () {
        let me = this
        try {
            let isLogin = antnex.AppDefaults.isLogin();
            if (isLogin) {
                console.log('login');
            } else {
                me.redirectTo('login');
            }
        } catch (e) {
            me.showError('MainmenuController/ refreshObj error:', e);
        }
    },

    /************* view *************/
    // function: 切換bodyCard
    switchBodyCard: function (xtype) {
        let me = this;
        try {
            let newWidget = Ext.ClassManager.getByAlias(`widget.${xtype}`)
            if (newWidget) {
                let idx = me.viewBody.items.items.findIndex(e => e.xtype == xtype);
                if (idx == -1) {
                    me.viewBody.add({ xtype: xtype })
                    idx = me.viewBody.items.items.findIndex(e => e.xtype == xtype);
                }

                if (idx == -1) throw `未定義畫面: ${xtype}`;

                me.viewBody.setActiveItem(idx)
            } else {
                throw `畫面定義別名不存在: ${xtype}`
            }

        } catch (e) {
            me.showError('MainmenuController/ switchBodyCard error: ', e);
        }
    }
});
