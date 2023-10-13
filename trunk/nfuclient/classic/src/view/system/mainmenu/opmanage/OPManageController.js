
Ext.define('antnex.view.system.mainmenu.opmanage.OPManageController', {
    extend: 'antnex.default.defaultController',
    alias: 'controller.system-mainmenu-opmanage',
    config: {
        name: '系統提示',

        state: {},

        menusize: 230,
    },
    // function: 首次進入觸發(Override)
    initObj: function () {
        let me = this
        try {

            // 主畫面
            me.viewBody = me.lookupReference('view_opmanage_body');

            // 上方功能列
            me.viewListBtn = me.lookupReference('btn_mainmenu_head_list');
            me.viewCloseallbar = me.lookupReference('tbseparator_mainmenu_head_closeallbar');
            me.viewCloseall = me.lookupReference('btn_mainmenu_head_closeall');

            me.viewHeader = me.lookupReference('view_mainmenu_header');
            me.viewHeadUser = me.lookupReference('html_opmanage_username');
            me.viewHeadBranch = me.lookupReference('btn_opmanage_branch');

            // 左側功能列
            me.viewLeftmenu = me.lookupReference('panel_opmanage_leftmenu');
            me.viewHostpanel = me.lookupReference('panel_opmanage_host');
            me.viewHost = me.lookupReference('label_opmanage_host');

            me.viewSyslogo = me.lookupReference('btn_opmanage_sysLOGO');
            me.viewSysMiniLOGO = me.lookupReference('btn_opmanage_sysMiniLOGO');

            me.viewMenuCard = me.lookupReference('card_opmanage_leftmenu');
            me.viewToolbar = me.lookupReference('panel_opmanage_toolbar');
            me.viewSysinfo = me.lookupReference('panel_opmanage_sysinfo');

            // 功能清單
            me.viewFunctionlistContainer = me.lookupReference('panel_opmanage_functionlist');
            me.viewFunctionlistTool = me.lookupReference('panel_opmanage_functionlist_tools');
            me.viewFunctionlist = me.lookupReference('tree_opmanage_functionlist');
            me.viewGoto = me.lookupReference('cmbx_opmanage_goto');

            // 快捷功能
            me.viewShortlinklistContainer = me.lookupReference('panel_opmanage_shortlink');


            PAGE_SWITCHER = async function (xtype) {
                return await me.switchBodyTab(xtype);
            };
            me.setHost();
        } catch (e) {
            me.showError('OPManageController/ initObj error:', e);
        }
    },
    // function: 每次進入觸發(Override)
    refreshObj: async function () {
        let me = this
        try {
            me.loadFunctionlist();
        } catch (e) {
            me.showError('OPManageController/ refreshObj error:', e);
        }
    },
    // function: 初始化頁面狀態 - 首次進入觸發(Override)
    initPageStatus: function () {
        let me = this
        try {
            let user = antnex.AppDefaults.getConfig('username');
            let branchname = antnex.AppDefaults.getConfig('branchname');

            me.viewHeadUser.setHtml(`<H3 style="font-size:16px;color:#464a4c;text-align:center; line-height: 0;">${user}</H3>`)
            me.viewHeadBranch.setText(`<H3 class="x-fa fas fa-store-alt" style="color:#757575;text-align:left;font-size:14px;"> ${branchname}</H3>`)
        } catch (e) {
            me.showError('OPManageController/ initPageStatus error:', e);
        }
    },



    /************* view *************/
    // function: 載入功能清單
    loadFunctionlist: function () {
        let me = this
        try {

            var treelist = this.lookupReference('tree_opmanage_functionlist');
            let obj = treelist;

            let data = antnex.AppDefaults.getConfig('function');
            // let obj = me.viewFunctionlist;

            let store = obj.getStore();
            store.clearData();
            if (data.length > 0) {
                let newNode = function () {
                    let node = {
                        leaf: true,
                        level: 0,
                        syncRowHeight: false,
                        lines: false,
                        liquidLayout: true,
                        expanded: false,
                    }
                    return node
                }
                let gotolist = []
                data.forEach(e => {
                    let func = Ext.getStore('Function').getRange().find(v => v.get('code') == e.functioncode);
                    if (func) {
                        let iconcls = func.get('iconcls');
                        let node = newNode();
                        node.id = func.get('code');
                        node.code = func.get('code');
                        node.text = func.get('name');
                        node.xtype = func.get('xtype');
                        node.iconCls = S(iconcls).isEmpty() ? 'x-fa fa-database' : iconcls;

                        let parentcode = func.get('parentcode');
                        let parentNode = store.getNodeById(parentcode)

                        if (parentNode) {
                            parentNode.set('leaf', false);
                            parentNode.appendChild(node);
                        }

                        if (node.xtype) {
                            gotolist.push(node);
                        }
                    }
                });

                me.viewGoto.getStore().loadData(gotolist);
            }
        } catch (e) {
            me.showError('OPManageController/ loadFunctionlist error:', e);
        }
    },
    // event: 觸發熱鍵
    onKeyMap: function (key, obj) {
        let me = this;
        try {
            let view = obj.activeTab
            let controller = view ? view.getController() : null;
            if (controller) {
                // key.keyCode: 參照Ext.event.Event
                controller.hotkey(key.keyCode, key.ctrlKey, key.shiftKey, key.altKey);
            };
        } catch (e) {
            me.showError('OPManageController/ onKeyMap error:', e);
        }
    },


    /************* header *************/
    // button: 縮小左menu
    onToggleMicro: function (button, pressed) {
        let me = this
        try {
            let leftmenu = me.viewLeftmenu;
            let treelist = me.viewFunctionlist;
            let ct = treelist.ownerCt;

            let menuWidth = pressed ? 40 : me.getConfig('menusize');
            treelist.setMicro(pressed);
            leftmenu.setWidth(menuWidth);
            ct.setWidth(menuWidth);

            me.viewSyslogo.setHidden(true);
            me.viewSysMiniLOGO.setHidden(true);
            me.viewToolbar.setHidden(true);
            me.viewFunctionlistTool.setHidden(true);
            me.viewSysinfo.setHidden(true);

            if (pressed) {
                me.viewSysMiniLOGO.setHidden(false);
            }
            else {
                me.viewSyslogo.setHidden(false);
                me.viewToolbar.setHidden(false);
                me.viewFunctionlistTool.setHidden(false);
                me.viewSysinfo.setHidden(false);
            }

            // IE8 has an odd bug with handling font icons in pseudo elements;
            // it will render the icon once and not update it when something
            // like text color is changed via style addition or removal.
            // We have to force icon repaint by adding a style with forced empty
            // pseudo element content, (x-sync-repaint) and removing it back to work
            // around this issue.
            // See this: https://github.com/FortAwesome/Font-Awesome/issues/954
            // and this: https://github.com/twbs/bootstrap/issues/13863
            if (Ext.isIE8) {
                this.repaintList(treelist, pressed);
            }
        } catch (e) {
            me.showError('OPManageController/ onToggleMicro error:', e);
        }

    },
    // button: 關閉所有功能頁
    onCloseAll: function () {
        let me = this
        try {
            me.viewBody.removeAll();
        } catch (e) {
            me.showError('OPManageController/ onCloseAll error:', e);
        }

    },
    // button: MainTab add
    onMainTabAdd: function () {
        let me = this
        try {
            if (me.viewBody) {
                if (me.viewBody.items.items.length != 0) {
                    me.viewCloseallbar.setHidden(false);
                    me.viewCloseall.setHidden(false);
                }
            }

        } catch (e) {
            me.showError('OPManageController/ onMainTabAdd error:', e);
        }
    },
    // button: MainTab remove
    onMainTabRemove: function () {
        let me = this
        try {
            if (me.viewBody) {
                if (me.viewBody.items.items.length == 0) {
                    me.viewCloseallbar.setHidden(true);
                    me.viewCloseall.setHidden(true);
                }
            }
        } catch (e) {
            me.showError('OPManageController/ onMainTabremove error:', e);
        }
    },



    /************* menu *************/
    // event: 切換 功能清單, 快捷功能
    changeFunction: function (obj) {
        let me = this
        try {
            switch (obj.reference) {
                case 'btn_opmanage_functionlist':
                    me.viewMenuCard.setActiveItem(me.viewFunctionlistContainer);
                    break;
                case 'btn_opmanage_otherfunction':
                    me.viewMenuCard.setActiveItem(me.viewShortlinklistContainer);
                    break;
            }
        } catch (e) {
            me.showError('OPManageController/ changeFunction error:', e);
        }
    },
    // event: 跳轉
    onChangeGoto: function () {
        let me = this
        try {
            let record = me.viewGoto.getSelection();
            if (record) {
                let xtype = record.get('xtype')
                if (xtype) {
                    me.switchBodyTab(xtype);
                }
            }
        } catch (e) {
            me.showError('OPManageController/ onChangeGoto error:', e);
        }
    },
    // button: 收合
    collapseAllFunction: function () {
        let me = this;
        try {
            let tree = me.viewFunctionlist;
            tree.getStore().getRange().forEach(e => e.collapse())
        } catch (e) {
            me.showError('OPManageController/ collapseAllFunction error:', e);
        }
    },
    // event: 點選功能清單
    onClickFunction: function (sender, info, eOpts) {
        let me = this
        try {
            let select = info.select;
            let toggle = info.toggle;
            let record = info.item;
            if (select & !toggle) {
                record.isExpanded() ? record.collapse() : record.expand();
            }

            let pre = me.viewFunctionlist.getSelection();
            if (pre) {
                if (record._text == pre.get('text')) {
                    me.onSelectFunction();
                }
            }
        } catch (e) {
            me.showError('OPManageController/ onClickFunction error:', e);
        }
    },
    // event: 選擇功能
    onSelectFunction: function () {
        let me = this
        try {
            let record = me.viewFunctionlist.getSelection();
            if (record) {
                let xtype = record.get('xtype')
                if (xtype) {
                    me.switchBodyTab(xtype);
                }
            }
        } catch (e) {
            me.showError('OPManageController/ onSelectFunction error:', e);
        }
    },
    // function: 切換bodyCard (layout: 'card')
    switchBodyCard: function (xtype) {
        let me = this;
        try {
            me.closeTip();

            let func = Ext.getStore('Function').getRange().find(v => v.get('xtype') == xtype);
            if (func) {
                let rolefunction = antnex.AppDefaults.getConfig('function').find(e => e.xtype == func.get('xtype'));
                if (rolefunction) {
                    let newWidget = Ext.ClassManager.getByAlias(`widget.${xtype}`)
                    if (newWidget) {
                        let idx = me.viewBody.items.items.findIndex(e => e.xtype == xtype);
                        if (idx == -1) {
                            me.viewBody.add({ xtype: xtype })
                            idx = me.viewBody.items.items.findIndex(e => e.xtype == xtype);
                        }

                        if (idx == -1) throw `未定義畫面: ${xtype}`;

                        me.viewBody.setActiveItem(idx)
                    } else {
                        me.viewFunctionlist.setSelection(null);
                        throw `畫面定義不存在: ${func.get('name')}`
                    }
                } else {
                    throw `無功能權限: ${func.get('name')}`
                }
            } else {
                me.viewFunctionlist.setSelection(null);
                throw `功能別名不存在: ${xtype}`
            }
        } catch (e) {
            me.showError('OPManageController/ switchBodyCard error: ', e);
        }
    },
    // function: 切換bodyTab (xtype: tabpanel)
    switchBodyTab: function (xtype) {
        let me = this;
        return new Promise((resolve, reject) => {
            try {
                let maxTabSize = 10;
                me.closeTip();

                let func = Ext.getStore('Function').getRange().find(v => v.get('xtype') == xtype);
                if (func) {
                    let rolefunction = antnex.AppDefaults.getConfig('function').find(e => e.xtype == func.get('xtype'));
                    if (rolefunction) {
                        let newWidget = Ext.ClassManager.getByAlias(`widget.${xtype}`)
                        if (newWidget) {
                            let itemsize = me.viewBody.items.items.length
                            let idx = me.viewBody.items.items.findIndex(e => e.xtype == xtype);
                            if (itemsize < maxTabSize || idx != -1) {
                                if (idx == -1) {
                                    me.viewBody.add({
                                        title: func.get('name'),
                                        xtype: xtype,
                                        closable: true,
                                    })
                                    idx = me.viewBody.items.items.findIndex(e => e.xtype == xtype);
                                }

                                if (idx == -1) throw `未定義畫面: ${xtype}`;

                                let tb = me.viewBody.setActiveItem(idx);
                                resolve(tb);
                            } else {
                                Ext.Msg.show({
                                    title: '系統提示',
                                    message: `分頁不得超過${maxTabSize}頁，是否要取代最新的分頁？`,
                                    buttons: Ext.Msg.YESNO,
                                    icon: Ext.Msg.QUESTION,
                                    buttonText: {
                                        yes: '否',
                                        no: '是'
                                    },
                                    fn: async function (btn) {
                                        // 因預設focus問題，所以yes/no選項會對調
                                        switch (btn) {
                                            case 'yes':
                                                resolve(null);
                                            case 'no':
                                                me.viewBody.remove(me.viewBody.items.items[maxTabSize - 1]);
                                                let tb = await me.switchBodyTab(xtype)
                                                resolve(tb);
                                        }
                                    }
                                });
                            }
                        } else {
                            me.viewFunctionlist.setSelection(null);
                            throw `畫面定義不存在: ${func.get('name')}`
                        }
                    } else {
                        throw `無功能權限: ${func.get('name')}`
                    }
                } else {
                    me.viewFunctionlist.setSelection(null);
                    throw `功能別名不存在: ${xtype}`
                }
            } catch (e) {
                me.showError('OPManageController/ switchBodyTab error: ', e);
                resolve(null);
            }
        })
    },
    // function: 關閉所有tip
    closeTip: function () {
        let me = this;
        try {
            let tiplist = Ext.ComponentQuery.query('tooltip');
            tiplist.forEach(tip => {
                let extTip = ['ext-quicktips-tip', 'ext-form-error-tip']
                if (extTip.includes(tip.id) == false) {
                    console.log(`tip closed: ${tip.id}`)
                    tip.destroy();
                }
            });
        } catch (e) {
            me.showError('OPManageController/ closeTip error:', e);
        }
    },
    // function:設定版本與日期
    setHost: function () {
        let me = this;
        try {
            let servername = antnex.AppDefaults.getServername();

            me.viewHostpanel.setHidden(true);

            if (antnex.AppDefaults.isLogin() && !S(servername).isEmpty()) {

                me.viewHostpanel.setHidden(false);
                me.viewHost.setText(servername);
            } else {
                me.viewHostpanel.setHidden(true);
                me.viewHost.setText(servername);
            }

        } catch (e) {
            me.showError('OPManageController/ setHost error:', e);
        }
    },
    // button: 閘道資訊
    openDeviceWindow: function () {
        let me = this;
        try {
            let view = Ext.create('antnex.subsystem.mainmenu.window.GatewayInfo.GatewayInfo');
            let config = {};
            config.dockedItems = {};
            me.doOpenWindow(view, config);
        } catch (e) {
            me.showError('OPManageController/ openDeviceWindow error:', e);
        }
    },
    // button: 資料同步
    doDataSync: async function () {
        let me = this;
        try {
            var syncService = Ext.create('antnex.services.SyncService');

            me.getView().mask("同步資料中...");
            await syncService.load();
            me.getView().unmask();

            let tabView = me.viewBody;
            let activedItemlist = tabView.items.items;
            activedItemlist.forEach(tab => {
                let ctrl = tab.getController();
                if (ctrl) {
                    if (typeof ctrl.refreshObj == 'function') {
                        ctrl.refreshObj();
                    }
                }
            });
        } catch (e) {
            me.showError('OPManageController/ doDataSync error:', e);
        }
    },
    // button: 變更門市
    changeBranchcode: function (btn) {
        let me = this;
        try {
            let ishead = antnex.AppDefaults.getConfig('ishead') == 1;
            if (ishead == false) return;

            let view = Ext.create('antnex.view.system.mainmenu.opmanage.window.changeBranch.ChangeBranch');
            view.getController().setConfig('controller', me);
            view.getController().setConfig('returnFunction', 'returnChangeBranchcode');
            view.getController().setConfig('saveBtnText', '');
            view.getController().setConfig('cancelBtnText', '');
            let win = me.doOpenWindow(view);

            if (btn) win.setXY([btn.getX() - 160, btn.getY() + 35])

        } catch (e) {
            me.showError('OPManageController/ changeBranchcode error:', e);
        }
    },
    // function: 變更門市回傳
    returnChangeBranchcode: function (branchcode = '') {
        let me = this;
        try {
            let record = Ext.getStore('Branch').getRange().find(e => e.get('code') == branchcode);
            if (record) {
                antnex.AppDefaults.setConfig('branchcode', record.get('code'));
                antnex.AppDefaults.setConfig('branchname', record.get('name'));
                me.initPageStatus();
            }
        } catch (e) {
            me.showError('OPManageController/ changeBranchcode error:', e);
        }
    },
});
