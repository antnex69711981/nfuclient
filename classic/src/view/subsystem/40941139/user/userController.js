Ext.define('antnex.subsystem.40941139.user.userController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.page-40941139-user',

    requires: [],

    config: {
        name: '使用者管理',
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
            me.funcbarSearch = me.lookupReference('btn-40941139-user-funcbar-search');
            me.funcbarAdd = me.lookupReference('btn-40941139-user-funcbar-add');
            me.funcbarEdit = me.lookupReference('btn-40941139-user-funcbar-edit');
            me.funcbarSave = me.lookupReference('btn-40941139-user-funcbar-save');
            me.funcbarCancel = me.lookupReference('btn-40941139-user-funcbar-cancel');

            // 查詢列
            me.searchBar = me.lookupReference('panel-40941139-user-searchbar');
            me.searchCode = me.lookupReference('txt-40941139-user-searchbar-code');
            me.searchName = me.lookupReference('txt-40941139-user-searchbar-name');
            me.searchMail = me.lookupReference('txt-40941139-user-searchbar-mail');
            me.searchPhone = me.lookupReference('txt-40941139-user-searchbar-phone');
            me.searchBirth = me.lookupReference('date-40941139-user-searchbar-birth');
            me.searchMemo = me.lookupReference('txt-40941139-user-searchbar-memo');
            me.searchStatus = me.lookupReference('cmbx-40941139-user-searchbar-status');
            me.searchCreateusercode = me.lookupReference('txt-40941139-user-searchbar-createusercode');
            me.searchCreatetm = me.lookupReference('date-40941139-user-searchbar-createtm');
            me.searchModifyusercode = me.lookupReference('txt-40941139-user-searchbar-modifyusercode');
            me.searchModifytm = me.lookupReference('date-40941139-user-searchbar-modifytm');

            // 主畫面
            me.viewUserlist = me.lookupReference('grid-40941139-user-userlist');
            me.viewManage = me.lookupReference('panel-40941139-user-manage');
            me.viewAdd = me.lookupReference('panel-40941139-user-add');

            me.viewCode = me.lookupReference('txt-40941139-user-code');
            me.viewName = me.lookupReference('txt-40941139-user-name');
            me.viewMail = me.lookupReference('txt-40941139-user-mail');
            me.viewPhone = me.lookupReference('txt-40941139-user-phone');
            me.viewBirth = me.lookupReference('date-40941139-user-birth');
            me.viewMemo = me.lookupReference('txt-40941139-user-memo');
            me.viewStatus = me.lookupReference('cmbx-40941139-user-status');
            me.viewCreateusercode = me.lookupReference('txt-40941139-user-createusercode');
            me.viewCreatetm = me.lookupReference('date-40941139-user-createtm');
            me.viewModifyusercode = me.lookupReference('txt-40941139-user-modifyusercode');
            me.viewModifytm = me.lookupReference('date-40941139-user-modifytm');
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
                mail: '',
                phone: '',
                birth: '',
                memo: '',
                status: 1,
                createusercode: '李厚生',
                createtm: '2023/11/1',
                modifyusercode: '',
                modifytm: '',
            }, {
                code: 'stanley',
                name: '李厚生',
                mail: '',
                phone: '',
                birth: '',
                memo: '',
                status: 9,
                createusercode: '李厚生',
                createtm: '2023/11/1',
                modifyusercode: '',
                modifytm: '',
            }, {
                code: '40941139',
                name: '陳嘉笙',
                mail: '40941139@gm.nfu.edu.tw',
                phone: '0908389983',
                birth: '2001/10/20',
                memo: 'pig',
                status: 1,
                createusercode: '陳嘉笙',
                createtm: '2023/11/4',
                modifyusercode: '陳嘉笙',
                modifytm: '2023/11/5',
            }]
            me.viewUserlist.getStore().loadData(data);
        } catch (e) {
            me.showError('userController/ refreshObj error:', e);
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
            let mail = me.searchMail.getValue();
            let phone = me.searchPhone.getValue();
            let birth = me.searchBirth.getValue();
            let memo = me.searchMemo.getValue();
            let status = me.searchStatus.getValue();
            let createusercode = me.searchCreateusercode.getValue();
            let createtm = me.searchCreatetm.getValue();
            let modifyusercode = me.searchModifyusercode.getValue();
            let modifytm = me.searchModifytm.getValue();


            let uploadJSON = {
                code: code,
                name: name,
                mail: mail,
                phone: phone,
                birth: birth,
                memo: memo,
                status: status,
                createusercode: createusercode,
                createtm: createtm,
                modifyusercode: modifyusercode,
                modifytm: modifytm,

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

                if (uploadJSON.phone) {
                    display = e.get('phone').includes(uploadJSON.phone) ? display : false;
                }

                if (uploadJSON.birth) {
                    display = e.get('birth').includes(uploadJSON.birth) ? display : false;
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
                    display = e.get('createtm').includes(uploadJSON.createtm) ? display : false;
                }

                if (uploadJSON.modifyusercode) {
                    display = e.get('modifyusercode').includes(uploadJSON.modifyusercode) ? display : false;
                }

                if (uploadJSON.modifytm) {
                    display = e.get('modifytm').includes(uploadJSON.modifytm) ? display : false;
                }

                console.log(`正在處理: ${JSON.stringify(e.getData())} => ${display ? '顯示' : '不顯示'}`);
                return display;
            })
            debugger

        } catch (e) {
            me.showError('userController/ doSearch error:', e);
        }
    },
    // button: 清除
    cleanSearch: function () {
        let me = this
        try {
            me.searchCode.setValue('');
            me.searchName.setValue('');
            me.searchMail.setValue('');
            me.searchPhone.setValue('');
            me.searchBirth.setValue('');
            me.searchMemo.setValue('');
            me.searchStatus.setValue('');
            me.searchCreateusercode.setValue('');
            me.searchCreatetm.setValue('');
            me.searchModifyusercode.setValue('');
            me.searchModifytm.setValue('');

        } catch (e) {
            me.showError('userController/ cleanSearch error:', e);
        }
    },

    /*************** view ***************/
    // event: 選擇使用者
    onSelectUser:function () {
        let me = this
        
        try {
            let selection = me.viewUserlist.getSelection();
            let record = selection[0];

            me.viewManage.show();
            // me.viewAdd.hide();
            me.viewCode.setValue('');
            me.viewName.setValue('');
            me.viewMail.setValue('');
            me.viewPhone.setValue('');
            me.viewBirth.setValue('');
            me.viewMemo.setValue('');
            me.viewStatus.setValue('');
            me.viewCreateusercode.setValue('');
            me.viewCreatetm.setValue('');
            me.viewModifyusercode.setValue('');
            me.viewModifytm.setValue('');
            

            if (record) {
                me.viewCode.setValue(record.get('code'));
                me.viewName.setValue(record.get('name'));
                me.viewMail.setValue(record.get('mail'));
                me.viewPhone.setValue(record.get('phone'));
                me.viewBirth.setValue(record.get('birth'));
                me.viewMemo.setValue(record.get('memo'));
                me.viewStatus.setValue(record.get('status'));
                me.viewCreateusercode.setValue(record.get('createusercode'));
                me.viewCreatetm.setValue(record.get('createtm'));
                me.viewModifyusercode.setValue(record.get('modifyusercode'));
                me.viewModifytm.setValue(record.get('modifytm'));

                debugger

            }
        } catch (e) {
            me.showError('userController/ cleanSearch error:', e);
        }
    },

    /*************** add ***************/
    // button: 新增
    funcbar_add: function () {
        let me = this
        
        try {
            let data = [{
                code: me.viewCode.getValue(),
                name: me.viewName.getValue(),
                mail: me.viewMail.getValue(),
                phone: me.viewPhone.getValue(),
                birth: me.viewBirth.getRawValue(),
                memo: me.viewMemo.getValue(),
                status: me.viewStatus.getValue(),
            }]
            me.viewUserlist.getStore().add(data);

        } catch (e) {
            me.showError('userController/ doAdd error:', e);
        }
    },

});
