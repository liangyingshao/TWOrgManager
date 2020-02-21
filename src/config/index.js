let appSetting = {
    debug: process.env.NODE_ENV !== "production",
    api: "",
    currentUserGuid: "",
    titlePerfix: " - ",
    title: "登录",
    nav: "",
    reloadOrg: "",
    reloadCategory: "",
    userInfo: {},
    info: {
        title: "",
        subtitle: "",
        avatar: "",
        nmsopen: false
    },
    departType: 2,
    checkPermission () { return false; },
    webInfo: {
        avatar: "",
        nmsOpen: false,
        subtitle: "",
        title: ""
    },
    dashboard: { name: "OrgManage" },
    ueditor: {
        serverUrl: "http://stgl.ricebird.cn/ueditor/process",
        topOffset: 64,
        zIndex: 9,
        UEDITOR_HOME_URL: process.env.NODE_ENV === "production" ? "/web/third/" : "/static/"
    }
};
module.exports = appSetting;
