<script setup lang="ts">
	import CodeBlock from '@/views/CodeBlock.vue';
	import treeLayoutCode from '@/samples/TreeLayout.vue?raw';
</script>
<template>
	<div class="home-main">
		<h1 class="home-title">AUIPivot for Vue 3 + TypeScript</h1>
		<p>자바스크립트 프레임워크 중 하나인 Vue.js 버전 3에서 AUIPivot 를 어떻게 사용 할 수 있는지를 보여주는 데모입니다.</p>
		<p>
			AUIPivot 에서 지원하는 모든 기능에 대한 데모를 보고자 한다면<a
				href="https://www.auisoft.net/demo/auipivot"
				class="link-is-link"
			>
				여기
			</a>
			를 클릭하세요.
		</p>
		<p>본 데모는 Vue 3 + TypeScript + Vite 환경에서 다음 의존도로 작성되었습니다.</p>
		<p>타입 정의와 이벤트 상수는 npm의 <code>aui-pivot</code> 패키지를 사용합니다.</p>
		<!-- 최신 타입 설치와 기존 잠금 파일 갱신 명령을 구분해 안내합니다. -->
		<CodeBlock language="none">npm install aui-pivot@latest</CodeBlock>
		<p>이 샘플은 <code>latest</code> 태그를 사용합니다. 최신 버전으로 갱신하려면 <code>npm update aui-pivot</code>을 실행하세요.</p>
		<!-- HOME의 기존 안내와 예제는 유지하고 의존성 영역만 카드로 구분합니다. -->
		<div class="home-dependencies">
			<section class="dependency-card">
				<h2>Dependencies</h2>
				<ul>
					<li><strong>aui-pivot</strong>: latest</li>
					<li><strong>file-saver</strong>: ^2.0.5</li>
					<li><strong>vue</strong>: ^3.5.17</li>
					<li><strong>vue-router</strong>: ^4.5.1</li>
				</ul>
			</section>
			<section class="dependency-card">
				<h2>Dev Dependencies</h2>
				<ul>
					<li><strong>typescript</strong>: ~5.9.3</li>
					<li><strong>vue-tsc</strong>: ~3.1.0</li>
					<li><strong>@vitejs/plugin-vue</strong>: ^6.0.0</li>
					<li><strong>vite</strong>: ^7.0.4</li>
				</ul>
			</section>
		</div>
		<h2 class="headline">HOW TO CODE</h2>
		<p class="sub-headline">Vue 3 환경에서 다음처럼 코딩하여 AUIPivot 사용이 가능합니다.</p>
		<h3>이 프로젝트 전체 소스는 Samples/auipivot-vue-ts-samples 폴더에 존재합니다.</h3>
		<div class="codeblock-wrap">
			<CodeBlock language="typescript">{{ treeLayoutCode }} </CodeBlock>
		</div>
		<p>
			<a
				href="https://www.auisoft.net/demo/auipivot"
				class="link-is-link"
			>
				일반 Javascript 환경의 데모 보러 가기
			</a>
		</p>
	</div>
</template>
