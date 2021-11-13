/*
console.log('first');
setTimeout(
    function cb() { 
        console.log('second'); 
    }
, 0);
wait3Seconds();
console.log('third');

  
function wait3Seconds() {
    let start = Date.now(), now = start;
    while (now - start < 3 * 1000) {
        now = Date.now();
    }
}
*/
async function time(){
    await setTimeout(()=>{console.log("time")}, 3 * 1000)
    return 1;
}
async function what(){
    await time();
    console.log(22);
    console.log(33);
    console.log(44);
    console.log(55);
    return 1;
}

function test(){
    console.log(1);
    what()
    console.log(3);
    console.log(4);
    console.log(5);
}
test();