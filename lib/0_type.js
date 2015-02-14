
function isFunction(object) {
  return !!(object && object.constructor && object.call && object.apply);
}

function mixin(target, bases, extra){
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
        if(isFunction(s[k])){
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
    var base = mixin({}, bases, dict);
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


if (this.__name__ == '__main__') {
    var Shape = type('Shape', [], {
        __init__: function(self, x, y){
            self.x = x;
            self.y = y;
        },
        description: "This shape has not been described yet",
        author: "Nobody has claimed to make this shape yet",
        area: function(self){
            return self.x * self.y;
        },
        perimeter: function(self){
            return 2 * self.x + 2 * self.y;
        },
        describe: function(self,text){
            self.description = text;
        },
        authorName: function(self,text){
            self.author = text;
        },
        scaleSize: function(self,scale){
            self.x = self.x * scale;
            self.y = self.y * scale;
        }
    });

    var Square = type('Square', [Shape], {
        __init__: function(self,x){
            self.x = x;
            self.y = x;
        }
    });

    // TEST
    print('test');
    var rectangle = Shape(100,45);
    print(rectangle.x);
    print(rectangle.y);
    print(rectangle.area());
    print(Shape.author);
    print(rectangle.author);
    var square = Square(100);
    print(square.area());
}

