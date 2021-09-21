import {findPromote, checkPromotes, searchPages, selectOne,addPromote,editPromote} from "../../../../api/promote";
import {addGift2Good} from "../../../../api/gift2goods";

let promote = {
    data() {
        return {
            // 促销活动 查询条件
            findMsg: {
                // 商品名称
                goodsName: '',
                // 审核状态
                approvalStatus: '',
                // 促销开始时间
                promoteStartime: '',
                // 价格生效时间
                promotePricestartime: '',
                currentPage: 1,
                pageSize: 5
            },
            // 商品页的分页信息
            searchParams: {
                currentPage: 1,//当前页
                pageSize: 3,//每页显示条数
                goodsClassify: '',
                goodsBrand: '',
                goodsColor: '',
                goodsType: '',
                goodsName: '',
            },
            // 商品表数据
            tableData: [],

            // 表格行中点击详情后跳转模态框的数据
            promoteData: {
                // 0-普通审核,1-价格变化>20%审核,2-价格变化>50%审核
                approvalLevel:"",
            },
            // 价格调整策略
            adjustType: [
                {
                    value: 1,
                    label: "绝对值"
                }, {
                    value: 2,
                    label: "百分比"
                }
            ],
            // 促销页面数据
            promoteList: {},
            // 查看 促销数据模态框
            dialogVisible: false,
            // 添加或修改促销数据模态框
            dialogVisible1: false,
            // 促销活动添加商品页面模态框
            dialogVisible3: false,
            // 日期相关数据
            formatDate(row, column) {
                // 获取单元格数据
                let data = row[column.property];
                if (data == null) {
                    return null
                }
                let dt = new Date(data);
                return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate()
            },
            //分页数据
            total: 0,
            // 表格数据
            goodList: [],
            // 表格的隐藏列属性
            show: false,
            // 日期的只读状态 true为只读
            // show1:true,
            //审核状态
            checkState: [
                {
                    value: 0,
                    label: "未审核"
                }, {
                    value: 1,
                    label: "已审核"
                }, {
                    value: 2,
                    label: "审核未通过"
                }],
        }
    },
    methods: {
        // 促销商品页面的分页
        currentPageChange1(currentPage) {
            this.findMsg.currentPage = currentPage;
            this.findPromotes();
        },
        //选择 要参与促销的 商品
        choiceGood(goodsId) {
            selectOne(goodsId).then(res => {
                this.promoteData = res;
            });
            // 选择 商品后清空 商品ID
            this.searchParams.goodsId = ""
        },
        // 商品详情分页
        currentPageChange(currentPage) {
            this.findMsg.currentPage = currentPage;
            this.findPage();
        },
        // 商品信息的 分页 模糊 查询
        findPage() {
            searchPages(this.searchParams).then(res => {
                this.total = res.total;
                this.tableData = res.data;
                //console.log(this.tableData);
            })
        },
        // 促销的 添加 和 修改 功能
        async addOrEdit2() {
            // console.log(this.promoteData.promoteId);

            if (this.promoteData.remark1 >this.promoteData.goodsLowstock ){
                alert("选择促销的产品数量大于库存!!!!")
            }
            // 市场价格调整类型
            var promoteMkAdjustpricetype = this.promoteData.promoteMkAdjustpricetype;
           // console.log(" 市场价格调整类型:"+promoteMkAdjustpricetype);
            // 调整的价格差值
            var mkAdjustnum = this.promoteData.promoteMkAdjustnum;

            // 调整前的市场价格
            var goodsMarketprice = this.promoteData.goodsMarketprice;
            // 调整后的市场价格
            var promoteMkProprice = this.promoteData.promoteMkProprice;

            // 百分比
            if (promoteMkAdjustpricetype === 2 && mkAdjustnum >= 20){
               // console.log("百分比运算");
                this.promoteData.approvalLevel = 1;
               // console.log("价格调整百分比大于20%时:"+ this.promoteData.approvalLevel);
            }
            if (promoteMkAdjustpricetype === 2 && mkAdjustnum >= 50) {
                this.promoteData.approvalLevel = 2;
               // console.log("价格调整百分比大于50%时:"+ this.promoteData.approvalLevel);
            }
            if ((promoteMkAdjustpricetype === 2 && mkAdjustnum < 20)) {
                this.promoteData.approvalLevel = 0;
                //console.log("价格调整小于20%时:"+this.promoteData.approvalLevel)
            }
            //console.log("百分比调整数字:"+mkAdjustnum+"%");

            // 绝对值
            if (promoteMkAdjustpricetype === 1 && parseInt(goodsMarketprice/mkAdjustnum) <= 5){
               // console.log("调整的价格差值:"+mkAdjustnum);
               // console.log("绝对值运算");
               // console.log("除法:"+ (goodsMarketprice / mkAdjustnum));
                this.promoteData.approvalLevel = 1;
            }
            if (promoteMkAdjustpricetype === 1 && parseInt(goodsMarketprice/mkAdjustnum) <= 2) {
                this.promoteData.approvalLevel = 2;
            }
            if (promoteMkAdjustpricetype === 1 && parseInt(goodsMarketprice/mkAdjustnum) > 5) {
                this.promoteData.approvalLevel = 0;
            }
            //console.log("审核等级:"+this.promoteData.approvalLevel);


            if (this.promoteData.promoteId != null) {
                // 修改
                // console.log("修改");
                let resdata = JSON.parse(JSON.stringify(this.promoteData));
                let res = await editPromote(resdata);
                if (res === 1) {
                    alert("修改成功!~~~");
                } else {
                    alert("修改失败!~~~")
                }
            } else {
                // console.log("新增");
                let resdata = JSON.parse(JSON.stringify(this.promoteData));
                // let res = await addGift2Good(resdata);
                let res = await addPromote(resdata);
                if (res === 1) {
                    alert("添加成功!~~~");
                } else {
                    alert("添加失败!~~~")
                }
            }

            this.findPromotes();
        },
        // 促销页面 中的 详情按钮
        async searchPromote() {
            const promoteId = this.promoteList.promoteId;
            // console.log(goodsId);
            // console.log(promoteId);
            let res = await checkPromotes(promoteId);
            // console.log(res);
            this.promoteData = res;
        },
        // 促销活动 分页 模糊查询
        async findPromotes() {
            // let data = this.findMsg.promoteStartime.toDateString();
            // console.log(data);
            let findAll = JSON.parse(JSON.stringify(this.findMsg));
            let res = await findPromote(findAll);
            this.total = res.total;
            this.goodList = res.data;
            //console.log(this.goodList);
        },

    },
    created() {
        this.findPromotes();
    }
};

export default promote;