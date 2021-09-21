<template>
    <div class="spChangegoods-box">
        <!--查询表单-->
        <div class="search-box">
            <el-form :inline="true" class="demo-form-inline" size="mini">
                <el-form-item label="换货申请单编号">
                    <el-input placeholder="换货申请单编号" v-model="searchParams.spOrderid"></el-input>
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
            <el-popconfirm
                    title="确定新建换货申请单吗？"
                    confirm-button-text='确定'
                    cancel-button-text='取消'
                    @confirm="addOredit()"
            >
                <el-button slot="reference" type="primary" icon="el-icon-edit" size="mini">新增</el-button>
            </el-popconfirm>
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
                        prop="spOrderid"
                        label="换货申请单编号"
                        width="180">
                </el-table-column>

                <el-table-column
                        align="center"
                        prop="spSalesid"
                        label="销售订单编号"
                        width="180">
                </el-table-column>

                <el-table-column
                        align="center"
                        prop="spHandletype"
                        label="订单类型">

                    <template slot-scope="scope">
                       {{typeData[scope.row.spHandletype]}}
                    </template>

                </el-table-column>


                <el-table-column
                        align="center"
                        prop="spGoodsiemi"
                        label="原商品串码">
                </el-table-column>


                <el-table-column
                        align="center"
                        prop="spNewgoodsiemi"
                        label="新商品串码">

                </el-table-column>



                <el-table-column
                        align="center"
                        prop="spCreateBy"
                        label="制单人">
                </el-table-column>

                <el-table-column
                        align="center"
                        prop="spCreateDate"
                        label="制单时间">
                </el-table-column>


                <el-table-column
                        align="center"
                        prop="spOrderdepartment"
                        label="制单部门">
                </el-table-column>



                <el-table-column
                        align="center"
                        prop="address"
                        label="操作">
                    <template v-slot="obj">

                        <el-button type="success" icon="el-icon-edit" size="mini"
                                   @click="clearAndAdd(obj.row.spOrderid),dialogVisible2=true" >审批</el-button>

                        <el-button type="warning" icon="el-icon-edit" size="mini"
                                   @click="clearAndAdd(obj.row.spOrderid),dialogVisible3=true">修改</el-button>
                        <el-popconfirm
                                confirm-button-text='确认'
                                cancel-button-text='取消'
                                @confirm="deleteById"
                                icon="el-icon-info"
                                icon-color="red"
                                title="确定删除这一条数据吗？"
                        >
                            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"
                                       @click="formData.spOrderid=obj.row.spOrderid">删除</el-button>
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



        <div class="dialog-box">


            <!--审批-->
            <el-dialog
                    title="换货审批表"
                    :visible.sync="dialogVisible2"
                    width="33%"
            >

                <el-form ref="form" :model="formData2" label-width="240px">

                    <el-form-item label="换货申请单编号" size="small">
                        <el-input v-model="formData2.spOrderid" style="width: 240px;" disabled=""></el-input>
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





            <!--修改-->
            <el-dialog
                    title="退货审批表"
                    :visible.sync="dialogVisible3"
                    width="33%"
            >
                <el-form ref="form" :model="formData2" label-width="240px">

                    <el-form-item label="换货申请单编号" size="small">
                        <el-input v-model="formData2.spOrderid" style="width: 240px;" disabled=""></el-input>
                    </el-form-item>

                    <el-form-item label="订单类型">
                        <el-input v-model="formData2.spHandletype" size="small" style="width: 240px;" disabled=""></el-input>
                    </el-form-item>





                    <el-form-item label="售后状态">
                        <el-input v-model="formData2.spMaintenancestatus" size="small" style="width: 240px;"></el-input>
                    </el-form-item>

                    <el-form-item label="售后订单编号">
                        <el-input v-model="formData2.spMaintenanceid" size="small" style="width: 240px;"></el-input>
                    </el-form-item>

                    <el-form-item label="换货原因">
                        <el-input v-model="formData2.spCauses" size="small" style="width: 240px;"></el-input>
                    </el-form-item>

                    <el-form-item label="单据状态">
                        <el-input v-model="formData2.spOrderstatus" size="small" style="width: 240px;"></el-input>
                    </el-form-item>

                    <el-form-item label="备注">
                        <el-input type="textarea" v-model="formData2.spAddtion" size="small" style="width: 240px;"></el-input>
                    </el-form-item>


                    <el-form-item label="制单人">
                        <el-input v-model="formData2.spCreateBy" size="small" style="width: 240px;"></el-input>
                    </el-form-item>


                    <el-form-item label="制单部门">
                        <el-input v-model="formData2.spOrderdepartment" size="small" style="width: 240px;"></el-input>
                    </el-form-item>


                    <el-form-item label="制单时间">
                        <el-date-picker
                                v-model="formData2.spCreateDate"
                                type="date"
                                placeholder="选择日期"
                                size="small" style="width: 240px;">
                        </el-date-picker>
                    </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
                        <el-button size="mini" @click="dialogVisible3 = false">取 消</el-button>
                        <el-button type="primary" size="mini" @click="updatecheck(),dialogVisible3 = false">确 定</el-button>
                    </span>

            </el-dialog>

        </div>
    </div>
</template>

<script>
    import spChangegoods from './index'

    export default spChangegoods;
</script>

<style src="./index.scss" lang="scss">
</style>