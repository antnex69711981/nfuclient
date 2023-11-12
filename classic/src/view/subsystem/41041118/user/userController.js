Ext.define('antnex.subsystem.sample.41041118.user.userController',{
    extend:'Ext.app.ViewController',
    alias: 'controller.page-41041118-user',
    requires: [],
    config: {
        name: '41041118-管理',
    },
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
    onActivate: async function () {
        let me = this;
        try {
            console.log(`userController/ onActivate entry`);

        } catch (e) {
            me.showError(`userController/ onActivate error: `, e);
        }
    },
    initObj: function () {
        let me = this
        try {
            // 功能列
            me.funcbarSearch = me.lookupReference('btn-page-41041118-user-funcbar-search');
            me.funcbarAdd = me.lookupReference('btn-page-41041118-user-funcbar-add');
            me.funcbarEdit = me.lookupReference('btn-page-41041118-user-funcbar-edit');
            me.funcbarSave = me.lookupReference('btn-page-41041118-user-funcbar-save');
            me.funcbarCancel = me.lookupReference('btn-page-41041118-user-funcbar-cancel');

            // 查詢列
            me.searchBar = me.lookupReference('panel-page-41041118-user-searchbar');
            me.searchCode = me.lookupReference('txt-page-41041118-user-searchbar-code');
            me.searchName = me.lookupReference('txt-page-41041118-user-searchbar-name');
            me.searchMail = me.lookupReference('txt-page-41041118-user-searchbar-mail');
            me.searchMemo = me.lookupReference('txt-page-41041118-user-searchbar-memo');
            me.searchStatus = me.lookupReference('cmbx-page-41041118-user-searchbar-status');
            me.searchCreateusercode = me.lookupReference('txt-page-41041118-user-searchbar-createusercode');
            me.searchCreatetm = me.lookupReference('txt-page-41041118-user-searchbar-createtm');
            
            //新增
            me.Add = me.lookupReference('panel-page-41041118-user-add');          
            me.Codeadd = me.lookupReference('txt-page-41041118-user-searchbar-codeadd');
            me.Nameadd = me.lookupReference('txt-page-41041118-user-searchbar-nameadd');
            me.Mailadd = me.lookupReference('txt-page-41041118-user-searchbar-mailadd');
            me.Memoadd = me.lookupReference('txt-page-41041118-user-searchbar-memoadd');
            me.Statusadd = me.lookupReference('cmbx-page-41041118-user-searchbar-statusadd');
            me.Createusercodeadd = me.lookupReference('txt-page-41041118-user-searchbar-createusercodeadd');
            me.Createtmadd = me.lookupReference('txt-page-41041118-user-searchbar-createtmadd');

            // 主畫面
            me.viewUserlist = me.lookupReference('grid-page-41041118-user-userlist');

            me.viewCode = me.lookupReference('txt-page-41041118-user-code');
            me.viewName = me.lookupReference('txt-page-41041118-user-name');
            me.viewMail = me.lookupReference('txt-page-41041118-user-mail');
            me.viewMemo = me.lookupReference('txt-page-41041118-user-memo');
            me.viewStatus = me.lookupReference('txt-page-41041118-user-status');
            me.viewCreateusercode = me.lookupReference('txt-page-41041118-user-createusercode');
            me.viewCreatetm = me.lookupReference('txt-page-41041118-user-createtm');
            me.viewModifyusercode = me.lookupReference('txt-page-41041118-user-modifyusercode');
            me.viewModifytm = me.lookupReference('txt-page-41041118-user-modifytm');
            
            //
            (me.lookupReference('txt-page-41041118-user-add')).hide();
            (me.lookupReference('txt-page-41041118-user-edit')).hide();

            

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
                memo:'管理員',
                status: 1,
                createusercode:'',
                createtm:'2023-11-10',
                modifyusercode:'',
                modifytm:''
            }, {
                code: '41041118',
                name: '李頡蔚',
                mail: '41041118@gm.nfu.edu.tw',
                memo:'學生',
                status: 9,
                createusercode:'root',
                createtm:'2023-11-11',
                modifyusercode:'root',
                modifytm:'2023-11-12'
            }]
            me.viewUserlist.getStore().loadData(data);
        } catch (e) {
            me.showError('userController/ refreshObj error:', e);
        }
    },
    /*************** searchbar ***************/
    // ENTER查詢
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
    // 查詢
    doSearch: async function () {
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
                mail:mail,
                memo:memo,
                status: status,
                createusercode:createusercode,
                createtm:createtm
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
                    display = e.get('createtm').includes(Ext.Date.format(uploadJSON.createtm,'Y-m-d')) ? display : false;
                }

                console.log(`正在處理: ${JSON.stringify(e.getData())} => ${display ? '顯示' : '不顯示'}`);
                return display;
            })

        } catch (e) {
            me.showError('userController/ doSearch error:', e);
        }
    },

    // 清除查詢
    cleanSearch: function () {
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



    /*************** view ***************/
    //選擇使用者
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
            me.viewModifyusercode.setValue('');
            me.viewModifytm.setValue('');

            if (record) {
                me.viewCode.setValue(record.get('code'));
                me.viewName.setValue(record.get('name'));
                me.viewMail.setValue(record.get('mail'));
                me.viewMemo.setValue(record.get('memo'));
                me.viewStatus.setValue(record.get('status'));
                me.viewModifyusercode.setValue(record.get('modifyusercode'));
                me.viewModifytm.setValue(record.get('modifytm'));
            }
        } catch (e) {
            me.showError('userController/ cleanSearch error:', e);
        }
    },
    
    // 選擇新增、修改
    funcbar_add:function(){
        let add=this.lookupReference('txt-page-41041118-user-add')
        let edit=this.lookupReference('txt-page-41041118-user-edit')
        if (add.isVisible()) {
            add.hide();
        } else {
            add.show();
            edit.hide();
        }
    },

    funcbar_edit:function(){
        let edit=this.lookupReference('txt-page-41041118-user-edit')
        let add=this.lookupReference('txt-page-41041118-user-add')
        if (edit.isVisible()) {
            edit.hide();
        } else {
            edit.show();
            add.hide();
        }
    },

    // 新增資料
    addsave:function(){
        let me = this
        try {
            let data = [{
                code: me.Codeadd.getValue(),
                name: me.Nameadd.getValue(),
                mail: me.Mailadd.getValue(),
                memo: me.Memoadd.getValue(),
                status: me.Statusadd.getValue(),
                createusercode:me.Createusercodeadd.getValue(),
                createtm:Ext.Date.format(me.Createtmadd.getValue(),'Y-m-d'),
                modifyusercode:'',
                modifytm:'',
            }]
            me.viewUserlist.getStore().loadData(data,true);
        } catch (e) {
            me.showError('userController/ refreshObj error:', e);
        }

    },

    // 取消新增
    cleanaddsave:function(){
        let me = this
        let add=this.lookupReference('txt-page-41041118-user-add')
        try {
            me.Codeadd.setValue('');
            me.Nameadd.setValue('');
            me.Mailadd.setValue('');
            me.Memoadd.setValue('');
            me.Statusadd.setValue('');
            me.Createusercodeadd.setValue('');
            me.Createtmadd.setValue('');
            add.hide();
        } catch (e) {
            me.showError('userController/ cleanSearch error:', e);
        }
    },

    // 修改資料
    editsave:function(){
        let me = this
        try {
            let selection = me.viewUserlist.getSelection();
            let record = selection[0];
            if (record) {                
                record.set('code',me.viewCode.getValue());
                record.set('name',me.viewName.getValue());
                record.set('mail',me.viewMail.getValue());
                record.set('memo',me.viewMemo.getValue());
                record.set('status',me.viewStatus.getValue());
                record.set('modifyusercode',me.viewModifyusercode.getValue());
                record.set('modifytm',me.viewModifytm.getValue());
                record.getStore().sync();
            }
            } catch (e) {
            me.showError('userController/ refreshObj error:', e);
        }

    },

    // 取消修改

    cleaneditsave:function(){
        let me = this
        let edit=this.lookupReference('txt-page-41041118-user-edit')
        try {
            me.onSelectUser();
            edit.hide();
        } catch (e) {
            me.showError('userController/ cleanSearch error:', e);
        }
    }

});