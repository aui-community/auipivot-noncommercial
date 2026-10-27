/*!
 * AUIPivot Non-Commercial v2.8.3 - Messages (Korean)
 * Copyright (c) AUISoft Co., Ltd. All rights reserved.
 *
 * AUIPivot 화면 메시지 파일입니다. AUIPivot 사용권 범위 안에서 번역하거나 수정하여 사용할 수 있습니다.
 * This is an AUIPivot UI message file. You may translate or modify it within the scope of your AUIPivot license.
 * License: https://github.com/aui-community/auipivot-noncommercial/blob/main/LICENSE
 */
/* eslint-disable */
/**
 * AUIPivot v2.8.3 Messages
 * AUIPivot 에서 사용되는 메세지들을 정의합니다.
 */
(function () {
	const AUIPivotMessages = {
		// 표 안에서 필드를 배치하는 조작과 상태를 안내합니다.
		gridFieldDrop: {"label": "피벗 필드 배치", "hint": "끌어서 이동하세요. 클릭 또는 Enter로 이동 메뉴를 엽니다.", "empty": "필드를 여기에 놓으세요", "previous": "앞으로 이동", "next": "뒤로 이동", "moveTo": "{0} 영역으로 이동", "moved": "필드 배치를 변경했습니다."},
		// 슬라이서의 조작 및 상태 메시지를 언어별로 제공합니다.
		slicer: {
        // 필드 선택 창과 자동 슬라이서의 닫기 문구입니다.
        insert: "슬라이서 삽입",
        confirm: "확인",
        cancel: "취소",
        close: "닫기",
        chooseFields: "슬라이서로 사용할 필드를 선택하세요.",
        noFields: "선택할 필드가 없습니다. 데이터를 먼저 불러오세요.",
        inserted: "삽입됨",

        // 배치와 무관하게 원본 필드의 존재 여부를 안내합니다.
        fieldUnavailable: '원본 데이터에 해당 필드가 없습니다.',
        "move": "슬라이서 이동 (드래그 또는 방향키)", "resize": "슬라이서 크기 조절 (드래그 또는 방향키)", "multi": "복수 선택", "clear": "필터 해제", "search": "검색", "empty": "항목 없음", "disconnected": "행, 열, 필터에 이 필드를 등록하세요", "noData": "데이터 없음", "minimum": "최소 한 항목을 선택하세요", "selected": "선택"},
		rowNumHeaderText: 'No.',
		rowLabelText: '행 레이블',
		columnLabelText: '열 레이블',
		columnTotalSumText: '총 합계',
		footerTotalSumText: '총 합계',
		emptyText: '( 비어 있음 )',
		emptyValue: '( 값 없음 )',
		noDataMessage: '보고서를 작성하려면 필드 목록에서 필드를 선택하십시오.',
		summaryText: ' 요약',
		totalSummaryText: '전체 ',
		columnText: '열',
		rowText: '행',
		valueText: '값',

		/*
		 * 연산자 이름
		 */
		opLabelTexts: {
			SUM: '합계',
			MIN: '최소값',
			MAX: '최대값',
			AVG: '평균',
			// 새 집계 연산의 표시 이름입니다.
			MEDIAN: '중앙값',
			// 현재 필터를 통과한 전체 총계를 분모로 사용하는 독립 연산입니다.
			GRAND_TOTAL_RATIO: '전체 합계 비율',
			GRAND_TOTAL_COUNT_RATIO: '전체 개수 비율',
			COUNT: '개수',
			// 고유한 값의 개수이며 소계, 총계에서도 중복을 제거합니다.
			DISTINCT_COUNT: '중복 없는 개수',
			// 두 원본 합계를 나누는 신규 연산의 표시 이름입니다.
			RATIO_OF_SUMS: '두 합계의 비율',
			MULTIPLY: '곱',
			VARIANCE: '분산',
			STD_DEVIATION: '표준 편차',
			// 모집단과 구별되는 표본 통계 이름입니다.
			SAMPLE_VARIANCE: '표본 분산',
			SAMPLE_STD_DEVIATION: '표본 표준편차',
			RATIO: '비율',
			ROW_RATIO: '행 합계 비율'
		},

		/*
		 * 데이터 중 날짜 필드를 명시하여 연, 반기, 분기 등으로 나눠 표시할 때 명칭
		 */
		dateSeperateNames: {
			year: '$0년',
			half: ['상반기', '하반기'],
			quarter: '$0사분기',
			month: '$0월'
		},

		/*
		 * 피벗 패널
		 */
		pivotPanel: {
            // 필드 글자를 직접 끄는 방법과 빈 공간의 스크롤을 안내합니다.
            dragFieldText: "필드 글자를 끌어 놓으세요. 목록의 빈 공간을 쓸면 스크롤합니다.",
            dragGroupText: "그룹 제목을 끌면 하위 필드를 순서대로 배치합니다. 누르면 접거나 펼칩니다.",
			// 슬라이서와 같은 이동, 크기 조절 안내를 언어별로 제공합니다.
			moveText: "패널 이동 (드래그 또는 방향키)",
			resizeText: "패널 크기 조절 (드래그 또는 방향키)",
			title: 'AUIPivot 필드',
			fieldListTitle: '보고서에 추가할 필드 선택 : ',
			fieldMessage: '아래의 영역 사이에 필드를 끌어 놓으십시오.',
			filterText: '필터',
			columnText: '열',
			rowText: '행',
			valueText: '값',
			valueSummaryText: 'Σ 값',
			updateLater: '나중에 피벗 업데이트',
			updateBtn: '업데이트',
			okText: '확인',
			cancelText: '취소',
			closeText: '닫기'
		},

		/*
		 * 피벗 패널에서 영역 아이템 클릭 시 나오는 드랍 다운 메뉴
		 */
		fieldDropDownTexts: {
			toUp: '위로 이동',
			toDown: '아래로 이동',
			toFirst: '처음으로 이동',
			toLast: '끝으로 이동',
			toFilter: '보고서 필터로 이동',
			toRow: '행 레이블로  이동',
			toColumn: '열 레이블로 이동',
			toValue: '값으로 이동',
			remove: '필드 제거',
			setting: '값 필드 설정'
		},

		/*
		 * 값 필드 설정 모달 창(Modal Window)
		 */
		valueModalWindow: {
			// 두 필드가 모두 선택되어야 새 비율 연산을 적용합니다.
			numeratorField: '분자 필드',
			denominatorField: '분모 필드',
			selectField: '필드 선택',
			ratioFieldsRequired: '분자와 분모 필드를 모두 선택하세요.',
			title: '값 필드 설정 하기',
			fieldName: '필드 이름',
			customLabel: '사용자 지정 이름',
			operationType: '계산 유형',
			formatType: '표시 형식',
			okText: '확인',
			cancelText: '취소',
			closeText: '닫기'
		},

		/*
		 * 필터 창
		 */
		filterWindow: {
			fieldSelectText: '필드 선택 :',
			clearAllText: '필터 전체 초기화',
			clearText: '$0 필드 필터 초기화',
			checkAllText: '(전체선택)',
			searchCheckAllText: '(검색 전체선택)',
			noValueText: '(필드 값 없음)',
			itemMoreMessage: '하단에 더 많은 값이 있습니다. 검색으로 구체화 하십시오.',
			placeholder: '검색',
			okText: '확 인',
			cancelText: '취 소'
		},

		/*
		 * 값 설정 창에 출력할 포맷 스트링 리스트
		 */
		formatStringList: [
			{
				formatString: '#,##0',
				labelText: '정수(#,##0)'
			},
			{
				formatString: '#,##0.0',
				labelText: '소수점 1자리(#,##0.0)'
			},
			{
				formatString: '#,##0.00',
				labelText: '소수점 2자리(#,##0.00)'
			},
			{
				formatString: '#,##0.000',
				labelText: '소수점 3자리(#,##0.000)'
			},
			{
				formatString: '###0.#####',
				labelText: '표시 유형 지정 안함'
			}
		],

		/*
		 * 내보내기 진행 표시
		 */
		// 항목 이동 손잡이와 키보드 이동 메뉴의 안내 문구입니다.
		itemReorder: {
		    "handle": "항목 이동",
		    "title": "항목 순서",
		    "scope": "같은 필드의 모든 그룹에 적용됩니다.",
		    "before": "위로 이동",
		    "after": "아래로 이동",
		    "left": "왼쪽으로 이동",
		    "right": "오른쪽으로 이동",
		    "first": "처음으로 이동",
		    "last": "끝으로 이동",
		    "sorted": "행 항목을 이동하려면 현재 정렬을 해제하세요.",
		    "clear": "정렬 해제",
		    "close": "닫기",
		    "moved": "항목 순서를 변경했습니다."
		},
		// 계산 편집창의 입력, 검증과 대기 상태 안내입니다.
		calculatedFieldEditor: {
		    "close": "닫기",
		    "formula": "집계 후 수식",
		    "expression": "수식",
		    "insertField": "필드 삽입",
		    "showValue": "값 영역에 표시",
		    "formulaHint": "수식은 각 피벗 영역에서 필드 값을 합산한 후 계산합니다. 부분합과 총합계도 동일한 방식으로 계산합니다.",
		    "formulaPreview": "전체 총합계 미리보기 (현재 필터 적용)",
		    "raw": "계산 원시값",
		    "formatted": "서식 적용값",
		    "calculating": "계산 중...",
		    "divisionZero": "0으로 나눌 수 없습니다.",
		    "nonFinite": "계산 결과가 유한한 숫자가 아닙니다.",
		    "open": "계산 필드",
		    "title": "계산 필드 편집",
		    "selection": "계산 필드 선택",
		    "newField": "새 계산 필드",
		    "name": "이름",
		    "mode": "계산 방식",
		    "row": "원본 행 계산",
		    "ratio": "합계 간 비율",
		    "left": "왼쪽 값 / 분자",
		    "right": "오른쪽 값 / 분모",
		    "field": "필드",
		    "constant": "숫자",
		    "operator": "연산자",
		    "aggregation": "집계 방식",
		    "keep": "기존 값 설정 유지",
		    "format": "숫자 표시 형식",
		    "example": "미리보기 (필터 적용 전 원본 앞 5건)",
		    "preview": "미리보기",
		    "apply": "적용",
		    "remove": "삭제",
		    "cancel": "취소",
		    "pending": "업데이트 대기",
		    "rowHint": "각 원본 행을 계산한 뒤 결과를 집계합니다. 괄호와 여러 연산자를 입력하는 문자열 수식은 지원하지 않습니다.",
		    "ratioHint": "분자 합계를 분모 합계로 나눕니다. 부분 합계와 전체 합계도 두 합계로 다시 계산합니다.",
		    "sharedHint": "이 계산을 사용하는 모든 항목에 적용됩니다. 기존 값 설정이 여러 개면 그대로 유지합니다.",
		    "laterHint": "필드 패널의 업데이트 버튼을 누르면 반영됩니다.",
		    "empty": "빈 값",
		    "noData": "원본 데이터를 불러온 뒤 편집하세요.",
		    "badName": "이름은 1~80자로 입력하고 < 또는 >를 사용하지 마세요.",
		    "badFormat": "표시 형식은 120자 이내로 입력하세요.",
		    "badField": "존재하는 필드를 선택하세요.",
		    "badNumber": "유한한 숫자를 입력하세요.",
		    "badOperation": "지원하는 연산을 선택하세요.",
		    "dependencies": "다음 항목에서 사용 중입니다: ",
		    "changed": "보고서가 변경되었습니다. 편집창을 다시 여세요.",
		    "canceled": "애플리케이션에서 업데이트를 취소했습니다.",
		    "saved": "계산 필드를 적용했습니다."
		},
		// 행 필드 부분합 메뉴와 적용 조건을 안내합니다.
		fieldSubtotal: {
		    "close": "닫기",
		    "open": "부분합 설정",
		    "title": "행 필드 부분합",
		    "show": "부분합 표시",
		    "apply": "적용",
		    "cancel": "취소",
		    "tree": "테이블 또는 셀병합 방식에서 필드별 부분합을 설정할 수 있습니다.",
		    "leaf": "마지막 행 필드는 별도의 부분합 행이 없습니다.",
		    "missing": "현재 행 영역에 없는 필드입니다.",
		    "icons": "이 설정을 변경하면 접기, 펼치기 아이콘이 꺼집니다. 부분합을 다시 표시해도 아이콘은 자동으로 켜지지 않습니다.",
		    "later": "필드 패널의 업데이트 버튼을 누르면 반영됩니다.",
		    "changed": "보고서가 변경되었습니다. 설정 창을 다시 여세요.",
		    "canceled": "애플리케이션에서 업데이트를 취소했습니다.",
		    "global": "행 부분합이 전체 숨김 상태입니다(showSummaryRow: false)."
		},
		exportProgress: {
			init: '내보내기 초기화 중...',
			progress: '내보내기 진행 중...',
			complete: '내보내기가 곧 완료됩니다.'
		}
	};
	if (typeof window !== 'undefined') window.AUIPivotMessages = AUIPivotMessages;
})();
