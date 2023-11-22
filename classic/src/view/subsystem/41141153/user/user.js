Ext.define("antnex.subsystem.sample.41141153.user.user", {
  extend: "Ext.panel.Panel",
  requires: ["antnex.subsystem.sample.41141153.user.userController"],
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
          },
          scrollable: true,
          border: false,
          padding: "0 0 0 5",
          items: [
            {
              xtype: "button",
              text: "查詢列",
              reference: "func-btn-wei",
              cls: "funcbarBtn-black",
              iconCls: "fa fa-search",
              margin: 3,
              handler: "onClick",
            },
            { xtype: "tbseparator", margin: "8 1" },
            {
              xtype: "button",
              text: "新增",
              cls: "funcbarBtn-black",
              iconCls: "fa fa-plus",
              margin: 3,
            },
            { xtype: "tbseparator", margin: "8 1" },
            {
              xtype: "button",
              text: "修改",
              cls: "funcbarBtn-black",
              iconCls: "fa fa-edit",
              margin: 3,
            },
            { xtype: "tbseparator", margin: "8 1" },
            {
              xtype: "button",
              text: "儲存",
              cls: "funcbarBtn-black",
              iconCls: "fa fa-save",
              margin: 3,
            },
            { xtype: "tbseparator", margin: "8 1" },
            {
              xtype: "button",
              text: "取消",
              cls: "Btn-black",
              iconCls: "fa fa-times",
              margin: 3,
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
                },
                {
                  xtype: "textfield",
                  fieldLabel: "姓名",
                  emptyText: "請輸入姓名",
                  enableKeyEvents: true,
                  reference: "txt-search-name-wei",
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

          viewConfig: {
            enableTextSelection: true,
          },
          border: true,
          store: {}, // data
          minWidth: 200,
          flex: 1,
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
                  labelWidth: 37,
                  cls: "fieldNotInput",
                },
                {
                  xtype: "textfield",
                  fieldLabel: "學號",
                  labelWidth: 37,
                  cls: "fieldRequired",
                },
                {
                  xtype: "textfield",
                  fieldLabel: "姓名",
                  labelWidth: 37,
                  cls: "fieldRequired",
                },
                {
                  xtype: "textfield",
                  fieldLabel: "信箱",
                  labelWidth: 37,
                },
                {
                  xtype: "textfield",
                  fieldLabel: "密碼",
                  labelWidth: 37,
                  inputType: "password",
                  cls: "fieldRequired",
                },
                {
                  xtype: "combobox",
                  fieldLabel: "狀態",
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
