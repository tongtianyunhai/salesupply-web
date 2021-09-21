import instance from '../utils/request.js'
//查询订单货单页面
export function findPage(orderCriteria) {
    return instance.get("/salesupply/sa-order/searchPageByCriteria",{params:orderCriteria})
}
export function findPage2(orderCriteria) {
    return instance.get("/salesupply/sa-order/searchPageByCriteria2",{params:orderCriteria})
}
export function findPage3(orderCriteria) {
    return instance.get("/salesupply/sa-order/searchPageByCriteria3",{params:orderCriteria})
}
export function findPage4(orderCriteria) {
    return instance.get("/salesupply/sa-order/searchPageByCriteria4",{params:orderCriteria})
}
//订单详情表
export function findById(id) {
    return instance.get("/salesupply/sa-order/findById",{params:id})
}
//订单详情表里对应的商品
export function findByOrderId(id) {
    return instance.get("/saOrderproduct/findByOrderId",{params:id})
}
//查询退货单页面
export function findReturnedPage(orderCriteria) {
    return instance.get("/salesupply/sa-returned/searchPageByCriteria",{params:orderCriteria})
}
//退货单详情
export function returnedInfoFindById(id) {
    return instance.get("/salesupply/sa-returned/returnedInfoFindById",{params:id})
}
// // 订单导出
export function downloadOrderExcel(id) {
    return instance.get("/salesupply/sa-order/orderExcel",{params:id})
}
export function salesOutExcel(id) {
    return instance.get("/salesupply/sa-order/salesOutExcel",{params:id})
}

