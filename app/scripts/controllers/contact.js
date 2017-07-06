'use strict';


/**
 * @ngdoc function
 * @name angularjsApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the angularjsApp
 */


angular.module('angularjsApp')
    .controller('ContactCtrl', ContactCtrl);


function ContactCtrl(uiGridConstants, $timeout) {

    var vm = this;
    vm.mySelectedRows = [];

    vm.myData = [{ name: "Moroni", age: 50 },
        { name: "Tiancum", age: 43 },
        { name: "Jacob", age: 27 },
        { name: "Nephi", age: 29 },
        { name: "Enos", age: 34 },
        { name: "Fábio", age: 14 },
        { name: "Fred", age: 53 },
        { name: "João", age: 45 }
    ];

    vm.gridOptions = {
        // enableSorting: true,
        // enableCellEditOnFocus: true,
        //enableCellSelection: false,
        // enableRowSelection: true,
        // rowSelection: true,
        // enableFullRowSelection: false,
        // isRowSelectable: true,
        // noUnselect: true,
        // selectedItems: true,
        // selectRow: true,
        // resizable: true,
        // enableRowHeaderSelection: false,
        // enableCellSelection: true,
        // enableCellEdit: true,
        // enableSelectAll: false,
        // modifierKeysToMultiSelect: true,
        // enableRowHeaderSelection: false,
        multiSelect: false,
        // selectionRowHeaderWidth: 35,
        // rowHeight: 35,
        // showGridFooter: true,
        enableRowSelection: true,
        enableSelectAll: true,
        enableFullRowSelection: true,
        data: vm.myData,
        // rowTemplate: '<div ng-click="contact.teste(row)" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" class="ui-grid-cell" ng-class="col.colIndex()" ui-grid-cell></div>',
        // rowTemplate: '<div style="background-color: yellow" ng-repeat="col in colContainer.renderedColumns track by col.colDef.name" ng-click="vm.teste()" class="ui-grid-cell" ui-grid-cell></div>',
        rowTemplate: ' <div ng-click="grid.appScope.contact.teste()" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.uid" ui-grid-one-bind-id-grid="rowRenderIndex + \'-\' + col.uid + \'-cell\'" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" role="{{col.isRowHeader ? \'rowheader\' : \'gridcell\'}}" ui-grid-cell></div>',
        columnDefs: [
            { field: 'name', displayName: 'Nome' },
            { field: 'age', displayName: 'Idade' }
        ]
    };

    vm.gridOptions.onRegisterApi = function(gridApi) {
        vm.gridApi = gridApi;
        vm.gridApi.core.notifyDataChange(uiGridConstants.dataChange.ROW);
    };

    vm.ok = function() {
        vm.gridOptions.enableFullRowSelection = !vm.gridOptions.enableFullRowSelection;
        vm.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
    };

    vm.teste = function() {
        if (vm.gridApi.selection.getSelectedRows().length > 0) {
            vm.mySelectedRows = vm.gridApi.selection.getSelectedRows();
            vm.nome = vm.mySelectedRows[0].name;
            vm.idade = vm.mySelectedRows[0].age;
        }

    };

    vm.select = function() {
        $timeout(function() {
            vm.gridApi.selection.selectRow(vm.gridOptions.data[0], vm.gridOptions.data[0].$$hashKey);
            vm.nome = vm.gridOptions.data[0].name;
            vm.idade = vm.gridOptions.data[0].age;
        }, 50);
    };


    vm.select();


}