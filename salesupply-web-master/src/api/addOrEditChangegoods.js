//分页条件查询 五个参数 =====>对象
import instance from '../utils/request'

export function searchPage(searchParams) {
    return instance.get("/saOrderproduct/searchPageByCriteria",{params:searchParams});
}

export function searchPage2(searchParams2) {
    return instance.get("/spChangegoods/searchPageBygoodsname",{params:searchParams2});
}



export function deleteById(id){
    return instance.delete(`/spChangegoods/delete/${id}`);
}

export function addEntity(entity) {
    return instance.post(`/spChangegoods/save`,entity);

}

export function findById(entity) {
    return instance.post(`/spChangegoods/findById ${id}`,entity);

}

export function update(entity) {
    return instance.put(`/spChangegoods/update`,entity);

}