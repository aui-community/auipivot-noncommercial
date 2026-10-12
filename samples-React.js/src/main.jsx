import './index.css';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// 샘플 전체에 공통 스타일을 적용하고 메뉴와 개별 데모를 표시할 React 루트를 연결합니다.
createRoot(document.getElementById('root')).render(<App />);
