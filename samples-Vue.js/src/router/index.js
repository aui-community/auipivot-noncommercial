import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/views/HomeView.vue') // ✅ @ alias 작동하도록 vite.config.js 수정 필요
	},
	{
		path: '/TreeLayout',
		name: 'TreeLayout',
		component: () => import('@/samples/TreeLayout.vue')
	},
	{
		path: '/TableLayout',
		name: 'TableLayout',
		component: () => import('@/samples/TableLayout.vue')
	},
	{
		path: '/TableMergeLayout',
		name: 'TableMergeLayout',
		component: () => import('@/samples/TableMergeLayout.vue')
	},
	// 4번 메뉴에서 실제 Vue 서브 컴포넌트의 메소드를 호출합니다.
	{
		path: '/WrapperMethods',
		name: 'WrapperMethods',
		component: () => import('@/samples/WrapperMethods.vue')
	}
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
});

export default router;
