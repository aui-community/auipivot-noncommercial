/* 자동차 판매 원본의 업무 의미를 유지하는 정식 Demo 공용 데이터 helper입니다. */
(function (global) {
	"use strict";
	const regions = ["서울 지점", "부산 지점", "인천 지점", "광주 지점", "대전 지점", "대구 지점", "포항 지점", "춘천 지점"];
	const costRates = [110, 103, 98, 93, 85, 105, 97, 90, 108, 96, 88, 101];
	const statuses = ["출고 대기", "출고 준비", "운송 중", "인도 완료"];

	// 반드시 전체 car_sales.json을 먼저 전달합니다. 날짜/지점 선택은 반환된 사본에 적용합니다.
	global.extendCarSalesData = function (source, fields) {
		fields = fields || [];
		fields.forEach(function (field) {
			if (!["CUSTOMER_ID", "COST", "DELIVERY_STATUS"].includes(field)) throw new Error("지원하지 않는 자동차 확장 필드: " + field);
		});
		const requested = new Set(fields);
		return source.map(function (row, index) {
			const copy = Object.assign({}, row);
			const month = Number(row.DATE.slice(5, 7));
			if (requested.has("CUSTOMER_ID")) copy.CUSTOMER_ID = "CUST-" + String(1 + Math.floor(index / 2) % 240).padStart(4, "0");
			// COST는 차량 한 대가 아닌, 이 판매기록 전체의 원가입니다. TOTAL은 변경하지 않습니다.
			if (requested.has("COST")) {
				const region = regions.indexOf(row.REGION);
				if (region < 0 || month < 1 || month > 12) throw new Error("자동차 원가 예제의 지점/판매일을 확인하세요.");
				copy.COST = row.TOTAL * costRates[(month - 1 + region) % costRates.length] / 100;
			}
			if (requested.has("DELIVERY_STATUS")) copy.DELIVERY_STATUS = statuses[(index + month - 1) % statuses.length];
			return copy;
		});
	};

	// 계산 결과를 source에 넣지 않고, AUIPivot에 등록할 독립적인 선언만 반환합니다.
	global.createCarSalesDerivedFields = function (fields) {
		const definitions = [{dataField: "PROFIT", labelText: "이익", expression: {operator: "subtract", operands: ["TOTAL", "COST"]}}, {
			dataField: "PRICE_RANGE", labelText: "가격대", sourceField: "PRICE",
			ranges: [
				{id: "under2m", min: 0, max: 2000000, labelText: "2,000,000 미만"},
				{id: "from2m", min: 2000000, max: 3000000, labelText: "2,000,000~3,000,000 미만"},
				{id: "from3m", min: 3000000, max: 4000000, labelText: "3,000,000~4,000,000 미만"},
				{id: "from4m", min: 4000000, max: null, labelText: "4,000,000 이상"}
			], fallback: {id: "other", labelText: "기타"}
		}, {dataField: "PROFIT_BAND", labelText: "손익 구분", sourceField: "PROFIT", ranges: [
			{id: "loss", min: null, max: 0, labelText: "손실"},
			{id: "nonLoss", min: 0, max: null, labelText: "손실 없음"}
		]}];
		return definitions.filter(function (definition) { return fields.includes(definition.dataField); });
	};

	// 이름은 기존 자동차 Demo와 동일합니다. COUNT 필드는 판매 대수로 표시합니다.
	global.createCarSalesAliases = function () {
		return {REGION: "판매 지점", NAME: "차종", MODEL: "모델", COLOR: "색상", PRICE: "가격", COUNT: "판매 대수",
			TOTAL: "매출액", DATE: "일", DATE_YEAR: "년", DATE_HALF: "반기", DATE_QTR: "분기", DATE_MONTH: "월",
			CUSTOMER_ID: "고객/법인 거래처", COST: "판매 원가", DELIVERY_STATUS: "출고 단계", PROFIT: "이익", PRICE_RANGE: "가격대", PROFIT_BAND: "손익 구분"};
	};
}(window));
