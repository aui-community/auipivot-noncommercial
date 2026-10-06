// 문서와 선택한 테마가 준비된 뒤 각 데모의 init 함수를 한 번 호출합니다.
document.addEventListener("DOMContentLoaded", async function () {
    try {
        // 동적으로 교체한 CSS는 DOMContentLoaded보다 늦게 적용될 수 있습니다.
        // 패널이 스타일 없는 높이를 저장하지 않도록 기다리며, 선택기가 없는 페이지는 바로 진행합니다.
        if (window.auiPivotDemoThemeReady) await window.auiPivotDemoThemeReady;
        await init();
    } catch (error) {
        // 비동기 원본 요청 실패를 빈 피벗으로 오해하지 않도록 화면에 알립니다.
        const message = document.createElement("p");
        message.className = "demo-load-error";
        message.setAttribute("role", "alert");
        message.textContent = "데모를 준비하지 못했습니다: " + error.message;
        (document.getElementById("main") || document.body).prepend(message);
    }
}, { once: true });

let carSalesRequest;
// 일반 데모는 같은 정적 JSON을 한 번 읽고 매번 독립 사본을 전달합니다.
// 날짜 필드나 패널 구성이 추가되어도 재생성 시 공통 원본이 오염되지 않습니다.
async function loadCarSalesData() {
    if (!carSalesRequest) {
        carSalesRequest = fetch("./data/car_sales.json").then(response => {
            if (!response.ok) throw new Error("자동차 판매 원본을 불러오지 못했습니다.");
            return response.json();
        }).catch(error => {
            // 일시적 요청 실패 후 다시 시도할 수 있도록 실패한 Promise를 제거합니다.
            carSalesRequest = null;
            throw error;
        });
    }
    const source = await carSalesRequest;
    return source.map(row => Object.assign({}, row));
}

// AUIPivot 데모의 원본/상세 데이터를 AUIGrid 없이 안전한 텍스트 표로 표시합니다.
// limit은 소개 화면의 큰 원본 예시만 제한하고, 상세 조회에서는 전체 결과를 그대로 표시합니다.
function renderDemoSourceTable(elementId, columns, data, limit) {
    const wrap = document.getElementById(elementId);
    const items = limit ? data.slice(0, limit) : data;
    wrap.style.overflow = "auto";
    const table = document.createElement("table");
    table.style.cssText = "width:100%;border-collapse:collapse";
    table.createCaption().textContent = limit && data.length > limit
        ? "원본 데이터 " + data.length + "건 중 처음 " + limit + "건"
        : "원본 데이터 " + data.length + "건";
    const head = table.createTHead().insertRow();
    columns.forEach(column => {
        const cell = document.createElement("th");
        cell.textContent = column.headerText;
        head.appendChild(cell);
    });
    const body = table.createTBody();
    items.forEach(item => {
        const row = body.insertRow();
        columns.forEach(column => {
            const cell = row.insertCell();
            cell.textContent = item[column.dataField] == null ? "" : String(item[column.dataField]);
            cell.style.cssText = "border:1px solid #ddd;padding:2px 6px";
        });
    });
    wrap.replaceChildren(table);
}

// 설명/이벤트 출력이 늘어난 데모에서만 호출합니다. 사용자가 이동할 수 있는 패널의
// 가로 위치는 유지하고 새 문서 배치에 맞춰 피벗과 패널의 상단을 다시 맞춥니다.
function alignDemoPivotPanel(pid) {
    const pivot = document.querySelector(pid);
    // 소개/성능 페이지는 기존 AUIPivot을 유지하므로 현재 제품의 API를 선택합니다.
    const api = window.AUIPivot;
    const panelId = api.getProp(pid, "pivotPanelId");
    const panel = panelId && document.querySelector(panelId);
    if (!pivot || !panel) return;
    const gridRect = pivot.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    api.movePivotPanel(pid, panelRect.left + window.scrollX, gridRect.top + window.scrollY);
}
