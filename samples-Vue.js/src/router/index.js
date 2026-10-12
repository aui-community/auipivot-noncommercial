import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		name: 'Home',
		// 해당 메뉴를 열 때 필요한 예제 화면을 불러옵니다.
		component: () => import('@/views/HomeView.vue') // ✅ @ alias 작동하도록 vite.config.js 수정 필요
	},
	{
		path: '/TreeLayout',
		name: 'TreeLayout',
		// 해당 메뉴를 열 때 필요한 예제 화면을 불러옵니다.
		component: () => import('@/samples/TreeLayout.vue')
	},
	{
		path: '/TableLayout',
		name: 'TableLayout',
		// 해당 메뉴를 열 때 필요한 예제 화면을 불러옵니다.
		component: () => import('@/samples/TableLayout.vue')
	},
	{
		path: '/TableMergeLayout',
		name: 'TableMergeLayout',
		// 해당 메뉴를 열 때 필요한 예제 화면을 불러옵니다.
		component: () => import('@/samples/TableMergeLayout.vue')
	},
	// 4번 메뉴에서 실제 Vue 서브 컴포넌트의 메소드를 호출합니다.
	{
		path: '/WrapperMethods',
		name: 'WrapperMethods',
		// 해당 메뉴를 열 때 필요한 예제 화면을 불러옵니다.
		component: () => import('@/samples/WrapperMethods.vue')
	}
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
});

export default router;
