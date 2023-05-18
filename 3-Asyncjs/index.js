const fs = require('fs')
const superagent = require('superagent')
fs.readFile(`${__dirname}/dog.txt`,(err,data)=>{
    superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err,res)=>{
        if(err) return console.log(err.message)
        console.log(res.body.message)

        fs.writeFile('./dog-img.txt',res.body.message,(err)=>console.log('Random dog saved'))
    })
})

/*>>>>>>>using promise>>>>>>>>>*/

const fs = require('fs')
const superagent = require('superagent')

const readFilePro = file =>{
    return new Promise((resolve,reject)=>{
        fs.readFile(file,(err,data)=>{
            if(err) reject('File not found')
            resolve(data)
        })
    })
}

const writeFilePro = (file,data) =>{
    return new Promise((resolve,reject)=>{
        fs.writeFile(file,data,err=>{
            if(err) reject('could not write file')
            resolve('success')
        })
    })
}

readFilePro(`${__dirname}/dog.txt`).then((data)=>{
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
    }).then(res=>{
        return writeFilePro('dog-img.txt',res.body.message)
    }).then(()=>console.log('saved successfully')).catch((err)=>console.log(err))

/*>>>>>>>>>>>>>>>async await */    

const getDogPic = async ()=>{
    const data = await readFilePro(`${__dirname}/dog.txt`)
    const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
    await  writeFilePro('dog-img.txt',res.body.message)
    console.log('saved successfully')
}

getDogPic()