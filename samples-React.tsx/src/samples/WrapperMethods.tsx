// npm 패키지에서 타입과 실행 가능한 이벤트 이름 상수를 가져옵니다.
import type * as IPivot from 'aui-pivot';
import { EventKind } from 'aui-pivot';
import type { CarSale, EventEntry } from '@/sample-types';
import { useCallback, useEffect, useRef, useState } from 'react';
import AUIPivot from '@/static/AUIPivot-React.tsx/AUIPivotReact';
import './WrapperMethods.css';

export default function WrapperMethods() {
	const myPivot = useRef<AUIPivot<CarSale>>(null);
	const layout = useRef<HTMLSelectElement>(null);
	const source = useRef<CarSale[]>([]);
	const savedReport = useRef<IPivot.PivotReportDefinitionV3 | null>(null);
	const slicerId = useRef('');
	const eventSequence = useRef(0);
	const [eventLog, setEventLog] = useState<EventEntry[]>([]);
	const [ready, setReady] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [hasReport, setHasReport] = useState(false);
	const [status, setStatus] = useState('자동차 판매 자료를 불러옵니다.');

	// 조회 메소드로 현재 설정과 실제 파생 값을 확인합니다.
	const describe = useCallback(function () {
		const pivot = myPivot.current!;
		if (!pivot?.isCreated() || !source.current) return;
		const firstAmount = pivot.getDerivedFieldValue(source.current[0], 'ROW_AMOUNT');
		setStatus(`원본 ${source.current.length.toLocaleString()}건, 파생 필드 ${(pivot.getDerivedFields()?.length ?? 0)}개, 사용자 집계 ${(pivot.getCustomAggregators()?.length ?? 0)}개, 순서 규칙 ${(pivot.getCustomValueOrders()?.length ?? 0)}개, 시각화 ${(pivot.getVisualAnalytics()?.length ?? 0)}개, 첫 거래 금액 ${(typeof firstAmount === 'number' ? firstAmount.toLocaleString() : '없음')}원`);
	}, []);

	// 이벤트 객체 전체 대신 사용자가 확인할 문자열만 남깁니다. 위치는 화면처럼 1부터 표시합니다.
	const showEvent = useCallback(function (event: IPivot.PivotEvent) {
		let message;
		switch (event.type) {
			case EventKind.PivotBegin:
				message = '보고서 계산을 시작했습니다.';
				break;
			case EventKind.PivotComplete:
				message = `보고서 계산 완료. 행 필드 ${event.rowFields.length}개, 열 필드 ${event.columnFields.length}개, 값 필드 ${event.valueFields.length}개`;
				describe();
				break;
			case EventKind.CellClick:
			case EventKind.CellDoubleClick:
				message = `${event.rowIndex + 1}행, ${event.columnIndex + 1}열, ${event.headerText}: ${event.value ?? '빈 값'}`;
				break;
			case EventKind.HeaderClick:
				message = `${event.columnIndex + 1}열 제목: ${event.headerText}`;
				break;
			case EventKind.FooterClick:
			case EventKind.FooterDoubleClick:
				message = `총합계 ${event.footerIndex + 1}열, 표시: ${event.footerText}, 값: ${event.footerValue ?? '빈 값'}`;
				break;
			case EventKind.Sorting:
				message = event.sortingFields.length ? event.sortingFields.map(field => `${field.dataField}: ${field.sortType === 1 ? '오름차순' : '내림차순'}`).join(', ') : '정렬을 해제했습니다.';
				break;
			case EventKind.TreeOpenChange:
				message = `${event.rowIndex + 1}행, ${event.depth}단계, ${event.isOpen ? '펼침' : '접힘'}`;
				break;
			case EventKind.ColumnStateChange:
				message = `${event.headerText}, ${event.property === 'width' ? '너비(px)' : '열 인덱스'}: 이전 ${event.old}, 현재 ${event.current}`;
				break;
			case EventKind.PivotPanelShow:
				message = '피벗 패널을 열었습니다.';
				break;
			case EventKind.PivotPanelHide:
				message = '피벗 패널을 닫았습니다.';
				break;
			default:
				return;
		}
		const entry = { id: ++eventSequence.current, type: event.type, time: new Date().toLocaleTimeString('ko-KR', { hour12: false }), message };
		// 연속 이벤트도 빠뜨리지 않고 최신순으로 표시하되 오래된 기록은 버립니다.
		setEventLog(previous => [entry, ...previous].slice(0, 30));
		// false를 반환하지 않으므로 피벗 계산과 헤더의 기본 정렬은 그대로 실행됩니다.
	}, [describe]);

	// 피벗 생성과 기능 설정은 모두 React 컴포넌트 ref로 호출합니다.
	const createPivotGrid = useCallback(function () {
		const pivot = myPivot.current!;
		const pivotProps: IPivot.Props = { /* 너비를 생략하면 기존처럼 부모 영역을 채웁니다. */ height: 400, layoutType: layout.current!.value as IPivot.LayoutType };
		pivot.create(pivotProps);
		// 재생성할 때 새 피벗에 한 번만 연결합니다. destroy가 이전 이벤트를 정리합니다.
		pivot.bind([EventKind.PivotBegin, EventKind.PivotComplete, EventKind.CellClick, EventKind.CellDoubleClick, EventKind.HeaderClick,
			EventKind.FooterClick, EventKind.FooterDoubleClick, EventKind.Sorting, EventKind.TreeOpenChange, EventKind.ColumnStateChange,
			EventKind.PivotPanelShow, EventKind.PivotPanelHide], showEvent);
		pivot.setFieldAlias({ REGION: '판매 지점', NAME: '차종', COUNT: '판매 대수' });
		pivot.setRowFields(['REGION', 'NAME']);
		// 가격과 판매 대수를 곱한 거래 금액을 원본 변경 없이 계산합니다.
		pivot.setDerivedFields([{
			dataField: 'ROW_AMOUNT', labelText: '거래 금액',
			expression: { operator: 'multiply', operands: ['PRICE', 'COUNT'] }
		}]);
		// 합계는 기본 SUM으로도 구할 수 있습니다. 여기서는 사용자 집계 등록 방법을 보여줍니다.
		const sumOperation = pivot.registerCustomAggregator({
			id: 'WRAPPER_SUM', version: 1, labelText: '판매 대수 합계',
			create() { return { sum: 0 }; },
			accumulate(state, value) {
                // 입력 값은 unknown이므로 숫자일 때 합계에 더합니다.
                if (typeof value === 'number') state.sum += value;
            },
			merge(target, state) { target.sum += state.sum; },
			finalize(state) { return state.sum; }
		});
		pivot.setValueFields([
			{ dataField: 'ROW_AMOUNT', operation: 'SUM', formatString: '#,##0' },
			{ dataField: 'COUNT', operation: sumOperation, formatString: '#,##0' }
		]);
		// 서울, 광주 순서로 먼저 표시하고 판매 대수가 많을수록 진한 녹색으로 표시합니다.
		pivot.setCustomValueOrders([{ dataField: 'REGION', values: ['서울 지점', '광주 지점'] }]);
		pivot.setVisualAnalytics([{
			dataField: 'COUNT', operation: sumOperation,
			// 일반 셀은 전체 비교, 요약 칼럼과 요약 행도 각각의 합계 범위로 표시합니다.
			summaryColumns: true, summaryRows: true,
			heatmap: { scope: 'GLOBAL', colors: ['#FFFFFF', '#2F9D27'] }
		}]);
	}, [showEvent]);

	// 정적 원본을 입력한 뒤 지점 선택용 슬라이서를 만듭니다.
	const applyData = useCallback(function (data: CarSale[]) {
		const pivot = myPivot.current!;
		pivot.setGridData(data);
		slicerId.current = pivot.createSlicer('#react_wrapper_slicer', {
			dataField: 'REGION', columnCount: 4, movable: false, resizable: false
		}) ?? '';
		setReady(true);
		describe();
	}, [describe]);

	useEffect(() => {
		const request = new AbortController();
		// 시작점에서 표를 만들고 Playground와 같은 고정 자동차 JSON을 읽습니다.
		// 기존 1~3번 자료를 유지하기 위해 새 예제의 사본은 data/wrapper에 둡니다.
		function init() {
			createPivotGrid();
			requestData(`${import.meta.env.BASE_URL}data/wrapper/car_sales.json`);
		}
		function requestData(url: string) {
			fetch(url, { signal: request.signal }).then(function (response) {
				if (!response.ok) throw new Error('자동차 자료를 불러오지 못했습니다.');
				return response.json();
			}).then(function (data: CarSale[]) {
				if (request.signal.aborted) return;
				source.current = data;
				setLoaded(true);
				applyData(data);
			}).catch(function (error) {
				if (!request.signal.aborted) setStatus(error.message);
			});
		}
		init();
		// 다른 메뉴로 이동하면 늦게 도착한 응답을 사용하지 않습니다. 피벗은 컴포넌트가 제거합니다.
		return () => request.abort();
	}, [createPivotGrid, applyData]);

	// 처음에는 피벗이 관리하는 패널을 만들고, 닫은 뒤에는 같은 패널을 다시 표시합니다.
	function openPivotPanel() {
		const pivot = myPivot.current!;
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
		myPivot.current!.setProp('layoutType', layout.current!.value as IPivot.LayoutType);
		myPivot.current!.refresh();
		describe();
	}
	function saveReport() {
		// 보고서 설정만 메모리에 보관합니다. 페이지를 새로 열면 저장 내용은 사라집니다.
		savedReport.current = JSON.parse(JSON.stringify(myPivot.current!.getReportDefinition()));
		setHasReport(true);
		setStatus('현재 보고서 설정을 저장했습니다. 행 배치와 필터를 바꾼 뒤 복원해 보세요.');
	}
	function restoreReport() {
		if (!savedReport.current) return;
		myPivot.current!.setReportDefinition(savedReport.current);
		layout.current!.value = myPivot.current!.getProp('layoutType') ?? 'tree';
	}
	function selectSeoul() {
		myPivot.current!.setSlicerSelection(slicerId.current, ['서울 지점']);
	}
	function clearFilter() {
		myPivot.current!.setSlicerSelection(slicerId.current, null);
	}
	function destroyPivot() {
		const pivot = myPivot.current!;
		if (!pivot?.isCreated()) return;
		pivot.destroySlicer(slicerId.current);
		pivot.destroy();
		slicerId.current = '';
		setReady(false);
		setStatus('표와 슬라이서를 제거했습니다. 다시 생성 버튼으로 같은 자료를 표시할 수 있습니다.');
	}
	function recreatePivot() {
		// 살아 있는 표가 있으면 먼저 제거하여 슬라이서와 이벤트를 중복 등록하지 않습니다.
		destroyPivot();
		createPivotGrid();
		applyData(source.current);
	}

	return (
		<div className="desc wrapper-methods">
			<h2>메소드 및 이벤트 활용</h2>
			<p>자동차 판매 자료로 거래 금액과 판매 대수를 표시합니다. 행 배치와 필터를 바꾸고 저장한 보고서를 복원해 보세요.</p>
			<p><code>setDerivedFields</code>, <code>registerCustomAggregator</code>, <code>setCustomValueOrders</code>, <code>setVisualAnalytics</code>를 컴포넌트 ref로 호출합니다.</p>
			<p>판매 대수는 전체 일반 셀(GLOBAL)을 비교하며, 요약 칼럼과 요약 행에도 색상을 표시합니다.</p>
			<div className="wrapper-controls">
				<label>행 배치 <select ref={layout} defaultValue="tree" disabled={!ready} onChange={changeLayout}>
					<option value="tree">트리</option><option value="table">테이블</option><option value="tableCellMerge">셀병합</option>
				</select></label>
				<button disabled={!ready} onClick={openPivotPanel}>피벗 패널 열기</button>
				<button disabled={!ready} onClick={saveReport}>보고서 저장</button>
				<button disabled={!ready || !hasReport} onClick={restoreReport}>보고서 복원</button>
				<button disabled={!ready} onClick={selectSeoul}>서울 지점만 보기</button>
				<button disabled={!ready} onClick={clearFilter}>필터 해제</button>
				<button disabled={!loaded} onClick={recreatePivot}>다시 생성</button>
				<button disabled={!ready} onClick={destroyPivot}>제거</button>
			</div>
			<p className="wrapper-status" role="status">{status}</p>
			<div className="wrapper-workspace">
				<div className="wrapper-pivot">
					{/* init에서 직접 생성하도록 자동 생성을 끕니다. 제거와 재생성도 같은 ref로 호출합니다. */}
					<AUIPivot ref={myPivot} name="wrapper-methods" createOnMounted={false} />
				</div>
				<section className="wrapper-events" aria-label="이벤트 기록">
					<div className="wrapper-event-heading"><h3>이벤트 기록</h3><button disabled={!eventLog.length} onClick={() => setEventLog([])}>기록 지우기</button></div>
					<p>셀, 총합계, 제목을 클릭하거나 행을 접고 열 너비를 바꿔 보세요. 최근 30건을 최신순으로 표시합니다.</p>
					<div className="wrapper-event-scroll" tabIndex={0} aria-label="최근 이벤트 목록">
						{!eventLog.length && <p>표를 조작하면 이벤트가 표시됩니다.</p>}
						<ol className="wrapper-event-list">
							{eventLog.map(entry => <li key={entry.id} data-event-type={entry.type}>
								<div><code>{entry.type}</code> <time>{entry.time}</time></div><p>{entry.message}</p>
							</li>)}
						</ol>
					</div>
				</section>
			</div>
			<div id="react_wrapper_slicer" className="wrapper-slicer"></div>
		</div>
	);
}
