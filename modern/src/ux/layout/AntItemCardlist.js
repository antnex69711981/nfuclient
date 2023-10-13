Ext.define('Ext.ux.layout.AntItemCardlist', {
    extend: 'Ext.ux.layout.AntTransPanel',
    alias: 'widget.antItemCardlist',
    config: {
        cardData: [],
    },

    layout: {
        type: 'vbox',
        align: 'stretch',
    },
    header: false,
    scrollable: true,
    defaults: {
        margin: '10 0 0 0',
        shadow: true,
    },

    controller: undefined, // controller

    titleIndex: 'fullname',
    imageIndex: 'img',

    columns: [],    // 欄位
    cardData: [],   // 資料

    buttonList: null,    // 按鈕列

    // event: config('cardData')變更時
    updateCardData: function (newValue, oldValue) {
        if (newValue) {
            let me = this

            if (newValue.length > 0) {
                me.mask("載入中...");
                me.buildItem(newValue);
                me.unmask("載入完成...");
            }
        }
    },

    // function: 產生項目
    buildItem: function (cardData) {
        let me = this;


        cardData.forEach((e, idx) => {

            // 設置idx
            e.itemIdx = idx;

            // 首個Margin設零
            let firstmargin = 0;
            if (idx != 0) {
                firstmargin = '10 0 0 0';
            }
            let columns = []

            for (let i = 0; i < me.columns.length; i = i + 2) {

                let columnitems = [];

                // 詳細資料第一欄
                let iconCls1 = '';
                let text1 = '';
                let dataIndex1 = '';
                let numberFormat1 = '';
                let style1 = 'text-align:left; fontWeight:bold; fontSize:12px; color:rgb(75,75,75);';

                if (me.columns[i]) {
                    if (!S(me.columns[i].iconCls).isEmpty()) iconCls1 = me.columns[i].iconCls;
                    if (!S(me.columns[i].text).isEmpty()) text1 = me.columns[i].text;
                    if (!S(e[me.columns[i].dataIndex]).isEmpty()) dataIndex1 = e[me.columns[i].dataIndex];
                    if (!S(me.columns[i].numberFormat).isEmpty()) numberFormat1 = me.columns[i].numberFormat;
                    if (!S(me.columns[i].style).isEmpty()) style1 = me.columns[i].style;
                }

                // 放入column標題(icon+titleText)
                columnitems.push(
                    {
                        xtype: 'antLabel',
                        html: `${text1}`,
                        style: `text-align:left; fontWeight:bold; fontSize:12px; color:rgb(75,75,75);`,
                        iconFormat: `${iconCls1}`,
                    },
                );

                // 放入column內容(dataindex)
                columnitems.push(
                    {
                        xtype: 'antLabel',
                        html: `${dataIndex1}`,
                        numberFormat: `${numberFormat1}`,
                        style: `${style1}`,
                    }
                );

                // 詳細資料第二欄
                let iconCls2 = '';
                let text2 = '';
                let dataIndex2 = '';
                let numberFormat2 = '';
                let style2 = 'text-align:left; fontWeight:bold; fontSize:12px; color:rgb(75,75,75);';

                if (me.columns[i + 1]) {
                    if (me.columns[i + 1].iconCls) iconCls2 = me.columns[i + 1].iconCls;
                    if (me.columns[i + 1].text) text2 = me.columns[i + 1].text;
                    if (e[me.columns[i + 1].dataIndex]) dataIndex2 = e[me.columns[i + 1].dataIndex];
                    if (me.columns[i + 1].numberFormat) numberFormat2 = me.columns[i + 1].numberFormat;
                    if (me.columns[i + 1].style) style2 = me.columns[i + 1].style;
                }
                // 放入column標題(icon+titleText)
                columnitems.push(
                    {
                        xtype: 'antLabel',
                        html: `${text2}`,
                        style: `text-align:left; fontWeight:bold; fontSize:12px; color:rgb(75,75,75);`,
                        iconFormat: `${iconCls2}`,
                    },
                );
                // 放入column內容(dataindex)
                columnitems.push(
                    {
                        xtype: 'antLabel',
                        html: `${dataIndex2}`,
                        numberFormat: `${numberFormat2}`,
                        style: `${style2}`,
                    }
                );

                let columnFirstmargin = 0;
                if (i != 0) {
                    columnFirstmargin = '5 0 0 0';
                }

                // 組織一列
                let column = {
                    xtype: 'antPanel',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    defaults: {
                        xtype: 'antPanel',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        flex: 1,
                        defaults: {
                            margin: '0 0 0 5',
                        }
                    },
                    margin: columnFirstmargin,
                    items: columnitems
                }
                columns.push(column);
            }


            let objs = [
                {   // 圖+標題
                    xtype: 'antPanel',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    margin: 0,
                    items: [
                        {
                            xtype: 'antPanel',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            height: 64,
                            width: 64,
                            items: [
                                {
                                    xtype: 'image',
                                    src: `${e[me.imageIndex]}`,
                                    width: '100%'
                                },
                            ]
                        },
                        {
                            xtype: 'antLabel',
                            html: `${e[me.titleIndex]}`,
                            flex: 1,
                            margin: '0 0 0 10',
                        },

                    ]
                },
                {   // 裝飾線-橫
                    xtype: 'antPanel',
                    height: 1,
                    width: '100%',
                    bodyStyle: 'background:#E0E0E0;border-radius:20px;',
                },
                {   // 詳細資料
                    xtype: 'antPanel',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    defaults: {
                        margin: '10 0 0 0'
                    },
                    items: columns,
                },

            ]

            // 設置buttonList
            if (me.buttonList) {
                objs.push(
                    {   // 裝飾線-橫
                        xtype: 'antPanel',
                        height: 1,
                        width: '100%',
                        bodyStyle: 'background:#E0E0E0;border-radius:20px;',
                    },
                )

                let buttonlist = [];
                me.buttonList.forEach(btn => {

                    let btnText = '';
                    if (btn.text) btnText = btn.text;

                    let btnIconcls = 'fas fa-edit';
                    if (btn.iconCls) btnIconcls = btn.iconCls;

                    let btnCls = '';
                    if (btn.cls) btnCls = btn.cls;

                    let btnWidth = 80;
                    if (btn.width) btnWidth = btn.width;

                    let btnHeight = 36;
                    if (btn.height) btnHeight = btn.height;

                    let btnHandler = '';
                    if (btn.handler) btnHandler = btn.handler;

                    buttonlist.push(
                        {
                            xtype: 'antButton',
                            text: `<span class="${btnIconcls}"> ${btnText}</span>`,
                            cls: btnCls,
                            width: btnWidth,
                            height: btnHeight,
                            handler: btnHandler,
                            itemIdx: idx,
                            itemData: e,
                        }
                    )

                })

                objs.push(
                    {   // 按鈕列
                        xtype: 'antPanel',
                        layout: {
                            type: 'vbox',
                            align: 'right'
                        },

                        items: [
                            {
                                xtype: 'antPanel',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                defaults: {
                                    margin: '0 0 0 5'
                                },
                                items: buttonlist
                            }

                        ]
                    }
                );
            }

            let item = {   // 每項物件
                xtype: 'antPanel',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                margin: firstmargin,
                padding: 10,
                defaults: {
                    margin: '10 0 0 0',
                },
                items: objs
            }

            me.add(item);
        })
    },

});