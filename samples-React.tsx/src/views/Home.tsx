import 'react';
import CodeBlock from '@/views/CodeBlock';
import TreeLayoutCode from '@/samples/TreeLayout.tsx?raw';
const Home = () => {
	return (
		<div className="home-main">
			<h1 className="home-title">AUIPivot for React + TypeScript</h1>
			<p>자바스크립트 라이브러리 중 하나인 React.js 에서 AUIPivot 를 어떻게 사용 할 수 있는지를 보여주는 데모입니다.</p>
			<p>
				AUIPivot 에서 지원하는 모든 기능에 대한 데모를 보고자 한다면{' '}
				<a
					href="https://www.auisoft.net/demo/auipivot"
					className="link-is-link"
				>
					여기{' '}
				</a>
				를 클릭하세요.
			</p>
			<p>본 데모는 React + TypeScript + Vite 환경에서 다음 의존도로 작성되었습니다.</p>
			<p>타입 정의와 이벤트 상수는 npm의 <code>aui-pivot</code> 패키지를 사용합니다.</p>
			{/* 최신 타입 설치와 기존 잠금 파일 갱신 명령을 구분해 안내합니다. */}
			<CodeBlock language="none">npm install aui-pivot@latest</CodeBlock>
			<p>이 샘플은 <code>latest</code> 태그를 사용합니다. 최신 버전으로 갱신하려면 <code>npm update aui-pivot</code>을 실행하세요.</p>
			{/* HOME의 기존 안내와 예제는 유지하고 의존성 영역만 카드로 구분합니다. */}
			<div className="home-dependencies">
				<section className="dependency-card">
					<h2>Dependencies</h2>
					<ul>
						<li>
							<strong>file-saver</strong>: ^2.0.5
						</li>
						<li>
							<strong>aui-pivot</strong>: latest
						</li>
						<li>
							<strong>react</strong>: ^19.1.0
						</li>
						<li>
							<strong>react-dom</strong>: ^19.1.0
						</li>
						<li>
							<strong>react-router-dom</strong>: ^7.7.1
						</li>
						<li>
							<strong>prismjs</strong>: ^1.30.0
						</li>
					</ul>
				</section>
				<section className="dependency-card">
					<h2>Dev Dependencies</h2>
					<ul>
						<li><strong>typescript</strong>: ~5.9.3</li>
						<li>
							<strong>@vitejs/plugin-react</strong>: ^4.6.0
						</li>
						<li>
							<strong>vite</strong>: ^7.0.4
						</li>
					</ul>
				</section>
			</div>
			<h2 className="headline">HOW TO CODE</h2>
			<p className="sub-headline"> React 환경에서 다음처럼 코딩하여 AUIPivot 사용이 가능합니다. </p>
			<h3>이 프로젝트 전체 소스는 Samples/auipivot-react-tsx-samples 폴더에 존재합니다.</h3>
			<div className="codeblock-wrap">
				<CodeBlock language="typescript">{TreeLayoutCode} </CodeBlock>
			</div>
			<p>
				<a
					href="https://www.auisoft.net/demo/auipivot"
					className="link-is-link"
				>
					일반 Javascript 환경의 데모 보러 가기
				</a>
			</p>
		</div>
	);
};

export default Home;
