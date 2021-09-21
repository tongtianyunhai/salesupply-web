import instance from "@/utils/request";

export function findColors() {
    return instance.get("/gdGoods/findColors");
}

export function searchPages(searchParams) {
    return instance.get("/gdGoods/searchPageByCriteria", {params: searchParams});
}
export function searchPagesGGG(searchParams) {
    return instance.get("/gdGood2gift/searchPageByCriteria", {params: searchParams});
}

export function deleteById(id) {
    return instance.delete(`/gdGoods/delete/${id}`);
}
export function deleteGGG(id) {
    return instance.delete(`/gdGood2gift/delete/${id}`);
}

export function update(entity) {
    return instance.post(`/gdGoods/update/`, entity);
}

export function addOneGood(entity) {
    return instance.put(`/gdGoods/addGoods/`, entity);
}

export function addGood2Gifts(entity) {
    return instance.post(`/gdGood2gift/add/`, entity);
}
export function updateGGG(entity) {
    return instance.post(`/gdGood2gift/update/`, entity);
}