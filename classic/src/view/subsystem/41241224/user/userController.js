Ext.define('antnex.subsystem.41241224.user.userController',{
    extend:'Ext.app.ViewController',
    alias:'controller.page-41241224-user',
    initialization:async function(){
        let me =this;
        try{
            if(e.getKey()==e.ENTER){
                me.doSearch();
            }
        }
        catch(e){
            me.showError('userController/ enterSearch error',e);
        }
    },








});