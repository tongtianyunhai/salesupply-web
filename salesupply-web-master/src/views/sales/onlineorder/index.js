import {findPage} from '../../../api/order'
import {findPage2} from '../../../api/order'
import {findById} from '../../../api/order'
import {findByOrderId} from '../../../api/order'

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
                orderStatus:'',
                productName:''
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
                orderStatus:'',
                productName:''
            }
            this.value1='';
        },

        //查询所有
        findPage1(){
            findPage2(this.searchParams).then(response=>{
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