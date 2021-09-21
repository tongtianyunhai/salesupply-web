<template>
    <div class="order-box">
        <h2>B2C网店订单管理</h2>
        <h2>----------------------------------------------------------------------------------------------------------------------------------------------------</h2>

        <!--查询表单-->
        <div class="search-box">
            <el-form :inline="true" class="demo-form-inline" size="mini">
                <el-form-item label="订单编号：">
                    <el-input placeholder="订单编号" v-model="searchParams.orderId"></el-input>
                </el-form-item>
                <el-form-item label="订单类型：">
                    <el-select  placeholder="请选择订单类型" v-model="searchParams.orderType">
                        <el-option label="电话订单" value="电话订单"></el-option>
                        <el-option label="网络订单" value="网店"></el-option>
                        <el-option label="其它" value="其它"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="支付方式：">
                    <el-select  placeholder="请选择支付方式" v-model="searchParams.orderPayment">
                        <el-option label="货到付款" value="货到付款"></el-option>
                        <el-option label="款到发货" value="款到发货"></el-option>
                    </el-select>

                </el-form-item>
                <el-form-item label="业务类型：">
                    <el-select placeholder="请选择支付方式" v-model="searchParams.orderBusinesstype">
                        <el-option label="普通业务" value="普通业务"></el-option>
                        <el-option label="号卡套餐" value="号卡套餐"></el-option>
                    </el-select>
                </el-form-item>
                <br>
                <el-form-item label="下单日期：">
                    <el-date-picker
                            v-model="value1"
                            @change="chooseTime"
                            type="datetimerange"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            :picker-options="pickerOptions"
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="lift">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="商品名称：">
                    <el-input placeholder="商品名称" v-model="searchParams.productName"></el-input>
                </el-form-item>
                <el-form-item label="订单状态：">
                    <el-select  placeholder="请选择订单状态" v-model="searchParams.orderStatus">
                        <el-option label="审核通过" value="审核通过"></el-option>
                        <el-option label="待出库" value="待出库"></el-option>
                        <el-option label="已出库" value="已出库"></el-option>
                        <!--<el-option label="已发货" value="已发货"></el-option>-->
                        <!--<el-option label="已到货" value="已到货"></el-option>-->
                        <!--<el-option label="已归档" value="已归档"></el-option>-->
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="findPage1" icon="el-icon-search"> 查询</el-button>
                    <el-button type="primary" @click=""> 网店订单导入</el-button>

                    <el-button type="warning" @click="resetForm" icon="el-icon-refresh-right">重置</el-button>
                </el-form-item>

            </el-form>
        </div>

        <!--table展示数据-->
        <div class="table-box">
        <el-table
        :data="tableData"
        style="width: 100%"
        @selection-change="checkBoxSelectionChange"
        >

        <el-table-column
        type="selection"
        width="55">
        </el-table-column>
            <el-table-column
                    label="序号"
                    type="index"
                    width="50"
                    align="center">
                <template scope="scope">
                    <span>{{(searchParams.currentPage - 1) * searchParams.pageSize + scope.$index + 1}}</span>
                </template>
            </el-table-column>

        <el-table-column
        align="center"
        prop="orderId"
        label="订单编号"
        width="80">
        </el-table-column>
        <el-table-column
        align="center"
        prop="orderType"
        label="订单类型"
        width="150">
        </el-table-column>
        <el-table-column
        align="center"
        prop="productName"
        label="商品清单"
        width="150">
        </el-table-column>
        <el-table-column
        align="center"
        prop="orderBusinesstype"
        label="业务类型"
        width="150">
        </el-table-column>
        <el-table-column
        align="center"
        prop="orderPayment"
        label="支付方式"
        width="180">
        </el-table-column>
        <el-table-column
        align="center"
        prop="deliveryMode"
        label="配送方式"
        width="180">
        </el-table-column>
        <el-table-column
        align="center"
        prop="orderStatus"
        label="订单状态"
        width="180">
            <template slot-scope="scope">
                <el-tag v-if="scope.row.orderStatus=='已出库'" type="success">已出库</el-tag>
                <el-tag v-if="scope.row.orderStatus=='待出库'" type="warning">待出库</el-tag>
                <!--<el-tag v-if="scope.row.orderStatus=='已出库'" type="success">已出库</el-tag>-->
                <!--<el-tag v-if="scope.row.orderStatus=='已发货'" type="danger">已发货</el-tag>-->
                <!--<el-tag v-if="scope.row.orderStatus=='已到货'" type="warning">已到货</el-tag>-->
                <!--<el-tag v-if="scope.row.orderStatus=='已归档'" type="info">已归档</el-tag>-->
            </template>

        </el-table-column>
        <el-table-column
        align="center"
        prop="address"
        label="操作">

        <template v-slot="obj">
            <el-button type="primary" icon="el-icon-search" @click="showOrderInfo(obj.row)">查看</el-button>
        </template>

        </el-table-column>
        </el-table>
        </div>
        <!--分页-->
        <div class="page-box">
            <el-pagination
                    background
                    :current-page="searchParams.currentPage"
                    :page-size="searchParams.pageSize"
                    layout="prev, pager, next"
                    @current-change="currentPageChange"
                    :total="total">
            </el-pagination>
        </div>
        <!--模态框-->
        <div class="dialog-box">
            <el-dialog  :visible.sync="dialogTableVisible">
                <el-main>
                    <el-row style="border: 1px solid black;">
                        <el-col :span="24">   <!--占整行-->
                            <el-row style="border: 1px solid black;">
                                <!--//订单基本资料-->
                                <el-col :span="24" style="">
                                    <el-row style="height: 50px;
                                    padding-left: 25px;padding-top:12px;font-size: 22px;font-weight:bold">
                                        订单基本资料
                                    </el-row>

                                    <el-row style="border-top: 1px solid black;">
                                        <el-col :span="4" style=" border-right:1px solid black;
                                        height: 40px;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            订单编号:
                                        </el-col>
                                        <el-col :span="8" style=" border-right:1px solid black;
                                        height: 40px ;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            {{orderInfo.orderId}}
                                        </el-col>
                                        <el-col :span="4" style=" border-right:1px solid black;
                                        height: 40px;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            下单日期:
                                        </el-col>
                                        <el-col :span="8" style="height: 40px;
                                        ;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            {{orderInfo.orderTime}}
                                        </el-col>
                                    </el-row>
                                    <el-row style="border-top: 1px solid black;">
                                        <el-col :span="4" style=" border-right:1px solid black;
                                        height: 40px;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            订单类型:
                                        </el-col>
                                        <el-col :span="8" style=" border-right:1px solid black;
                                        height: 40px ;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            {{orderInfo.orderType}}
                                        </el-col>
                                        <el-col :span="4" style=" border-right:1px solid black;
                                        height: 40px;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            订单动作:
                                        </el-col>
                                        <el-col :span="8" style="height: 40px;
                                        ;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            {{orderInfo.orderAction}}
                                        </el-col>
                                    </el-row>
                                    <el-row style="border-top: 1px solid black;">
                                        <el-col :span="4" style=" border-right:1px solid black;
                                        height: 40px;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            业务类型:
                                        </el-col>
                                        <el-col :span="8" style=" border-right:1px solid black;
                                        height: 40px ;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            {{orderInfo.orderBusinesstype}}

                                        </el-col>
                                        <el-col :span="4" style=" border-right:1px solid black;
                                        height: 40px;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            订单状态:
                                        </el-col>
                                        <el-col :span="8" style="height: 40px;
                                        ;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            {{orderInfo.orderStatus}}
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <!--//收货人资料-->
                                <el-col :span="24" style="">
                                    <el-row style="height: 50px;border-top: 1px solid black;
                                    padding-left: 22px;padding-top:12px;font-size: 22px;font-weight:bold">
                                        收货人资料
                                    </el-row>

                                    <el-row style="border-top: 1px solid black;">
                                        <el-col :span="4" style=" border-right:1px solid black;
                                        height: 40px;padding-left: 25px;padding-top:10px;font-size: 17px;font-weight:bold">
                                            收货人姓名:
                                        </el-col>
                                        <el-col :span="8" style=" border-right:1px solid black;
                                        height: 40px ;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            {{orderInfo.deliveryUsername}}
                                        </el-col>
                                        <el-col :span="4" style=" border-right:1px solid black;
                                        height: 40px;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            会员帐号：
                                        </el-col>
                                        <el-col :span="8" style="height: 40px;
                                        ;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            {{orderInfo.userId}}

                                        </el-col>
                                    </el-row>
                                    <el-row style="border-top: 1px solid black;">
                                        <el-col :span="4" style=" border-right:1px solid black;
                                        height: 40px;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            联系电话:
                                        </el-col>
                                        <el-col :span="8" style=" border-right:1px solid black;
                                        height: 40px ;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            {{orderInfo.userPhone}}
                                        </el-col>
                                        <el-col :span="4" style=" border-right:1px solid black;
                                        height: 40px;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            联系手机:
                                        </el-col>
                                        <el-col :span="8" style="height: 40px;
                                        ;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            {{orderInfo.userPhone}}

                                        </el-col>
                                    </el-row>
                                    <el-row style="border-top: 1px solid black;">
                                        <el-col :span="4" style=" border-right:1px solid black;
                                        height: 40px;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            邮政编码:
                                        </el-col>
                                        <el-col :span="8" style=" border-right:1px solid black;
                                        height: 40px ;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            {{orderInfo.deliveryMailcode}}

                                        </el-col>
                                        <el-col :span="4" style=" border-right:1px solid black;
                                        height: 40px;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            收货地址:
                                        </el-col>
                                        <el-col :span="8" style="height: 40px;
                                        ;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            {{orderInfo.deliveryAddress}}
                                        </el-col>
                                    </el-row>
                                    <el-row style="border-top: 1px solid black;">
                                        <el-col :span="4" style=" border-right:1px solid black;
                                        height: 40px;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            配送地区:
                                        </el-col>
                                        <el-col :span="8" style=" border-right:1px solid black;
                                        height: 40px ;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            {{orderInfo.deliveryArea}}

                                        </el-col>
                                        <el-col :span="4" style=" border-right:1px solid black;
                                        height: 40px;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            配送方式:
                                        </el-col>
                                        <el-col :span="8" style="height: 40px;
                                        ;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            {{orderInfo.deliveryMode}}

                                        </el-col>
                                    </el-row>
                                    <el-row style="border-top: 1px solid black;">
                                        <el-col :span="4" style=" border-right:1px solid black;
                                        height: 40px;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            配送费用:
                                        </el-col>
                                        <el-col :span="8" style=" border-right:1px solid black;
                                        height: 40px ;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            {{orderInfo.deliveryPrice}}

                                        </el-col>
                                        <el-col :span="4" style=" border-right:1px solid black;
                                        height: 40px;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            支付方式:
                                        </el-col>
                                        <el-col :span="8" style="height: 40px;
                                        ;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            {{orderInfo.orderPayment}}

                                        </el-col>
                                    </el-row>
                                    <el-row style="border-top: 1px solid black;">
                                        <el-col :span="4" style=" border-right:1px solid black;
                                        height: 40px;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            自提时间:
                                        </el-col>
                                        <el-col :span="8" style=" border-right:1px solid black;
                                        height: 40px ;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            {{orderInfo.orderTothetime}}
                                        </el-col>
                                        <el-col :span="4" style=" border-right:1px solid black;
                                        height: 40px;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            电子邮箱：
                                        </el-col>
                                        <el-col :span="8" style="height: 40px;
                                        ;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            {{orderInfo.userEmail}}
                                        </el-col>
                                    </el-row>
                                    <el-row style="border-top: 1px solid black;">
                                        <el-col :span="4" style=" border-right:1px solid black;
                                        height: 40px;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            汇款人:
                                        </el-col>
                                        <el-col :span="8" style=" border-right:1px solid black;
                                        height: 40px ;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            {{orderInfo.orderRemitter}}
                                        </el-col>
                                        <el-col :span="4" style=" border-right:1px solid black;
                                        height: 40px;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">

                                        </el-col>
                                        <el-col :span="8" style=";
                                        height: 40px ;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                        </el-col>
                                    </el-row>
                                    <el-row style="border-top: 1px solid black;">
                                        <el-col :span="4" style=" border-right:1px solid black;
                                        height: 80px;padding-left: 50px;padding-top:30px;font-size: 19px;font-weight:bold">
                                            备注:
                                        </el-col>
                                        <el-col :span="20" style="
                                        height: 40px ;padding-left: 23px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            {{orderInfo.orderRemarks}}
                                        </el-col>
                                    </el-row>


                                </el-col>
                                <!--//订单商品信息-->
                                <el-col :span="24" style="height: 400px">
                                    <el-row style="height: 50px;border-top: 1px solid black;
                                    padding-left: 25px;padding-top:12px;font-size: 22px;font-weight:bold">
                                        订单商品信息
                                    </el-row>

                                    <el-row style="border-top: 1px solid black;">
                                        <el-col :span="24" style="
                                        height: 40px;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            <!--表格-->
                                            <!--table展示数据-->

                                                <el-table
                                                        :data="findByOrderId"
                                                        style="width: 95%;border: 2px solid black;"
                                                        border

                                                        @selection-change="checkBoxSelectionChange"
                                                >
                                                    <el-table-column
                                                            align="center"
                                                            prop="productId"
                                                            label="商品编号"

                                                            width="150">

                                                    </el-table-column>
                                                    <el-table-column
                                                            align="center"
                                                            prop="productName"
                                                            label="名称"
                                                            width="150">
                                                    </el-table-column>
                                                    <el-table-column
                                                            align="center"

                                                            prop="productPrice"
                                                            label="单价"
                                                            width="150">

                                                    </el-table-column>
                                                    <el-table-column
                                                            align="center"

                                                            prop="orderNumber"
                                                            label="数量"
                                                            width="163">

                                                    </el-table-column>
                                                    <el-table-column
                                                            align="center"

                                                            prop="orderMoney"
                                                            label="总金额"
                                                            width="162">

                                                    </el-table-column>
                                                </el-table>


                                        </el-col>

                                    </el-row>

                                </el-col>

                            </el-row>
                        </el-col>
                    </el-row>
                </el-main>

            </el-dialog>
        </div>
    </div>
</template>

<script>
    import order from './index'

    export default order;
</script>

<style scoped>

</style>