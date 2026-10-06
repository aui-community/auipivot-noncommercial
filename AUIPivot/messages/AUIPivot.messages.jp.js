/* eslint-disable */
/**
 * AUIPivot v2.7.0 Messages
 * AUIPivot 에서 사용되는 메세지들을 정의합니다.
 */
(function () {
	const AUIPivotMessages = {
		rowNumHeaderText: 'No.',
		rowLabelText: '行ラベル',
		columnLabelText: '列ラベル',
		columnTotalSumText: '合計',
		footerTotalSumText: '合計',
		emptyText: '( エンプティー )',
		emptyValue: '( エンプティー )',
		noDataMessage: 'レポートを作成するには、フィールドリストからフィールドを選択してください。',
		summaryText: ' 要約',
		totalSummaryText: ' 全体',
		columnText: '列',
		rowText: '行',
		valueText: '値',

		/*
		 * 연산자 이름
		 */
		opLabelTexts: {
			SUM: '合計',
			MIN: '最小値',
			MAX: '最大値',
			AVG: '平均',
			// 새 집계 연산의 표시 이름입니다.
			MEDIAN: '中央値',
			// 현재 필터를 통과한 전체 총계를 분모로 사용하는 독립 연산입니다.
			GRAND_TOTAL_RATIO: '総合計に対する比率',
			GRAND_TOTAL_COUNT_RATIO: '総件数に対する比率',
			COUNT: '数',
			// 고유한 값의 개수이며 소계·총계에서도 중복을 제거합니다.
			DISTINCT_COUNT: '重複しない個数',
			// 두 원본 합계를 나누는 신규 연산의 표시 이름입니다.
			RATIO_OF_SUMS: '合計の比率',
			MULTIPLY: '乗算',
			VARIANCE: '分散',
			STD_DEVIATION: '標準偏差',
			// 모집단과 구별되는 표본 통계 이름입니다.
			SAMPLE_VARIANCE: '標本分散',
			SAMPLE_STD_DEVIATION: '標本標準偏差',
			RATIO: '比率',
			ROW_RATIO: '行合計率'
		},

		/*
		 * 데이터 중 날짜 필드를 명시하여 연, 반기, 분기 등으로 나눠 표시할 때 명칭
		 */
		dateSeperateNames: {
			year: '$0年',
			half: ['上半期', '下半期'],
			quarter: '第$0四半期',
			month: '$0月'
		},

		/*
		 * 피벗 패널
		 */
		pivotPanel: {
            // 필드 글자를 직접 끄는 방법과 빈 공간의 스크롤을 안내합니다.
            dragFieldText: "フィールド名をドラッグして移動します。リストの空白部分をスワイプするとスクロールします。",
            dragGroupText: "グループ名をドラッグすると子フィールドを順に配置します。タップで展開または折りたたみます。",
			title: 'AUIPivot フィールド',
			fieldListTitle: 'レポートに追加するフィールドを選択 : ',
			fieldMessage: '下の領域の間にフィールドをドラッグします.',
			filterText: 'フィルタ',
			columnText: '列',
			rowText: '行',
			valueText: '値',
			valueSummaryText: 'Σ 値',
			updateLater: '後でピボットの更新',
			updateBtn: 'アップデート',
			okText: '確認',
			cancelText: 'キャンセル',
			closeText: '閉じる'
		},

		/*
		 * 피벗 패널에서 영역 아이템 클릭 시 나오는 드랍 다운 메뉴
		 */
		fieldDropDownTexts: {
			toUp: '上に移動',
			toDown: '下に移動',
			toFirst: '上部に移動',
			toLast: '下部に移動',
			toFilter: 'フィルタ領域に移動',
			toRow: '行エリアに移動',
			toColumn: '列エリアに移動',
			toValue: '値領域に移動',
			remove: '値を削除',
			setting: '値フィールドの設定'
		},

		/*
		 * 값 필드 설정 모달 창(Modal Window)
		 */
		valueModalWindow: {
			// 두 필드가 모두 선택되어야 새 비율 연산을 적용합니다.
			numeratorField: '分子フィールド',
			denominatorField: '分母フィールド',
			selectField: 'フィールドを選択',
			ratioFieldsRequired: '分子と分母のフィールドを選択してください。',
			title: '値フィールドを設定する',
			fieldName: 'フィールド名',
			customLabel: 'ユーザー指定の名前',
			operationType: '計算タイプ',
			formatType: '表示形式',
			okText: '確認',
			cancelText: 'キャンセル',
			closeText: '閉じる'
		},

		/*
		 * 필터 창
		 */
		filterWindow: {
			fieldSelectText: 'フィールドを選択します:',
			clearAllText: 'すべてのフィルタを削除',
			clearText: 'クリア$0磁場フィルタ',
			checkAllText: '(Select All)',
			searchCheckAllText: '(Select All Found)',
			noValueText: '(空の値)',
			itemMoreMessage: '下部によります',
			placeholder: 'Search',
			okText: '確認',
			cancelText: 'キャンセル'
		},

		/*
		 * 값 설정 창에 출력할 포맷 스트링 리스트
		 */
		formatStringList: [
			{
				formatString: '#,##0',
				labelText: '整数(#,##0)'
			},
			{
				formatString: '#,##0.0',
				labelText: '小数第1位(#,##0.0)'
			},
			{
				formatString: '#,##0.00',
				labelText: '小数第2位(#,##0.00)'
			},
			{
				formatString: '#,##0.000',
				labelText: '小数第3位(#,##0.000)'
			},
			{
				formatString: '###0.#####',
				labelText: 'デフォルト'
			}
		],

		/*
		 * 내보내기 진행 표시
		 */
		exportProgress: {
			init: 'エクスポートを初期化しています...',
			progress: 'エクスポート中...',
			complete: 'ほぼ完了しています...'
		}
	};
	if (typeof window !== 'undefined') window.AUIPivotMessages = AUIPivotMessages;
})();
