Ext.define('antnex.ux.field.AntHtmleditor', {
    extend: 'Ext.form.field.HtmlEditor',
    alias: 'widget.antHtmleditor',

    readOnly: false,

    buttonTips: {
        bold: {
            // title: 'Bold (Ctrl+B)',
            // text: 'Make the selected text bold.',
            text: '粗體 (Ctrl+B)',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
        },
        italic: {
            // title: 'Italic (Ctrl+I)',
            // text: 'Make the selected text italic.',
            text: '斜體 (Ctrl+I)',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
        },
        underline: {
            // title: 'Underline (Ctrl+U)',
            // text: 'Underline the selected text.',
            text: '底線 (Ctrl+U)',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
        },
        increasefontsize: {
            // title: 'Grow Text',
            // text: 'Increase the font size.',
            text: '字體變大',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
        },
        decreasefontsize: {
            // title: 'Shrink Text',
            // text: 'Decrease the font size.',
            text: '字體變小',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
        },
        backcolor: {
            // title: 'Text Highlight Color',
            // text: 'Change the background color of the selected text.',
            text: '填滿顏色',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
        },
        forecolor: {
            // title: 'Font Color',
            // text: 'Change the color of the selected text.',
            text: '文字顏色',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
        },
        justifyleft: {
            // title: 'Align Text Left',
            // text: 'Align text to the left.',
            text: '靠左對齊',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
        },
        justifycenter: {
            // title: 'Center Text',
            // text: 'Center text in the editor.',
            text: '置中',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
        },
        justifyright: {
            // title: 'Align Text Right',
            // text: 'Align text to the right.',
            text: '靠右對齊',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
        },
        insertunorderedlist: {
            // title: 'Bullet List',
            // text: 'Start a bulleted list.',
            text: '項目符號',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
        },
        insertorderedlist: {
            // title: 'Numbered List',
            // text: 'Start a numbered list.',
            text: '項目編號',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
        },
        createlink: {
            // title: 'Hyperlink',
            // text: 'Make the selected text a hyperlink.',
            text: '超連結',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
        },
        sourceedit: {
            // title: 'Source Edit',
            // text: 'Switch to source editing mode.',
            text: '網頁原始碼',
            cls: Ext.baseCSSPrefix + 'html-editor-tip'
        },
    },

    enableFont: true,
    enableFontSize: true,
    enableColors: true,
    enableAlignments: true,
    enableFormat: true,
    enableLists: true,
    enableLinks: true,
    enableSourceEdit: true,
    enableTips: true,

    // override
    getToolbarCfg: function () {
        let me = this;
        let tipsEnabled = Ext.quickTipsActive && Ext.tip.QuickTipManager.isEnabled();
        let baseCSSPrefix = Ext.baseCSSPrefix;

        // 取得原始的toolbar
        let toolbar = this.callParent(arguments);

        try {
            if (me.enableTips) {
                let id = 'tips';
                let reference = `${me.id}_${id}`
                console.log(reference)
                let btn = {
                    itemId: id,
                    reference: reference,
                    cls: `${baseCSSPrefix}btn-icon`,
                    iconCls: `${baseCSSPrefix}fa fa-question-circle`,
                    enableToggle: false,
                    scope: me,
                    clickEvent: 'mousedown',
                    tabIndex: -1,
                    handler: function () {

                        Ext.ComponentQuery.query(`tooltip[reference="${reference}_tip"]`).forEach(e => e.destory());

                        // 設置ToolTip
                        new Ext.tip.ToolTip({
                            target: Ext.ComponentQuery.query(`button[reference="${reference}"]`)[0],
                            reference: `${reference}_tip`,
                            anchor: 'bottom',
                            title: '複製貼文教學',
                            html:
                                '<div>' +
                                '<ul style="margin-bottom: 15px;">' +
                                '<li>請使用「右鍵」->「貼上並符合樣式/以純文字貼上」避免格式異常</li>' +
                                '</ul>' +
                                '<iframe width="470" height="315" src="https://www.youtube.com/embed/0AL-QsAEgKE?playlist=0AL-QsAEgKE&loop=1&controls=0&autoplay=1&mute=1&loop=1" frameborder="0" encrypted-media"></iframe>' +
                                '</div>'
                            ,
                            width: 480,
                            height: 325,
                            autoHide: false, // 自動隱藏
                            closable: true, // 叉叉按鈕
                            trackMouse: false, // 追蹤滑鼠
                            collapsible: false, // 收合按鈕
                            hideDelay: 0,
                        }).show()

                    }
                }

                toolbar.items.push('-', btn);
            }
        } catch (e) {
            console.log(e)
        }


        return toolbar;
    },

    // enable: true / false / 'apply'
    enableField: function (enable) {
        let me = this;
        let readOnly = enable === false;
        me.setReadOnly(readOnly);
        return enable;
    },
});