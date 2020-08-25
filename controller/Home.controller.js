sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment",
	"sap/m/MessageToast",
	"ZORDUPLOAD/model/formatter",
	"sap/m/MessagePopover",
	"sap/m/MessageBox",
	"sap/m/MessageItem",
	"sap/ui/model/Filter"
], function(Controller, JSONModel, Fragment, MessageToast, formatter, MessagePopover, MessageBox, MessageItem, Filter) {
	"use strict";
	var that;
	return Controller.extend("ZORDUPLOAD.controller.Home", {
		formatter: formatter,

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ZORDUPLOAD.view.Home
		 */
		onInit: function() {
			// var scurrentDate = this.formatter.getYYYYMMDD(new Date());
			that = this;
			var oData = {
				Auart: "ZRE",
				Vkorg: "US01",
				Vtweg: "OG",
				Spart: "01",
				Kunnr: "", //1000000001
				Kunwe: "",
				Bstkd: "",
				Zzretreason: "",
				Zzsubreason: "",
				Zzerrloc: ""
					// reqDat: scurrentDate, //cURRENT DATE
					// priDat: scurrentDate,
					// items: [{
					// 	Matnr: "", //HOM120CP
					// 	Kwmeng: "", //11
					// 	Kdmat: "",
					// 	Ean11: "",
					// 	Werks: "",
					// 	Meinh: "", //default pc
					// }]
			};

			var oJModel = new JSONModel(oData);
			oJModel.setDefaultBindingMode("TwoWay");
			this.getView().setModel(oJModel);

			this.oDModel = this.getOwnerComponent().getModel("UPLOAD");

			//customer
			var oCustomerJModel = new JSONModel();
			oCustomerJModel.loadData("/sap/opu/odata/sap/ZUI5_SEARCH_HELP_SRV/DebiaSet");
			this.getView().setModel(oCustomerJModel, "Customer");
			this.getView().setModel(oCustomerJModel, "Customer2");

			//Sales Doc type
			var oSDocTypeJModel = new JSONModel();
			oSDocTypeJModel.loadData("/sap/opu/odata/sap/ZUI5_SEARCH_HELP_SRV/HTvakSet");
			this.getView().setModel(oSDocTypeJModel, "DocType");

			//Sales org
			var oSalesOrgJModel = new JSONModel();
			oSalesOrgJModel.loadData("/sap/opu/odata/sap/ZUI5_SEARCH_HELP_SRV/HTvkoSet");
			this.getView().setModel(oSalesOrgJModel, "SaleOrg");

			//Distribution Channel 
			var oDisChnlJModel = new JSONModel();
			oDisChnlJModel.loadData("/sap/opu/odata/sap/ZUI5_SEARCH_HELP_SRV/HTvkovSet");
			this.getView().setModel(oDisChnlJModel, "DistChnl");

			//Division 
			var oDivisionJModel = new JSONModel();
			oDivisionJModel.loadData("/sap/opu/odata/sap/ZUI5_SEARCH_HELP_SRV/HTvtaSet");
			this.getView().setModel(oDivisionJModel, "Division");

			//Matnr 
			var oMatnrJModel = new JSONModel();
			oMatnrJModel.loadData("/sap/opu/odata/sap/ZUI5_SEARCH_HELP_SRV/Mat1sSet");
			this.getView().setModel(oMatnrJModel, "MaterialJ");

			//Reason Code 
			var oReasonCodeJM = new JSONModel();
			oReasonCodeJM.loadData("/sap/opu/odata/sap/ZUI5_SEARCH_HELP_SRV/ZsatRetreasonSet");
			this.getView().setModel(oReasonCodeJM, "ReasonCode");

			//Sub Reason Code 
			var oSubReasonCodeJM = new JSONModel();
			oSubReasonCodeJM.loadData("/sap/opu/odata/sap/ZUI5_SEARCH_HELP_SRV/ZsatSubreasonSet");
			this.getView().setModel(oSubReasonCodeJM, "SubReasonCode");

			//Error Location 
			var oErrorLocJM = new JSONModel();
			oErrorLocJM.loadData("/sap/opu/odata/sap/ZUI5_SEARCH_HELP_SRV/ZsatErrlocSet");
			this.getView().setModel(oErrorLocJM, "ErrorLoc");

			var oErrModel = new JSONModel();
			this.getView().setModel(oErrModel, "messages");
			this.createMessagePopover();

			// var oTable = this.getView().byId("id_itemTable");
			// var that = this;
			// oTable.attachBrowserEvent("keydown", function(e) {
			// 	if (e.keyCode === 13) {
			// 		that.onAddRow();
			// 	}
			// });
			//Setting table title
			this.oTabTitle = this.byId("id_tableTitle");
			this.oTabTitle.setText("Items");

			this.docType = this.getView().byId("id_docType");
			this.salOrg = this.getView().byId("id_salOrg");
			this.disChnl = this.getView().byId("id_disChnl");
			this.division = this.getView().byId("id_division");
			this.sol2Party = this.getView().byId("id_sol2Party");
			this.custReference = this.getView().byId("id_custReference");

			this.reasonCode = this.getView().byId("id_rsnCode");
			this.subReason = this.getView().byId("id_subReason");
			this.errLocation = this.getView().byId("id_errLocation");
		},
		onRefresh: function() {
			// location.reload();
			var oData = {
				Auart: "ZRE",
				Vkorg: "US01",
				Vtweg: "OG",
				Spart: "01",
				Kunnr: "", //1000000001
				Kunwe: "",
				Bstkd: "",
				Zzretreason: "",
				Zzsubreason: "",
				Zzerrloc: ""

			};
			var oJModel = new JSONModel(oData);
			oJModel.setDefaultBindingMode("TwoWay");
			this.getView().setModel(oJModel);

			var oSalesOrder = that.byId("id_SO");
			oSalesOrder.setText("");

			this.custReference.setValueState("None");
			this.custReference.setValueStateText("");

			this.sol2Party.setValueState("None");
			this.sol2Party.setValueStateText("");

			this.reasonCode.setValueState("None");
			this.reasonCode.setValueStateText("");

			this.subReason.setValueState("None");
			this.subReason.setValueStateText("");

			this.errLocation.setValueState("None");
			this.errLocation.setValueStateText("");
		},

		createMessagePopover: function() {
			this.oMP = new MessagePopover({
				items: {
					path: "messages>/",
					template: new MessageItem({
						title: "{messages>Message}",
						// subtitle: "Message>Message",
						type: {
							path: "{messages>Type}",
							formatter: this.formatter.getMessageType
						},
						description: "{messages>Message}"
					})
				}
			});
			this.getView().byId("messagePopoverBtn").addDependent(this.oMP);

		},
		onAddRow: function() {
			var oModel = this.getView().getModel();
			var oData = oModel.getData();
			// var oHeaderShpc = this.getView().byId("id_shipCon");
			// var sHeaderShpc = oHeaderShpc.getValue();
			var entry = {
				Matnr: "",
				Kwmeng: "",
				BstkdE: "",
				Meinh: "",
				Werks: "",
				Kdmat: "",
				Ean11: ""

			};
			// oData.items.push(entry);
			if (oData.ItemSet) {
				oData.ItemSet.push(entry);
			} else {
				MessageToast.show("Please use Upload file option");
			}
			oModel.setData(oData);
			var sitemsCount = oData.ItemSet.length;
			that.oTabTitle.setText("Items(" + sitemsCount + ")");
			//setting focus to first field on the new row.

			setTimeout(function() {
				var oTab1 = that.getView().byId("id_itemTable");

				if (oTab1.getBinding()) {
					var lastRow;
					if (oTab1.getBinding().iLength === 0) {

						lastRow = oTab1.getBinding().iLength;
					} else {

						lastRow = oTab1.getBinding().iLength - 1;
					}
				}
				var oRows1 = oTab1.getRows();
				var newRow = oRows1[lastRow];
				var oCells = newRow.getCells();
				var oCell1 = oCells[0];
				oCell1.focus();
			}, 200);

		},
		onDeleteRow: function(oEvent) {
			var oTable = this.getView().byId("id_itemTable");
			var selectedIndices = oTable.getSelectedIndices();
			var oData = this.getView().getModel().getData();
			var inOrder = selectedIndices.reverse();

			for (var i = 0; i < inOrder.length; i++) {
				oData.ItemSet.splice(inOrder[i], 1);
			}
			this.getView().getModel().refresh(true);

			var sitemsCount = oData.ItemSet.length;
			that.oTabTitle.setText("Items(" + sitemsCount + ")");
			// oTable.removeSelectionInterval(0, oData.items.length);
			oTable.clearSelection();

		},
		onUpload: function() {
			this.uploadFrag().open();

		},
		uploadFrag: function() {
			var fileUpload = sap.ui.getCore().byId("idfileUploaderer");

			if (fileUpload) {
				fileUpload.setValue("");
			}

			if (!this._oDialog1) {
				this._oDialog1 = sap.ui.xmlfragment("ZORDUPLOAD.fragment.upload", this);

				this.getView().addDependent(this._oDialog1);
			}
			this._oDialog1.getContent()[0].getContent()[1].getItems()[0].oBrowse.setText("Browse");
			return this._oDialog1;
		},
		UploadCancel: function() {
			this.uploadFrag().close();
		},
		fileSizepopup: function(oEvent) {

			var oBundle = that.getView().getModel("i18n").getResourceBundle();
			var ErrorMsg = oBundle.getText("FileSizeErrorMsg");
			var ErrorMsg1 = oBundle.getText("FileSizeErrorMsg1");
			var ErrorHeader = oBundle.getText("ErrorFileSizeMsgHeader");
			var fSize = oEvent.getParameter("fileSize");
			var roundedFilesize = fSize.toFixed(2);
			MessageBox.show(ErrorMsg + roundedFilesize + ErrorMsg1, "ERROR", ErrorHeader);
		},

		uploadComplete1: function(oEvent) {
			that.onUploaded();

		},
		onUploaded: function() {
			var fileUpload = sap.ui.getCore().byId("idfileUploaderer");
			fileUpload.setValueState(sap.ui.core.ValueState.None);
			if (fileUpload.getValue()) {
				var oItemTab = sap.ui.getCore().byId("id_itemTable");

				var domRef = fileUpload.getFocusDomRef();
				var file = domRef.files[0];
				var rows = [];
				var reader = new FileReader();

				reader.onload = function(e) {

					var strCSV = e.target.result;
					that.arr = String.fromCharCode.apply(null, new Uint8Array(strCSV));
					rows = that.arr.split("\n");

				};
				reader.readAsText(file.slice(0, 10 * 1024 * 1024));
				var delayInMilliSecond = 1000;
				setTimeout(function() {
					var row1 = reader.result.split("\n");
					rows = row1;

					var aItems = [];
					for (var i = 1; i < rows.length; i++) {
						var cols = rows[i].split(",");
						var oItem = {};
						if (cols.length === 1) {
							continue;
						}
						if (cols[1] === "") {
							continue;
						}
						oItem.Matnr = cols[1];
						oItem.Kwmeng = cols[2]; //Quantity
						// oItem.Meinh = cols[2]; // Unit of Measure
						oItem.BstkdE = cols[3]; //Customer Ref PO
						// oItem.Kdmat = cols[3]; //Customer Mat.
						// oItem.Ean11 = cols[4]; //EAN/UPC
						aItems.push(oItem);
					}
					if (aItems) {
						var oJModel = that.getView().getModel();
						var odata = oJModel.getData();
						odata.ItemSet = aItems;
						oJModel.refresh();
					}
					var sitemsCount = aItems.length;
					that.oTabTitle.setText("Items(" + sitemsCount + ")");
					sap.ui.core.BusyIndicator.hide();
					that.uploadFrag().close();
				}, delayInMilliSecond);
			}

		},
		onUploadPressed: function() {
			var oFileUploader = sap.ui.getCore().byId("idfileUploaderer");
			if (oFileUploader.getValue() === "") {
				return;
			}
			sap.ui.core.BusyIndicator.show(0);
			oFileUploader.upload(true);
		},
		onInitiateCreate: function() {
			// this.validateInputs();
			if (!this.validateInputs()) {
				return;
			}
			this.onCreate();
		},
		validateInputs: function() {
			var valid = true;

			if (this.docType.getValue() === "") {
				this.docType.setValueState("Error");
				this.docType.setValueStateText("Mandatory Field");
				if (valid !== false) {
					valid = false;
				}
			} else {
				this.docType.setValueState("None");
				this.docType.setValueStateText("");
			}

			if (this.salOrg.getValue() === "") {
				this.salOrg.setValueState("Error");
				this.salOrg.setValueStateText("Mandatory Field");
				if (valid !== false) {
					valid = false;
				}
			} else {
				this.salOrg.setValueState("None");
				this.salOrg.setValueStateText("");
			}

			if (this.disChnl.getValue() === "") {
				this.disChnl.setValueState("Error");
				this.disChnl.setValueStateText("Mandatory Field");
				if (valid !== false) {
					valid = false;
				}
			} else {
				this.disChnl.setValueState("None");
				this.disChnl.setValueStateText("");
			}

			if (this.division.getValue() === "") {
				this.division.setValueState("Error");
				this.division.setValueStateText("Mandatory Field");
				if (valid !== false) {
					valid = false;
				}
			} else {
				this.division.setValueState("None");
				this.division.setValueStateText("");
			}

			if (this.sol2Party.getValue() === "") {
				this.sol2Party.setValueState("Error");
				this.sol2Party.setValueStateText("Mandatory Field");
				if (valid !== false) {
					valid = false;
				}
			} else {
				this.sol2Party.setValueState("None");
				this.sol2Party.setValueStateText("");
			}

			if (this.docType.getValue() === "ZRE") {
				if (this.reasonCode.getValue() === "") {
					this.reasonCode.setValueState("Error");
					this.reasonCode.setValueStateText("Mandatory Field");
					if (valid !== false) {
						valid = false;
					}
				} else {
					this.reasonCode.setValueState("None");
					this.reasonCode.setValueStateText("");
				}

				if (this.subReason.getValue() === "") {
					this.subReason.setValueState("Error");
					this.subReason.setValueStateText("Mandatory Field");
					if (valid !== false) {
						valid = false;
					}
				} else {
					this.subReason.setValueState("None");
					this.subReason.setValueStateText("");
				}

				if (this.errLocation.getValue() === "") {
					this.errLocation.setValueState("Error");
					this.errLocation.setValueStateText("Mandatory Field");
					if (valid !== false) {
						valid = false;
					}
				} else {
					this.errLocation.setValueState("None");
					this.errLocation.setValueStateText("");
				}

			} else {
				if (this.custReference.getValue() === "") {
					this.custReference.setValueState("Error");
					this.custReference.setValueStateText("Mandatory Field");
					if (valid !== false) {
						valid = false;
					}
				} else {
					this.custReference.setValueState("None");
					this.custReference.setValueStateText("");
				}
			}
			return valid;
		},
		highlightMatnrField: function(i) {
			var oTable = this.byId("id_itemTable");
			var oInput = oTable.getCellControl(i, 0);
			oInput.setValueState("Error");
			oInput.setValueStateText("Enter Material");
		},
		highlightKwmengField: function(i) {
			var oTable = this.byId("id_itemTable");
			var oInput = oTable.getCellControl(i, 1);
			oInput.setValueState("Error");
			oInput.setValueStateText("Enter Quantity");
		},
		validateItems: function() {
			var isError = false;
			var mData = this.getView().getModel().getData();
			for (var i = 0; i < mData.ItemSet.length; i++) {
				if (mData.ItemSet[i].Matnr === "" || mData.ItemSet[i].Matnr === undefined) {
					this.highlightMatnrField(i);
					isError = true;
				}
				if (mData.ItemSet[i].Kwmeng === "" || mData.ItemSet[i].Kwmeng === undefined) {
					this.highlightKwmengField(i);
					isError = true;
				}
			}
			return isError;
		},
		onCreate: function() {
			var oData = this.getView().getModel().getData();
			oData.Vbeln = "0000000002";
			if (this.validateItems()) {
				return;
			}
			if (!this._oBusyDialog) {

				this._oBusyDialog = sap.ui.xmlfragment("ZORDUPLOAD.fragment.BusyDialog", this);
				this.getView().addDependent(this._oBusyDialog);

				jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oBusyDialog);
				this._oBusyDialog.open();

			} else {
				this._oBusyDialog.open();
			}

			this.oDModel.create("/HeaderSet", oData, {
				method: "POST",
				success: function(odata, oResponse) {
					if (odata.Vbeln !== '0000000002' || odata.Vbeln !== '2') {
						var oSalesOrder = that.byId("id_SO");
						oSalesOrder.setText(odata.Vbeln);
						that._oBusyDialog.close();

						// var oEButton = that.getView().byId("messagePopoverBtn");
						// var oEModel = that.getView().getModel("messages");
						var sSO = "Sales Order Created Successfully.";
						MessageToast.show(sSO);
						// var oMsg = {
						// 	Message: sSO,
						// 	Type: "E"
						// };
						// var aMsgs = [];
						// aMsgs.push(oMsg);
						// oEModel.setData(aMsgs);
						// setTimeout(function() {
						// 	that.oMP.openBy(oEButton);
						// }.bind(that), 100);
						var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
						var hashUrl = (oCrossAppNavigator && oCrossAppNavigator.hrefForExternal({
							target: {
								semanticObject: "ZVA05_CDS",
								action: "change"
							},
							params: {
								"P_VBELN": odata.Vbeln
							}
						}));
						oCrossAppNavigator.toExternal({
							target: {
								shellHash: hashUrl
							}
						});
					}
				},
				error: function(oError, oResponse) {
					// that.onErrorReturn(oError, oResponse);
					that._oBusyDialog.close();
				}
			});
		},
		handleMessagePopoverPress: function(oEvent) {
			if (!this.oMP) {
				this.createMessagePopover();
			}
			this.oMP.toggle(oEvent.getSource());
		},
		onSOPress: function(oEvent) {
			var sSONumber = oEvent.getSource().getText();
			var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
			var hashUrl = (oCrossAppNavigator && oCrossAppNavigator.hrefForExternal({
				target: {
					semanticObject: "ZVA05_CDS",
					action: "change"
				},
				params: {
					"P_VBELN": sSONumber
				}
			}));
			oCrossAppNavigator.toExternal({
				target: {
					shellHash: hashUrl
				}
			});
		},
		onVHSalesDocType: function(oEvent) {
			var sValue = oEvent.getSource().getValue();
			//Call F4 Dialog
			this.sDocType = "id_docType";
			if (!this._oVHDocTypeDialog) {

				this._oVHDocTypeDialog = sap.ui.xmlfragment("ZORDUPLOAD.fragment.VHSODocType", this);
				this.getView().addDependent(this._oVHDocTypeDialog);

				jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oVHDocTypeDialog);
			}
			this._oVHDocTypeDialog.getBinding("items").filter([new Filter("Auart", sap.ui.model.FilterOperator.Contains, sValue)]);
			this._oVHDocTypeDialog.open(sValue);
		},
		vhDocTypeSearch: function(oEvent) {
			//search in Doctype dialog
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("Auart", sap.ui.model.FilterOperator.Contains, sValue);
			oEvent.getSource().getBinding("items").filter([oFilter]);
			this.editableReturnFields(sValue);
		},
		vhDocTypeSearchFrmView: function(oEvent) {
			//search in Doctype dialog
			var sValue = oEvent.getParameter("value");

			this.editableReturnFields(sValue);
		},
		vhDocTypeConfirm: function(oEvent) {
			var oSelItem = oEvent.getParameter("selectedItem");
			if (oSelItem) {
				var oInput = this.byId(this.sDocType);
				oInput.setValue(oSelItem.getTitle());
			}
			oEvent.getSource().getBinding("items").filter([]);
			this.editableReturnFields(oSelItem.getTitle());
		},
		editableReturnFields: function(DocType) {
			var oReasonCode = this.byId("id_rsnCode");
			var osubReason = this.byId("id_subReason");
			var oerrLocation = this.byId("id_errLocation");
			if (DocType === "ZRE") {
				oReasonCode.setEditable(true);
				osubReason.setEditable(true);
				oerrLocation.setEditable(true);
			} else {
				oReasonCode.setEditable(false);
				osubReason.setEditable(false);
				oerrLocation.setEditable(false);
			}
		},
		onVHSalesOrg: function(oEvent) {
			var sValue = oEvent.getSource().getValue();
			//Call F4 Dialog
			this.sSalesOrg = "id_salOrg";
			if (!this._oVHSalesOrgDialog) {

				this._oVHSalesOrgDialog = sap.ui.xmlfragment("ZORDUPLOAD.fragment.VHSalesOrg", this);
				this.getView().addDependent(this._oVHSalesOrgDialog);

				jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oVHSalesOrgDialog);
			}
			this._oVHSalesOrgDialog.getBinding("items").filter([new Filter("Vkorg", sap.ui.model.FilterOperator.Contains, sValue)]);
			this._oVHSalesOrgDialog.open(sValue);
		},
		vhSaleOrgSearch: function(oEvent) {
			//search in Sales Org dialog
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("Vkorg", sap.ui.model.FilterOperator.Contains, sValue);
			oEvent.getSource().getBinding("items").filter([oFilter]);
		},
		vhSaleOrgConfrim: function(oEvent) {
			var oSelItem = oEvent.getParameter("selectedItem");
			if (oSelItem) {
				var oInput = this.byId(this.sSalesOrg);
				oInput.setValue(oSelItem.getTitle());
			}
			oEvent.getSource().getBinding("items").filter([]);
		},
		onVHReasonCode: function(oEvent) {
			var sValue = oEvent.getSource().getValue();
			//Call F4 Dialog
			this.sReasonCode = "id_rsnCode";
			if (!this._oVHReasonCode) {

				this._oVHReasonCode = sap.ui.xmlfragment("ZORDUPLOAD.fragment.VHReasonCode", this);
				this.getView().addDependent(this._oVHReasonCode);

				jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oVHReasonCode);
			}
			this._oVHReasonCode.getBinding("items").filter([new Filter("Zzretreason", sap.ui.model.FilterOperator.Contains, sValue)]);
			this._oVHReasonCode.open(sValue);
		},
		vhReasonCodeSearch: function(oEvent) {
			//search in Sales Org dialog
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("Zzretreason", sap.ui.model.FilterOperator.Contains, sValue);
			oEvent.getSource().getBinding("items").filter([oFilter]);
		},
		vhReasonCodeConfrim: function(oEvent) {
			var oSelItem = oEvent.getParameter("selectedItem");
			if (oSelItem) {
				var oInput = this.byId(this.sReasonCode);
				oInput.setValue(oSelItem.getTitle());
			}
			oEvent.getSource().getBinding("items").filter([]);
		},
		onVHSubReason: function(oEvent) {
			var sValue = oEvent.getSource().getValue();
			var oReasonCode = this.byId("id_rsnCode");
			var sReasonCode = oReasonCode.getValue();
			//Call F4 Dialog
			this.sSubReasonCode = "id_subReason";
			if (!this._oVHSubReasonCode) {

				this._oVHSubReasonCode = sap.ui.xmlfragment("ZORDUPLOAD.fragment.VHSubReasonCode", this);
				this.getView().addDependent(this._oVHSubReasonCode);

				jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oVHSubReasonCode);
			}
			this._oVHSubReasonCode.getBinding("items").filter([new Filter("Zzsubreason", sap.ui.model.FilterOperator.Contains, sValue),
				new Filter("Zzretreason", sap.ui.model.FilterOperator.Contains, sReasonCode)
			]);
			this._oVHSubReasonCode.open(sValue);
		},
		vhSubReasonCodeSearch: function(oEvent) {
			//search in Sales Org dialog
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("Zzsubreason", sap.ui.model.FilterOperator.Contains, sValue);
			oEvent.getSource().getBinding("items").filter([oFilter]);
		},
		vhSubReasonCodeConfrim: function(oEvent) {
			var oSelItem = oEvent.getParameter("selectedItem");
			if (oSelItem) {
				var oInput = this.byId(this.sSubReasonCode);
				oInput.setValue(oSelItem.getTitle());
			}
			oEvent.getSource().getBinding("items").filter([]);
		},
		onVHErrLocation: function(oEvent) {
			var sValue = oEvent.getSource().getValue();
			//Call F4 Dialog
			this.ErrLocation = "id_errLocation";
			if (!this._oVHErrLocation) {

				this._oVHErrLocation = sap.ui.xmlfragment("ZORDUPLOAD.fragment.VHErrorLocation", this);
				this.getView().addDependent(this._oVHErrLocation);

				jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oVHErrLocation);
			}
			this._oVHErrLocation.getBinding("items").filter([new Filter("Zzerrloc", sap.ui.model.FilterOperator.Contains, sValue)]);
			this._oVHErrLocation.open(sValue);
		},
		vhErrLocationSearch: function(oEvent) {
			//search in Sales Org dialog
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("Zzerrloc", sap.ui.model.FilterOperator.Contains, sValue);
			oEvent.getSource().getBinding("items").filter([oFilter]);
		},
		vhErrLocationConfrim: function(oEvent) {
			var oSelItem = oEvent.getParameter("selectedItem");
			if (oSelItem) {
				var oInput = this.byId(this.ErrLocation);
				oInput.setValue(oSelItem.getTitle());
			}
			oEvent.getSource().getBinding("items").filter([]);
		},
		onVHDistibutionChnl: function(oEvent) {
			var sValue = oEvent.getSource().getValue();
			//Call F4 Dialog
			this.sDisChnl = "id_disChnl";
			if (!this._oVHDisChnlDialog) {

				this._oVHDisChnlDialog = sap.ui.xmlfragment("ZORDUPLOAD.fragment.VHDistributionChannel", this);
				this.getView().addDependent(this._oVHDisChnlDialog);

				jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oVHDisChnlDialog);
			}
			this._oVHDisChnlDialog.getBinding("items").filter([new Filter("Vtweg", sap.ui.model.FilterOperator.Contains, sValue)]);
			this._oVHDisChnlDialog.open(sValue);
		},
		vhDistributionChnlSearch: function(oEvent) {

			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("Vtweg", sap.ui.model.FilterOperator.Contains, sValue);
			oEvent.getSource().getBinding("items").filter([oFilter]);
		},
		vhDistributionChnlConfrim: function(oEvent) {
			var aContexts = oEvent.getParameter("selectedContexts");
			if (aContexts) {
				var oRow = aContexts[0].getObject();
				var sValue = oRow.Vtweg;
				var oInput = this.byId(this.sDisChnl);
				oInput.setValue(sValue);
			}
			oEvent.getSource().getBinding("items").filter([]);
		},
		onVHDivision: function(oEvent) {
			var sValue = oEvent.getSource().getValue();
			//Call F4 Dialog
			this.sDivision = "id_division";
			if (!this._oVHDivision) {

				this._oVHDivision = sap.ui.xmlfragment("ZORDUPLOAD.fragment.VHDivision", this);
				this.getView().addDependent(this._oVHDivision);

				jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oVHDivision);
			}
			this._oVHDivision.getBinding("items").filter([new Filter("Spart", sap.ui.model.FilterOperator.Contains, sValue)]);
			this._oVHDivision.open(sValue);
		},
		vhDivisionSearch: function(oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("Spart", sap.ui.model.FilterOperator.Contains, sValue);
			oEvent.getSource().getBinding("items").filter([oFilter]);
		},
		vhDivisionConfrim: function(oEvent) {
			var aContexts = oEvent.getParameter("selectedContexts");
			if (aContexts) {
				var oRow = aContexts[0].getObject();
				var sValue = oRow.Spart;
				var oInput = this.byId(this.sDivision);
				oInput.setValue(sValue);
			}
			oEvent.getSource().getBinding("items").filter([]);
		},
		onVHSol2Party: function(oEvent) {
			var sValue = oEvent.getSource().getValue();
			//Call F4 Dialog
			this.sSol2partId = "id_sol2Party";
			if (!this._oVHSol2PartyDialog) {

				this._oVHSol2PartyDialog = sap.ui.xmlfragment("ZORDUPLOAD.fragment.VHSold2Party", this);
				this.getView().addDependent(this._oVHSol2PartyDialog);

				jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oVHSol2PartyDialog);
			}
			this._oVHSol2PartyDialog.getBinding("items").filter([new Filter("Kunnr", sap.ui.model.FilterOperator.Contains, sValue)]);
			this._oVHSol2PartyDialog.open(sValue);
		},
		vhSoldToPartySearch: function(oEvent) {
			//search in dialog
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("Kunnr", sap.ui.model.FilterOperator.Contains, sValue);
			oEvent.getSource().getBinding("items").filter([oFilter]);
		},
		vhSoldToPartyConfirm: function(oEvent) {
			var aContexts = oEvent.getParameter("selectedContexts");
			//confirm in dialog
			if (aContexts) {
				var oRow = aContexts[0].getObject();
				var sValue = oRow.Kunnr;
				var oInput = this.byId(this.sSol2partId);
				oInput.setValue(sValue);
			}
			oEvent.getSource().getBinding("items").filter([]);
		},
		onVHShp2Party: function(oEvent) {
			var sValue = oEvent.getSource().getValue();
			//Call F4 Dialog
			this.sShp2partId = "id_shp2Party";
			if (!this._oVHShp2PartyDialog) {

				this._oVHShp2PartyDialog = sap.ui.xmlfragment("ZORDUPLOAD.fragment.VHShip2Party", this);
				this.getView().addDependent(this._oVHShp2PartyDialog);

				jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oVHShp2PartyDialog);
			}
			this._oVHShp2PartyDialog.getBinding("items").filter([new Filter("Kunnr", sap.ui.model.FilterOperator.Contains, sValue)]);
			this._oVHShp2PartyDialog.open(sValue);

		},
		vhShipToPartySearch: function(oEvent) {
			//search in dialog
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("Kunnr", sap.ui.model.FilterOperator.Contains, sValue);
			oEvent.getSource().getBinding("items").filter([oFilter]);
		},
		vhShipToPartyConfirm: function(oEvent) {
			var aContexts = oEvent.getParameter("selectedContexts");
			if (aContexts) {
				var oRow = aContexts[0].getObject();
				var sValue = oRow.Kunnr;
				var oInput = this.byId(this.sShp2partId);
				oInput.setValue(sValue);
			}
			oEvent.getSource().getBinding("items").filter([]);
		},
		onVHMaterial: function(oEvent) {
			var sValue = oEvent.getSource().getValue();
			//Call F4 Dialog
			var oRow = oEvent.getSource().getParent();
			if (oRow) {
				var oCells = oRow.getAggregation("cells");
				//matnr Column cell
				this.idEAN = oCells[3].getId();
				this.idCustMatnr = oCells[2].getId();
			}
			this.sMatnrId = oEvent.getSource().getId();
			if (!this._oVHMatnr) {

				this._oVHMatnr = sap.ui.xmlfragment("ZORDUPLOAD.fragment.VHMaterial", this);
				this.getView().addDependent(this._oVHMatnr);

				jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oVHMatnr);
			}
			this._oVHMatnr.getBinding("items").filter([new Filter("Matnr", sap.ui.model.FilterOperator.Contains, sValue)]);
			this._oVHMatnr.open(sValue);
		},
		vhMatnrSearch: function(oEvent) {
			//search in dialog
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("Matnr", sap.ui.model.FilterOperator.Contains, sValue);
			oEvent.getSource().getBinding("items").filter([oFilter]);
		},
		vhMatnrConfrim: function(oEvent) {
			//confirm in dialog
			var oSelItem = oEvent.getParameter("selectedItem");
			if (oSelItem) {
				var oInput = sap.ui.getCore().byId(this.sMatnrId);
				oInput.setValue(oSelItem.getTitle());
				var oCustMatnr = sap.ui.getCore().byId(this.idCustMatnr);
				oCustMatnr.setValue("");
				var oEAN = sap.ui.getCore().byId(this.idEAN);
				oEAN.setValue("");
			}
			oEvent.getSource().getBinding("items").filter([]);
		},
		onVHCustomerMaterial: function(oEvent) {
			var sValue = oEvent.getSource().getValue();
			this.idCustMatnr = oEvent.getSource().getId();
			var oRow = oEvent.getSource().getParent();
			if (oRow) {
				var oCells = oRow.getAggregation("cells");
				//matnr Column cell
				this.idrowMatnr = oCells[0].getId();
			}
			if (!this._oVHCustMatnr) {

				this._oVHCustMatnr = sap.ui.xmlfragment("ZORDUPLOAD.fragment.VHCustMaterial", this);
				this.getView().addDependent(this._oVHCustMatnr);

				jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oVHCustMatnr);
			}
			this._oVHCustMatnr.getBinding("items").filter([new Filter("Kdmat", sap.ui.model.FilterOperator.Contains, sValue)]);
			this._oVHCustMatnr.open(sValue);
		},
		vhCustMatnrSearch: function(oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("Kdmat", sap.ui.model.FilterOperator.Contains, sValue);
			oEvent.getSource().getBinding("items").filter([oFilter]);
		},
		vhCustMatnrConfrim: function(oEvent) {
			var aContexts = oEvent.getParameter("selectedContexts");
			if (aContexts) {
				var oRow = aContexts[0].getObject();
				var sCustMatValue = oRow.Kdmat;
				// var sMaterialValue = oRow.Matnr;

				var oCustMatnr = sap.ui.getCore().byId(this.idCustMatnr);
				// var oMatnr = sap.ui.getCore().byId(this.idrowMatnr);
				oCustMatnr.setValue(sCustMatValue);
				// oMatnr.setValue(sMaterialValue);
				// MessageToast.show("Material Number is identified..");
			}
			oEvent.getSource().getBinding("items").filter([]);
		},
		onVHEAN: function(oEvent) {
			var sValue = oEvent.getSource().getValue();
			this.idEAN = oEvent.getSource().getId();
			var oRow = oEvent.getSource().getParent();
			if (oRow) {
				var oCells = oRow.getAggregation("cells");
				//matnr Column cell
				this.idrowMatnr = oCells[0].getId();
			}
			if (!this._oVHEAN) {
				this._oVHEAN = sap.ui.xmlfragment("ZORDUPLOAD.fragment.VHEAN", this);
				this.getView().addDependent(this._oVHEAN);
				jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oVHEAN);
			}
			this._oVHEAN.getBinding("items").filter([new Filter("Ean11", sap.ui.model.FilterOperator.Contains, sValue)]);
			this._oVHEAN.open(sValue);
		},
		vhEANSearch: function(oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("Ean11", sap.ui.model.FilterOperator.Contains, sValue);
			oEvent.getSource().getBinding("items").filter([oFilter]);
		},
		vhEANConfrim: function(oEvent) {
			var aContexts = oEvent.getParameter("selectedContexts");
			if (aContexts) {
				var oRow = aContexts[0].getObject();
				var sEanValue = oRow.Ean11;
				// var sMaterialValue = oRow.Matnr;
				var oEAN = sap.ui.getCore().byId(this.idEAN);
				// var oMatnr = sap.ui.getCore().byId(this.idrowMatnr);
				oEAN.setValue(sEanValue);
				// oMatnr.setValue(sMaterialValue);
				// MessageToast.show("Material Number is identified..");
			}
			oEvent.getSource().getBinding("items").filter([]);
		}
	});

});