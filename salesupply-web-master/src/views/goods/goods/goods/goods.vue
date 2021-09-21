<template>
  <div class="brand-box">
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
          <el-button type="warning" @click="resetForm">重置</el-button>
          <el-button type="warning" @click="dialogVisible3=true">创建一类商品</el-button>
          <el-button type="warning" @click="dialogVisible5 =true">创建二类商品</el-button>
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
                       @click="dialogVisible=true,clearAndAdd(obj.row.goodsId) ">查看
            </el-button>
            <el-button type="success" icon="el-icon-edit" size="mini"
                       @click="clearAndAdd2(obj.row.goodsId),dialogVisible2=true">修改
            </el-button>

            <el-popconfirm
                confirm-button-text='确认'
                cancel-button-text='取消'
                @confirm="deleteById"
                icon="el-icon-info"
                icon-color="red"
                title="确定删除这一条数据吗？">
              <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"
                         @click="formData.goodsId=obj.row.goodsId">删除
              </el-button>
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
    <!--弹框 show -->
    <el-dialog
        title="实体操作"
        :visible.sync="dialogVisible"
        width="33%"
    >
      <el-form class="dadadada" ref="form" label-width="140px" size="small" disabled>
        <el-form-item label="存货档案编码:">
          <el-input v-model="formData.goodsEncode"></el-input>
        </el-form-item>
        <el-form-item label="基础库-分类:">
          <el-input v-model="formData.classifyName"></el-input>
        </el-form-item>
        <el-form-item label="基础库品牌:">
          <el-input v-model="formData.brandName"></el-input>
        </el-form-item>
        <el-form-item label="基础库-型号:">
          <el-input v-model="formData.goodsType"></el-input>
        </el-form-item>
        <el-form-item label="基础库-业务模式:">
          <el-input v-model="formData.remark1"></el-input>
        </el-form-item>
        <el-form-item label="基础库-颜色:">
          <el-input v-model="formData.goodsColor"></el-input>
        </el-form-item>

        <el-form-item label="基础库-采购模式:">
          <el-input v-model="formData.goodsBuytype"></el-input>
        </el-form-item>
        <el-form-item label="基础库-铺货:">
          <el-input v-model="formData.goodsDistribution"></el-input>
        </el-form-item>
        <el-form-item label="基础库-备机:">
          <el-input v-model="formData.goodsStandby"></el-input>
        </el-form-item>

        <el-form-item label="基础库-商品名称:">
          <el-input v-model="formData.goodsName"></el-input>
        </el-form-item>

        <el-form-item label="基础库-商品类型:">
          <el-input v-model="formData.goodsCategory"></el-input>
        </el-form-item>
        <el-form-item label="基础库-市场价:">
          <el-input v-model="formData.goodsMarketprice"></el-input>
        </el-form-item>
        <el-form-item label="基础库-商城价:">
          <el-input v-model="formData.goodsShoprice"></el-input>
        </el-form-item>

        <el-form-item label="基础库-最低库存量:">
          <el-input v-model="formData.goodsLowstock"></el-input>
        </el-form-item>
        <el-form-item label="基础库-是否可采购:">
          <el-input v-if="formData.goodsIsbuy == 1" value="可采购"></el-input>
          <el-input v-else-if="formData.goodsIsbuy == 0" value="不可采购"></el-input>
        </el-form-item>

      </el-form>

    </el-dialog>
    <!--update-->
    <el-dialog
        title="实体操作"
        :visible.sync="dialogVisible2"
        width="33%"
    >
      <el-form class="dadadada" ref="form" label-width="140px" size="small">
        <el-form-item label="存货档案编码:">
          <el-input v-model="formData2.goodsEncode" disabled></el-input>
        </el-form-item>
        <el-form-item label="基础库-分类:">
          <el-input v-model="formData2.classifyName" disabled></el-input>
        </el-form-item>
        <el-form-item label="基础库品牌:">
          <el-input v-model="formData2.brandName" disabled></el-input>
        </el-form-item>
        <el-form-item label="基础库-型号:">
          <el-input v-model="formData2.goodsType" disabled></el-input>
        </el-form-item>
        <el-form-item label="基础库-业务模式:">
          <el-input v-model="formData2.remark1" disabled></el-input>
        </el-form-item>
        <el-form-item label="基础库-颜色:">
          <el-input v-model="formData2.goodsColor" disabled></el-input>
        </el-form-item>

        <el-form-item label="基础库-采购模式:">
          <el-input v-model="formData2.goodsBuytype" disabled></el-input>
        </el-form-item>
        <el-form-item label="基础库-铺货:">
          <el-input v-model="formData2.goodsDistribution" disabled></el-input>
        </el-form-item>
        <el-form-item label="基础库-备机:">
          <el-input v-model="formData2.goodsStandby" disabled></el-input>
        </el-form-item>

        <el-form-item label="基础库-商品名称:">
          <el-input v-model="formData2.goodsName"></el-input>
        </el-form-item>

        <el-form-item label="基础库-商品类型:">
          <el-input v-model="formData2.goodsCategory"></el-input>
        </el-form-item>

        <el-form-item label="基础库-市场价:">
          <el-input v-model="formData2.goodsMarketprice"></el-input>
        </el-form-item>
        <el-form-item label="基础库-商城价:">
          <el-input v-model="formData2.goodsShoprice"></el-input>
        </el-form-item>

        <el-form-item label="基础库-最低库存量:">
          <el-input v-model="formData2.goodsLowstock"></el-input>
        </el-form-item>
        <el-form-item label="基础库-是否可采购:">
          <el-select size="small" v-model="formData2.goodsIsbuy" placeholder="请选择是否可采购">
            <el-option
                v-for="item in isBuy"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="dialogVisible2 = false,add()">确 定</el-button>
  </span>
    </el-dialog>

    <!-- 添加一类商品   -->
    <el-dialog
        title="实体操作"
        :visible.sync="dialogVisible3"
        width="33%">
      <el-button size="medium " type="primary" round @click="dialogVisible4 = true">选择一类商品</el-button>
      <el-form class="dadadada" ref="form" label-width="140px" size="small">
        <el-form-item label="存货档案编码:">
          <el-input v-model="formData3.goodsEncode" disabled></el-input>
        </el-form-item>
        <el-form-item label="基础库-分类:">
          <el-input v-model="formData3.classifyName" disabled></el-input>
        </el-form-item>
        <el-form-item label="基础库品牌:">
          <el-input v-model="formData3.brandName" disabled></el-input>
        </el-form-item>
        <el-form-item label="基础库-型号:">
          <el-input v-model="formData3.goodsType" disabled></el-input>
        </el-form-item>
        <el-form-item label="基础库-业务模式:">
          <el-input v-model="formData3.remark1" disabled></el-input>
        </el-form-item>
        <el-form-item label="基础库-颜色:">
          <el-input v-model="formData3.goodsColor" disabled></el-input>
        </el-form-item>

        <el-form-item label="基础库-采购模式:">
          <el-input v-model="formData3.goodsBuytype" disabled></el-input>
        </el-form-item>
        <el-form-item label="基础库-铺货:">
          <el-input v-model="formData3.goodsDistribution" disabled></el-input>
        </el-form-item>
        <el-form-item label="基础库-备机:">
          <el-input v-model="formData3.goodsStandby" disabled></el-input>
        </el-form-item>

        <el-form-item label="基础库-商品名称:">
          <el-input v-model="formData3.goodsName"></el-input>
        </el-form-item>

        <el-form-item label="基础库-商品类型:">
          <el-input v-model="formData3.goodsCategory"></el-input>
        </el-form-item>

        <el-form-item label="基础库-市场价:">
          <el-input v-model="formData3.goodsMarketprice"></el-input>
        </el-form-item>
        <el-form-item label="基础库-商城价:">
          <el-input v-model="formData3.goodsShoprice"></el-input>
        </el-form-item>

        <el-form-item label="基础库-最低库存量:">
          <el-input v-model="formData3.goodsLowstock"></el-input>
        </el-form-item>
        <el-form-item label="基础库-是否可采购:">
          <el-select size="small" v-model="formData3.goodsIsbuy" placeholder="请选择是否可采购">
            <el-option
                v-for="item in isBuy"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible3 = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="dialogVisible3 = false,addOneGood()">创建一类商品</el-button>
  </span>
    </el-dialog>
    <!--内层模态框-->
    <el-dialog
        width="80%"
        title="选择一类商品"
        :visible.sync="dialogVisible4"
        append-to-body>
      <div class="table-box">
        <el-table
            :data="tableData2"
            style="width: 100%">
          <el-table-column
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column
              align="center"
              prop="productEncode"
              label="存货档案编码">
          </el-table-column>
          <el-table-column
              align="center"
              prop="classifyName"
              label="基础库-分类">
          </el-table-column>
          <el-table-column
              align="center"
              prop="brandName"
              label="基础库-品牌">
          </el-table-column>
          <el-table-column
              align="center"
              prop="productType"
              label="基础库-型号">
          </el-table-column>
          <el-table-column
              align="center"
              prop="productColor"
              label="基础库-颜色">
          </el-table-column>
          <el-table-column
              align="center"
              prop="address"
              label="操作">
            <template v-slot="obj">
              <el-button type="success" icon="el-icon-circle-plus" size="mini"
                         @click="addProduct(obj.row.productId) ,dialogVisible4 = false">选择该商品

              </el-button>
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

    <!-- 添加二类类商品   -->
    <el-dialog
        title="实体操作"
        :visible.sync="dialogVisible5"
        width="33%">
      <el-form class="dadadada" ref="form" label-width="140px">
        <el-form-item label=" 商品品牌:">
          <el-select size="small" v-model="addTwoGoodData.goodsBrand" placeholder="请选择商品品牌">
            <el-option
                v-for="item in brands"
                :key="item.brandName"
                :label="item.brandName"
                :value="item.brandId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品型号:" size="small">
          <el-input v-model="addTwoGoodData.goodsType"></el-input>
        </el-form-item>

        <el-form-item label="商品颜色:">
          <el-select size="small" v-model="addTwoGoodData.goodsColor" placeholder="请选择商品颜色">
            <el-option
                v-for="item in colors"
                :key="item.goodsColor"
                :label="item.goodsColor"
                :value="item.goodsColor">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称:">
          <el-input v-model="addTwoGoodData.goodsName"></el-input>
        </el-form-item>

        <el-form-item label="商品类型:">
          <el-select size="small" v-model="addTwoGoodData.goodsClassify" placeholder=" ">
            <el-option
                v-for="item in addGoodsCategory"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="市场价:">
          <el-input v-model="addTwoGoodData.goodsMarketprice"></el-input>
        </el-form-item>
        <el-form-item label="商城价:">
          <el-input v-model="addTwoGoodData.goodsShoprice"></el-input>
        </el-form-item>

        <el-form-item label="最低库存量:">
          <el-input v-model="addTwoGoodData.goodsLowstock"></el-input>
        </el-form-item>
        <el-form-item label="是否可采购:">
          <el-select size="small" v-model="addTwoGoodData.goodsIsbuy" placeholder="请选择是否可采购">
            <el-option
                v-for="item in isBuy"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible5 = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="dialogVisible5 = false,addTwoGood()">创建二类商品</el-button>
  </span>
    </el-dialog>


  </div>
</template>
<script>
import Goods from './index'

export default Goods;
</script>

<style scoped src="./indexs.scss" lang="scss">
</style>