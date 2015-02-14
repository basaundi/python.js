
function $module(name, body){
  function _import(){
    if(!body.scope){
      body.scope = {__name__: name}
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

function __import__(name, globals, locals, fromlist, level){
  return $module.modules[name]()
}

