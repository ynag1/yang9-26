/* eslint-disable  */
import layout from '@/layout'
export default {
	path: '/attendances',
	component:layout,
	children: [
		{
			path: "",
			name: 'attendances',
			component: () => import('@/views/attendances/index.vue'),
			meta:{title:'考勤',icon:"skill"}
		}
	]
}