export default [
    {
        path: '/collection',
        name: 'collection',
        component: resolve => require(['@/components/collection'], resolve)
    },
    {
        path: '/collection/editCollection',
        name: 'editCollection',
        component: resolve => require(['@/components/collection/editCollection'], resolve)
    }
]