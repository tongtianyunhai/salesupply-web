import {findBrands, findClassify,searchPage} from "@/api/product";
import {findColors,searchPages,deleteById,update,addOneGood} from "@/api/goods";

let Goods = {
    data() {
        return {

            colors: [],
            brands: [],
            tableData:[],
            tableData2:[],
            formData:{},
            formData2:{},
            formData3:{},
            pgData:{},
            addOneGoodData:{},
            addTwoGoodData:{},
            total:0,
            total2:0,
            dialogVisible: false,
            dialogVisible2: false,
            dialogVisible3: false,
            dialogVisible4: false,
            dialogVisible5: false,
            classifies: [],
            searchParams: {
                currentPage: 1,//当前页
                pageSize: 3,//每页显示条数
                goodsClassify: '',
                goodsBrand: '',
                goodsColor: '',
                goodsType: '',
                goodsName: '',
            },
            searchParams2: {
                currentPage: 1,//当前页
                pageSize: 3,//每页显示条数
            },
            isBuy:[
                {
                id :0,
                name:"不可采购"
                },{
                    id :1,
                    name:"可采购"
                }
            ],
            addGoodsCategory:[
                {
                    id :1,
                    name:"手机"
                },{
                    id :5,
                    name:"手机配件"
                },{
                    id :6,
                    name:"手机配饰"
                }
            ],

        }
    },
    methods: {
        clearAndAdd(goodsId){
            this.tableData.forEach(data=>{
                if (data.goodsId === goodsId) {
                    this.formData = data;
                }
            })
        },
        addProduct(productId){
            this.tableData2.forEach(data=>{
                if (data.productId === productId) {
                    this.pgData = data;
                    console.log(this.pgData)
                }
            })
            this.formData3.goodsEncode = this.pgData.productEncode;
            this.formData3.classifyName = this.pgData.classifyName;
            this.formData3.brandName = this.pgData.brandName;
            this.formData3.goodsType = this.pgData.productType;
            this.formData3.goodsColor = this.pgData.productColor;

        },
        clearAndAdd2(goodsId){
            this.tableData.forEach(data=>{
                if (data.goodsId === goodsId) {
                    this.formData2 = data;
                }
            })
        },
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
         findPage(){
             searchPages(this.searchParams).then(res=>{
                 this.total = res.total;
                 this.tableData = res.data;
             })
        },
        findPage2() {
            searchPage(this.searchParams2).then(res => {
                this.total2 = res.total;
                this.tableData2 = res.data;
            })
        },
        currentPageChange(currentPage){
            this.searchParams.currentPage = currentPage;
            this.findPage();
        },
        currentPageChange2(currentPage2){
            this.searchParams.currentPage2 = currentPage2;
            this.findPage2();
        },
        resetForm(){
            this.searchParams = {currentPage: 1, pageSize: 3};
            this.formData3 = {};
        },
        async deleteById(){
            await deleteById(this.formData.goodsId);
            this.findPage();
        },
        async add(){
            console.log(this.formData2);
            await update(this.formData2)
        },
        addOneGood(){
            this.formData3.goodsBrand = this.pgData.productBrand;
            this.formData3.goodsClassify = this.pgData.productClassify;
            console.log(this.formData3);
            addOneGood(this.formData3);
            this.findPage();
        },
        addTwoGood() {
            console.log(this.addTwoGoodData);
            addOneGood(this.addTwoGoodData);
            this.findPage();
        }

    },
    created() {
        this.init();
        this.findPage();
        this.findPage2();

    }
}

export default Goods;