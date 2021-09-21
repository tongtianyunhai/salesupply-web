//分页条件查询 五个参数 =====>对象
import instance from '../utils/request'

export function searchPage(searchParams) {
    return instance.get("/spReturnwarehouse/searchPageByCriteria",{params:searchParams});
}

export function deleteById(id){
    return instance.delete(`/spReturnwarehouse/delete/${id}`);
}

export function addEntity(entity) {
    return instance.post(`/spReturnwarehouse/save`,entity);

}
export function update(entity) {
    return instance.put(`/spReturnwarehouse/update`,entity);

}

export function updatecheck(entity) {
    return instance.post(`/st_godown/addcheck`,entity);

}