/* eslint-disable */
/**
 * AUIPivot v2.7.0 Messages
 * AUIPivot 에서 사용되는 메세지들을 정의합니다.
 */
(function () {
	const AUIPivotMessages = {
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
			// 고유한 값의 개수이며 소계·총계에서도 중복을 제거합니다.
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
		exportProgress: {
			init: '내보내기 초기화 중...',
			progress: '내보내기 진행 중...',
			complete: '내보내기가 곧 완료됩니다.'
		}
	};
	if (typeof window !== 'undefined') window.AUIPivotMessages = AUIPivotMessages;
})();
