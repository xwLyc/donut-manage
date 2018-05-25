export default [
    {
        path: '/activity',
        name: 'activity',
        component: resolve => require(['@/components/activity'], resolve)
    },
    {
        path: '/activity/editActivity',
        name: 'editActivity',
        component: resolve => require(['@/components/activity/editActivity'], resolve)
    },
    {
        path: '/activity/lockConfig',
        name: 'lockConfig',
        component: resolve => require(['@/components/activity/lockConfig'], resolve)
    },
    {
        path: '/activity/msgConfig',
        name: 'msgConfig',
        component: resolve => require(['@/components/activity/msgConfig'], resolve),
        children: [
            {
                path: '/activity/noliebian/msgStudy',
                name: 'nlb_msgStudy',
                component: resolve => require(['@/components/activity/noliebian/msgStudy'], resolve)
            },
            {
                path: '/activity/liebian/msgUnLock',
                name: 'lb_msgUnLock',
                component: resolve => require(['@/components/activity/liebian/msgUnLock'], resolve)
            },
            {
                path: '/activity/liebian/msgStudy',
                name: 'lb_msgStudy',
                component: resolve => require(['@/components/activity/liebian/msgStudy'], resolve)
            },
            {
                path: '/activity/xuqi/msgUnLock',
                name: 'xq_msgUnLock',
                component: resolve => require(['@/components/activity/xuqi/msgUnLock'], resolve)
            },
            {
                path: '/activity/xuqi/msgStudy',
                name: 'xq_msgStudy',
                component: resolve => require(['@/components/activity/xuqi/msgStudy'], resolve)
            },
            {
                path: '/activity/xuqi/msgRenewal',
                name: 'xq_msgRenewal',
                component: resolve => require(['@/components/activity/xuqi/msgRenewal'], resolve)
            },
        ]
    }
]