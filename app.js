/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.ariaWarn = Ext.emptyFn;

Ext.application({
    extend: 'antnex.Application',

    name: 'antnex',

    requires: [
        // This will automatically load all classes in the antnex namespace
        // so that application classes do not need to require each other.
        'antnex.view.viewport.Viewport'
    ],

    // The name of the initial view to create.
    mainView: 'antnex.view.viewport.Viewport',


    listen : {
        global : {
            unmatchedroute : 'onUnmatchedRoute'
        }
    },

    onUnmatchedRoute : function (hash) {
        Ext.Msg.alert('路徑錯誤', '"' + token + '" 找不到該路徑!');
        this.redirectTo('home');
    }
});
