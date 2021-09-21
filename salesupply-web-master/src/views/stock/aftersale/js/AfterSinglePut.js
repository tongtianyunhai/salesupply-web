import pickerOptions from '@/utils/date.js'
import {findAll} from '@/api/AfterSinglePut.js'
import {updateInstore} from '@/api/AfterSinglePut.js'
import {findInstroeByid} from '@/api/AfterSinglePut.js'


let aftersingleput = {
    data() {
        return {
            loading:false,
            table1: [
            ],
            order: {
                type:''
            },
            page: {
                currentPage: 1,
                pageSize: 10,
                total: 0,
                orderid: '',//订单编号
                outorderid: '',//对应出库单编号
                stutas: '',//订单状态
                orderType:'',//订单类型
                startTime:'',//起始时间
                endTime:''//截止时间
            },
            input3: '',
            //时期选择器
            pickerOptions: pickerOptions,
            //下拉框
            options1: [{
                value: '1',
                label: '待入库'
            }, {
                value: '2',
                label: '录入完毕'
            }, {
                value: '3',
                label: '入库完毕'
            }, {
                value: '4',
                label: '退回待入库'
            }],
            orderType: '',//条件查询：订单类型
            //下拉框
            options: [{
                value: '1',
                label: '售后换货入库'
            }, {
                value: '2',
                label: '售后退货入库'
            }, {
                value: '3',
                label: '返厂维修入库'
            }], dataHandletype:["","换货单","退货单","返厂入库单"],//类型
            dialogVisible: false, //打开模态框
            updateData2:{
                id:'',
                status:'录入完毕'
            }, handleClose(done) {//关闭模态框的提示
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },instData:{},isopen:"1"

        }
    }, methods: {
        handleSizeChange(val) {
            this.page.pageSize=val;
            this.findPage();
        },
        handleCurrentChange(val) {
            this.page.currentPage=val;
            this.findPage();

        }, async findPage() {//分页查询
            await findAll(this.page).then(
                respone=>{
                    this.page.total = respone.total;
                    this.table1 = respone.data;
                }
            );


        },getTime(){//获取时间
            this.page.startTime=pickerOptions.startArrayDate[0];
            this.page.endTime=pickerOptions.startArrayDate[1]
        }, resetData(){//重置
            this.page.orderid='';
            this.page.outorderid='';
            this.page.stutas='';
            this.page.orderType='';
            this.page.startTime='';
            this.page.endTime='';
            pickerOptions.startArrayDate='';
            this.findPage();
        },putIn(){//入库
            this.isopen=2;
           this.updateData2.id= this.instData.id;
            updateInstore(this.updateData2).then(respone=>{//修改状态
                this.loading=true;
                setTimeout(() =>{
                    this.loading=false;
                    this.$message({
                        message: '入库完毕',
                        type: 'success'
                    });
                },1500);
                this.dialogVisible = false;

                this.findPage();

            });

        },findInstroe(obj,num){
            this.isopen=num
            this.dialogVisible=true;
            findInstroeByid(obj).then(response=>{
                this.instData=response;
                this.dialogVisible=true
                console.log(response);
            })
        }

    }, created() {//页面加载时调用
        this.findPage();
    }
}
export default aftersingleput;