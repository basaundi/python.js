
$module('datetime', function(){

$class('date', function(){
  $def('__init__', 
  function(year, month, day){
  })
})

$class('datetime', [this.date], function(){
  $def('__init__', undefined, undefined, undefined, 0, 0, 0, null,
  function(year, month, day, hour, minute, second, microsecond, tzinfo){

  })
})

})
