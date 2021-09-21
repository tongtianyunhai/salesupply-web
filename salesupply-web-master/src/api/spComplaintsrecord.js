//分页条件查询 五个参数 =====>对象
import instance from '../utils/request'

export function searchPage(searchParams) {
    return instance.get("/spComplaintsrecord/searchPageByCriteria",{params:searchParams});
}

export function deleteById(id){
    return instance.delete(`/spComplaintsrecord/delete/${id}`);
}

export function addEntity(entity) {
    return instance.post(`/spComplaintsrecord/save`,entity);

}

export function update(entity) {
    return instance.put(`/spComplaintsrecord/update`,entity);

}
export function updatecheck(entity) {
    return instance.post(`/st_godown/addcheck`,entity);

}

export function searchPage2(searchParams2) {
    return instance.get("/saOrderproduct/searchPageByCriteria",{params:searchParams2});
}