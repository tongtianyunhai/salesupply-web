import {findBrands, findClassify, findColors, searchPage} from "@/api/product";

let product = {
    data() {
        return {
            colors: [],

            brands: [],

            classifies: [],

            //日期变量名
            value2: '',
            //table的list
            tableData: [],
            dialogVisible: false,
            total: 0,
            searchParams: {
                currentPage: 1,//当前页
                pageSize: 3,//每页显示条数
                productClassify: '',
                productBrand: '',
                productColor: '',
                productType: '',
                productEncode: '',
            },
            formData: {},//新增表单信息
            formData2: {},//修改表单
            dialogVisible2: false

        };
    },
    methods: {
        init() {
            //初始化颜色
            findColors().then(res => {
                this.colors = res;
            });
            findBrands().then(res => {
                this.brands = res;
            });
            findClassify().then(res => {
                this.classifies = res;
            });
            searchPage(this.searchParams).then(res => {
                this.total = res.total;
                this.tableData = res.data;
            });

        },
        findPage() {
            searchPage(this.searchParams).then(res => {
                this.total = res.total;
                this.tableData = res.data;
            })
        },
        currentPageChange(currentPage){
            this.searchParams.currentPage = currentPage;
            this.findPage();
        },resetForm(){
            this.searchParams={  currentPage :1, pageSize:5};
        },

    },
    created() {
        this.init();

    }
};
export default product;