import instance from '../utils/request'

export function findPromote(findAll) {
    return instance.post("/gtPromote/findAll",findAll);
}

export function checkPromotes(promoteId){
    return instance.post(`/gtPromote/checkPromotes/?promoteId=${promoteId}`);
}

export function searchPages(searchParams) {
    return instance.get("/gdGoods/searchPageByCriteria", {params: searchParams});
}

export function selectOne(goodsId) {
    return instance.post(`/gtPromote/selectOne/?goodsId=${goodsId}`);
}

export function addPromote(resdata) {
    return instance.post(`/gtPromote/addPromote`,resdata);
}
export function editPromote(resdata) {
    return instance.post(`/gtPromote/editPromote`,resdata);
}


