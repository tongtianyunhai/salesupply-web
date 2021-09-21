<template>

        <div class="auditPut">
            <!-- 条件查询 -->
            <table>

                <tr>
                    库存管理->入出库单审核->入库单审核
                </tr>
                <br/>

                <tr>
                    <el-button type="primary">待审核</el-button>
                    <el-button type="primary">审核通过</el-button>
                    <el-button type="primary">审核不通过</el-button>
                </tr>
                <br/>

                <tr>
                    <!-- 搜索框 -->
                    <td>
                        <el-input  v-model="input1" placeholder="入库单编号"></el-input>
                    </td>
                    <td>
                        <el-input v-model="input2" placeholder="名称"></el-input>
                    </td>
                    <td>
                        <div class="block">
                            <span class="demonstration">入库单日期：</span>
                            <el-date-picker
                                    v-model="value2"
                                    type="datetimerange"
                                    :picker-options="pickerOptions"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    align="right">
                            </el-date-picker>
                        </div>
                    </td>
                    <td>
                        <el-button type="primary" round>查询</el-button>
                    </td>
                </tr>
            </table>
            <br/>
            <!-- 入库单表格 -->
            <template>
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="date"
                            label="序号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="入库单编号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="入库单类型"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="入库单日期"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="操作">
                        <el-button type="success" round>审核</el-button>
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
                            :page-sizes="[100, 200, 300, 400]"
                            :page-size="100"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="400">
                    </el-pagination>
                </div>
            </template>
        </div>


</template>

<script>
    import auditPut from '../audit/js/auditPut'

    export default auditPut

</script>

<style scoped>

</style>