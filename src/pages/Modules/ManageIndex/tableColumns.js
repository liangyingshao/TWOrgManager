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
            key: 'name'
        },
        {
            title: '类型',
            key: 'ActivityType'
        },
        {
            title: '业务指导单位',
            key: 'CurrentStep'
        },
        {
            title: '业务指导单位管理员',
            key: 'Owner',
            children: [
                {
                    title: '姓名',
                    key: 'Owner'
                },
                {
                    title: '教工号',
                    key: 'Owner'
                }
            ]
        },
        {
            title: '学生社团指导老师',
            key: 'Owner',
            children: [
                {
                    title: '姓名',
                    key: 'Owner'
                },
                {
                    title: '教工号',
                    key: 'Owner'
                }
            ]
        },
        {
            title: '学生社团管理员',
            key: 'Owner',
            children: [
                {
                    title: '姓名',
                    key: 'Owner'
                },
                {
                    title: '学号',
                    key: 'Owner'
                }
            ]
        },
        {
            title: '操作',
            slot: 'Action'
        }
    ]
}
export default columns;
