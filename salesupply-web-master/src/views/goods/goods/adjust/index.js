import {findColors, searchPages} from "@/api/goods";
import {findBrands, findClassify} from "@/api/product";
import {add, searchPagesAdj} from "@/api/adjust";

let adjust = {
    data() {
        return {
            startendTime: "",
            formData3: {},
            formData4: {
                startendTime:[]
            },
            dialogVisible: false,
            dialogVisible2: false,
            dialogVisible3: false,
            dialogVisible4: false,
            dialogVisible5: false,
            dialogVisible6: false,
            //日期组件
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            tableDataAdj: "",
            value2: "",
            // 价格调整策略
            adjustType: [
                {
                    value: 1,
                    label: "绝对值"
                }, {
                    value: 2,
                    label: "百分比"
                }
            ],
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
            searchParamsAdj: {
                currentPage: 1,//当前页
                pageSize: 3,//每页显示条数
                goodsName: '',
                approvalStatus: '',
                value2: [],

            },
            colors: [],
            brands: [],
            searchParams: {
                currentPage: 1,//当前页
                pageSize: 3,//每页显示条数
                goodsClassify: '',
                goodsBrand: '',
                goodsColor: '',
                goodsType: '',
                goodsName: '',
            },
            totalAdj: 0,
            tableData: [],
            total: 0,
            typeData: ["未审核", "已审核", "未通过"],


        };
    },
    methods: {
        // 商品
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
        resetSearchParams() {
            this.searchParams = {currentPage: 1, pageSize: 3};
            this.findPage();
        },
        chooseGoods(goodsId) {
            this.tableData.forEach(goods => {
                if (goods.goodsId === goodsId) {
                    this.formData3 = goods;
                }
            })
        },
        chooseGoodsUpdate(goodsId) {
            this.tableData.forEach(goods => {
                if (goods.goodsId === goodsId) {
                    this.formData4 = {};
                    this.formData4 = goods;
                }
            })
        },
        currentPageChangeAdj(currentPage) {
            this.searchParamsAdj.currentPage = currentPage;
            this.findPageAdj();
        },
        async addAdjust() {
            console.log(this.formData3);
            this.formData3.adjustGoodid = this.formData3.goodsId;
            this.formData3.startTime = this.formData3.startendTime[0];
            this.formData3.endTime = this.formData3.startendTime[1];
            await add(this.formData3);
        },
        async findPageAdj() {
            this.searchParamsAdj.startTime = this.searchParamsAdj.value2[0];
            this.searchParamsAdj.endTime = this.searchParamsAdj.value2[1];
            console.log(this.searchParamsAdj)
            await searchPagesAdj(this.searchParamsAdj).then(res => {
                this.totalAdj = res.total;
                this.tableDataAdj = res.data;
            });
        },
        clearAndAddLook(goodsId) {
            this.tableDataAdj.forEach(ggg => {
                if (ggg.goodsId === goodsId) {
                    this.formData4 = ggg;
                }
            })
            let s = this.formData4.startTime
            let e = this.formData4.endTime
            this.formData4.startendTime = [s,e];
        },
        clearAndAddUpdate(goodsId) {
            this.tableDataAdj.forEach(ggg => {
                if (ggg.goodsId === goodsId) {
                    this.formData4 = ggg;
                }
            })
            let s = this.formData4.startTime
            let e = this.formData4.endTime
            this.formData4.startendTime = [s,e];
        },
        updateAdj(){

        }

    },
    created() {
        this.init();
        this.findPage();
        this.findPageAdj();
    }
};

export default adjust;