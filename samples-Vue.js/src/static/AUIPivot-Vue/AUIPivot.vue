<template>
	<div v-bind:id="id"></div>
</template>
<script>
	/* eslint-disable */
	/**
	 * AUIPivot.vue for Vue.js v1.2.20261007
	 * Based on AUIPivot v2.7.0
	 * Copyright © AUISoft Co., Ltd.
	 * www.auisoft.net
	 */
	// 프로젝트 경로에 맞게 바꾸세요
	import '../AUIPivot/AUIPivot';
	import '../AUIPivot/messages/AUIPivot.messages.kr';
	import '../AUIPivot/AUIPivotLicense';
	import '../AUIPivot/AUIPivot_style.css';

	// 이 아래 소스는 절대 수정하지 마세요.
	const $ag = typeof window === 'undefined' ? {} : window.AUIPivot;

	export default {
		name: 'AUIPivot',
		props: {
			name: {
				type: String,
				default: ''
			},
			autoResize: {
				type: Boolean,
				default: true
			},
			resizeDelayTime: {
				type: Number,
				default: 300
			},
			pivotProps: {
				type: Object,
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
			timerId: null,
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
		beforeDestroy: function () {
			// for Vue 2
			this.__resetGlobalReisze();
			if ($ag.isCreated(this.pid)) $ag.destroy(this.pid, true);
		},
		beforeUnmount: function () {
			// for Vue 3
			this.__resetGlobalReisze();
			if ($ag.isCreated(this.pid)) $ag.destroy(this.pid, true);
		},
		methods: {
			__setupEvents() {
				const that = this;
				const events = ['cellClick', 'cellDoubleClick', 'columnStateChange', 'footerClick', 'footerDoubleClick', 'hScrollChange', 'pivotComplete', 'pivotPanelShow', 'pivotPanelHide', 'sorting', 'treeOpenChange', 'vScrollChange'];
				const invokers = ['headerClick', 'pivotBegin', 'contextMenu'];
				// Vue 버전별 핸들러 조회와 반환값 처리는 아래 공통 함수에서 수행합니다.
				for (const name of events) {
					if (this.__isEventHandlerDefined(name)) {
						$ag.bind(this.pid, name, function (e) { that.$emit(e.type, e); });
					}
				}
				for (const name of invokers) {
					if (this.__isEventHandlerDefined(name)) {
						$ag.bind(this.pid, name, function (e) { return that.__invoke(e.type, e); });
					}
				}
			},
			__invoke(n, e) {
				const that = this;
				if (typeof that._events !== 'undefined') {
					// for Vue 2
					if (that._events[n] && typeof that._events[n][0] == 'function') {
						return that._events[n][0](e);
					}
				} else {
					// for Vue 3
					let vname = 'on' + n.replace(/^[a-z]/, (c) => c.toUpperCase());
					if (typeof that.$attrs[vname] !== 'function') return;
					return that.$attrs[vname](e);
				}
			},
			__isEventHandlerDefined(name) {
				// for Vue 2
				if (typeof this._events !== 'undefined') {
					return this._events[name];
				}
				return typeof this.$attrs['on' + name.replace(/^[a-z]/, (c) => c.toUpperCase())] === 'function';
			},
			__setupGlobalResize() {
				if (!this.autoResize) return;
				window.addEventListener('resize', this.__globalResizeHandler);
			},
			__resetGlobalReisze() {
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
			__getPivotPropsByProxy: function () {
				if (this.pivotProps === null) return {};
				else if (typeof this.pivotProps.pivotProps === 'object') {
					return Object.assign({}, this.pivotProps);
				}
				return this.pivotProps;
			},
			getPID() {
				return this.pid;
			},
			create(props) {
				// Grid Vue처럼 기존 인스턴스와 직접 등록한 이벤트를 그대로 유지합니다.
				if ($ag.isCreated(this.pid)) return this.pid;
				$ag.create(this.pid, props);
				this.__setupEvents();
				this.__setupGlobalResize();
				return this.pid;
			},

			bind(name, func) {
				return $ag.bind.call($ag, this.pid, arguments[0], arguments[1]);
			},
			changeHeatmapColors(dataField, opName, colors) {
				$ag.changeHeatmapColors.call($ag, this.pid, arguments[0], arguments[1], arguments[2]);
			},
			clearFilterAll() {
				$ag.clearFilterAll.call($ag, this.pid);
			},
			clearPivot() {
				$ag.clearPivot.call($ag, this.pid);
			},
			clearPivotFieldsAll() {
				$ag.clearPivotFieldsAll.call($ag, this.pid);
			},
			clearSortingAll() {
				$ag.clearSortingAll.call($ag, this.pid);
			},
			closeFilterLayer() {
				$ag.closeFilterLayer.call($ag, this.pid);
			},
			collapseAll() {
				$ag.collapseAll.call($ag, this.pid);
			},
			collapseAllColumns() {
				$ag.collapseAllColumns.call($ag, this.pid);
			},
			createPivotPanel(props) {
				return $ag.createPivotPanel.call($ag, this.pid, arguments[0]);
			},
			// 슬라이서를 만들고 생성된 슬라이서 ID를 반환합니다.
			createSlicer(container, options) {
				return $ag.createSlicer.call($ag, this.pid, arguments[0], arguments[1]);
			},
			destroy(includePanelParent) {
				$ag.destroy.call($ag, this.pid, arguments[0]);
			},
			destroyPivotPanel(includeParent) {
				$ag.destroyPivotPanel.call($ag, this.pid, arguments[0]);
			},
			// 이 피벗에 연결된 슬라이서를 제거합니다.
			destroySlicer(id) {
				$ag.destroySlicer.call($ag, this.pid, arguments[0]);
			},
			expandAll() {
				$ag.expandAll.call($ag, this.pid);
			},
			expandAllColumns() {
				$ag.expandAllColumns.call($ag, this.pid);
			},
			exportToCsv(props) {
				$ag.exportToCsv.call($ag, this.pid, arguments[0]);
			},
			exportToPdf(props) {
				$ag.exportToPdf.call($ag, this.pid, arguments[0]);
			},
			exportToTxt(props) {
				$ag.exportToTxt.call($ag, this.pid, arguments[0]);
			},
			exportToXlsx(exportWithStyle, props) {
				$ag.exportToXlsx.call($ag, this.pid, arguments[0], arguments[1]);
			},
			getActiveGrid() {
				return $ag.getActiveGrid.call($ag, this.pid);
			},
			getAliasByDataField(dataField) {
				return $ag.getAliasByDataField.call($ag, this.pid, arguments[0]);
			},
			getCellDetailList(rowIndex, columnIndex) {
				return $ag.getCellDetailList.call($ag, this.pid, arguments[0], arguments[1]);
			},
			getColumnFields() {
				return $ag.getColumnFields.call($ag, this.pid);
			},
			getColumnFormatString() {
				return $ag.getColumnFormatString.call($ag, this.pid);
			},
			getColumnIndexByDataField(dataField) {
				return $ag.getColumnIndexByDataField.call($ag, this.pid, arguments[0]);
			},
			getColumnInfoList() {
				return $ag.getColumnInfoList.call($ag, this.pid);
			},
			getColumnItemByDataField(dataField) {
				return $ag.getColumnItemByDataField.call($ag, this.pid, arguments[0]);
			},
			getColumnLayout() {
				return $ag.getColumnLayout.call($ag, this.pid);
			},
			getCreatedGridAll() {
				return $ag.getCreatedGridAll.call($ag, this.pid);
			},
			// 등록한 사용자 집계의 정보를 조회합니다.
			getCustomAggregators() {
				return $ag.getCustomAggregators.call($ag, this.pid);
			},
			// 필드별 항목 출력 순서를 조회합니다.
			getCustomValueOrders() {
				return $ag.getCustomValueOrders.call($ag, this.pid);
			},
			getDataFieldByColumnIndex(idx) {
				return $ag.getDataFieldByColumnIndex.call($ag, this.pid, arguments[0]);
			},
			getDataFieldList(all) {
				return $ag.getDataFieldList.call($ag, this.pid, arguments[0]);
			},
			// 설정된 파생 필드 정의를 조회합니다.
			getDerivedFields() {
				return $ag.getDerivedFields.call($ag, this.pid);
			},
			// 원본 행의 파생 필드 값을 조회합니다.
			getDerivedFieldValue(sourceRow, dataField) {
				return $ag.getDerivedFieldValue.call($ag, this.pid, arguments[0], arguments[1]);
			},
			getDimensionValues(rowIndex, columnIndex) {
				return $ag.getDimensionValues.call($ag, this.pid, arguments[0], arguments[1]);
			},
			getDisplayOrderRules() {
				return $ag.getDisplayOrderRules.call($ag, this.pid);
			},
			getExceptSumRowFields() {
				return $ag.getExceptSumRowFields.call($ag, this.pid);
			},
			getFieldAlias() {
				return $ag.getFieldAlias.call($ag, this.pid);
			},
			getFilterCache() {
				return $ag.getFilterCache.call($ag, this.pid);
			},
			getFilterFields() {
				return $ag.getFilterFields.call($ag, this.pid);
			},
			getFitColumnSizeList(fitToGrid) {
				return $ag.getFitColumnSizeList.call($ag, this.pid, arguments[0]);
			},
			getFooterData() {
				return $ag.getFooterData.call($ag, this.pid);
			},
			getItemByRowIndex(rowIndex) {
				return $ag.getItemByRowIndex.call($ag, this.pid, arguments[0]);
			},
			getMonthText(monthCode) {
				return $ag.getMonthText.call($ag, this.pid, arguments[0]);
			},
			getPivotData() {
				return $ag.getPivotData.call($ag, this.pid);
			},
			getPivotPanelState() {
				return $ag.getPivotPanelState.call($ag, this.pid);
			},
			getProp(name) {
				return $ag.getProp.call($ag, this.pid, arguments[0]);
			},
			getProperty(name) {
				return $ag.getProperty.call($ag, this.pid, arguments[0]);
			},
			// 현재 보고서 설정을 조회합니다.
			getReportDefinition() {
				return $ag.getReportDefinition.call($ag, this.pid);
			},
			getRowCount() {
				return $ag.getRowCount.call($ag, this.pid);
			},
			getRowFields() {
				return $ag.getRowFields.call($ag, this.pid);
			},
			getRowFormatString() {
				return $ag.getRowFormatString.call($ag, this.pid);
			},
			getSelectedIndex() {
				return $ag.getSelectedIndex.call($ag, this.pid);
			},
			// 슬라이서에서 선택한 항목을 조회합니다.
			getSlicerSelection(id) {
				return $ag.getSlicerSelection.call($ag, this.pid, arguments[0]);
			},
			getSourceData() {
				return $ag.getSourceData.call($ag, this.pid);
			},
			getSourceItemByValue(dataField, value) {
				return $ag.getSourceItemByValue.call($ag, this.pid, arguments[0], arguments[1]);
			},
			getSourceItemsByValue(dataField, value) {
				return $ag.getSourceItemsByValue.call($ag, this.pid, arguments[0], arguments[1]);
			},
			getTreeTotalDepth() {
				return $ag.getTreeTotalDepth.call($ag, this.pid);
			},
			getValidLocation() {
				return $ag.getValidLocation.call($ag, this.pid);
			},
			getValidLocationAll() {
				return $ag.getValidLocationAll.call($ag, this.pid);
			},
			getValueFields() {
				return $ag.getValueFields.call($ag, this.pid);
			},
			// 값 필드의 시각화 설정을 조회합니다.
			getVisualAnalytics() {
				return $ag.getVisualAnalytics.call($ag, this.pid);
			},
			hidePivotPanel() {
				$ag.hidePivotPanel.call($ag, this.pid);
			},
			isAvailabePdf() {
				return $ag.isAvailabePdf.call($ag, this.pid);
			},
			isAvailableLocalDownload() {
				return $ag.isAvailableLocalDownload.call($ag, this.pid);
			},
			isCreated() {
				return $ag.isCreated.call($ag, this.pid);
			},
			isCreatedPivotPanel() {
				return $ag.isCreatedPivotPanel.call($ag, this.pid);
			},
			isFilteredPivot() {
				return $ag.isFilteredPivot.call($ag, this.pid);
			},
			movePivotPanel(x, y) {
				$ag.movePivotPanel.call($ag, this.pid, arguments[0], arguments[1]);
			},
			// 현재 데이터와 설정을 유지하며 표시 속성 변경을 반영합니다.
			refresh() {
				$ag.refresh.call($ag, this.pid);
			},
			// 사용자 집계를 등록하고 연산 ID를 반환합니다.
			registerCustomAggregator(definition) {
				return $ag.registerCustomAggregator.call($ag, this.pid, arguments[0]);
			},
			removeAjaxLoader() {
				$ag.removeAjaxLoader.call($ag, this.pid);
			},
			removeInfoMessage() {
				$ag.removeInfoMessage.call($ag, this.pid);
			},
			resize(w, h) {
				$ag.resize.call($ag, this.pid, arguments[0], arguments[1]);
			},
			resizePivotPanel(width, height) {
				return $ag.resizePivotPanel.call($ag, this.pid, arguments[0], arguments[1]);
			},
			setColumnFields(columnFields) {
				return $ag.setColumnFields.call($ag, this.pid, arguments[0]);
			},
			setColumnFormatString(arr) {
				$ag.setColumnFormatString.call($ag, this.pid, arguments[0]);
			},
			setColumnSizeList(value) {
				return $ag.setColumnSizeList.call($ag, this.pid, arguments[0]);
			},
			// 필드별 항목 출력 순서를 지정합니다.
			setCustomValueOrders(orders) {
				$ag.setCustomValueOrders.call($ag, this.pid, arguments[0]);
			},
			setDataType(typeObj) {
				$ag.setDataType.call($ag, this.pid, arguments[0]);
			},
			setDateFormatString(formatArr) {
				return $ag.setDateFormatString.call($ag, this.pid, arguments[0]);
			},
			setDateInputFormat(formatString) {
				return $ag.setDateInputFormat.call($ag, this.pid, arguments[0]);
			},
			setDateTypeField(fieldName) {
				$ag.setDateTypeField.call($ag, this.pid, arguments[0]);
			},
			// 파생 필드 정의를 설정합니다.
			setDerivedFields(definitions) {
				$ag.setDerivedFields.call($ag, this.pid, arguments[0]);
			},
			setDisplayOrderRules(orders) {
				$ag.setDisplayOrderRules.call($ag, this.pid, arguments[0]);
			},
			setExceptFields(fields) {
				return $ag.setExceptFields.call($ag, this.pid, arguments[0]);
			},
			setExceptSumRowFields(arr) {
				$ag.setExceptSumRowFields.call($ag, this.pid, arguments[0]);
			},
			setFieldAlias(aliasInfo) {
				$ag.setFieldAlias.call($ag, this.pid, arguments[0]);
			},
			// 필드 그룹과 표시 순서를 설정하고 독립 사본을 조회합니다.
			setFieldLayout(layout) {
				$ag.setFieldLayout.call($ag, this.pid, layout);
			},
			getFieldLayout() {
				return $ag.getFieldLayout.call($ag, this.pid);
			},
			setFieldOrder(arr) {
				$ag.setFieldOrder.call($ag, this.pid, arguments[0]);
			},
			setFilterCache(cache) {
				$ag.setFilterCache.call($ag, this.pid, arguments[0]);
			},
			setFilterFields(filterFields) {
				return $ag.setFilterFields.call($ag, this.pid, arguments[0]);
			},
			setGridData(gridData) {
				return $ag.setGridData.call($ag, this.pid, arguments[0]);
			},
			setHeatmapColors(dataField, opName, colors) {
				$ag.setHeatmapColors.call($ag, this.pid, arguments[0], arguments[1], arguments[2]);
			},
			setMaxWidthOfRowFields(obj) {
				return $ag.setMaxWidthOfRowFields.call($ag, this.pid, arguments[0]);
			},
			setProp(obj, value) {
				$ag.setProp.call($ag, this.pid, arguments[0], arguments[1]);
			},
			setProperty(obj, value) {
				return $ag.setProperty.call($ag, this.pid, arguments[0], arguments[1]);
			},
			// 저장한 보고서 설정을 복원합니다.
			setReportDefinition(report) {
				$ag.setReportDefinition.call($ag, this.pid, arguments[0]);
			},
			setRowDimStyleFunction(func) {
				$ag.setRowDimStyleFunction.call($ag, this.pid, arguments[0]);
			},
			setRowFields(rowFields) {
				return $ag.setRowFields.call($ag, this.pid, arguments[0]);
			},
			setRowFormatString(arr) {
				$ag.setRowFormatString.call($ag, this.pid, arguments[0]);
			},
			setSelectionByIndex(rowIndex, columnIndex) {
				return $ag.setSelectionByIndex.call($ag, this.pid, arguments[0], arguments[1]);
			},
			// 슬라이서의 선택 항목을 변경합니다.
			setSlicerSelection(id, values) {
				$ag.setSlicerSelection.call($ag, this.pid, arguments[0], arguments[1]);
			},
			setSorting(sortingInfoArr, onlyLastDepthSorting) {
				return $ag.setSorting.call($ag, this.pid, arguments[0], arguments[1]);
			},
			setValueFields(valueFields) {
				return $ag.setValueFields.call($ag, this.pid, arguments[0]);
			},
			// 값 필드의 히트맵과 데이터 막대 설정을 지정합니다.
			setVisualAnalytics(definitions) {
				$ag.setVisualAnalytics.call($ag, this.pid, arguments[0]);
			},
			showAjaxLoader() {
				$ag.showAjaxLoader.call($ag, this.pid);
			},
			showInfoMessage(msgHTML) {
				$ag.showInfoMessage.call($ag, this.pid, arguments[0]);
			},
			showItemsOnDepth(depth) {
				return $ag.showItemsOnDepth.call($ag, this.pid, arguments[0]);
			},
			showPivotPanel() {
				$ag.showPivotPanel.call($ag, this.pid);
			},
			unbind(name, func) {
				return $ag.unbind.call($ag, this.pid, arguments[0], arguments[1]);
			},
			unload() {
				$ag.unload.call($ag, this.pid);
			},
			updatePivot() {
				$ag.updatePivot.call($ag, this.pid);
			}
		}
	};

	export const apUtils = {
		// 컴포넌트 생성 전에도 사용할 수 있는 공개 조회 함수를 제공합니다.
		isCreated: $ag.isCreated,
		getActiveGrid: $ag.getActiveGrid,
		getCreatedGridAll: $ag.getCreatedGridAll,
		releaseDate: $ag.releaseDate,
		version: $ag.version
	};
</script>
