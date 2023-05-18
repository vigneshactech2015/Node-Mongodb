/*>>>>>>>>>if not inside event loop>>>>>>>>*/

const fs = require('fs')

setTimeout(()=>console.log('timer 1 finished'),0)

setImmediate(()=>console.log('immediate 1 finished'))

fs.readFile('./test-file.txt',()=>{console.log('I/O operation execution')})

console.log('Top Level code execution')

/*if not inside event loop
1.Top-level execution
2.Timer execution
3.immediate execution
4.I/o execution
*/

/*>>>>>>>>> inside event loop>>>>>>>>*/
//event-loop where callback function execution happens

fs.readFile('./test-file.txt',()=>{
    console.log('sync')
    setTimeout(()=>console.log("Timer 2 finished",0))
    setTimeout(()=>console.log("Timer 3 finished",3000))
    setImmediate(()=>console.log("immediate 2 finished"))
})

/*inside event loop
1.sync
2.immediate 2
3.timer 2
4.timer 3
*/
