Ext.define("antnex.subsystem.41141153.user.userController", {
  extend: "Ext.app.ViewController",
  alias: "controller.page-41141153-user",
  requires: [],
  config: {
    name: "使用者管理1",
    action: null,
    requireKeylist: [],
  },
  onInitComponent: async function () {
    try {
      this.initComponent();

      await this.statusData();
    } catch (e) {
      console.log("onInitComponent error");
    }
  },

  initComponent: function () {
    this.hideShow_func = this.lookupReference("func-btn-wei");

    //search field
    this.searchField = this.lookupReference("panel-search-wei");
    this.txt_search_code = this.lookupReference("txt-search-code-wei");
    this.txt_search_name = this.lookupReference("txt-search-name-wei");
    this.cmb_search_status = this.lookupReference("cmb-search-status-wei");
  },

  statusData: async function () {
    try {
      let statusData = [];
      statusData.push({ value: -1, text: "全部" });
      const statusStore = Ext.create("antnex.store.static.Status");
      statusStore.getRange().forEach((record) => {
        let json = record.getData();
        delete json.id;
        statusData.push(json);
      });

      this.cmb_search_status.getStore().loadData(statusData);
    } catch (e) {
      console.log("statusData error");
    }
  },
  /**********main page**********/
  disabledBtn: function () {},

  /***********function field*************/
  onClick: function () {
    try {
      this.searchField.setVisible(!this.searchField.isVisible());
      console.log(!this.searchField.isVisible());
    } catch (e) {
      console.log("onClick error:");
    }
  },

  /*********search field*********/
  forSearchBtn: async function () {
    try {
      const inputCode = this.txt_search_code.getValue();
      const inputName = this.txt_search_name.getValue();
      const inputStatus = this.cmb_search_status.getValue();

      const uploadJSON = {
        txcode: "BASIC_USER_LIST_FILTER",
        code: inputCode,
        name: inputName,
        status: inputStatus,
      };
    } catch (e) {
      console.log("forSearchBtn error");
    }
  },
  cleanSearchBtn: function () {
    try {
      this.txt_search_code.setValue("");
      this.txt_search_name.setValue("");
      this.cmb_search_status.setValue(-1);
    } catch (e) {
      console.log("cleanSearchField error:");
    }
  },
});
