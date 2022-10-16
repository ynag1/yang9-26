/* eslint-disable  */
import layout from '@/layout'
export default {
	path: '/employees',
	component:layout,
	children: [
		{
			path: "",
			name: 'employees',
			component: () => import('@/views/employees/index.vue'),
			meta:{title:'员工 ',icon:"people"}
		},
		{
			path: "detail:id",
			component: () => import('@/views/employees/detail.vue'),
			hidden: true
		},
		{
			path: "print/:id",
			component: () => import('@/views/employees/print.vue'),
			hidden: true
		}
	]
}