# AUIPivot Non-Commercial

AUIPivot 는 Active-X 사용 없이 자바스크립트와 HTML, CSS 로 작성된 웹 피벗 그리드(Pivot Grid) 입니다.

AUIPivot 는 상용 라이선스(Enterprise License) 와 비상용 라이선스(Non-Commercial License)가 존재합니다.

이 패키지는 비상용 라이선스(Non-Commercial License)에 해당되므로 사용을 원하는 분은 라이선스 세부항목 확인 후 사용하십시오.

## 무료 라이선스 사용권 부여 및 제한

비상용 목적의 로컬호스트(localhost, 127.0.0.1) 환경에서 영구적으로 사용 가능합니다.

상용 라이선스와 비상용 라이선스 상의 기능적 제한은 없습니다.

모두 동일한 기능을 제공합니다.

로컬호스트(`localhost`, `127.0.0.1`) 환경 외의 접속 도메인이나 접속 IP에서 사용하고자 하는 경우, 30일 평가판을 제공합니다.

- 평가판 라이선스는 정품과 동일한 기능을 제공합니다.
- 사전 평가, 적합성 검토(PoC), 테스트 목적으로 사용할 수 있습니다.
- 제공 기간은 30일입니다.
- 다운로드: [AUIPivot 평가판 다운로드](https://www.auisoft.net/dcenter.html?product=AUIPivot)

자세한 사항은 다음의 허가된 사용 및 금지된 사용, 상업적 이용에 대하여 확인하십시오.

1 허용된 사용

귀하는 다음과 같은 비상업적 목적으로 소프트웨어를 사용할 수 있습니다:

-   교육, 학술 및 연구 목적
-   개인적 용도
-   테스트, 개발 및 데모 목적으로 사용
-   로컬호스트(localhost, 127.0.0.1) 환경에서의 사용

2 금지된 사용

귀하는 다음과 같은 상업적 용도로 소프트웨어를 사용할 수 없습니다:

-   비즈니스 또는 전문적인 운영 목적
-   소프트웨어 또는 그 수정본을 라이선스, 임대, 교환, 판매하는 행위
-   상업 제품 또는 서비스에 소프트웨어를 포함하는 행위
-   정부 기관 또는 국제 기구에서의 사용

3 비상업적 평가 목적

기업 직원은 상업적 환경이 아닌 환경에서 평가, 개발 및 테스트 목적으로만 소프트웨어를 사용할 수 있습니다.

4 상업적 이용 안내

소프트웨어를 상업적 목적으로 사용하려면 라이선스 제공자와 협의하여 적절한 라이선스를 구매해야 합니다.
상업적 사용이 필요한 경우 당사(aui@auisoft.net)에 문의해 주시기 바랍니다.
상세한 상업 라이선스에 대한 내용은 https://www.auisoft.net 에서 확인 가능합니다.

5 로컬호스트 사용 제한

본 소프트웨어는 로컬호스트(localhost, 127.0.0.1) 환경에서만 사용이 허용됩니다.
외부 웹 서버의 도메인이나 IP에서 평가하려면 위의 별도 평가판을 사용하십시오. 상업적 서비스나 운영 환경에서는 유효한 상업용 라이선스가 필요합니다.

## 디렉토리 설명

-   AUIPivot : AUIPivot 라이브러리와 스타일(css) 가 있는 디렉토리입니다.
    실제로 AUIPivot 를 사용할 때 이 디렉토리만 복사해서 사용하십시오.

-   AUIPivot-React : AUIPivot 를 React.js 라이브러리에서 사용토록 작성된 서브 컴포넌트입니다.

-   AUIPivot-Vue : AUIPivot 를 Vue.js 프레임워크에서 사용토록 작성된 서브 컴포넌트입니다.

-   dist : AUIPivot 디렉토리와 동일합니다. CDN 배포를 위해 추가된 디렉토리입니다.

-   documentation : AUIPivot 다큐멘트 문서가 있습니다.
    index.html 파일을 실행하십시오.

-   export_server_samples : 엑셀, CSV, PDF 등 내보내기 할 때 서버사이드에서 처리할 예제가 있습니다.
    PHP, JSP, ASP 소스 샘플이 있으니 맞는 서버 사이드를 선택해서 사용하십시오.

-   pdfkit : PDF 출력을 위한 라이브러리가 있습니다.
    PDF 저장 기능을 사용할 때만 필요한 라이브러리이니 참고하십시오.

-   samples : 개별적인 모든 샘플이 있는 디렉토리입니다.

-   samples-React.js : React.js 라이브러리에서의 샘플이 있는 디렉토리입니다.

-   samples-React.tsx : React.js + Typescript 라이브러리에서의 샘플이 있는 디렉토리입니다.

-   samples-Vue.js : Vue.js 프레임워크에서의 샘플이 있는 디렉토리입니다.

-   samples-Vue.ts : Vue.js + Typescript 프레임워크에서의 샘플이 있는 디렉토리입니다.

## CDN 사용

[비상업용 GitHub 저장소](https://github.com/aui-community/auipivot-noncommercial)의 `dist` 디렉토리를 jsDelivr CDN으로 제공합니다.
[CDN 시작 안내와 단일 HTML 예제](https://www.auisoft.net/documentation/auipivot/Desc/noncommercial.html)에서 파일을 내려받아 바로 실행할 수 있습니다.
다음 라이브러리, 라이선스, CSS와 한국어 메시지를 HTML 파일에 연결합니다.

```html
<!-- AUIPivot 스타일: CDN 스타일을 읽을 수 있도록 crossorigin을 지정합니다. -->
<link href="https://cdn.jsdelivr.net/gh/aui-community/auipivot-noncommercial@main/dist/AUIPivot_style.css" rel="stylesheet" crossorigin="anonymous" />
<!-- AUIPivot 라이선스 -->
<script src="https://cdn.jsdelivr.net/gh/aui-community/auipivot-noncommercial@main/dist/AUIPivotLicense.js"></script>
<!-- AUIPivot 라이브러리 -->
<script src="https://cdn.jsdelivr.net/gh/aui-community/auipivot-noncommercial@main/dist/AUIPivot.js"></script>
<!-- AUIPivot 한국어 메시지 -->
<script src="https://cdn.jsdelivr.net/gh/aui-community/auipivot-noncommercial@main/dist/messages/AUIPivot.messages.kr.js"></script>
```

예제 페이지는 로컬 웹 서버에서 `http://localhost:포트/` 또는 `http://127.0.0.1:포트/`로 실행합니다.

## 기본적인 사용방법

다음 코드를 배포본 루트의 `start.html`로 저장하고 로컬 웹 서버에서 실행하십시오.
데이터는 배포본의 `samples/data/car_sales.json`을 사용합니다.
CDN 대신 로컬 파일을 사용하려면 아래 CDN 주소의 `dist/`까지를 `./AUIPivot/`으로 바꿉니다.

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>AUIPivot 비상업용 시작하기</title>
    <!-- AUIPivot 스타일: CDN 스타일을 읽을 수 있도록 crossorigin을 지정합니다. -->
    <link href="https://cdn.jsdelivr.net/gh/aui-community/auipivot-noncommercial@main/dist/AUIPivot_style.css" rel="stylesheet" crossorigin="anonymous" />
    <!-- AUIPivot 라이선스 -->
    <script src="https://cdn.jsdelivr.net/gh/aui-community/auipivot-noncommercial@main/dist/AUIPivotLicense.js"></script>
    <!-- AUIPivot 라이브러리 -->
    <script src="https://cdn.jsdelivr.net/gh/aui-community/auipivot-noncommercial@main/dist/AUIPivot.js"></script>
    <!-- AUIPivot 한국어 메시지 -->
    <script src="https://cdn.jsdelivr.net/gh/aui-community/auipivot-noncommercial@main/dist/messages/AUIPivot.messages.kr.js"></script>
    <script>
    // 페이지 준비 후 피벗을 생성하고 자동차 판매 데이터를 읽습니다.
    let myPivotID;
    document.addEventListener("DOMContentLoaded", init);

    function init() {
      createPivotGrid();
      requestData("./samples/data/car_sales.json");
    }

    function createPivotGrid() {
      // 지점과 차종별 매출액을 색상별로 비교합니다.
      const pivotProps = { layoutType: "tree" };
      myPivotID = AUIPivot.create("#pivot_wrap", pivotProps);
      AUIPivot.setRowFields(myPivotID, ["REGION", "NAME"]);
      AUIPivot.setColumnFields(myPivotID, ["COLOR"]);
      AUIPivot.setValueFields(myPivotID, [{ dataField: "TOTAL", operation: "SUM" }]);
      AUIPivot.setFieldAlias(myPivotID, {
        REGION: "판매 지점", NAME: "차종", COLOR: "색상", TOTAL: "매출액"
      });
      // 셀을 클릭하면 해당 셀의 이벤트 정보를 확인합니다.
      AUIPivot.bind(myPivotID, "cellClick", function(event) {
        console.log(event);
      });
    }

    // 배포본에 포함된 원본 JSON을 불러와 피벗 분석을 실행합니다.
    function requestData(url) {
      fetch(url)
        .then(function(response) {
          if (!response.ok) throw new Error("HTTP error " + response.status);
          return response.json();
        })
        .then(function(data) {
          AUIPivot.setGridData(myPivotID, data);
        })
        .catch(function(error) {
          alert("데이터 요청 실패: " + error.message);
        });
    }
    </script>
</head>
<body>
    <div id="pivot_wrap" style="width:100%;height:480px;"></div>
</body>
</html>
```

React, Vue의 JavaScript 및 TypeScript 샘플은 실행 전에 배포본의 `AUIPivot` 폴더를 각 샘플의 `src/static/AUIPivot`에 복사합니다.
TypeScript 샘플은 npm의 `aui-pivot@latest` 타입 패키지를 사용합니다. 각 샘플 README의 설치와 실행 안내를 참고하십시오.

## 기술 지원 및 유지보수

-   기술 지원: Non-Commercial 사용자는 공식적인 기술 지원을 받을 수 없습니다.
-   업데이트 및 유지보수: Non-Commercial 사용자를 위한 소프트웨어 업데이트를 제공할 의무가 없습니다.
-   Non-Commercial 사용자의 유지보수 및 보안 패치는 당사의 재량에 따라 제공될 수 있습니다.
