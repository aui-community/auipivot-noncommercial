// 제품 API, 데이터는 변경하지 않고, 현재 데모의 AUIPivot 테마 CSS만 교체합니다.
(function () {
	'use strict';
	const themes = {
		default: ['Default Theme', 'AUIPivot_style.css'],
		blue: ['Blue Theme', 'AUIPivot_blue_style.css'],
		modern: ['Modern Theme', 'AUIPivot_modern_style.css'],
		nova: ['Nova Theme', 'AUIPivot_nova_style.css'],
		dark: ['Dark Theme', 'AUIPivot_dark_style.css']
	};
	const script = document.currentScript;
	const root = new URL('./', script.src);
	const page = new URL(location.href);
	const requested = page.searchParams.get('theme');
	const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).filter((link) => /\/(?:AUIPivot|AUIGrid\.pivot)(?:_(?:blue|modern|nova|dark))?_style\.css$/.test(new URL(link.href).pathname));
	// 테마 전용 데모의 초기 CSS는 보존합니다. 알 수 없는 쿼리는 임의 경로로 사용하지 않습니다.
	const initial = script.dataset.theme || Object.keys(themes).find((key) => links[0] && new URL(links[0].href).pathname.replace('AUIGrid.pivot', 'AUIPivot').endsWith('/' + themes[key][1])) || 'default';
	const selected = Object.prototype.hasOwnProperty.call(themes, requested) ? requested : initial;
	// Plugin은 같은 폴더의 Grid 테마도 함께 바꿉니다. AUIPivot과 별도 원본 목록의 Grid는 그대로 둡니다.
	const gridLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).filter((link) => /\/js\/AUIGrid\/AUIGrid(?:_(?:blue|modern|nova|dark))?_style\.css$/.test(new URL(link.href).pathname));
	// 같은 CSS를 다시 지정하면 잠시 스타일이 해제되어 패널 높이를 잘못 측정할 수 있습니다.
	// 다른 테마를 요청한 경우에만 교체하고, demo.js가 load 완료 후 init을 실행하도록 알립니다.
	window.auiPivotDemoThemeReady = Promise.all(
		links.concat(gridLinks).map((link) => {
			const filename = gridLinks.includes(link) ? themes[selected][1].replace('AUIPivot', 'AUIGrid') : themes[selected][1].replace('AUIPivot', link.href.includes('AUIGrid.pivot') ? 'AUIGrid.pivot' : 'AUIPivot');
			const nextHref = new URL(filename, link.href).href;
			if (link.href === nextHref) return;
			return new Promise((resolve, reject) => {
				function finish(event) {
					link.removeEventListener('load', finish);
					link.removeEventListener('error', finish);
					if (event.type === 'load') resolve();
					else reject(new Error('테마 스타일을 불러오지 못했습니다. 페이지를 다시 열어주세요.'));
				}
				// 캐시 응답이 빠르더라도 완료 이벤트를 놓치지 않도록 주소 변경 전에 등록합니다.
				link.addEventListener('load', finish);
				link.addEventListener('error', finish);
				link.href = nextHref;
			});
		})
	);
	// DOMContentLoaded보다 먼저 실패해도 미처리 거부가 되지 않게 연결합니다.
	// 원래 Promise의 실패는 유지하므로 demo.js의 기존 오류 안내에서 처리됩니다.
	window.auiPivotDemoThemeReady.catch(() => {});

	// Nova의 기존 CSS 토큰을 그대로 사용합니다. 색상/모드 변경은 재집계 없이 즉시 적용합니다.
	function appendNovaControls(toolbar) {
		const storageKey = 'auipivot-demo-nova-mode';
		const colors = [
			['초록', '#16a34a'],
			['보라', '#4f46e5'],
			['하늘', '#0ea5e9'],
			['분홍', '#e11d48'],
			['주황', '#ea580c']
		];
		// 스타일도 동기적으로 배치하여 조작 영역의 높이가 패널 생성 이후 변하지 않게 합니다.
		// 선택기 내부로 범위를 제한해 제품 셀/다른 데모 버튼의 스타일은 유지합니다.
		// 투명 체크박스를 스위치 전체 크기로 겹쳐 마우스와 키보드 입력을 모두 받습니다.
		const style = document.createElement('style');
		style.textContent = `
            #demo-nova-controls{flex:0 0 100%;display:flex;flex-wrap:wrap;gap:12px;align-items:center;padding:12px 0;border-bottom:1px solid #e2e6ec;font-size:13px;box-sizing:border-box}
            #demo-nova-controls b{font-size:15px;margin-right:8px}
            #demo-nova-controls .nova-switch{display:inline-flex;align-items:center;gap:6px;cursor:pointer;position:relative;margin:0;font-weight:normal}
            #demo-nova-controls input{position:absolute;left:0;top:50%;transform:translateY(-50%);z-index:1;opacity:0;width:40px;height:22px;margin:0;cursor:pointer}
            #demo-nova-controls .nova-slider{position:relative;width:40px;height:22px;flex-shrink:0;border-radius:11px;background:#cbd5e1;transition:background .2s}
            #demo-nova-controls .nova-slider::before{content:'';position:absolute;top:2px;left:2px;width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:0 1px 2px #0004;transition:transform .2s}
            #demo-nova-controls input:checked + .nova-slider{background:var(--aui-accent,#4f46e5)}
            #demo-nova-controls input:checked + .nova-slider::before{transform:translateX(18px)}
            #demo-nova-controls input:focus-visible + .nova-slider,#demo-nova-controls button:focus-visible{outline:2px solid #334155;outline-offset:4px}
            #demo-nova-controls .nova-colors{display:inline-flex;gap:12px;align-items:center}
            #demo-nova-controls button{display:inline-block;box-sizing:content-box;width:22px;height:22px;min-width:0;min-height:0;padding:0;margin:0;border-radius:50%;border:2px solid #fff;box-shadow:0 0 0 1px #cbd5e1;cursor:pointer}
            #demo-nova-controls button[aria-pressed="true"]{box-shadow:0 0 0 2px #475569}
        `;
		document.head.appendChild(style);
		const controls = document.createElement('div');
		controls.id = 'demo-nova-controls';
		// 현재 페이지가 명시적으로 불러온 제품 CSS에 맞춰 제품명을 표시합니다.
		const productName = links.some(link => link.href.includes('AUIGrid.pivot')) ? 'AUIGrid Pivot' : 'AUIPivot';
		controls.innerHTML = '<b>' + productName + ', Nova Theme</b><label class="nova-switch"><input id="demo-nova-dark" type="checkbox" role="switch" aria-label="다크 모드 전환"><span class="nova-slider" aria-hidden="true"></span><span>다크 모드 전환</span></label><span>--aui-accent :</span>';
		const toggle = controls.querySelector('input');
		let saved;
		// 저장소 사용이 차단된 브라우저에서도 현재 페이지의 테마 조작은 정상 동작합니다.
		try {
			saved = localStorage.getItem(storageKey);
		} catch (_) {
			/* 저장하지 못하면 시스템 설정을 사용합니다. */
		}
		toggle.checked = saved === 'dark' || (saved !== 'light' && !!window.matchMedia?.('(prefers-color-scheme: dark)').matches);
		function applyMode() {
			if (toggle.checked) document.documentElement.setAttribute('data-aui-theme', 'dark');
			else document.documentElement.removeAttribute('data-aui-theme');
			// Nova 제품 CSS가 각 피벗/패널의 color-scheme을 적용합니다.
			// 문서 전체를 dark로 바꾸지 않아 기존 설명문의 흰 배경과 검정 글씨를 유지합니다.
		}
		toggle.addEventListener('change', function () {
			applyMode();
			try {
				localStorage.setItem(storageKey, toggle.checked ? 'dark' : 'light');
			} catch (_) {
				/* 현재 화면의 선택은 유지합니다. */
			}
		});
		const palette = document.createElement('span');
		palette.className = 'nova-colors';
		palette.setAttribute('role', 'group');
		palette.setAttribute('aria-label', '강조 색상');
		colors.forEach(([name, color]) => {
			const button = document.createElement('button');
			button.type = 'button';
			button.style.backgroundColor = color;
			button.title = name + ' ' + color;
			button.setAttribute('aria-label', name + ' 강조 색상');
			button.setAttribute('aria-pressed', 'false');
			button.addEventListener('click', function () {
				document.documentElement.style.setProperty('--aui-accent', color);
				palette.querySelectorAll('button').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
			});
			palette.appendChild(button);
		});
		controls.appendChild(palette);
		toolbar.appendChild(controls);
		applyMode();
	}

	// 탐색 링크와 선택기는 같은 줄에 놓고 Nova 추가 조작은 그 아래에 배치합니다.
	function mount() {
		if (document.getElementById('demo-theme-select')) return;
		const toolbar = document.createElement('div');
		toolbar.id = 'demo-theme-toolbar';
		const parent = script.parentElement;
		const inset = parent?.classList.contains('wrap') ? 10 : parent?.tagName === 'MAIN' ? 0 : 16;
		toolbar.style.cssText = 'display:flex;align-items:center;gap:8px;flex-shrink:0;white-space:nowrap;color:#333;font:14px/1.5 Arial,sans-serif';
		const header = document.createElement('div');
		header.id = 'demo-page-header';
		header.style.cssText = 'padding:12px ' + inset + 'px;margin:0 0 12px;background:#fff;color:#333;box-sizing:border-box;border-bottom:1px solid #e1e6ec';
		const row = document.createElement('div');
		row.id = 'demo-navigation-row';
		// 테마 선택을 마지막 탐색 링크 바로 옆에 놓습니다. 좁은 화면에서는 이 줄만 가로 스크롤합니다.
		row.style.cssText = 'display:flex;align-items:center;justify-content:flex-start;gap:24px;overflow-x:auto';
		const navigation = script.previousElementSibling;
		if (navigation?.tagName === 'NAV') {
			navigation.style.cssText = 'padding:0;margin:0;border:0;flex-shrink:0;white-space:nowrap;font-size:13px;line-height:1.7';
			row.appendChild(navigation);
		}
		const label = document.createElement('label');
		label.htmlFor = 'demo-theme-select';
		label.textContent = '테마 선택 :';
		const select = document.createElement('select');
		select.id = 'demo-theme-select';
		select.style.cssText = 'width:200px;max-width:100%;height:32px;padding:4px 8px;margin:0;font:inherit;color:#333;background:#fff;border:1px solid #999;border-radius:3px';
		Object.keys(themes).forEach((key) => select.add(new Option(themes[key][0], key)));
		select.value = selected;
		select.addEventListener('change', function () {
			// 샘플 고유 쿼리와 위치(#)는 유지하고 theme만 갱신합니다.
			const next = new URL(location.href);
			next.searchParams.set('theme', select.value);
			location.assign(next.href);
		});
		toolbar.append(label, select);
		row.appendChild(toolbar);
		header.appendChild(row);
		if (selected === 'nova') appendNovaControls(header);
		// 동기적으로 배치하여 뒤에서 생성하는 이동형 필드 패널도 확정된 위치를 사용합니다.
		if (parent && parent !== document.head) parent.insertBefore(header, script);
		else document.body.prepend(header);
	}
	// 본문 컨테이너 첫 줄에서 즉시 배치해야 이후 생성되는 이동형 패널의 문서 좌표도 정확합니다.
	// DOMContentLoaded까지 미루면 먼저 등록된 데모 init이 구한 좌표가 뒤늦게 어긋납니다.
	if (document.body) mount();
	else document.addEventListener('DOMContentLoaded', mount, { once: true });

	// 목차를 거쳐 다른 데모를 열어도 선택한 테마가 이어집니다. JSON, 외부 링크는 그대로 둡니다.
	document.addEventListener('click', function (event) {
		const anchor = event.target.closest && event.target.closest('a[href]');
		if (!anchor || anchor.hasAttribute('download') || anchor.getAttribute('href').startsWith('#')) return;
		const next = new URL(anchor.href, location.href);
		if (next.origin !== root.origin || !next.pathname.startsWith(root.pathname) || !/(?:\.html|\/)$/i.test(next.pathname)) return;
		if (!next.searchParams.has('theme')) next.searchParams.set('theme', selected);
		anchor.href = next.href;
	});
})();
