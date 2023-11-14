Ext.define('antnex.subsystem.41041120.user.userController',{
    extend:'Ext.app.ViewController',
    alias:'controller.page-41041120-user',
    requires: [],
    config: {
        name: '使用者管理1',
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
            me.viewmanage = me.lookupReference('panel-41041120-manage');
            me.viewcode = me.lookupReference('txt-41041120-code');
            me.viewname = me.lookupReference('txt-41041120-name');
            me.viewmail = me.lookupReference('txt-41041120-mail');
            me.viewstatus = me.lookupReference('cmbx-41041120-addstatus');

            //擴充功能
            me.gridadd = me.lookupReference('btn-41041120-gridadd');
            me.griddel = me.lookupReference('btn-41041120-griddel');
        } catch(e){
            me.showError('userController/ initObj error:',e);
        }
    },
    // function: 載入物件資料 - 每次進入觸發(Override)
    refreshObj: async function(){
        let me = this
        try{
            let data=[{
                code: 'root',
                name:'系統管理員',
                mail: '123@gmail.com',
                status: 1,
            }]
            me.viewUserlist.getStore().loadData(data);
        } catch (e){
            me.showError('userController/ refreshObj error:',e);
        }
    },

    //searchbar

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
                code : code,
                name : name,
                status: status,
            }
            //讓中控台可以知道進度
            console.log('查詢條件');
            console.log(uploadJSON);

            me.viewUserlist.getStore().clearFilter(); //清除上一個 過濾器
            me.viewUserlist.getStore().filter(e => { //設定過濾
                let display = true;
                if (uploadJSON.code){
                    display = e.get('code').includes(uploadJSON.code) ? display:false;
                    //讓變數e獲得名code的資料因為是文字用includes如果包含 抓資料出來 
                }
                
                if (uploadJSON.name){
                    display = e.get('name').includes(uploadJSON.name)? display:false;
                }

                if (uploadJSON.status){
                    display = e.get('status') == status ? display :false;
                }
                //中控顯示濾值狀況
                console.log(`正在處理: ${JSON.stringify(e.getData())} => ${display ? '顯示' : '不顯示'}`);

                return display;
            })

        } catch (e) {
            me.showError('userController/ dosearch error',e);
        }
    },

    // event: 選擇使用者，讓資料維護那出現
    onSelectUser:function(){
        let me = this
        try {
            let selection = me.viewUserlist.getSelection();
            let record = selection[0];
            
            me.viewcode.setValue('');
            me.viewname.setValue('');
            me.viewmail.setValue('');
            me.viewstatus.setValue('');

            if (record){
                me.viewcode.setValue(record.get('code'));
                me.viewname.setValue(record.get('name'));
                me.viewmail.setValue(record.get('mail'));
                me.viewstatus.setValue(record.get('status'));
            }
        } catch (e) {
            me.showError('userController/ cleanSearch error:',e);
        }

    },
    cleanSearch:function(){
        let me = this
        try {
            me.searchcode.setValue('');
            me.searchname.setValue('');
            me.searchstatus.setValue('');
        } catch (e){
            me.showError('userController/ cleanSearch error:',e);
        }
    },

    //增加使用者清單
    gridpanel_add:function(){
        let me = this
        try{//取維護裡的值
            let code = me.viewcode.getValue();
            let name = me.viewname.getValue();
            let mail = me.viewmail.getValue();
            let status = me.viewstatus.getValue();

            let data =[{
                code: code,
                name: name,
                mail: mail,
                status: status,
                
            },
        ]
        console.log(data)

        let userstore = me.viewUserlist.getStore();//取出原本的資料
        userstore.add(data);//增加新的一筆內容
        me.viewUserlist.loadData(userstore);//重新載入新的資料集
        } catch (e){
            me.showError('userController / gridpanel_add error',e);
        }
    },
    gridpanel_delete:function(){
        let me = this
        try{
            let selection = me.viewUserlist.getSelection();//抓出點擊的表格行
            let record = selection[0];//確認哪一行
            console.log(record);
            let userstore = me.viewUserlist.getStore();//取出原有資料
            userstore.remove(record);//刪除以選擇的行列
            me.viewUserlist.loadData(userstore);//重載
        } catch(e){
            me.showError('userController/ gridpanel_delete:',e);
        }
    }
});
