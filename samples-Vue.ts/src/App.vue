<script setup lang="ts">
	// 메뉴 경로와 순서는 유지하고 프로젝트 배포 경로에 맞춰 로고를 불러옵니다.
	const logo = `${import.meta.env.BASE_URL}assets/auipivot-mark.svg`;
	const mainMenuList = [
		{
			path: '/TreeLayout',
			name: 'TreeLayout',
			text: '피벗 출력 방식 - 트리(기본값)'
		},
		{
			path: '/TableLayout',
			name: 'TableLayout',
			text: '피벗 출력 방식 - 테이블'
		},
		{
			path: '/TableMergeLayout',
			name: 'TableMergeLayout',
			text: '피벗 출력 방식 - 테이블 셀병합'
		},
		// 기존 출력 방식 예제 다음에 컴포넌트 메소드와 이벤트 활용 예제를 표시합니다.
		{
			path: '/WrapperMethods',
			name: 'WrapperMethods',
			text: '메소드 및 이벤트 활용'
		}
	];
</script>
<template>
	<div class="sample-app">
		<a class="sample-skip-link" href="#sample-content">본문으로 건너뛰기</a>
		<header class="sample-header">
			<div class="sample-header-inner">
				<router-link to="/" class="sample-brand" aria-label="AUIPivot HOME">
					<img :src="logo" alt="" width="44" height="44" />
					<span class="sample-brand-copy"><strong>AUIPivot</strong><span>Vue 3 + TypeScript</span></span>
				</router-link>
				<div class="sample-header-links">
					<a href="https://www.auisoft.net/price-pivot.html">라이선스 안내</a>
					<!-- 다운로드 센터에 AUIPivot 선택 인수를 전달합니다. -->
					<a class="sample-download" href="https://www.auisoft.net/dcenter.html?product=AUIPivot">평가판 다운로드</a>
				</div>
			</div>
		</header>
		<!-- 작은 화면에서도 기존 다섯 메뉴를 바로 선택할 수 있도록 줄바꿈합니다. -->
		<nav class="sample-nav" aria-label="샘플 메뉴">
			<ul class="nav-menu">
				<li><router-link to="/" exact-active-class="nav-item-active">HOME</router-link></li>
				<li v-for="(item, index) in mainMenuList" :key="item.name">
					<router-link :to="item.path" exact-active-class="nav-item-active">
						<span class="sample-menu-number">{{ index + 1 }}.</span> {{ item.text }}
					</router-link>
				</li>
			</ul>
		</nav>
		<main id="sample-content" class="sample-main" tabindex="-1"><router-view /></main>
		<footer class="sample-footer"><span>AUIPivot 2.7</span><span>Copyright © AUISoft Co., Ltd.</span></footer>
	</div>
</template>
