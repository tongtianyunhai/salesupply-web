<template>
  <div>
    <div class="brand-box">
      <!--查询表单-->
      <div class="search-box">
        <el-form :inline="true" class="demo-form-inline" size="mini">
          <el-form-item label="商品名称">
            <el-input placeholder="商品名称" v-model="searchParamsGGG.goodsName"></el-input>
          </el-form-item>

          <el-form-item label="商品类型:">
            <el-select size="small" v-model="searchParamsGGG.classifyId" placeholder="请选择商品分类">
              <el-option
                  v-for="item in classifies"
                  :key="item.classifyId"
                  :label="item.classifyName"
                  :value="item.classifyId">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="审核状态:">
            <el-select size="small" v-model="searchParamsGGG.approvalStatus" placeholder="请选择商品分类">
              <el-option
                  v-for="item in checkState"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="findPageGGG">查询</el-button>
            <el-button type="warning" @click="resetForm">重置</el-button>
            <el-button type="warning" @click="dialogVisible=true">新增商品转赠品</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--table展示数据-->
      <div class="table-box">
        <el-table
            :data="tableDataGGG"
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
              label="商品类型"
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
              prop="goodsShoprice"
              label="商品价格"
          >

          </el-table-column>
          <el-table-column
              align="center"
              prop="goodInventoryQuantity"
              label="商品转赠品数量"
          >
          </el-table-column>


          <el-table-column
              align="center"
              prop="approvalStatus"
              label="审核状态">
            <template slot-scope="scope">
              {{typeData[scope.row.approvalStatus]}}
            </template>
          </el-table-column>

          <el-table-column
              align="center"
              prop="address"
              label="操作">
            <template v-slot="obj">

              <el-button type="success" icon="el-icon-circle-plus" size="mini"
                         @click="dialogVisible3=true , clearAndAddLook(obj.row.goodId) ">查看
              </el-button>
              <el-button type="success" icon="el-icon-edit" size="mini"
                         @click="clearAndAddUpdate(obj.row.goodId),dialogVisible4=true"
                         :disabled="obj.row.approvalStatus===1?true:false">修改
              </el-button>

              <el-popconfirm
                  confirm-button-text='确认'
                  cancel-button-text='取消'
                  @confirm="deleteById"
                  icon="el-icon-info"
                  icon-color="red"
                  title="确定删除这一条数据吗？">
                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"
                           @click="clearAndAddDelete(obj.row.id);" :disabled="obj.row.approvalStatus===1?true:false">删除
                </el-button>
              </el-popconfirm>
              <el-button type="success" icon="el-icon-edit" size="mini"
                         @click="clearAndAddUpdate(obj.row.goodId),dialogVisible5=true">审核跟踪
              </el-button>
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
            @current-change="currentPageChangeGGG"
            :total="totalGGG">
        </el-pagination>
      </div>
      <!--新增赠品转商品-->
      <el-dialog
          title="实体操作"
          :visible.sync="dialogVisible"
          width="33%">
        <el-button size="medium " type="primary" round @click="dialogVisible2= true">选择商品</el-button>
        <el-form class="dadadada" ref="form" label-width="140px" size="small">
          <el-form-item label="商品名称:">
            <el-input v-model="formData3.goodsName" disabled></el-input>
          </el-form-item>
          <el-form-item label="商品类型:">
            <el-input v-model="formData3.classifyName" disabled></el-input>
          </el-form-item>
          <el-form-item label="商品型号:">
            <el-input v-model="formData3.goodsType" disabled></el-input>
          </el-form-item>
          <el-form-item label="商品单价:">
            <el-input v-model="formData3.goodsShoprice" disabled></el-input>
          </el-form-item>
          <el-form-item label="商品颜色:">
            <el-input v-model="formData3.goodsColor" disabled></el-input>
          </el-form-item>
          <el-form-item label="商品数量:">
            <el-input v-model="formData3.goodsLowstock" disabled></el-input>
          </el-form-item>
          <el-form-item label="商品入库数:">
            <el-input v-model="formData3.goodInventoryQuantity"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="dialogVisible = false, addgood2gift()">确定</el-button>
  </span>
      </el-dialog>

      <!--   商品选择 -->
      <el-dialog title="选择商品" :visible.sync="dialogVisible2" width="80%">
        <!--查询表单-->
        <div class="search-box">
          <el-form :inline="true" class="demo-form-inline" size="mini">
            <el-form-item label="商品名称">
              <el-input placeholder="商品名称" v-model="searchParams.goodsName"></el-input>
            </el-form-item>
            <el-form-item label="商品型号">
              <el-input placeholder="商品型号" v-model="searchParams.goodsType"></el-input>
            </el-form-item>
            <el-form-item>
              商品颜色:
              <el-select size="small" v-model="searchParams.goodsColor" placeholder="请选择商品颜色">
                <el-option
                    v-for="item in colors"
                    :key="item.goodsColor"
                    :label="item.goodsColor"
                    :value="item.goodsColor">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              商品品牌:
              <el-select size="small" v-model="searchParams.goodsBrand" placeholder="请选择商品品牌 ">
                <el-option
                    v-for="item in brands"
                    :key="item.brandName"
                    :label="item.brandName"
                    :value="item.brandId">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              商品分类:
              <el-select size="small" v-model="searchParams.goodsClassify" placeholder="请选择商品分类">
                <el-option
                    v-for="item in classifies"
                    :key="item.classifyId"
                    :label="item.classifyName"
                    :value="item.classifyId">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="findPage">查询</el-button>
              <el-button type="warning" @click="resetSearchParams">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
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
                prop="address"
                label="操作">
              <template v-slot="obj">

                <el-button type="success" icon="el-icon-circle-plus" size="mini"
                           @click="dialogVisible2=false,chooseGoods(obj.row.goodsId) ">选择
                </el-button>
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

      <!--查看-->
      <el-dialog
          title="实体操作"
          :visible.sync="dialogVisible3"
          width="33%">
        <el-form class="dadadada" ref="form" label-width="140px" size="small" disabled>
          <el-form-item label="商品名称:">
            <el-input v-model="formData4.goodsName" disabled></el-input>
          </el-form-item>
          <el-form-item label="商品类型:">
            <el-input v-model="formData4.classifyName" disabled></el-input>
          </el-form-item>
          <el-form-item label="商品型号:">
            <el-input v-model="formData4.goodsType" disabled></el-input>
          </el-form-item>
          <el-form-item label="商品单价:">
            <el-input v-model="formData4.goodsShoprice" disabled></el-input>
          </el-form-item>
          <el-form-item label="商品颜色:">
            <el-input v-model="formData4.goodsColor" disabled></el-input>
          </el-form-item>
          <el-form-item label="商品数量:">
            <el-input v-model="formData4.goodsLowstock" disabled></el-input>
          </el-form-item>
          <el-form-item label="商品入库数:">
            <el-input v-model="formData4.goodInventoryQuantity"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible3 = false">取 消</el-button>
  </span>
      </el-dialog>

      <!--修改-->
      <el-dialog
          title="实体操作"
          :visible.sync="dialogVisible4"
          width="33%">
        <el-form class="dadadada" ref="form" label-width="140px" size="small">
          <el-form-item label="商品名称:">
            <el-input v-model="formData5.goodsName" disabled></el-input>
          </el-form-item>
          <el-form-item label="商品类型:">
            <el-input v-model="formData5.classifyName" disabled></el-input>
          </el-form-item>
          <el-form-item label="商品型号:">
            <el-input v-model="formData5.goodsType" disabled></el-input>
          </el-form-item>
          <el-form-item label="商品单价:">
            <el-input v-model="formData5.goodsShoprice" disabled></el-input>
          </el-form-item>
          <el-form-item label="商品颜色:">
            <el-input v-model="formData5.goodsColor" disabled></el-input>
          </el-form-item>
          <el-form-item label="商品数量:">
            <el-input v-model="formData5.goodsLowstock" disabled></el-input>
          </el-form-item>
          <el-form-item label="商品入库数:">
            <el-input v-model="formData5.goodInventoryQuantity"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible4 = false">取 消</el-button>
          <el-button size="mini" @click="dialogVisible4 = false ,updateGGG()">确定</el-button>
  </span>
      </el-dialog>

      <!--审核跟踪-->
      <el-dialog
          title="实体操作"
          :visible.sync="dialogVisible5"
          width="33%">
        <el-form class="dadadada" ref="form" label-width="140px" size="small" disabled>
          <el-form-item label="商品名称:">
            <el-input v-model="formData5.goodsName" disabled></el-input>
          </el-form-item>
          <el-form-item label="商品类型:">
            <el-input v-model="formData5.classifyName" disabled></el-input>
          </el-form-item>
          <el-form-item label="商品型号:">
            <el-input v-model="formData5.goodsType" disabled></el-input>
          </el-form-item>
          <el-form-item label="商品单价:">
            <el-input v-model="formData5.goodsShoprice" disabled></el-input>
          </el-form-item>
          <el-form-item label="商品颜色:">
            <el-input v-model="formData5.goodsColor" disabled></el-input>
          </el-form-item>
          <el-form-item label="商品数量:">
            <el-input v-model="formData5.goodsLowstock" disabled></el-input>
          </el-form-item>
          <el-form-item label="商品入库数:">
            <el-input v-model="formData5.goodInventoryQuantity"></el-input>
          </el-form-item>
          <el-form-item label="审核人:">
            <el-input v-model="formData5.approvalUserName"></el-input>
          </el-form-item>
          <el-form-item label="审核时间:">
            <el-input v-model="formData5.approvalTime"></el-input>
          </el-form-item>
          <el-form-item label="审核状态:">
            <el-input v-model="formData5.approvalStatus"></el-input>
          </el-form-item>
          <el-form-item label="审核评语:">
            <el-input v-model="formData5.approvalComment"></el-input>
          </el-form-item>
        </el-form>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import G2g from './g2g'

export default G2g;
</script>

<style scoped src="./indexs.scss" lang="scss">
</style>