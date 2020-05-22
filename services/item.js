const { Op } = require('sequelize');

const ItemService = class {
    constructor(itemModel, userModel){
        this.itemModel = itemModel;
        this.userModel = userModel;
    }
    async register(user, item){
        const { name , price, content, stock, owner, title_img } = item;
        try{
            const exItem = await this.itemModel.create({
                name,
                item,
                content,
                stock,
                owner,
                price,
                userId : user.id,
            });
            let result ={};
            if(exItem){
               result = { result : true, msg : 'success'};
            } else {
                result = { result : false, msg : "error"};
            }
            return result;
        }catch(err){
            console.error(err);
        }
    }
    async getItemList(){
        try{
            const items = await this.itemModel.findAll();
            return items;
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    async getItem(itemId){
        try{
            const item = await this.itemModel.findOne({where : { id : itemId}});
            return item;
        } catch (err) {
            console.error(err);
        }
    }
};

module.exports = ItemService;
