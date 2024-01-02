Ext.define('antnex.view.system.window.WindowContainer', {
    extend: 'Ext.window.Window',

    alias: 'widget.windowcontainer',

    title: '視窗容器',

    // reference: 'win_windowcontainer_container',

    layout: 'fit',

    height: 200,

    width: 200,

    minHeight: 100,

    minWidth: 200,

    border: false,

    modal: true,

    closable: true,

    draggable: true,

    dockedItems: [{
        xtype: 'antToolbar',
        dock: 'bottom',
        layout: {
            type: 'hbox',
            align: 'stretch',
            pack: 'end',
        },
        scrollable: true,
        defaults: {
            margin: 5,
        },
        items: [{
            xtype: 'antButton',
            // text: '確定',
            reference: 'btn_windowcontainer_save',
            cls: 'antBtn-doSave',
            scale: 'large',
            handler: 'doSave',
        }, {
            xtype: 'antButton',
            // text: '取消',
            reference: 'btn_windowcontainer_cancel',
            cls: 'antBtn-doCancel',
            scale: 'large',
            handler: 'doCancel',
        },]
    }],

    items: [],

    doResize: function () {
        let maxWidth = Ext.getViewportWidth() * 0.9;
        let maxHeight = Ext.getViewportHeight() * 0.9;
        if (this.width > maxWidth) this.width = maxWidth;
        if (this.height > maxHeight) this.height = maxHeight;
    }

});
