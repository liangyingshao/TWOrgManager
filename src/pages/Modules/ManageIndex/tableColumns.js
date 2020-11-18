let columns = {
    activity: [
        {
            title: '活动名称',
            key: 'ActivityName'
        },
        {
            title: '活动类型',
            key: 'ActivityType',
            filters: [
                {
                    label: '团支部活动',
                    value: '团支部活动'
                },
                {
                    label: '党支部活动',
                    value: '党支部活动'
                },
                {
                    label: '普通活动',
                    value: '普通活动'
                }
            ],
            filterMultiple: false,
            filterRemote (value, key, col) {
            }
        },
        {
            title: '审核进度',
            key: 'CurrentStep',
            filters: [
                {
                    label: '填写申请表',
                    value: '填写申请表'
                },
                {
                    label: '指导老师审核',
                    value: '指导老师审核'
                },
                {
                    label: '业务指导单位审核',
                    value: '业务指导单位审核'
                },
                {
                    label: '学生社团管理部审核',
                    value: '学生社团管理部审核'
                },
                {
                    label: '校团委审核',
                    value: '校团委审核'
                },
                {
                    label: '完成',
                    value: '完成'
                },
                {
                    label: '取消',
                    value: '取消'
                }
            ],
            filterMultiple: false,
            filterRemote (value, key, col) {
            }
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
            key: 'ShortCode',
            width: 100
        },
        {
            title: '操作',
            slot: 'Action'
        }
    ],
    organization: [
        {
            title: '名称\r\n（点击跳转至社团详情）',
            key: 'name',
            fixed: 'left',
            width: 200,
            align: 'center',
            render: (h, params) => {
                return h('router-link', {
                    props: {
                        to: {
                            name: 'OrgDetail',
                            query: {id: params.row.id}
                        }
                    }
                }, params.row.name);
            },
            renderHeader: (h, params) => {
                let text = "社团名称<br/>（点击可查看详情）";
                return h('div', {
                    domProps: { innerHTML: text }
                });
            }
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
            align: 'center',
            render: (h, params) => {
                return h('router-link', {
                    props: {
                        to: {
                            name: 'CollegeManage',
                            query: {overrideDptId: params.row.pid}
                        }
                    }
                }, params.row.parent);
            }
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
                    minWidth: 100,
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
                    minWidth: 100,
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
                    title: '学号',
                    key: 'adminUser',
                    minWidth: 100,
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
