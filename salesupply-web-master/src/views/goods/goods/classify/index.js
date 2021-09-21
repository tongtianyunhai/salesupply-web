import {primaryClassification, secondLevelDirectory,searchPage,addEntity,update,deleteById} from "@/api/classify";



let classify = {
    data() {
        return {
            options: [],
            options2: [],
            value1: "",
            value2: "",
            formData:{},
            formData2:{},
            tableData:[],
            total:0,
            dialogVisible: false,
            dialogVisible2: false,
            searchParams: {
                currentPage: 1,//当前页
                pageSize: 3,//每页显示条数
                classifyName: '',//品牌名称
                rid1:"",
                rid2:""
            },
        };
    },
    methods: {
        clearAndAdd(classifyId){
            this.tableData.forEach(data=>{
                if (data.classifyId === classifyId) {
                    this.formData2 = data;
                }
            })
        },
        async deleteById(){
            console.log(this.formData)
            await deleteById(this.formData.classifyId);
            await this.findPage();
        },
       async add(){
            await addEntity(this.formData)
            await this.init();
        },
        async Edit(){
            console.log(this.formData2)
            await update(this.formData2);
            await this.init();
        },

        async resetForm(){
            this.searchParams={  currentPage :1, pageSize:3};
            this.value1 = '';
            this.value2 = '';

        },
        async init() {
            await primaryClassification().then(response => {
                this.options = response;
            });
            await this.findPage()
        },
        changeOne() {
            this.value2 = this.options[0];
            secondLevelDirectory(this.value1).then(response => {
                this.options2 = response;
            })
        },
        async currentPageChange(currentPage){
            //console.log(currentPage);
            this.searchParams.currentPage = currentPage;
            await this.findPage();
        },
        async findPage() {
            this.searchParams.rid1 = this.value1;
            this.searchParams.rid2 = this.value2;
            await searchPage(this.searchParams).then(response => {
                this.total = response.total;
                this.tableData = response.data
            });
        }
    },
    created() {
        this.init();
    }
}
export default classify;