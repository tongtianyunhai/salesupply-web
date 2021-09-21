import {
    findBrands,
    findColors,
    findTypes,
    getGiftById,
    findAllGifts, searchPage,
} from "../../../../api/gift";
import {findPages, addGift2Good, editGift2Good,findGiftToGoods,findOneByRemark1} from "../../../../api/gift2goods";


let gift2good = {
    data() {
        return {
            // 商品分类
            goodType: [],
            // 商品颜色
            goodColor: [],
            //商品品牌
            goodBrand: [],
            //审核状态
            checkState: [
                {
                    value: 0,
                    label: "未审核"
                }, {
                    value: 1,
                    label: "已审核"
                }, {
                    value: 2,
                    label: "审核未通过"
                }],
            // 查询条件
            findMsg: {
                giftName: "",
                giftClassify: "",
                giftColor: "",
                giftBrand: "",
                approvalStatus: "",
                currentPage: 1,
                pageSize: 5
            },
            //分页数据
            total: 0,
            // searchParams: {
            //     currentPage: 1,
            //     pageSize: 5
            // },
            // 表格数据
            changeList: [],
            // 模态框数据 第一层数据!!
            dialogVisible: false,
            formData: {},
            // 第一层模态框 中要提交到后台的数据
            addGift2Goods: {},
            // 第二层模态框, 选择赠品
            dialogVisible1: false,
            giftList1: [],
            // giftId列的显示状态
            show: false,
            //赠品转商品 表格 页面的数据
            gifttogoodList: {},
        }
    },
    methods: {
        // 分页 设置 每页显示条数
        sizeChange(pageNums) {
            this.findMsg.pageSize = pageNums;
            this.findGift2Good();
        },
        // 让要修改的单条数据显示在模态框上 根据 this.gifttogoodList.remark1 查询对应数据
        async editgifttogood(){
            var remark1 = this.gifttogoodList.remark1;
            this.formData = await findOneByRemark1(remark1);
            this.formData.remark1 = remark1;
        },
        // 显示所有赠品转商品的内容
        async findGift2Good() {
            let findAll = JSON.parse(JSON.stringify(this.findMsg));

            let res = await findGiftToGoods(findAll);
            this.total = res.total;
            this.changeList = res.data;
            //console.log(this.changeList);
        },
        // 分页
        currentPageChange(currentPage) {
            //console.log(currentPage);
            this.findMsg.currentPage = currentPage;
            this.findGift2Good();
        },
        // 商品分类下拉框
        async findType() {
            this.goodType = await findTypes();
            //console.log(this.goodType);
        },
        // 商品颜色下拉框
        async findColor() {
            this.goodColor = await findColors();
        },
        // 商品品牌下拉框
        async findBrand() {
            this.goodBrand = await findBrands();
        },
        // 选择当前行的赠品,获取其赠品id==>传给第一层模态框,查询出对应的赠品信息
        // 显示在第一层模态框的相应位置上
        async choice() { // 内层模态框,获取数据到外层模态框数据
            this.formData = await getGiftById(this.giftList1.giftId);
            this.giftId = this.giftList1.giftId;
        },

        // 外层模态框,获取数据到 内层模态框显示
        async findAllGift() {
            this.giftList1 = await findAllGifts(); //查询所有的赠品,无分页!
        },
        // 另一个同方法的按钮, 在下面的table修改中
        async addOrEdit1() {
            //console.log(this.gifttogoodList.remark1);
            if (this.formData.giftLowstock < this.formData.giftSwitchPutwarehouse) {
                alert("添加商品数不能超过库存数!!!!")
            }
            if (this.formData.remark1 != null) {
                // 修改 .. 根据 gifttogoodList.remark1 查询单条数据
                //console.log('修改');
                let resdata = JSON.parse(JSON.stringify(this.formData));
                let res = await editGift2Good(resdata);
                if (res === 1) {
                    alert("修改成功!~~~");
                } else {
                    alert("修改失败!~~~")
                }
            } else {
                // 添加
                this.addGift2Goods = {
                    remark1:null,
                    giftId: this.formData.giftId,
                    giftSwitchPutwarehouse: this.formData.giftSwitchPutwarehouse,
                    giftSwichTyprice: this.formData.giftSwichTyprice,
                    giftApprovaid: this.formData.giftId,
                };
                //console.log(this.addGift2Goods);
                let resdata = JSON.parse(JSON.stringify(this.addGift2Goods));
                //console.log("运行记录组件接到的数据",resdata);
                let res = await addGift2Good(resdata);
                //console.log(res);
                if (res === 2) {
                    alert("添加成功!~~~");
                } else {
                    alert("添加失败!~~~")
                }
            }
            this.findGift2Good();
        },
        // 删除赠品
        // async deleteById() {
        //     await delById(this.gifttogoodList.giftId);
        //     this.findGift2Good();
        // },

    },
    created() {
        this.findBrand();
        this.findType();
        this.findColor();
        this.findGift2Good();
    }
};

export default gift2good;