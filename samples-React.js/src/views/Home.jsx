import 'react';
import CodeBlock from '@/views/CodeBlock';
import TreeLayoutCode from '@/samples/TreeLayout.jsx?raw';
const Home = () => {
	return (
		<div className="home-main">
			<h1 className="home-title">AUIPivot for React.js</h1>
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
			<p>본 데모는 React.js + Vite 환경에서 다음 의존도로 작성되었습니다.</p>
			{/* HOME의 기존 안내와 예제는 유지하고 의존성 영역만 카드로 구분합니다. */}
			<div className="home-dependencies">
				<section className="dependency-card">
					<h2>Dependencies</h2>
					<ul>
						<li>
							<strong>file-saver</strong>: ^2.0.5
						</li>
						<li>
							<strong>prop-types</strong>: ^15.8.1
						</li>
						<li>
							<strong>react</strong>: ^19.1.0
						</li>
						<li>
							<strong>react-dom</strong>: ^19.1.0,
						</li>
						<li>
							<strong>react-router-dom</strong>: ^7.7.1
						</li>
						<li>
							<strong>vue-router</strong>: ^4.5.1
						</li>
					</ul>
				</section>
				<section className="dependency-card">
					<h2>Dev Dependencies</h2>
					<ul>
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
			<h3>이 프로젝트 전체 소스는 정품(또는 평가판)의 ROOT/samples-React.js 폴더에 존재합니다.</h3>
			<div className="codeblock-wrap">
				<CodeBlock language="javascript">{TreeLayoutCode} </CodeBlock>
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
