Ext.define('antnex.ux.field.AntSuneditor', {
    extend: 'Ext.panel.Panel',
    config: {
        readOnly: false,
        options: null,
    },

    suneditor: null,

    alias: 'widget.antSuneditor',

    bodyStyle: {
        'background': 'transparent',
    },

    listeners: {
        afterrender: function () {
            let me = this;
            try {
                setTimeout(() => {
                    me.initSuneditor();
                }, 0.1);
            } catch (e) {
                console.log(`AntSuneditor/ afterrender error: ${e}`)
            }
        },
    },

    options: null,

    minHeight: 0,

    height: 'auto',

    placeholder: 'Start typing something...',
    templates: [
        {
            name: 'Template-1',
            html: '<p>HTML source1</p>'
        },
        {
            name: 'Template-2',
            html: '<p>HTML source2</p>'
        }
    ],

    buttonList: {
        undo: false, // 上一步
        redo: false, // 下一步
        font: true, // 字型
        fontSize: true, // 字體大小
        formatBlock: false, // 段落格式
        bold: true, // 粗體
        underline: true, // 底線
        italic: true, // 斜體
        strike: false, // 刪除線
        subscript: false, // 下標
        superscript: false, // 上標
        fontColor: true, // 文字顏色
        hiliteColor: true, // 文字底色
        textStyle: false, // 文字樣式
        removeFormat: true, // 移除樣式
        align: true, // 對齊方式
        horizontalRule: false, // 分隔線
        list: false, // 清單
        lineHeight: false, // 行高
        table: false, // 表格
        link: true, // 超連結
        image: true, // 圖片
        video: true, // 影片嵌入
        fullScreen: true, // 全螢幕編輯
        showBlocks: false, // 顯示編輯段落
        codeView: true, // 原始碼
        preview: true, // 預覽
        print: true, // 列印
    },

    // 初始化 suneditor
    initSuneditor: function () {
        let me = this;
        try {
            // buttonList
            let buttonList = [];

            // 檢查功能群組是否啟用
            let checkEnableGroup = function (typelist = []) {
                let arr = typelist.filter(btn => me.buttonList[btn] === true);
                if (arr.length > 0) buttonList.push(arr);
            }

            checkEnableGroup(['undo', 'redo']);
            checkEnableGroup(['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript']);
            checkEnableGroup(['fontColor', 'hiliteColor', 'textStyle']);
            checkEnableGroup(['removeFormat']);
            checkEnableGroup(['font', 'fontSize', 'formatBlock']);
            checkEnableGroup(['align', 'horizontalRule', 'list', 'lineHeight']);
            checkEnableGroup(['table', 'link', 'image', 'video']);
            checkEnableGroup(['fullScreen', 'showBlocks', 'codeView']);
            checkEnableGroup(['preview', 'print']);

            // templates
            let templates = [];
            if (me.templates.length > 0) {
                templates = me.templates;
                buttonList.push(['template']);
            }

            // options
            let options = {
                mode: 'classic', // 'classic', 'inline', 'balloon', 'balloon-always'
                display: 'block',
                width: '100%',
                minHeight: me.minHeight,
                height: `${me.height}`,
                popupDisplay: 'full',
                buttonList: buttonList,
                templates: templates,
                placeholder: me.placeholder,
                codeMirror: CodeMirror, // lib/codemirror.min.js
                hideToolbar: false,

                // 產生完整的html格式
                fullPage: false,

                // 預覽預設格式: Ex. `<div style='width:auto; max-width:1080px; margin:auto;'><h1>Preview Template</h1> {{contents}} <div>_Footer_</div></div>` 
                previewTemplate: null,

                // 列印預設格式: Ex. `<div style='width:auto; max-width:1080px; margin:auto;'><h1>Print Template</h1> {{contents}} <div>_Footer_</div></div>`
                printTemplate: null,

                // 字數計數
                charCounter: true,
                charCounterType: 'char', // 'char', 'byte', 'byte-html'

                // 字型
                // font: [], // defaults: ['Arial', 'Comic Sans MS', 'Courier New', 'Impact', 'Georgia', 'tahoma', 'Trebuchet MS', 'Verdana'],
                // fontSize: [], // defaults: [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72],

                // 顏色
                // colorList: [], // Array: [] use [] to break line

                // 行高
                // lineHeights: [], // Array[Object]: [{ text: '1', value: 1 }] 

                // 圖片
                imageUploadSizeLimit: null, // number(bytes)
                imageMultipleFile: false, // 多圖片選取
                imageAccept: ['*'].toString(), // 檔案格式 Ex. ['.jpg', '.png'].toString()

                callBackSave: me.hasListeners['callBackSave'.toLowerCase()] ? (content, isChanged) => me.fireEvent('callBackSave', me, content, isChanged) : null,
            }

            // 如果有設定options
            if (me.options) {
                // 分別取得this跟config的設定做比對
                let slf = JSON.stringify(me.options);
                let cfg = JSON.stringify(me.getConfig('options'));

                // 若設定不同則使用this.options
                options = slf == cfg ? options : slf;
            }

            me.options = options;
            me.setConfig('options', options);

            // 產生editor
            let plugin = SUNEDITOR;
            if (plugin) {
                // 如果曾經產生過editor, 先移除
                if (me.suneditor) {
                    me.suneditor.destroy()
                    me.suneditor = null;
                }

                // 建立editor
                let suneditor = plugin.create(me.id, options);
                me.suneditor = suneditor
                me.suneditor.setContents('');

                /**
                 * 因為suneditor的core.js會判斷是否為function, 所以無法直接做介接
                 * 先判斷是否有此listener再決定是否作介接
                 */
                let applyListeners = function (event = '', fn) {
                    if (me.hasListeners[event.toLowerCase()]) suneditor[event] = fn
                }

                // user events
                applyListeners('toggleCodeView', (isCodeView, editor) => me.fireEvent('toggleCodeView', me, isCodeView, editor));
                applyListeners('toggleFullScreen', (isFullScreen, editor) => me.fireEvent('toggleFullScreen', me, isFullScreen, editor));
                applyListeners('onChange', (content, editor) => me.fireEvent('onChange', me, content, editor));
                applyListeners('onResizeEditor', (h, editorHeight, core, resizeObserverEntry) => me.fireEvent('onResizeEditor', me, h, editorHeight, core, resizeObserverEntry));
                // applyListeners('onload', (core, reload) => me.fireEvent('onload', me, core, reload));
                applyListeners('onScroll', (e, core) => me.fireEvent('onScroll', me, e, core));
                applyListeners('onFocus', (e, core) => me.fireEvent('onFocus', me, e, core));
                applyListeners('onBlur', (e, core, editor) => me.fireEvent('onBlur', me, e, core, editor));
                // applyListeners('onSave', (content, core) => me.fireEvent('onSave', me, content, core));
                // applyListeners('showInline', (toolbar, context, core) => me.fireEvent('showInline', me, toolbar, context, core));
                // applyListeners('onSetToolbarButtons', (toolbarButtons, core) => me.fireEvent('onSetToolbarButtons', me, toolbarButtons, core));

                // user events
                // @returns {Boolean}
                applyListeners('onCopy', (e, clipboardData, core) => me.fireEvent('onCopy', me, e, clipboardData, core));
                applyListeners('onMouseDown', (e, core) => me.fireEvent('onMouseDown', me, e, core));
                applyListeners('onClick', (e, core) => me.fireEvent('onClick', me, e, core));
                applyListeners('onInput', (e, core) => me.fireEvent('onInput', me, e, core));
                applyListeners('onKeyDown', (e, core) => me.fireEvent('onKeyDown', me, e, core));
                applyListeners('onKeyUp', (e, core) => me.fireEvent('onKeyUp', me, e, core));
                applyListeners('onCut', (e, clipboardData, core) => me.fireEvent('onCut', me, e, clipboardData, core));

                // user events
                // @returns {String}
                applyListeners('onPaste', (e, cleanData, maxCharCount, core) => me.fireEvent('onPaste', me, e, cleanData, maxCharCount, core));
                // applyListeners('onDrop', (e, cleanData, maxCharCount, core) => me.fireEvent('onDrop', me, e, cleanData, maxCharCount, core));
            } else {
                throw `SUNEDITOR is not installed`
            }
        } catch (e) {
            console.log(`AntSuneditor/ initSuneditor error: ${e}`)
        }
    },

    // event: config('readOnly')變更時
    updateReadOnly: function (newValue, oldValue) {
        let me = this;
        let disable = newValue === false ? false : true;
        if (me.suneditor) {
            me.suneditor[disable ? 'disable' : 'enable']()
            me.suneditor.toolbar[disable ? 'disable' : 'enable']();
            me.suneditor.toolbar[disable ? 'hide' : 'show']();
        }
    },
    // function: readOnly反向函數
    enableField: function (enable) {
        me.setConfig('readOnly', !enable);
    },


    // value: getter, setter
    getValue: function () {
        let me = this;
        if (me.suneditor) me.suneditor.getContents();
        return me.suneditor ? me.suneditor.getContents() : '';
    },
    getFormatedValue: function (emptyValue) {
        let me = this;
        emptyValue = emptyValue ? emptyValue : '';
        let value = me.getValue();
        return value ? value : emptyValue;
    },
    setValue: function (value) {
        let me = this;
        if (me.suneditor) {
            me.suneditor.setContents(value);
            return value;
        } else {
            return '';
        }
    },

    // 儲存用格式
    getJson: function () {
        let me = this;
        let obj = {
            value: '',
            imagelist: []
        }
        if (me.suneditor) {
            let value = me.suneditor.getContents();
            let imagesInfo = me.suneditor.getImagesInfo();
            obj.value = value;
            obj.imagelist = imagesInfo.map(img => {
                let item = {
                    replaceKey: `${img.index}_${img.name}`,
                    name: img.name,
                    src: img.src,
                }

                // 先抽換掉原始文本的內容以節省流量
                value = value.replace(item.src, item.replaceKey);
                return item;
            })
        }
        return obj;
    },

    // 設定範本
    setTemplates: function (list = []) {
        // let me = this;
        // let value = me.getValue();
        // me.templates = list;
        // me.initSuneditor();
        // me.setValue(value);
    }
});


/**
 * suneditor default buttonList
[
    ['undo', 'redo'],
    ['font', 'fontSize', 'formatBlock'],
    ['paragraphStyle', 'blockquote'],
    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
    ['fontColor', 'hiliteColor', 'textStyle'],
    ['removeFormat'],
    ['outdent', 'indent'],
    ['align', 'horizontalRule', 'list', 'lineHeight'],
    ['table', 'link', 'image', 'video', 'audio'],
    ['imageGallery'],
    ['fullScreen', 'showBlocks', 'codeView'],
    ['preview', 'print'],
    ['save', 'template'],
    // (min-width: 1546)
    ['%1546', [
        ['undo', 'redo'],
        ['font', 'fontSize', 'formatBlock'],
        ['paragraphStyle', 'blockquote'],
        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
        ['fontColor', 'hiliteColor', 'textStyle'],
        ['removeFormat'],
        ['outdent', 'indent'],
        ['align', 'horizontalRule', 'list', 'lineHeight'],
        ['table', 'link', 'image', 'video', 'audio'],
        ['imageGallery'],
        ['fullScreen', 'showBlocks', 'codeView'],
        ['-right', ':i-More Misc-default.more_vertical', 'preview', 'print', 'save', 'template']
    ]],
    // (min-width: 1455)
    ['%1455', [
        ['undo', 'redo'],
        ['font', 'fontSize', 'formatBlock'],
        ['paragraphStyle', 'blockquote'],
        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
        ['fontColor', 'hiliteColor', 'textStyle'],
        ['removeFormat'],
        ['outdent', 'indent'],
        ['align', 'horizontalRule', 'list', 'lineHeight'],
        ['table', 'link', 'image', 'video', 'audio'],
        ['imageGallery'],
        ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template']
    ]],
    // (min-width: 1326)
    ['%1326', [
        ['undo', 'redo'],
        ['font', 'fontSize', 'formatBlock'],
        ['paragraphStyle', 'blockquote'],
        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
        ['fontColor', 'hiliteColor', 'textStyle'],
        ['removeFormat'],
        ['outdent', 'indent'],
        ['align', 'horizontalRule', 'list', 'lineHeight'],
        ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template'],
        ['-right', ':r-More Rich-default.more_plus', 'table', 'link', 'image', 'video', 'audio', 'imageGallery']
    ]],
    // (min-width: 1123)
    ['%1123', [
        ['undo', 'redo'],
        [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
        ['fontColor', 'hiliteColor', 'textStyle'],
        ['removeFormat'],
        ['outdent', 'indent'],
        ['align', 'horizontalRule', 'list', 'lineHeight'],
        ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template'],
        ['-right', ':r-More Rich-default.more_plus', 'table', 'link', 'image', 'video', 'audio', 'imageGallery']
    ]],
    // (min-width: 817)
    ['%817', [
        ['undo', 'redo'],
        [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
        ['bold', 'underline', 'italic', 'strike'],
        [':t-More Text-default.more_text', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle'],
        ['removeFormat'],
        ['outdent', 'indent'],
        ['align', 'horizontalRule', 'list', 'lineHeight'],
        ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template'],
        ['-right', ':r-More Rich-default.more_plus', 'table', 'link', 'image', 'video', 'audio', 'imageGallery']
    ]],
    // (min-width: 673)
    ['%673', [
        ['undo', 'redo'],
        [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
        [':t-More Text-default.more_text', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle'],
        ['removeFormat'],
        ['outdent', 'indent'],
        ['align', 'horizontalRule', 'list', 'lineHeight'],
        [':r-More Rich-default.more_plus', 'table', 'link', 'image', 'video', 'audio', 'imageGallery'],
        ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template']
    ]],
    // (min-width: 525)
    ['%525', [
        ['undo', 'redo'],
        [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
        [':t-More Text-default.more_text', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle'],
        ['removeFormat'],
        ['outdent', 'indent'],
        [':e-More Line-default.more_horizontal', 'align', 'horizontalRule', 'list', 'lineHeight'],
        [':r-More Rich-default.more_plus', 'table', 'link', 'image', 'video', 'audio', 'imageGallery'],
        ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template']
    ]],
    // (min-width: 420)
    ['%420', [
        ['undo', 'redo'],
        [':p-More Paragraph-default.more_paragraph', 'font', 'fontSize', 'formatBlock', 'paragraphStyle', 'blockquote'],
        [':t-More Text-default.more_text', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'fontColor', 'hiliteColor', 'textStyle', 'removeFormat'],
        [':e-More Line-default.more_horizontal', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'lineHeight'],
        [':r-More Rich-default.more_plus', 'table', 'link', 'image', 'video', 'audio', 'imageGallery'],
        ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template']
    ]]
]
 */