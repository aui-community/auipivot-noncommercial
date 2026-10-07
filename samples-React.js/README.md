실행 전에 이 배포본의 공통 `AUIPivot` 폴더를 샘플의 `src/static/AUIPivot`에 복사하십시오.
비상업용 라이선스가 포함되어 있으며 localhost 또는 127.0.0.1에서 실행합니다.

# AUIPivot React 샘플

React 19와 Vite 기반 JSX 샘플입니다. `npm ci --ignore-scripts` 후 `npm run dev`로 실행하고 `npm run build`로 production 결과를 생성합니다. 버전은 package-lock.json을 따릅니다.

4번 메뉴 **메소드 및 이벤트 활용**(`/WrapperMethods`)은 `src/samples/WrapperMethods.jsx`에 있습니다. 행 배치 변경, 보고서 저장과 복원, 슬라이서 필터, 제거와 재생성을 직접 실행합니다. 파생 필드, 사용자 집계, 항목 순서와 히트맵도 React ref로 설정합니다. 보고서는 현재 페이지의 메모리에 저장됩니다. 표 옆에서는 계산 시작과 완료, 셀과 총합계 클릭, 헤더 클릭과 정렬, 행 접기와 펼치기, 열 너비 변경 이벤트의 정보를 확인합니다. 최근 30건만 표시하며 기록 지우기 버튼으로 비울 수 있습니다.

새 예제는 WebDemo 원본과 같은 `public/data/wrapper/car_sales.json`을 사용합니다. 기존 1~3번 예제의 `public/data/car_sales.json`은 유지합니다.

wrapper 원본은 `src/static/AUIPivot-React/AUIPivotReact.jsx`입니다. ref로 `getPID`, `create`, 데이터/필드 설정, `bind`/`unbind`를 호출합니다. 기본값은 createOnMounted=true, autoResize=true, resizeDelayTime=300입니다.

보고서, 슬라이서, 파생 필드와 사용자 집계 등 공개 메소드도 ref로 호출합니다. 표시 속성은 `myPivot.current.setProp(...)` 후 `myPivot.current.refresh()`로 반영합니다. PID는 컴포넌트가 전달하므로 생략합니다.

Portal 영역이 준비되기를 기다려야 하면 `waitPortalRendering={true}`를 지정합니다. 다음 프레임에 생성하며 기본값은 `false`입니다. 데이터 설정과 이벤트 연결은 생성 후 수행하십시오. `createOnMounted={false}`이면 이 옵션과 관계없이 수동으로 생성합니다.

`import AUIPivot, { apUtils } from './AUIPivotReact'` 형태로 `apUtils.isCreated(pid)`, `apUtils.getActiveGrid()`, `apUtils.getCreatedGridAll()`과 버전 정보를 사용할 수 있습니다.

`createOnMounted={false}`일 때 ref의 `create(props)`로 수동 생성할 수 있습니다. public destroy 후 create로 다시 사용하는 동작도 유지합니다. name/pivotProps 변경에 따른 자동 재생성이나 autoResize false에서 true로 변경할 때 자동 구독은 지원 정책에 추가하지 않았습니다. 필요한 변경은 기존 공개 메서드로 수행하십시오.

공개 전달 API와 ref 형식을 유지하며 React class를 hook 컴포넌트로 바꾸지 않았습니다. React StrictMode와 Portal, 기본, 지정 debounce, 데이터, 선택, 제거는 [wrapper 검사](../../AUI_Pivot/Tests/README.md)에서 실제 framework로 확인합니다. [작업 기록](../../Docs/codex/wrapper-maintenance.md)에 수정 전/후 결과가 있습니다.

엔진, 라이선스, 메시지, CSS import 경로는 기존 구성을 사용합니다. Builder의 대응 wrapper는 사본 관리 도구로 동기화하며 release header는 보존합니다. 샘플 데이터 fetch, 라우팅과 전체 앱 동작은 wrapper 회귀 검사의 범위를 넘어 추가 검증할 수 있습니다.

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
