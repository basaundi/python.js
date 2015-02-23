
var __builtins__ = {name: '__builtins__'}
function $module(name, body){
  function _import(){
    if(!body.scope){
      body.scope = Object.create(__builtins__)
      body.scope.__name__ = name
      body.call(body.scope)
    }
    return body.scope
  }
  $module.modules[name] = _import;
}
$module.modules = {}

function $def(func){
  $def.caller.scope[func.name] = func
}

function $class(bases, body){
  var name = body.name
  body.scope = {}
  body.call(body.scope)
  cls = type(name, bases, body.scope)
  $class.caller.scope[name] = cls
  return cls
}

function $import(module, name, asname){
  var ret = $module.modules[module]()
  var alias = module
  if(name){
    ret = ret[name]
    alias = name
  }
  if(asname){
    alias = asname
  }
  if($import.caller.scope)
      $import.caller.scope[alias] = ret
  return ret
}


