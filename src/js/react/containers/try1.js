


function sleep() {
    return new Promise((resolve) => {
        //resolve(null)
        setTimeout(() => {
            console.log(555)
            resolve(555)
        }, 500);
    })
}


async function gogogo(params) {
    for(let i=0;i<9;i++){
        console.log('i--->', i)
        await sleep();
        // console.log('AAAA')
        // //-----Promise / wait
        // setTimeout(() => {
        //     console.log('i--->', i)
        // }, 500);
        // console.log('BBBB')
        
    }
    
}
gogogo()

