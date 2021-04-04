import PBModel from "./pbModel";

class Product extends PBModel {
    get name() {
        return this.getValue('name');
    }

    get title() {
        return this.name;
    }

    get shortDescription() {
        return this.getValue('short_description');
    }

    get description() {
        return this.getValue('description');
    }

    get price() {
        return this.getValue('price');
    }

    get regularPrice() {
        return this.getValue('regular_price');
    }

    get onSale() {
        return this.getValue('on_sale');
    }

    get imageUrl() {
        const images = this.getValue('images');
        if(images && images.length > 0) {
            return images[0].src;
        }

        return '';
    }
}

export default Product;
