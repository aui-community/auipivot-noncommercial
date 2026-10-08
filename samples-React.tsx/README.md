실행 전에 이 배포본의 공통 `AUIPivot` 폴더를 샘플의 `src/static/AUIPivot`에 복사하십시오.
비상업용 라이선스가 포함되어 있으며 localhost 또는 127.0.0.1에서 실행합니다.

# AUIPivot React + TypeScript 샘플

기존 React JavaScript 샘플과 같은 4개 메뉴를 TypeScript로 작성했습니다. `aui-pivot@latest`의 타입 정의와 AUIPivot 2.7 제품 파일을 사용합니다.

## 설치와 실행

Node.js 22.12 이상에서 다음 명령을 실행합니다.

```sh
npm install
npm run dev
```

`aui-pivot`은 타입과 `EventKind`를 제공합니다. 엔진과 라이선스는 포함하지 않습니다. 제품 파일과 발급된 `AUIPivotLicense.js`를 준비하고 컴포넌트의 import 경로를 배치한 위치에 맞추십시오.

이 프로젝트는 공개 npm의 `aui-pivot@latest`를 사용하며 `package.json`에 `"aui-pivot": "latest"`로 선언합니다. `package-lock.json`을 함께 제공하므로 동일한 의존성을 설치하려면 `npm ci`를 실행합니다. 로컬 타입 패키지를 빌드하거나 압축 파일을 준비할 필요가 없습니다. 최신 버전으로 갱신하려면 `npm update aui-pivot`을 실행합니다. `latest`는 향후 주요 버전도 가리킬 수 있으므로 새 API는 해당 기능을 지원하는 제품 엔진과 함께 사용하십시오.

기존 프로젝트에 타입 패키지만 추가할 때는 다음 명령을 사용합니다.

```sh
npm install aui-pivot@latest
```

속성, 메소드와 이벤트 객체는 `import type`으로 가져오며 이벤트 이름은 `EventKind`로 지정할 수 있습니다.

```typescript
import type { Props } from 'aui-pivot';
import { EventKind } from 'aui-pivot';

// 속성의 이름과 값은 설치한 패키지의 타입으로 검사합니다.
const pivotProps: Props = { height: 560, layoutType: 'tree' };
// 서브 컴포넌트의 ref로 얻은 pivot에 이벤트를 연결합니다.
pivot.bind(EventKind.CellClick, (event) => {
    console.log(event.rowIndex, event.columnIndex, event.value);
});
```

## 샘플 구성

1. 트리 출력
2. 테이블 출력
3. 테이블 셀병합 출력
4. 메소드 및 이벤트 활용

4번 메뉴에서 보고서 저장과 복원, 슬라이서 필터, 제거와 재생성, 피벗 패널을 조작할 수 있습니다. 이벤트 기록은 최신 30건을 표시합니다. 전체 셀(GLOBAL) 기준 시각화와 요약 행, 요약 칼럼 시각화도 유지합니다.

기존 1~3번 메뉴는 `public/data/car_sales.json`, 4번 메뉴는 `public/data/wrapper/car_sales.json`을 사용합니다. 두 정적 JSON은 기존 샘플과 같습니다. `init()`, `createPivotGrid()`, `requestData(url)` 순서로 시작합니다.

## 서브 컴포넌트

- 컴포넌트: `src/static/AUIPivot-React.tsx/AUIPivotReact.tsx`
- 메소드와 이벤트 예제: `src/samples/WrapperMethods.tsx`
- 원본 데이터 타입: `src/sample-types.ts`

AUIGrid의 React TypeScript 컴포넌트처럼 컴포넌트 ref로 메소드를 호출합니다. 인스턴스 ID는 컴포넌트가 전달합니다. `bind()`는 이벤트 이름에 맞는 이벤트 객체 타입을 제공합니다.

`createOnMounted` 기본값은 `true`입니다. 샘플은 `false`로 지정하고 `createPivotGrid()`에서 직접 생성합니다. `autoResize` 기본값은 `true`, `resizeDelayTime` 기본값은 300ms입니다.

## 검사와 빌드

```sh
npm run type-check
npm run build
```

타입 검사에는 잘못된 속성과 이벤트 사용을 거부하는 `tests/wrapper.types.ts`도 포함됩니다. 빌드 결과는 `dist/`에 생성됩니다. 기존 JavaScript 샘플은 별도 폴더에서 그대로 사용할 수 있습니다.

## 비상업용 GitHub와 CDN으로 시작하기

AUIPivot 비상업용 버전은 `localhost` 또는 `127.0.0.1`에서 비상업용 목적의 학습, 평가 및 개발에 무료로 사용할 수 있습니다. [GitHub 저장소](https://github.com/aui-community/auipivot-noncommercial)에서 제품 파일과 샘플을 내려받을 수 있습니다.

로컬호스트(`localhost`, `127.0.0.1`) 환경 외의 접속 도메인이나 접속 IP에서 사용하고자 하는 경우, 30일 평가판을 제공합니다.

- 평가판 라이선스는 정품과 동일한 기능을 제공합니다.
- 사전 평가, 적합성 검토(PoC), 테스트 목적으로 사용할 수 있습니다.
- 제공 기간은 30일입니다.
- 다운로드: [AUIPivot 평가판 다운로드](https://www.auisoft.net/dcenter.html?product=AUIPivot)

[비상업용 CDN 시작 안내](https://www.auisoft.net/documentation/auipivot/Desc/noncommercial.html)는 연결 방법과 데이터가 포함된 단일 HTML 예제를 제공합니다. CDN은 비상업용 버전 전용이며, 정품은 제공받은 제품 파일을 연결합니다. 이 프레임워크 샘플은 로컬 파일을 import하므로 제품 파일을 배치하고 기존 import 경로에 맞춰 실행하세요.

AI 개발 도구에서는 [AUIPivot MCP](https://www.auisoft.net/documentation/auipivot/Desc/mcp-server.html)에 연결한 뒤 비상업용 CDN 시작 예제와 사용하는 프레임워크의 샘플을 요청할 수 있습니다. 세부 사용 조건은 [라이선스 원문](https://github.com/aui-community/auipivot-noncommercial/blob/main/LICENSE)을 확인하세요.

## PDF로 내보내기

1~3번 데모의 **PDF로 내보내기** 버튼으로 현재 보고서를 저장합니다. `index.html`에서 PDF 라이브러리를 불러오고 각 데모의 `exportPdfClick()`에서 `exportToPdf()`를 호출합니다.

예제는 `public/pdfkit/`의 PDF 라이브러리와 [제주고딕 폰트](https://www.jeju.go.kr/jeju/symbol/font/infor.htm)를 사용합니다. 다른 폰트는 `fontPath`로 지정할 수 있습니다. 셀병합 방식은 테이블 형태로 내보냅니다.

## 부모 영역 크기에 맞추기

`resizeMode="container"`를 컴포넌트에 직접 지정하면 창 크기가 그대로여도 사이드바나 부모 배치 변경에 맞춰 피벗 크기를 조정합니다. `pivotProps`에 넣는 엔진 속성이 아닙니다.

```jsx
<AUIPivot ref={myPivot} resizeMode="container" resizeDelayTime={100} pivotProps={pivotProps} />
```

`resizeMode` 기본값은 `window`입니다. `autoResize=false`이면 자동 감지를 등록하지 않으며 `resizeDelayTime`은 두 방식 모두 기본 300ms입니다. 생성 시 지정하고, 실행 중 prop 변경만으로 감지 방식을 전환하지 마세요.

컨테이너 방식은 호스트 DIV를 관찰합니다. 너비를 부모에 맞추려면 `pivotProps`의 `width`를 생략하고, 높이를 부모에 맞추려면 부모와 호스트 CSS에 유효한 높이를 지정하세요. Flex/Grid에서는 필요에 따라 `min-width: 0`을 지정합니다. 콘텐츠가 부모를 계속 늘리는 순환 배치는 피하세요.

숨겨진 영역, 5px 이하의 영역, 크기가 같은 영역은 조정하지 않습니다. 숨김이 풀리면 다시 측정합니다. `ResizeObserver`가 없으면 창 크기 이벤트로 대체합니다. 컨테이너 감지는 해제와 `destroy()`에서 정리하고 `create()`에서 다시 연결합니다. 데이터는 크기 조정을 위해 재생성하지 않습니다.
