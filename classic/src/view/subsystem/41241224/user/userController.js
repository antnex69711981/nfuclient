Ext.define('antnex.subsystem.41241224.user.userController',{
    extend:'Ext.app.ViewController',
    alias:'controller.page-41241224-user',
    onInitialize:async function(){
        const me = this;
        me.initObj();
        me.initPageStatus();
    },
    initPageStatus:function(){
        const me = this;
        me.cleansearch();
    },
    initObj:function(){//物件定義
        let me =this;
        me.searchBar=me.lookupReference('panel-user-user-searchbar');
        me.searchCode = me.lookupReference('txt-user-user-searchbar-code');
        me.searchName = me.lookupReference('txt-user-user-searchbar-name');
        me.searchStatus=me.lookupReference('cm-user-user-searchbar-status');
        me.viewUserlist= me.lookupReference('grid-user-user-userlist');
        me.viewUserMange=me.lookupReference('panel-user-user-manage');
    },
    presSearch:function(field,e){
        const me =this;
        if(e.getKey()==e.ENTER){
            me.doSearch();
        }
    },
    doSearch:async function(){
        const me = this;
        try{
            const code=me.searchCode.getValue();
            const name = me.searchName.getValue();
            const status = me.searchStatus.getValue();
            const uploadJSON={
                txcode:'BASIC_USER_LIST_FILTER',
                code: code,
                name: name,
                status: status,
            };
            const requireKeylist = me.getConfig('requireKeylist');
            me.setConfig('requireKeylist',[]);
            me.viewUserlist.mask(CONST_LOADING_HINT);
            const json = await antnex.ProxyService.send(uploadJSON);
            me.viewUserlist.unmask();
            switch (json.status){
                case CONST_STATUS_OK:
                    const data = json.message.data;
                    me.viewUserlist.getStore().loadData(data);
                    const records = me.viewUserlist.getStore().getRange().filter(e => requireKeylist.includes(e.get('code')));
                    me.viewUserlist.setSelection(records);
                    break;
                default:
                    throw json.statusText
            }  
        }
        catch(e){
            me.showError('userController/ doSearch error:', e);
        }
    },
    cleansearch:function(){//清除查詢列
        const me =this;
        me.searchCode.setValue('');
        me.searchName.setValue('');
        me.searchStatus.setValue(-1);
    },
    onSelectUser:function(){
        const me =this;
        const record =me.viewUserlist.getSelection()[0];
        const code =record?record.get('code'):'';
        me.loadData(code);
    },
    loadData:async function(code=''){
        const me=this;
        try{
            let loadFn=function(json={}){
                const ids = json.ids ? json.ids : '';
                const code = json.code ? json.code : '';
                const name = json.name ? json.name : '';
                const mail = json.mail ? json.mail : '';
                const password = json.password ? json.password : '';
                const status = json.status ? json.status : '';
                const memo = json.memo ? json.memo : '';

                const editable = ids > 0;

                me.funcbarEdit.setDisabled(editable == false);

                me.viewIds.setValue(ids);
                me.viewCode.setValue(code);
                me.viewName.setValue(name);
                me.viewMail.setValue(mail);
                me.viewPassword.setValue(password);
                me.viewStatus.setValue(status);
                me.viewMemo.setValue(memo);
            }
            loadFn();
            if(code){
                const uploadJSON={
                    txcode:'BASIC_USER_FIND_BY_CODE',
                    code:code,
                };
                me.viewUserMange.mask(CONST_LOADING_HINT);
                const json = await antnex.ProxyService.send(uploadJSON);
                me.viewUserMange.unmask();
                switch(json.status){
                    case CONST_STATUS_OK:
                        const data = json.message.data;
                        loadFn(data);
                        break;
                    default:
                        throw json.statusText
                }
            }
            
        }
        catch(e){
            me.showError('userController/ loadData error:', e);
        }
    },








});