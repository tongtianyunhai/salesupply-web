import {searchPage,deleteById,addEntity,update} from '@/api/brand'
let brand = {
    data() {
        return {
            //日期变量名
            value2: '',
            //table的list
            tableData: [],
            dialogVisible:false,
            total:0,
            searchParams: {
                currentPage: 1,//当前页
                pageSize: 3,//每页显示条数
                brandName: ''//品牌名称
            },
            formData: {},//新增表单信息
            formData2:{},//修改表单
            dialogVisible2: false

        };
    },
    methods:{
        clearAndAdd(brandId){
            this.tableData.forEach(data=>{
                if (data.brandId === brandId) {
                    this.formData2 = data;
                }
            })
        },
        //复选框的change事件，删除和修改拿到id
        async checkBoxSelectionChange(){

        },
        async currentPageChange(currentPage){
            //console.log(currentPage);
            this.searchParams.currentPage = currentPage;
            await this.findPage();
        },
        async findPage(){
            searchPage(this.searchParams).then(response => {

                this.total = response.total;
                this.tableData = response.data;
                console.log(this.tableData)
            });
        },
        async deleteById(){
            console.log(this.formData)
            await deleteById(this.formData.brandId);

            await this.findPage();
        },
        async resetForm(){
            this.searchParams={  currentPage :1, pageSize:5};
            this.pickerOptions.startArrayDate ='';
        },
        async add(){
            await addEntity(this.formData);
            await this.findPage();
        },
        async Edit(){
            console.log(this.formData2)
            await update(this.formData2);
            await this.findPage();
        }
    },
    created(){
        this.findPage();
    }
};

export default brand;