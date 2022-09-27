/* eslint-disable  */
import layout from '@/layout'
export default {
	path: '/salarys',
	component:layout,
	children: [
		{
			path: "",
			name: 'salarys',
			component: () => import('@/views/salarys/index.vue'),
			meta:{title:'工资 ',icon:"money"}
		}
	]
}