Ext.define('antnex.format.EmptyController', {
    extend: 'antnex.default.defaultController',
    alias: 'controller.emptyController',
    config: {
        name: 'empty@app',
    },
    /************* extend 預載方法 *************/
    // function: 初始化物件 - 首次進入觸發 @Override
    initObj: function () {
        let me = this
        try {

        } catch (e) {
            me.showError('EmptyController/ initObj error:', e);
        }
    },
    // function: 刷新物件資料 - 重複觸發 @Override
    refreshObj: function () {
        let me = this
        try {

        } catch (e) {
            me.showError('EmptyController/ refreshObj error:', e);
        }
    },



    /************* window *************/
    // function: 開啟window
    doOpenWindow: function (view, config = {}) {
        let me = this
        let win = null;
        try {
            if (view) {
                let modal = config.modal == null ? true : false;
                let dockedItems = config.dockedItems;

                // 建立window
                if (dockedItems) {
                    win = Ext.create('antnex.subsystem.mainmenu.window.WindowContainer', {
                        controller: view.getController(),
                        title: view.getController().getConfig('name'),
                        height: view.getController().getConfig('height'),
                        width: view.getController().getConfig('width'),
                        modal: modal,
                        dockedItems: dockedItems
                    });
                } else {
                    win = Ext.create('antnex.subsystem.mainmenu.window.WindowContainer', {
                        controller: view.getController(),
                        title: view.getController().getConfig('name'),
                        height: view.getController().getConfig('height'),
                        width: view.getController().getConfig('width'),
                        modal: modal,
                    });
                }

                if (win) {
                    win.add(view);
                    win.doResize();
                    win.show();
                }
            }
        } catch (e) {
            me.showError('EmptyController/ doOpenWindow error:', e);
        }
        return win;
    },
    // function: 空白事件
    emptyFunction: function () { /* do nothing */ },
});