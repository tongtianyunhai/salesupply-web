import {addEntity, deleteById, searchPage,update,searchPage2} from '@/api/addOrEditChangegoods'
import pickerOptions from '@/utils/date';
import {getBase64Str} from '@/utils/base64Utils'
import base64 from '@/utils/getbase64Str2';


let addOrEditChangegoods = {
    data() {
        return {
            //日期组件
            pickerOptions:pickerOptions,
            //table的list
            tableData: [],
            //商品信息
            tableData2: [],
            total2:0,
            total:0,
            searchParams:{
                currentPage :1,
                pageSize:5,
                orderId: ''//品牌名称
            },
            //商品信息
            searchParams2:{
                currentPage :1,
                pageSize:5,
                goodsName: ''//品牌名称
            },

            dialogVisible:false,
            formData:{},//删除表单信息
            formData2:{},//新增或修改表单
            dialogVisible2: false,
            imageUrl:'',
            formData3:{},
             dialogVisible4:false,

            options: [{
                value:'1',
                label: '换货申请单'
            }],
            value:'',

            options2: [
                {
                value2:'1',
                label2: '有效'
            },
                {
                    value2:'0',
                    label2: '无效'}
            ],
            value2:'',


        };
    },
    methods:{
        clearAndAdd(orderImei){
            this.tableData.forEach(data=>{
                if (data.orderImei === orderImei) {
                    this.formData2 = data;
                }
            })
        },
        //选择新商品
        clearAndAdd2(goodsEncode){
            this.tableData2.forEach(data=>{
                if (data.goodsEncode === goodsEncode) {
                    this.formData3 = data;
                    this.formData2.spNewgoodscolor=this.formData3.goodsColor;
                    this.formData2.spNewgoodstype=this.formData3.goodsModel;
                    this.formData2.spNewgoodsid=this.formData3.goodsEncode;
                    this.formData2.spNewgoodsname=this.formData3.goodsName;

                    this.formData2.spNewgoodsiemi=this.formData3.goodsShoprice;
                    this.formData2.spNewgoodsiemi=this.formData3.imeiNumber;
                    this.formData2.spNewgoodsiemi=this.formData3.imeiNumber;

                    console.log(this.formData3);
                }
            })
        },


        //复选框的change事件，删除和修改拿到id
        checkBoxSelectionChange(){

            var single=this.formData.id;
            console.log(single);
        },
        currentPageChange(currentPage){
            //console.log(currentPage);
            this.searchParams.currentPage = currentPage;
            this.findPage();
        },

        currentPageChange2(currentPage){
            //console.log(currentPage);
            this.searchParams2.currentPage = currentPage;
            this.findPage2();
        },

        /*  findPage(){
              searchPage(this.searchParams).then(response=>{
                 this.total= response.total;
                 this.tableData = response.data;
              })
          },  */
        //第二种写法：
        async findPage(){
            let response =  await searchPage(this.searchParams);
            this.total= response.total;

            this.tableData = response.data;
            // console.log(this.tableData);
        },

        async findPage2(){
            let response2 =  await searchPage2(this.searchParams2);
            this.total2= response2.total;
            this.tableData2 = response2.data;
            // console.log(this.tableData);
        },
        chooseTime(){
            this.searchParams.startTime=this.pickerOptions.startArrayDate[0];
            this.searchParams.endTime=this.pickerOptions.startArrayDate[1];
        },
        resetForm(){
            this.searchParams={  currentPage :1, pageSize:5};
            this.pickerOptions.startArrayDate ='';
        },

        resetForm2(){
            this.searchParams2={  currentPage :1, pageSize:5};
            this.pickerOptions.startArrayDate ='';
        },
        //async表示异步调用 await：表示执行完这条语句，才执行下面语句
        async deleteById(){
            await deleteById(this.formData.spOrderid);
            console.log(this.tableData.spOrderid);
            this.findPage();
        },
        // getImgStr(e){
        //     console.log("imgstr===");
        //     console.log(e.file);
        //     let fileReader = new FileReader();
        //     fileReader.readAsDataURL(e.file);
        //     fileReader.onload= e=> {
        //         console.log("onload===");
        //         console.log(e);
        //         console.log("图片的base64 e.target.result====");
        //         console.log(e.target.result);
        //         this.formData.brandLogo=e.target.result;
        //         this.imageUrl = e.target.result;
        //
        //     }
        //
        // },
        // getImgStr(e){
        //   getBase64Str(e.file).then(response=>{
        //       this.formData.brandLogo = response;
        //       this.imageUrl =  response;
        //   })
        //  },

        // getImgStr(e){
        //     base64.getbase64Str(e.file).then(response=>{
        //         this.formData.brandLogo=response;
        //         this.imageUrl = response;
        //     })
        //
        // },



        async add(){
            this.formData2.spHandletype=this.value;
            this.formData2.spOrderstatus=this.value2;
            console.log(this.formData2);
            await addEntity(this.formData2);
            this.findPage();
        },
        async Edit(){
            console.log(this.formData2)
            await update(this.formData2);
            await this.findPage();
        }
    },
    created(){
        this.findPage();
        this.findPage2();
        // console.log(this.tableData);
    }
};

export default addOrEditChangegoods;