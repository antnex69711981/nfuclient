Ext.define('antnex.view.system.window.WindowContainerController', {
    extend: 'antnex.default.defaultController',
    alias: 'controller.WindowContainerController',
    config: {
        name: 'WindowContainerController',
        width: 200,
        height: 200,
        controller: null,
        returnFunction: 'emptyFunction', // type controller[returnFunction] == function
        closeAfterReturn: true,
        saveBtnText: '確定',
        cancelBtnText: '取消',
    },
    // event: 初始化
    onInitialize: async function () {
        let me = this;
        try {
            let btnSave = me.lookupReference('btn_windowcontainer_save');
            let btnCancel = me.lookupReference('btn_windowcontainer_cancel');

            if (btnSave) {
                let txt = me.getConfig('saveBtnText');
                btnSave.setText(txt);
                if (S(txt).isEmpty()) {
                    btnSave.setHidden(true);
                }
            }

            if (btnCancel) {
                let txt = me.getConfig('cancelBtnText');
                btnCancel.setText(txt);
                if (S(txt).isEmpty()) {
                    btnCancel.setHidden(true);
                }
            }

            /*************************** 進行初始化 ***************************/

            // 初始化物件
            me.initObj();

            // 刷新物件資料
            if (me.getView()) me.getView().mask(CONST_LOADING_HINT);
            await me.refreshObj();
            if (me.getView()) me.getView().unmask();

            // 重設刷新物件資料時間
            me.getRefresh();

            // 初始化視窗參數
            me.enableConfig();

            // 初始化POS參數
            me.initPosconfig();

            // 初始化權限細項設定
            me.initRolefunctionConfig();

            // 初始化頁面狀態
            me.initPageStatus();

            // 發動計時器
            me.doTimer();

            /*************************** 結束初始化 ***************************/
        } catch (e) {
            me.showError(`WindowContainerController/ onInitialize error:`, e);
        }
    },



    /************* 初始化區塊 *************/
    /**
     * initObj()
     * > refreshObj()
     * > enableConfig()
     * > initPosconfig()
     * > initRolefunctionConfig()
     * > initPremitConfig()
     * > initPageStatus()
     * > finish
     */
    // function: 初始化物件 - 首次進入觸發(Override)
    initObj: function () {
        let me = this
        try {

        } catch (e) {
            me.showError('WindowContainerController/ initObj error:', e);
        }
    },
    // function: 載入物件資料 - 首次進入觸發(Override)
    refreshObj: async function () {
        let me = this
        try {

        } catch (e) {
            me.showError('WindowContainerController/ refreshObj error:', e);
        }
    },
    // function: 套用Config設定 - 首次進入觸發(Override)
    enableConfig: function () {
        let me = this
        try {

        } catch (e) {
            me.showError('WindowContainerController/ enableConfig error:', e);
        }
    },
    // function: 初始化POS參數 - 首次進入觸發(Override)
    initPosconfig: function () {
        let me = this
        try {

        } catch (e) {
            me.showError('WindowContainerController/ initPosconfig error:', e);
        }
    },
    // function: 初始化角色權限細項 - 首次進入觸發(Override)
    initRolefunctionConfig: function () {
        let me = this
        try {

        } catch (e) {
            me.showError('WindowContainerController/ initRolefunctionConfig error:', e);
        }
    },
    // function: 初始化頁面狀態 - 首次進入觸發(Override)
    initPageStatus: function () {
        let me = this
        try {

        } catch (e) {
            me.showError('WindowContainerController/ initPageStatus error:', e);
        }
    },
    // function: 計時器
    doTimer: function () {
        let me = this
        try {
            if (me.getConfig('timerEnable') == false) return;
            if (me.getConfig('timerStatus') == true) return;

            let timer = async function () {
                me.setConfig('timerStatus', me.destroyed);
                if (me.getConfig('timerStatus')) {
                    await me.timerFn();
                    setTimeout(timer, me.getConfig('timerInverval'));
                }
            }

            timer();

        } catch (e) {
            me.showError('WindowContainerController/ doTimer error:', e);
        }
    },
    // function: 計時器執行內容
    timerFn: async function () {
        let me = this
        try {

        } catch (e) {
            me.showError('WindowContainerController/ timerFn error:', e);
        }
    },


    /************* 視窗功能 *************/
    // button:確定
    doSave: function () {
        let me = this;
        try {
            let classlist = this.$className.split('.');
            let classname = classlist[classlist.length - 1];
            me.showMessage(`請於「${classname}」重新定義doSave方法並執行me.doReturn(data)以回傳資料`);
        } catch (e) {
            me.showError('WindowContainerController/ doSave error:', e);
        }
    },
    doReturn: function (data) {
        let me = this;
        try {
            let controller = me.getConfig('controller');
            let returnFunction = me.getConfig('returnFunction');

            if (controller == null) {
                throw `尚未設定回傳Controller: ${controller}`;
            }

            if (returnFunction == null) {
                throw `尚未設定回傳方法: ${returnFunction}`;
            }

            if (data == null) {
                throw `無回傳資料: ${data}`;
            }

            if (typeof controller[returnFunction] != 'function') {
                throw `回傳型別錯誤: ${typeof controller[returnFunction]}`;
            }

            if (me.getConfig('closeAfterReturn')) {
                me.closeWindow();
                controller[returnFunction](data);
            } else {
                controller[returnFunction](data, me);
            }
        } catch (e) {
            me.showError('WindowContainerController/ doReturn error:', e);
        }
    },
    // button:取消
    doCancel: function () {
        let me = this;
        try {
            me.closeWindow();
        } catch (e) {
            me.showError('WindowContainerController/ doCancel error:', e);
        }
    },
    // function:關閉編輯視窗
    closeWindow: function () {
        let me = this;
        try {
            let win = me.getView();
            if (win.xtype != 'windowcontainer') {
                win = me.getView().up('panel');
            }
            win.setHidden(true);
            setTimeout(() => {
                win.destroy();
            }, 100);
        } catch (e) {
            me.showError('WindowContainerController/ closeWindow error:', e);
        }
    },
});