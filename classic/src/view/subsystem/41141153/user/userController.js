Ext.define("antnex.subsystem.41141153.user.userController", {
  extend: "Ext.app.ViewController",
  alias: "controller.page-41141153-user",
  requires: [],
  config: {
    name: "使用者管理1",
    action: null,
    requireKeylist: [],
  },
  //初始化事件
  onInitComponent: async function () {
    const me = this;
    try {
      console.log(`userController/ onInitialize entry`);
      me.initComponent();
      await me.statusData();
      me.initPageCon();
    } catch (e) {
      me.showError("userController/ onInitComponent error: ", e);
    }
  },
  //頁面切換
  pageChange: async function () {
    const me = this;
    try {
      console.log("userController / pageChange");
    } catch (e) {
      me.showError("userController/ pageChange error: ", e);
    }
  },
  //初始化物件
  initComponent: function () {
    let me = this;
    try {
      //功能列
      me.funcSearch = me.lookupReference("func-btn-wei");
      me.funcAdd = me.lookupReference("func-add-btn-wei");
      me.funcEdit = me.lookupReference("func-edit-btn-wei");
      me.funcSave = me.lookupReference("func-save-btn-wei");
      me.funcCancel = me.lookupReference("func-cancel-btn-wei");

      //搜尋列
      me.searchBar = me.lookupReference("panel-search-wei");
      me.searchCode = me.lookupReference("txt-search-code-wei");
      me.searchName = me.lookupReference("txt-search-name-wei");
      me.searchStatus = me.lookupReference("cmb-search-status-wei");

      //使用者清單
      me.userlist = me.lookupReference("grid-userlist-wei");
      me.dataMaintain = me.lookupReference("panel-dataMaintain-wei");

      //資料維護
      me.maintainIds = me.lookupReference("num-wei-user-ids");
      me.maintainCode = me.lookupReference("txt-wei-user-code");
      me.maintainName = me.lookupReference("txt-wei-user-name");
      me.maintainMail = me.lookupReference("txt-wei-user-mail");
      me.maintainStatus = me.lookupReference("cmb-wei-user-status");
      me.maintainPassword = me.lookupReference("txt-wei-user-password");
      me.maintainMemo = me.lookupReference("txt-wei-user-memo");
    } catch (e) {
      me.showError("userController/ initComponent error:", e);
    }
  },

  //載入狀態
  statusData: async function () {
    const me = this;
    try {
      let statusData = [];
      statusData.push({ value: -1, text: "全部" });
      const statusStore = Ext.create("antnex.store.static.Status");
      statusStore.getRange().forEach((record) => {
        let json = record.getData();
        delete json.id;
        statusData.push(json);
      });

      me.searchStatus.getStore().loadData(statusData);
    } catch (e) {
      me.showError("userController/ statusData error:", e);
    }
  },

  //初始化頁面狀態
  initPageCon: function () {
    const me = this;
    try {
      me.cleanSearchBtn();
      me.updateStatus("view");
      me.loadData();
    } catch (e) {
      me.showError("userController/ initPageCon:", e);
    }
  },

  /**********頁面事件**********/
  //停用所有需要停用的物件
  disabledAll: function () {
    const me = this;
    try {
      //功能列
      me.funcSearch.setDisabled(true);
      me.funcAdd.setDisabled(true);
      me.funcEdit.setDisabled(true);
      me.funcSave.setDisabled(true);
      me.funcCancel.setDisabled(true);

      //查詢列
      me.searchBar.setHidden(true);

      //主畫面
      me.userlist.setHidden(true);

      //資料維護
      me.maintainIds.setReadOnly(true);
      me.maintainIds.setHidden(true);
      me.maintainCode.setReadOnly(true);
      me.maintainName.setReadOnly(true);
      me.maintainMail.setReadOnly(true);
      me.maintainStatus.setReadOnly(true);
      me.maintainPassword.setReadOnly(true);
      me.maintainMemo.setReadOnly(true);
    } catch (e) {
      me.showError("userController/ disabledAll error:", e);
    }
  },

  //更新狀態
  updateStatus: function (action) {
    const me = this;
    try {
      me.setConfig("action", action);
      console.log(`頁面狀態: ${me.getConfig("action")}`);

      me.disabledAll();

      switch (me.getConfig("action")) {
        case "view":
          me.funcSearch.setDisabled(false);
          me.funcAdd.setDisabled(false);

          me.searchBar.setHidden(false);

          me.userlist.setHidden(false);
          break;
        case "add":
          me.funcSave.setDisabled(false);
          me.funcCancel.setDisabled(false);

          me.maintainCode.setReadOnly(false);
          me.maintainName.setReadOnly(false);
          me.maintainMail.setReadOnly(false);
          me.maintainPassword.setReadOnly(false);
          me.maintainStatus.setReadOnly(false);
          me.maintainMemo.setReadOnly(false);
          break;
        case "edit":
          me.funcSave.setDisabled(false);
          me.funcCancel.setDisabled(false);

          me.maintainName.setReadOnly(false);
          me.maintainMail.setReadOnly(false);
          me.maintainPassword.setReadOnly(false);
          me.maintainStatus.setReadOnly(false);
          me.maintainMemo.setReadOnly(false);
          break;
        default:
          console.log("無效狀態");
          break;
      }
    } catch (e) {
      me.showError("userController/ updateStatus error:", e);
    }
  },

  /*************funcbar****************/
  //隱藏查詢列
  onClick: function () {
    const me = this;
    try {
      me.searchBar.setVisible(!me.searchBar.isVisible());
    } catch (e) {
      me.showError("userController/ onClick error:", e);
    }
  },
  //新增按鈕
  funcbar_add: function () {
    const me = this;
    try {
      me.userlist.setSelection(false);

      me.updateStatus("add");

      me.loadData();

      me.maintainIds.setValue(0);
      me.maintainStatus.setValue(1);
    } catch (e) {
      me.showError("userController/ funcbar_add error:", e);
    }
  },
  //修改按鈕
  funcbar_edit: function () {
    const me = this;
    try {
      const record = me.userlist.getSelection()[0];
      if (record) {
        me.updateStatus("edit");
      } else {
        throw "請先選擇要修改資料";
      }
    } catch (e) {
      console.log("userController / funcbar_Add error");
    }
  },
  //儲存按鈕
  funcbar_save: async function () {
    const me = this;
    try {
      let checkSaveFormat = async function () {
        if (S(me.maintainCode.getValue()).isEmpty()) {
          throw `請選擇${me.maintainCode.getFieldLabel()}`;
        }

        if (S(me.maintainName.getValue()).isEmpty()) {
          throw `請選擇${me.maintainName.getFieldLabel()}`;
        }

        if (S(me.maintainPassword.getValue()).isEmpty()) {
          throw `請選擇${me.maintainPassword.getFieldLabel()}`;
        }

        if (S(me.maintainStatus.getValue()).isEmpty()) {
          throw `請選擇${me.maintainStatus.getFieldLabel()}`;
        }
      };
      await checkSaveFormat();

      Ext.Msg.confirm("提醒", "是否儲存?", async function (btn) {
        if (btn == "yes") {
          const uploadJSON = {
            txcode:
              me.getConfig("action") == "add"
                ? "BASIC_USER_INSERT"
                : "BASIC_USER_UPDATE",

            ids: me.maintainIds.getValue(),
            code: me.maintainCode.getValue(),
            name: me.maintainName.getValue(),
            mail: me.maintainMail.getValue(),
            password: me.maintainPassword.getValue(),
            status: me.maintainStatus.getValue(),
            memo: me.maintainMemo.getValue(),
          };
          me.dataMaintain.mask(CONST_LOADING_HINT);
          const json = await antnex.ProxyService.send(uploadJSON);
          me.dataMaintain.unmask();
          switch (json.status) {
            case CONST_STATUS_OK:
              const code = json.message.code;

              me.updateStatus("view");

              me.setConfig("requireKeylist", [code]);

              me.forSearchBtn();
              break;
            default:
              me.showMessage(json.statusText);
          }
        }
      });
    } catch (e) {
      me.showError("userController/ funcbar_Add error:", e);
    }
  },
  //取消按鈕
  funcbar_cancel: function () {
    const me = this;
    try {
      Ext.Msg.confirm("提醒", "是否取消?", function (btn) {
        if ((btn = "yes")) {
          me.updateStatus("view");
          me.onSelectUser();
        }
      });
    } catch (e) {
      me.showError("userController/ funcbar_Add error:", e);
    }
  },
  /*************searchcbar***************/
  //按Enter查詢
  enterSearch: function (field, e) {
    const me = this;
    try {
      if (e.getKey() == e.ENTER) {
        me.forSearchBtn();
      }
    } catch (e) {
      me.showError("userController/ enterSearch error:", e);
    }
  },
  //查詢鈕
  forSearchBtn: async function () {
    let me = this;
    try {
      const inputCode = me.searchCode.getValue();
      const inputName = me.searchName.getValue();
      const inputStatus = me.searchStatus.getValue();

      const uploadJSON = {
        txcode: "BASIC_USER_LIST_FILTER",
        code: inputCode,
        name: inputName,
        status: inputStatus,
      };
      const requireKeylist = me.getConfig("requireKeylist");

      me.setConfig("requireKeylist", []);

      me.userlist.mask(CONST_LOADING_HINT);
      const json = await antnex.ProxyService.send(uploadJSON);
      me.userlist.unmask();
      switch (json.status) {
        case CONST_STATUS_OK:
          const data = json.message.data;
          me.userlist.getStore().loadData(data);

          const records = me.userlist
            .getStore()
            .getRange()
            .filter((e) => requireKeylist.includes(e.get("code")));
          me.userlist.setSelection(records);
          break;
        default:
          throw json.statusText;
      }
    } catch (e) {
      me.showError("userController/ forSearchBtn error:", e);
    }
  },
  //清除鈕
  cleanSearchBtn: function () {
    const me = this;
    try {
      me.searchCode.setValue("");
      me.searchName.setValue("");
      me.searchStatus.setValue(-1);
    } catch (e) {
      me.showError("userController/ cleanSearchBtn error:", e);
    }
  },

  /***********view**********/
  //選擇使用者
  onSelectUser: function () {
    const me = this;
    try {
      const record = me.userlist.getSelection()[0];
      const code = record ? record.get("code") : "";
      me.loadData(code);
    } catch (e) {
      me.showError("userController/ onSelectUser error:", e);
    }
  },
  //載入選擇資料
  loadData: async function (code = "") {
    const me = this;
    try {
      console.log(me.dataMaintain);
      console.log(me.userlist);
      let loadFn = function (json = {}) {
        const ids = json.ids ? json.ids : "";
        const code = json.code ? json.code : "";
        const name = json.name ? json.name : "";
        const mail = json.mail ? json.mail : "";
        const password = json.password ? json.password : "";
        const status = json.status ? json.status : "";
        const memo = json.memo ? json.memo : "";

        const editable = ids > 0;

        //載入對應欄位
        me.funcEdit.setDisabled(editable == false);

        me.maintainIds.setValue(ids);
        me.maintainCode.setValue(code);
        me.maintainName.setValue(name);
        me.maintainMail.setValue(mail);
        me.maintainStatus.setValue(status);
        me.maintainPassword.setValue(password);
        me.maintainMemo.setValue(memo);
      };

      loadFn();

      if (code) {
        const uploadJSON = {
          txcode: "BASIC_USER_FIND_BY_CODE",
          code: code,
        };

        me.dataMaintain.mask(CONST_LOADING_HINT);
        const json = await antnex.ProxyService.send(uploadJSON);
        me.dataMaintain.unmask();
        switch (json.status) {
          case CONST_STATUS_OK:
            const data = json.message.data;
            loadFn(data);
            break;
          default:
            throw json.statusText;
        }
      }
    } catch (e) {
      me.showError("userController/ loadData error:", e);
    }
  },

  /************* 提示訊息 *************/
  // function:提示訊息
  showMessage: function (message) {
    Ext.Msg.alert(`${this.getConfig("name")} `, message);
  },
  // function:錯誤訊息
  showError: function (path, e) {
    this.showMessage(e);
    return false;
  },
});
