// 성능 데모에서 서버 요청 없이 차량 판매 원본 행을 생성한다. 지점, 차종, 날짜별 피벗 입력에 사용한다.
// 상수 정의
const REGIONS = ['서울 지점', '부산 지점', '인천 지점', '광주 지점', '대전 지점', '대구 지점', '포항 지점', '춘천 지점'];
const COLORS = ['Black', 'Blue', 'Gray', 'Green', 'Orange', 'Red', 'Silver', 'White', 'Yellow'];
const MODELS = [
	{ name: '소나타', versions: ['2.0CVVL', '1.6 Turbo GDi', '1.7 e-VGT', '2.0 Turbo GDi'], prices: [2214, 2376, 2459, 2651] },
	{ name: '그랜저', versions: ['2.4 가솔린', '2.2 디젤', '3.0 가솔린', '더 타임리스'], prices: [2933, 3156, 3259, 3680] },
	{ name: '산타페', versions: ['e-VGT R2.0', 'e-VGT R2.2'], prices: [2765, 3058] },
	{ name: '스타렉스', versions: ['LPi 12인승 2WD', '디젤 12인승 2WD', '디젤 11인승 2WD', '디젤 12인승 4WD'], prices: [2175, 2290, 2310, 2740] },
	{ name: '아반테', versions: ['1.6 GDi', '1.6 e-VGT', '2.0 CVVT'], prices: [1384, 1600, 1934] },
	{ name: '제너시스', versions: ['G330 RWD', 'G330 AWD', 'G380 RWD', 'G380 AWD'], prices: [4565, 4807, 5363, 5605] },
	{ name: '투싼', versions: ['1.6T GDi', '2.0 e-VGT', '1.7 e-VGT 2WD', '2.0 e-VGT 4WD'], prices: [2199, 2209, 2297, 2386] }
];

// 유틸 함수: 랜덤 요소 선택
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// 유틸 함수: 날짜 포맷
const formatDate = (date) => {
	const y = date.getFullYear();
	const m = String(date.getMonth() + 1).padStart(2, '0');
	const d = String(date.getDate()).padStart(2, '0');
	return `${y}/${m}/${d}`;
};

// 랜덤 데이터 생성 메인 함수
function generateData(dataSize = 0) {
	const data = [];
	const totalDays = 365;
	// 요청 크기를 하루 단위로 올림하여 365일에 배분하므로 실제 행 수는 요청값보다 조금 클 수 있다.
	const entriesPerDay = dataSize > 0 ? Math.ceil(dataSize / totalDays) : 15;
	let currentDate = new Date('2024/01/01');

	for (let day = 0; day < totalDays; day++) {
		for (let i = 0; i < entriesPerDay; i++) {
			const model = randomItem(MODELS);
			// 모델의 상세 이름과 가격은 같은 인덱스를 사용하여 서로 다른 차종 정보가 섞이지 않게 한다.
			const versionIdx = Math.floor(Math.random() * model.versions.length);

			const record = {
				REGION: randomItem(REGIONS),
				NAME: model.name,
				MODEL: model.versions[versionIdx],
				COLOR: randomItem(COLORS),
				PRICE: model.prices[versionIdx] * 1000,
				COUNT: Math.ceil(Math.random() * 3),
				DATE: formatDate(currentDate)
			};

			record.TOTAL = record.PRICE * record.COUNT;
			data.push(record);
		}
		currentDate.setDate(currentDate.getDate() + 1);
	}
	//console.log(JSON.stringify(data));
	return data;
}
