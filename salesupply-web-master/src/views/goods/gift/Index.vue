<template>
    <div class="gift-box">
        <h1>赠品页面</h1>

        <!--  查询表单  -->
        <el-form :inline="true" :model="findGift" class="demo-form-inline" size="mini">

            <el-form-item label="商品型号">
                <el-input v-model="findGift.giftModel" placeholder="商品型号"></el-input>
            </el-form-item>

            <el-form-item>
                赠品品牌:
                <el-select size="small" v-model="findGift.giftBrand" placeholder="请选择赠品品牌">
                    <el-option
                            v-for="brand in brandList"
                            :key="brand.giftId"
                            :label="brand.giftBrand"
                            :value=brand.giftBrand>
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                赠品颜色:
                <el-select size="small" v-model="findGift.giftColor" placeholder="请选择赠品颜色">
                    <el-option
                            v-for="color in colorList"
                            :key="color.giftId"
                            :label="color.giftColor"
                            :value=color.giftId>
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="赠品名称">
                <el-input v-model="findGift.giftName" placeholder="赠品名称"></el-input>
            </el-form-item>

            <el-form-item>
                赠品类型:
                <el-select size="small" v-model="findGift.giftClassify" placeholder="请选择赠品类型">
                    <el-option
                            v-for="type in typeList"
                            :key="type.giftId"
                            :label="type.giftClassify"
                            :value=type.giftClassify>
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" icon="el-icon-circle-plus-outline" size="mini" @click="dialogVisible=true,formData={}">新增
                </el-button>
                <el-button icon="el-icon-search" @click="searchGift()" type="warning">搜索</el-button>
                <el-button type="info" @click="restForm">重置</el-button>
            </el-form-item>
        </el-form>


        <!--table展示数据-->
        <div class="table-box">
            <el-table
                    :data="giftList"
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
                        prop="giftLowstock"
                        label="最低库存量"
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
                        prop="giftCost"
                        label="采购成本"
                        width="180">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="giftStatus"
                        label="赠品状态"
                        width="180">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.giftStatus===0" type="warning">无效</el-tag>
                        <el-tag v-if="scope.row.giftStatus===1" type="success">有效</el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                        align="center"
                        label="操作">
                    <template v-slot="obj">
                        <el-button type="success" @click="dialogVisible = true,edit(formData.giftId=obj.row.giftId)"
                                   icon="el-icon-edit" size="mini">修改
                        </el-button>
                        &nbsp;&nbsp;
                        <el-popconfirm
                                confirm-button-text='确认'
                                cancel-button-text='取消'
                                @confirm="deleteById"
                                icon="el-icon-info"
                                icon-color="red"
                                title="确定删除这一条数据吗？"
                        >
                            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"
                                       @click="formData.giftId=obj.row.giftId">删除
                            </el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--分页-->
        <div class="page-box">
            <el-pagination
                    background layout="sizes,prev, pager, next, jumper"
                    :current-page="searchParams.currentPage"
                    @current-change="currentPageChange"
                    @size-change="sizeChange"
                    :page-sizes="[4, 6, 8]"
                    :total="total">
            </el-pagination>
        </div>

        <!--弹框-->
        <div class="dialog-box">
            <el-dialog
                    title="提示"
                    :visible.sync="dialogVisible"
                    width="40%"
            >
                <el-form ref="form" :model="formData" label-width="240px">
                    <el-form-item label="赠品名称" size="small">
                        <el-input v-model="formData.giftName" style="width: 240px;"></el-input>
                    </el-form-item>

                    <el-form-item>
                        赠品类型:
                        <el-select size="small" v-model="formData.giftClassify" placeholder="二级分类搜索选择">
                            <el-option :label="111" :value=1
                                       :key="111"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="赠品型号" size="small">
                        <el-input v-model="formData.giftModel" style="width: 240px;"></el-input>
                    </el-form-item>

                    <el-form-item label="赠品单价" size="small">
                        <el-input v-model="formData.giftPrice" style="width: 240px;"></el-input>
                    </el-form-item>

                    <el-form-item label="采购成本" size="small">
                        <el-input v-model="formData.giftCost" style="width: 240px;"></el-input>
                    </el-form-item>

                    <el-form-item label="采购部门" size="small">
                        <el-input v-model="formData.createBy" style="width: 240px;"></el-input>
                    </el-form-item>

                    <el-form-item label="最低库存量" size="small">
                        <el-input v-model="formData.giftLowstock" style="width: 240px;"></el-input>
                    </el-form-item>

                    <el-form-item label="赠品颜色" size="small">
                        <el-input v-model="formData.giftColor" style="width: 240px;"></el-input>
                    </el-form-item>

                    <el-form-item>
                        赠品品牌:
                        <el-select size="small" v-model="formData.giftBrand" placeholder="二级分类搜索选择">
                            <el-option :label="111" :value=1
                                       :key="111"></el-option>
                        </el-select>
                    </el-form-item>

                </el-form>

                <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false" size="small">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false,addOrEdit()" size="small">确 定</el-button>
                </span>
            </el-dialog>

        </div>

    </div>
</template>

<script>
    import gift from './js/Index'

    export default gift;
</script>

<style scoped>

</style>