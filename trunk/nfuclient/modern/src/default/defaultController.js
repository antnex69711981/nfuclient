Ext.define('antnex.default.defaultController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.defaultController',
    config: {
        name: 'defaultController',
        firstEntry: true,
    },
    // event: 初始化
    onInitialize: function () {
        let me = this;
        try {
            // me.showMessage('defaultController/ onInitialize start');
            if (me.getConfig('firstEntry')) {
                me.setConfig('firstEntry', false);
                me.initObj();
            }
            me.refreshObj();
            me.enableConfig();
        } catch (e) {
            me.showError(`defaultController/ onInitialize error:`, e);
        }
    },
    // function: 初始化物件
    initObj: function () {
        let me = this
        try {

        } catch (e) {
            me.showError('defaultController/ initObj error:', e);
        }
    },
    // function: 重新載入物件
    refreshObj: function () {
        let me = this
        try {

        } catch (e) {
            me.showError('defaultController/ refreshObj error:', e);
        }
    },
    // function: 套用Config設定
    enableConfig: function () {
        let me = this
        try {

        } catch (e) {
            me.showError('defaultController/ enableConfig error:', e);
        }
    },

    /************* menu *************/
    // function: 開啟menu
    doOpenMenu: function (view = undefined) {
        let me = this;
        let win = null;
        try {
            if (view) {
                // config: 開啟方向
                let side = 'left';
                if (view.getController().getConfig('side')) side = view.getController().getConfig('side');
                // config: 是否覆蓋
                let cover = true;
                if (view.getController().getConfig('cover') == false) cover = view.getController().getConfig('cover');
                // config: 視窗高度
                let windowHeight = '100%';
                if (view.getController().getConfig('windowHeight')) windowHeight = view.getController().getConfig('windowHeight');
                // config: 視窗寬度
                let windowWidth = '80%';
                if (view.getController().getConfig('windowWidth')) windowWidth = view.getController().getConfig('windowWidth');
                // config: 功能高度
                let pageHeight = '100%';
                if (view.getController().getConfig('pageHeight')) pageHeight = view.getController().getConfig('pageHeight');
                // config: 功能寬度
                let pageWidth = '100%';
                if (view.getController().getConfig('pageWidth')) pageWidth = view.getController().getConfig('pageWidth');

                // 判斷是否已經有同個方向的Menu，若有則先移除
                let menu = Ext.Viewport.getMenus();
                if (menu.side) {
                    Ext.Viewport.setMenus(delete menu[side]);
                }

                // 創建一個WindowContainer
                win = Ext.create('antnex.ipos.subsystem.window.WindowContainer', {
                    controller: view.getController(),
                    height: pageHeight,
                    width: pageWidth,
                });

                if (win) {
                    // WindowContainer加入view
                    win.add(view);

                    // 指定Menu內的物件
                    var obj = {
                        height: windowHeight, // 視窗高度
                        width: windowWidth, // 視窗寬度
                        padding: 0, // 視窗內縮
                        items: win,
                        listeners: {
                            // 獲取離開視窗的event
                            hiddenchange: function (sender, value, oldValue, eOpts) {
                                let me = this;
                                try {
                                    if (value) {
                                        // 離開視窗destroy掉 (不destroy會可以直接被拉出來)
                                        if (typeof win.getController().onLeaveWindow != 'function') {
                                            Ext.Msg.alert(`hiddenchange`, 'Menu未正確設置，無法執行WindowContainer:onLeaveWindow()，請檢查!');
                                        } else {
                                            let win = me.items.items[0];
                                            win.getController().onLeaveWindow();
                                        }
                                    }
                                } catch (e) {
                                    Ext.Msg.alert(`menu/ hiddenchange error:`, e);
                                }
                            }
                        }
                    };

                    // 設置Menu
                    Ext.Viewport.setMenu(obj, {
                        side: side,  // Menu方向
                        cover: cover,    // Menu是否覆蓋

                    });

                    // 開啟Menu
                    Ext.Viewport.toggleMenu(side);
                }

                // 預設cfg => 供複製使用
                // let cfg = {
                //     side: 'left', // menu顯示方向
                //     cover: true, // menu是否可以覆蓋頁面
                //     windowHeight: '100%', // menu高
                //     windowWidth: '80%', // menu寬
                //     pageHeight: '100%', // 功能高
                //     pageWidth: '100%', // 功能寬
                // }
            } else {
                me.showMessage(`view不存在`);
            }
        } catch (e) {
            me.showError('defaultController/ doOpenMenu error:', e);
        }
    },

    /************* toast *************/
    toastMsg: function (html = '', styled = false, align = 'b', autoCloseDelay = 5000) {
        let me = this;

        if (me.getConfig('defaultControllerPrintlog')) {
            console.log(`${me.getConfig('name')} - defaultController.toastMsg()`);
        }

        let removeToast = function () {
            if (me.toastObj) {
                me.toastObj.setHidden(true);
                me.toastObj.destroy();
                me.toastObj = null;
            }
        }

        removeToast();

        html = styled ? html : `<span style="font-size:24px; color:rgb(75,75,75); vertical-align: middle;">${html}</span>`
        me.toastObj = Ext.toast({
            html: html,
            align: align,
            border: false,
            cls: 'antToast',
            style: 'border: 3px solid #2786dc; margin-top: -40px;',
            autoCloseDelay: autoCloseDelay
        });

        setTimeout(removeToast, autoCloseDelay);

        return me.toastObj;
    },

    /************* 音效 *************/
    // function: 播放音效
    playAudio: function (type = '') {
        let me = this
        try {
            if (me.getConfig('defaultControllerPrintlog')) {
                console.log(`${me.getConfig('name')} - defaultController.playAudio()`);
            }
            let view = me.getView();
            if (view) {
                switch (type) {
                    case 'Success':
                        view.setHtml('<audio autoplay><source src="resources/audio/prompt.mp3" type="audio/mpeg"></audio>');
                        break;
                    case 'Fail':
                        view.setHtml('<audio autoplay><source src="resources/audio/crash.mp3" type="audio/mpeg"></audio>');
                        break;
                }
            }
        } catch (e) {
            me.showError('defaultController/ refreshObj error:', e);
        }
    },

    /************* 提示訊息 *************/
    // function:提示訊息
    showMessage: function (message) {
        Ext.Msg.defaultAllowedConfig.showAnimation = false;
        Ext.Msg.defaultAllowedConfig.hideAnimation = false;
        Ext.Msg.alert(`${this.getConfig('name')}`, message);
    },
    // function:錯誤訊息
    showError: function (path, e) {
        console.log(path + e);;
        this.showMessage(e);
    },
});