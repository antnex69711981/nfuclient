Ext.define("antnex.subsystem.41141153.user.user", {
  extend: "Ext.panel.Panel",
  requires: ["antnex.subsystem.41141153.user.userController"],
  alias: "widget.page-41141153-user",
  controller: "page-41141153-user",

  title: "使用者管理1",

  //main view vertical and stretch
  layout: {
    type: "vbox",
    align: "stretch",
  },
  listeners: {
    afterrender: "onInitComponent",
    activate: "pageChange",
  },

  dockedItems: [
    {
      xtype: "panel",
      layout: {
        type: "vbox",
        align: "stretch",
      },

      dock: "top",
      margin: 0,
      items: [
        {
          // function bar
          xtype: "toolbar",
          layout: {
            type: "hbox",
            align: "stretch",
            pack: "center",
          },
          style: {
            background: "#C3E6E5",
          },
          scrollable: true,
          padding: "0 0 0 5",
          items: [
            {
              text: "查詢列",
              reference: "func-btn-wei",
              cls: "funcbarBtn-black",
              iconCls: "fa fa-search",
              margin: 5,
              width: 80,
              height: 50,
              style: {
                border: "none",
              },
              handler: "onClick",
            },

            {
              text: "新增",
              reference: "func-add-btn-wei",
              iconCls: "fa fa-plus",
              cls: "funcbarBtn-black",
              margin: 5,
              width: 80,
              height: 50,
              style: "border: none",
              handler: "funcbar_add",
            },

            {
              text: "修改",
              reference: "func-edit-btn-wei",
              iconCls: "fa fa-edit",
              cls: "funcbarBtn-black",
              margin: 5,
              width: 80,
              height: 50,
              style: "border: none",
              handler: "funcbar_edit",
            },

            {
              text: "儲存",
              reference: "func-save-btn-wei",
              iconCls: "fa fa-save",
              cls: "funcbarBtn-black",
              margin: 5,
              width: 80,
              height: 50,
              style: "border: none",
              handler: "funcbar_save",
            },

            {
              text: "取消",
              reference: "func-cancel-btn-wei",
              iconCls: "fa fa-times",
              cls: "funcbarBtn-black",
              margin: 5,
              width: 80,
              height: 50,
              style: "border: none ",
              handler: "funcbar_cancel",
            },
          ],
        },
        {
          // search bar
          xtype: "panel",
          reference: "panel-search-wei",
          layout: {
            type: "hbox",
            align: "stretch",
            pack: "center",
          },

          defaults: {
            margin: "0 0 5 5",
          },
          scrollable: true,
          items: [
            {
              // serach condition
              xtype: "fieldset",
              title: "查詢條件",
              layout: {
                type: "hbox",
                align: "stretch",
              },
              defaults: {
                labelWidth: 37,
                margin: "0 0 8 5",
              },

              items: [
                {
                  xtype: "textfield",
                  fieldLabel: "學號",
                  emptyText: "請輸入學號",
                  enableKeyEvents: true,
                  margin: "0 0 8 0",
                  reference: "txt-search-code-wei",
                  listeners: {
                    keypress: "enterSearch",
                  },
                },
                {
                  xtype: "textfield",
                  fieldLabel: "姓名",
                  emptyText: "請輸入姓名",
                  enableKeyEvents: true,
                  reference: "txt-search-name-wei",
                  listeners: {
                    keypress: "enterSearch",
                  },
                },
                {
                  xtype: "combobox",
                  fieldLabel: "狀態",
                  reference: "cmb-search-status-wei",

                  valueField: "value",
                  displayField: "text",
                  queryMode: "local",
                  forceSelection: true,
                  anyMatch: true,
                  editable: false,
                  store: {},

                  enableKeyEvents: true,
                  listeners: {
                    keypress: "enterSearch",
                  },
                },
              ],
            },
            {
              xtype: "button",
              text: "查詢",
              scale: "small",
              cls: "antBtn-blue",
              iconCls: "fa fa-search",
              width: 60,
              border: false,
              margin: "10 0 5 5",
              handler: "forSearchBtn",
            },
            {
              xtype: "button",
              text: "清除",
              scale: "small",
              cls: "antBtn-red",
              iconCls: "fa fa-times",
              width: 60,
              border: false,
              margin: "10 0 5 5",
              handler: "cleanSearchBtn",
            },
          ],
        },
      ],
    },
  ],

  scrollable: true,
  items: [
    {
      xtype: "panel",
      layout: {
        type: "hbox",
        align: "stretch",
      },
      margin: 5,
      minHeight: 200,
      flex: 1,
      scrollable: true,
      items: [
        {
          // userlist
          xtype: "gridpanel",
          title: "使用者清單",
          reference: "grid-userlist-wei",
          viewConfig: {
            enableTextSelection: true,
          },
          border: true,
          store: {}, // data
          minWidth: 200,
          flex: 1,
          listeners: {
            selectionchange: "onSelectUser",
          },
          columns: [
            {
              xtype: "rownumberer",
              align: "center",
              width: 50,
            },
            {
              dataIndex: "code",
              text: "學號",
              width: 110,
            },
            {
              dataIndex: "name",
              text: "姓名",
              width: 110,
            },
            {
              dataIndex: "mail",
              text: "信箱",
              minWidth: 96,
              flex: 1,
            },
            {
              dataIndex: "status",
              text: "狀態",
              width: 96,
              renderer: function (value) {
                let storeStatus = Ext.create("antnex.store.static.Status");
                let record = storeStatus
                  .getRange()
                  .find((e) => e.get("value") == value);
                return record ? record.get("text") : `無法辨識: ${value}`;
              },
            },
          ],
        },
        { xtype: "splitter", margin: -1.5 },
        {
          // data maintenance
          xtype: "panel",
          title: "資料維護",
          reference: "panel-dataMaintain-wei",
          layout: {
            type: "vbox",
            align: "stretch",
          },
          flex: 2,
          defaults: {
            margin: "0 5 5 5", // '上 右 下 左'
          },
          border: true,
          items: [
            {
              // basic data
              xtype: "fieldset",
              title: "基本資料",
              layout: {
                type: "vbox",
                align: "stretch",
              },
              defaults: {
                margin: "0 0 8 0",
              },
              items: [
                {
                  xtype: "numberfield",
                  fieldLabel: "ids",
                  reference: "num-wei-user-ids",
                  labelWidth: 37,
                  cls: "fieldNotInput",
                },
                {
                  xtype: "textfield",
                  fieldLabel: "學號",
                  reference: "txt-wei-user-code",
                  labelWidth: 37,
                  cls: "fieldRequired",
                },
                {
                  xtype: "textfield",
                  fieldLabel: "姓名",
                  reference: "txt-wei-user-name",
                  labelWidth: 37,
                  cls: "fieldRequired",
                },
                {
                  xtype: "textfield",
                  fieldLabel: "信箱",
                  reference: "txt-wei-user-mail",
                  labelWidth: 37,
                },
                {
                  xtype: "textfield",
                  fieldLabel: "密碼",
                  reference: "txt-wei-user-password",
                  labelWidth: 37,
                  inputType: "password",
                  cls: "fieldRequired",
                },
                {
                  xtype: "combobox",
                  fieldLabel: "狀態",
                  reference: "cmb-wei-user-status",
                  labelWidth: 37,
                  cls: "fieldRequired",

                  valueField: "value",
                  displayField: "text",
                  queryMode: "local",
                  forceSelection: true,
                  anyMatch: true,
                  editable: false,
                  store: { type: "status" },
                },
                {
                  xtype: "textarea",
                  fieldLabel: "備註",
                  reference: "txt-wei-user-memo",
                  labelWidth: 37,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});
