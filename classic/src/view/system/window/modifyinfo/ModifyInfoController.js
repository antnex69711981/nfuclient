Ext.define('antnex.view.system.window.modifyinfo.ModifyInfoController', {
    extend: 'antnex.view.system.window.WindowContainerController',
    alias: 'controller.modifyinfo',
    requires: [],
    config: {
        name: '異動資訊',
        width: 292,
        height: 74,
        data: {},
    },
    // function:初始化物件
    initObj: function () {
        let me = this;
        try {
            me.viewInfo = me.lookupReference('fs_modifyinfo_info');

            me.viewCreateusercode = me.lookupReference('cmbx_modifyinfo_createusercode');
            me.viewCreatebranchcode = me.lookupReference('cmbx_modifyinfo_createbranchcode');
            me.viewCreatetm = me.lookupReference('txt_modifyinfo_createtm');

            me.viewModifyusercode = me.lookupReference('cmbx_modifyinfo_modifyusercode');
            me.viewModifybranchcode = me.lookupReference('cmbx_modifyinfo_modifybranchcode');
            me.viewModifytm = me.lookupReference('txt_modifyinfo_modifytm');

            me.viewApprovedusercode = me.lookupReference('cmbx_modifyinfo_approvedusercode');
            me.viewApprovedbranchcode = me.lookupReference('cmbx_modifyinfo_approvedbranchcode');
            me.viewApprovedtm = me.lookupReference('txt_modifyinfo_approvedtm');

            me.viewDropusercode = me.lookupReference('cmbx_modifyinfo_dropusercode');
            me.viewDropbranchcode = me.lookupReference('cmbx_modifyinfo_dropbranchcode');
            me.viewDroptm = me.lookupReference('txt_modifyinfo_droptm');

            let userStore = Ext.getStore('Employee').getRange();
            me.viewCreateusercode.getStore().loadData(userStore);
            me.viewModifyusercode.getStore().loadData(userStore);
            me.viewApprovedusercode.getStore().loadData(userStore);
            me.viewDropusercode.getStore().loadData(userStore);

            let branchStore = Ext.getStore('Branch').getRange();
            me.viewCreatebranchcode.getStore().loadData(branchStore);
            me.viewModifybranchcode.getStore().loadData(branchStore);
            me.viewApprovedbranchcode.getStore().loadData(branchStore);
            me.viewDropbranchcode.getStore().loadData(branchStore);

        } catch (e) {
            me.showError('ModifyInfoController/ initObj error:', e);
        }
    },
    // function: 套用Config設定
    enableConfig: function () {
        let me = this;
        try {
            let data = me.getConfig('data');

            let createusercode = data.createusercode;
            if (createusercode) {
                me.viewCreateusercode.setValue(createusercode);
                me.viewCreateusercode.setHidden(false);
            }

            let createbranchcode = data.createbranchcode;
            if (createbranchcode) {
                me.viewCreatebranchcode.setValue(createbranchcode);
                me.viewCreatebranchcode.setHidden(false);
            }

            let createtm = data.createtm;
            if (createtm) {
                me.viewCreatetm.setValue(createtm);
                me.viewCreatetm.setHidden(false);
            }

            let modifyusercode = data.modifyusercode;
            if (modifyusercode) {
                me.viewModifyusercode.setValue(modifyusercode);
                me.viewModifyusercode.setHidden(false);
            }

            let modifybranchcode = data.modifybranchcode;
            if (modifybranchcode) {
                me.viewModifybranchcode.setValue(modifybranchcode);
                me.viewModifybranchcode.setHidden(false);
            }

            let modifytm = data.modifytm;
            if (modifytm) {
                me.viewModifytm.setValue(modifytm);
                me.viewModifytm.setHidden(false);
            }

            let approvedusercode = data.approvedusercode ? data.approvedusercode : data.approveusercode;
            if (approvedusercode) {
                me.viewApprovedusercode.setValue(approvedusercode);
                me.viewApprovedusercode.setHidden(false);
            }

            let approvedbranchcode = data.approvedbranchcode ? data.approvedbranchcode : data.approvebranchcode;
            if (approvedbranchcode) {
                me.viewApprovedbranchcode.setValue(approvedbranchcode);
                me.viewApprovedbranchcode.setHidden(false);
            }

            let approvedtm = data.approvedtm ? data.approvedtm : data.approvetm;
            if (approvedtm) {
                me.viewApprovedtm.setValue(approvedtm);
                me.viewApprovedtm.setHidden(false);
            }

            let dropusercode = data.dropusercode
            if (dropusercode) {
                me.viewDropusercode.setValue(dropusercode);
                me.viewDropusercode.setHidden(false);
            }

            let dropbranchcode = data.dropbranchcode
            if (dropbranchcode) {
                me.viewDropbranchcode.setValue(dropbranchcode);
                me.viewDropbranchcode.setHidden(false);
            }

            let droptm = data.droptm
            if (droptm) {
                me.viewDroptm.setValue(droptm);
                me.viewDroptm.setHidden(false);
            }

            let items = me.viewInfo.items.items.filter(e => e.hidden == false).length;
            let win = me.getView();
            if (win) {
                win.setMinHeight(0);
                win.setWidth(me.getConfig('width'));
                win.setHeight(me.getConfig('height') + items * (24 + 5));
            }

            if (items == 0) {
                me.showMessage('查無異動資訊');
                me.closeWindow();
            }

        } catch (e) {
            me.showError('ModifyInfoController/ enableConfig error:', e);
        }
    },
});
