import instance from '../utils/request'
export function add(searchParams) {
    return instance.post("/gtAdjust/addAdjust",searchParams);
}
export function searchPagesAdj(searchParams) {
    return instance.post("/gtAdjust/searchPageByCriteria",searchParams);
}