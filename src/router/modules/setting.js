/* eslint-disable  */
import layout from '@/layout'
export default {
	path: '/setting',
	component:layout,
	children: [
		{
			path: "",
			name: 'setting',
			component: () => import('@/views/setting/index.vue'),
			meta:{title:'公司设置 ',icon:"setting"}
		}
	]
}