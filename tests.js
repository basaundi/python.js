
require('./lib/0_type.js');

exports.testSomething = function(test){
    var A = type('A', [], {}); // Empty type
    test.expect(1);
    test.ok(true, "this assertion should pass");
    test.done();
};

exports.testSomethingElse = function(test){
    test.ok(false, "this assertion should fail");
    test.done();
};
