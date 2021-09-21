//分页条件查询 五个参数 =====>对象
import instance from '../utils/request'
export function searchPage(searchParams) {
   return instance.get("/gdBrand/searchPageByCriteria",{params:searchParams});
}
export function deleteById(id){
   return instance.delete(`/gdBrand/delete/${id}`);
}

export function addEntity(entity) {
   return instance.post(`/gdBrand/save`, entity);
}
export function update(entity) {
   return instance.post(`/gdBrand/update`, entity);
}