Ext.define('antnex.ux.label.AntLabel', {
    extend: 'Ext.Label',
    alias: 'widget.antLabel',

    style: 'text-align:left; fontWeight:bold; fontSize:14px; color:rgb(25,25,25);',
    numberFormat: null,
    iconFormat: null,
    iconWidth: '22px',
    requiredFormat: false,

    // 偵測Html變更
    updateHtml: function (html) {
        let me = this;
        let el = this.element;
        if (el) {
            el.setHtml(html || '');
            if (me.numberFormat) {
                me.doNumberFormat();
            }

            me.doHtmlFormat()
        }
    },

    // 數值轉換
    doNumberFormat: function () {
        let me = this;

        // 判斷是否含非數字
        if (!/\D/.test(me.getHtml())) {
            let num = numeral(me.getHtml()).value();
            let value = Ext.util.Format.number(num, me.numberFormat);
            me.setHtml(value);
        }

    },

    // 取得格式化文字: undefined => emptyValue
    getFormatedValue: function (emptyValue) {
        let me = this;
        emptyValue = emptyValue ? emptyValue : '';
        let value = me.getHtml();
        if (me.numberFormat) {
            value = numeral(value).value();
            emptyValue = 0;
        }

        return value ? value : emptyValue;
    },

    // html格式化(避免不同寬度的icon造成不同步)
    doHtmlFormat: function () {
        let me = this;

        let iconHtml = ""

        if (me.iconFormat) {
            iconHtml = `<span class="${me.iconFormat}" style='width: ${me.iconWidth}; overflow: hidden;'> </span>`
        }

        let requiredHtml = ""

        if (me.requiredFormat) {
            requiredHtml = `<span style="color:red;">&nbsp;*</span>`
        }

        if (!/<[a-z][\s\S]*>/i.test(me.getHtml())) {
            let html = `
                <div style='display: flex; align-items: center;'>
                ${iconHtml}
                <span>${me.getHtml()}</span>
                ${requiredHtml}
                </div>`
            me.setHtml(html);
        }

    },
});
