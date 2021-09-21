//分页条件查询 五个参数 =====>对象
import instance from '../utils/request'

export function searchPage(searchParams) {
    return instance.get("/saOrderproduct/searchPageByCriteria",{params:searchParams});
}

export function deleteById(id){
    return instance.delete(`/spOutwarehouse/delete/${id}`);
}

export function addEntity(entity) {
    return instance.post(`/spOutwarehouse/save`,entity);

}

export function findById(entity) {
    return instance.post(`/spOutwarehouse/findById ${id}`,entity);

}

export function update(entity) {
    return instance.put(`/spOutwarehouse/update`,entity);

}