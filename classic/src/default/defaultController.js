Ext.define('antnex.default.defaultController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.defaultController',
    config: {
        name: 'defaultController',
        firstEntry: true,
        afterEntry: false,
        action: '',

        catchTm: 10000,
        catch: 0,
        defaultControllerPrintlog: false,

        // 預設物件
        searchBar: null,

        // 計時器
        timerEnable: false, // 判斷是否啟用計時器
        timerInverval: 1000, // 執行間隔時間(ms)
        timerStatus: false, // 執行狀態
    },
    // event: 初始化
    onInitialize: async function () {
        let me = this;
        try {
            // 判斷是否初次載入
            let firstEntry = me.getConfig('firstEntry');
            if (firstEntry === true) {
                me.setConfig('firstEntry', false);

                /*************************** 處理顯示log ***************************/
                let alias = S(me.alias[0]).replaceAll('controller.', '').s;
                if (ANTNEX_USER_MODE) {
                    let ignorePages = ['system-mainmenu-opmanage', 'system-mainmenu', 'system-dashboard', 'unusual', 'personal'];
                    if (ignorePages.includes(alias)) {
                        me.setConfig('defaultControllerPrintlog', false);
                    } else {
                        me.setConfig('defaultControllerPrintlog', true);
                    }
                }
                let timeMark = `${me.getConfig('name')}(${alias})初始化時間: `;
                if (me.getConfig('defaultControllerPrintlog')) console.time(timeMark);
                if (me.getConfig('defaultControllerPrintlog')) console.log(`------------- ${me.getConfig('name')}(${alias}) start -------------`);

                /*************************** 進行初始化 ***************************/

                // 初始化物件
                me.initObj();

                // 刷新物件資料
                if (me.getView()) me.getView().mask(CONST_LOADING_HINT);
                await me.refreshObj();
                if (me.getView()) me.getView().unmask();

                // 重設刷新物件資料時間
                me.getRefresh();

                // 初始化POS參數
                me.initPosconfig();

                // 初始化權限細項設定
                me.initRolefunctionConfig();

                // 初始化頁面狀態
                me.initPageStatus();

                // 發動計時器
                me.doTimer();

                // 初始化視窗模式
                me.getView().fireEvent('initWindowMode', me);

                me.setConfig('afterEntry', true);

                /*************************** 結束初始化 ***************************/

                if (me.getConfig('defaultControllerPrintlog')) console.timeEnd(timeMark);
                if (me.getConfig('defaultControllerPrintlog')) console.log(`------------- ${me.getConfig('name')}(${alias}) end -------------`);
            };
        } catch (e) {
            me.showError(`defaultController/ onInitialize error: `, e);
        }
    },
    // event: 頁面切換
    onInitializeActivate: async function () {
        let me = this;
        try {
            // 判斷是否初次載入
            let afterEntry = me.getConfig('afterEntry');
            if (afterEntry === true) {

                /*************************** 處理顯示log ***************************/
                let alias = S(me.alias[0]).replaceAll('controller.', '').s;
                if (me.getConfig('defaultControllerPrintlog')) console.log(`------------- ${me.getConfig('name')}(${alias}) start -------------`);

                /*************************** 進行資料刷新 ***************************/

                let doRefresh = me.getRefresh();
                if (doRefresh) {
                    if (me.getView()) me.getView().mask(CONST_LOADING_HINT);
                    await me.refreshObj();
                    if (me.getView()) me.getView().unmask();
                };

                // 發動計時器
                me.doTimer();

                /*************************** 結束資料刷新 ***************************/

                if (me.getConfig('defaultControllerPrintlog')) console.log(`------------- ${me.getConfig('name')}(${alias}) end -------------`);
            }
        } catch (e) {
            me.showError(`defaultController/ onInitialize error: `, e);
        }
    },
    // function: 取得是否刷新資料
    getRefresh: function () {
        let me = this;
        try {
            let now = new Date().getTime();
            let lastTm = me.getConfig('catch');
            let catchTm = me.getConfig('catchTm');
            if (now > lastTm) {
                me.setConfig('catch', (now + catchTm));
                return true;
            } else if (me.getConfig('defaultControllerPrintlog')) {
                console.log(`${me.getConfig('name')} - defaultController.Catch還有: ${lastTm - now}ms`)
            }
            return false;
        } catch (e) {
            return me.showError(`defaultController/ getRefresh error: `, e);
        }
    },

    /************* 初始化區塊 *************/
    /**
     * initObj()
     * > refreshObj()
     * > initPosconfig()
     * > initRolefunctionConfig()
     * > initPageStatus()
     * > finish
     */
    // function: 初始化物件 - 首次進入觸發(Override)
    initObj: function () {
        let me = this
        try {
            if (me.getConfig('defaultControllerPrintlog')) {
                console.log(`${me.getConfig('name')} - defaultController.initObj()`);
            }
        } catch (e) {
            me.showError('defaultController/ initObj error:', e);
        }
    },
    // function: 載入物件資料 - 每次進入觸發(Override)
    refreshObj: async function () {
        let me = this
        try {
            if (me.getConfig('defaultControllerPrintlog')) {
                console.log(`${me.getConfig('name')} - defaultController.refreshObj()`);
            }
        } catch (e) {
            me.showError('defaultController/ refreshObj error:', e);
        }
    },
    // function: 初始化POS參數 - 首次進入觸發(Override)
    initPosconfig: function () {
        let me = this
        try {
            if (me.getConfig('defaultControllerPrintlog')) {
                console.log(`${me.getConfig('name')} - defaultController.initPosconfig()`);
            }
        } catch (e) {
            me.showError('defaultController/ initPosconfig error:', e);
        }
    },
    // function: 初始化角色權限細項 - 首次進入觸發(Override)
    initRolefunctionConfig: function () {
        let me = this
        try {
            if (me.getConfig('defaultControllerPrintlog')) {
                console.log(`${me.getConfig('name')} - defaultController.initRolefunctionConfig()`);
            }
        } catch (e) {
            me.showError('defaultController/ initRolefunctionConfig error:', e);
        }
    },
    // function: 初始化頁面狀態 - 首次進入觸發(Override)
    initPageStatus: function () {
        let me = this
        try {
            if (me.getConfig('defaultControllerPrintlog')) {
                console.log(`${me.getConfig('name')} - defaultController.initPageStatus()`);
            }
        } catch (e) {
            me.showError('defaultController/ initPageStatus error:', e);
        }
    },
    // function: 計時器
    doTimer: function () {
        let me = this
        try {
            if (me.getConfig('timerEnable') == false) return;
            if (me.getConfig('timerStatus') == true) return;

            if (me.getConfig('defaultControllerPrintlog')) {
                console.log(`${me.getConfig('name')} - defaultController.doTimer()`);
            }

            let getView = me.getView();
            let opmanage = getView ? getView.up('system-mainmenu-opmanage') : null;
            let ctrl = opmanage ? opmanage.getController() : null;
            let mainTab = ctrl.viewBody;
            let isEnable = function () {
                // 判斷是否為主頁面內容, 若是則依照目前顯示頁面暫停/啟用
                let activeView = mainTab ? mainTab.getActiveTab() : null;
                let timerEnable = me.getView() ? me.getView() == activeView : true;
                return me.destroyed ? false : timerEnable;
            }

            let timer = async function () {
                me.setConfig('timerStatus', isEnable());
                if (me.getConfig('timerStatus')) {
                    await me.timerFn();
                    setTimeout(timer, me.getConfig('timerInverval'));
                } else if (me.getConfig('defaultControllerPrintlog')) {
                    console.log(`${me.getConfig('name')} - defaultController.timerFn() stop`);
                }
            }

            timer();

        } catch (e) {
            me.showError('defaultController/ doTimer error:', e);
        }
    },
    // function: 計時器執行內容
    timerFn: async function () {
        let me = this
        try {
            if (me.getConfig('defaultControllerPrintlog')) {
                console.log(`${me.getConfig('name')} - defaultController.timerFn()`);
            }
        } catch (e) {
            me.showError('defaultController/ timerFn error:', e);
        }
    },

    /************* hotkey *************/
    // function: 快捷鍵
    hotkey: function (keyCode, ctrlKey, shiftKey, altKey) {
        let me = this;
        try {
            let object;
            let e = Ext.event.Event;
            if (me.getConfig('defaultControllerPrintlog')) {
                console.log(`${me.getConfig('name')} - defaultController.hotkey() => ${e.getKeyId(keyCode)}`);
            }
            switch (keyCode) {
                case e.F10: // 查詢列
                    object = me.bindDefaultObject('funcbarSearch');
                    if (object) object.click();
                    break;
                case e.F2: // 新增
                    object = me.bindDefaultObject('funcbarAdd');
                    if (object) object.click();
                    break;
                case e.F4: // 修改
                    object = me.bindDefaultObject('funcbarEdit');
                    if (object) object.click();
                    break;
                case e.F8: // 儲存
                    object = me.bindDefaultObject('funcbarSave');
                    if (object) object.click();
                    break;
                case e.S: // 儲存
                    object = me.bindDefaultObject('funcbarSave');
                    if (object && ctrlKey) object.click();
                    break;
                case e.F9: // 取消
                    object = me.bindDefaultObject('funcbarCancel');
                    if (object) object.click();
                    break;
                case e.ESC: // 取消
                    object = me.bindDefaultObject('funcbarCancel');
                    if (object) object.click();
                    break;
                case e.UP: // 上筆
                    object = me.bindDefaultObject('funcbarPrevious');
                    if (object && shiftKey) object.click();
                    break;
                case e.DOWN: // 下筆
                    object = me.bindDefaultObject('funcbarNext');
                    if (object && shiftKey) object.click();
                    break;
                case e.LEFT: // 最前一筆
                    object = me.bindDefaultObject('funcbarFirst');
                    if (object && shiftKey) object.click();
                    break;
                case e.RIGHT: // 最後一筆
                    object = me.bindDefaultObject('funcbarLast');
                    if (object && shiftKey) object.click();
                    break;
                case e.F: // 儲存
                    if (shiftKey) me.fullScreen();
                    break;
                default:
                    if (me.getConfig('defaultControllerPrintlog')) {
                        console.log(`未定義: ${keyCode} `);
                    }
                    break;
            }
        } catch (e) {
            me.showError('defaultController/ hotkey error:', e);
        }
    },

    // function: 全螢幕切換
    fullScreen: function () {
        let me = this;
        try {
            if (me.getConfig('defaultControllerPrintlog')) {
                console.log(`${me.getConfig('name')} - defaultController.fullScreen()`);
            }
            let isFullscreen = antnex.AppDefaults.getConfig('isFullscreen');
            antnex.AppDefaults.setConfig('isFullscreen', !isFullscreen);

            let opmanage = Ext.ComponentQuery.query('container[reference="view_system_opmanage"]')[0];
            if (opmanage) {
                let opmanageController = opmanage.getController();

                let hidden = isFullscreen ? false : true;
                opmanageController.viewLeftmenu.setHidden(hidden)
                opmanageController.viewBody.tabBar.setHidden(hidden)
                opmanageController.viewHeader.setHidden(hidden)

                if (hidden) {
                    let msg = `進入全螢幕模式, 請按「Shift + F」退出`;
                    me.toastMsg(msg);
                }
            }
        } catch (e) {
            me.showError('defaultController/ fullScreen error:', e);
        }
    },

    /************* 取得預設物件 *************/
    // function: 取得預設物件, 優先順序: me.getConfg(name) > me._name > me.name
    bindDefaultObject: function (name) {
        let me = this;
        let object = null;
        try {
            if (me.getConfig('defaultControllerPrintlog')) {
                console.log(`${me.getConfig('name')} - defaultController.bindDefaultObject() - ${name}`);
            }

            object = object ? object : me.getConfig(name);
            object = object ? object : me[`_${name}`];
            object = object ? object : me[name];
        } catch (e) {
            me.showError('defaultController/ bindDefaultObject error:', e);
        }
        return object
    },

    /************* funcbar *************/
    // button: 查詢列收合/展開: 預設物件 me.searchBar
    funcbar_search: function () {
        let me = this;
        try {
            if (me.getConfig('defaultControllerPrintlog')) {
                console.log(`${me.getConfig('name')} - defaultController.funcbar_search()`);
            }

            let object = me.bindDefaultObject('searchBar');
            if (object) me.slideIO(object, 't');
        } catch (e) {
            me.showError('defaultController/ funcbar_search error:', e);
        }
    },

    /*************** searchbar ***************/
    // event: ENTER查詢
    enterSearch: function (field, e) {
        let me = this
        try {
            if (me.getConfig('defaultControllerPrintlog')) {
                console.log(`${me.getConfig('name')} - defaultController.enterSearch()`);
            }

            if (e.getKey() == e.ENTER) {
                me.doSearch();
            }
        } catch (e) {
            me.showError('defaultController/ enterSearch error:', e);
        }
    },
    // button: 查詢
    doSearch: async function () {
        let me = this
        try {
            if (me.getConfig('defaultControllerPrintlog')) {
                console.log(`${me.getConfig('name')} - defaultController.doSearch()`);
            }

            me.showMessage('查詢功能尚未設定: defaultController.doSearch()');
        } catch (e) {
            me.showError('defaultController/ doSearch error:', e);
        }
    },
    // button: 清除
    cleanSearch: function () {
        let me = this
        try {
            if (me.getConfig('defaultControllerPrintlog')) {
                console.log(`${me.getConfig('name')} - defaultController.cleanSearch()`);
            }

            me.showMessage('清除功能尚未設定: defaultController.cleanSearch()');
        } catch (e) {
            me.showError('defaultController/ cleanSearch error:', e);
        }
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

    /************* 滑動效果 *************/
    slideIO: function (target, direction = 't') {
        let me = this
        try {
            if (me.getConfig('defaultControllerPrintlog')) {
                console.log(`${me.getConfig('name')} - defaultController.slideIO()`);
            }
            if (target) {
                let el = target.getEl();
                if (typeof target.setHidden == 'function') {
                    let hideTarget = function () {
                        if (target.getHeight() == 0) {
                            target.setHidden(true);
                        } else {
                            setTimeout(() => hideTarget(), 1);
                        }
                    }

                    let hidden = target.hidden;
                    if (hidden) {
                        el.slideIn(direction);
                        target.setHidden(false);
                    } else {
                        el.slideOut(direction);
                        hideTarget();
                    }
                }
            }
        } catch (e) {
            me.showError('defaultController/ slideIO error:', e);
        }
    },

    /************* grid展開/收合 *************/
    // button: 展開
    expandAll: function (click, e, owner) {
        let me = this
        if (me.getConfig('defaultControllerPrintlog')) {
            console.log(`${me.getConfig('name')} - defaultController.expandAll()`);
        }

        let feature = owner.ownerCt.view.findFeature('antGrouping');
        if (feature) {
            feature.expandAll();
        }
    },
    // button: 收合
    collapseAll: function (click, e, owner) {
        let me = this
        if (me.getConfig('defaultControllerPrintlog')) {
            console.log(`${me.getConfig('name')} - defaultController.collapseAll()`);
        }

        let feature = owner.ownerCt.view.findFeature('antGrouping');
        if (feature) {
            feature.collapseAll();
        }
    },

    /************* toast *************/
    toastMsg: function (html = '', styled = false, align = 'b', autoCloseDelay = 5000) {
        let me = this;

        if (me.getConfig('defaultControllerPrintlog')) {
            console.log(`${me.getConfig('name')} - defaultController.toastMsg()`);
        }

        let removeToast = function (id) {
            if (me.toastObj && me.toastObj.id == id) {
                me.toastObj.setHidden(true);
                me.toastObj.destroy();
                me.toastObj = null;
            }
        }

        if (me.toastObj) removeToast(me.toastObj.id);

        html = styled ? html : `<span style="font-size:24px; color:rgb(75,75,75); vertical-align: middle;">${html}</span>`
        me.toastObj = Ext.toast({
            html: html,
            align: align,
            border: false,
            cls: 'antToast',
            style: 'border: 3px solid #2786dc; margin-top: -40px;',
            autoCloseDelay: autoCloseDelay
        });

        setTimeout(() => {
            removeToast(me.toastObj.id);
        }, autoCloseDelay);

        return me.toastObj;
    },

    /************* window *************/
    // function: 開啟window
    doOpenWindow: function (view, config = {}) {
        let me = this
        let win = null;
        try {
            if (me.getConfig('defaultControllerPrintlog')) {
                console.log(`${me.getConfig('name')} - defaultController.doOpenWindow()`);
            }

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
                        closeToolText: '關閉',
                        dockedItems: dockedItems
                    });
                } else {
                    win = Ext.create('antnex.subsystem.mainmenu.window.WindowContainer', {
                        controller: view.getController(),
                        title: view.getController().getConfig('name'),
                        height: view.getController().getConfig('height'),
                        width: view.getController().getConfig('width'),
                        modal: modal,
                        closeToolText: '關閉',
                    });
                }

                if (win) {
                    win.add(view);
                    win.doResize();
                    win.show();
                }
            }
        } catch (e) {
            me.showError('defaultController/ doOpenWindow error:', e);
        }
        return win;
    },
    // function: 空白事件
    emptyFunction: function () {
        /* do nothing */
    },


    /************* 提示訊息 *************/
    // function:提示訊息
    showMessage: function (message) {
        Ext.Msg.alert(`${this.getConfig('name')} `, message);
    },
    // function:錯誤訊息
    showError: function (path, e) {
        if (this.getConfig('defaultControllerPrintlog')) {
            console.log(path + e);
        }
        this.showMessage(e);
        return false;
    },
});