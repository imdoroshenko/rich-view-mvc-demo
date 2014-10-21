RV.EventNameSpace = function(name) {
    var ns = this;

    this.eventCollections = {};
    this.nameSpace = name;

    var EventManager = function(){
        this.triggering = true;
        this.valid = true;
        this.childs = [];
        this.childsLn = 0;
        this.target = null;
    };

    var getListenerIndex = function(eventName, listener) {
        for(var i = 0, l = ns.eventCollections.length; i < l; i++) {
            if (listener === ns.eventCollections[i].listener) {
                return i;
            }
        }
        return -1;
    };
    var addListener = function(eventName, listener, priority, isRemove, target) {
        if(!ns.eventCollections[eventName]) {
            ns.eventCollections[eventName] = [];
        }
        var listener = {
            isRemove: !!isRemove,
            listener: listener,
            em: this,
            target: target||null
        };
        if (-1 === getListenerIndex(eventName, listener)) {
            priority = typeof(priority) === 'undefined'? ns.eventCollections[eventName].length : priority;
            ns.eventCollections[eventName].splice(priority, 0, listener);
        }
        return this;
    };
    var addListenerToSpecificTarget = function (target, eventName, listener, priority, isRemove) {
        addListener(eventName, listener, priority, isRemove, target);
    };
    var getListenerPriority = function(eventName, listener) {
        var index = getListenerIndex(eventName, listener);
        return -1 !== index
            ? index
            : undefined;
    };
    var removeListener = function(eventName, listener) {
        if (!eventName && !listener) {
            ns.eventCollections = [];
            return this;
        }

        if (eventName && !listener) {
            if (ns.eventCollections.hasOwnProperty(eventName)) {
                delete ns.eventCollections[eventName];
            }
        }

        var index = getListenerIndex(eventName, listener);
        if (-1 !== index) {
            ns.eventCollections[eventName].splice(index, 1);
        }
        return this;
    };
    var triggerEvent = function(eventName, params){
        this.valid = true;
        if(ns.eventCollections[eventName]){
            var events = ns.eventCollections[eventName];
            for(var i = 0, ln = events.length; i < ln && this.triggering; i++){
                var listenerObj = events[i];
                if (!listenerObj
                    || !listenerObj.listener
                    || (listenerObj.target && listenerObj.target != this.target)) {
                    continue;
                }
                var listener = listenerObj.listener;
                var eventObject = {
                    //eventManager : listenerObj.em,
                    event : eventName,
                    target : this.getTarget(),
                    params : params || null,
                    nameSpace : ns.nameSpace
                };
                if(Array.isArray(listener)){
                    listener[1].call(listener[0], eventObject);
                }else{
                    listener(eventObject);
                }
                if (listenerObj.isRemove) {
                    this.removeListener(eventName, listener);
                    i -= 1;
                    ln -= 1;
                }
            }
        }
        for(var k = this.childsLn; k-- > 0;){
            this.childs[k].triggerEvent(eventName, params);
        }
        this.triggering = true;
        return this;
    };

    EventManager.prototype = {
        on : addListener,
        onTarget: addListenerToSpecificTarget,
        once : function(eventName, listener, priority) {
            return this.addListener(eventName, listener, priority, true);
        },
        addListener : addListener,
        addEventListener : addListener,
        getListenerPriority : getListenerPriority,
        removeListener : removeListener,
        removeEventListener : removeListener,
        off : removeListener,
        triggerEvent : triggerEvent,
        trigger : triggerEvent,
        stopTriggering : function(){
            this.triggering = false;
            return this;
        },
        getTarget : function(){
            return this.target;
        },
        clear : function(name) {
            throw new Error('you must test this function');

            for (var eventName in ns.eventCollections) {
                if (name && eventName !== name) {
                    continue;
                }
                for (var ln = ns.eventCollections[eventName].length; ln-- > 0;){
                    if (ns.eventCollections[eventName][ln].em === this) {
                        ns.eventCollections[eventName].splice(ln, 1);
                    }
                }
            }
            return this;
        },
        setTarget : function(obj){
            this.target = obj;
            return this;
        },
        isValid : function(){
            return this.valid;
        },
        setValid : function(o){
            this.valid = o;
            return this;
        },
        extend : function(em){
            em.addChild(this);
            return this;
        },
        addChild : function(em){
            this.childs.push(em);
            this.childsLn++;
            return this;
        }
    };

    this.getEventManager = function (target) {
        return new EventManager().setTarget(target);
    };
};

RV.routerNS = new RV.EventNameSpace('Router');
RV.viewNS = new RV.EventNameSpace('View');
RV.modelNS = new RV.EventNameSpace('Model');