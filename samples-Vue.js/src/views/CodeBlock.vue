<script setup>
	import { onMounted, ref, nextTick } from 'vue';
	import Prism from 'prismjs';

	// WebDemo와 같은 Prism 1.30 테마를 사용하고 원래 슬롯의 코드 내용을 유지합니다.
	import 'prismjs/themes/prism-tomorrow.css';
	import 'prismjs/components/prism-javascript';
	import 'prismjs/components/prism-css';
	import 'prismjs/components/prism-markup';

	defineProps({ language: { type: String, default: 'javascript' } });
	const codeBlock = ref(null);
	const copyLabel = ref('복사');

	// 하이라이트 요소가 추가되어도 textContent는 복사 가능한 원문으로 유지됩니다.
	function copyCode() {
		const code = codeBlock.value?.textContent || '';
		if (!navigator.clipboard) { copyLabel.value = '복사할 수 없습니다'; return; }
		navigator.clipboard.writeText(code.trim()).then(() => { copyLabel.value = '복사 완료'; }, () => { copyLabel.value = '복사할 수 없습니다'; });
	}
	onMounted(() => {
		nextTick(() => { if (codeBlock.value) Prism.highlightElement(codeBlock.value); });
	});
</script>
<template>
	<div class="sample-code-frame">
		<div class="sample-code-toolbar">
			<span>{{ language === 'none' ? '터미널' : language === 'typescript' ? 'TypeScript' : 'JavaScript' }}</span>
			<button type="button" @click="copyCode" aria-live="polite">{{ copyLabel }}</button>
		</div>
		<pre tabindex="0" aria-label="사용 예제 코드"><code :class="`language-${language}`" ref="codeBlock"><slot /></code></pre>
	</div>
</template>
