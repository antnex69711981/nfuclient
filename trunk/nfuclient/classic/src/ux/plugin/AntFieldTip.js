Ext.define('antnex.ux.plugin.AntFieldTip', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.antFieldTip',

    config: {
        field: null,
        fieldLabel: null,
    },

    text: '',
    /**
     * 有效直請參考 JavaScript DOM Event
     * 目前允許內容請見`setTip`中的變數`eventList`
     */
    event: 'click',

    /**
     * tip執行時所觸發的函數
     * 
     * @param {object} field 
     */
    handler: function (field) {

    },

    constructor: function (config) {
        let me = this;
        me.callParent(arguments);

        if (config) {
            let field = config.cmp;
            if (field) {
                let afterrender = function () {
                    try {
                        let fieldLabel = field.fieldLabel ? field.fieldLabel : '';

                        me.setConfig('field', field);
                        me.setConfig('fieldLabel', fieldLabel);

                        // 產生一個javascript全域函數
                        FIELD_TIP_PROXY = function (objectID) {
                            try {
                                let object = Ext.ComponentMgr.get(objectID);
                                let plugin = object.getPlugin(`${objectID}-antFieldTip`)
                                if (plugin) {
                                    ConvertTK.fireEvent(object, plugin.handler, null, object);
                                }
                            } catch (e) {
                                console.log(`antFieldTip/ FIELD_TIP_PROXY error: `, e);
                            }
                        }

                        me.id = `${field.id}-antFieldTip`;

                        let optins = {
                            text: me.text,
                            event: me.event,
                            handler: me.handler,
                        }
                        me.setTip(optins)
                    } catch (e) {
                        console.log('antFieldTip/ afterrender error', e)
                    }
                }
                field.addListener('afterrender', () => {
                    afterrender();
                });
            }
        }
    },

    setTip: function (optins = {}) {
        let me = this;

        // JavaScript DOM Event
        let eventList = ['click', 'dblclick', 'focus', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup'];

        let field = me.getConfig('field');
        let fieldLabel = me.getConfig('fieldLabel');
        let text = optins.text ? optins.text : '';
        let event = `on${eventList.includes(optins.event) ? optins.event : 'click'}`;
        let handler = optins.handler;

        me.text = text;
        me.event = event;
        me.handler = handler;

        let tipLabel = handler ? ` <a href="#" ${event}="javascript:FIELD_TIP_PROXY('${field.id}')">${text}</a>` : text;
        field.setFieldLabel(`${fieldLabel}${tipLabel}`);
    },
    clearTip: function () {
        let me = this;
        me.setTip({
            text: '',
            handler: null,
        })
    }
});