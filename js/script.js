function ItemModel(name, size) {
    var self = this;
    self.name = name;
    self.size = size;
    self.quantity = ko.observable(1);
}

function CartItemModel(name, size) {
    var self = this;
    ko.utils.extend(self, new ItemModel(name, size));
    self.price = 75;
    self.formatPrice = '$' + self.price.toFixed(2);
    self.imgSrc = 'images/classic-tee-sm.jpg';
    self.qty = ko.observable(self.quantity());
    self.quantity.subscribe((val)=>{
        self.qty(val);
    });
}



// This defines the data and behavior of the UI
function AppViewModel() {
    var self = this;
    self.itemSize = ko.observable("");
    self.cartItems = ko.observableArray();
    self.groupItems = ko.observableArray();
    self.totalCartItems = ko.observable(0);

    self.addToCart = function addToCart(){
        let newItemFlag = true;
        if(self.itemSize() === '') {
            alert("Select an item");
            return false;
        }
        self.cartItems.push(new ItemModel('Classic Tee',self.itemSize()));
        ko.utils.arrayMap(self.groupItems(), (item)=>{
            if(item.name === 'Classic Tee' && item.size === self.itemSize()){
                item.quantity(item.quantity() + 1);
                newItemFlag = false;
                self.groupItems.valueHasMutated();
            }
        });
        if(newItemFlag)
            self.groupItems.push(new CartItemModel('Classic Tee',self.itemSize()));
    }

    self.totalCartItems = ko.computed(()=>{
        let total = 0;
        ko.utils.arrayForEach(self.cartItems(), (item)=>{
            total += item.quantity();
        });
        return total;
    });
}

// Activates knockout.js
ko.applyBindings(new AppViewModel());