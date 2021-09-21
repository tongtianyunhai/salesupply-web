import instance from '../utils/request'

export function searchPage(searchParams) {
   return instance.get("/gtGift/findByParams",{params:searchParams});
}

export function addEntity(formData) {
   return instance.post(`/gtGift/add`,formData);
}

export function editEntity(formData) {
   return instance.post(`/gtGift/update`,formData);
}

export function getGiftById(giftId) {
   return instance.post(`/gtGift/getGiftById/?giftId=${giftId}`);
}

export function searchPages(findGift) {
   return instance.post(`/gtGift/findByParam`,findGift);
}

export function findBrands() {
   return instance.post(`/gtGift/findBrands`,);
}

export function findTypes() {
   return instance.post(`/gtGift/findTypes`,);
}

export function findColors() {
   return instance.post(`/gtGift/findColors`,);
}

export function deleteById(giftId){
   return instance.delete(`/gtGift/delete/?giftId=${giftId}`);
}

export function findAllGifts() {
   return instance.get("/gtGift/findAll");
}