<script setup>
	import { ref, onMounted } from 'vue';
	// AUIPivot 컴포넌트
	import AUIPivot from '@/static/AUIPivot-Vue/AUIPivot.vue';
	// 엑셀과 PDF 다운로드를 브라우저에서 처리하기 위한 file-saver
	import 'file-saver';

	// 피벗 속성 정의
	const pivotProps = {
		width: '100%',
		height: 560,
		layoutType: 'tableCellMerge'
	};

	// 피벗 컴포넌트 ref
	const myPivot = ref(null);

	// 초기 데이터 요청
	function requestPivotSourceData() {
		const pivot = myPivot.value;
		pivot.showAjaxLoader();

		// 원시 데이터 요청
		fetch(`${import.meta.env.BASE_URL}data/car_sales.json`)
			.then((response) => {
				if (!response.ok) throw new Error('HTTP error ' + response.status);
				return response.json();
			})
			.then((data) => {
				// 요청 완료 후 피벗 초기화
				initPivotData(data);
				pivot.removeAjaxLoader();
			})
			.catch((error) => {
				alert('데이터 요청 실패: ' + error.message);
			});
	}

	// 피벗 데이터 초기화
	function initPivotData(data) {
		const pivot = myPivot.value;

		// 행 필드
		pivot.setRowFields(['REGION', 'NAME', 'MODEL']);

		// 열 필드
		pivot.setColumnFields(['DATE_QTR', 'DATE_MONTH']);

		// 값 필드
		pivot.setValueFields([
			{ dataField: 'TOTAL', operation: 'SUM', formatString: '#,##0' },
			{ dataField: 'COUNT', operation: 'SUM', formatString: '#,##0' }
		]);

		// 필터 필드
		pivot.setFilterFields(['COLOR']);

		// 날짜 필드 명시
		pivot.setDateTypeField('DATE');

		// 필드 alias 설정
		pivot.setFieldAlias({
			REGION: '판매 지점',
			NAME: '차종',
			MODEL: '모델',
			COLOR: '색상',
			PRICE: '가격',
			COUNT: '판매 대수',
			TOTAL: '매출액',
			DATE: '일',
			DATE_YEAR: '년',
			DATE_HALF: '반기',
			DATE_QTR: '분기',
			DATE_MONTH: '월'
		});

		// 데이터 삽입
		pivot.setGridData(data);
	}

	// 피벗 패널 열기
	function openPivotPanel() {
		const pivot = myPivot.value;

		if (pivot.isCreatedPivotPanel()) {
			pivot.showPivotPanel();
		} else {
			const props = {
				pivotPanelId: '#pivot_show_table_merge',
				fieldListAreaRatio: 0.5,
				resizableFieldPanel: true,
				movableFieldPanel: true,
				panelWidth: 400,
				panelHeight: 600,
				minFieldPanelWidth: 300,
				minFieldPanelHeight: 400
			};
			pivot.createPivotPanel(props);
		}
	}

	// 현재 보고서를 한글 폰트를 포함한 PDF로 저장합니다.
	function exportPdfClick() {
		const pivot = myPivot.value;
		const exportProps = {
			// 배포 경로에 맞춰 폰트를 읽습니다. 다른 폰트는 fontPath로 지정합니다.
			fontPath: `${import.meta.env.BASE_URL}pdfkit/jejugothic.ttf`,
			fileName: 'AUIPivot_tableCellMerge'
		};
		pivot.exportToPdf(exportProps);
	}

	// 엑셀로 내보내기
	function exportClick() {
		const pivot = myPivot.value;
		const exportProps = {
			progressBar: true
		};
		pivot.exportToXlsx(exportProps);
	}

	// 피벗 시작 이벤트 핸들러
	function pivotBeginHandler(event) {
		console.log(event.type);
		console.time('피봇 보고서 시간');
	}

	// 피벗 완료 이벤트 핸들러
	function pivotCompleteHandler(event) {
		console.log(event.type);
		console.timeEnd('피봇 보고서 시간');
	}

	// 컴포넌트 마운트 시 초기 데이터 요청
	onMounted(() => {
		requestPivotSourceData();
	});
</script>

<template>
	<div class="desc">
		<h2>테이블 셀병합형 피벗 출력 방식</h2>
		<div>
			<button
				dark
				@click="openPivotPanel()"
			>
				피벗 패널 열기(생성하기)
			</button>
			<button @click="exportClick()">엑셀로 내보내기</button>
			<button @click="exportPdfClick()">PDF로 내보내기</button>
		</div>

		<!-- 피벗 패널이 생성될 곳 위치 DIV 지정 -->
		<div id="pivot_show_table_merge"></div>

		<!-- AUIPivot 컴포넌트 설정 -->
		<AUIPivot
			ref="myPivot"
			:pivotProps="pivotProps"
			@pivotBegin="pivotBeginHandler"
			@pivotComplete="pivotCompleteHandler"
		/>
	</div>
</template>
