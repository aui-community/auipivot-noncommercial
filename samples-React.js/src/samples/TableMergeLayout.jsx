import { useEffect, useRef } from 'react';
// AUIPivot 컴포넌트
import AUIPivot from '@/static/AUIPivot-React/AUIPivotReact';
// 엑셀과 PDF 다운로드를 브라우저에서 처리하기 위한 file-saver
import 'file-saver';

const TableMergeLayout = () => {
	// 그리드 객체
	const myPivot = useRef();

	// 피벗 속성 정의
	const pivotProps = {
		width: '100%',
		height: 560,
		layoutType: 'tableCellMerge' // 테이블 병합 형식으로 출력
	};

	useEffect(() => {
		console.log('TreeLayout 마운트됨');
		// 초기 이벤트 바인딩
		setupGridEvents();
		const pivot = myPivot.current;

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

		return () => {
			console.log('TreeLayout 언마운트됨');
		};
	}, []);

	// 피벗 그리드 이벤트 세팅
	const setupGridEvents = () => {
		const pivot = myPivot.current;
		// 피벗 그리드 이벤트 바인딩
		pivot.bind(['pivotBegin', 'pivotComplete'], (event) => {
			console.log(event.type);
			switch (event.type) {
				case 'pivotBegin':
					console.time('피봇 보고서 시간');
					break;
				case 'pivotComplete':
				default:
					console.timeEnd('피봇 보고서 시간');
			}
		});
	};

	//피벗 그리드 해당 데이터로 초기화 및 피벗팅 시작
	const initPivotData = (data) => {
		const pivot = myPivot.current;

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

		// 피봇그리드에 데이터 삽입
		pivot.setGridData(data);
	};

	const openPivotPanel = () => {
		const pivot = myPivot.current;

		// 이미 피벗 필드 패널이 생성된 경우 보이기로 전환.
		if (pivot.isCreatedPivotPanel()) {
			pivot.showPivotPanel();
		} else {
			const props = {
				// 피벗 패널 사용을 위해 피벗 패널이 생성될 DIV 의 아이디를 지정함.
				pivotPanelId: '#pivot_show_table_merge',
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

	const exportClick = () => {
		const pivot = myPivot.current;
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
		const pivot = myPivot.current;
		const exportProps = {
			// 배포 경로에 맞춰 폰트를 읽습니다. 다른 폰트는 fontPath로 지정합니다.
			fontPath: `${import.meta.env.BASE_URL}pdfkit/jejugothic.ttf`,
			fileName: 'AUIPivot_tableCellMerge'
		};
		pivot.exportToPdf(exportProps);
	};

	return (
		<div className="desc">
			<h2>테이블 셀병합형 피벗 출력 방식</h2>
			<div>
				<button onClick={openPivotPanel}>피벗 패널 열기(생성하기)</button>
				<button onClick={exportClick}>엑셀로 내보내기</button>
				<button onClick={exportPdfClick}>PDF로 내보내기</button>
			</div>

			{/* 피벗 패널이 생성될 곳 위치 DIV 지정 */}
			<div id="pivot_show_table_merge"></div>

			{/* AUIPivot 컴포넌트 설정 */}
			<AUIPivot
				ref={myPivot}
				pivotProps={pivotProps}
			/>
		</div>
	);
};

export default TableMergeLayout;
