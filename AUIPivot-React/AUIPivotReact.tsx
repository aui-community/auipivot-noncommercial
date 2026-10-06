/**
 * AUIPivotReact.tsx v1.2.20261006
 * Based on AUIPivot v2.7.0
 * Copyright © AUISoft Co., Ltd.
 * www.auisoft.net
 */
import React from 'react';
import type * as IPivot from 'aui-pivot';

// 프로젝트 경로에 맞게 바꾸세요
import '../AUIPivot/AUIPivot';
import '../AUIPivot/messages/AUIPivot.messages.kr';
import '../AUIPivot/AUIPivotLicense';
import '../AUIPivot/AUIPivot_style.css';

// 이 아래 소스는 절대 수정하지 마세요.
const $ag = typeof window === 'undefined' ? {} as IPivot.API : window.AUIPivot;

// Row는 원본 데이터를 조회할 때 반환할 행 타입입니다.
class AUIPivot<Row extends object = IPivot.DataItem> extends React.Component<IPivot.WrapperProps> implements IPivot.WrapperMethods<Row> {
	private uuid: string;
	private id: string;
	private pid: IPivot.PivotID;
	private timerId: ReturnType<typeof setTimeout> | null;
	private __auiMountGeneration: number;
	private __auiAnimationFrameId: number | null;
	private get __api(): IPivot.API<Row> { return $ag as IPivot.API<Row>; }
	static defaultProps = {
		name: '', autoResize: true, resizeDelayTime: 300, pivotProps: {},
		createOnMounted: true, waitPortalRendering: false
	};
	constructor(props: IPivot.WrapperProps) {
		super(props);
		//crypto 로 uuid 생성함. (유니크 값)
		this.uuid = window.crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
		this.id = 'aui-pivot-wrap-' + (this.props.name !== '' ? this.props.name : this.uuid);
		this.pid = '#' + this.id;
		this.timerId = null;
		this.__auiMountGeneration = 0;
		this.__auiAnimationFrameId = null;
		this.__globalResizeHandler = this.__globalResizeHandler.bind(this);
	}

	componentDidMount() {
		const generation = ++this.__auiMountGeneration;
		if (!this.props.createOnMounted) return;
		const initPivot = () => {
			if (generation !== this.__auiMountGeneration) return;
			this.__auiAnimationFrameId = null;
			$ag.create(this.pid, this.props.pivotProps);
			if (generation !== this.__auiMountGeneration) return;
			this.__setupGlobalResize();
		};
		// Portal의 영역이 준비될 때까지 기다려야 하는 경우에만 Grid처럼 한 프레임 대기합니다.
		if (this.props.waitPortalRendering) {
			this.__auiAnimationFrameId = window.requestAnimationFrame(initPivot);
		} else {
			initPivot();
		}
	}

	componentWillUnmount() {
		this.__resetGlobalReisze();
		if ($ag.isCreated(this.pid)) $ag.destroy(this.pid, true);
	}

	render() {
		return <div id={this.id}></div>;
	}

	__setupGlobalResize() {
		if (!this.props.autoResize) return;
		window.addEventListener('resize', this.__globalResizeHandler);
	}

	__resetGlobalReisze() {
		// 해제된 컴포넌트의 생성과 resize 예약이 StrictMode 재생성에 간섭하지 않게 합니다.
		this.__auiMountGeneration++;
		if (this.__auiAnimationFrameId !== null) {
			window.cancelAnimationFrame(this.__auiAnimationFrameId);
			this.__auiAnimationFrameId = null;
		}
		if (this.timerId !== null) {
			clearTimeout(this.timerId);
			this.timerId = null;
		}
		window.removeEventListener('resize', this.__globalResizeHandler);
	}

	__globalResizeHandler() {
		const that = this;
		const generation = this.__auiMountGeneration;
		if (that.timerId !== null) clearTimeout(that.timerId);
		that.timerId = setTimeout(function () {
			if (generation !== that.__auiMountGeneration) return;
			that.timerId = null;
			if ($ag.isCreated(that.pid)) {
				try {
					$ag.resize(that.pid);
				} catch (e) {}
			}
		}, that.props.resizeDelayTime);
	}

	getPID() {
		return this.pid;
	}
	create(props?: IPivot.Props) {
		$ag.create(this.pid, props);
		this.__setupGlobalResize();
		return this.pid;
	}
	// 공개 API의 인수, 반환값과 이벤트 타입을 그대로 연결합니다.
	bind<K extends IPivot.EventName>(name: K | readonly K[], handler: IPivot.EventHandler<K>): void {
		return this.__api.bind(this.pid, name, handler);
	}
	changeHeatmapColors(dataField: string, opName: IPivot.Operation, colors: string[]): void {
		return this.__api.changeHeatmapColors(this.pid, dataField, opName, colors);
	}
	clearFilterAll(): void {
		return this.__api.clearFilterAll(this.pid);
	}
	clearPivot(): void {
		return this.__api.clearPivot(this.pid);
	}
	clearPivotFieldsAll(): void {
		return this.__api.clearPivotFieldsAll(this.pid);
	}
	clearSortingAll(): void {
		return this.__api.clearSortingAll(this.pid);
	}
	closeFilterLayer(): void {
		return this.__api.closeFilterLayer(this.pid);
	}
	collapseAll(): void {
		return this.__api.collapseAll(this.pid);
	}
	collapseAllColumns(): void {
		return this.__api.collapseAllColumns(this.pid);
	}
	createPivotPanel(props?: IPivot.PanelProps): void {
		return this.__api.createPivotPanel(this.pid, props);
	}
	createSlicer(container: string, options: IPivot.SlicerOptions): string | undefined {
		return this.__api.createSlicer(this.pid, container, options);
	}
	destroy(includePanelParent?: boolean): void {
		return this.__api.destroy(this.pid, includePanelParent);
	}
	destroyPivotPanel(includeParent?: boolean): void {
		return this.__api.destroyPivotPanel(this.pid, includeParent);
	}
	destroySlicer(slicerID: string): void {
		return this.__api.destroySlicer(this.pid, slicerID);
	}
	expandAll(): void {
		return this.__api.expandAll(this.pid);
	}
	expandAllColumns(): void {
		return this.__api.expandAllColumns(this.pid);
	}
	exportToCsv(props?: IPivot.CsvExportOptions): void {
		return this.__api.exportToCsv(this.pid, props);
	}
	exportToPdf(props: IPivot.PdfExportOptions): void {
		return this.__api.exportToPdf(this.pid, props);
	}
	exportToTxt(props?: IPivot.CsvExportOptions): void {
		return this.__api.exportToTxt(this.pid, props);
	}
	exportToXlsx(...args: [props?: IPivot.XlsxExportOptions] | [exportWithStyle: boolean, props?: IPivot.XlsxExportOptions]): void {
		// 내보내기 속성만 지정하는 기존 형식도 지원합니다.
		if (typeof args[0] === 'boolean') this.__api.exportToXlsx(this.pid, args[0], args[1]);
		else this.__api.exportToXlsx(this.pid, args[0]);
	}
	getActiveGrid(): IPivot.PivotID | null {
		return this.__api.getActiveGrid();
	}
	getAliasByDataField(dataField: string): string | undefined {
		return this.__api.getAliasByDataField(this.pid, dataField);
	}
	getCellDetailList(rowIndex: number, columnIndex: number): Row[] {
		return this.__api.getCellDetailList(this.pid, rowIndex, columnIndex);
	}
	getColumnFields(): string[] | null {
		return this.__api.getColumnFields(this.pid);
	}
	getColumnFormatString(): Record<string, Omit<IPivot.FieldFormat, 'dataField'>> | null | undefined {
		return this.__api.getColumnFormatString(this.pid);
	}
	getColumnIndexByDataField(dataField: string): number | undefined {
		return this.__api.getColumnIndexByDataField(this.pid, dataField);
	}
	getColumnInfoList(): IPivot.ColumnInfo[] | null {
		return this.__api.getColumnInfoList(this.pid);
	}
	getColumnItemByDataField(dataField: string): IPivot.ColumnInfo | null | undefined {
		return this.__api.getColumnItemByDataField(this.pid, dataField);
	}
	getColumnLayout(): IPivot.ColumnInfo[] | null {
		return this.__api.getColumnLayout(this.pid);
	}
	getCreatedGridAll(): IPivot.PivotID[] {
		return this.__api.getCreatedGridAll();
	}
	getCustomAggregators(): IPivot.CustomAggregatorInfo[] | null {
		return this.__api.getCustomAggregators(this.pid);
	}
	getCustomValueOrders(): IPivot.CustomValueOrder[] | null {
		return this.__api.getCustomValueOrders(this.pid);
	}
	getDataFieldByColumnIndex(columnIndex: number): string | undefined {
		return this.__api.getDataFieldByColumnIndex(this.pid, columnIndex);
	}
	getDataFieldList(all?: boolean): string[] | undefined {
		return this.__api.getDataFieldList(this.pid, all);
	}
	getDerivedFields(): IPivot.DerivedField[] | null {
		return this.__api.getDerivedFields(this.pid);
	}
	getDerivedFieldValue(sourceRow: Row, dataField: string): number | string | null | undefined {
		return this.__api.getDerivedFieldValue(this.pid, sourceRow, dataField);
	}
	getDimensionValues(rowIndex: number, columnIndex: number): IPivot.DimensionValues | null {
		return this.__api.getDimensionValues(this.pid, rowIndex, columnIndex);
	}
	getDisplayOrderRules(): IPivot.SortField[] | null {
		return this.__api.getDisplayOrderRules(this.pid);
	}
	getExceptSumRowFields(): string[] | null {
		return this.__api.getExceptSumRowFields(this.pid);
	}
	getFieldAlias(): IPivot.FieldAliases | null {
		return this.__api.getFieldAlias(this.pid);
	}
	getFilterCache(): IPivot.FilterCache {
		return this.__api.getFilterCache(this.pid);
	}
	getFilterFields(): string[] | null {
		return this.__api.getFilterFields(this.pid);
	}
	getFitColumnSizeList(fitToGrid?: boolean): number[] {
		return this.__api.getFitColumnSizeList(this.pid, fitToGrid);
	}
	getFooterData(): IPivot.FooterData[] {
		return this.__api.getFooterData(this.pid);
	}
	getItemByRowIndex(rowIndex: number): IPivot.DataItem | null | undefined {
		return this.__api.getItemByRowIndex(this.pid, rowIndex);
	}
	getMonthText(monthCode: string): string {
		return this.__api.getMonthText(this.pid, monthCode);
	}
	getPivotData(): IPivot.DataItem[] {
		return this.__api.getPivotData(this.pid);
	}
	getPivotPanelState(): 'shown' | 'hidden' | undefined {
		return this.__api.getPivotPanelState(this.pid);
	}
	getProp<K extends keyof IPivot.Props>(name: K): IPivot.Props[K] {
		return this.__api.getProp(this.pid, name);
	}
	getProperty<K extends keyof IPivot.Props>(name: K): IPivot.Props[K] {
		return this.__api.getProperty(this.pid, name);
	}
	getReportDefinition(): IPivot.PivotReportDefinitionV3 | null {
		return this.__api.getReportDefinition(this.pid);
	}
	getRowCount(): number {
		return this.__api.getRowCount(this.pid);
	}
	getRowFields(): string[] | null {
		return this.__api.getRowFields(this.pid);
	}
	getRowFormatString(): Record<string, Omit<IPivot.FieldFormat, 'dataField'>> | null | undefined {
		return this.__api.getRowFormatString(this.pid);
	}
	getSelectedIndex(): [number, number] {
		return this.__api.getSelectedIndex(this.pid);
	}
	getSlicerSelection(slicerID: string): IPivot.SlicerValue[] | null | undefined {
		return this.__api.getSlicerSelection(this.pid, slicerID);
	}
	getSourceData(): Row[] | undefined {
		return this.__api.getSourceData(this.pid);
	}
	getSourceItemByValue(dataField: string, value: unknown): Row | null {
		return this.__api.getSourceItemByValue(this.pid, dataField, value);
	}
	getSourceItemsByValue(dataField: string, value: unknown): Row[] | null {
		return this.__api.getSourceItemsByValue(this.pid, dataField, value);
	}
	getTreeTotalDepth(): number {
		return this.__api.getTreeTotalDepth(this.pid);
	}
	getValidLocation(): string {
		return this.__api.getValidLocation();
	}
	getValidLocationAll(): string[] {
		return this.__api.getValidLocationAll();
	}
	getValueFields(): IPivot.ValueField[] | null {
		return this.__api.getValueFields(this.pid);
	}
	getVisualAnalytics(): IPivot.VisualAnalyticsOptions[] | null {
		return this.__api.getVisualAnalytics(this.pid);
	}
	hidePivotPanel(): void {
		return this.__api.hidePivotPanel(this.pid);
	}
	isAvailabePdf(): boolean {
		return this.__api.isAvailabePdf();
	}
	isAvailableLocalDownload(): boolean {
		return this.__api.isAvailableLocalDownload();
	}
	isCreated(): boolean {
		return this.__api.isCreated(this.pid);
	}
	isCreatedPivotPanel(): boolean {
		return this.__api.isCreatedPivotPanel(this.pid);
	}
	isFilteredPivot(): boolean {
		return this.__api.isFilteredPivot(this.pid);
	}
	movePivotPanel(x: number, y: number): void {
		return this.__api.movePivotPanel(this.pid, x, y);
	}
	refresh(): void {
		return this.__api.refresh(this.pid);
	}
	registerCustomAggregator<State extends object>(definition: IPivot.CustomAggregatorDefinition<State>): IPivot.CustomOperationId {
		return this.__api.registerCustomAggregator(this.pid, definition);
	}
	removeAjaxLoader(): void {
		return this.__api.removeAjaxLoader(this.pid);
	}
	removeInfoMessage(): void {
		return this.__api.removeInfoMessage(this.pid);
	}
	resize(width?: number, height?: number): void {
		return this.__api.resize(this.pid, width, height);
	}
	resizePivotPanel(width?: number, height?: number): void {
		return this.__api.resizePivotPanel(this.pid, width, height);
	}
	setColumnFields(fields: string | string[]): void {
		return this.__api.setColumnFields(this.pid, fields);
	}
	setColumnFormatString(formats: IPivot.FieldFormat[]): void {
		return this.__api.setColumnFormatString(this.pid, formats);
	}
	setColumnSizeList(sizes: Array<number | string | null | undefined>): void {
		return this.__api.setColumnSizeList(this.pid, sizes);
	}
	setCustomValueOrders(orders: IPivot.CustomValueOrder[]): void {
		return this.__api.setCustomValueOrders(this.pid, orders);
	}
	setDataType(types: IPivot.FieldDataTypes): void {
		return this.__api.setDataType(this.pid, types);
	}
	setDateFormatString(formats: Record<string, string>): void {
		return this.__api.setDateFormatString(this.pid, formats);
	}
	setDateInputFormat(formatString: string): void {
		return this.__api.setDateInputFormat(this.pid, formatString);
	}
	setDateTypeField(field: string | null): void {
		return this.__api.setDateTypeField(this.pid, field);
	}
	setDerivedFields(fields: IPivot.DerivedField[]): void {
		return this.__api.setDerivedFields(this.pid, fields);
	}
	setDisplayOrderRules(rules: IPivot.SortField[]): void {
		return this.__api.setDisplayOrderRules(this.pid, rules);
	}
	setExceptFields(fields: string | string[]): void {
		return this.__api.setExceptFields(this.pid, fields);
	}
	setExceptSumRowFields(fields: string[]): void {
		return this.__api.setExceptSumRowFields(this.pid, fields);
	}
	setFieldAlias(aliases: IPivot.FieldAliases): void {
		return this.__api.setFieldAlias(this.pid, aliases);
	}
	// 필드 그룹과 표시 순서를 설정하고 독립 사본을 조회합니다.
	setFieldLayout(layout: IPivot.FieldLayoutNode[]): void {
		this.__api.setFieldLayout(this.pid, layout);
	}
	getFieldLayout(): IPivot.FieldLayoutNode[] | null {
		return this.__api.getFieldLayout(this.pid);
	}
	setFieldOrder(fields: string[]): void {
		return this.__api.setFieldOrder(this.pid, fields);
	}
	setFilterCache(cache: IPivot.FilterCache): void {
		return this.__api.setFilterCache(this.pid, cache);
	}
	setFilterFields(fields: string | string[]): void {
		return this.__api.setFilterFields(this.pid, fields);
	}
	setGridData(rows: Row | Row[]): void {
		return this.__api.setGridData(this.pid, rows);
	}
	setHeatmapColors(dataField: string, opName: IPivot.Operation, colors: string[]): void {
		return this.__api.setHeatmapColors(this.pid, dataField, opName, colors);
	}
	setMaxWidthOfRowFields(widths: Record<string, number>): void {
		return this.__api.setMaxWidthOfRowFields(this.pid, widths);
	}
	setProp<K extends keyof IPivot.MutableProps>(...args: [name: K, value: IPivot.MutableProps[K]] | [properties: IPivot.MutableProps]): void {
		// 단일 속성과 여러 속성의 호출 형식을 그대로 전달합니다.
		if (args.length === 1) this.__api.setProp(this.pid, args[0]);
		else this.__api.setProp(this.pid, args[0], args[1]);
	}
	setProperty<K extends keyof IPivot.MutableProps>(...args: [name: K, value: IPivot.MutableProps[K]] | [properties: IPivot.MutableProps]): void {
		// 단일 속성과 여러 속성의 호출 형식을 그대로 전달합니다.
		if (args.length === 1) this.__api.setProperty(this.pid, args[0]);
		else this.__api.setProperty(this.pid, args[0], args[1]);
	}
	setReportDefinition(report: IPivot.PivotReportDefinition): void {
		return this.__api.setReportDefinition(this.pid, report);
	}
	setRowDimStyleFunction(callback: IPivot.RowDimensionStyleFunction | null): void {
		return this.__api.setRowDimStyleFunction(this.pid, callback);
	}
	setRowFields(fields: string | string[]): void {
		return this.__api.setRowFields(this.pid, fields);
	}
	setRowFormatString(formats: IPivot.FieldFormat[]): void {
		return this.__api.setRowFormatString(this.pid, formats);
	}
	setSelectionByIndex(rowIndex: number, columnIndex?: number): void {
		return this.__api.setSelectionByIndex(this.pid, rowIndex, columnIndex);
	}
	setSlicerSelection(slicerID: string, values: IPivot.SlicerValue[] | null): void {
		return this.__api.setSlicerSelection(this.pid, slicerID, values);
	}
	setSorting(fields: IPivot.SortField | IPivot.SortField[], onlyLastDepthSorting?: boolean): void {
		return this.__api.setSorting(this.pid, fields, onlyLastDepthSorting);
	}
	setValueFields(fields: IPivot.ValueField | IPivot.ValueField[]): void {
		return this.__api.setValueFields(this.pid, fields);
	}
	setVisualAnalytics(definitions: IPivot.VisualAnalyticsOptions[]): void {
		return this.__api.setVisualAnalytics(this.pid, definitions);
	}
	showAjaxLoader(): void {
		return this.__api.showAjaxLoader(this.pid);
	}
	showInfoMessage(messageHTML: string): void {
		return this.__api.showInfoMessage(this.pid, messageHTML);
	}
	showItemsOnDepth(depth: number): void {
		return this.__api.showItemsOnDepth(this.pid, depth);
	}
	showPivotPanel(): void {
		return this.__api.showPivotPanel(this.pid);
	}
	unbind<K extends IPivot.EventName>(name: K | readonly K[], handler?: IPivot.EventHandler<K> | null): void {
		return this.__api.unbind(this.pid, name, handler);
	}
	unload(): void {
		return this.__api.unload(this.pid);
	}
	updatePivot(): void {
		return this.__api.updatePivot(this.pid);
	}
}
const apUtils = {
	// 컴포넌트 생성 전에도 사용할 수 있는 공개 조회 함수를 제공합니다.
	isCreated: $ag.isCreated,
	getActiveGrid: $ag.getActiveGrid,
	getCreatedGridAll: $ag.getCreatedGridAll,
	releaseDate: $ag.releaseDate,
	version: $ag.version
};

export default AUIPivot;
export { apUtils };
