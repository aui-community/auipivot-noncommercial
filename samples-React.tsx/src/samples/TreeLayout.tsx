// npm 패키지에서 타입과 실행 가능한 이벤트 이름 상수를 가져옵니다.
import type * as IPivot from 'aui-pivot';
import { EventKind } from 'aui-pivot';
import type { CarSale } from '@/sample-types';
import { useEffect, useRef } from 'react';
// AUIPivot 컴포넌트
import AUIPivot from '@/static/AUIPivot-React.tsx/AUIPivotReact';
// 엑셀과 PDF 다운로드를 브라우저에서 처리하기 위한 file-saver
import 'file-saver';

// 행 필드를 트리 계층으로 표시하고 필드 패널과 엑셀 내보내기를 제공하는 예제입니다.
const TreeLayout = () => {
	// 컴포넌트의 피벗 인스턴스에 접근할 참조를 보관합니다.
	const myPivot = useRef<AUIPivot<CarSale>>(null);

	// 피벗 속성 정의
	const pivotProps: IPivot.Props = {
		/* 너비를 생략하면 기존처럼 부모 영역을 채웁니다. */
		height: 560
	};

	useEffect(() => {
        const request = new AbortController();
        // 시작점에서 표를 생성한 뒤 기존 정적 자동차 자료를 요청합니다.
        function init() {
            createPivotGrid();
            requestData(`${import.meta.env.BASE_URL}data/car_sales.json`);
        }
        // 컴포넌트 참조로 피벗을 생성하고 이 화면에서 사용할 초기 설정을 준비합니다.
        function createPivotGrid() {
            myPivot.current!.create(pivotProps);
            setupGridEvents();
        }
        // 원본 JSON을 요청해 보고서에 입력합니다. 화면이 해제된 뒤 도착한 응답은 적용하지 않습니다.
        function requestData(url: string) {
            fetch(url, { signal: request.signal }).then(response => {
                if (!response.ok) throw new Error('HTTP error ' + response.status);
                return response.json();
            }).then((data: CarSale[]) => {
                if (request.signal.aborted) return;
                initPivotData(data);
                myPivot.current!.removeAjaxLoader();
            }).catch(error => {
                if (!request.signal.aborted) alert('데이터 요청 실패: ' + error.message);
            });
        }
        init();
        // 메뉴 이동 시 늦게 도착한 응답이 다른 표에 반영되지 않게 합니다.
        return () => request.abort();
    }, []);

	// 집계 시작과 완료 이벤트를 연결해 처리 상태와 소요 시간을 확인합니다.
	const setupGridEvents = () => {
		const pivot = myPivot.current!;
		// 피벗 그리드 이벤트 바인딩
		pivot.bind([EventKind.PivotBegin, EventKind.PivotComplete], (event) => {
			console.log(event.type);
			switch (event.type) {
				case EventKind.PivotBegin:
					console.time('피봇 보고서 시간');
					break;
				case EventKind.PivotComplete:
				default:
					console.timeEnd('피봇 보고서 시간');
			}
		});
	};

	// 행과 열의 분류와 값 집계를 설정한 뒤 원본을 입력해 보고서를 만듭니다.
	const initPivotData = (data: CarSale[]) => {
		const pivot = myPivot.current!;

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

		// 데이터 중 날짜 필드를 명시하여 연, 반기, 분기 등으로 나눠 표시하도록 지시
		pivot.setDateTypeField('DATE');

		// 주어진 JSON 데이터의 필드명을 구분하기 쉽게 alias 를 지정합니다.
		// 만약 완전히 다른 데이터로 다시 설정된다면 alias 들도 다시 설정하십시오.
		// [{"REGION":"서울 지점","NAME":"아반테","MODEL":"1.6 GDi","COLOR":"Blue","PRICE":1384000,"COUNT":1,"DATE":"2015/01/01","TOTAL":1384000},{
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

		// 준비한 필드 설정에 원본 데이터를 입력해 피벗 집계를 시작합니다.
		pivot.setGridData(data);
	};

	// 이미 만든 필드 패널은 다시 표시하고, 아직 없으면 이 예제의 위치와 옵션으로 생성합니다.
	const openPivotPanel = () => {
		const pivot = myPivot.current!;

		// 이미 피벗 필드 패널이 생성된 경우 보이기로 전환.
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

			// 실제 피벗 필드 패널 생성
			pivot.createPivotPanel(props);
		}
	};

	// 현재 피벗 결과를 엑셀 파일로 내보내고 다운로드 진행 상태를 표시합니다.
	const exportClick = () => {
		const pivot = myPivot.current!;
		// 내보내기 속성
		const exportProps = {
			// 진행바 표시
			progressBar: true
		};

		// 내보내기 실행
		pivot.exportToXlsx(exportProps);
	};

	// 현재 보고서를 한글 폰트를 포함한 PDF로 저장합니다.
	const exportPdfClick = () => {
		const pivot = myPivot.current!;
		const exportProps: IPivot.PdfExportOptions = {
			// 배포 경로에 맞춰 폰트를 읽습니다. 다른 폰트는 fontPath로 지정합니다.
			fontPath: `${import.meta.env.BASE_URL}pdfkit/jejugothic.ttf`,
			fileName: 'AUIPivot_tree'
		};
		pivot.exportToPdf(exportProps);
	};

	return (
		<div className="desc">
			<h2>트리형 피벗 출력 방식</h2>
			<div>
				<button onClick={openPivotPanel}>피벗 패널 열기(생성하기)</button>
				<button onClick={exportClick}>엑셀로 내보내기</button>
				<button onClick={exportPdfClick}>PDF로 내보내기</button>
			</div>

			{/* 피벗 패널이 생성될 곳 위치 DIV 지정 */}
			<div id="pivot_show_tree"></div>

			{/* AUIPivot 컴포넌트 설정 */}
			<AUIPivot
				ref={myPivot}
                createOnMounted={false}
				pivotProps={pivotProps}
			/>
		</div>
	);
};

export default TreeLayout;
