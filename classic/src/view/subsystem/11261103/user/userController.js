Ext.define('antnex.subsystem.11261103.user.userController', {
    extend: 'antnex.default.defaultController',
    alias: 'controller.page-11261103-user',
    requires: [],
    config: {
        name: '使用者管理1',
    },
    // event: 初始化
    onInitialize: async function () {
        let me = this;
        try {
            console.log(`userController/ onInitialize entry`);

            me.initObj();
            await me.refreshObj();
        } catch (e) {
            me.showError(`userController/ onInitialize error: `, e);
        }
    },
    // event: 頁面切換
    onActivate: async function () {
        let me = this;
        try {
            console.log(`userController/ onActivate entry`);

        } catch (e) {
            me.showError(`userController/ onActivate error: `, e);
        }
    },
    // function: 初始化物件 - 首次進入觸發(Override)
    initObj: function () {
        let me = this
        try {
            // 功能列
            me.funcbarSearch = me.lookupReference('btn-11261103-user-funcbar-search');
            me.funcbarAdd = me.lookupReference('btn-11261103-user-funcbar-add');
            me.funcbarEdit = me.lookupReference('btn-11261103-user-funcbar-edit');
            me.funcbarSave = me.lookupReference('btn-11261103-user-funcbar-save');
            me.funcbarCancel = me.lookupReference('btn-11261103-user-funcbar-cancel');

            // 查詢列
            me.searchBar = me.lookupReference('panel-11261103-user-searchbar');
            me.searchCode = me.lookupReference('txt-11261103-user-searchbar-code');
            me.searchName = me.lookupReference('txt-11261103-user-searchbar-name');
            me.searchStatus = me.lookupReference('cmbx-11261103-user-searchbar-status');

            // 主畫面
            me.viewUserlist = me.lookupReference('grid-11261103-user-userlist');

            me.viewCode = me.lookupReference('txt-11261103-user-code');
            me.viewName = me.lookupReference('txt-11261103-user-name');
            me.viewMail = me.lookupReference('txt-11261103-user-mail');
            me.viewMemo = me.lookupReference('txt-11261103-user-memo');
            me.viewStatus = me.lookupReference('cmbx-11261103-user-status');
            me.viewCreateusercode = me.lookupReference('txt-11261103-user-createusercode');
            me.viewCreatetm = me.lookupReference('date-11261103-user-createtm');
            me.viewModifyusercode = me.lookupReference('txt-11261103-user-modifyusercode');
            me.viewModiftm = me.lookupReference('date-11261103-user-modiftm');

            //新增
            me.addbar = me.lookupReference('panel-11261103-user-addbar');
            me.addcode = me.lookupReference('txt-11261103-user-addbarcode');
            me.addname = me.lookupReference('txt-11261103-user-addbarname');
            me.addstatus = me.lookupReference('cmbx-11261103-user-addbarstatus');
            me.addmail = me.lookupReference('txt-11261103-user-addbarmail');
            me.addmemo = me.lookupReference('txt-11261103-user-addbarmemo');
            me.addcreateusercode = me.lookupReference('txt-11261103-user-addbarcreateusercode');
            me.addcreatetm = me.lookupReference('date-11261103-user-addbarcreatetm');
            me.addmodifyusercode = me.lookupReference('txt-11261103-user-addbarmodifyusercode');
            me.addmodiftm = me.lookupReference('date-11261103-user-addbarmodiftm');
        } catch (e) {
            me.showError('userController/ initObj error:', e);
        }
    },
    // function: 載入物件資料 - 每次進入觸發(Override)
    refreshObj: async function () {
        let me = this
        try {
            let data = [{
                code: 'root',
                name: '系統管理員',
                email: '',
                status: 1,
            }, {
                code: 'stanley',
                name: '李厚生',
                email: '',
                status: 9,
            }]
            me.viewUserlist.getStore().loadData(data);
        } catch (e) {
            me.showError('userController/ refreshObj error:', e);
        }
    },

    // function: 初始化頁面狀態 - 首次進入觸發(Override)
    initPageStatus: function () {
        let me = this
        try {
            me.cleanSearch();
            me.onSelectUser();
        } catch (e) {
            me.showError('user2Controller/ initPageStatus error:', e);
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
            me.showError('userController/ enterSearch error:', e);
        }
    },
    // button: 查詢
    doSearch: async function () {
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

            me.viewUserlist.getStore().clearFilter();
            me.viewUserlist.getStore().filter(e => {
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
            me.showError('userController/ doSearch error:', e);
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
                createusercode:me.addcreateusercode.getValue(),
                createtm:me.addcreatetm.getSubmitValue(),
                modifyusercode:me.addmodifyusercode.getValue(),
                modiftm:me.addmodiftm.getSubmitValue(),//轉換y-m-d格式 getvalue()英文日期+時間格式

            }]
            me.viewUserlist.getStore().add(data);
            

        } catch (e) {
            me.showError('userController/ doAdd error:', e);
        }
    },
    // button: 清除
    cleanSearch: function () {
        let me = this
        try {
            me.searchCode.setValue('');
            me.searchName.setValue('');
            me.searchStatus.setValue('');
        } catch (e) {
            me.showError('userController/ cleanSearch error:', e);
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
            me.addcreateusercode.setValue('');
            me.addcreatetm.setValue('');
            me.addmodifyusercode.setValue('');
            me.addmodiftm.setValue('');
        } catch (e) {
            me.showError('userController/ cleanSearch error:', e);
        }
    },
    //button: 儲存
    /*funcbar_save:function(){
        let me = this
        try {
            let data=[{
                code:me.viewCode.getValue(),
                name:me.viewName.getValue(),
                //status:me.viewStatustatus.getValue(),
                // mail:me.viewMail.getValue(),
                // memo:me.viewMemo.getValue(),
                //createusercode:me.addcreateusercode.getValue(),
                //createtm:me.addcreatetm.getSubmitValue(),
                // modifyusercode:me.viewModifyusercode.getValue(),
                // modiftm:me.viewModiftm.getSubmitValue(),//轉換y-m-d格式 getvalue()英文日期+時間格式

            }]
            me.viewUserlist.getStore().setConfig(data);
            

        } catch (e) {
            me.showError('userController/ doAdd error:', e);
        }

    },*/



    /*************** view ***************/
    // event: 選擇使用者
    onSelectUser: function () {
        let me = this
        try {
            let selection = me.viewUserlist.getSelection();
            let record = selection[0];

            me.viewCode.setValue('');
            me.viewName.setValue('');
            me.viewMail.setValue('');
            me.viewMemo.setValue('');
            me.viewStatus.setValue('');
            me.viewCreateusercode.setValue('');
            me.viewCreatetm.setValue('');
            me.viewModifyusercode.setValue('');
            me.viewModiftm.setValue('');
            

            if (record) {
                me.viewCode.setValue(record.get('code'));
                me.viewName.setValue(record.get('name'));
                me.viewMail.setValue(record.get('mail'));
                me.viewMemo.setValue(record.get('memo'));
                me.viewStatus.setValue(record.get('status'));
                me.viewCreateusercode.setValue(record.get('createusercode'));
                me.viewCreatetm.setValue(record.get('createtm'));
                me.viewModifyusercode.setValue(record.get('modifyusercode'));
                me.viewModiftm.setValue(record.get('modiftm'));
                
            }
        } catch (e) {
            me.showError('userController/ cleanSearch error:', e);
        }
    },
});