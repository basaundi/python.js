$module('builtins', function(){

$def(Math.abs)
$def(type)
$def(Math.pow)

$def(function print(){
  for(var arg in arguments)
    console.log(arguments[arg])
})

})
