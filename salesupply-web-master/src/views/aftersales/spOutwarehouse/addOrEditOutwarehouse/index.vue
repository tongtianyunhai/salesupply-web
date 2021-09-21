<template>
    <div class="addOrEditOutwarehouse-box">
        <!--查询表单-->
        <div class="search-box">
            <el-form :inline="true" class="demo-form-inline" size="mini">
                <el-form-item label="销售订单号">
                    <el-input placeholder="销售订单号" v-model="searchParams.orderId"></el-input>
                </el-form-item>

                <el-form-item label="日期">
                    <el-date-picker
                            v-model="pickerOptions.startArrayDate"
                            @change="chooseTime"
                            type="datetimerange"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            :picker-options="pickerOptions"
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="left">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="findPage">查询</el-button>
                    <el-button type="warning" @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--操作按钮-->

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
                        align="center"
                        prop="orderId"
                        label="销售订单号"
                        width="180">
                </el-table-column>

                <el-table-column
                        align="center"
                        prop="productName"
                        label="商品名称"
                        width="180">
                </el-table-column>

                <el-table-column
                        align="center"
                        prop="productPrice"
                        label="商品单价">
                </el-table-column>


                <el-table-column
                        align="center"
                        prop="productId"
                        label="商品编码">
                </el-table-column>

                <el-table-column
                        align="center"
                        prop="orderImei"
                        label="商品串码">
                </el-table-column>

                <el-table-column
                        align="center"
                        prop="orderGoodscolor"
                        label="商品颜色">
                </el-table-column>


                <el-table-column
                        align="center"
                        prop="orderGoodstype"
                        label="商品类型">
                </el-table-column>

                <el-table-column
                        align="center"
                        prop="address"
                        label="操作">
                    <template v-slot="obj">
                        <el-button type="success" icon="el-icon-edit" size="mini" @click="clearAndAdd(obj.row.orderImei),dialogVisible2=true">新增返厂出库申请单</el-button>

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

        <!--新增-->
        <div class="dialog-box">



            <!--新增-->
            <el-dialog
                    title="返厂出库申请单"
                    :visible.sync="dialogVisible2"
                    width="33%"
            >
                <el-form ref="form" :model="formData2" label-width="240px">

                    <el-form-item label="销售订单号" size="small">
                        <el-input v-model="formData2.orderId"  style="width: 240px;" disabled=""></el-input>
                    </el-form-item>


                    <el-form-item label="订单类型" size="small">
                        <el-select v-model="value" placeholder="请选择" >
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>


                    <el-form-item label="商品编码">
                        <el-input v-model="formData2.productId" size="small" style="width: 240px;" disabled=""></el-input>
                    </el-form-item>

                    <el-form-item label="商品名称">
                        <el-input v-model="formData2.productName" size="small" style="width: 240px;" disabled=""></el-input>
                    </el-form-item>

                    <el-form-item label="商品串码">
                        <el-input v-model="formData2.orderImei" size="small" style="width: 240px;" disabled=""></el-input>
                    </el-form-item>

                    <el-form-item label="商品类型">
                        <el-input v-model="formData2.orderGoodstype" size="small" style="width: 240px;" disabled=""></el-input>
                    </el-form-item>

                    <el-form-item label="商品单价">
                        <el-input v-model="formData2.productPrice" size="small" style="width: 240px;" disabled=""></el-input>
                    </el-form-item>

                    <el-form-item label="商品颜色">
                        <el-input v-model="formData2.orderGoodscolor" size="small" style="width: 240px;" disabled=""></el-input>
                    </el-form-item>


                    <el-form-item label="出库状态">
                        <el-input v-model="formData2.spOutstatus" size="small" style="width: 240px;"></el-input>
                    </el-form-item>

                    <el-form-item label="出库订单序号">
                        <el-input v-model="formData2.spOutorderid" size="small" style="width: 240px;"></el-input>
                    </el-form-item>

                    <el-form-item label="商品外观状态">
                        <el-input v-model="formData2.spOutlookstatus" size="small" style="width: 240px;"></el-input>
                    </el-form-item>


                    <el-form-item label="返厂出库原因">
                        <el-input v-model="formData2.spCauses" size="small" style="width: 240px;"></el-input>
                    </el-form-item>


                    <el-form-item label="订单状态">
                        <el-input v-model="formData2.spOrderstatus" size="small" style="width: 240px;"></el-input>
                    </el-form-item>

                    <el-form-item label="制单人">
                        <el-input v-model="formData2.spCreateBy" size="small" style="width: 240px;"></el-input>
                    </el-form-item>

                    <el-form-item label="制单时间">
                        <el-date-picker
                                v-model="formData2.spCreateTime"
                                type="date"
                                placeholder="选择日期"
                                size="small" style="width: 240px;">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="制单部门">
                        <el-input v-model="formData2.spOrderdepartment" size="small" style="width: 240px;"></el-input>
                    </el-form-item>

                    <el-form-item label="备注">
                        <el-input type="textarea" v-model="formData2.spAddtion" size="small" style="width: 240px;"></el-input>
                    </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="dialogVisible2 = false,add()">确 定</el-button>
  </span>
            </el-dialog>


        </div>
    </div>
</template>

<script>
    import addOrEditOutwarehouse from './index'

    export default addOrEditOutwarehouse;
</script>

<style  src="./index.scss" lang="scss">
</style>