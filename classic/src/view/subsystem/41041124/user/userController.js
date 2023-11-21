Ext.define('antnex.subsystem.41041124.user.userController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.page-41041124-user',
    requires: [],
    config: {
        name: '41041124-管理',

        action: null,
        requireKeylist: [],
    },
    // event: 初始化
    onInitialize: async function() {
        let me = this;
        try {
            console.log(`userController/ onInitialize entry`);
            me.initObj();
            await me.refreshObj();
            me.initPageStatus();
        } catch (e) {
            me.showError(`userController/ onInitialize error: `, e);
        }
    },
    // event: 頁面切換
    onActivate: async function() {
        const me = this;
        try {
            console.log(`userController/ onActivate entry`);
        } catch (e) {
            me.showError(`userController/ onActivate error: `, e);
        }
    },
    // function: 初始化物件 - 首次進入觸發(Override)
    initObj: function() {
        let me = this
        try {
            // 功能列(新增、修改、儲存、取消儲存 的按鈕)
            me.funcbarSearch = me.lookupReference('btn-41041124-user-funcbar-search');
            me.funcbarAdd = me.lookupReference('btn-41041124-user-funcbar-add');
            me.funcbarEdit = me.lookupReference('btn-41041124-user-funcbar-edit');
            me.funcbarSave = me.lookupReference('btn-41041124-user-funcbar-save');
            me.funcbarCancel = me.lookupReference('btn-41041124-user-funcbar-cancel');

            // 查詢列(針對特定條件進行查詢)
            me.searchBar = me.lookupReference('panel-41041124-user-searchbar');
            me.searchCode = me.lookupReference('txt-41041124-user-searchbar-code');
            me.searchName = me.lookupReference('txt-41041124-user-searchbar-name');
            me.searchMail = me.lookupReference('txt-41041124-user-searchbar-mail');
            me.searchMemo = me.lookupReference('txt-41041124-user-searchbar-memo');
            me.searchStatus = me.lookupReference('cmbx-41041124-user-searchbar-status');
            me.searchCreateusercode = me.lookupReference('txt-41041124-user-searchbar-createusercode');
            me.searchCreatetm = me.lookupReference('txt-41041124-user-searchbar-createtm');

            // 主畫面
            me.viewUserlist = me.lookupReference('grid-41041124-user-userlist');
            me.viewUserManage = me.lookupReference('panel-41041124-user-manage');

            // 列值抓取 (資料維護的資料)
            me.viewCode = me.lookupReference('txt-41041124-user-code');
            me.viewName = me.lookupReference('txt-41041124-user-name');
            me.viewMail = me.lookupReference('txt-41041124-user-mail');
            me.viewPassword = me.lookupReference('txt-41041124-user-password');
            me.viewMemo = me.lookupReference('txt-41041124-user-memo');
            me.viewStatus = me.lookupReference('cmbx-41041124-user-status');
        } catch (e) {
            me.showError('userController/ initObj error:', e);
        }
    },
    // function: 載入物件資料 - 每次進入觸發(Override)
    refreshObj: async function() {
        let me = this
        try {
            let data = [{
                code: 'admin_user',
                name: '系統管理員',
                mail: 'xxx@gmail.com',
                password: '123',
                memo: '測試',
                createusercode: 'admin',
                createtm: '2023,11,10',
                status: 1,
            }, {
                code: '41041124',
                name: '林裕翔',
                mail: 'a55472016@gmail.com',
                password: '123',
                memo: 'brian',
                createusercode: 'root',
                createtm: '2023,11,11',
                status: 9,
            }]
            me.viewUserlist.getStore().loadData(data);
        } catch (e) {
            me.showError('userController/ refreshObj error:', e);
        }
    },
    // function: 初始化頁面狀態 - 首次進入觸發(Override)
    initPageStatus: function() {
        const me = this;
        try {
            me.cleanSearch();
            me.changeStatus('view');

        } catch (e) {
            me.showError('userController/ initPageStatus error:', e);
        }
    },


    /************* 頁面事件 *************/
    // function: 停用所有需要停用的物件
    disabledAll: function() {
        const me = this;
        try {
            // 功能列
            me.funcbarSearch.setDisabled(true);
            me.funcbarAdd.setDisabled(true);
            me.funcbarEdit.setDisabled(true);
            me.funcbarSave.setDisabled(true);
            me.funcbarCancel.setDisabled(true);

            // 查詢列
            me.searchBar.setHidden(true);

            // 主畫面
            me.viewUserlist.setHidden(true);

            // 資料維護
            me.viewCode.setReadOnly(true);
            me.viewName.setReadOnly(true);
            me.viewMail.setReadOnly(true);
            me.viewPassword.setReadOnly(true);
            me.viewStatus.setReadOnly(true);
            me.viewMemo.setReadOnly(true);
        } catch (e) {
            me.showError('userController/ disabledAll error:', e);
        }
    },
    // function: 更改狀態
    changeStatus: function(action) {
        const me = this;
        try {
            me.setConfig('action', action);
            console.log(`頁面狀態: ${me.getConfig('action')}`);

            // 停用所有物件
            me.disabledAll();
            console.log(me.getConfig('action'))

            // 依狀態啟用物件
            switch (me.getConfig('action')) {
                case 'view':
                    // 功能列
                    me.funcbarSearch.setDisabled(false);
                    me.funcbarAdd.setDisabled(false);
                    // me.funcbarEdit.setDisabled(false);
                    // me.funcbarSave.setDisabled(false);
                    // me.funcbarCancel.setDisabled(false);

                    // 查詢列
                    me.searchBar.setHidden(false);

                    // 主畫面
                    me.viewUserlist.setHidden(false);

                    // 資料維護
                    // me.viewIds.setReadOnly(false);
                    // me.viewCode.setReadOnly(false);
                    // me.viewName.setReadOnly(false);
                    // me.viewMail.setReadOnly(false);
                    // me.viewPassword.setReadOnly(false);
                    // me.viewStatus.setReadOnly(false);
                    // me.viewMemo.setReadOnly(false);
                    break;
                case 'add':
                    // 功能列
                    // me.funcbarSearch.setDisabled(false);
                    // me.funcbarAdd.setDisabled(false);
                    // me.funcbarEdit.setDisabled(false);
                    me.funcbarSave.setDisabled(false);
                    me.funcbarCancel.setDisabled(false);

                    // 查詢列
                    // me.searchBar.setHidden(false);

                    // 主畫面
                    // me.viewUserlist.setHidden(false);

                    // 資料維護
                    // me.viewIds.setReadOnly(false);
                    me.viewCode.setReadOnly(false);
                    me.viewName.setReadOnly(false);
                    me.viewMail.setReadOnly(false);
                    me.viewPassword.setReadOnly(false);
                    me.viewStatus.setReadOnly(false);
                    me.viewMemo.setReadOnly(false);
                    break;
                case 'edit':
                    // 功能列
                    // me.funcbarSearch.setDisabled(false);
                    // me.funcbarAdd.setDisabled(false);
                    // me.funcbarEdit.setDisabled(false);
                    me.funcbarSave.setDisabled(false);
                    me.funcbarCancel.setDisabled(false);

                    // 查詢列
                    // me.searchBar.setHidden(false);

                    // 主畫面
                    // me.viewUserlist.setHidden(false);

                    // 資料維護
                    // me.viewIds.setReadOnly(false);
                    // me.viewCode.setReadOnly(false);
                    me.viewName.setReadOnly(false);
                    me.viewMail.setReadOnly(false);
                    me.viewPassword.setReadOnly(false);
                    me.viewStatus.setReadOnly(false);
                    me.viewMemo.setReadOnly(false);
                    break;
                default:
                    console.log(`無效的狀態: ${me.getConfig('action')}`);
                    break;
            }
        } catch (e) {
            me.showError('userController/ changeStatus error:', e);
        }
    },

    /*************** searchbar ***************/
    // event: ENTER查詢
    enterSearch: function(field, e) {
        let me = this
        try {
            if (e.getKey() == e.ENTER) {
                me.doSearch();
            }
        } catch (e) {
            me.showError('userController/ enterSearch error:', e);
        }
    },
    // button: 查詢
    doSearch: async function() {
        let me = this
        try {
            let code = me.searchCode.getValue();
            let name = me.searchName.getValue();
            let mail = me.searchMail.getValue();
            let memo = me.searchMemo.getValue();
            let status = me.searchStatus.getValue();
            let createusercode = me.searchCreateusercode.getValue();
            let createtm = me.searchCreatetm.getValue();

            let uploadJSON = {
                code: code,
                name: name,
                mail: mail,
                memo: memo,
                status: status,
                createusercode: createusercode,
                createtm: createtm
            }

            console.log('----------- 查詢條件 -----------');
            console.log(uploadJSON);

            me.viewUserlist.getStore().clearFilter();
            me.viewUserlist.getStore().filter(e => {
                let display = true;
                if (uploadJSON.code) {
                    display = e.get('code').includes(uploadJSON.code) ? display : false;
                }

                if (uploadJSON.name) {
                    display = e.get('name').includes(uploadJSON.name) ? display : false;
                }

                if (uploadJSON.mail) {
                    display = e.get('mail').includes(uploadJSON.mail) ? display : false;
                }

                if (uploadJSON.memo) {
                    display = e.get('memo').includes(uploadJSON.memo) ? display : false;
                }

                if (uploadJSON.status) {
                    display = e.get('status') == status ? display : false;
                }

                if (uploadJSON.createusercode) {
                    display = e.get('createusercode').includes(uploadJSON.createusercode) ? display : false;
                }

                if (uploadJSON.createtm) {
                    display = e.get('createtm').includes(Ext.Date.format(uploadJSON.createtm, 'Y,m,d')) ? display : false;
                }

                console.log(`正在處理: ${JSON.stringify(e.getData())} => ${display ? '顯示' : '不顯示'}`);
                return display;
            })

        } catch (e) {
            me.showError('userController/ doSearch error:', e);
        }
    },
    // button: 清除
    cleanSearch: function() {
        let me = this
        try {
            me.searchCode.setValue('');
            me.searchName.setValue('');
            me.searchMail.setValue('');
            me.searchMemo.setValue('');
            me.searchStatus.setValue('');
            me.searchCreateusercode.setValue('');
            me.searchCreatetm.setValue('');


        } catch (e) {
            me.showError('userController/ cleanSearch error:', e);
        }
    },
    // button: 新增
    funcbar_add: function() {
        const me = this;
        try {
            // 取消選取
            me.viewUserlist.setSelection(false);

            // 切換模式
            me.changeStatus('add');

            // 清除資料
            me.viewCode.setValue('');
            me.viewName.setValue('');
            me.viewMail.setValue('');
            me.viewMemo.setValue('');
            me.viewPassword.setValue('');
            me.viewStatus.setValue('');

            // 載入預設值
            me.viewStatus.setValue(1); // 參照: antnex.store.static.Status

        } catch (e) {
            me.showError('userController/ funcbar_add error:', e);
        }
    },
    // button: 修改
    funcbar_edit: function() {
        const me = this;
        try {
            const record = me.viewUserlist.getSelection()[0];
            if (record) {
                me.changeStatus('edit');
            } else {
                throw `請先選擇要修改的資料`;
            }
        } catch (e) {
            me.showError('userController/ funcbar_Add error:', e);
        }
    },
    // button: 儲存
    funcbar_save: async function() {
        const me = this;
        let record = me.viewUserlist.getSelection()[0];
        try {
            let checkSaveFormat = async function() {
                if (S(me.viewCode.getValue()).isEmpty()) {
                    throw `請輸入${me.viewCode.getFieldLabel()}`;
                }

                if (S(me.viewName.getValue()).isEmpty()) {
                    throw `請輸入${me.viewName.getFieldLabel()}`;
                }

                if (S(me.viewPassword.getValue()).isEmpty()) {
                    throw `請輸入${me.viewPassword.getFieldLabel()}`;
                }

                if (S(me.viewStatus.getValue()).isEmpty()) {
                    throw `請選擇${me.viewStatus.getFieldLabel()}`;
                }
            }
            await checkSaveFormat();
            console.log(me.getConfig('action'))

            switch (me.getConfig('action')) {
                case 'add':
                    Ext.Msg.confirm('提醒', '是否儲存？', async function(btn) {
                        if (btn == 'yes') {
                            let data = [{
                                code: me.viewCode.getValue(),
                                name: me.viewName.getValue(),
                                mail: me.viewMail.getValue(),
                                password: me.viewPassword.getValue(),
                                memo: me.viewMemo.getValue(),
                                createusercode: '',
                                createtm: '2023,11,18',
                                status: 1,
                            }]
                            me.viewUserlist.getStore().loadData(data, true);
                            // 切換頁面狀態
                            me.changeStatus('view');

                            // 重新查詢
                            me.doSearch();
                        }

                    });
                    break;
                case 'edit':
                    Ext.Msg.confirm('提醒', '是否修正？', async function(btn) {
                        if (btn == 'yes') {
                            let record = me.viewUserlist.getSelection()[0];
                            record.set('code', me.viewCode.getValue()),
                                record.set('name', me.viewName.getValue()),
                                record.set('mail', me.viewMail.getValue()),
                                record.set('password', me.viewPassword.getValue()),
                                record.set('memo', me.viewMemo.getValue()),
                                record.set('status', me.viewStatus.getValue()),

                                // 切換頁面狀態
                                me.changeStatus('view');

                            // 重新查詢
                            me.doSearch();
                        }

                    });
                    break;
            }
        } catch (e) {
            me.showError('userController/ funcbar_Add error:', e);
        }
    },
    // button: 取消
    funcbar_cancel: function() {
        const me = this;
        try {
            Ext.Msg.confirm('提醒', '是否取消？', function(btn) {
                if (btn == 'yes') {
                    me.changeStatus('view');
                    me.onSelectUser();
                }
            });
        } catch (e) {
            me.showError('userController/ funcbar_Add error:', e);
        }
    },

    /*************** view ***************/
    // event: 選擇使用者
    onSelectUser: function() {
        let me = this
        try {
            let selection = me.viewUserlist.getSelection();
            let record = selection[0];

            // 選擇後顯示動作
            me.viewCode.setValue('');
            me.viewName.setValue('');
            me.viewMail.setValue('');
            me.viewMemo.setValue('');
            me.viewPassword.setValue('');
            me.viewStatus.setValue('');

            me.funcbarEdit.setDisabled(false);

            if (record) {
                me.viewCode.setValue(record.get('code'));
                me.viewName.setValue(record.get('name'));
                me.viewMail.setValue(record.get('mail'));
                me.viewMemo.setValue(record.get('memo'));
                me.viewPassword.setValue(record.get('password'));
                me.viewStatus.setValue(record.get('status'));
            }
        } catch (e) {
            me.showError('userController/ cleanSearch error:', e);
        }
    },
});