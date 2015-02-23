
function code(path){
  return require('fs').readFileSync('./lib/' + path, 'utf8');
}
eval(code('0_type.js'));

exports.testType = function(test){
    var A = type('A', [], {}); // Empty type
    test.ok(A);
    var B = type('B', [], {
        __init__: function(self, v){
          self.v = v;
        },
        getValue: function(self){
          return self.v;
        }
    })
    var b = B(7);
    test.equal(b.getValue(), 7, "getValue");
    var C = type('C', [B], {
        __init__: function(self, v){
          self.v = v * 2;
        }
    })
    var c = C(4);
    test.equal(c.getValue(), 8);
    test.done();
};

