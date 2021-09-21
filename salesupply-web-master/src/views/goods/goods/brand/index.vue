<template>
  <div class="brand-box">
    <!--查询表单-->
    <div class="search-box">
      <el-form :inline="true" class="demo-form-inline" size="mini">
        <el-form-item label="品牌名称">
          <el-input placeholder="品牌名称"  v-model="searchParams.brandName"></el-input>
        </el-form-item>

<!--        <el-form-item label="日期">-->
<!--          <el-date-picker-->
<!--              v-model="value2"-->
<!--              type="datetimerange"-->
<!--              :picker-options="pickerOptions"-->
<!--              range-separator="-"-->
<!--              start-placeholder="开始日期"-->
<!--              end-placeholder="结束日期"-->
<!--              align="left">-->
<!--          </el-date-picker>-->
<!--        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="findPage">查询</el-button>
          <el-button type="warning" @click="resetForm">重置</el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="dialogVisible = true,formData={}">添加品牌</el-button>
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
          @selection-change="checkBoxSelectionChange"
      >

        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            align="center"
            prop="brandName"
            label="品牌名称"
            width="180">
        </el-table-column>
        <el-table-column
            align="center"
            prop="brandDes"
            label="品牌描述"
            width="180">
        </el-table-column>
        <el-table-column
            align="center"
            prop="brandUrl"
            label="品牌站点">
          <template v-slot="suibianxie">
            <a :href="suibianxie.row.brandUrl">{{ suibianxie.row.brandUrl }}</a>
          </template>

        </el-table-column>

        <el-table-column
            align="center"
            prop="address"
            label="操作">
          <template v-slot="obj">
            <el-button type="success" icon="el-icon-edit" size="mini"
            @click="clearAndAdd(obj.row.brandId),dialogVisible2=true"></el-button>
            <el-popconfirm
                confirm-button-text='确认'
                cancel-button-text='取消'
                @confirm="deleteById"
                icon="el-icon-info"
                icon-color="red"
                title="确定删除这一条数据吗？"
            >
              <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"
                         @click="formData.brandId=obj.row.brandId"></el-button>
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


    <!--弹框add-->
    <el-dialog
        title="实体操作"
        :visible.sync="dialogVisible"
        width="33%"
    >
      <el-form ref="form" label-width="80px" size="small">
        <el-form-item label="品牌名称">
          <el-input v-model="formData.brandName"></el-input>
        </el-form-item>
        <el-form-item label="品牌站点">
          <el-input v-model="formData.brandUrl"></el-input>
        </el-form-item>
        <el-form-item label="品牌描述">
          <el-input v-model="formData.brandDes"></el-input>
        </el-form-item>

      </el-form>


      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="dialogVisible = false,add()">确 定</el-button>
  </span>
    </el-dialog>

    <!--弹框edit-->
    <el-dialog
        title="实体操作"
        :visible.sync="dialogVisible2"
        width="33%"
    >
      <el-form ref="form" label-width="80px" size="small">
        <el-form-item label="品牌名称">
          <el-input v-model="formData2.brandName"></el-input>
        </el-form-item>
        <el-form-item label="品牌站点">
          <el-input v-model="formData2.brandUrl"></el-input>
        </el-form-item>
        <el-form-item label="品牌描述">
          <el-input v-model="formData2.brandDes"></el-input>
        </el-form-item>

      </el-form>


      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="dialogVisible2 = false,Edit()">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
import brand from './index'

export default brand;
</script>

<style scoped src="./indexs.scss" lang="scss">
</style>