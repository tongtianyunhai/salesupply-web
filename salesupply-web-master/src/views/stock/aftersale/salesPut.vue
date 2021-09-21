<template>
    <div class="salesPut">
        <!-- 条件查询 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/#/salesPut">售后入库订单查询</a></el-breadcrumb-item>
            <el-breadcrumb-item><a href="/#/afterSinglePut">售后入库单查询</a></el-breadcrumb-item>
            <el-breadcrumb-item></el-breadcrumb-item>
        </el-breadcrumb>
        <br/><br/>

        <el-row :gutter="24">
            <el-col :span="6">
                <div  class="grid-content bg-purple">
                    售后入库订单编号：<el-input size="mini"  v-model="page.orderid" placeholder="入库单编号"  style="width: 250px"></el-input>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    对应出库订单编号：<el-input size="mini" v-model="page.outorderid" placeholder="对应出库单编号" style="width: 250px"></el-input>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    售后入库订单类型：
                    <template>
                        <el-select size="mini" v-model="page.orderType" placeholder="请选择" style="width: 250px">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <template>
                        售后入库单状态：<el-select size="mini" v-model="page.stutas" placeholder="请选择" style="width: 250px">
                        <el-option
                                v-for="item in options1"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    </template>
                </div>
            </el-col>
        </el-row><br/>
        <el-row :gutter="24">
            <el-col :span="12">
                <div class="grid-content bg-purple">

                        <span class="demonstration">入库单日期：</span>
                        <el-date-picker
                                size="mini"
                                v-model="pickerOptions.startArrayDate"
                                type="datetimerange"
                                :picker-options="pickerOptions"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                align="right"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                @change="getTime">
                        </el-date-picker>
                        &nbsp;&nbsp;<el-button size="mini" type="primary"  @click="findPage()">查询</el-button>
                        <el-button size="mini" type="warning" @click="resetData">重置</el-button>
                </div>
            </el-col>
        </el-row>


        <br/>
        <!-- 入库单表格 -->
        <template>
            <el-table
                    v-loading="loading"
                    :data="tableData"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="stGodownid"
                        label="序号"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="stOrderid"
                        label="售后入库单编号"
                        width="180">
                    <template slot-scope="scope">
                        SH{{scope.row.stOrderid}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="spHandletype"
                        label="售后入库订单类型"
                        width="180">
                    <template slot-scope="scope">
                        {{dataHandletype[scope.row.spHandletype]}}
                    </template>
                </el-table-column>

                <el-table-column
                        prop="stCheckstatus"
                        label="售后入库订单状态"
                        width="180"
                      >
                    <template  slot-scope="scope">
                        <el-tag type="info" v-if="scope.row.stCheckstatus==1" >待审核</el-tag>
                        <el-tag type="danger" v-if="scope.row.stCheckstatus==2">待入库</el-tag>
                        <el-tag type="warning" v-if="scope.row.stCheckstatus==3">已生成入库单</el-tag>
                        <el-tag  v-if="scope.row.stCheckstatus==4">已入库</el-tag>
                    </template>

                </el-table-column>
                <el-table-column
                        prop="stCreateDate"
                        label="订单日期"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="stCreateBy"
                        label="申请人"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button  size="mini"type="primary" round @click="findAftersalesOrder(scope.$index, scope.row),dialogVisible=true" >查看</el-button>
                        <el-button size="mini" v-if="scope.row.stCheckstatus==2" type="success" round @click="addAftersales(scope.$index, scope.row)"  >生成入库单</el-button>
                        <el-button size="mini" v-if="scope.row.stCheckstatus==1" type="success" round disabled >未审核</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <!--  分页查询 -->
        <template>
            <div class="block" align="center">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page.currentPage"
                        :page-sizes="[5, 10, 20, 50]"
                        :page-size="page.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="page.total">
                </el-pagination>
            </div>
        </template>

        <!--查看的模态框-->

        <el-dialog
                title="售后订单详情"
                :visible.sync="dialogVisible"
                width="50%"
                :before-close="handleClose">
            订单编号:<span>{{ order.spOrderid}}</span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            退货单类型:<span>{{order.type}}</span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            退货单时间:<span>{{ order.spCreateDate}}</span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            <hr/><br/>
            商品编号:<span>{{order.spGoodsid}}</span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            商品名称:<span>{{order.spGoodsname}}</span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            退货订单编号:<span>{{ order.spOrderid}}</span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            EMS码：<span>366313</span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            <hr/><br/>
            商品串码:{{order.spGoodsiemi}}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            <hr></hr><br/>
            制单人:<span>{{ order.spCreateBy}}</span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            制单人联系方式:<span>110119120</span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            制单人邮箱:<span>laosiji@163.com</span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp


            <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
  </span>
        </el-dialog>


    </div>

</template>

<script>
    import salesPut from './js/salesPut'
    export default salesPut
</script>

<style scoped>

</style>