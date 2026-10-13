/* eslint-disable */
/**
 * AUIPivot v2.8.2 Messages
 * AUIPivot 에서 사용되는 메세지들을 정의합니다.
 */
(function () {
	const AUIPivotMessages = {
		// 표 안에서 필드를 배치하는 조작과 상태를 안내합니다.
		gridFieldDrop: {"label": "Pivot field layout", "hint": "Drag to move. Click or press Enter for the move menu.", "empty": "Drop a field here", "previous": "Move before", "next": "Move after", "moveTo": "Move to {0}", "moved": "Field layout changed."},
		// 슬라이서의 조작 및 상태 메시지를 언어별로 제공합니다.
		slicer: {
        // 필드 선택 창과 자동 슬라이서의 닫기 문구입니다.
        insert: "Insert slicer",
        confirm: "OK",
        cancel: "Cancel",
        close: "Close",
        chooseFields: "Select fields to insert slicers.",
        noFields: "No fields available. Load data first.",
        inserted: "Already inserted",

        // 배치와 무관하게 원본 필드의 존재 여부를 안내합니다.
        fieldUnavailable: 'Field not found in source data',
        "move": "Move slicer (drag or arrow keys)", "resize": "Resize slicer (drag or arrow keys)", "multi": "Multiple selection", "clear": "Clear filter", "search": "Search", "empty": "No items", "disconnected": "Add this field to Rows, Columns or Filters", "noData": "No data", "minimum": "Select at least one item", "selected": "selected"},
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
			// 고유한 값의 개수이며 소계, 총계에서도 중복을 제거합니다.
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
			// 슬라이서와 같은 이동, 크기 조절 안내를 언어별로 제공합니다.
			moveText: "Move panel (drag or arrow keys)",
			resizeText: "Resize panel (drag or arrow keys)",
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
		// 항목 이동 손잡이와 키보드 이동 메뉴의 안내 문구입니다.
		itemReorder: {
		    "handle": "Move item",
		    "title": "Item order",
		    "scope": "Applies to this field in every group.",
		    "before": "Move up",
		    "after": "Move down",
		    "left": "Move left",
		    "right": "Move right",
		    "first": "Move to beginning",
		    "last": "Move to end",
		    "sorted": "Clear the current row sorting to move items manually.",
		    "clear": "Clear sorting",
		    "close": "Close",
		    "moved": "Item order changed."
		},
		// 계산 편집창의 입력, 검증과 대기 상태 안내입니다.
		calculatedFieldEditor: {
		    "close": "Close",
		    "formula": "Formula after aggregation",
		    "expression": "Formula",
		    "insertField": "Insert field",
		    "showValue": "Show in Values",
		    "formulaHint": "Fields are summed in each pivot region before evaluating the formula. Subtotals and grand totals use the same rule.",
		    "formulaPreview": "Grand total preview (current filters)",
		    "raw": "Raw value",
		    "formatted": "Formatted value",
		    "calculating": "Calculating...",
		    "divisionZero": "Cannot divide by zero.",
		    "nonFinite": "The result is not a finite number.",
		    "open": "Calculated fields",
		    "title": "Calculated field editor",
		    "selection": "Calculated field",
		    "newField": "New calculated field",
		    "name": "Name",
		    "mode": "Calculation",
		    "row": "Calculate each source row",
		    "ratio": "Ratio of sums",
		    "left": "Left operand / numerator",
		    "right": "Right operand / denominator",
		    "field": "Field",
		    "constant": "Number",
		    "operator": "Operator",
		    "aggregation": "Aggregation",
		    "keep": "Keep existing value settings",
		    "format": "Number format",
		    "example": "Preview (first 5 source records, before filtering)",
		    "preview": "Preview",
		    "apply": "Apply",
		    "remove": "Delete",
		    "cancel": "Cancel",
		    "pending": "Pending update",
		    "rowHint": "Calculate each source record, then aggregate the results. Parentheses and multi-operator text formulas are not supported.",
		    "ratioHint": "Divide the numerator sum by the denominator sum, including subtotals and grand totals.",
		    "sharedHint": "Editing changes every use of this calculated field. Existing multiple value settings are preserved.",
		    "laterHint": "Changes will take effect when you click the panel Update button.",
		    "empty": "Empty",
		    "noData": "Load source data before editing.",
		    "badName": "Enter 1 to 80 characters without < or >.",
		    "badFormat": "Use a format of at most 120 characters.",
		    "badField": "Select an existing field.",
		    "badNumber": "Enter a finite number.",
		    "badOperation": "Select a supported operation.",
		    "dependencies": "This field is used by: ",
		    "changed": "The report changed. Open the editor again.",
		    "canceled": "The application canceled the update.",
		    "saved": "Calculated field applied."
		},
		// 행 필드 부분합 메뉴와 적용 조건을 안내합니다.
		fieldSubtotal: {
		    "close": "Close",
		    "open": "Subtotal settings",
		    "title": "Row field subtotals",
		    "show": "Show subtotals",
		    "apply": "Apply",
		    "cancel": "Cancel",
		    "tree": "Use the table or merged table layout to set field subtotals.",
		    "leaf": "The last row field has no subtotal row.",
		    "missing": "This field is no longer in the row area.",
		    "icons": "Changing this setting turns off expand/collapse icons. Showing subtotals again does not restore the icons.",
		    "later": "Changes will take effect when you click the panel Update button.",
		    "changed": "The report changed. Open the settings again.",
		    "canceled": "The application canceled the update.",
		    "global": "Row subtotals are turned off (showSummaryRow: false)."
		},
		exportProgress: {
			init: 'Initializing Exporting...',
			progress: 'Exporting in progress...',
			complete: 'Almost Complete...'
		}
	};
	if (typeof window !== 'undefined') window.AUIPivotMessages = AUIPivotMessages;
})();
