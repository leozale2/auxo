const {Actor} = require("cqrs");

module.exports = class User extends Actor{
  constructor(data){
     super({
       name: data.name ,
       createTime: Date.now()
     });
  }

  changeName(name){
    this.$(name);
  }

  get updater(){
    return {
      changeName(json,event){
        return {
          name: event.data
        }
      }
    }
  }

}
