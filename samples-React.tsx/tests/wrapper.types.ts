import type * as IPivot from 'aui-pivot';
import { EventKind } from 'aui-pivot';
import AUIPivot from '../src/static/AUIPivot-React.tsx/AUIPivotReact';

declare const pivot: AUIPivot<{ PRICE: number }>;
// 새 메소드가 타입 패키지에 추가되면 컴포넌트 누락도 검사합니다.
const contract: IPivot.WrapperMethods<{ PRICE: number }> = pivot;
contract.setProp('layoutType', 'tableCellMerge');
contract.setProp({ wheelSensitivity: 2, useSmoothScroll: true });
contract.refresh();
contract.exportToXlsx({ fileName: '판매' });
contract.exportToXlsx(true, { fileName: '판매' });
contract.bind(EventKind.CellClick, event => { const row: number = event.rowIndex; return void row; });
contract.bind('pivotBegin', event => { const fields: string[] = event.rowFields; return fields.length > 0; });
contract.bind('contextMenu', () => false);
const operation = contract.registerCustomAggregator({
    id: 'COUNT_SUM', labelText: '판매 대수', version: 1,
    create() { return { sum: 0 }; },
    accumulate(state, value) { if (typeof value === 'number') state.sum += value; },
    merge(target, source) { target.sum += source.sum; },
    finalize(state) { return state.sum; }
});
contract.setValueFields([{ dataField: 'COUNT', operation }]);
const layout: IPivot.LayoutType | undefined = pivot.getProperty('layoutType');
void layout;
// 잘못된 이벤트 이름, 페이로드와 속성 값은 컴파일할 수 없어야 합니다.
// @ts-expect-error 존재하지 않는 이벤트입니다.
pivot.bind('unknownEvent', () => {});
pivot.bind('cellClick', event => {
    // @ts-expect-error 셀 이벤트에는 보고서 전체 필드 목록이 없습니다.
    console.log(event.rowFields);
});
// @ts-expect-error layoutType에는 정해진 세 문자열만 지정합니다.
pivot.setProp('layoutType', 'other');
// @ts-expect-error 생성 전용 속성은 setProp으로 변경하지 않습니다.
pivot.setProp('pivotPanelId', '#panel');
// @ts-expect-error 감도는 숫자입니다.
pivot.setProperty({ wheelSensitivity: '2' });
// 제네릭 원본 행의 필드 타입도 조회 결과에 보존됩니다.
const price: number | undefined = pivot.getSourceData()?.[0].PRICE;
void price;
// @ts-expect-error PRICE는 문자열이 아닙니다.
const wrongPrice: string | undefined = pivot.getSourceData()?.[0].PRICE;

// 새 옵션은 컴포넌트에 전달하며 엔진 pivotProps에는 넣지 않습니다.
import type { AUIPivotWrapperProps } from '../src/static/AUIPivot-React.tsx/AUIPivotReact';
const resizeOptions: AUIPivotWrapperProps = { resizeMode: 'container', resizeDelayTime: 100 };
// @ts-expect-error 지원하지 않는 감지 방식입니다.
const wrongResize: AUIPivotWrapperProps = { resizeMode: 'parent' };
void resizeOptions; void wrongResize;
