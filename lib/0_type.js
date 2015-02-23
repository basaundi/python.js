
function $mixin(target, bases, extra){
    bases.push(extra);
    // TODO: Correct mro
    for (var i in bases){
        var base = bases[i];
        for(var k in base){
            switch(k){
                case "__class__":
                    continue
            }
            target[k] = base[k];
        }
    }
    return target;
}

function bind(t, s){
    for(var k in s) {
        var o = s[k];
        if(!!(o && o.constructor && o.call && o.apply)){
            if(k == '__new__'){
                t[k] = s[k];
            }else{
                (function(key, v){
                    Object.defineProperty(t, k, {
                        enumerable: true,
                        get: function(){
                            if(this.__class__ === type) return v;
                            return v.bind(null, this);
                        }
                    });
                })(k, s[k]);
            }
        }else{
            t[k] = s[k];
        }
    }
}

function type(name, bases, dict){
    if(!bases.length) bases = [object];
    function class_ () {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(class_);
        var x = class_.__new__.apply(class_, args);
        x.__class__ = class_;
        x.__init__.apply(this, arguments);
        return x;
    }
    class_.__name__ = name;
    class_.__class__ = type;
    var base = $mixin({}, bases, dict);
    bind(class_, base);
    return class_;
}
type.__class__ = type;

// Type system
var object = {
    __class__: type,
    __name__: 'object',
    __new__: function(cls){
        return Object.create(cls);
    },
}
