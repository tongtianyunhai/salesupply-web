<template>
    <div class="order-box">
        <h2>B2C销售退货管理</h2>
        <h2>----------------------------------------------------------------------------------------------------------------------------------------------------</h2>

        <!--查询表单-->
        <div class="search-box">
            <el-form :inline="true" class="demo-form-inline" size="mini">
                <el-form-item label="订单编号：">
                    <el-input placeholder="订单编号" v-model="searchParams.orderId"></el-input>
                </el-form-item>
                <el-form-item label="客户姓名：">
                    <el-input placeholder="客户姓名" v-model="searchParams.deliveryUsername"></el-input>
                </el-form-item>
                <el-form-item label="客户地址：">
                    <el-input placeholder="客户地址" v-model="searchParams.deliveryAddress"></el-input>
                </el-form-item>
                <el-form-item label="拒收原因：">
                    <el-select  placeholder="请选择拒收原因" v-model="searchParams.rejectCause">
                        <el-option label="不想要" value="不想要"></el-option>
                        <el-option label="未在家" value="未在家"></el-option>
                    </el-select>

                </el-form-item>
                <br>
                <el-form-item label="下单日期：">
                    <el-date-picker
                            v-model="value1"
                            @change="chooseTime1"
                            type="datetimerange"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            :picker-options="pickerOptions"
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="lift">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="拒收时间：">
                    <el-date-picker
                            v-model="value2"
                            @change="chooseTime2"
                            type="datetimerange"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            :picker-options="pickerOptions"
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="lift">
                    </el-date-picker>
                </el-form-item>
                <br>
                <el-form-item label="发货时间：">
                    <el-date-picker
                            v-model="value3"
                            @change="chooseTime3"
                            type="datetimerange"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            :picker-options="pickerOptions"
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="lift">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="签收时间：">
                    <el-date-picker
                            v-model="value4"
                            @change="chooseTime4"
                            type="datetimerange"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            :picker-options="pickerOptions"
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="lift">
                    </el-date-picker>
                </el-form-item>

                <el-form-item>
                    <el-button type="success" @click="findPage1" icon="el-icon-search"> 查询</el-button>
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
                        prop="orderAction"
                        label="订单动作"
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
                        <el-tag v-if="scope.row.orderStatus=='已拒收'" type="danger">已拒收</el-tag>
                    </template>

                </el-table-column>
                <el-table-column
                        v-if="false"
                        align="center"
                        prop="returnedId"
                        label="退货单编号"
                        width="30">

                </el-table-column>
                <el-table-column
                        align="center"
                        prop="address"
                        label="操作">

                    <template v-slot="obj">
                        <el-button  type="primary" @click="showOrderInfo1(obj.row)" icon="el-icon-search">
                            查看</el-button>
                        <el-button type="info" @click="showOrderInfo2(obj.row)" icon="el-icon-download">生成销售退货单</el-button>
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
        <!--弹框-->
        <div class="dialog-box">
            <el-dialog  :visible.sync="dialogTableVisible" >
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
                                <el-col :span="24" style="height: 300px">
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
                                <el-col :span="24" style="">
                                    <el-row style="border-top: 1px solid black;">
                                        <el-col :span="4" style=" border-right:1px solid black;
                                        height: 40px;padding-left: 25px;padding-top:10px;font-size: 16px;font-weight:bold">
                                            客户拒收时间:
                                        </el-col>
                                        <el-col :span="8" style=" border-right:1px solid black;
                                        height: 40px ;padding-left: 25px;padding-top:10px;font-size: 16px;font-weight:bold">
                                            {{orderInfo.rejectTime}}
                                        </el-col>
                                        <el-col :span="4" style=" border-right:1px solid black;
                                        height: 40px;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            客户拒收原因:
                                        </el-col>
                                        <el-col :span="8" style="height: 40px;
                                        ;padding-left: 25px;padding-top:10px;font-size: 18px;font-weight:bold">
                                            {{orderInfo.rejectCause}}

                                        </el-col>
                                    </el-row>

                                </el-col>



                            </el-row>
                        </el-col>
                    </el-row>
                </el-main>

            </el-dialog>
        </div>
        <!--生成销售退货单弹框-->
        <div class="dialog2-box">
            <el-dialog  :visible.sync="dialogTableVisible2" >
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
                                <el-col :span="24" style="height: 300px">
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
                                <el-col :span="24" style="">
                                    <el-row style="border-top: 1px solid black;">
                                        <el-col :span="4" style=" border-right:1px solid black;
                                        height: 50px;padding-left: 25px;padding-top:14px;font-size: 16px;font-weight:bold">
                                            客户拒收时间:
                                        </el-col>
                                        <el-col :span="8" style=" border-right:1px solid black;
                                        height: 50px ;padding-left: 25px;padding-top:8px;font-size: 16px;font-weight:bold">
                                            <div class="block">
                                                <span class="demonstration"></span>
                                                <el-date-picker
                                                        v-model="valuetime1"
                                                        type="datetime"
                                                        placeholder="选择日期时间">
                                                </el-date-picker>
                                            </div>
                                        </el-col>
                                        <el-col :span="4" style=" border-right:1px solid black;
                                        height: 50px;padding-left: 25px;padding-top:14px;font-size: 16px;font-weight:bold">
                                            客户拒收原因:
                                        </el-col>
                                        <el-col :span="8" style="height: 50px;
                                        padding-left: 20px;padding-top:8px;font-size: 16px;font-weight:bold">
                                            <el-form :inline="true" class="demo-form-inline">
                                                <el-form-item label="">
                                                    <el-select  placeholder="请选择拒收原因" v-model="searchParams.orderType">
                                                        <el-option label="未在家" value="未在家"></el-option>
                                                        <el-option label="不要了" value="不要了"></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </el-form>

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