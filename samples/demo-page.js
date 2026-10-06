// 페이지별 피벗 생성 코드는 건드리지 않고 탐색, 예제 복사와 전체 소스 보기만 제공합니다.
(function () {
    'use strict';
    let announcementTimer;

    // 소스를 HTML로 실행하지 않고 텍스트로 넣은 뒤 문서와 같은 Prism 문법 강조를 적용합니다.
    function highlightCode(container, source, language) {
        const code = document.createElement('code');
        code.className = 'language-' + language;
        code.textContent = source;
        container.replaceChildren(code);
        if (window.Prism) window.Prism.highlightElement(code);
    }

    // 복사 실패 시에도 사용자가 직접 복사할 수 있도록 코드 텍스트를 선택합니다.
    function copyText(element, announce, keepWhitespace) {
        // 본문의 복사 알림만 잠시 표시하고, 대화상자의 안내는 계속 읽을 수 있게 둡니다.
        function showMessage(message) {
            announce.textContent = message;
            if (announce.classList.contains('demo-copy-announcement')) {
                clearTimeout(announcementTimer);
                announcementTimer = setTimeout(function () { announce.textContent = ''; }, 4500);
            }
        }
        function selectText() {
            const range = document.createRange();
            range.selectNodeContents(element);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            showMessage('코드를 선택했습니다. Ctrl+C 또는 ⌘C로 복사하세요.');
        }
        if (!navigator.clipboard) { selectText(); return; }
        const source = keepWhitespace ? element.textContent : element.textContent.trim();
        navigator.clipboard.writeText(source).then(function () {
            showMessage('코드를 복사했습니다.');
        }).catch(selectText);
    }

    // 설정 예제의 텍스트와 순서는 보존하며 제품 생성 전에 도구 모음을 배치합니다.
    function decorateExamples(announce) {
        document.querySelectorAll('.desc pre, .desc xmp').forEach(function (code) {
            // pre 안의 xmp는 부모에서 한 번만 처리하고, 독립 xmp는 속성과 텍스트를 보존합니다.
            if (!code.isConnected || code.closest('.demo-code-frame')) return;
            if (code.localName === 'xmp') {
                const pre = document.createElement('pre');
                Array.from(code.attributes).forEach(function (attribute) { pre.setAttribute(attribute.name, attribute.value); });
                pre.textContent = code.textContent;
                code.replaceWith(pre);
                code = pre;
            }
            const declared = (code.querySelector('code') || code).className.match(/language-([\w-]+)/);
            const language = declared ? declared[1] : (/^\s*</.test(code.textContent) ? 'markup' : 'javascript');
            let source = code.textContent;
            highlightCode(code, source, language);
            const frame = document.createElement('div');
            frame.className = 'demo-code-frame';
            const toolbar = document.createElement('div');
            toolbar.className = 'demo-code-toolbar';
            const label = document.createElement('span');
            label.textContent = code.getAttribute('aria-label') || '설정 코드';
            const copy = document.createElement('button');
            copy.type = 'button';
            copy.className = 'demo-copy-button';
            copy.textContent = '코드 복사';
            copy.setAttribute('aria-label', label.textContent + ' 복사');
            copy.addEventListener('click', function () { copyText(code, announce); });
            toolbar.append(label, copy);
            code.before(frame);
            frame.append(toolbar, code);
            code.tabIndex = 0;
            // 연산자 선택 등으로 예제 텍스트가 바뀔 때만 다시 강조합니다. 토큰 추가는 재처리하지 않습니다.
            new MutationObserver(function () {
                const updated = code.textContent;
                if (updated === source && code.firstElementChild && code.firstElementChild.localName === 'code') return;
                source = updated;
                highlightCode(code, source, language);
            }).observe(code, {childList: true, characterData: true, subtree: true});
        });
    }

    // HTML에 포함되며 생긴 공통 들여쓰기만 제거하고 JavaScript 자체의 깊이는 유지합니다.
    function extractJavaScript(source) {
        source = source.replace(/^(?:[ \t]*\r?\n)+/, '').replace(/(?:\r?\n[ \t]*)+$/, '');
        // 문법 분석이 없으면 원문을 보존합니다. 첫 줄만 trim하여 정렬을 깨뜨리지 않습니다.
        if (!window.Prism || !window.Prism.languages.javascript) return source;
        const literals = [];
        let offset = 0;
        function visit(token, insideLiteral) {
            if (typeof token === 'string') { offset += token.length; return; }
            if (Array.isArray(token)) { token.forEach(function (child) { visit(child, insideLiteral); }); return; }
            const literal = token.type === 'string' || token.type === 'template-string';
            const start = offset;
            visit(token.content, insideLiteral || literal);
            if (literal && !insideLiteral) literals.push({start: start, end: offset});
        }
        // 여러 줄 문자열과 템플릿 리터럴 안의 공백은 복사 후 실행 값이 달라지지 않게 보호합니다.
        visit(window.Prism.tokenize(source, window.Prism.languages.javascript), false);
        const lines = source.split('\n');
        let prefix;
        let position = 0;
        let literalIndex = 0;
        const protectedLines = lines.map(function (line) {
            while (literalIndex < literals.length && literals[literalIndex].end <= position) literalIndex++;
            const literal = literals[literalIndex];
            const protectedLine = !!literal && literal.start <= position && position < literal.end;
            if (!protectedLine && line.trim()) {
                const indentation = line.match(/^[ \t]*/)[0];
                if (prefix === undefined) prefix = indentation;
                else {
                    let length = 0;
                    while (length < prefix.length && prefix[length] === indentation[length]) length++;
                    prefix = prefix.slice(0, length);
                }
            }
            position += line.length + 1;
            return protectedLine;
        });
        return lines.map(function (line, index) {
            if (protectedLines[index]) return line;
            if (!line.trim()) return '';
            return line.slice((prefix || '').length);
        }).join('\n');
    }

    // 이 페이지가 받은 HTML과 HTML 안의 실행 JavaScript를 각각 확인할 수 있습니다.
    function setupSourceDialog() {
        const opener = document.getElementById('demo-open-source');
        if (!opener) return;
        const dialog = document.createElement('dialog');
        dialog.id = 'demo-source-dialog';
        dialog.className = 'demo-source-dialog';
        dialog.setAttribute('aria-labelledby', 'demo-source-title');
        // 고정 UI만 HTML로 작성하고, 읽어 온 소스는 아래에서 textContent로 표시합니다.
        dialog.innerHTML = '<form method="dialog"><h2 id="demo-source-title">데모 소스</h2><button class="demo-source-close" autofocus>닫기</button></form>' +
            '<div class="demo-source-toolbar"><div class="demo-source-options" role="group" aria-label="소스 종류">' +
            '<button type="button" data-source-kind="javascript" aria-pressed="true">실행 JavaScript</button>' +
            '<button type="button" data-source-kind="html" aria-pressed="false">HTML 전체</button></div>' +
            '<button type="button" class="demo-copy-button" id="demo-copy-source">소스 복사</button></div>' +
            '<pre class="demo-source-content" tabindex="0" aria-label="복사할 데모 소스"></pre>' +
            '<p class="demo-source-status" role="status"></p>' +
            '<p class="demo-source-help">제품 파일과 data 폴더를 준비하고 이 데모와 같은 상대 경로에서 사용하세요.</p>' +
            '<p class="demo-source-help"><button type="button" class="demo-source-close" id="demo-retry-source" hidden>다시 불러오기</button></p>';
        document.body.appendChild(dialog);
        const content = dialog.querySelector('.demo-source-content');
        const status = dialog.querySelector('.demo-source-status');
        const help = dialog.querySelector('.demo-source-help');
        const copy = dialog.querySelector('#demo-copy-source');
        const retry = dialog.querySelector('#demo-retry-source');
        const options = dialog.querySelectorAll('[data-source-kind]');
        const javascript = Array.from(document.scripts).filter(function (script) {
            return !script.src && (!script.type || script.type === 'text/javascript');
        }).map(function (script) { return extractJavaScript(script.textContent); }).filter(Boolean).join('\n\n');
        let kind = 'javascript';
        let sourceRequest;

        // 서버가 공통 include를 펼친 실제 응답을 사용해 PHP include 없는 HTML을 제공합니다.
        function readSource() {
            if (!sourceRequest) {
                sourceRequest = fetch(location.href).then(function (response) {
                    if (!response.ok) throw new Error('소스 요청 실패');
                    return response.text();
                }).catch(function (error) {
                    sourceRequest = null;
                    throw error;
                });
            }
            return sourceRequest;
        }
        function renderSource() {
            options.forEach(function (button) { button.setAttribute('aria-pressed', String(button.dataset.sourceKind === kind)); });
            retry.hidden = true;
            status.textContent = '';
            content.scrollTop = 0;
            content.scrollLeft = 0;
            if (kind === 'javascript') {
                help.textContent = '제품 파일과 피벗 표시 영역을 준비한 뒤 init()을 호출하세요. 이 코드는 현재 HTML의 실행 함수와 설정입니다.';
                highlightCode(content, javascript, 'javascript');
                copy.disabled = false;
                return;
            }
            help.textContent = '제품 파일과 data 폴더를 준비하고 이 데모와 같은 상대 경로에서 사용하세요.';
            copy.disabled = true;
            content.textContent = 'HTML 소스를 불러오는 중입니다.';
            readSource().then(function (source) {
                // 요청 중 다른 탭을 골랐다면 해당 탭의 표시와 복사 대상을 유지합니다.
                if (kind !== 'html') return;
                highlightCode(content, source, 'markup');
                copy.disabled = false;
            }).catch(function () {
                if (kind !== 'html') return;
                content.textContent = '';
                status.textContent = 'HTML 소스를 불러오지 못했습니다. 다시 시도하거나 실행 JavaScript를 확인하세요.';
                retry.hidden = false;
            });
        }
        options.forEach(function (button) {
            button.addEventListener('click', function () { kind = button.dataset.sourceKind; renderSource(); });
        });
        retry.addEventListener('click', renderSource);
        // 실행 코드는 화면에 보이는 공백까지 그대로 복사하고 전체 HTML의 기존 복사는 유지합니다.
        copy.addEventListener('click', function () { copyText(content, status, kind === 'javascript'); });
        opener.addEventListener('click', function () {
            // 파일명을 별도로 표시하지 않아도 소스 창에서 현재 데모를 식별할 수 있게 합니다.
            const title = document.querySelector('.demo-page-intro h1');
            document.getElementById('demo-source-title').textContent = title ? title.textContent : '데모 소스';
            // 다시 열어도 바로 적용할 실행 코드를 먼저 확인할 수 있도록 기본 탭을 선택합니다.
            kind = 'javascript';
            renderSource();
            dialog.showModal();
        });
        dialog.addEventListener('close', function () { opener.focus(); });
    }

    // 이 리스너는 demo.js보다 먼저 등록해 피벗이 최종 배치에서 크기와 위치를 계산하게 합니다.
    document.addEventListener('DOMContentLoaded', function () {
        if (!document.body.classList.contains('standalone-demo')) return;
        const title = document.querySelector('.demo-page-intro h1');
        if (title) document.title = title.textContent + ' | AUIPivot';
        const announce = document.createElement('p');
        announce.className = 'demo-copy-announcement';
        announce.setAttribute('role', 'status');
        document.body.appendChild(announce);
        decorateExamples(announce);
        setupSourceDialog();
    }, {once: true});
})();
