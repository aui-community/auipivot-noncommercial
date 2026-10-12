/* eslint-disable */
/**
 * AUIPivot v2.8.1 Messages
 * AUIPivot 에서 사용되는 메세지들을 정의합니다.
 */
(function () {
	const AUIPivotMessages = {
		// 표 안에서 필드를 배치하는 조작과 상태를 안내합니다.
		gridFieldDrop: {"label": "ピボットフィールドの配置", "hint": "ドラッグして移動します。クリックまたはEnterで移動メニューを開きます。", "empty": "ここにフィールドを配置", "previous": "前へ移動", "next": "後ろへ移動", "moveTo": "{0}領域へ移動", "moved": "フィールドの配置を変更しました。"},
		// 슬라이서의 조작 및 상태 메시지를 언어별로 제공합니다.
		slicer: {
        // 필드 선택 창과 자동 슬라이서의 닫기 문구입니다.
        insert: "スライサーの挿入",
        confirm: "OK",
        cancel: "キャンセル",
        close: "閉じる",
        chooseFields: "スライサーに使用するフィールドを選択してください。",
        noFields: "フィールドがありません。先にデータを読み込んでください。",
        inserted: "挿入済み",

        // 배치와 무관하게 원본 필드의 존재 여부를 안내합니다.
        fieldUnavailable: '元データに対象のフィールドがありません。',
        "move": "スライサーの移動（ドラッグまたは矢印キー）", "resize": "スライサーのサイズ変更（ドラッグまたは矢印キー）", "multi": "複数選択", "clear": "フィルター解除", "search": "検索", "empty": "項目なし", "disconnected": "行・列・フィルターにこのフィールドを追加してください", "noData": "データなし", "minimum": "少なくとも1つ選択してください", "selected": "選択"},
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
			// 고유한 값의 개수이며 소계, 총계에서도 중복을 제거합니다.
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
			// 슬라이서와 같은 이동, 크기 조절 안내를 언어별로 제공합니다.
			moveText: "パネルの移動（ドラッグまたは矢印キー）",
			resizeText: "パネルのサイズ変更（ドラッグまたは矢印キー）",
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
		// 항목 이동 손잡이와 키보드 이동 메뉴의 안내 문구입니다.
		itemReorder: {
		    "handle": "項目を移動",
		    "title": "項目の順序",
		    "scope": "同じフィールドのすべてのグループに適用されます。",
		    "before": "上へ移動",
		    "after": "下へ移動",
		    "left": "左へ移動",
		    "right": "右へ移動",
		    "first": "先頭へ移動",
		    "last": "末尾へ移動",
		    "sorted": "行項目を移動するには現在の並べ替えを解除してください。",
		    "clear": "並べ替えを解除",
		    "close": "閉じる",
		    "moved": "項目の順序を変更しました。"
		},
		// 계산 편집창의 입력, 검증과 대기 상태 안내입니다.
		calculatedFieldEditor: {
		    "close": "閉じる",
		    "formula": "集計後の数式",
		    "expression": "数式",
		    "insertField": "フィールドを挿入",
		    "showValue": "値エリアに表示",
		    "formulaHint": "各ピボット領域のフィールドを合計してから数式を計算します。小計と総計も同じ方法で計算します。",
		    "formulaPreview": "総計プレビュー (現在のフィルター)",
		    "raw": "計算値",
		    "formatted": "表示値",
		    "calculating": "計算中...",
		    "divisionZero": "0で除算できません。",
		    "nonFinite": "計算結果が有限の数値ではありません。",
		    "open": "計算フィールド",
		    "title": "計算フィールドの編集",
		    "selection": "計算フィールドの選択",
		    "newField": "新しい計算フィールド",
		    "name": "名前",
		    "mode": "計算方法",
		    "row": "元データの行ごとに計算",
		    "ratio": "合計間の比率",
		    "left": "左の値 / 分子",
		    "right": "右の値 / 分母",
		    "field": "フィールド",
		    "constant": "数値",
		    "operator": "演算子",
		    "aggregation": "集計方法",
		    "keep": "既存の値設定を維持",
		    "format": "数値の表示形式",
		    "example": "プレビュー（フィルター適用前の先頭5件）",
		    "preview": "プレビュー",
		    "apply": "適用",
		    "remove": "削除",
		    "cancel": "キャンセル",
		    "pending": "更新待ち",
		    "rowHint": "各元データ行を計算してから集計します。括弧や複数演算子を含む文字列式は使用できません。",
		    "ratioHint": "分子の合計を分母の合計で割ります。小計と総計でも二つの合計から計算します。",
		    "sharedHint": "この計算を使用するすべての項目に適用します。複数の値設定は維持します。",
		    "laterHint": "フィールドパネルの更新ボタンで反映します。",
		    "empty": "空の値",
		    "noData": "元データを読み込んでから編集してください。",
		    "badName": "名前は1～80文字で、< または > を使用しないでください。",
		    "badFormat": "表示形式は120文字以内で入力してください。",
		    "badField": "存在するフィールドを選択してください。",
		    "badNumber": "有限の数値を入力してください。",
		    "badOperation": "対応する演算を選択してください。",
		    "dependencies": "次の項目で使用中です: ",
		    "changed": "レポートが変更されました。編集画面を開き直してください。",
		    "canceled": "アプリケーションが更新をキャンセルしました。",
		    "saved": "計算フィールドを適用しました。"
		},
		// 행 필드 부분합 메뉴와 적용 조건을 안내합니다.
		fieldSubtotal: {
		    "close": "閉じる",
		    "open": "小計の設定",
		    "title": "行フィールドの小計",
		    "show": "小計を表示",
		    "apply": "適用",
		    "cancel": "キャンセル",
		    "tree": "テーブルまたはセル結合形式でフィールドの小計を設定できます。",
		    "leaf": "最後の行フィールドには小計行がありません。",
		    "missing": "このフィールドは現在の行領域にありません。",
		    "icons": "設定を変更すると展開、折りたたみアイコンが無効になります。小計を再表示してもアイコンは自動で有効になりません。",
		    "later": "フィールドパネルの更新ボタンを押すと反映されます。",
		    "changed": "レポートが変更されました。設定画面を開き直してください。",
		    "canceled": "アプリケーションが更新をキャンセルしました。",
		    "global": "行の小計がすべて非表示です(showSummaryRow: false)。"
		},
		exportProgress: {
			init: 'エクスポートを初期化しています...',
			progress: 'エクスポート中...',
			complete: 'ほぼ完了しています...'
		}
	};
	if (typeof window !== 'undefined') window.AUIPivotMessages = AUIPivotMessages;
})();
