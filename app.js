(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['$scope','ShoppingListCheckOffService'];

function ToBuyController ($scope, ShoppingListCheckOffService){
	var itemAdder = this;

	itemAdder.boughtItem = function (itemIndex) {
	    ShoppingListCheckOffService.boughtItem(itemAdder.items[itemIndex].name, itemAdder.items[itemIndex].quantity, itemIndex);
	}

	itemAdder.items = ShoppingListCheckOffService.getItemsToBuy();
}

AlreadyBoughtController.$inject = ['$scope','ShoppingListCheckOffService'];

function AlreadyBoughtController ($scope, ShoppingListCheckOffService){
	var boughtItems = this;

	boughtItems.items = ShoppingListCheckOffService.getItemsBought();
}

function ShoppingListCheckOffService(){
	var service = this;

	var itemsToBuy = [];
	itemsToBuy[0] = {name:'cookies', quantity:'10'};
	itemsToBuy[1] = {name:'sausages', quantity:'3'};
	itemsToBuy[2] = {name:'beers', quantity:'5'};
	itemsToBuy[3] = {name:'eggs', quantity:'10'};
	itemsToBuy[4] = {name:'bread', quantity:'1'};

	var itemsBought = [];

	service.getItemsToBuy = function () {
    	return itemsToBuy;
    };

    service.getItemsBought = function () {
    	return itemsBought;
    };

    service.boughtItem = function (itemName, quantity, itemIndex) {
	    var item = {
	      name: itemName,
	      quantity: quantity
	    };

	    itemsBought.push(item);

	    itemsToBuy.splice(itemIndex, 1);
    };
}

})();