/* eslint-disable  */
import layout from '@/layout'
export default {
	path: '/departments',
	component:layout,
	children: [
		{
			path: "",
			name: 'departments',
			component: () => import('@/views/departments/index.vue'),
			meta:{title:'组织架构',icon:"tree"}
		}
	]
}