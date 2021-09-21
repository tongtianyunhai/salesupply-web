import instance from "@/utils/request";
export function findColors() {
    return instance.get("/gdProduct/findColors");
}
export function findBrands() {
    return instance.get("/gdBrand/allProduct");
}
export function findClassify() {
    return instance.get("/gdClassify/findClassifies");
}
export function searchPage(searchParams) {
    return instance.get("/gdProduct/searchPageByCriteria", {params:searchParams});
}