<template>
    <div class="spComplaintsrecord-box">
        <!--查询表单-->
        <div class="search-box">
            <el-form :inline="true" class="demo-form-inline" size="mini">
                <el-form-item label="普通申诉订单">
                    <el-input placeholder="普通申诉订单" v-model="searchParams.spComplaintsid"></el-input>
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
        <div class="crud-box">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="dialogVisible=true,formData={}">新建普通申诉单</el-button>
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
                        align="center"
                        prop="spComplaintsid"
                        label="普通申述单号"
                        width="180">
                </el-table-column>

                <el-table-column
                        align="center"
                        prop="spComplaintsname"
                        label="特殊申诉方案名称"
                        width="180">
                </el-table-column>


                <el-table-column
                        align="center"
                        prop="spComplaintsgoodsiemi"
                        label="申诉商品串码">
                </el-table-column>


                <el-table-column
                        align="center"
                        prop="spComplaintsource"
                        label="申诉来源"
                        width="180">
                </el-table-column>

                <el-table-column
                        align="center"
                        prop="spCreateBy"
                        label="制单人">
                </el-table-column>

                <el-table-column
                        align="center"
                        prop="spCreateTime"
                        label="制单日期">
                </el-table-column>


                <el-table-column
                        align="center"
                        prop="spReplies"
                        label="第一次回复信息">
                </el-table-column>

                <el-table-column
                        align="center"
                        prop="spSecondreplies"
                        label="第二次回复">
                </el-table-column>



                <el-table-column
                        align="center"
                        prop="address"
                        label="操作">
                    <template v-slot="obj">
                        <el-button type="success" icon="el-icon-edit" size="mini"
                                   @click="clearAndAdd(obj.row.spComplaintsid),dialogVisible2=true" >审批</el-button>

                        <el-button type="warning" icon="el-icon-edit" size="mini" @click="clearAndAdd(obj.row.spComplaintsid),dialogVisible3=true">修改</el-button>
                        <el-popconfirm
                                confirm-button-text='确认'
                                cancel-button-text='取消'
                                @confirm="deleteById"
                                icon="el-icon-info"
                                icon-color="red"
                                title="确定删除这一条数据吗？"
                        >
                            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"
                                       @click="formData.spOrderid=obj.row.spComplaintsid">删除</el-button>
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
        <div class="dialog-box">
            <el-dialog
                    title="提示"
                    :visible.sync="dialogVisible"
                    width="40%"
            >

                <el-form ref="form" :model="formData2" label-width="240px">

                    <el-form-item >
                        <el-button type="primary" icon="el-icon-edit" size="mini"  @click="dialogVisible4=true,findPage2()">查看销售订单</el-button>
                    </el-form-item>


                    <el-form-item label="特殊申诉方案名称" size="small">
                        <el-input v-model="formData2.spComplaintsname"  style="width: 240px;"></el-input>
                    </el-form-item>

                    <el-form-item label="销售订单号">
                        <el-input v-model="formData2.orderId" size="small" style="width: 240px;" disabled=""></el-input>
                    </el-form-item>

                    <el-form-item label="申诉商品名称">
                        <el-input v-model="formData2.productName" size="small" style="width: 240px;" disabled=""></el-input>
                    </el-form-item>

                    <el-form-item label="申诉商品编码">
                        <el-input v-model="formData2.productId" size="small" style="width: 240px;" disabled=""></el-input>
                    </el-form-item>

                    <el-form-item label="申诉商品串码">
                        <el-input v-model="formData2.orderImei" size="small" style="width: 240px;" disabled=""></el-input>
                    </el-form-item>

                    <el-form-item label="申诉商品颜色">
                        <el-input v-model="formData2.orderGoodscolor" size="small" style="width: 240px;" disabled=""></el-input>
                    </el-form-item>

                    <el-form-item label="申诉商品类型">
                        <el-input v-model="formData2.orderGoodstype" size="small" style="width: 240px;" disabled=""></el-input>
                    </el-form-item>



                    <el-form-item label="申诉来源">
                        <el-input v-model="formData2.spComplaintsource" size="small" style="width: 240px;"></el-input>
                    </el-form-item>


                    <el-form-item label="申诉描述">
                        <el-input v-model="formData2.spComplaintsdescribe" size="small" style="width: 240px;"></el-input>
                    </el-form-item>


                    <el-form-item label="申诉记录状态">
                        <el-input v-model="formData2.spComplaintstatus" size="small" style="width: 240px;"></el-input>
                    </el-form-item>



                    <el-form-item label="投诉工单号">
                        <el-input v-model="formData2.spComplaintsorderid" size="small" style="width: 240px;"></el-input>
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


                    <el-form-item label="备注">
                        <el-input type="textarea" v-model="formData2.spAddtion" size="small" style="width: 240px;"></el-input>
                    </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false" size="small">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false,add()  " size="small">确 定</el-button>
                </span>
            </el-dialog>

            <!--修改-->
            <el-dialog
                    title="实体操作"
                    :visible.sync="dialogVisible3"
                    width="33%"
            >
                <el-form ref="form" :model="formData2" label-width="240px">

                    <el-form-item label="普通申诉单号" size="small">
                        <el-input v-model="formData2.spComplaintsid"  style="width: 240px;" disabled=""></el-input>
                    </el-form-item>

                    <el-form-item label="普通申诉方案名称" size="small">
                        <el-input v-model="formData2.spComplaintsname"  style="width: 240px;"></el-input>
                    </el-form-item>


                    <el-form-item label="申诉来源">
                        <el-input v-model="formData2.spComplaintsource" size="small" style="width: 240px;"></el-input>
                    </el-form-item>


                    <el-form-item label="申诉描述">
                        <el-input v-model="formData2.spComplaintsdescribe" size="small" style="width: 240px;"></el-input>
                    </el-form-item>


                    <el-form-item label="申诉记录状态">
                        <el-input v-model="formData2.spComplaintstatus" size="small" style="width: 240px;"></el-input>
                    </el-form-item>



                    <el-form-item label="第一次答复意见">
                        <el-input v-model="formData2.spReplies" size="small" style="width: 240px;"></el-input>
                    </el-form-item>

                    <el-form-item label="第一次答复时间">
                        <el-date-picker
                                v-model="formData2.spRepliestime"
                                type="date"
                                placeholder="选择日期"
                                size="small" style="width: 240px;">
                        </el-date-picker>
                    </el-form-item>


                    <el-form-item label="第二次答复意见">
                        <el-input v-model="formData2.spSecondreplies" size="small" style="width: 240px;"></el-input>
                    </el-form-item>

                    <el-form-item label="第二次答复时间">
                        <el-date-picker
                                v-model="formData2.spSecondrepliestime"
                                type="date"
                                placeholder="选择日期"
                                size="small" style="width: 240px;">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="第二次答复客服工号">
                        <el-input v-model="formData2.spSupporterid" size="small" style="width: 240px;"></el-input>
                    </el-form-item>

                    <el-form-item label="收货核实人">
                        <el-input v-model="formData2.spGoodschecker" size="small" style="width: 240px;"></el-input>
                    </el-form-item>

                    <el-form-item label="收货核实意见">
                        <el-input v-model="formData2.spCheckcomment" size="small" style="width: 240px;"></el-input>
                    </el-form-item>


                    <el-form-item label="收货核实日期">
                        <el-date-picker
                                v-model="formData2.spCheckcommenttime"
                                type="date"
                                placeholder="选择日期"
                                size="small" style="width: 240px;">
                        </el-date-picker>
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







                    <el-form-item label="备注">
                        <el-input type="textarea" v-model="formData2.spAddtion" size="small" style="width: 240px;"></el-input>
                    </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible3 = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="dialogVisible3 = false,Edit()">确 定</el-button>
  </span>
            </el-dialog>


            <!--审批-->
            <el-dialog
                    title="普通申诉审批表"
                    :visible.sync="dialogVisible2"
                    width="33%"
            >

                <el-form ref="form" :model="formData2" label-width="240px">

                    <el-form-item label="普通申诉单编号" size="small" >
                        <el-input v-model="formData2.spComplaintsid" style="width: 240px;" disabled=""></el-input>
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



                    <el-form-item label="审核状态">
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


                    <el-form-item label="审批人">
                        <el-input v-model="formData2.spChecker" size="small" style="width: 240px;"></el-input>
                    </el-form-item>


                    <el-form-item label="审批日期">
                        <el-date-picker
                                v-model="formData2.spUpdateDate"
                                type="date"
                                placeholder="选择日期"
                                size="small" style="width: 240px;">
                        </el-date-picker>
                    </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
                        <el-button size="mini" @click="dialogVisible2 = false">取 消</el-button>
                        <el-button type="primary" size="mini" @click="addcheck(),dialogVisible2 = false">确 定</el-button>
                    </span>

            </el-dialog>



            <!--销售订单信息-->



            <el-dialog
                    title="销售订单查询"
                    :visible.sync="dialogVisible4"
                    width="80%"
            >


                <div class="search-box">
                    <el-form :inline="true" class="demo-form-inline" size="mini">
                        <el-form-item label="销售订单编号">
                            <el-input placeholder="销售订单编号" v-model="searchParams2.orderId"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="findPage2">查询</el-button>
                            <el-button type="warning" @click="resetForm">重置</el-button>
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
                                <el-button type="success" icon="el-icon-edit" size="mini" @click="clearAndAdd2(obj.row.goodsEncode),dialogVisible4=false">选择该条记录</el-button>
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


    </div>
</template>

<script>
    import spComplaintsrecord from './index'

    export default spComplaintsrecord;
</script>

<style  src="./index.scss" lang="scss">
</style>