Ext.define('antnex.subsystem.41041120.user.userController',{
    extend:'Ext.app.ViewController',
    alias:'controller.page-41041120-user',
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
            me.initPageStatus();

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
    // function:初始化物件-首次進入觸發(override)
    initObj:function(){
        let me = this
        try{
            //功能列
            me.funbarSearch = me.lookupReference('btn-41041120-search');
            me.funbaradd = me.lookupReference('btn-41041120-add');
            me.funbaredit = me.lookupReference('btn-41041120-edit');
            me.funbarsave = me.lookupReference('btn-41041120-save');
            me.funbarcancel = me.lookupReference('btn-41041120-cancel');

            //查詢列
            me.searchbar = me.lookupReference('panel-41041120-searchbar');
            me.searchcode = me.lookupReference('txt-41041120-searchcode');
            me.searchname = me.lookupReference('txt-41041120-searchname');
            me.searchstatus = me.lookupReference('cmbx-41041120-searchsatus');

            //主畫面
            me.viewUserlist = me.lookupReference('grid-41041120-viewUserlist');

        } catch(e){
            me.showError('userController/ initObj error:',e);
        }
    },
    // function: 載入物件資料 - 每次進入觸發(Override)
    refreshObj: async function () {
        const me = this;
        try {
            let status = []
            status.push({ value: -1, text: '全部' });
            const statusStore = Ext.create('antnex.store.static.Status');
            statusStore.getRange().forEach(record => {
                let json = record.getData();
                delete json.id;
                status.push(json);
            });
            
            me.searchstatus.getStore().loadData(status); // 新增一個新的條件 讓searchstatus可以點擊
        } catch (e) {
            me.showError('userController/ refreshObj error:', e);
        }
    },
    //初始化頁面
    initPageStatus: function () {
        const me = this;
        try {
            me.cleanSearch();
            me.loadData();
        } catch (e) {
            me.showError('userController/ initPageStatus error:', e);
        }
    },

    changeStatus:function(action){
        let me = this;
        try{
            me.setConfig('action', action);
            console.log(`窗口狀態為: ${me.getConfig('action')}`);
        } catch(e){
            me.showError('userController / changeStatus error:',e)
        }
    },


    //enter查詢
    enterSearch:function(field,e){
        let me = this
        try{
            if (e.getKey() == e.ENTER){
                me.doSearch();
            }
        } catch (e){
            me.showError('userController/ enterSearch error:',e);
        }
    },
    
    // 按鈕查詢
    doSearch: async function(){
        let me = this
        try{//從三格空格取值
            let code = me.searchcode.getValue();
            let name = me.searchname.getValue();
            let status = me.searchstatus.getValue();

            let uploadJSON={
                txcode: 'BASIC_USER_LIST_FILTER',
                code : code,
                name : name,
                status: status,
            }
        
             //給上遮罩
            me.viewUserlist.mask(CONST_LOADING_HINT);
             // await 等待antnex.ProxyService.send 執行完 json=執行完接收的回傳值
            const json = await antnex.ProxyService.send(uploadJSON);
            me.viewUserlist.unmask();

            switch (json.status) {//檢查json.status的值 
                case CONST_STATUS_OK://CONST_STATUS_OK=操作成功
                    const data = json.message.data;//insominia 裡data存放在message裡的data
                    me.viewUserlist.getStore().loadData(data); 
                    
                    break;
                default:
                    throw json.statusText
            }
            

        } catch (e) {
            me.showError('userController/ dosearch error',e);
        }
    },

    cleanSearch:function(){
        let me = this
        try {
            me.searchcode.setValue('');
            me.searchname.setValue('');
            me.searchstatus.setValue(-1);
        } catch (e){
            me.showError('userController/ cleanSearch error:',e);
        }
    },

    // 抓取狀態值 轉換成文字
    customRenderer:function(value) {
        let store = Ext.create('antnex.store.static.Status');
        let record = store.getRange().find(e => e.get('value') == value);
        return record ? record.get('text') : `無法辨識: ${value}`;
    },
    //跳出窗口
    windows:function(){
        try{
            let me = this;
            let window = Ext.create('Ext.window.Window',{
            title: '確認視窗',
            height: 350,
            width: 400,
            layout: 'fit',
            items: {  
                xtype: 'panel',
                layout:{
                    type:'vbox',
                },
                style:{
                    whiteSpace: 'normal',
                    
                },
                margin:'10 0 0 10',
                items:[{
                    xtype: 'numberfield',
                    fieldLabel: 'ids',
                    reference: 'num-41041120-user-ids',
                    labelWidth: 37,
                    cls: 'fieldNotInput',
                },{
                    xtype: 'textfield',
                    fieldLabel: '學號',
                    reference: 'txt-41041120-code',
                    labelWidth: 37,
                    width: '40%',
                    cls: 'fieldRequired',
                },{
                    xtype: 'textfield',
                    fieldLabel:'姓名',
                    reference:'txt-41041120-name',
                    labelWidth:37,
                    width:'40%',
                    cls: 'fieldRequired',
                },{
                    xtype:'textfield',
                    fieldLabel:'信箱',
                    reference:'txt-41041120-mail',
                    labelWidth:37,
                    width:'60%'
                },{
                    xtype:'textfield',
                    fieldLabel:'密碼',
                    reference:'txt-41041120-pwd',
                    labelWidth:37,
                    width:'60%',
                    cls: 'fieldRequired',
                    inputType: 'password'
                },{
                    xtype:'combobox',
                    fieldLabel:'狀態',
                    reference:'cmbx-41041120-addstatus',
                    labelWidth:37,
                    cls: 'fieldRequired',

                    valueField:'value',
                    displayField:'text',
                    queryMode:'local',
                    forceSelection: true,
                    anyMatch: true,
                    editable: false,
                    store: {type:'status'},
                    
                },{
                    xtype:'textfield',
                    fieldLabel:'備註',
                    reference:'txt-41041120-memo',
                    labelWidth:37,
                    height:'20%',
                    width:'80%'
                },
                {
                    xtype: 'button',
                    text: '儲存',
                    scale: 'small',
                    cls: 'antBtn-blue',
                    iconCls: 'fa fa-plus',
                    margin: '0 0 5 5',
                    handler: function(){
                        me.windowsave()
                    },
                    width: 80,
                    style: {
                        textAlign: 'center'
                    },
                    reference:'btn-41041120-save',
                },{
                    xtype: 'button',
                    text: '取消',
                    scale: 'small',
                    cls: 'antBtn-red',
                    iconCls: 'fa fa-times',
                    margin: '0 0 5 5',
                    handler: function(){
                        window.close()
                    },
                    width: 80,
                    style: {
                        textAlign: 'center'
                    },
                },]
                }
                
            }
            ).show();
        } catch(e){
            me.showError('userController / windows',e);
        }
    },

    //按下新增時發生事件
    funcbar_add:function(){
        let me = this
        try{
            me.windowrun()
            me.changeStatus('add')
            let act =Ext.WindowManager.getActive();
            act.down('[reference=cmbx-41041120-addstatus]').setValue(1)
            act.down('[reference=num-41041120-user-ids]').setValue(0)
            act.down('[reference=num-41041120-user-ids]').setHidden(true)
        } catch(e) {
            me.showError('userController / funcbar_add',e)
        }
    },

    //按下編輯時 發生事件並把選擇輸入文字方塊
    funbar_edit: function () {
        let me = this;
        try {
            let selection = me.viewUserlist.getSelection()[0];
            if (selection){
                me.windowrun();   
                me.changeStatus('edit')
                me.loadData(selection.get('code'))
                let act =Ext.WindowManager.getActive();
                act.down('[reference=num-41041120-user-ids]').setHidden(true)
            }else{
                throw `錯誤訊息`,'請選擇一筆資料再點擊修改'
            }
            
            
            
        } catch (e) {
            me.showError('userController / funbar_edit', e);
        }
    },

    

    // 選取資料 點擊修改按鈕後發生事件
    loadData:async function(code=''){
        let me = this
        try{
            let loadFn = function(json ={}){
                let ids = json.ids ? json.ids:'';
                let code = json.code ? json.code : '';
                const name = json.name ? json.name : '';
                const mail = json.mail ? json.mail : '';
                const password = json.password ? json.password : '';
                const status = json.status ? json.status : '';
                const memo = json.memo ? json.memo : '';
                const editable = ids > 0;

 
                Ext.defer(function () {
                    let act =Ext.WindowManager.getActive();
                    if(act){
                        act.down('[reference=txt-41041120-code]').setReadOnly(true);
                        act.down('[reference=txt-41041120-code]').setValue(code);
                        act.down('[reference=txt-41041120-name]').setValue(name);
                        act.down('[reference=txt-41041120-mail]').setValue(mail);
                        act.down('[reference=txt-41041120-pwd]').setValue(password);
                        act.down('[reference=txt-41041120-pwd]').setReadOnly(true);
                        act.down('[reference=txt-41041120-memo]').setValue(memo);
                        act.down('[reference=cmbx-41041120-addstatus]').setValue(status);
                        act.down('[reference=num-41041120-user-ids]').setValue(ids);
                        }
                }, 50);
        
            }
            
            loadFn();
            if (code){
                const uploadJSON = {
                    txcode:'BASIC_USER_FIND_BY_CODE',
                    code:code,
                };
            
            const json = await antnex.ProxyService.send(uploadJSON);
            switch (json.status) {
                case CONST_STATUS_OK:
                    const data = json.message.data;
                    loadFn(data);
                    console.log(data)
            
                    break;
                default:
                    throw json.statusText
                }
    

            }
        }catch(e){
            me.showError('userController/ loadData error:', e);
        }
    },

    //窗口儲存按鍵實作
    windowsave:async function(){
        const me = this;
        try {
            let act =Ext.WindowManager.getActive();
            let checkSaveFormat = async function () {
                
                if (S(act.down('[reference=txt-41041120-code]').getValue()).isEmpty()) {
                    throw `請輸入學號`;
                }

                if (S(act.down('[reference=txt-41041120-name]').getValue()).isEmpty()) {
                    throw `請輸入姓名`;
                }

                if (S(act.down('[reference=txt-41041120-pwd]').getValue()).isEmpty()) {
                    throw `請輸入密碼`;
                }

                if (S(act.down('[reference=cmbx-41041120-addstatus]').getValue()).isEmpty()){
                    throw `請選擇狀態`;
                }
            }
            await checkSaveFormat();

            data = me.getinput();
            Ext.Msg.confirm('提醒', '是否儲存？', async function (btn) {
                if (btn == 'yes') {
                const uploadJSON = {
                    txcode: me.getConfig('action') == 'add' ? 'BASIC_USER_INSERT' : 'BASIC_USER_UPDATE',
                    ids : data[0].ids,
                    code : data[0].code,
                    name : data[0].name,
                    mail : data[0].mail,
                    password : data[0].password,
                    status : data[0].status,
                    memo : data[0].memo
                }
                const json = await antnex.ProxyService.send(uploadJSON);
                switch (json.status) {
                    case CONST_STATUS_OK:
                        const code = json.message.code;

                        // 切換頁面狀態
                        me.changeStatus('');

                        // 紀錄此次修改的資料
                        me.setConfig('requireKeylist', [code]);

                        // 重新查詢
                        me.doSearch();
                        break;
                    default:
                        me.showMessage(json.statusText);
                }
            }
        })
    
        } catch (e) {
            this.showError('userController / windowsave', e);
        }

    },

    //新增(暫時)
    newadd:function(){
        let me = this
        try{
            let userstore = me.viewUserlist.getStore();
                userstore.add(me.getinput());
            
        } catch(e){
            me.showError('userController/newadd',e)
        }
    },

    newedit:function(){
        try{
            console.log('newedit')
        } catch(e){
            me.showError('userController/newedit',e)
        }
    },

    //確認是否有視窗已運行
    windowrun:function(){
        let me = this;
        let act =Ext.WindowManager.getActive();
            if (act){
                throw '已有運行視窗，請關閉後再試';
            }else{
                me.windows();
            }
    },

    //取得輸入值
    getinput:function(){
        let me=this
        try{
            let act =Ext.WindowManager.getActive();
                if(act){
                    let code = act.down('[reference=txt-41041120-code]').getValue();
                    let name = act.down('[reference=txt-41041120-name]').getValue();
                    let mail = act.down('[reference=txt-41041120-mail]').getValue();
                    let memo = act.down('[reference=txt-41041120-memo]').getValue();
                    let status = act.down('[reference=cmbx-41041120-addstatus]').getValue();
                    let pwd = act.down('[reference=txt-41041120-pwd]').getValue();
                    let ids = act.down('[reference=num-41041120-user-ids]').getValue();
                    let data=[{
                        code:code,
                        name:name,
                        mail:mail,
                        memo:memo,
                        status:status,
                        password :pwd,
                        ids : ids
                    }]
                    return data
                }
            
        } catch(e){
            me.showError('userController/getinput',e)
        }
    },

    funcbar_search: function () {
        const me = this;
        try {
            me.searchbar.setHidden(!me.searchbar.hidden);
        } catch (e) {
            me.showError('userController/ funcbar_search error:', e);
    }
},
    //提示訊息
    showMessage:function(message){
        Ext.Msg.alert(`${this.getConfig('name')}`,message);
    },
    //跳出錯誤訊息
    showError:function(path,e){
        this.showMessage(e);
        return false;
    },
});
