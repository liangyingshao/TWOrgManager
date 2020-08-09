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
            width: 100,
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
                    key: 'parentAdminUser.RealName',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '教工号',
                    key: 'parentAdminUser.Code',
                    width: 100,
                    align: 'center'
                }
            ]
        },
        {
            title: '学生社团指导老师',
            align: 'center',
            key: 'guideTeachers',
            children: [
                {
                    title: '姓名',
                    key: 'RealName',
                    width: 100
                },
                {
                    title: '教工号',
                    key: 'Code',
                    width: 100
                }
            ]
        },
        {
            title: '学生社团管理员',
            align: 'center',
            children: [
                {
                    title: '姓名',
                    key: 'adminUser.RealName',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '学号',
                    key: 'adminUser.Code',
                    width: 100,
                    align: 'center'
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
