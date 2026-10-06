import { useEffect, useRef, useState } from 'react';
import Prism from 'prismjs';

// WebDemo와 같은 Prism 1.30 테마를 사용하고 실제 예제 언어를 강조합니다.
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';

const CodeBlock = ({ language = 'javascript', children }) => {
	const codeBlockRef = useRef(null);
	const [copyLabel, setCopyLabel] = useState('복사');

	useEffect(() => {
		if (codeBlockRef.current) Prism.highlightElement(codeBlockRef.current);
	}, [children, language]);

	// 토큰으로 분리된 화면에서도 원문 텍스트만 복사해 그대로 실행할 수 있게 합니다.
	const copyCode = () => {
		const code = codeBlockRef.current?.textContent || '';
		if (!navigator.clipboard) { setCopyLabel('복사할 수 없습니다'); return; }
		navigator.clipboard.writeText(code.trim()).then(() => setCopyLabel('복사 완료'), () => setCopyLabel('복사할 수 없습니다'));
	};

	return (
		<div className="sample-code-frame">
			<div className="sample-code-toolbar">
				<span>{language === 'none' ? '터미널' : language === 'typescript' ? 'TypeScript' : 'JavaScript'}</span>
				<button type="button" onClick={copyCode} aria-live="polite">{copyLabel}</button>
			</div>
			<pre tabIndex={0} aria-label="사용 예제 코드"><code className={`language-${language}`} ref={codeBlockRef}>{children}</code></pre>
		</div>
	);
};

export default CodeBlock;
