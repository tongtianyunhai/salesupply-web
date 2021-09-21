import instance from '../utils/request.js'


//分页查询
export function findAll(page) {
    return instance.get("/salesupply/findInstore",{params:page})
}

//分页查询
export function updateInstore(params) {
    return instance.get("/salesupply/updateInstore",{params:params})
}
//根据id查询
export function findInstroeByid(params) {
    return instance.get("/salesupply/findInstroeByid",{params:params})
}