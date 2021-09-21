//分页条件查询 五个参数 =====>对象
import instance from '../utils/request'
export function searchPage(searchParams) {
   return instance.get("/gdClassify/searchPageByCriteria",{params:searchParams});
}
export function primaryClassification() {
   return instance.post(`/gdClassify/primaryClassification`);
}

export function secondLevelDirectory(classifyId) {
   return instance.post(`/gdClassify/secondLevelDirectory/${classifyId}`);
}
export function addEntity(entity) {
   return instance.post(`/gdClassify/save`,entity);
}
export function update(entity) {
   return instance.post(`/gdClassify/update`, entity);
}

export function deleteById(id){
   return instance.delete(`/gdClassify/delete/${id}`);
}
