
var __builtins__ = {name: '__builtins__'}
function $module(name, body){
  function _import(){
    if(!body.scope){
      body.scope = Object.create(__builtins__)
      body.scope.__name__ = name
      var old_scope = $module.scope
      $module.scope = body.scope
      body.call(body.scope)
      $module.scope = old_scope
    }
    return body.scope
  }
  $module.modules[name] = _import;
}
$module.modules = {}
$module.scope = null

function $def(func){
  $module.scope[func.name] = func
}

function $class(bases, body){
  var name = body.name
  body.scope = {}

  var old_scope = $module.scope
  $module.scope = body.scope
  body.call(body.scope)
  $module.scope = old_scope

  cls = type(name, bases, body.scope)
  $module.scope[name] = cls
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
  if($module.scope)
      $module.scope[alias] = ret
  return ret
}


