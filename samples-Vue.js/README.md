실행 전에 이 배포본의 공통 `AUIPivot` 폴더를 샘플의 `src/static/AUIPivot`에 복사하십시오.
비상업용 라이선스가 포함되어 있으며 localhost 또는 127.0.0.1에서 실행합니다.

# AUIPivot Vue 샘플

Vue 3와 Vite 기반 JavaScript 샘플입니다. `npm ci --ignore-scripts` 후 `npm run dev`로 실행하고 `npm run build`로 production 결과를 생성합니다. 버전은 package-lock.json을 따릅니다.

4번 메뉴 **메소드 및 이벤트 활용**(`/WrapperMethods`)은 `src/samples/WrapperMethods.vue`에 있습니다. 행 배치 변경, 보고서 저장과 복원, 슬라이서 필터, 제거와 재생성을 직접 실행합니다. 파생 필드, 사용자 집계, 항목 순서와 히트맵도 Vue ref로 설정합니다. 보고서는 현재 페이지의 메모리에 저장됩니다. 표 옆에서는 계산 시작과 완료, 셀과 총합계 클릭, 헤더 클릭과 정렬, 행 접기와 펼치기, 열 너비 변경 이벤트의 정보를 확인합니다. 최근 30건만 표시하며 기록 지우기 버튼으로 비울 수 있습니다.

새 예제는 WebDemo 원본과 같은 `public/data/wrapper/car_sales.json`을 사용합니다. 기존 1~3번 예제의 `public/data/car_sales.json`은 유지합니다.

wrapper 원본은 `src/static/AUIPivot-Vue/AUIPivot.vue`입니다. 기존처럼 ref로 getPID/create, 데이터, 필드 설정, bind/unbind를 호출합니다. 기본값은 createOnMounted=true, autoResize=true, resizeDelayTime=300이며, unmount는 자신의 timer/listener를 정리합니다. KeepAlive의 일시적인 비활성화는 기존 데이터를 유지합니다.

보고서, 슬라이서, 파생 필드와 사용자 집계 등 공개 메소드도 ref로 호출합니다. 표시 속성은 `myPivot.value.setProp(...)` 후 `myPivot.value.refresh()`로 반영합니다. PID는 컴포넌트가 전달하므로 생략합니다.

이미 생성된 상태에서 `create()`를 다시 호출하면 설정과 이벤트를 유지하고 기존 PID를 반환합니다. `destroy()` 후에는 다시 생성할 수 있습니다.

`import AUIPivot, { apUtils } from './AUIPivot.vue'` 형태로 `apUtils.isCreated(pid)`, `apUtils.getActiveGrid()`, `apUtils.getCreatedGridAll()`과 버전 정보를 사용할 수 있습니다.

생성 시 제공한 공개 이벤트 handler 15개를 자동으로 연결합니다. 일반 이벤트는 emit으로 전달하고, headerClick/pivotBegin/contextMenu는 단일 handler의 반환값을 엔진으로 전달합니다. PIVOT-WRAP-001부터 pivotBegin의 false가 계산을 취소합니다. contextMenu에서는 false로 메뉴를 취소하거나 메뉴 배열을 반환해 교체할 수 있습니다. pivotPanelShow/Hide도 자동 연결합니다.

```vue
<AUIPivot
  ref="myPivot"
  :pivotProps="pivotProps"
  @pivotBegin="beforePivot"
  @pivotComplete="afterPivot"
/>
```

`beforePivot(event)`의 false는 취소, 반환값 생략은 진행입니다. pivotBegin/pivotComplete payload의 식별자는 `event.id`입니다. 이미 연결한 handler의 함수 교체, 제거는 반영하지만, 생성 이후 처음 추가한 이벤트를 자동 bind하지는 않습니다. 이때는 ref의 bind를 사용하십시오. 직접 bind한 handler는 parent prop 변경으로 덮어쓰지 않습니다. unbind에는 기존처럼 콜백을 함께 전달합니다.

반환형 이벤트의 복수 handler 배열에 대한 우선순위는 정의하지 않았습니다. name/pivotProps 변경에 따른 자동 재생성, autoResize false에서 true로 변경할 때 자동 구독도 추가하지 않았습니다. Vue 2 호환 분기는 유지했으나 실제 Vue 2 앱 실행 검증은 하지 않았습니다.

[wrapper 검사](../../AUI_Pivot/Tests/README.md)는 현재 Vue 3, 실제 AUIPivot 엔진으로 수명주기, Teleport/KeepAlive, 데이터, 선택, 이벤트를 확인합니다. [작업 기록](../../Docs/codex/wrapper-maintenance.md)에 수정 전/후 결과와 Builder 사본 관리 범위를 남겼습니다.

## 비상업용 GitHub와 CDN으로 시작하기

AUIPivot 비상업용 버전은 `localhost` 또는 `127.0.0.1`에서 비상업용 목적의 학습, 평가 및 개발에 무료로 사용할 수 있습니다. [GitHub 저장소](https://github.com/aui-community/auipivot-noncommercial)에서 제품 파일과 샘플을 내려받을 수 있습니다.

로컬호스트(`localhost`, `127.0.0.1`) 환경 외의 접속 도메인이나 접속 IP에서 사용하고자 하는 경우, 30일 평가판을 제공합니다.

- 평가판 라이선스는 정품과 동일한 기능을 제공합니다.
- 사전 평가, 적합성 검토(PoC), 테스트 목적으로 사용할 수 있습니다.
- 제공 기간은 30일입니다.
- 다운로드: [AUIPivot 평가판 다운로드](https://www.auisoft.net/dcenter.html)

[비상업용 CDN 시작 안내](https://www.auisoft.net/documentation/auipivot/Desc/noncommercial.html)는 연결 방법과 데이터가 포함된 단일 HTML 예제를 제공합니다. CDN은 비상업용 버전 전용이며, 정품은 제공받은 제품 파일을 연결합니다. 이 프레임워크 샘플은 로컬 파일을 import하므로 제품 파일을 배치하고 기존 import 경로에 맞춰 실행하세요.

AI 개발 도구에서는 [AUIPivot MCP](https://www.auisoft.net/documentation/auipivot/Desc/mcp-server.html)에 연결한 뒤 비상업용 CDN 시작 예제와 사용하는 프레임워크의 샘플을 요청할 수 있습니다. 세부 사용 조건은 [라이선스 원문](https://github.com/aui-community/auipivot-noncommercial/blob/main/LICENSE)을 확인하세요.

## PDF로 내보내기

1~3번 데모의 **PDF로 내보내기** 버튼으로 현재 보고서를 저장합니다. `index.html`에서 PDF 라이브러리를 불러오고 각 데모의 `exportPdfClick()`에서 `exportToPdf()`를 호출합니다.

예제는 `public/pdfkit/`의 PDF 라이브러리와 [제주고딕 폰트](https://www.jeju.go.kr/jeju/symbol/font/infor.htm)를 사용합니다. 다른 폰트는 `fontPath`로 지정할 수 있습니다. 셀병합 방식은 테이블 형태로 내보냅니다.
