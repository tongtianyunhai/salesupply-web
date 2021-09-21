import {findBrands, findClassify} from "@/api/product";
import {addGood2Gifts, deleteGGG, findColors, searchPages, searchPagesGGG, updateGGG} from "@/api/goods";
import {Notification} from 'element-ui';

let G2g = {
    data() {
        return {
            classifies: [],
            total: 0,
            tableData: [],
            tableDataGGG: [],
            dialogVisible: false,
            dialogVisible2: false,
            dialogVisible3: false,
            dialogVisible4: false,
            dialogVisible5: false,
            formData3: {},
            formData4: {},
            formData5: {},
            searchParams2: {
                currentPage: 1,//当前页
                pageSize: 3,//每页显示条数
                goodsClassify: '',
                approvalStatus: '',
                goodsName: '',
            },
            colors: [],
            brands: [],
            typeData: ["未审核", "已审核", "未通过"],
            searchParams: {
                currentPage: 1,//当前页
                pageSize: 3,//每页显示条数
                goodsClassify: '',
                goodsBrand: '',
                goodsColor: '',
                goodsType: '',
                goodsName: '',
            },
            totalGGG: 0,
            searchParamsGGG: {
                currentPage: 1,//当前页
                pageSize: 3,//每页显示条数
            },
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

        }
    },
    methods: {
        init() {
            findColors().then(res => {
                this.colors = res;
            });
            findBrands().then(res => {
                this.brands = res;
            });
            findClassify().then(res => {
                this.classifies = res;
            });
        },
        findPage() {
            searchPages(this.searchParams).then(res => {
                this.total = res.total;
                this.tableData = res.data;
            })
        },
        currentPageChange(currentPage) {
            this.searchParams.currentPage = currentPage;
            this.findPage();
        },
        currentPageChangeGGG(currentPage) {
            this.searchParamsGGG.currentPage = currentPage;
            this.findPageGGG();
        },
        resetSearchParams() {
            this.searchParams = {currentPage: 1, pageSize: 3};
            this.findPageGGG();
        },
        chooseGoods(goodsId) {
            console.log(goodsId);
            this.tableData.forEach(goods => {
                if (goods.goodsId === goodsId) {
                    this.formData3 = goods;
                }
            })
        },
        async addgood2gift() {
            if (this.formData3.goodInventoryQuantity > this.formData3.goodsLowstock) {
                alert("数量太多了 你个hape!!!");
            } else {
                this.formData3.approvalStatus = 0;
                this.formData3.goodId = this.formData3.goodsId;
                console.log(this.formData3);
                await addGood2Gifts(this.formData3).then(res => {
                    console.log(res)
                    Notification.success("插入成功");
                });
            }
            this.findPageGGG();
        },
        findPageGGG() {
            searchPagesGGG(this.searchParamsGGG).then(res => {
                console.log(res)
                this.totalGGG = res.total;
                this.tableDataGGG = res.data;
            });
        },
        clearAndAddLook(goodId) {
            this.tableDataGGG.forEach(ggg => {
                if (ggg.goodId === goodId) {
                    this.formData4 = ggg;
                }
            })
        },
        clearAndAddUpdate(goodId) {
            this.tableDataGGG.forEach(ggg => {
                if (ggg.goodId === goodId) {
                    this.formData5 = ggg;
                }
            })
        },
        updateGGG() {
            if (this.formData5.goodInventoryQuantity > this.formData5.goodsLowstock) {
                alert("多了多了 hape")
            }
            updateGGG(this.formData5);
            this.findPageGGG();
        },
        async clearAndAddDelete(id) {
            console.log(id)
            await deleteGGG(id);
            this.findPageGGG();
        }
    },
    created() {
        this.init();
        this.findPage()
        this.findPageGGG();
    }
}
export default G2g;