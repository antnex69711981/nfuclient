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
            // 查詢列
            me.searchBar = me.lookupReference('panel-41041118-searchbar');
            me.searchCode = me.lookupReference('txt-41041118-searchbar-code');
            me.searchName = me.lookupReference('txt-41041118-searchbar-name');
            me.searchMail = me.lookupReference('txt-41041118-searchbar-mail');
            me.searchMemo = me.lookupReference('txt-41041118-searchbar-memo');
            me.searchStatus = me.lookupReference('cmbx-41041118-searchbar-status');
            me.searchCreateusercode = me.lookupReference('txt-41041118-searchbar-createusercode');
            me.searchCreatetm = me.lookupReference('txt-41041118-searchbar-createtm');

            // 功能列
            me.funcbarAdd = me.lookupReference('btn-41041118-funcbar-add');
            me.funcbarEdit = me.lookupReference('btn-41041118-funcbar-edit');
            me.funcbarDel = me.lookupReference('btn-41041118-funcbar-del');

            // 主畫面
            me.viewUserlist = me.lookupReference('grid-41041118-userlist');

            // 新增列
            me.Add = me.lookupReference('txt-41041118-add');
            (me.Add).hide();
            me.addCode = me.lookupReference('txt-41041118-add-code');
            me.addName = me.lookupReference('txt-41041118-add-name');
            me.addMail = me.lookupReference('txt-41041118-add-mail');
            me.addMemo = me.lookupReference('txt-41041118-add-memo');
            me.addStatus = me.lookupReference('cmbx-41041118-add-status');
            
            // 修改列
            me.Edit = me.lookupReference('txt-41041118-edit');
            (me.Edit).hide();
            me.editCode = me.lookupReference('txt-41041118-edit-code');
            me.editName = me.lookupReference('txt-41041118-edit-name');
            me.editMail = me.lookupReference('txt-41041118-edit-mail');
            me.editMemo = me.lookupReference('txt-41041118-edit-memo');
            me.editStatus = me.lookupReference('txt-41041118-edit-status');
            me.editCreateusercode = me.lookupReference('txt-41041118-edit-createusercode');
            me.editCreatetm = me.lookupReference('txt-41041118-edit-createtm');

            // 刪除列
            me.Del = me.lookupReference('txt-41041118-del'); 
            (me.Del).hide();
            me.delCode = me.lookupReference('txt-41041118-del-code');
            me.delName = me.lookupReference('txt-41041118-del-name');

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
                mail: 'root@gmail.com',
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

    /*************** 查詢資料***************/
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

    /*************** 選擇 ***************/
    // 選擇使用者
    onSelectUser: function () {
        let me = this
        try {
            let selection = me.viewUserlist.getSelection();
            let record = selection[0];

            me.editCode.setValue('');
            me.editName.setValue('');
            me.editMail.setValue('');
            me.editMemo.setValue('');
            me.editStatus.setValue('');

            if (record) {
                me.editCode.setValue(record.get('code'));
                me.editName.setValue(record.get('name'));
                me.editMail.setValue(record.get('mail'));
                me.editMemo.setValue(record.get('memo'));
                me.editStatus.setValue(record.get('status'));
            }

            me.delCode.setValue('');
            me.delName.setValue('');

            if (record) {
                me.delCode.setValue(record.get('code'));
                me.delName.setValue(record.get('name'));
            }
        } catch (e) {
            me.showError('userController/ cleanSearch error:', e);
        }
    },
    
    // 選擇新增
    funcbar_add:function(){
        let me = this
        if (me.Add.isVisible()) {
            me.Add.hide();
        } else {
            me.Add.show();
            me.Edit.hide();
            me.Del.hide();
        }
    },

    // 選擇修改
    funcbar_edit:function(){
        let me = this
        if (me.Edit.isVisible()) {
            me.Edit.hide();
        } else {
            me.Edit.show();
            me.Add.hide();
            me.Del.hide();
        }
    },

    // 選擇刪除
    funcbar_del:function(){
        let me = this
        if (me.Del.isVisible()) {
            me.Del.hide();
        } else {
            me.Del.show();
            me.Add.hide();
            me.Edit.hide();
        }
    },

    /*************** 變更資料 ***************/   
    // 新增資料
    addsave:function(){
        let me = this
        try {
            let records = me.viewUserlist.getStore().getData().items;
            let codeList = records.map(record => record.get('code'));
            let checkcode =codeList.includes(me.addCode.getValue());
            let mailList = records.map(record => record.get('mail'));
            let checkmail =mailList.includes(me.addMail.getValue());
            if(me.addCode.validate(me.addCode.getValue())==0 && me.addMail.validate(me.addMail.getValue())==0){
                me.addCode.setValue("格式不符")
                me.addMail.setValue("格式不符")
            }else if(me.addCode.validate(me.addCode.getValue())==0){
                me.addCode.setValue("格式不符")
            }else if(me.addMail.validate(me.addMail.getValue())==0){
                me.addMail.setValue("格式不符")
            }else if(checkcode==1 && checkmail==1){
                me.addCode.setValue("已存在該學號")
                me.addMail.setValue("已存在該信箱")
            }else if(checkcode==1 ){
                me.addCode.setValue("已存在該學號")
            }else if(checkmail==1 ){
                me.addMail.setValue("已存在該信箱")
            } else{
                
                console.log(me.addMail.validate(me.addMail.getValue()));
                let data = [{
                    code: me.addCode.getValue(),
                    name: me.addName.getValue(),
                    mail: me.addMail.getValue(),
                    memo: me.addMemo.getValue(),
                    status: me.addStatus.getValue(),
                    createusercode:'root',
                    createtm:Ext.Date.format(new Date(new Date().toUTCString()), 'Y-m-d'),
                    modifyusercode:'',
                    modifytm:'',
                }]
                me.viewUserlist.getStore().loadData(data,true);
                me.cleanaddsave();
            }

        } catch (e) {
            me.showError('userController/ refreshObj error:', e);
        }

    },

    cleanaddsave:function(){
        let me = this
        try {
            me.Add.hide();
            me.addCode.reset();
            me.addName.reset();
            me.addMail.reset();
            me.addMemo.reset();
            me.addStatus.reset();           
        } catch (e) {
            me.showError('userController/ cleanSearch error:', e);
        }
    },

    // 修改資料
    editsave:function(){
        let me = this
        try {
            let selection = me.viewUserlist.getSelection();
            let records = me.viewUserlist.getStore().getData().items;
            let codeList = records.map(record => record.get('code'));
            let codeArray = codeList.filter(value => value !== selection[0].get('code'));
            let checkcode =codeArray.includes(me.editCode.getValue());    
            let mailList = records.map(record => record.get('mail'));
            let mailArray = mailList.filter(value => value !== selection[0].get('mail'));
            let checkmail =mailArray.includes(me.editMail.getValue());
            if(me.editCode.validate(me.editCode.getValue())==0 && me.editMail.validate(me.editMail.getValue())==0){
                me.editCode.setValue("格式不符")
                me.editMail.setValue("格式不符")
            }else if(me.editCode.validate(me.editCode.getValue())==0){
                me.editCode.setValue("格式不符")
            }else if(me.editMail.validate(me.editMail.getValue())==0){
                me.editMail.setValue("格式不符")
            }else if(checkcode==1 && checkmail==1){
                console.log(selection[0].mail);
                console.log(mailList);
                console.log(mailArray);
                me.editCode.setValue("已存在該學號")
                me.editMail.setValue("已存在該信箱")
            }else if(checkcode==1 ){
                me.editCode.setValue("已存在該學號")
            }else if(checkmail==1 ){
                me.editMail.setValue("已存在該信箱")            
            }else if (selection[0]) {                
                selection[0].set('code',me.editCode.getValue());
                selection[0].set('name',me.editName.getValue());
                selection[0].set('mail',me.editMail.getValue());
                selection[0].set('memo',me.editMemo.getValue());
                selection[0].set('status',me.editStatus.getValue());
                selection[0].set('modifyusercode','root');
                selection[0].set('modifytm',Ext.Date.format(new Date(new Date().toUTCString()), 'Y-m-d'));
                selection[0].getStore().sync();
                me.cleaneditsave();
            }
            } catch (e) {
            me.showError('userController/ refreshObj error:', e);
        }

    },

    cleaneditsave:function(){
        let me = this
        try {
            me.Edit.hide();
            me.onSelectUser();           
        } catch (e) {
            me.showError('userController/ cleanSearch error:', e);
        }
    },

    // 刪除資料
    delsave:function(){
        let me = this
        try {
            let selection = me.viewUserlist.getSelection();
            let record = selection[0];
            me.viewUserlist.getStore().remove(record)
            me.viewUserlist.getStore().sync();           
        } catch (e) {
            me.showError('userController/ cleanSearch error:', e);
        }
    },

    cleandelsave:function(){
        let me = this       
        try {
            me.Del.hide();
            me.onSelectUser();           
        } catch (e) {
            me.showError('userController/ cleanSearch error:', e);
        }
    },
});