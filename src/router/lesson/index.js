export default [
    {
        path: '/lesson',
        name: 'lesson',
        component: resolve => require(['@/components/lesson'], resolve),
    },
    {
        path: '/lesson/editLesson',
        name: 'editLesson',
        component: resolve => require(['@/components/lesson/editLesson'], resolve)
    },
    {
        path: '/lesson/excelLesson',
        name: 'excelLesson',
        component: resolve => require(['@/components/lesson/excelLesson'], resolve)
    },
    {
        path: '/lesson/excelLesson/excelEdit',
        name: 'excelEdit',
        component: resolve => require(['@/components/lesson/excelEdit'], resolve)
    }
]