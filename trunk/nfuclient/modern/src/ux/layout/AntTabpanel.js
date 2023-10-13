Ext.define('Ext.ux.layout.AntTabpanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.antTabpanel',

    border: true,

    collapsible: false,

    collapseDirection: 'left',

    collapseToolText: '收合',
    expandToolText: '展開',

    cls: 'modern-tabpanel',

    defaults: {
        // 配合ux.css內的antTabpanel來顯示關閉按鈕
        // pointer-events: none; 可使前面的div不會擋到後面的事件觸發
        closeText: '<div class="x-fa fas fa-times" style="pointer-events: none;"></div>',
    },

    listeners: {
        afterrender: function () {
            this.activeAllItems();
        },
    },

    // 將所有頁籤點選過一次, focusIdx 為最後停留的index
    activeAllItems: function (focusIdx = 0) {
        let me = this;
        try {
            let items = me.items.items;
            if (focusIdx >= items.length) focusIdx = items.length - 1
            let activeItem = null;
            items.forEach((e, idx) => {
                me.setActiveItem(e);
                if (idx == focusIdx) activeItem = e;
                if (activeItem) me.setActiveItem(activeItem);
            });
        } catch (e) {
            Ext.Msg.alert('AntTabpanel Error', e);
        }
    },
});