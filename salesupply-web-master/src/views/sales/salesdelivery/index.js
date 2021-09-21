// import {findPage} from '../../../api/order'
import {findById} from '../../../api/order'
import {findByOrderId} from '../../../api/order'
import {salesOutExcel} from '../../../api/order'
import {findPage3} from '../../../api/order'


let order={
    data(){
        return {
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
            total: 0,
            dialogTableVisible: false,
            searchParams: {
                currentPage: 1,
                pageSize: 5,
                startTime:'',
                endTime:'',
                orderId :'',
                orderType :'',
                orderPayment:'',
                orderBusinesstype:'',
                orderAction:'',
                orderStatus:''
            },
            orderInfo:{

            },
            findByOrderId:[]

            ,
            tableData: [],
            value1:0,
        };
    },
    methods:{
        //导出
        salesReportExcel(obj){
            salesOutExcel(obj).then(response=>{

            })


        },
        open() {
            this.$confirm('确定导出该订单吗？生成订单在 E:\\\\SalesOutExcel', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '导出成功!'

                });
                this.findPage1();
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消导出'
                });
            });

        },
        //商品详情页
        showOrderInfo(obj){
            // console.log(obj)
            this.dialogTableVisible=true;
            findById(obj).then(response=>{
                // console.log(response);
                this.orderInfo=response;
            });
            findByOrderId(obj).then(response=>{
                console.log(response);
                this.findByOrderId=response;
            })
        },

        //重置
        resetForm(){
            this.searchParams={
                currentPage:1,
                pageSize:5,
                orderId :'',
                orderType :'',
                orderPayment:'',
                orderBusinesstype:'',
                orderAction:'',
                orderStatus:''
            }
            this.value1='';
        },

        //查询所有
        findPage1(){
            findPage3(this.searchParams).then(response=>{
                this.total=response.total;
                this.tableData=response.data;
                console.log(response.data)
            })
        },

        //分页信息
        currentPageChange(currentPage){
            // console.log(currentPage);
            this.searchParams.currentPage = currentPage;
            this.findPage1();
        },
        chooseTime(){
            this.searchParams.startTime=this.value1[0];
            this.searchParams.endTime=this.value1[1];
        },

    },
    //页面加载时自动调用
    created(){

        this.findPage1();
    }
};
export default order;