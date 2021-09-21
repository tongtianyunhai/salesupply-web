<template>
    <div >
        <h1>促销页面</h1>
        <!--  查询表单  -->
        <el-form :inline="true" :model="findMsg" class="demo-form-inline" size="mini">

            <el-form-item label="商品名称">
                <el-input v-model="findMsg.goodsName" placeholder="商品名称"></el-input>
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

            <el-form-item label="促销开始时间">
                <el-date-picker
                        v-model="findMsg.promoteStartime"
                        type="date"
                        placeholder="选择促销的开始时间"
                        format="yyyy 年 MM 月 dd 日">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="价格生效时间">
                <el-date-picker
                        v-model="findMsg.promotePricestartime"
                        type="date"
                        placeholder="选择价格生效的开始时间"
                        format="yyyy 年 MM 月 dd 日">
                </el-date-picker>
            </el-form-item>

            <el-form-item>
                <!--<el-button type="primary" icon="el-icon-edit" @click="dialogVisible=true,formData={}" size="mini">-->
                <!--新增促销申请-->
                <!--</el-button>-->
                <el-button type="danger"
                           @click="promoteData={},dialogVisible1 = true"
                           icon="el-icon-circle-plus-outline" size="mini">添加
                </el-button>
                <el-button icon="el-icon-search" @click="findPromotes" type="warning">搜索</el-button>
                <!--<el-button type="warning" @click="restForm">重置</el-button>-->
            </el-form-item>
        </el-form>

        <!--table展示数据-->
        <div class="table-box" >
            <el-table
                    :data="goodList"
                    style="width: 80%"
            >
                <el-table-column
                        align="center"
                        prop="promoteId"
                        label="促销活动主键id"
                        width="180">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="goodsId"
                        label="商品id"
                        width="180">
                </el-table-column>

                <el-table-column
                        align="center"
                        prop="promoteName"
                        label="活动名称"
                        width="180">
                </el-table-column>

                <el-table-column
                        :formatter="formatDate"
                        align="center"
                        prop="promoteStartime"
                        label="活动开始时间"
                        width="180">
                </el-table-column>

                <el-table-column
                        align="center"
                        prop="promoteShopProprice"
                        label="商场促销价格"
                        width="180">
                </el-table-column>

                <el-table-column
                        :formatter="formatDate"
                        align="center"
                        prop="promotePricestartime"
                        label="希望生效时间"
                        width="180">
                </el-table-column>

                <!--审核表 PromoteApproval-->
                <el-table-column
                        align="center"
                        prop="approvalStatus"
                        label="审批状态"
                        width="180">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.approvalStatus===0" type="warning">未审核</el-tag>
                        <el-tag v-if="scope.row.approvalStatus===1" type="success">已审核</el-tag>
                        <el-tag v-if="scope.row.approvalStatus===2" type="info">审核未通过</el-tag>
                    </template>
                </el-table-column>

                <!--  操作  -->
                <el-table-column
                        align="center"
                        label="操作">
                    <template v-slot="obj">
                        <el-button type="success"
                                   @click=" dialogVisible = true,searchPromote(promoteList.promoteId=obj.row.promoteId)"
                                   icon="el-icon-search" size="mini">查看
                        </el-button>
                        <el-button type="primary"
                                   @click=" dialogVisible1 = true,searchPromote(promoteList.promoteId=obj.row.promoteId)"
                                   icon="el-icon-edit" size="mini">修改
                        </el-button>


                        <!--<el-button type="success" @click=" dialogVisible = true,editgifttogood(gifttogoodList.remark1=obj.row.remark1)"-->
                        <!--icon="el-icon-edit" size="mini">修改-->
                        <!--</el-button>-->

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
                        <!--<el-button type="success"@click=" dialogVisible = true,editgifttogood(gifttogoodList.remark1=obj.row.remark1)"-->
                        <!--icon="el-icon-edit" size="mini">审核跟踪-->
                        <!--</el-button>-->
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--分页-->
        <div class="page-box">
            <el-pagination
                    background
                    :current-page="findMsg.currentPage"
                    :page-size="findMsg.pageSize"
                    layout="prev, pager, next"
                    @current-change="currentPageChange1"
                    :total="total">
            </el-pagination>
        </div>


        <!-- 查看 促销活动详情 的 弹框 -->
        <div class="dialog-box">
            <el-dialog
                    title="查看促销商品信息"
                    :visible.sync="dialogVisible"
                    width="50%"
            >
                <!--  弹框中的数据  -->
                <el-form ref="form" :model="promoteData" label-width="240px" align="left">

                    <el-form-item label="活动开始时间:">
                        <el-date-picker
                                :readonly="true"
                                v-model="promoteData.promoteStartime"
                                type="date"
                                placeholder="选择促销的开始时间"
                                format="yyyy 年 MM 月 dd 日">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动结束时间:">
                        <el-date-picker
                                :readonly="true"
                                v-model="promoteData.promoteEndtime"
                                type="date"
                                placeholder="选择促销的开始时间"
                                format="yyyy 年 MM 月 dd 日">
                        </el-date-picker>
                    </el-form-item>


                    <el-form-item label="活动名称:" size="small">
                        <el-input v-model="promoteData.promoteName" style="width: 240px;" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="促销类型:" size="small">
                        <el-input v-model="promoteData.promoteType" style="width: 240px;" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="商品ID:" size="small">
                        <el-input v-model="promoteData.goodsId" style="width: 240px;" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="商品名称:" size="small">
                        <el-input v-model="promoteData.goodsName" style="width: 240px;" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="商品库存:" size="small">
                        <el-input v-model="promoteData.goodsLowstock" style="width: 240px;" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="促销数量:" size="small">
                        <el-input v-model="promoteData.remark1" style="width: 240px;" disabled></el-input>
                    </el-form-item>

                    <br>
                    <br>

                    <!--  === 市场  商品调价幅度===  -->
                    <el-row style="width:100%" type="flex" justify="left">
                        <el-col :span="4">
                            <el-form-item label="市场价:">
                                <el-input style="width:80px" v-model="promoteData.goodsMarketprice" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="调价策略:">
                                <el-select style="width:90px" v-model="promoteData.promoteMkAdjustpricetype"
                                           placeholder="请选择活动区域" disabled>
                                    <el-option
                                            v-for="type in adjustType"
                                            :key="type.value"
                                            :label="type.label"
                                            :value=type.value>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="调整数值:">
                                <el-input style="width:80px" v-model="promoteData.promoteMkAdjustnum" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="市场促销价:">
                                <el-input style="width:80px" v-model="promoteData.promoteMkProprice" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <br>
                    <br>
                    <!--  === 商场  商品调价幅度===  -->
                    <el-row style="width:100%" type="flex" justify="left">
                        <el-col :span="4">
                            <el-form-item label="商场价:">
                                <el-input style="width:80px" v-model="promoteData.goodsShoprice" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="调价策略:">
                                <el-select style="width:90px" v-model="promoteData.promoteShopAdjustpricetype"
                                           placeholder="请选择活动区域" disabled>
                                    <el-option
                                            v-for="type in adjustType"
                                            :key="type.value"
                                            :label="type.label"
                                            :value=type.value>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="调整数值:">
                                <el-input style="width:80px" v-model="promoteData.promoteShopAdjustnum" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="商场促销价:">
                                <el-input style="width:80px" v-model="promoteData.promoteShopProprice" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <br>
                    <br>
                    <el-form-item label="希望价格生效时间:">
                        <el-date-picker
                                :readonly="true"
                                v-model="promoteData.promotePricestartime"
                                type="date"
                                placeholder="希望价格生效时间"
                                format="yyyy 年 MM 月 dd 日">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="希望价格失效时间:">
                        <el-date-picker
                                :readonly="true"
                                v-model="promoteData.promotePricendtime"
                                type="date"
                                placeholder="希望价格失效时间"
                                format="yyyy 年 MM 月 dd 日">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="活动情况或原因:" size="small">
                        <el-input v-model="promoteData.promoteReason" style="width: 240px;" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="活动策划文件" size="small">
                        <el-input v-model="promoteData.promoteFile" style="width: 240px;" disabled></el-input>
                    </el-form-item>

                    <el-form-item label="备注:" size="small">
                        <el-input v-model="promoteData.promoteComment" style="width: 240px;" disabled></el-input>
                    </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
                     <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                </span>
            </el-dialog>
        </div>


        <!-- 添加 或者 修改 促销活动 详情 的 弹框 -->
        <div class="dialog-box">
            <el-dialog
                    title="添加或者修改促销商品信息"
                    :visible.sync="dialogVisible1"
                    width="50%"
            >
                <!--  弹框中的数据  -->
                <el-form ref="form" :model="promoteData" label-width="240px" align="left">

                    <el-form-item label="促销活动主键ID:" size="small" v-if="show">
                        <el-input v-model="promoteData.promoteId" style="width: 240px;"></el-input>
                    </el-form-item>
                    <el-form-item label="活动开始时间:">
                        <el-date-picker
                                v-model="promoteData.promoteStartime"
                                type="date"
                                placeholder="活动开始时间"
                                format="yyyy 年 MM 月 dd 日">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动结束时间:">
                        <el-date-picker
                                v-model="promoteData.promoteEndtime"
                                type="date"
                                placeholder="活动结束时间"
                                format="yyyy 年 MM 月 dd 日">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="活动名称:" size="small">
                        <el-input v-model="promoteData.promoteName" style="width: 240px;"></el-input>
                    </el-form-item>

                    <el-form-item label="促销类型:" size="small">
                        <el-input v-model="promoteData.promoteType" style="width: 240px;"></el-input>
                    </el-form-item>


                    <el-form-item>
                        <el-button type="primary" icon="el-icon-edit" @click="findPage(),dialogVisible3=true"
                                   size="mini">
                            选择商品
                        </el-button>
                    </el-form-item>


                    <el-form-item label="商品ID:" size="small">
                        <el-input v-model="promoteData.goodsId" style="width: 240px;" disabled=""></el-input>
                    </el-form-item>
                    <el-form-item label="商品名称:" size="small">
                        <el-input v-model="promoteData.goodsName" style="width: 240px;" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="商品库存:" size="small">
                        <el-input v-model="promoteData.goodsLowstock" style="width: 240px;" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="促销数量:" size="small">
                        <el-input v-model="promoteData.remark1" style="width: 240px;"></el-input>
                    </el-form-item>
                    <br>
                    <br>
                    <!--  === 市场  商品调价幅度===  -->
                    <el-row style="width:100%" type="flex" justify="left">
                        <el-col :span="4">
                            <el-form-item label="市场价:">
                                <el-input style="width:80px" v-model="promoteData.goodsMarketprice" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="调价策略:">
                                <el-select style="width:90px" v-model="promoteData.promoteMkAdjustpricetype"
                                           placeholder="请选择活动区域">
                                    <el-option
                                            v-for="type in adjustType"
                                            :key="type.value"
                                            :label="type.label"
                                            :value=type.value>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="调整数值:">
                                <el-input style="width:80px" v-model="promoteData.promoteMkAdjustnum"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="市场促销价:">
                                <el-input style="width:80px" v-model="promoteData.promoteMkProprice"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <br>
                    <br>
                    <!--  === 商场  商品调价幅度===  -->
                    <el-row style="width:100%" type="flex" justify="left">
                        <el-col :span="4">
                            <el-form-item label="商场价:">
                                <el-input style="width:80px" v-model="promoteData.goodsShoprice" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="调价策略:">
                                <el-select style="width:90px" v-model="promoteData.promoteShopAdjustpricetype"
                                           placeholder="请选择活动区域">
                                    <el-option
                                            v-for="type in adjustType"
                                            :key="type.value"
                                            :label="type.label"
                                            :value=type.value>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="调整数值:">
                                <el-input style="width:80px" v-model="promoteData.promoteShopAdjustnum"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="商场促销价:">
                                <el-input style="width:80px" v-model="promoteData.promoteShopProprice"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <br>
                    <br>
                    <el-form-item label="希望价格生效时间:">
                        <el-date-picker
                                v-model="promoteData.promotePricestartime"
                                type="date"
                                placeholder="希望价格生效时间"
                                format="yyyy 年 MM 月 dd 日">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="希望价格失效时间:">
                        <el-date-picker
                                v-model="promoteData.promotePricendtime"
                                type="date"
                                placeholder="希望价格失效时间"
                                format="yyyy 年 MM 月 dd 日">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="活动情况或原因:" size="small">
                        <el-input v-model="promoteData.promoteReason" style="width: 240px;"></el-input>
                    </el-form-item>

                    <el-form-item label="活动策划文件" size="small">
                        <el-input v-model="promoteData.promoteFile" style="width: 240px;"></el-input>
                    </el-form-item>

                    <el-form-item label="备注:" size="small">
                        <el-input v-model="promoteData.promoteComment" style="width: 240px;"></el-input>
                    </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
                     <el-button @click="dialogVisible1 = false" size="small">取 消</el-button>
                     <el-button @click="addOrEdit2(),dialogVisible1 = false" type="primary" size="small">保 存</el-button>
                 </span>
            </el-dialog>
        </div>


        <!-- 查看 促销活动详情 的 弹框 -->
        <div class="dialog-box">
            <el-dialog
                    title="选择商品信息"
                    :visible.sync="dialogVisible3"
                    width="50%"

            >
                <!--table展示数据-->
                <div class="table-box">
                    <el-table
                            :data="tableData"
                            style="width: 100%"
                    >

                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="goodsName"
                                label="商品名称"
                        >
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="classifyName"
                                label="商品分类"
                        >
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="brandName"
                                label="商品品牌"
                        >

                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="goodsType"
                                label="商品型号"
                        >

                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="goodsColor"
                                label="基础库-颜色"
                        >
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="goodsLowstock"
                                label="商品数量"
                        >
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="address"
                                label="操作">
                            <template v-slot="obj">

                                <el-button type="success" icon="el-icon-circle-plus" size="mini"
                                           @click="dialogVisible3=false,choiceGood(obj.row.goodsId) ">选 择
                                </el-button>
                                <!--<el-button type="success" icon="el-icon-edit" size="mini"-->
                                <!--@click="clearAndAdd2(obj.row.goodsId),dialogVisible2=true">修改-->
                                <!--</el-button>-->

                                <!--<el-popconfirm-->
                                <!--confirm-button-text='确认'-->
                                <!--cancel-button-text='取消'-->
                                <!--@confirm="deleteById"-->
                                <!--icon="el-icon-info"-->
                                <!--icon-color="red"-->
                                <!--title="确定删除这一条数据吗？">-->
                                <!--<el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"-->
                                <!--@click="formData.goodsId=obj.row.goodsId">删除-->
                                <!--</el-button>-->
                                <!--</el-popconfirm>-->
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
            </el-dialog>
        </div>

    </div>
</template>

<script>
    import promote from './js/promote'

    export default promote;
</script>

<style scoped>

</style>