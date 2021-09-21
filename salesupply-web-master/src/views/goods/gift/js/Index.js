import {
    addEntity,
    deleteById,
    editEntity,
    findBrands,
    findColors,
    findTypes,
    getGiftById,
    searchPage,
    searchPages
} from '../../../../api/gift'

let gift = {

    data() {
        return {
            // 赠品类型
            typeList:[],
            // 赠品品牌
            brandList:[],
            // 颜色list
            colorList:[],
            // giftId列的显示状态
            show: false,
            // 赠品列表
            giftList: [],
            // 添加功能数据
            formData: {},
            // 查询条件
            findGift: {
                giftModel: "",
                giftBrand: "",
                giftColor: "",
                giftName: "",
                giftClassify: ""
            },
            // 模态框
            dialogVisible: false,
            //分页数据
            total: 0,
            searchParams: {
                currentPage: 1,
                pageSize: 5,
            },
        }
    },
    methods: {
        sizeChange(pageNums) {
            this.searchParams.pageSize = pageNums;
            this.findPage();
        },
        // 赠品品牌下拉框
        async findBrand(){
            this.brandList = await findBrands();
        },
        // 赠品类型下拉框
        async findType(){
            this.typeList = await findTypes();
        },
        // 赠品颜色下拉框
        async findColor(){
            this.colorList = await findColors();
        },
        // 分页
        currentPageChange(currentPage) {
            //console.log(currentPage);
            this.searchParams.currentPage = currentPage;
            this.findPage();
        },
        // 初始化表格
        restForm() {
            this.searchParams = {currentPage: 1, pageSize: 5};
            this.findGift = {};
            this.findPage();
        },
        // 赠品 的 模糊查询
        async searchGift() {
            //console.log("asd");
            //console.log(this.findGift);
            let res = await searchPages(this.findGift);
            this.giftList = res.data;
            console.log(res);
        },
        // 分页查询的第二种写法
        async findPage() {
            let res = await searchPage(this.searchParams);
            this.total = res.total;
            this.giftList = res.data;
        },
        // 添加或者编辑 模态框
        async addOrEdit() {
            var giftId = (this.formData.giftId);
            if (null != giftId) {
                let res = await editEntity(this.formData);
                if(res === 1){
                    alert("修改成功!~~~")
                }else {
                    alert("修改失败!~~~")
                }
                this.findPage();
            } else {
                let res = await addEntity(this.formData);
                if(res === 1){
                    alert("添加成功!~~~")
                }else {
                    alert("添加失败!~~~")
                }
                this.findPage();
            }
        },
        // 获取当前行数据到模态框中
        async edit(){
           // console.log(this.formData.giftId);
           this.formData = await getGiftById(this.formData.giftId);
        },
        // 删除赠品
        async deleteById(){
            await deleteById(this.formData.giftId);
            this.findPage();
        },
    },
    created() {
        this.findPage();  //所有赠品列表
        this.findBrand();
        this.findType();
        this.findColor();
    }
};


 export default gift;