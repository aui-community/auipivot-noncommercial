/* eslint-disable */
/**
 * AUIPivot v2.7.0 Messages
 * AUIPivot 에서 사용되는 메세지들을 정의합니다.
 */
(function () {
	const AUIPivotMessages = {
		rowNumHeaderText: 'No.',
		rowLabelText: 'Row Label',
		columnLabelText: 'Column Label',
		columnTotalSumText: 'Total ',
		footerTotalSumText: 'Grand Total',
		emptyText: '( Empty )',
		emptyValue: '( None )',
		noDataMessage: 'Select fields from the field list to create a report',
		summaryText: ' Summary',
		totalSummaryText: 'Grand Total ',
		columnText: 'Column',
		rowText: 'Row',
		valueText: 'Value',

		/*
		 * 연산자 이름
		 */
		opLabelTexts: {
			SUM: 'Sum',
			MIN: 'Min',
			MAX: 'Max',
			AVG: 'Average',
			// 새 집계 연산의 표시 이름입니다.
			MEDIAN: 'Median',
			// 현재 필터를 통과한 전체 총계를 분모로 사용하는 독립 연산입니다.
			GRAND_TOTAL_RATIO: 'Sum as Fraction of Grand Total',
			GRAND_TOTAL_COUNT_RATIO: 'Count as Fraction of Grand Total',
			COUNT: 'Count',
			// 고유한 값의 개수이며 소계·총계에서도 중복을 제거합니다.
			DISTINCT_COUNT: 'Distinct Count',
			// 두 원본 합계를 나누는 신규 연산의 표시 이름입니다.
			RATIO_OF_SUMS: 'Ratio of Sums',
			MULTIPLY: 'Multiply',
			VARIANCE: 'Variance',
			STD_DEVIATION: 'STD Deviation',
			// 모집단과 구별되는 표본 통계 이름입니다.
			SAMPLE_VARIANCE: 'Sample variance',
			SAMPLE_STD_DEVIATION: 'Sample standard deviation',
			RATIO: 'Ratio',
			ROW_RATIO: 'Row Ratio'
		},

		/*
		 * 데이터 중 날짜 필드를 명시하여 연, 반기, 분기 등으로 나눠 표시할 때 명칭
		 */
		dateSeperateNames: {
			year: '$0',
			half: ['H1', 'H2'],
			quarter: 'Q$0',
			month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		},

		/*
		 * 피벗 패널
		 */
		pivotPanel: {
            // 필드 글자를 직접 끄는 방법과 빈 공간의 스크롤을 안내합니다.
            dragFieldText: "Drag the field text to move it. Swipe empty list space to scroll.",
            dragGroupText: "Drag the group to add its fields in order. Tap to expand or collapse.",
			title: 'AUIPivot Fields',
			filterText: 'Filters',
			columnText: 'Columns',
			rowText: 'Rows',
			valueText: 'Values',
			valueSummaryText: 'Σ Values',
			fieldListTitle: 'Select a Field to add to the report : ',
			fieldMessage: 'Drag a field to the areas below.',
			updateLater: 'Update the pivot later',
			updateBtn: 'Update',
			okText: 'OK',
			cancelText: 'Cancel',
			closeText: 'Close'
		},

		/*
		 * 피벗 패널에서 영역 아이템 클릭 시 나오는 드랍 다운 메뉴
		 */
		fieldDropDownTexts: {
			toUp: 'Move up',
			toDown: 'Move down',
			toFirst: 'Move to the top',
			toLast: 'Move to the bottom',
			toFilter: 'Move to the filter area',
			toRow: 'Move to the row area',
			toColumn: 'Move to the column area',
			toValue: 'Move to the value area',
			remove: 'Remove the field',
			setting: 'Set the field value'
		},

		/*
		 * 값 필드 설정 모달 창(Modal Window)
		 */
		valueModalWindow: {
			// 두 필드가 모두 선택되어야 새 비율 연산을 적용합니다.
			numeratorField: 'Numerator field',
			denominatorField: 'Denominator field',
			selectField: 'Select a field',
			ratioFieldsRequired: 'Select both numerator and denominator fields.',
			title: 'Value Field Setting',
			fieldName: 'Field Name',
			customLabel: 'Custom Field Name',
			operationType: 'Operator Type',
			formatType: 'FormatString Type',
			okText: 'OK',
			cancelText: 'Cancel',
			closeText: 'Close'
		},

		/*
		 * 필터 창
		 */
		filterWindow: {
			fieldSelectText: 'Select a field :',
			clearAllText: 'Clear filters all',
			clearText: 'Clear $0 field filter',
			checkAllText: '(Select All)',
			searchCheckAllText: '(Select All Found)',
			noValueText: '(Empty Value)',
			itemMoreMessage: 'Too many items...Search words',
			placeholder: 'Search',
			okText: 'OK',
			cancelText: 'Cancel'
		},

		/*
		 * 값 설정 창에 출력할 포맷 스트링 리스트
		 */
		formatStringList: [
			{
				formatString: '#,##0',
				labelText: 'Integer(#,##0)'
			},
			{
				formatString: '#,##0.0',
				labelText: 'One decimal(#,##0.0)'
			},
			{
				formatString: '#,##0.00',
				labelText: 'Two decimal(#,##0.00)'
			},
			{
				formatString: '#,##0.000',
				labelText: 'Three decimal(#,##0.000)'
			},
			{
				formatString: '###0.#####',
				labelText: 'Default'
			}
		],

		/*
		 * 내보내기 진행 표시
		 */
		exportProgress: {
			init: 'Initializing Exporting...',
			progress: 'Exporting in progress...',
			complete: 'Almost Complete...'
		}
	};
	if (typeof window !== 'undefined') window.AUIPivotMessages = AUIPivotMessages;
})();
