<template>
    <div>
        <h1>赠品转商品</h1>
        <!--  查询表单  -->
        <el-form :inline="true" :model="findMsg" class="demo-form-inline" size="mini">

            <el-form-item label="商品名称">
                <el-input v-model="findMsg.giftName" placeholder="商品名称"></el-input>
            </el-form-item>

            <el-form-item>
                商品分类:
                <el-select size="small" v-model="findMsg.giftClassify" placeholder="请选择商品分类">
                    <el-option
                            v-for="type in goodType"
                            :key="type.giftId"
                            :label="type.giftClassify"
                            :value=type.giftClassify>
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                商品颜色:
                <el-select size="small" v-model="findMsg.giftColor" placeholder="请选择商品颜色">
                    <el-option
                            v-for="color in goodColor"
                            :key="color.giftId"
                            :label="color.giftColor"
                            :value=color.giftColor>
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                商品品牌:
                <el-select size="small" v-model="findMsg.giftBrand" placeholder="请选择商品品牌">
                    <el-option
                            v-for="brand in goodBrand"
                            :key="brand.giftId"
                            :label="brand.giftBrand"
                            :value=brand.giftBrand>
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                审核状态:
                <el-select size="small" v-model="findMsg.approvalStatus" placeholder="请选择审核状态">
                    <el-option
                            v-for="states in checkState"
                            :key="states.value"
                            :label="states.label"
                            :value=states.value>
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" icon="el-icon-circle-plus-outline" @click="dialogVisible=true,formData={}" size="mini">
                    新增赠品转商品
                </el-button>
                <el-button icon="el-icon-search" @click="findGift2Good" type="warning">搜索</el-button>
                <!--<el-button type="warning" @click="restForm">重置</el-button>-->
            </el-form-item>
        </el-form>

        <!--table展示数据-->
        <div class="table-box">
            <el-table
                    :data="changeList"
                    style="width: 100%"
            >
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>

                <el-table-column
                        v-if="show"
                        align="center"
                        prop="giftId"
                        label="商品ID"
                        width="180">
                </el-table-column>

                <el-table-column
                        align="center"
                        prop="remark1"
                        label="转换表ID"
                        width="180">
                </el-table-column>

                <el-table-column
                    align="center"
                    prop="giftName"
                    label="赠品名称"
                    width="180">
            </el-table-column>

                <el-table-column
                    align="center"
                    prop="giftClassify"
                    label="赠品类型"
                    width="180">
            </el-table-column>

                <el-table-column
                        align="center"
                        prop="giftBrand"
                        label="赠品品牌"
                        width="180">
                </el-table-column>

                <el-table-column
                        align="center"
                        prop="giftSwichTyprice"
                        label="商品价格"
                        width="180">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="giftSwitchPutwarehouse"
                        label="商品数量"
                        width="180">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="approvalStatus"
                        label="审核状态"
                        width="180">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.approvalStatus===0" type="warning">未审核</el-tag>
                        <el-tag v-if="scope.row.approvalStatus===1" type="success">已审核</el-tag>
                        <el-tag v-if="scope.row.approvalStatus===2" type="info">审核未通过</el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                        align="center"
                        label="操作">
                    <template v-slot="obj">
                        <el-button type="success"@click=" dialogVisible = true,editgifttogood(gifttogoodList.remark1=obj.row.remark1)"
                                   icon="el-icon-edit" size="mini">修改
                        </el-button>

                        <!--<el-popconfirm-->
                                <!--confirm-button-text='确认'-->
                                <!--cancel-button-text='取消'-->
                                <!--@confirm="delById"-->
                                <!--icon="el-icon-info"-->
                                <!--icon-color="red"-->
                                <!--title="确定删除这一条数据吗？"-->
                        <!--&gt;-->
                            <!--<el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"-->
                                       <!--@click="gifttogoodList.giftId=obj.row.giftId">删除-->
                            <!--</el-button>-->
                        <!--</el-popconfirm>-->
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--分页-->
        <div class="page-box">
            <el-pagination
                    background layout="sizes,prev, pager, next, jumper"
                    :current-page="findMsg.currentPage"
                    @current-change="currentPageChange"
                    @size-change="sizeChange"
                    :page-sizes="[4, 6, 8]"
                    :total="total">
            </el-pagination>
        </div>

        <!--弹框-->
        <div class="dialog-box">
            <el-dialog
                    title="外层模态框"
                    :visible.sync="dialogVisible"
                    width="40%"
            >

                <el-button @click="dialogVisible1 = true,findAllGift()" size="small">新增赠品转商品</el-button>

                <!-- 内层弹框 -->
                <el-dialog
                        title="内层模态框"
                        :visible.sync="dialogVisible1"
                        width="80%"
                >
                    <!--table展示数据-->
                    <el-table
                            :data="giftList1"
                            style="width: 100%"
                    >
                        <el-table-column
                                align="center"
                                prop="giftId"
                                label="赠品ID"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="giftName"
                                label="赠品名称"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="giftClassify"
                                label="赠品类型"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="giftPrice"
                                label="赠品单价"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="giftBrand"
                                label="赠品品牌"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="giftModel"
                                label="赠品型号"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="giftLowstock"
                                label="赠品数量"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="giftColor"
                                label="赠品颜色"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="giftColor"
                                label="操作"
                                width="180">
                            <template v-slot="obj">
                                <el-button type="success"
                                           @click="dialogVisible1 = false,choice(giftList1.giftId=obj.row.giftId)"
                                           icon="el-icon-edit" size="mini">选 择
                                </el-button>
                            </template>
                        </el-table-column>

                    </el-table>
                </el-dialog>


                <el-form ref="form" :model="formData" label-width="240px">

                    <el-form-item label="转换表中的自增主键" size="small">
                        <el-input v-model="formData.remark1" style="width: 240px;" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="赠品ID" size="small">
                        <el-input v-model="formData.giftId" style="width: 240px;" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="赠品名称" size="small">
                        <el-input v-model="formData.giftName" style="width: 240px;" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="赠品类型" size="small">
                        <el-input v-model="formData.giftClassify" style="width: 240px;" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="赠品型号" size="small">
                        <el-input v-model="formData.giftClassify" style="width: 240px;" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="赠品单价" size="small">
                        <el-input v-model="formData.giftPrice" style="width: 240px;" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="采购成本" size="small">
                        <el-input v-model="formData.giftCost" style="width: 240px;" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="采购部门" size="small">
                        <el-input v-model="formData.createBy" style="width: 240px;" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="最低库存量" size="small">
                        <el-input v-model="formData.giftLowstock" style="width: 240px;" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="赠品颜色" size="small">
                        <el-input v-model="formData.giftColor" style="width: 240px;" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="赠品品牌" size="small">
                        <el-input v-model="formData.giftBrand" style="width: 240px;" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="商品入库数" size="small">
                        <el-input v-model="formData.giftSwitchPutwarehouse" style="width: 240px;"></el-input>
                    </el-form-item>

                    <el-form-item label="天翼价" size="small">
                        <el-input v-model="formData.giftSwichTyprice" style="width: 240px;"></el-input>
                    </el-form-item>

                </el-form>
                <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false" size="small">取 消</el-button>
    <el-button type="primary" @click="addOrEdit1(),dialogVisible = false" size="small">确 定</el-button>
                </span>
            </el-dialog>
        </div>

    </div>
</template>

<script>
    import gift2good from './js/gift2Good'

    export default gift2good;
</script>

<style scoped>

</style>