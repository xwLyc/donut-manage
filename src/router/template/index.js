export default [
    {
        path: '/template',
        name: 'template',
        component: resolve => require(['@/components/template'], resolve)
    },
    {
        path: '/template/editTemplate',
        name: 'editTemplate',
        component: resolve => require(['@/components/template/editTemplate'], resolve)
    }
]