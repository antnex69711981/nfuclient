Ext.define('antnex.view.viewport.ViewportController', {
    extend: 'antnex.default.defaultController',
    alias: 'controller.viewport-viewport',
    config: {
        name: 'viewport',
        currentPerspective: '',
        token: '',
        tradeId: 0,
    },
    routes: {
        // ExtJS 預設主畫面
        'home': {
            // before: 'onOpenClose',
            action: 'onHomeView',
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
            // me.redirectTo('warranty');
        } catch (e) {
            me.showError('ViewportController/ onHomeView error:', e);
        }
    },
});
