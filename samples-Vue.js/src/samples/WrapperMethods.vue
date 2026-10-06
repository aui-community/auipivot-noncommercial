<script setup>
	import { ref, onMounted, onBeforeUnmount } from 'vue';
	import AUIPivot from '@/static/AUIPivot-Vue/AUIPivot.vue';

	const myPivot = ref(null);
	const layout = ref('tree');
	const ready = ref(false);
	const loaded = ref(false);
	const hasReport = ref(false);
	const status = ref('자동차 판매 자료를 불러옵니다.');
	const eventLog = ref([]);
	let eventSequence = 0;
	// 큰 원본 배열은 Vue 반응형 상태로 변환하지 않고 피벗에 그대로 전달합니다.
	let source, savedReport, slicerId;
	const request = new AbortController();

	// 시작점에서 표를 만들고 Playground와 같은 고정 자동차 JSON을 읽습니다.
	// 기존 1~3번 자료를 유지하기 위해 새 예제의 사본은 data/wrapper에 둡니다.
	function init() {
		createPivotGrid();
		requestData(`${import.meta.env.BASE_URL}data/wrapper/car_sales.json`);
	}
	// 이벤트 객체 전체 대신 사용자가 확인할 문자열만 남깁니다. 위치는 화면처럼 1부터 표시합니다.
	function showEvent(event) {
		let message;
		switch (event.type) {
			case 'pivotBegin':
				message = '보고서 계산을 시작했습니다.';
				break;
			case 'pivotComplete':
				message = `보고서 계산 완료. 행 필드 ${event.rowFields.length}개, 열 필드 ${event.columnFields.length}개, 값 필드 ${event.valueFields.length}개`;
				describe();
				break;
			case 'cellClick':
			case 'cellDoubleClick':
				message = `${event.rowIndex + 1}행, ${event.columnIndex + 1}열, ${event.headerText}: ${event.value ?? '빈 값'}`;
				break;
			case 'headerClick':
				message = `${event.columnIndex + 1}열 제목: ${event.headerText}`;
				break;
			case 'footerClick':
			case 'footerDoubleClick':
				message = `총합계 ${event.footerIndex + 1}열, 표시: ${event.footerText}, 값: ${event.footerValue ?? '빈 값'}`;
				break;
			case 'sorting':
				message = event.sortingFields.length ? event.sortingFields.map(field => `${field.dataField}: ${field.sortType === 1 ? '오름차순' : '내림차순'}`).join(', ') : '정렬을 해제했습니다.';
				break;
			case 'treeOpenChange':
				message = `${event.rowIndex + 1}행, ${event.depth}단계, ${event.isOpen ? '펼침' : '접힘'}`;
				break;
			case 'columnStateChange':
				message = `${event.headerText}, ${event.property === 'width' ? '너비(px)' : '열 인덱스'}: 이전 ${event.old}, 현재 ${event.current}`;
				break;
			case 'pivotPanelShow':
				message = '피벗 패널을 열었습니다.';
				break;
			case 'pivotPanelHide':
				message = '피벗 패널을 닫았습니다.';
				break;
			default:
				return;
		}
		const entry = { id: ++eventSequence, type: event.type, time: new Date().toLocaleTimeString('ko-KR', { hour12: false }), message };
		// 연속 이벤트도 빠뜨리지 않고 최신순으로 표시하되 오래된 기록은 버립니다.
		eventLog.value = [entry, ...eventLog.value].slice(0, 30);
		// false를 반환하지 않으므로 피벗 계산과 헤더의 기본 정렬은 그대로 실행됩니다.
	}

	// 피벗 생성과 기능 설정은 모두 Vue 컴포넌트 ref로 호출합니다.
	function createPivotGrid() {
		const pivot = myPivot.value;
		const pivotProps = { width: '100%', height: 400, layoutType: layout.value };
		pivot.create(pivotProps);
		// 재생성할 때 새 피벗에 한 번만 연결합니다. destroy가 이전 이벤트를 정리합니다.
		pivot.bind(['pivotBegin', 'pivotComplete', 'cellClick', 'cellDoubleClick', 'headerClick',
			'footerClick', 'footerDoubleClick', 'sorting', 'treeOpenChange', 'columnStateChange',
			'pivotPanelShow', 'pivotPanelHide'], showEvent);
		pivot.setFieldAlias({ REGION: '판매 지점', NAME: '차종', COUNT: '판매 대수' });
		pivot.setRowFields(['REGION', 'NAME']);
		// 가격과 판매 대수를 곱한 거래 금액을 원본 변경 없이 계산합니다.
		pivot.setDerivedFields([{
			dataField: 'ROW_AMOUNT', labelText: '거래 금액',
			expression: { operator: 'multiply', operands: ['PRICE', 'COUNT'] }
		}]);
		// 합계는 기본 SUM으로도 구할 수 있습니다. 여기서는 사용자 집계 등록 방법을 보여줍니다.
		pivot.registerCustomAggregator({
			id: 'WRAPPER_SUM', version: 1, labelText: '판매 대수 합계',
			create() { return { sum: 0 }; },
			accumulate(state, value) { state.sum += value; },
			merge(target, state) { target.sum += state.sum; },
			finalize(state) { return state.sum; }
		});
		pivot.setValueFields([
			{ dataField: 'ROW_AMOUNT', operation: 'SUM', formatString: '#,##0' },
			{ dataField: 'COUNT', operation: 'WRAPPER_SUM', formatString: '#,##0' }
		]);
		// 서울, 광주 순서로 먼저 표시하고 판매 대수가 많을수록 진한 녹색으로 표시합니다.
		pivot.setCustomValueOrders([{ dataField: 'REGION', values: ['서울 지점', '광주 지점'] }]);
		pivot.setVisualAnalytics([{
			dataField: 'COUNT', operation: 'WRAPPER_SUM',
			// 일반 셀은 전체 비교, 요약 칼럼과 요약 행도 각각의 합계 범위로 표시합니다.
			summaryColumns: true, summaryRows: true,
			heatmap: { scope: 'GLOBAL', colors: ['#FFFFFF', '#2F9D27'] }
		}]);
	}
	function requestData(url) {
		fetch(url, { signal: request.signal }).then(function (response) {
			if (!response.ok) throw new Error('자동차 자료를 불러오지 못했습니다.');
			return response.json();
		}).then(function (data) {
			if (request.signal.aborted) return;
			source = data;
			loaded.value = true;
			applyData(data);
		}).catch(function (error) {
			if (!request.signal.aborted) status.value = error.message;
		});
	}
	// 정적 원본을 입력한 뒤 지점 선택용 슬라이서를 만듭니다.
	function applyData(data) {
		const pivot = myPivot.value;
		pivot.setGridData(data);
		slicerId = pivot.createSlicer('#vue_wrapper_slicer', {
			dataField: 'REGION', columnCount: 4, movable: false, resizable: false
		});
		ready.value = true;
		describe();
	}
	// 조회 메소드로 현재 설정과 실제 파생 값을 확인합니다.
	function describe() {
		const pivot = myPivot.value;
		if (!pivot?.isCreated() || !source) return;
		const firstAmount = pivot.getDerivedFieldValue(source[0], 'ROW_AMOUNT');
		status.value = `원본 ${source.length.toLocaleString()}건, 파생 필드 ${pivot.getDerivedFields().length}개, 사용자 집계 ${pivot.getCustomAggregators().length}개, 순서 규칙 ${pivot.getCustomValueOrders().length}개, 시각화 ${pivot.getVisualAnalytics().length}개, 첫 거래 금액 ${firstAmount.toLocaleString()}원`;
	}
	// 처음에는 피벗이 관리하는 패널을 만들고, 닫은 뒤에는 같은 패널을 다시 표시합니다.
	function openPivotPanel() {
		const pivot = myPivot.value;
		if (pivot.isCreatedPivotPanel()) {
			pivot.showPivotPanel();
		} else {
			pivot.createPivotPanel({
				panelWidth: 400, panelHeight: 500,
				// 제목을 끌어 이동하거나 모서리를 끌어 크기를 조절할 수 있습니다.
				movableFieldPanel: true, resizableFieldPanel: true
			});
		}
	}

	// 데이터를 다시 요청하지 않고 현재 표의 출력 방식만 변경합니다.
	function changeLayout() {
		myPivot.value.setProp('layoutType', layout.value);
		myPivot.value.refresh();
		describe();
	}
	function saveReport() {
		// 보고서 설정만 메모리에 보관합니다. 페이지를 새로 열면 저장 내용은 사라집니다.
		savedReport = JSON.parse(JSON.stringify(myPivot.value.getReportDefinition()));
		hasReport.value = true;
		status.value = '현재 보고서 설정을 저장했습니다. 행 배치와 필터를 바꾼 뒤 복원해 보세요.';
	}
	function restoreReport() {
		myPivot.value.setReportDefinition(savedReport);
		layout.value = myPivot.value.getProp('layoutType');
	}
	function selectSeoul() {
		myPivot.value.setSlicerSelection(slicerId, ['서울 지점']);
	}
	function clearFilter() {
		myPivot.value.setSlicerSelection(slicerId, null);
	}
	function destroyPivot() {
		const pivot = myPivot.value;
		if (!pivot?.isCreated()) return;
		pivot.destroySlicer(slicerId);
		pivot.destroy();
		slicerId = null;
		ready.value = false;
		status.value = '표와 슬라이서를 제거했습니다. 다시 생성 버튼으로 같은 자료를 표시할 수 있습니다.';
	}
	function recreatePivot() {
		// 살아 있는 표가 있으면 먼저 제거하여 슬라이서와 이벤트를 중복 등록하지 않습니다.
		destroyPivot();
		createPivotGrid();
		applyData(source);
	}
	onMounted(init);
	// 다른 메뉴로 이동하면 늦게 도착한 응답을 사용하지 않습니다. 피벗은 컴포넌트가 제거합니다.
	onBeforeUnmount(() => request.abort());
</script>

<template>
	<div class="desc wrapper-methods">
		<h2>메소드 및 이벤트 활용</h2>
		<p>자동차 판매 자료로 거래 금액과 판매 대수를 표시합니다. 행 배치와 필터를 바꾸고 저장한 보고서를 복원해 보세요.</p>
		<p><code>setDerivedFields</code>, <code>registerCustomAggregator</code>, <code>setCustomValueOrders</code>, <code>setVisualAnalytics</code>를 컴포넌트 ref로 호출합니다.</p>
		<p>판매 대수는 전체 일반 셀(GLOBAL)을 비교하며, 요약 칼럼과 요약 행에도 색상을 표시합니다.</p>
		<div class="wrapper-controls">
			<label>행 배치 <select v-model="layout" :disabled="!ready" @change="changeLayout">
				<option value="tree">트리</option><option value="table">테이블</option><option value="tableCellMerge">셀병합</option>
			</select></label>
			<button :disabled="!ready" @click="openPivotPanel">피벗 패널 열기</button>
			<button :disabled="!ready" @click="saveReport">보고서 저장</button>
			<button :disabled="!ready || !hasReport" @click="restoreReport">보고서 복원</button>
			<button :disabled="!ready" @click="selectSeoul">서울 지점만 보기</button>
			<button :disabled="!ready" @click="clearFilter">필터 해제</button>
			<button :disabled="!loaded" @click="recreatePivot">다시 생성</button>
			<button :disabled="!ready" @click="destroyPivot">제거</button>
		</div>
		<p class="wrapper-status" role="status">{{ status }}</p>
		<div class="wrapper-workspace">
			<div class="wrapper-pivot">
				<!-- init에서 직접 생성하도록 자동 생성을 끕니다. 제거와 재생성도 같은 ref로 호출합니다. -->
				<AUIPivot ref="myPivot" name="wrapper-methods" :createOnMounted="false" />
			</div>
			<section class="wrapper-events" aria-label="이벤트 기록">
				<div class="wrapper-event-heading"><h3>이벤트 기록</h3><button :disabled="!eventLog.length" @click="eventLog = []">기록 지우기</button></div>
				<p>셀, 총합계, 제목을 클릭하거나 행을 접고 열 너비를 바꿔 보세요. 최근 30건을 최신순으로 표시합니다.</p>
				<div class="wrapper-event-scroll" tabindex="0" aria-label="최근 이벤트 목록">
					<p v-if="!eventLog.length">표를 조작하면 이벤트가 표시됩니다.</p>
					<ol class="wrapper-event-list">
						<li v-for="entry in eventLog" :key="entry.id" :data-event-type="entry.type">
							<div><code>{{ entry.type }}</code> <time>{{ entry.time }}</time></div><p>{{ entry.message }}</p>
						</li>
					</ol>
				</div>
			</section>
		</div>
		<div id="vue_wrapper_slicer" class="wrapper-slicer"></div>
	</div>
</template>

<style scoped>
	/* 새 예제의 조작부와 슬라이서에만 적용하여 기존 메뉴의 화면을 유지합니다. */
	.wrapper-controls { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin: 16px 0; }
	.wrapper-controls select { padding: 6px; }
	.wrapper-controls button:disabled { opacity: 0.5; cursor: default; }
	.wrapper-status { min-height: 42px; line-height: 1.5; }
	.wrapper-slicer { width: 100%; height: 200px; margin-top: 16px; }
	/* 기존 샘플의 전체 button 흰색 규칙이 슬라이서의 흰 배경 글자를 가리지 않게 합니다. */
	.wrapper-slicer :deep(button) { margin: 0; color: inherit !important; }
	.wrapper-slicer :deep(.aui-pivot-slicer-header button[aria-pressed="true"]) { color: var(--aui-accent, #387fb7) !important; }
	.wrapper-slicer :deep(.aui-pivot-slicer-item[aria-pressed="true"]) { color: var(--aui-accent-contrast, #fff) !important; }

/* 표와 기록을 나란히 보여 주고 좁은 화면에서는 기록을 아래로 옮깁니다. */
.wrapper-workspace { display: grid; grid-template-columns: minmax(0, 1fr) 340px; gap: 16px; }
.wrapper-pivot { min-width: 0; }
.wrapper-events { display: flex; flex-direction: column; height: 400px; padding: 12px; box-sizing: border-box; border: 1px solid #d4dbe3; background: #f7f9fc; color: #25354a; }
.wrapper-event-heading { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
.wrapper-event-heading h3 { margin: 0; font-size: 16px; }
.wrapper-event-heading button { margin: 0; padding: 6px 10px; font-size: 12px; }
.wrapper-event-heading button:disabled { opacity: 0.5; cursor: default; }
.wrapper-events p { margin: 8px 0; font-size: 13px; line-height: 1.5; }
/* 기록 영역만 스크롤하므로 이벤트가 늘어나도 표의 높이는 바뀌지 않습니다. */
.wrapper-event-scroll { flex: 1; min-height: 0; overflow: auto; }
.wrapper-event-list { list-style: none; margin: 0; padding: 0; }
.wrapper-event-list li { padding: 8px 0; border-bottom: 1px solid #dfe5ec; overflow-wrap: anywhere; }
.wrapper-event-list code { font-size: 13px; font-weight: 600; }
.wrapper-event-list time { color: #59697c; font-size: 11px; }
.wrapper-event-list p { margin: 4px 0 0; }
@media (max-width: 1050px) {
 .wrapper-workspace { grid-template-columns: minmax(0, 1fr); }
 .wrapper-events { height: 240px; }
}
</style>
