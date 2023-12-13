Ext.define('antnex.subsystem.11261103.projectdetail.projectdetailController', {
    extend: 'antnex.default.defaultController',
    alias: 'controller.projectdetail',
    requires: [],
    config: {
        name: '專案銷售明細表',
        action: null,
        requireKeylist: [],
    },
    // event: 初始化
    onInitialize: async function () {
        let me = this;
        try {
            console.log(`projectdetailController/ onInitialize entry`);

            me.initObj();
            await me.refreshObj();
            me.initPageStatus();
        } catch (e) {
            me.showError(`projectdetailController/ onInitialize error: `, e);
        }
    },
    // event: 頁面切換
    onActivate: async function () {
        let me = this;
        try {
            console.log(`projectdetailController/ onActivate entry`);

        } catch (e) {
            me.showError(`projectdetailController/ onActivate error: `, e);
        }
    },
    // function: 初始化物件 - 首次進入觸發(Override)
    initObj: function () {
        let me = this
        try {
            // 功能列
            me.funcbarSearch = me.lookupReference('btn-11261103-projectdetail-funcbar-search');
            me.funcbarAdd = me.lookupReference('btn-11261103-projectdetail-funcbar-add');
            me.funcbarEdit = me.lookupReference('btn-11261103-projectdetail-funcbar-edit');
            me.funcbarSave = me.lookupReference('btn-11261103-projectdetail-funcbar-save');
            me.funcbarCancel = me.lookupReference('btn-11261103-projectdetail-funcbar-cancel');

            // 查詢列
            me.searchBar = me.lookupReference('panel-11261103-projectdetail-searchbar');
            me.searchCode = me.lookupReference('txt-11261103-projectdetail-searchbar-code');
            me.searchName = me.lookupReference('txt-11261103-projectdetail-searchbar-name');
            me.searchStatus = me.lookupReference('cmbx-11261103-projectdetail-searchbar-status');
            me.searchDatetype = me.lookupReference('cmbx-11261103-projectdetail-searchbar-datetype');
            // 主畫面
            me.viewprojectdetaillist = me.lookupReference('grid-11261103-projectdetail-projectdetaillist');
            me.viewprojectdetailManage = me.lookupReference('panel-11261103-projectdetail-manage');
            //資料維護
            me.viewIds = me.lookupReference('num-11261103-projectdetail-ids')
            me.viewCode = me.lookupReference('txt-11261103-projectdetail-code');
            me.viewName = me.lookupReference('txt-11261103-projectdetail-name');
            me.viewMail = me.lookupReference('txt-11261103-projectdetail-mail');
            me.viewPassword = me.lookupReference('txt-11261103-projectdetail-password')
            me.viewMemo = me.lookupReference('txt-11261103-projectdetail-memo');
            me.viewStatus = me.lookupReference('cmbx-11261103-projectdetail-status');
            me.viewCreateprojectdetailcode = me.lookupReference('txt-11261103-projectdetail-createprojectdetailcode');
            me.viewCreatetm = me.lookupReference('date-11261103-projectdetail-createtm');
            me.viewModifyprojectdetailcode = me.lookupReference('txt-11261103-projectdetail-modifyprojectdetailcode');
            me.viewModiftm = me.lookupReference('date-11261103-projectdetail-modiftm');

            //新增
            me.addbar = me.lookupReference('panel-11261103-projectdetail-addbar');
            me.addcode = me.lookupReference('txt-11261103-projectdetail-addbarcode');
            me.addname = me.lookupReference('txt-11261103-projectdetail-addbarname');
            me.addstatus = me.lookupReference('cmbx-11261103-projectdetail-addbarstatus');
            me.addmail = me.lookupReference('txt-11261103-projectdetail-addbarmail');
            me.addmemo = me.lookupReference('txt-11261103-projectdetail-addbarmemo');
            me.addcreateprojectdetailcode = me.lookupReference('txt-11261103-projectdetail-addbarcreateprojectdetailcode');
            me.addcreatetm = me.lookupReference('date-11261103-projectdetail-addbarcreatetm');
            me.addmodifyprojectdetailcode = me.lookupReference('txt-11261103-projectdetail-addbarmodifyprojectdetailcode');
            me.addmodiftm = me.lookupReference('date-11261103-projectdetail-addbarmodiftm');
        } catch (e) {
            me.showError('projectdetailController/ initObj error:', e);
        }
    },

    /************* 頁面事件 *************/
    // function: 停用所有需要停用的物件
    disabledAll: function () {
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
            me.viewprojectdetaillist.setHidden(true);

            // 資料維護

            me.viewIds.setReadOnly(true);
            me.viewIds.setHidden(true);
            me.viewCode.setReadOnly(true);
            me.viewName.setReadOnly(true);
            me.viewMail.setReadOnly(true);
            me.viewPassword.setReadOnly(true);
            me.viewStatus.setReadOnly(true);
            me.viewMemo.setReadOnly(true);
            me.viewCreateprojectdetailcode.setReadOnly(true);
            me.viewCreatetm.setReadOnly(true);
            me.viewModifyprojectdetailcode.setReadOnly(true);
            me.viewModiftm.setReadOnly(true);
        } catch (e) {
            me.showError('projectdetailController/ disabledAll error:', e);
        }
    },
    // function: 更改狀態
    changeStatus: function (action) {
        const me = this;
        try {
            me.setConfig('action', action);
            console.log(`頁面狀態: ${me.getConfig('action')}`);

            // 停用所有物件
            me.disabledAll();

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
                    me.viewprojectdetaillist.setHidden(false);

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
                        // me.viewprojectdetaillist.setHidden(false);
    
                        // 資料維護
                        // me.viewIds.setReadOnly(false);
                        me.viewCode.setReadOnly(false);
                        me.viewName.setReadOnly(false);
                        me.viewMail.setReadOnly(false);
                        me.viewPassword.setReadOnly(false);
                        me.viewStatus.setReadOnly(false);
                        me.viewMemo.setReadOnly(false);
                        me.viewCreateprojectdetailcode.setReadOnly(false);
                        me.viewCreatetm.setReadOnly(false);
                        me.viewModifyprojectdetailcode.setReadOnly(false);
                        me.viewModiftm.setReadOnly(false);
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
                    // me.viewprojectdetaillist.setHidden(false);

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
            me.showError('projectdetailController/ changeStatus error:', e);
        }
    },
    // function: 載入物件資料 - 每次進入觸發(Override)
    refreshObj: async function () {
        const me = this;
        try {
            let status = []
            status.push({ value: -1, text: '不區分' });
            const statusStore = Ext.create('antnex.subsystem.11261103.projectdetail.Status');
            statusStore.getRange().forEach(record => {
                let json = record.getData();
                delete json.id;
                status.push(json);
            });

            me.searchStatus.getStore().loadData(status);

            let datetype = []
            datetype.push({ value: -1, text: '全部' });
            const datetypeStore = Ext.create('antnex.subsystem.11261103.projectdetail.Datetype');
            datetypeStore.getRange().forEach(record => {
                let json = record.getData();
                delete json.id;
                datetype.push(json);
            });

            me.searchDatetype .getStore().loadData(datetype);
        } catch (e) {
            me.showError('projectdetailController/ refreshObj error:', e);
        }
        // let me = this
        // try {
        //     let data = [{
        //         code: 'root',
        //         name: '系統管理員',
        //         email: '', 
        //         status: 1,
        //     }, {
        //         code: 'stanley',
        //         name: '李厚生',
        //         email: '',
        //         status: 9,
        //     }]
        //     me.viewprojectdetaillist.getStore().loadData(data);
        // } catch (e) {
        //     me.showError('projectdetailController/ refreshObj error:', e);
        // }
    },

    // function: 初始化頁面狀態 - 首次進入觸發(Override)
    initPageStatus: function () {
        let me = this
        try {
            me.cleanSearch();
            me.changeStatus('view');
            me.loadData();
        } catch (e) {
            me.showError('projectdetail2Controller/ initPageStatus error:', e);
        }
    },


    /*************** searchbar ***************/
    // event: ENTER查詢
    enterSearch: function (field, e) {
        let me = this
        try {
            if (e.getKey() == e.ENTER) {
                me.doSearch();
            }
        } catch (e) {
            me.showError('projectdetailController/ enterSearch error:', e);
        }
    },
    // button: 查詢
    /*doSearch: async function () {
        let me = this
        try {
            let code = me.searchCode.getValue();
            let name = me.searchName.getValue();
            let status = me.searchStatus.getValue();

            let uploadJSON = {
                code: code,
                name: name,
                status: status,
            }

            console.log('----------- 查詢條件 -----------');
            console.log(uploadJSON);

            me.viewprojectdetaillist.getStore().clearFilter();
            me.viewprojectdetaillist.getStore().filter(e => {
                let display = true;
                if (uploadJSON.code) {
                    display = e.get('code').includes(uploadJSON.code) ? display : false;
                }

                if (uploadJSON.name) {
                    display = e.get('name').includes(uploadJSON.name) ? display : false;
                }

                if (uploadJSON.status) {
                    display = e.get('status') == status ? display : false;
                }

                console.log(`正在處理: ${JSON.stringify(e.getData())} => ${display ? '顯示' : '不顯示'}`);
                return display;
            })

        } catch (e) {
            me.showError('projectdetailController/ doSearch error:', e);
        }
    },*/
    // button: 新增
    funcbar_Add: function () {
        const me = this;
        try {
            // 取消選取
            me.viewprojectdetaillist.setSelection(false);

            // 切換模式
            me.changeStatus('add');

            // 清除資料
            me.loadData();

            // 載入預設值
            me.viewIds.setValue(0);
            me.viewStatus.setValue(1); // 參照: antnex.store.static.Status

        } catch (e) {
            me.showError('projectdetailController/ funcbar_add error:', e);
        }
    },
    // button: 修改
    funcbar_edit: function () {
        const me = this;
        try {
            const record = me.viewprojectdetaillist.getSelection()[0];
            if (record) {
                me.changeStatus('edit');
            } else {
                throw `請先選擇要修改的資料`;
            }
        } catch (e) {
            me.showError('projectdetailController/ funcbar_Add error:', e);
        }
    },
    // button: 儲存
    funcbar_save: async function () {
        const me = this;
        try {
            let checkSaveFormat = async function () {
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

            Ext.Msg.confirm('提醒', '是否儲存？', async function (btn) {
                if (btn == 'yes') {
                    const uploadJSON = {
                        txcode: me.getConfig('action') == 'add' ? 'BASIC_projectdetail_INSERT' : 'BASIC_projectdetail_UPDATE',
                        ids: me.viewIds.getValue(),
                        code: me.viewCode.getValue(),
                        name: me.viewName.getValue(),
                        mail: me.viewMail.getValue(),
                        password: me.viewPassword.getValue(),
                        status: me.viewStatus.getValue(),
                        memo: me.viewMemo.getValue(),
                    }

                    me.viewprojectdetailManage.mask(CONST_LOADING_HINT);
                    const json = await antnex.ProxyService.send(uploadJSON);
                    me.viewprojectdetailManage.unmask();
                    switch (json.status) {
                        case CONST_STATUS_OK:
                            const code = json.message.code;

                            // 切換頁面狀態
                            me.changeStatus('view');

                            // 紀錄此次修改的資料
                            me.setConfig('requireKeylist', [code]);

                            // 重新查詢
                            me.doSearch();
                            break;
                        default:
                            me.showMessage(json.statusText);
                    }
                }
            });
        } catch (e) {
            me.showError('projectdetailController/ funcbar_Add error:', e);
        }
    },  
    // button: 取消
    funcbar_cancel: function () {
        const me = this;
        try {
            Ext.Msg.confirm('提醒', '是否取消？', function (btn) {
                if (btn == 'yes') {
                    me.changeStatus('view');
                    me.onSelectprojectdetail();
                }
            });
        } catch (e) {
            me.showError('projectdetailController/ funcbar_Add error:', e);
        }
    },
  
    // button: 清除
    cleanSearch: function () {
        let me = this
        try {
            //me.searchCode.setValue('');
            //me.searchName.setValue('');
            me.searchStatus.setValue(-1);
            me.searchDatetype.setValue(-1);
        } catch (e) {
            me.showError('projectdetailController/ cleanSearch error:', e);
        }
    },

    // event: ENTER查詢
    enterSearch: function (field, e) {
        const me = this;
        try {
            if (e.getKey() == e.ENTER) {
                me.doSearch();
            }
        } catch (e) {
            me.showError('projectdetailController/ enterSearch error:', e);
        }
    },
    // button: 查詢
    doSearch: async function () {
        const me = this;
        try {
           // const code = me.searchCode.getValue();
           // const name = me.searchName.getValue();
           // const status = me.searchStatus.getValue();

            const uploadJSON = {
                txcode: 'BASIC_projectdetail_LIST_FILTER',
                code: code,
                name: name,
                status: status,
            };

            // 暫存需要顯示的資料
            const requireKeylist = me.getConfig('requireKeylist');

            // 清除暫存資料
            me.setConfig('requireKeylist', []);

            me.viewprojectdetaillist.mask(CONST_LOADING_HINT);
            const json = await antnex.ProxyService.send(uploadJSON);
            me.viewprojectdetaillist.unmask();
            switch (json.status) {
                case CONST_STATUS_OK:
                    const data = json.message.data;
                    me.viewprojectdetaillist.getStore().loadData(data);

                    // 依照暫存的資料選擇對應資料
                    const records = me.viewprojectdetaillist.getStore().getRange().filter(e => requireKeylist.includes(e.get('code')));
                    me.viewprojectdetaillist.setSelection(records);
                    break;
                default:
                    throw json.statusText
            }
        } catch (e) {
            me.showError('projectdetailController/ doSearch error:', e);
        }
    },
    // button: 新增
    doAdd: async function () {
        let me = this
        try {
            let data=[{
                code:me.addcode.getValue(),
                name:me.addname.getValue(),
                status:me.addstatus.getValue(),
                mail:me.addmail.getValue(),
                memo:me.addmemo.getValue(),
                createprojectdetailcode:me.addcreateprojectdetailcode.getValue(),
                createtm:me.addcreatetm.getSubmitValue(),
                // modifyprojectdetailcode:me.addmodifyprojectdetailcode.getValue(),
                // modiftm:me.addmodiftm.getSubmitValue(),//轉換y-m-d格式 getvalue()英文日期+時間格式

            }]
            me.viewprojectdetaillist.getStore().add(data);
            

        } catch (e) {
            me.showError('projectdetailController/ doAdd error:', e);
        }
    },

    //button:新增資料 清除
    cleanAdd: function () {
        let me = this
        try {
            me.addcode.setValue('');
            me.addname.setValue('');
            me.addstatus.setValue('');
            me.addmail.setValue('');
            me.addmemo.setValue('');
            me.addcreateprojectdetailcode.setValue('');
            me.addcreatetm.setValue('');
            me.addmodifyprojectdetailcode.setValue('');
            me.addmodiftm.setValue('');
        } catch (e) {
            me.showError('projectdetailController/ cleanSearch error:', e);
        }
    },

    
    

    /*************** view ***************/
    // event: 選擇使用者
    /*onSelectprojectdetail: function () {
        let me = this
        try {
            let selection = me.viewprojectdetaillist.getSelection();
            let record = selection[0];

            me.viewCode.setValue('');
            me.viewName.setValue('');
            me.viewMail.setValue('');
            me.viewMemo.setValue('');
            me.viewStatus.setValue('');
            me.viewCreateprojectdetailcode.setValue('');
            me.viewCreatetm.setValue('');
            me.viewModifyprojectdetailcode.setValue('');
            me.viewModiftm.setValue('');
            

            if (record) {
                me.viewCode.setValue(record.get('code'));
                me.viewName.setValue(record.get('name'));
                me.viewMail.setValue(record.get('mail'));
                me.viewMemo.setValue(record.get('memo'));
                me.viewStatus.setValue(record.get('status'));
                me.viewCreateprojectdetailcode.setValue(record.get('createprojectdetailcode'));
                me.viewCreatetm.setValue(record.get('createtm'));
                me.viewModifyprojectdetailcode.setValue(record.get('modifyprojectdetailcode'));
                me.viewModiftm.setValue(record.get('modiftm'));
                
            }
        } catch (e) {
            me.showError('projectdetailController/ cleanSearch error:', e);
        }
    },*/
    // event: 選擇使用者
    onSelectprojectdetail: function () {
        const me = this;
        try {
            const record = me.viewprojectdetaillist.getSelection()[0];
            const code = record ? record.get('code') : '';
            me.loadData(code);
        } catch (e) {
            me.showError('projectdetailController/ onSelectprojectdetail error:', e);
        }
    },
    // function: 載入選擇的資料
    loadData: async function (code = '') {
        const me = this;
        try {
            // 依據傳入json載入資料
            let loadFn = function (json = {}) {
                // 取得對應資料
                const ids = json.ids ? json.ids : '';
                const code = json.code ? json.code : '';
                const name = json.name ? json.name : '';
                const mail = json.mail ? json.mail : '';
                const password = json.password ? json.password : '';
                const status = json.status ? json.status : '';
                const memo = json.memo ? json.memo : '';

                const editable = ids > 0;

                // 載入對應欄位
                me.funcbarEdit.setDisabled(editable == false);

                me.viewIds.setValue(ids);
                me.viewCode.setValue(code);
                me.viewName.setValue(name);
                me.viewMail.setValue(mail);
                me.viewPassword.setValue(password);
                me.viewStatus.setValue(status);
                me.viewMemo.setValue(memo);
                
            }

            // 先清除所有資料
            loadFn();

            // 依據code是否有資料決定是否查詢資料庫
            if (code) {
                const uploadJSON = {
                    txcode: 'BASIC_projectdetail_FIND_BY_CODE',
                    code: code,
                };

                me.viewprojectdetailManage.mask(CONST_LOADING_HINT);
                const json = await antnex.ProxyService.send(uploadJSON);
                me.viewprojectdetailManage.unmask();
                switch (json.status) {
                    case CONST_STATUS_OK:
                        const data = json.message.data;
                        loadFn(data);
                        break;
                    default:
                        throw json.statusText
                }
            }
        } catch (e) {
            me.showError('projectdetailController/ loadData error:', e);
        }
    },



    /************* 提示訊息 *************/
    // function:提示訊息
    showMessage: function (message) {
        Ext.Msg.alert(`${this.getConfig('name')} `, message);
    },
    // function:錯誤訊息
    showError: function (path, e) {
        this.showMessage(e);
        return false;
    },
});