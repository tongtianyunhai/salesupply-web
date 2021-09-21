<template>
    <div class="addOrEditChangegoods-box">
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
                        <el-button type="success" icon="el-icon-edit" size="mini" @click="clearAndAdd(obj.row.orderImei),dialogVisible2=true">新建换货申请单</el-button>
                        <el-popconfirm
                                confirm-button-text='确认'
                                cancel-button-text='取消'
                                @confirm="deleteById"
                                icon="el-icon-info"
                                icon-color="red"
                                title="确定删除这一条数据吗？"
                        >
                        </el-popconfirm>
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

            <el-dialog
                    title="换货申请单"
                    :visible.sync="dialogVisible2"
                    width="33%"
            >
                <el-form ref="form" :model="formData2" label-width="240px" >


                    <el-form-item label="销售订单号" size="small" >
                        <el-input v-model="formData2.orderId"  style="width: 240px;" disabled=""></el-input>
                    </el-form-item>

                    <el-form-item label="原商品名称">
                        <el-input v-model="formData2.productName" size="small" style="width: 240px;" disabled=""></el-input>
                    </el-form-item>

                    <el-form-item label="原商品颜色">
                        <el-input v-model="formData2.orderGoodscolor" size="small" style="width: 240px;" disabled=""></el-input>
                    </el-form-item>

                    <el-form-item label="原商品型号">
                        <el-input v-model="formData2.orderGoodstype" size="small" style="width: 240px;" disabled=""></el-input>
                    </el-form-item>

                    <el-form-item label="原商品编码">
                        <el-input v-model="formData2.productId" size="small" style="width: 240px;" disabled=""></el-input>
                    </el-form-item>

                    <el-form-item label="原商品串码">
                        <el-input v-model="formData2.orderImei" size="small" style="width: 240px;" disabled=""></el-input>
                    </el-form-item>

                    <el-form-item >
                    <el-button type="primary" icon="el-icon-edit" size="mini"  @click="dialogVisible4=true">选择新商品</el-button>
                    </el-form-item>


                    <el-form-item label="新商品名称">
                        <el-input v-model="formData2.spNewgoodsname" size="small" style="width: 240px;" disabled=""></el-input>
                    </el-form-item>

                    <el-form-item label="新商品颜色">
                        <el-input v-model="formData2.spNewgoodscolor" size="small" style="width: 240px;" disabled=""></el-input>
                    </el-form-item>

                    <el-form-item label="新商品型号">
                        <el-input v-model="formData2.spNewgoodstype" size="small" style="width: 240px;" disabled=""></el-input>
                    </el-form-item>

                    <el-form-item label="新商品编码">
                        <el-input v-model="formData2.spNewgoodsid" size="small" style="width: 240px;" disabled=""></el-input>
                    </el-form-item>

                    <el-form-item label="新商品串码">
                        <el-input v-model="formData2.spNewgoodsiemi" size="small" style="width: 240px;" disabled=""></el-input>
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



                    <el-form-item label="售后编号">
                        <el-input v-model="formData2.spMaintenanceid" size="small" style="width: 240px;"></el-input>
                    </el-form-item>


                    <el-form-item label="制单人">
                        <el-input v-model="formData2.spCreateBy" size="small" style="width: 240px;" prop="edit"></el-input>
                    </el-form-item>

                    <el-form-item label="制单时间">
                        <el-date-picker
                                v-model="formData2.spCreateTime"
                                type="date"
                                placeholder="选择日期"
                                size="small" style="width: 240px;">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="制单部门"  >
                        <el-input v-model="formData2.spOrderdepartment" size="small" style="width: 240px;"></el-input>
                    </el-form-item>


                    <el-form-item label="单据状态" size="small">
                        <el-select v-model="value2" placeholder="请选择" >
                            <el-option
                                    v-for="item in options2"
                                    :key="item.value2"
                                    :label="item.label2"
                                    :value="item.value2"
                            >
                            </el-option>
                        </el-select>
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



<!--商品信息-->



        <el-dialog
                title="商品信息表"
                :visible.sync="dialogVisible4"
                width="80%"
        >


            <div class="search-box">
                <el-form :inline="true" class="demo-form-inline" size="mini">
                    <el-form-item label="商品名称">
                        <el-input placeholder="商品名称" v-model="searchParams2.goodsName"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="findPage2">查询</el-button>
                        <el-button type="warning" @click="resetForm2">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <div class="table-box">
                <el-table
                        :data="tableData2"
                        style="width: 100%"
                        @selection-change="checkBoxSelectionChange"
                >

                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>

                    <el-table-column
                            align="center"
                            prop="goodsName"
                            label="商品名称"
                            width="180">
                    </el-table-column>

                    <el-table-column
                            align="center"
                            prop="goodsEncode"
                            label="商品编码"
                            width="180">
                    </el-table-column>

                    <el-table-column
                            align="center"
                            prop="goodsColor"
                            label="商品颜色">
                    </el-table-column>

                    <el-table-column
                            align="center"
                            prop="goodsShoprice"
                            label="商品价格">
                    </el-table-column>

                    <el-table-column
                            align="center"
                            prop="goodsModel"
                            label="商品型号">
                    </el-table-column>

                    <el-table-column
                            align="center"
                            prop="goodsLowstock"
                            label="商品库存">
                    </el-table-column>

                    <el-table-column
                            align="center"
                            prop="imeiNumber"
                            label="商品串码">
                    </el-table-column>

                    <el-table-column
                            align="center"
                            prop="address"
                            label="操作">
                        <template v-slot="obj">
                            <el-button type="success" icon="el-icon-edit" size="mini" @click="clearAndAdd2(obj.row.goodsEncode),dialogVisible4=false">选择该商品</el-button>
                        </template>
                    </el-table-column>
                </el-table>
    </div>

            <!--分页-->
            <div class="page-box">
                <el-pagination
                        background
                        :current-page="searchParams2.currentPage"
                        :page-size="searchParams2.pageSize"
                        layout="prev, pager, next"
                        @current-change="currentPageChange2"
                        :total="total2">
                </el-pagination>
            </div>

        </el-dialog>






        </div>
</template>

<script>
    import addOrEditChangegoods from './index'

    export default addOrEditChangegoods;
</script>

<style  src="./index.scss" lang="scss">
</style>