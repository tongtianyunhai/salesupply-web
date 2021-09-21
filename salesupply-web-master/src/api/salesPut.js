import instance from '../utils/request.js'

//分页查询
export function findAll(page) {
   return instance.get("/st_godown/findAll",{params:page})
}

//根据id查找换货单
export function findChange(params) {
   return instance.get("/st_godown/findChangegoodsById",{params:params})
}

//根据id查找退货单
export function findReturngoods(params) {
   return instance.get("/st_godown/findReturngoodsById",{params:params})
}

//根据id查找返厂单
export function findrRturnwarehouse(params) {
   return instance.get("/st_godown/findrRturnwarehouseById",{params:params})
}

//根据id修改状态
export function updateStatus(params) {
   return instance.get("/st_godown/updateStatus",{params:params})
}



//生成入库单
export function addAfterSinglePut(params) {
   return instance.get("/salesupply/addInstore",{params:params})
}