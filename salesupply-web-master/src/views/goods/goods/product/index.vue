<template>
  <div class="brand-box">
    <!--查询表单-->
    <div class="search-box">
      <el-form :inline="true" class="demo-form-inline" size="mini">
        <el-form-item label="存货档案编码">
          <el-input placeholder="存货档案编码"  v-model="searchParams.productEncode"></el-input>
        </el-form-item>
        <el-form-item label="产品型号">
          <el-input placeholder="产品型号"  v-model="searchParams.productType"></el-input>
        </el-form-item>

        <el-form-item>
          基础库-颜色:
        <el-select size="small" v-model="searchParams.productColor"  placeholder="请选择 基础库-颜色" @change="changeOne">
          <el-option
              v-for="item in colors"
              :key="item.productColor"
              :label="item.productColor"
              :value="item.productColor"

          >
          </el-option>
        </el-select>
        </el-form-item>

        <el-form-item>
          产品品牌:
          <el-select size="small" v-model="searchParams.productBrand"  placeholder="请选择产品品牌" @change="changeOne">
            <el-option
                v-for="item in brands"
                :key="item.brandName"
                :label="item.brandName"
                :value="item.brandId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          产品分类:
          <el-select size="small" v-model="searchParams.productClassify"  placeholder="请选择产品分类" @change="changeOne">
            <el-option
                v-for="item in classifies"
                :key="item.classifyId"
                :label="item.classifyName"
                :value="item.classifyId"

            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="findPage">查询</el-button>
          <el-button type="warning" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--操作按钮-->
    <!--    <div class="crud-box">-->

    <!--      <el-button type="success" icon="el-icon-edit" size="mini">修改</el-button>-->
    <!--      <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>-->
    <!--    </div>-->
    <!--    table展示数据-->
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
            prop="productEncode"
            label="存货档案编码"
            >
        </el-table-column>
        <el-table-column
            align="center"
            prop="classifyName"
            label="基础库-分类"
            >
        </el-table-column>
        <el-table-column
            align="center"
            prop="brandName"
            label="基础库-品牌"
            >

        </el-table-column>
        <el-table-column
            align="center"
            prop="productType"
            label="基础库-型号"
            >

        </el-table-column>
        <el-table-column
            align="center"
            prop="productColor"
            label="基础库-颜色"
            >

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
  </div>
</template>

<script>
import product from './index'

export default product;
</script>

<style scoped src="./indexs.scss" lang="scss">
</style>