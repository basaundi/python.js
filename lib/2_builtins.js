function builtins(){
$module.scope = this.scope = __builtins__

$def(Math.abs)
$def(type)
$def(Math.pow)

$def(function print(){
  for(var arg in arguments)
    console.log(arguments[arg])
})

$def(function* enumerate(iterable, start){
  start = start || 0;
  for(var el of iterable) yield [start++, el]
})

}; builtins.call(builtins)