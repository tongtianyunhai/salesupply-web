import instance from '../utils/request'

export function findPages(searchParams) {
    return instance.get("/gdGift2good/GdGift2good",{params:searchParams});
}

export function addGift2Good(resdata) {
    return instance.post('/gdGift2good/addGdGift2good',resdata);
}

export function findGiftToGoods(findAll) {
    return instance.post('/gdGift2good/findAll',findAll);
}

export function findOneByRemark1(remark1) {
    return instance.post('/gdGift2good/findOneByRemark1',remark1);
}

export function editGift2Good(resdata) {
    return instance.post('/gdGift2good/editGdGift2good',resdata);
}



// export function delById(giftId) {
//     return instance.delete('/gdGift2good/del/?giftId=${giftId}');
// }


