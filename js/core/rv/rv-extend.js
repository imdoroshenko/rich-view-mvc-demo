RV.extend = function(){
    var obj = arguments[0];
    var i = 1;
    if(!obj.__chain__){
        obj.__chain__ = [];
    }
    for(var ln = arguments.length; i < ln; i++){
        var cnstr = arguments[i];
        if(obj.__chain__.indexOf(cnstr) === -1){
            obj.__chain__.push(cnstr);
            cnstr.call(obj);
        }
    }
    return obj;
};