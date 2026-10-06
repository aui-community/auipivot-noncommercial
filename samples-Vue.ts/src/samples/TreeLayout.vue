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
		layoutType: 'tree'
	};

	// 피벗 컴포넌트 ref
	const myPivot = ref<PivotComponent | null>(null);

	// 시작점에서 생성과 정적 JSON 요청을 분리합니다.
    const request = new AbortController();
    function init() {
        createPivotGrid();
        requestData(`${import.meta.env.BASE_URL}data/car_sales.json`);
    }
    function createPivotGrid() { myPivot.value!.create(pivotProps); }
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

	// 피벗 데이터 초기화
	function initPivotData(data: CarSale[]) {
		const pivot = myPivot.value!;

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
		const pivot = myPivot.value!;

		if (pivot.isCreatedPivotPanel()) {
			pivot.showPivotPanel();
		} else {
			const props = {
				// 피벗 패널 사용을 위해 피벗 패널이 생성될 DIV 의 아이디를 지정함.
				pivotPanelId: '#pivot_show_tree',
				// 피벗 패널의 상단 필드 리스트 영역의 크기 비율 50%로 지정
				fieldListAreaRatio: 0.5,
				// 리사이징 가능 여부
				resizableFieldPanel: true,
				// 이동 가능 여부
				movableFieldPanel: true,
				// 패널 width, height 지정 안하면.. 기본적으로 #pivot_panel 의 width, height 을 따름.
				panelWidth: 400,
				panelHeight: 600,
				// 리사징 할 때 피벗 필드 패널 최소 사이즈
				minFieldPanelWidth: 300,
				minFieldPanelHeight: 400
			};
			pivot.createPivotPanel(props);
		}
	}

	// 현재 보고서를 한글 폰트를 포함한 PDF로 저장합니다.
	function exportPdfClick() {
		const pivot = myPivot.value!;
		const exportProps: IPivot.PdfExportOptions = {
			// 배포 경로에 맞춰 폰트를 읽습니다. 다른 폰트는 fontPath로 지정합니다.
			fontPath: `${import.meta.env.BASE_URL}pdfkit/jejugothic.ttf`,
			fileName: 'AUIPivot_tree'
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
		<h2>트리형 피벗 출력 방식</h2>
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
		<div id="pivot_show_tree"></div>

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
