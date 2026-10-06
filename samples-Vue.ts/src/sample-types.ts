import type { DataItem, EventName } from 'aui-pivot';

// 두 정적 자동차 JSON에 공통으로 들어 있는 필드입니다.
export interface CarSale extends DataItem {
    REGION: string; NAME: string; MODEL: string; COLOR: string;
    PRICE: number; COUNT: number; TOTAL: number; DATE: string;
}
// 이벤트 객체 대신 화면에 표시할 짧은 기록만 보관합니다.
export interface EventEntry { id: number; type: EventName; time: string; message: string; }
