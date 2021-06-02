import PBModel from './pbModel'

class Category extends PBModel {
    get name (){
        return this.getValue("name")
    }
}

export default Category
