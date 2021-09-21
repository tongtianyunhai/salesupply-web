// import {findPage} from '../../../api/order'
// import {findById} from '../../../api/order'
import {findByOrderId} from '../../../api/order'
import {findReturnedPage} from '../../../api/order'
import {returnedInfoFindById} from '../../../api/order'

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
            valuetime1:0,
            dialogTableVisible: false,
            dialogTableVisible2:false,
            searchParams: {
                currentPage: 1,
                pageSize: 5,

            },
            orderInfo:{

            },
            findByOrderId:[]

            ,
            tableData: [],
            value1:0,
            value2:0,
            value3:0,
            value4:0,
        };
    },
    methods:{
        //商品详情页
        showOrderInfo1(obj){
            // console.log(obj)
            this.dialogTableVisible=true;
            returnedInfoFindById(obj).then(response=>{
                console.log("response"+response);
                this.orderInfo=response;
            });
            findByOrderId(obj).then(response=>{
                console.log(response);
                this.findByOrderId=response;
            })
        },
        showOrderInfo2(obj){
            // console.log(obj)
            this.dialogTableVisible2=true;
            returnedInfoFindById(obj).then(response=>{
                console.log("response"+response);
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

            }
            this.value1='';
            this.value2='';
            this.value3='';
            this.value4='';

        },


        //查询所有
        findPage1(){
            findReturnedPage(this.searchParams).then(response=>{
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
        chooseTime1(){
            this.searchParams.startTime1=this.value1[0];
            this.searchParams.endTime1=this.value1[1];
        },
        chooseTime2(){
            this.searchParams.startTime2=this.value2[0];
            this.searchParams.endTime2=this.value2[1];
        },
        chooseTime3(){
            this.searchParams.startTime3=this.value3[0];
            this.searchParams.endTime3=this.value3[1];
        },
        chooseTime4(){
            this.searchParams.startTime4=this.value4[0];
            this.searchParams.endTime4=this.value4[1];
        },

    },
    //页面加载时自动调用
    created(){

        this.findPage1();
    }
};
export default order;