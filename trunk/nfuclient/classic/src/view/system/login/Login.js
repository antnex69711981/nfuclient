Ext.define('antnex.view.system.login.Login', {
    extend: 'antnex.default.defaultView',
    requires: [
        'antnex.view.system.login.LoginController',
    ],
    alias: 'widget.system-login',
    controller: 'system-login',

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },

    // setting background image
    bodyStyle: {
        'background-image': 'url("resources/images/login_background.png")',
        'background-size': '100% 100%',
    },

    items: [{
        xtype: 'panel',
        titleAlign: 'center',
        layout: {
            align: 'center',
            pack: 'center',
            type: 'hbox'
        },
        cls: 'login-opcitybk',
        width: 300,
        maxHeight: 505,
        items: [{
            xtype: 'form',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            width: 300,
            maxHeight: 505,
            reference: 'login_form',
            items: [
                {   // logo
                    xtype: 'container',
                    layout: {
                        align: 'center',
                        pack: 'center',
                        type: 'hbox'
                    },
                    margin: '30 0 25 0',
                    items: [{
                        xtype: 'image',
                        height: 220,
                        width: 220,
                        maxWidth: 220,
                        src: 'resources/images/login_logo.png'
                    }]
                },
                {   // 帳號
                    xtype: 'antTextfield',
                    reference: 'login_field_account',
                    emptyText: '請輸入員工代碼',
                    regexText: "輸入內容格式不符合",
                    fieldStyle: 'background: #fff; background-image: none;font-size: 16px;',
                    maskRe: new RegExp("^[a-zA-Z0-9]$"), // 限制輸入大小寫字母與數字
                    allowBlank: false,
                    height: 45,
                    margin: 5,
                    listeners: {
                        afterrender: function (obj) {
                            obj.inputEl.set({
                                autocomplete: "new-password"
                            });
                        }
                    },
                    bind: {
                        value: '{account}'
                    }
                },
                {   // 密碼
                    xtype: 'antTextfield',
                    fieldStyle: 'background: #fff; background-image: none; font-size: 16px;',
                    inputType: 'password',
                    height: 45,
                    margin: 5,
                    emptyText: '請輸入密碼',
                    allowBlank: false,
                    enableKeyEvents: true,
                    listeners: {
                        afterrender: function (obj) {
                            obj.inputEl.set({
                                autocomplete: "one-time-code" //"new-password"/"one-time-code"
                            });
                        },
                        keydown: 'enterLogin',
                    },
                    // minLength: 4,
                    // maxLength: 16,
                    reference: 'login_field_password',
                    bind: {
                        value: '{password}'
                    }

                },
                {   // 登入
                    xtype: 'antButton',
                    reference: 'login_button_submit',
                    height: 45,
                    margin: 5,
                    scale: 'large',
                    style: 'background: #3e7c55 !important; border-color: #3e7c55',
                    text: '<p style="font-weight: bold;font-size:18px">登&nbsp;&nbsp;&nbsp;&nbsp;入</p>',
                    handler: 'onSubmit',
                }
            ]
        }]
    }]
});
