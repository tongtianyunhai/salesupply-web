import pickerOptions from '@/utils/date.js'
import {findAll} from '@/api/salesPut.js'
import {findChange} from '@/api/salesPut.js'
import {findReturngoods} from '@/api/salesPut.js'
import {findrRturnwarehouse} from '@/api/salesPut.js'
import {addAfterSinglePut} from '@/api/salesPut.js'
import {updateStatus} from '@/api/salesPut.js'
import {formatDate} from "element-ui/src/utils/date-util";


let salesPut = {
    data() {
        return {
            loading:false,
            tableData: [],
            order: {
                spOrderid:'',
                spGoodsid:'',
                spGoodsname:'',
                spGoodstype:'',
                spGoodsiemi:'',
            },
            page: {
                currentPage: 1,
                pageSize: 10,
                total: 0,

            },
            input3: '',
            //时期选择器
            pickerOptions: pickerOptions,
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
            }],
            orderType: '',//条件查询：订单类型
            //下拉框
            options1: [{
                value: '2',
                label: '待入库'
            }, {
                value: '3',
                label: '已入库'
            }],datacheckstatus:["","待审核","已审核","待入库","已入库"],//状态
            dataHandletype:["","换货单","退货单","返厂入库单"],//类型
            dataHandletype2:["","售后换货入库","售后退货入库","返厂维修入库"],//类型
            dialogVisible: false, //打开模态框
            sendData:{},//生成入库单的数据
            updateData:{//修改状态的数据
                stGodownid:"",
                stCheckstatus:"3",
            }


        }
    }, methods: {
        handleSizeChange(val) {
            this.page.pageSize=val;
            this.findPage();
        }, handleCurrentChange(val) {

            this.page.currentPage=val;
            this.findPage();
        },
        async findPage() {//分页查询
            await findAll(this.page).then(respone=>{
                this.page.total = respone.total;
                this.tableData = respone.data;
            });

        },getTime(){//获取时间
            this.page.startTime=pickerOptions.startArrayDate[0];
            this.page.endTime=pickerOptions.startArrayDate[1]
        }
        , resetData(){//重置
            this.page.orderid='';
            this.page.outorderid='';
            this.page.stutas='';
            this.page.orderType='';
            this.page.startTime='';
            this.page.endTime='';
            pickerOptions.startArrayDate='';
            this.findPage();
        }, async findAftersalesOrder(val,obj){ //查看入库订单
            if (obj.spHandletype==1){
                let respone =  await findChange(obj);
                this.order=respone;
            }
            if (obj.spHandletype==2){
                let respone = await findReturngoods(obj);
                this.order=respone;
            }
            if (obj.spHandletype==3){
                let respone = await findrRturnwarehouse(obj);
                this.order=respone;
            }
        },async addAftersales(val,obj){//生成入库单

            let respone;
            if (obj.spHandletype==1){
                respone =  await findChange(obj);
                this.order=respone;
            }
            if (obj.spHandletype==2){
                respone = await findReturngoods(obj);
                this.order=respone;
            }
            if (obj.spHandletype==3){
                respone = await findrRturnwarehouse(obj);
                this.order=respone;
            }

            console.log(respone);
            var time = Date.now();
            var d = new Date(time);//获取当前时间
            let formatDate1 = formatDate(d,"yyyy-MM-dd HH:mm:ss");//格式化
            this.sendData={
                id:"",
                orderId:obj.stOrderid,//订单编号
                businessType:this.dataHandletype[obj.spHandletype],//业务类型
                afterSaleOrderId:obj.stGodownid,//售后订单编号
                orderType:this.dataHandletype2[obj.spHandletype],//订单类型
                proposer:"1",//申请人
                proposerPhone:"",//申请人联系电话
                proposerEmail:"",//申请人联系邮箱
                applyTime:formatDate1,//申请时间
                mobileModel:respone.spGoodsname,//售后机型
                mobileModelNo:respone.spGoodsiemi,//售后机型串号
                receivableCount:"",//应收数量
                actualCount:"",//实收数量
                status:"待入库",//状态
                createBy:1,//创建者
                createTime:formatDate1,//创建时间
            };
            addAfterSinglePut(this.sendData);//生成入库单

            this.updateData.stGodownid=obj.stGodownid;
            updateStatus(this.updateData).then(respone=>{//修改状态
                //模拟加载时长
                this.loading=true;

                setTimeout(() =>{
                    this.loading=false;
                    this.$message({
                        message: '已生成订单入库单',
                        type: 'success'
                    });
                },1500);
                this.findPage();
            });


        }, handleClose(done) {//关闭模态框的提示
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        }
    },
    created() {//页面加载时调用
        this.findPage();
    }
}
export default salesPut;
