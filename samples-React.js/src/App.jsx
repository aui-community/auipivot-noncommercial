import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import logo from '/assets/auipivot-mark.svg';
import Home from '@/views/Home';
import TreeLayout from '@/samples/TreeLayout';
import TableLayout from '@/samples/TableLayout';
import TableMergeLayout from '@/samples/TableMergeLayout';
import WrapperMethods from '@/samples/WrapperMethods';

// 샘플 메뉴 리스트
const mainMenuList = [
	{ path: '/TreeLayout', name: 'TreeLayout', text: '피벗 출력 방식 - 트리(기본값)', element: <TreeLayout /> },
	{ path: '/TableLayout', name: 'TableLayout', text: '피벗 출력 방식 - 테이블', element: <TableLayout /> },
	{ path: '/TableMergeLayout', name: 'TableMergeLayout', text: '피벗 출력 방식 - 테이블 셀병합', element: <TableMergeLayout /> },
	// 기존 출력 방식 예제 다음에 컴포넌트 메소드와 이벤트 활용 예제를 표시합니다.
	{ path: '/WrapperMethods', name: 'WrapperMethods', text: '메소드 및 이벤트 활용', element: <WrapperMethods /> }
];


// WebDemo와 같은 헤더와 상단 탐색을 사용하고 기존 경로와 데모 순서를 유지합니다.
function App() {
	return (
		<BrowserRouter basename={import.meta.env.BASE_URL}>
			<div className="sample-app">
				<a className="sample-skip-link" href="#sample-content">본문으로 건너뛰기</a>
				<header className="sample-header">
					<div className="sample-header-inner">
						<NavLink to="/" className="sample-brand" aria-label="AUIPivot HOME">
							<img src={logo} alt="" width="44" height="44" />
							<span className="sample-brand-copy"><strong>AUIPivot</strong><span>React + JavaScript</span></span>
						</NavLink>
						<div className="sample-header-links">
							<a href="https://www.auisoft.net/price-pivot.html">라이선스 안내</a>
							<a className="sample-download" href="https://www.auisoft.net/dcenter.html">평가판 다운로드</a>
						</div>
					</div>
				</header>
				<nav className="sample-nav" aria-label="샘플 메뉴">
					<ul className="nav-menu">
						<li><NavLink to="/" end className={({ isActive }) => isActive ? 'nav-item-active' : ''}>HOME</NavLink></li>
						{mainMenuList.map((item, index) => (
							<li key={item.name}><NavLink to={item.path} className={({ isActive }) => isActive ? 'nav-item-active' : ''}>
								<span className="sample-menu-number">{index + 1}.</span> {item.text}
							</NavLink></li>
						))}
					</ul>
				</nav>
				<main id="sample-content" className="sample-main" tabIndex={-1}>
					<Routes>
						<Route path="/" element={<Home />} />
						{mainMenuList.map(({ name, path, element }) => <Route key={name} path={path} element={element} />)}
					</Routes>
				</main>
				<footer className="sample-footer"><span>AUIPivot 2.7</span><span>Copyright © AUISoft Co., Ltd.</span></footer>
			</div>
		</BrowserRouter>
	);
}

export default App;
