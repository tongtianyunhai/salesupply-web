<template>
    <div class="app-container">

        <span style="color: red">库存管理->入库管理->销售入库->列表</span>
        <br>  <br>  <br>


        <!--查询表单======================================================================================-->
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="退货单编号:">
             <el-input  v-model="teacherQuery.name" placeholder="退货单编号"/>
            </el-form-item>
            <el-form-item label="商品编号:">
                <el-input v-model="teacherQuery.name" placeholder="商品编号"/>
            </el-form-item>
            <el-form-item label="商品名称:">
                <el-input v-model="teacherQuery.name" placeholder="商品名称"/>
            </el-form-item>
            <el-form-item label="供货商名称:">
                <el-input v-model="teacherQuery.name" placeholder="供货商名称"/>
            </el-form-item>
            <el-form-item label="供货商名称:">
                <el-input v-model="teacherQuery.name" placeholder="供货商名称"/>
            </el-form-item>
            <br>
            <el-form-item label="退货单日期:">
                <el-date-picker
                        v-model="teacherQuery.begin"
                        type="datetime"
                        placeholder="选择开始时间"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        default-time="00:00:00"/>
            </el-form-item>
            <el-form-item>
                <el-date-picker
                        v-model="teacherQuery.end"
                        type="datetime"
                        placeholder="选择截止时间"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        default-time="00:00:00"
                />
            </el-form-item>
            <el-form-item label="退货单状态:">
                <el-select v-model="teacherQuery.level" clearable >
                    <el-option :value="1" label="待退货入库"/>
                    <el-option :value="2" label="已退货入库"/>
                </el-select>
            </el-form-item>
            &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
            <el-button align="right" type="primary" icon="el-icon-search" @click="getList()">查 询</el-button>
            <el-button align="right" type="default" @click="resetData()">清空</el-button>
        </el-form>



        <!-- 表格======================================================================================== -->
        <el-table :data="list" element-loading-text="数据加载中"
                  align="center"
                  border >
            <el-table-column label="序号" width="70" align="center">
                <template slot-scope="scope">{{ (page - 1) * limit + scope.$index + 1 }}</template>
            </el-table-column>

            <el-table-column prop="returnedId" label="退货单编号" width="100"/>
            <el-table-column prop="orderId" label="商品编号" width="100"/>
            <el-table-column prop="productName" label="商品名称" width="100"/>
            <el-table-column prop="returnedId" label="供应商编码" width="100"/>
            <el-table-column prop="productName" label="供应商名称" width="100"/>
            <el-table-column prop="orderNumber" label="数量" width="100"/>
            <el-table-column prop="orderStatus" label="退货单状态" width="100"/>
            <el-table-column prop="createTime" label="订单日期" width="100"/>

            <el-table-column label="操作" width="200" align="center">

                <template slot-scope="scope">
                    <router-link :to="'/teacher/edit/'+scope.row.id">
                        <el-button type="primary" size="mini" icon="el-icon-edit">查看</el-button>
                    </router-link>
                    <el-button
                            type="danger"
                            size="mini"
                            icon="el-icon-delete"
                            @click=""
                    >生成入库单</el-button>
                </template>

            </el-table-column>
        </el-table>
        <el-pagination
                :current-page="page"
                :page-size="limit"
                :total="total"
                style="padding: 30px 0; text-align: center;"
                layout="total, prev, pager, next, jumper"
                @current-change=""/>

    </div>
</template>

<script>
    //引入调用teacher.js文件
    import store from '@/api/stock/sale/salereturn'
    export default {
        //写核心代码
        data() {
            return {
                list: null, //查询之后接口返回集合
                page: 1, //当前页
                limit: 3, //每页记录数
                total: 0, //总记录数
                teacherQuery: {} //条件封装对象
            };
        },
        created() {
           this.getList();
        },
        methods: {
            getList(){
                store.getAllSaleReturn().then(
                    response=>{
                        console.log(response)
                       this.list=response;
                    })
            }
        }
    }
</script>