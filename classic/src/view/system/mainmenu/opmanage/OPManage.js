Ext.define('antnex.view.system.mainmenu.opmanage.OPManage', {
    extend: 'antnex.default.defaultView',
    requires: [
        'antnex.view.system.mainmenu.opmanage.OPManageController',
    ],
    alias: 'widget.system-mainmenu-opmanage',
    controller: 'system-mainmenu-opmanage',

    // title: '系統提示',
    reference: 'view_system_opmanage',
    layout: {
        type: 'hbox',
        align: 'stretch',
    },
    items: [
        {   // 左側列表
            xtype: 'antPanel',
            reference: 'panel_opmanage_leftmenu',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            width: 230,
            margin: '0 0 0 0',
            border: false,
            items: [
                {   // logo
                    xtype: 'antButton',
                    reference: 'btn_opmanage_sysLOGO',
                    style: 'background-image: url("resources/images/header_antnex.png"); background-repeat: no-repeat; background-size: 200px 40px; background-position:center; background-color: transparent; borderColor: transparent;',
                    margin: 0,
                    height: 40,
                },
                {   // logo(mini) 
                    xtype: 'antButton',
                    reference: 'btn_opmanage_sysMiniLOGO',
                    style: 'background-image: url("resources/images/logo2.png"); background-repeat: no-repeat; background-size: 24px 24px; background-position:center; background-color: transparent; borderColor: transparent;',
                    margin: '10 0 0 0',
                    hidden: true,
                },
                {   // 功能清單
                    xtype: 'antPanel',
                    reference: 'card_opmanage_leftmenu',
                    layout: 'card',
                    flex: 1,
                    dockedItems: [
                        {   // 切換按鈕
                            xtype: 'antPanel',
                            reference: 'panel_opmanage_toolbar',
                            dock: 'top',
                            items: [{
                                xtype: 'switchButton',
                                reference: 'sbtn_opmanage_function',
                                vertical: false,
                                margin: 5,
                                pressedCls: 'antBtn-selected',
                                unpressCls: 'antBtn-unselect',
                                items: [{
                                    xtype: 'button',
                                    text: '功能清單',
                                    reference: 'btn_opmanage_functionlist',
                                    cls: 'antBtn-selected',
                                    handler: 'changeFunction',
                                    pressed: true,
                                }, {
                                    xtype: 'button',
                                    text: '快捷功能',
                                    reference: 'btn_opmanage_otherfunction',
                                    cls: 'antBtn-unselect',
                                    handler: 'changeFunction',
                                    hidden: true,
                                }],
                            }]
                        },
                        {   // 連線主機, 版本, 日期
                            xtype: 'antPanel',
                            reference: 'panel_opmanage_sysinfo',
                            dock: 'bottom',
                            margin: '0 0 10 0',
                            defaults: {
                                labelWidth: 37,
                                margin: '10 10 0 10',
                                readOnly: true,
                            },
                            items: [{
                                xtype: 'panel',
                                layout: {
                                    type: 'hbox'
                                },
                                reference: 'panel_opmanage_host',
                                items: [{
                                    xtype: 'label',
                                    text: ' ',
                                    labelAlign: 'center',
                                    labelWidth: 200,
                                    margin: '5 1 1 1',
                                    reference: 'label_opmanage_host'
                                }, {
                                    html: '<marquee class="GeneratedMarquee" direction="left" scrollamount="10" behavior="scroll"></marquee>',
                                    margin: '5 0 0 0',
                                    width: 400,
                                    flex: 1
                                }]
                            }, {
                                xtype: 'antTextfield',
                                fieldLabel: '版本',
                                value: Ext.manifest.version,
                            }, {
                                xtype: 'antDatefield',
                                fieldLabel: '日期',
                                format: 'Y年m月d日',
                                reference: 'date_opmanage_date',
                                value: new Date()
                            }]
                        }
                    ],
                    items: [
                        {   // 功能清單
                            xtype: 'antPanel',
                            reference: 'panel_opmanage_functionlist',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            scrollable: true,
                            dockedItems: [{
                                xtype: 'antToolbar',
                                dock: 'top',
                                reference: 'panel_opmanage_functionlist_tools',
                                margin: 2,
                                items: [{ // 跳轉
                                    xtype: 'antCombobox',
                                    reference: 'cmbx_opmanage_goto',
                                    emptyText: '跳轉至指定功能',
                                    editable: true,
                                    flex: 1,
                                    listeners: {
                                        select: 'onChangeGoto'
                                    }
                                }, {
                                    xtype: 'antButton',
                                    cls: 'antBtn-blue',
                                    iconCls: 'fas fa-angle-double-up',
                                    handler: 'collapseAllFunction',
                                }]
                            }],
                            items: [{
                                xtype: 'antMenuTreepanel',
                                reference: 'tree_opmanage_functionlist',
                                margin: '8 0 0 0',
                                listeners: {
                                    itemclick: 'onClickFunction',
                                    selectionchange: 'onSelectFunction',
                                },
                            }]
                        },
                        {   // 快捷功能
                            xtype: 'antPanel',
                            reference: 'panel_opmanage_shortlink',
                            html: '<h3 style="font-size:20px;color:#1274bf;text-align:center; line-height: 1.5;">還沒做</h3>',
                        }
                    ]
                },
            ]
        },
        { xtype: 'splitter', margin: -1.5 },
        { // header, body
            xtype: 'antTransPanel',
            flex: 1,
            items: [
                { // header
                    xtype: 'antPanel',
                    reference: 'view_mainmenu_header',
                    layout: {
                        type: 'hbox',
                        align: 'left'
                    },
                    height: 40,
                    dockedItems: [
                        {   // 左邊
                            xtype: 'antPanel',
                            dock: 'left',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            margin: 0,
                            defaults: {
                                margin: '3 0 3 0',
                            },
                            items: [{ // 功能列
                                xtype: 'funcbarLayout',
                                items: [{
                                    xtype: 'antButton',
                                    reference: 'btn_mainmenu_head_list',
                                    text: '<H3 class="x-fa fa-th-list" style="color:#757575;text-align:left;font-size:22px;"></H3>',
                                    cls: 'antBtn-transparent',
                                    tooltip: '功能欄展開/縮小',
                                    height: 18,
                                    enableToggle: true,
                                    toggleHandler: 'onToggleMicro',
                                    margin: '3 0 3 3',
                                },
                                { xtype: 'tbseparator', reference: 'tbseparator_mainmenu_head_closeallbar', margin: '8 1' },
                                {
                                    xtype: 'antButton',
                                    reference: 'btn_mainmenu_head_closeall',
                                    text: '<H3 class="x-fa far fa-window-close" style="color:#757575;text-align:left;font-size:22px;"></H3>',
                                    cls: 'antBtn-transparent',
                                    tooltip: '關閉所有功能頁',
                                    height: 18,
                                    handler: 'onCloseAll'
                                },
                                ]
                            },]

                        },
                        {   // 右邊
                            xtype: 'panel',
                            dock: 'right',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            margin: 0,
                            defaults: {
                                margin: '0 10 0 0',
                            },
                            items: [{
                                xtype: 'antButton',
                                reference: 'btn_opmanage_sync',
                                text: '',
                                cls: 'antBtn-transparent',
                                height: 34,
                                text: '`<H3 class="x-fa fa-sync" style="color:#757575;text-align:left;font-size:14px;"> 資料同步</H3>`',
                                listeners: {
                                    click: 'doDataSync'
                                },
                                hidden: true,
                            }, {
                                // |
                                html: '<H3 style="font-size:16px;color:#464a4c;text-align:center; line-height: 0;">|</H3>',
                                hidden: true,
                            }, {
                                xtype: 'antButton',
                                reference: 'btn_opmanage_gateway',
                                text: '',
                                cls: 'antBtn-transparent',
                                height: 34,
                                text: '`<H3 class="x-fa fa-print" style="color:#757575;text-align:left;font-size:14px;"> 閘道資訊</H3>`',
                                listeners: {
                                    click: 'openDeviceWindow'
                                },
                                hidden: true,
                            }, {
                                // |
                                html: '<H3 style="font-size:16px;color:#464a4c;text-align:center; line-height: 0;">|</H3>',
                                hidden: true,
                            }, {
                                xtype: 'antButton',
                                reference: 'btn_opmanage_branch',
                                text: '',
                                cls: 'antBtn-transparent',
                                height: 34,
                                handler: 'changeBranchcode',
                                hidden: true,
                            }, {
                                // 通知
                                xtype: 'antButton',
                                style: 'background-image: url("resources/images/redbell.gif"); background-repeat: no-repeat; background-size: 50px 34px; background-position:center; background-color: transparent; borderColor: transparent;',
                                hidden: true,
                            }, {
                                // |
                                html: '<H3 style="font-size:16px;color:#464a4c;text-align:center; line-height: 0;">|</H3>',
                                hidden: true,
                            }, {
                                // 員工姓名
                                reference: 'html_opmanage_username',
                                html: ''
                            }, {
                                // 員工大頭貼
                                xtype: 'antButton',
                                style: 'background-image: url("resources/images/defaultUser.png"); background-repeat: no-repeat; background-size: 100% 100%; background-position:center; background-color: transparent; borderColor: transparent;',
                                width: 34,
                                height: 34,
                                // handler: 'goMainpage',
                            }]
                        }
                    ],
                },
                { // body
                    xtype: 'antTabpanel',
                    reference: 'view_opmanage_body',
                    cls: 'antTabpanel',
                    border: false,
                    flex: 1,
                    margin: '5 0 0 0',
                    focusable: true, // 按鍵事件用
                    tabIndex: 1, // 按鍵事件用
                    keyMap: { // 查詢鍵碼：http://web.tnu.edu.tw/me/study/moodle/tutor/vb6/tutor/r03/index.htm
                        'F1': { handler: 'onKeyMap' },
                        'F2': { handler: 'onKeyMap' },
                        'F3': { handler: 'onKeyMap' },
                        'F4': { handler: 'onKeyMap' },
                        'F5': { handler: 'onKeyMap' },
                        'F6': { handler: 'onKeyMap' },
                        // 'F7': { handler: 'onKeyMap' },
                        'F8': { handler: 'onKeyMap' },
                        'F9': { handler: 'onKeyMap' },
                        'F10': { handler: 'onKeyMap' },
                        // 'F11': { handler: 'onKeyMap' },
                        // 'F12': { handler: 'onKeyMap' },
                        'ESC': { handler: 'onKeyMap' },
                        'Shift+F': { handler: 'onKeyMap' },
                        'Ctrl+S': { handler: 'onKeyMap' },
                        'Command+S': { handler: 'onKeyMap' },
                        'Shift+Enter': { handler: 'onKeyMap' },
                        'Shift+Left': { handler: 'onKeyMap' },
                        'Shift+Right': { handler: 'onKeyMap' },
                        'Shift+Up': { handler: 'onKeyMap' },
                        'Shift+Down': { handler: 'onKeyMap' },
                    },
                    listeners: {
                        add: 'onMainTabAdd',
                        remove: 'onMainTabRemove'
                    },
                    items: [{
                        xtype: 'sample-sample',
                        closable: true,
                    }]
                }
            ]
        }
    ]
});
