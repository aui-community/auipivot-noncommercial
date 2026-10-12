<script setup lang="ts">
import type * as IPivot from 'aui-pivot';
import type { CarSale } from '@/sample-types';
// 컴포넌트 ref에서 공개 메소드와 반환값의 타입을 확인합니다.
type PivotComponent = InstanceType<typeof AUIPivot>;

	import { ref, onMounted, onBeforeUnmount } from 'vue';
	// AUIPivot 컴포넌트
	import AUIPivot from '@/static/AUIPivot-Vue/AUIPivotT.vue';
	// 엑셀과 PDF 다운로드를 브라우저에서 처리하기 위한 file-saver
	import 'file-saver';

	// 피벗 속성 정의
	const pivotProps: IPivot.Props = {
		/* 너비를 생략하면 기존처럼 부모 영역을 채웁니다. */
		height: 560,
		layoutType: 'tableCellMerge'
	};

	// 피벗 컴포넌트 ref
	const myPivot = ref<PivotComponent | null>(null);

	// 시작점에서 생성과 정적 JSON 요청을 분리합니다.
    const request = new AbortController();
    // 피벗을 먼저 준비한 뒤 원본 자료를 요청해 이 예제의 초기 보고서를 표시합니다.
    function init() {
        createPivotGrid();
        requestData(`${import.meta.env.BASE_URL}data/car_sales.json`);
    }
    // 컴포넌트 참조로 피벗을 생성하고 이 화면에서 사용할 초기 설정을 준비합니다.
    function createPivotGrid() { myPivot.value!.create(pivotProps); }
    // 원본 JSON을 요청해 보고서에 입력합니다. 화면이 해제된 뒤 도착한 응답은 적용하지 않습니다.
    function requestData(url: string) {
		const pivot = myPivot.value!;
		pivot.showAjaxLoader();

		// 원시 데이터 요청
		fetch(url, { signal: request.signal })
			.then((response) => {
				if (!response.ok) throw new Error('HTTP error ' + response.status);
				return response.json();
			})
			.then((data: CarSale[]) => {
                if (request.signal.aborted) return;
				// 요청 완료 후 피벗 초기화
				initPivotData(data);
				pivot.removeAjaxLoader();
			})
			.catch((error) => {
				if (!request.signal.aborted) alert('데이터 요청 실패: ' + error.message);
			});
	}

	// 행과 열의 분류와 값 집계를 설정한 뒤 원본을 입력해 보고서를 만듭니다.
	function initPivotData(data: CarSale[]) {
		const pivot = myPivot.value!;

		// 세로로 묶어 표시할 행 필드를 상위 항목부터 순서대로 지정합니다.
		pivot.setRowFields(['REGION', 'NAME', 'MODEL']);

		// 가로로 나눌 열 필드를 바깥 분류부터 순서대로 지정합니다.
		pivot.setColumnFields(['DATE_QTR', 'DATE_MONTH']);

		// 집계할 원본 필드, 연산과 숫자 표시 형식을 지정합니다.
		pivot.setValueFields([
			{ dataField: 'TOTAL', operation: 'SUM', formatString: '#,##0' },
			{ dataField: 'COUNT', operation: 'SUM', formatString: '#,##0' }
		]);

		// 행과 열 배치를 바꾸지 않고 조회 범위를 좁힐 필터 필드를 지정합니다.
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
		const pivot = myPivot.value!;

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
			// 행, 열, 값과 필터를 사용자가 편집할 필드 패널을 생성합니다.
			pivot.createPivotPanel(props);
		}
	}

	// 현재 보고서를 한글 폰트를 포함한 PDF로 저장합니다.
	function exportPdfClick() {
		const pivot = myPivot.value!;
		const exportProps: IPivot.PdfExportOptions = {
			// 배포 경로에 맞춰 폰트를 읽습니다. 다른 폰트는 fontPath로 지정합니다.
			fontPath: `${import.meta.env.BASE_URL}pdfkit/jejugothic.ttf`,
			fileName: 'AUIPivot_tableCellMerge'
		};
		pivot.exportToPdf(exportProps);
	}

	// 엑셀로 내보내기
	function exportClick() {
		const pivot = myPivot.value!;
		const exportProps = {
			progressBar: true
		};
		pivot.exportToXlsx(exportProps);
	}

	// 피벗 시작 이벤트 핸들러
	function pivotBeginHandler(event: IPivot.PivotBeginEvent) {
		console.log(event.type);
		console.time('피봇 보고서 시간');
	}

	// 피벗 완료 이벤트 핸들러
	function pivotCompleteHandler(event: IPivot.PivotCompleteEvent) {
		console.log(event.type);
		console.timeEnd('피봇 보고서 시간');
	}

	// 컴포넌트 마운트 시 초기 데이터 요청
	onMounted(init);
    // 메뉴 이동 시 아직 완료되지 않은 요청을 취소합니다.
    onBeforeUnmount(() => request.abort());
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
            :createOnMounted="false"
			:pivotProps="pivotProps"
			@pivotBegin="pivotBeginHandler"
			@pivotComplete="pivotCompleteHandler"
		/>
	</div>
</template>
