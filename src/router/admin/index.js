module.exports = {
    OrgManage: {
        path: "/manage/switch",
        layout: "admin",
        component: () => import(/* webpackChunkName: "OrgManager" */"@p/Modules/OrgManager/OrgManager")
    },
    AdminManage: {
        path: "/manage/admin",
        layout: "admin",
        component: () => import(/* webpackChunkName: "OrgManager" */"@p/Modules/OrgManager/forAdmin")
    },
    StuManage: {
        path: "/manage/student",
        layout: "admin",
        component: () => import(/* webpackChunkName: "OrgManager" */"@p/Modules/OrgManager/forStudent")
    },
    OrgDetail: {
        path: "/manage/org/detail",
        layout: "admin",
        showAs: "OrgManage",
        component: () => import(/* webpackChunkName: "OrgManager" */"@p/Modules/OrgDetail")
    },
    ActivityForm: {
        path: "/manage/org/activityform",
        layout: "admin",
        component: () => import(/* webpackChunkName: "OrgManager" */"@p/Modules/ActivityForm")
    },
    SignUpSituation: {
        path: "/manage/org/signUpSituation",
        layout: "admin",
        component: () => import(/* webpackChunkName: "OrgManager" */"@p/Modules/OrgDetail/signUpSituation")
    },
    Affiliated: {
        path: "/manage/org/affiliated",
        layout: "admin",
        component: () => import(/* webpackChunkName: "OrgManager" */"@p/Modules/OrgDetail/Affiliated")
    },
    DepartSwitch: {
        path: "/manage/org/departSwitch",
        layout: "admin",
        showAs: "OrgManage",
        component: () => import(/* webpackChunkName: "OrgManager" */"@p/Modules/OrgDetail/DepartSwitch")
    },
    WorkflowConfig: {
        path: "/manage/wwf/config",
        layout: "admin",
        component: () => import(/* webpackChunkName: "WorkflowManager" */"@p/Modules/WorkflowConfig")
    },
    AllFlow: {
        path: "/manage/wwf/allflow",
        layout: "admin",
        component: () => import(/* webpackChunkName: "WorkflowManager" */"@p/Modules/AllFlow")
    },
    MyAttend: {
        path: "/manage/wwf/myattend",
        layout: "admin",
        component: () => import(/* webpackChunkName: "WorkflowManager" */"@p/Modules/MyAttend")
    },
    MyFlow: {
        path: "/manage/wwf/myflow",
        layout: "admin",
        component: () => import(/* webpackChunkName: "WorkflowManager" */"@p/Modules/MyFlow")
    },
    MyPending: {
        path: "/manage/wwf/mypending",
        layout: "admin",
        component: () => import(/* webpackChunkName: "WorkflowManager" */"@p/Modules/MyPending")
    }
};
