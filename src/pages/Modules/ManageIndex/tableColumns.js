let columns = {
    activity: [
        {
            title: '活动名称',
            key: 'ActivityName'
        },
        {
            title: '活动类型',
            key: 'ActivityType'
        },
        {
            title: '审核进度',
            key: 'CurrentStep'
        },
        {
            title: '负责人姓名',
            key: 'Owner'
        },
        {
            title: '活动开始时间',
            key: 'StartDate'
        },
        {
            title: '二维码',
            slot: 'QRCode',
            key: 'ShortCode'
        },
        {
            title: '操作',
            slot: 'Action'
        }
    ],
    organization: [
        {
            title: '名称',
            key: 'name',
            fixed: 'left',
            width: 200,
            align: 'center'
        },
        {
            title: '社团类型',
            key: 'DepartType',
            width: 120,
            align: 'center'
        },
        {
            title: '业务指导单位',
            key: 'parent',
            width: 200,
            align: 'center'
        },
        {
            title: '业务指导单位管理员',
            align: 'center',
            children: [
                {
                    title: '姓名',
                    key: 'parentAdminUser',
                    width: 90,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', params.row.parentAdminUser.RealName);
                    }
                },
                {
                    title: '教工号',
                    key: 'parentAdminUser',
                    width: 100,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', params.row.parentAdminUser.Code);
                    }
                }
            ]
        },
        {
            title: '学生社团指导老师',
            align: 'center',
            children: [
                {
                    title: '姓名',
                    key: 'guideTeachers',
                    width: 110,
                    align: 'center',
                    render: (h, params) => {
                        return h('div',
                            params.row.guideTeachers.map(item => {
                                return item.RealName
                            }).join("、")
                        );
                    }
                },
                {
                    title: '教工号',
                    key: 'guideTeachers',
                    width: 100,
                    align: 'center',
                    render: (h, params) => {
                        return h('div',
                            params.row.guideTeachers.map(item => {
                                return item.Code
                            }).join("、")
                        );
                    }
                }
            ]
        },
        {
            title: '学生社团管理员',
            align: 'center',
            children: [
                {
                    title: '姓名',
                    key: 'adminUser',
                    width: 90,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', params.row.adminUser.RealName);
                    }
                },
                {
                    title: '教工号',
                    key: 'adminUser',
                    width: 100,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', params.row.adminUser.Code);
                    }
                }
            ]
        },
        {
            title: '操作',
            slot: 'Action',
            width: 100,
            align: 'center'
        }
    ]
}
export default columns;
