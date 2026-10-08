<template>
	<div v-bind:id="id"></div>
</template>
<script lang="ts">
	/**
	 * AUIPivotT.vue for Vue.js v1.2.20261008
	 * Based on AUIPivot v2.7.0
	 * Copyright © AUISoft Co., Ltd.
	 * www.auisoft.net
	 */
	import { defineComponent, type PropType } from 'vue';
	import type * as IPivot from 'aui-pivot';
	type Row = IPivot.DataItem;
	// 프로젝트 경로에 맞게 바꾸세요
	import '../AUIPivot/AUIPivot';
	import '../AUIPivot/messages/AUIPivot.messages.kr';
	import '../AUIPivot/AUIPivotLicense';
	import '../AUIPivot/AUIPivot_style.css';

	// 이 아래 소스는 절대 수정하지 마세요.
	const $ag = typeof window === 'undefined' ? {} as IPivot.API : window.AUIPivot;

	// 호스트 DIV의 크기만 관찰하고, 해제된 관찰 알림이 새 피벗에 간섭하지 않게 합니다.
	function createContainerResize(getPID: () => string, getDelay: () => number) {
		let observer: ResizeObserver | null = null;
		let host: HTMLElement | null = null;
		let timer: ReturnType<typeof setTimeout> | null = null;
		let frame: number | null = null;
		let generation = 0, width = -1, height = -1;
		function stop() {
			generation++;
			if (observer) observer.disconnect();
			observer = null;
			window.removeEventListener('resize', schedule);
			if (timer !== null) clearTimeout(timer);
			if (frame !== null) window.cancelAnimationFrame(frame);
			timer = frame = null;
			host = null;
			width = height = -1;
		}
		function schedule() {
			if (!host) return;
			const current = generation;
			if (timer !== null) clearTimeout(timer);
			if (frame !== null) window.cancelAnimationFrame(frame);
			frame = null;
			// 연속 알림을 지정한 지연 시간으로 합친 뒤 한 프레임에서 크기를 반영합니다.
			timer = setTimeout(() => {
				if (current !== generation) return;
				timer = null;
				frame = window.requestAnimationFrame(() => {
					if (current !== generation || !host) return;
					frame = null;
					const pid = getPID();
					if (!host.isConnected || document.getElementById(pid.slice(1)) !== host || !$ag.isCreated(pid)) return;
					const nextWidth = host.offsetWidth, nextHeight = host.offsetHeight;
					// 숨겨진 영역은 다시 나타났을 때 같은 크기라도 재측정합니다.
					if (nextWidth <= 5 || nextHeight <= 5) { width = height = -1; return; }
					if (nextWidth === width && nextHeight === height) return;
					width = nextWidth;
					height = nextHeight;
					$ag.resize(pid);
					// 데이터에 따라 엔진이 높이를 조절한 결과는 새 변경으로 반복 처리하지 않습니다.
					if (current === generation && host) { width = host.offsetWidth; height = host.offsetHeight; }
				});
			}, getDelay());
		}
		function start() {
			const target = document.getElementById(getPID().slice(1));
			if (!target || host === target) return;
			stop();
			host = target;
			const current = generation;
			if (typeof window.ResizeObserver === 'function') {
				observer = new window.ResizeObserver(() => { if (current === generation) schedule(); });
				observer.observe(target, { box: 'border-box' });
			} else {
				// 관찰 API가 없는 환경에서는 기존 창 크기 이벤트로 대체합니다.
				window.addEventListener('resize', schedule);
			}
			schedule();
		}
		// 네이티브 핸들은 함수 내부에 두고, Vue에서도 프록시가 되지 않는 제어기만 노출합니다.
		return Object.freeze({ start, stop });
	}

	export default defineComponent({
		name: 'AUIPivot',
		// 템플릿 이벤트에서도 이벤트별 페이로드 타입을 제공합니다.
		emits: {
			cellClick: (_event: IPivot.EventMap['cellClick']) => true,
			cellDoubleClick: (_event: IPivot.EventMap['cellDoubleClick']) => true,
			columnStateChange: (_event: IPivot.EventMap['columnStateChange']) => true,
			contextMenu: (_event: IPivot.EventMap['contextMenu']) => true,
			footerClick: (_event: IPivot.EventMap['footerClick']) => true,
			footerDoubleClick: (_event: IPivot.EventMap['footerDoubleClick']) => true,
			headerClick: (_event: IPivot.EventMap['headerClick']) => true,
			hScrollChange: (_event: IPivot.EventMap['hScrollChange']) => true,
			pivotBegin: (_event: IPivot.EventMap['pivotBegin']) => true,
			pivotComplete: (_event: IPivot.EventMap['pivotComplete']) => true,
			pivotPanelHide: (_event: IPivot.EventMap['pivotPanelHide']) => true,
			pivotPanelShow: (_event: IPivot.EventMap['pivotPanelShow']) => true,
			sorting: (_event: IPivot.EventMap['sorting']) => true,
			treeOpenChange: (_event: IPivot.EventMap['treeOpenChange']) => true,
			vScrollChange: (_event: IPivot.EventMap['vScrollChange']) => true
		},
		props: {
			name: {
				type: String,
				default: ''
			},
			autoResize: {
				type: Boolean,
				default: true
			},
			// 생성 시 자동 감지 대상을 선택합니다. pivotProps에 넣지 않습니다.
			resizeMode: {
				type: String as PropType<'window' | 'container'>,
				default: 'window',
				validator: (value: string) => value === 'window' || value === 'container'
			},
			resizeDelayTime: {
				type: Number,
				default: 300
			},
			pivotProps: {
				type: Object as PropType<IPivot.Props>,
				default() {
					return {};
				}
			},
			createOnMounted: {
				type: Boolean,
				default: true
			}
		},
		data: () => ({
			uuid: '', id: '', pid: '',
			timerId: null as ReturnType<typeof setTimeout> | null,
			auiResizeInactive: false,
			auiContainerResize: null as ReturnType<typeof createContainerResize> | null,
			auiMountGeneration: 0
		}),
		created: function () {
			//crypto 로 uuid 생성함. (유니크 값)
			this.uuid = window.crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
			this.id = 'aui-pivot-wrap-' + (this.name !== '' ? this.name : this.uuid);
			this.pid = '#' + this.id;
			this.timerId = null;
		},
		mounted: function () {
			const generation = ++this.auiMountGeneration;
			if (!this.createOnMounted) return;
			const pivotProps = this.__getPivotPropsByProxy();
			$ag.create(this.pid, pivotProps);
			if (generation !== this.auiMountGeneration) return;
			this.__setupEvents();
			this.__setupGlobalResize();
		},
		beforeUnmount: function () {
			// for Vue 3
			this.__resetGlobalReisze();
			if ($ag.isCreated(this.pid)) $ag.destroy(this.pid, true);
		},
		// KeepAlive는 피벗 데이터는 보존하고 비활성 기간의 관찰만 멈춥니다.
		activated() {
			this.auiResizeInactive = false;
			if (this.resizeMode === 'container' && $ag.isCreated(this.pid)) this.__setupGlobalResize();
		},
		deactivated() {
			this.auiResizeInactive = true;
			if (this.auiContainerResize) this.auiContainerResize.stop();
		},
		methods: {
			__setupEvents() {
				// 일반 이벤트는 emit하고 취소, 메뉴 반환 이벤트는 콜백 반환값을 보존합니다.
				if (this.__eventHandler('cellClick')) $ag.bind(this.pid, 'cellClick', event => this.$emit('cellClick', event));
				if (this.__eventHandler('cellDoubleClick')) $ag.bind(this.pid, 'cellDoubleClick', event => this.$emit('cellDoubleClick', event));
				if (this.__eventHandler('columnStateChange')) $ag.bind(this.pid, 'columnStateChange', event => this.$emit('columnStateChange', event));
				const contextMenu = this.__eventHandler('contextMenu');
				if (contextMenu) $ag.bind(this.pid, 'contextMenu', event => this.__eventHandler('contextMenu')?.(event));
				if (this.__eventHandler('footerClick')) $ag.bind(this.pid, 'footerClick', event => this.$emit('footerClick', event));
				if (this.__eventHandler('footerDoubleClick')) $ag.bind(this.pid, 'footerDoubleClick', event => this.$emit('footerDoubleClick', event));
				const headerClick = this.__eventHandler('headerClick');
				if (headerClick) $ag.bind(this.pid, 'headerClick', event => this.__eventHandler('headerClick')?.(event));
				if (this.__eventHandler('hScrollChange')) $ag.bind(this.pid, 'hScrollChange', event => this.$emit('hScrollChange', event));
				const pivotBegin = this.__eventHandler('pivotBegin');
				if (pivotBegin) $ag.bind(this.pid, 'pivotBegin', event => this.__eventHandler('pivotBegin')?.(event));
				if (this.__eventHandler('pivotComplete')) $ag.bind(this.pid, 'pivotComplete', event => this.$emit('pivotComplete', event));
				if (this.__eventHandler('pivotPanelHide')) $ag.bind(this.pid, 'pivotPanelHide', event => this.$emit('pivotPanelHide', event));
				if (this.__eventHandler('pivotPanelShow')) $ag.bind(this.pid, 'pivotPanelShow', event => this.$emit('pivotPanelShow', event));
				if (this.__eventHandler('sorting')) $ag.bind(this.pid, 'sorting', event => this.$emit('sorting', event));
				if (this.__eventHandler('treeOpenChange')) $ag.bind(this.pid, 'treeOpenChange', event => this.$emit('treeOpenChange', event));
				if (this.__eventHandler('vScrollChange')) $ag.bind(this.pid, 'vScrollChange', event => this.$emit('vScrollChange', event));
			},
			__eventHandler<K extends IPivot.EventName>(name: K): IPivot.EventHandler<K> | undefined {
				const key = 'on' + name[0].toUpperCase() + name.slice(1);
				// emits에 선언한 리스너는 attrs 대신 컴포넌트의 vnode에 보관됩니다.
				const handler = this.$.vnode.props?.[key];
				return typeof handler === 'function' ? handler as IPivot.EventHandler<K> : undefined;
			},
			__setupGlobalResize() {
				if (!this.autoResize) return;
				if (this.resizeMode === 'container') {
					if (this.auiResizeInactive) return;
					if (!this.auiContainerResize) this.auiContainerResize = createContainerResize(() => this.pid, () => this.resizeDelayTime);
					this.auiContainerResize.start();
					return;
				}
				window.addEventListener('resize', this.__globalResizeHandler);
			},
			__resetGlobalReisze() {
				if (this.auiContainerResize) this.auiContainerResize.stop();
				this.auiMountGeneration++;
				if (this.timerId !== null) {
					clearTimeout(this.timerId);
					this.timerId = null;
				}
				window.removeEventListener('resize', this.__globalResizeHandler);
			},
			__globalResizeHandler() {
				const that = this;
				const pid = this.pid;
				const generation = this.auiMountGeneration;
				if (this.timerId !== null) clearTimeout(this.timerId);
				this.timerId = setTimeout(function () {
					if (generation !== that.auiMountGeneration) return;
					that.timerId = null;
					if ($ag.isCreated(pid)) {
						try {
							$ag.resize(pid);
						} catch (e) {}
					}
				}, this.resizeDelayTime);
			},
			__getPivotPropsByProxy(): IPivot.Props {
				// 콜백과 배열을 유지하는 얕은 사본으로 Vue의 속성을 전달합니다.
				return { ...this.pivotProps };
			},
			getPID() {
				return this.pid;
			},
			create(props?: IPivot.Props) {
				// Grid Vue처럼 기존 인스턴스와 직접 등록한 이벤트를 그대로 유지합니다.
				if ($ag.isCreated(this.pid)) return this.pid;
				$ag.create(this.pid, props);
				this.__setupEvents();
				this.__setupGlobalResize();
				return this.pid;
			},

			// 공개 API를 컴포넌트 ref에서 같은 이름으로 호출합니다.
			bind<K extends IPivot.EventName>(name: K | readonly K[], handler: IPivot.EventHandler<K>): void {
				return $ag.bind(this.pid, name, handler);
			},
			changeHeatmapColors(dataField: string, opName: IPivot.Operation, colors: string[]): void {
				return $ag.changeHeatmapColors(this.pid, dataField, opName, colors);
			},
			clearFilterAll(): void {
				return $ag.clearFilterAll(this.pid);
			},
			clearPivot(): void {
				return $ag.clearPivot(this.pid);
			},
			clearPivotFieldsAll(): void {
				return $ag.clearPivotFieldsAll(this.pid);
			},
			clearSortingAll(): void {
				return $ag.clearSortingAll(this.pid);
			},
			closeFilterLayer(): void {
				return $ag.closeFilterLayer(this.pid);
			},
			collapseAll(): void {
				return $ag.collapseAll(this.pid);
			},
			collapseAllColumns(): void {
				return $ag.collapseAllColumns(this.pid);
			},
			createPivotPanel(props?: IPivot.PanelProps): void {
				return $ag.createPivotPanel(this.pid, props);
			},
			createSlicer(container: string, options: IPivot.SlicerOptions): string | undefined {
				return $ag.createSlicer(this.pid, container, options);
			},
			destroy(includePanelParent?: boolean): void {
				// 수동 제거 후 다시 생성할 때 이전 알림이 남지 않게 합니다.
				if (this.auiContainerResize) this.auiContainerResize.stop();
				return $ag.destroy(this.pid, includePanelParent);
			},
			destroyPivotPanel(includeParent?: boolean): void {
				return $ag.destroyPivotPanel(this.pid, includeParent);
			},
			destroySlicer(slicerID: string): void {
				return $ag.destroySlicer(this.pid, slicerID);
			},
			expandAll(): void {
				return $ag.expandAll(this.pid);
			},
			expandAllColumns(): void {
				return $ag.expandAllColumns(this.pid);
			},
			exportToCsv(props?: IPivot.CsvExportOptions): void {
				return $ag.exportToCsv(this.pid, props);
			},
			exportToPdf(props: IPivot.PdfExportOptions): void {
				return $ag.exportToPdf(this.pid, props);
			},
			exportToTxt(props?: IPivot.CsvExportOptions): void {
				return $ag.exportToTxt(this.pid, props);
			},
			exportToXlsx(...args: [props?: IPivot.XlsxExportOptions] | [exportWithStyle: boolean, props?: IPivot.XlsxExportOptions]): void {
				// 내보내기 속성만 지정하는 기존 형식도 지원합니다.
				if (typeof args[0] === 'boolean') $ag.exportToXlsx(this.pid, args[0], args[1]);
				else $ag.exportToXlsx(this.pid, args[0]);
			},
			getActiveGrid(): IPivot.PivotID | null {
				return $ag.getActiveGrid();
			},
			getAliasByDataField(dataField: string): string | undefined {
				return $ag.getAliasByDataField(this.pid, dataField);
			},
			getCellDetailList(rowIndex: number, columnIndex: number): Row[] {
				return $ag.getCellDetailList(this.pid, rowIndex, columnIndex);
			},
			getColumnFields(): string[] | null {
				return $ag.getColumnFields(this.pid);
			},
			getColumnFormatString(): Record<string, Omit<IPivot.FieldFormat, 'dataField'>> | null | undefined {
				return $ag.getColumnFormatString(this.pid);
			},
			getColumnIndexByDataField(dataField: string): number | undefined {
				return $ag.getColumnIndexByDataField(this.pid, dataField);
			},
			getColumnInfoList(): IPivot.ColumnInfo[] | null {
				return $ag.getColumnInfoList(this.pid);
			},
			getColumnItemByDataField(dataField: string): IPivot.ColumnInfo | null | undefined {
				return $ag.getColumnItemByDataField(this.pid, dataField);
			},
			getColumnLayout(): IPivot.ColumnInfo[] | null {
				return $ag.getColumnLayout(this.pid);
			},
			getCreatedGridAll(): IPivot.PivotID[] {
				return $ag.getCreatedGridAll();
			},
			getCustomAggregators(): IPivot.CustomAggregatorInfo[] | null {
				return $ag.getCustomAggregators(this.pid);
			},
			getCustomValueOrders(): IPivot.CustomValueOrder[] | null {
				return $ag.getCustomValueOrders(this.pid);
			},
			getDataFieldByColumnIndex(columnIndex: number): string | undefined {
				return $ag.getDataFieldByColumnIndex(this.pid, columnIndex);
			},
			getDataFieldList(all?: boolean): string[] | undefined {
				return $ag.getDataFieldList(this.pid, all);
			},
			getDerivedFields(): IPivot.DerivedField[] | null {
				return $ag.getDerivedFields(this.pid);
			},
			getDerivedFieldValue(sourceRow: Row, dataField: string): number | string | null | undefined {
				return $ag.getDerivedFieldValue(this.pid, sourceRow, dataField);
			},
			getDimensionValues(rowIndex: number, columnIndex: number): IPivot.DimensionValues | null {
				return $ag.getDimensionValues(this.pid, rowIndex, columnIndex);
			},
			getDisplayOrderRules(): IPivot.SortField[] | null {
				return $ag.getDisplayOrderRules(this.pid);
			},
			getExceptSumRowFields(): string[] | null {
				return $ag.getExceptSumRowFields(this.pid);
			},
			getFieldAlias(): IPivot.FieldAliases | null {
				return $ag.getFieldAlias(this.pid);
			},
			getFilterCache(): IPivot.FilterCache {
				return $ag.getFilterCache(this.pid);
			},
			getFilterFields(): string[] | null {
				return $ag.getFilterFields(this.pid);
			},
			getFitColumnSizeList(fitToGrid?: boolean): number[] {
				return $ag.getFitColumnSizeList(this.pid, fitToGrid);
			},
			getFooterData(): IPivot.FooterData[] {
				return $ag.getFooterData(this.pid);
			},
			getItemByRowIndex(rowIndex: number): IPivot.DataItem | null | undefined {
				return $ag.getItemByRowIndex(this.pid, rowIndex);
			},
			getMonthText(monthCode: string): string {
				return $ag.getMonthText(this.pid, monthCode);
			},
			getPivotData(): IPivot.DataItem[] {
				return $ag.getPivotData(this.pid);
			},
			getPivotPanelState(): 'shown' | 'hidden' | undefined {
				return $ag.getPivotPanelState(this.pid);
			},
			getProp<K extends keyof IPivot.Props>(name: K): IPivot.Props[K] {
				return $ag.getProp(this.pid, name);
			},
			getProperty<K extends keyof IPivot.Props>(name: K): IPivot.Props[K] {
				return $ag.getProperty(this.pid, name);
			},
			getReportDefinition(): IPivot.PivotReportDefinitionV3 | null {
				return $ag.getReportDefinition(this.pid);
			},
			getRowCount(): number {
				return $ag.getRowCount(this.pid);
			},
			getRowFields(): string[] | null {
				return $ag.getRowFields(this.pid);
			},
			getRowFormatString(): Record<string, Omit<IPivot.FieldFormat, 'dataField'>> | null | undefined {
				return $ag.getRowFormatString(this.pid);
			},
			getSelectedIndex(): [number, number] {
				return $ag.getSelectedIndex(this.pid);
			},
			getSlicerSelection(slicerID: string): IPivot.SlicerValue[] | null | undefined {
				return $ag.getSlicerSelection(this.pid, slicerID);
			},
			getSourceData(): Row[] | undefined {
				return $ag.getSourceData(this.pid);
			},
			getSourceItemByValue(dataField: string, value: unknown): Row | null {
				return $ag.getSourceItemByValue(this.pid, dataField, value);
			},
			getSourceItemsByValue(dataField: string, value: unknown): Row[] | null {
				return $ag.getSourceItemsByValue(this.pid, dataField, value);
			},
			getTreeTotalDepth(): number {
				return $ag.getTreeTotalDepth(this.pid);
			},
			getValidLocation(): string {
				return $ag.getValidLocation();
			},
			getValidLocationAll(): string[] {
				return $ag.getValidLocationAll();
			},
			getValueFields(): IPivot.ValueField[] | null {
				return $ag.getValueFields(this.pid);
			},
			getVisualAnalytics(): IPivot.VisualAnalyticsOptions[] | null {
				return $ag.getVisualAnalytics(this.pid);
			},
			hidePivotPanel(): void {
				return $ag.hidePivotPanel(this.pid);
			},
			isAvailabePdf(): boolean {
				return $ag.isAvailabePdf();
			},
			isAvailableLocalDownload(): boolean {
				return $ag.isAvailableLocalDownload();
			},
			isCreated(): boolean {
				return $ag.isCreated(this.pid);
			},
			isCreatedPivotPanel(): boolean {
				return $ag.isCreatedPivotPanel(this.pid);
			},
			isFilteredPivot(): boolean {
				return $ag.isFilteredPivot(this.pid);
			},
			movePivotPanel(x: number, y: number): void {
				return $ag.movePivotPanel(this.pid, x, y);
			},
			refresh(): void {
				return $ag.refresh(this.pid);
			},
			registerCustomAggregator<State extends object>(definition: IPivot.CustomAggregatorDefinition<State>): IPivot.CustomOperationId {
				return $ag.registerCustomAggregator(this.pid, definition);
			},
			removeAjaxLoader(): void {
				return $ag.removeAjaxLoader(this.pid);
			},
			removeInfoMessage(): void {
				return $ag.removeInfoMessage(this.pid);
			},
			resize(width?: number, height?: number): void {
				return $ag.resize(this.pid, width, height);
			},
			resizePivotPanel(width?: number, height?: number): void {
				return $ag.resizePivotPanel(this.pid, width, height);
			},
			setColumnFields(fields: string | string[]): void {
				return $ag.setColumnFields(this.pid, fields);
			},
			setColumnFormatString(formats: IPivot.FieldFormat[]): void {
				return $ag.setColumnFormatString(this.pid, formats);
			},
			setColumnSizeList(sizes: Array<number | string | null | undefined>): void {
				return $ag.setColumnSizeList(this.pid, sizes);
			},
			setCustomValueOrders(orders: IPivot.CustomValueOrder[]): void {
				return $ag.setCustomValueOrders(this.pid, orders);
			},
			setDataType(types: IPivot.FieldDataTypes): void {
				return $ag.setDataType(this.pid, types);
			},
			setDateFormatString(formats: Record<string, string>): void {
				return $ag.setDateFormatString(this.pid, formats);
			},
			setDateInputFormat(formatString: string): void {
				return $ag.setDateInputFormat(this.pid, formatString);
			},
			setDateTypeField(field: string | null): void {
				return $ag.setDateTypeField(this.pid, field);
			},
			setDerivedFields(fields: IPivot.DerivedField[]): void {
				return $ag.setDerivedFields(this.pid, fields);
			},
			setDisplayOrderRules(rules: IPivot.SortField[]): void {
				return $ag.setDisplayOrderRules(this.pid, rules);
			},
			setExceptFields(fields: string | string[]): void {
				return $ag.setExceptFields(this.pid, fields);
			},
			setExceptSumRowFields(fields: string[]): void {
				return $ag.setExceptSumRowFields(this.pid, fields);
			},
			setFieldAlias(aliases: IPivot.FieldAliases): void {
				return $ag.setFieldAlias(this.pid, aliases);
			},
			// 필드 그룹과 표시 순서를 설정하고 독립 사본을 조회합니다.
			setFieldLayout(layout: IPivot.FieldLayoutNode[]): void {
				$ag.setFieldLayout(this.pid, layout);
			},
			getFieldLayout(): IPivot.FieldLayoutNode[] | null {
				return $ag.getFieldLayout(this.pid);
			},
			setFieldOrder(fields: string[]): void {
				return $ag.setFieldOrder(this.pid, fields);
			},
			setFilterCache(cache: IPivot.FilterCache): void {
				return $ag.setFilterCache(this.pid, cache);
			},
			setFilterFields(fields: string | string[]): void {
				return $ag.setFilterFields(this.pid, fields);
			},
			setGridData(rows: Row | Row[]): void {
				return $ag.setGridData(this.pid, rows);
			},
			setHeatmapColors(dataField: string, opName: IPivot.Operation, colors: string[]): void {
				return $ag.setHeatmapColors(this.pid, dataField, opName, colors);
			},
			setMaxWidthOfRowFields(widths: Record<string, number>): void {
				return $ag.setMaxWidthOfRowFields(this.pid, widths);
			},
			setProp<K extends keyof IPivot.MutableProps>(...args: [name: K, value: IPivot.MutableProps[K]] | [properties: IPivot.MutableProps]): void {
				// 단일 속성과 여러 속성의 호출 형식을 그대로 전달합니다.
				if (args.length === 1) $ag.setProp(this.pid, args[0]);
				else $ag.setProp(this.pid, args[0], args[1]);
			},
			setProperty<K extends keyof IPivot.MutableProps>(...args: [name: K, value: IPivot.MutableProps[K]] | [properties: IPivot.MutableProps]): void {
				// 단일 속성과 여러 속성의 호출 형식을 그대로 전달합니다.
				if (args.length === 1) $ag.setProperty(this.pid, args[0]);
				else $ag.setProperty(this.pid, args[0], args[1]);
			},
			setReportDefinition(report: IPivot.PivotReportDefinition): void {
				return $ag.setReportDefinition(this.pid, report);
			},
			setRowDimStyleFunction(callback: IPivot.RowDimensionStyleFunction | null): void {
				return $ag.setRowDimStyleFunction(this.pid, callback);
			},
			setRowFields(fields: string | string[]): void {
				return $ag.setRowFields(this.pid, fields);
			},
			setRowFormatString(formats: IPivot.FieldFormat[]): void {
				return $ag.setRowFormatString(this.pid, formats);
			},
			setSelectionByIndex(rowIndex: number, columnIndex?: number): void {
				return $ag.setSelectionByIndex(this.pid, rowIndex, columnIndex);
			},
			setSlicerSelection(slicerID: string, values: IPivot.SlicerValue[] | null): void {
				return $ag.setSlicerSelection(this.pid, slicerID, values);
			},
			setSorting(fields: IPivot.SortField | IPivot.SortField[], onlyLastDepthSorting?: boolean): void {
				return $ag.setSorting(this.pid, fields, onlyLastDepthSorting);
			},
			setValueFields(fields: IPivot.ValueField | IPivot.ValueField[]): void {
				return $ag.setValueFields(this.pid, fields);
			},
			setVisualAnalytics(definitions: IPivot.VisualAnalyticsOptions[]): void {
				return $ag.setVisualAnalytics(this.pid, definitions);
			},
			showAjaxLoader(): void {
				return $ag.showAjaxLoader(this.pid);
			},
			showInfoMessage(messageHTML: string): void {
				return $ag.showInfoMessage(this.pid, messageHTML);
			},
			showItemsOnDepth(depth: number): void {
				return $ag.showItemsOnDepth(this.pid, depth);
			},
			showPivotPanel(): void {
				return $ag.showPivotPanel(this.pid);
			},
			unbind<K extends IPivot.EventName>(name: K | readonly K[], handler?: IPivot.EventHandler<K> | null): void {
				return $ag.unbind(this.pid, name, handler);
			},
			unload(): void {
				return $ag.unload(this.pid);
			},
			updatePivot(): void {
				return $ag.updatePivot(this.pid);
			},
		}
	});
	export const apUtils = {
		// 컴포넌트 생성 전에도 사용할 수 있는 공개 조회 함수를 제공합니다.
		isCreated: $ag.isCreated,
		getActiveGrid: $ag.getActiveGrid,
		getCreatedGridAll: $ag.getCreatedGridAll,
		releaseDate: $ag.releaseDate,
		version: $ag.version
	};
</script>
