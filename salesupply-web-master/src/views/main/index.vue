<template>
  <div class="main-wrapper">

    <!--布局-->
    <el-container>
      <!--左导航-->
      <el-aside width="200px">
        <!--Logo部分-->
        <div class="aside-logo-wrapper">
          <!--@标识src下-->
          <img src="../../assets/logo.png" alt="">
          <span>Crm管理后台系统</span>
        </div>
        <!--导航菜单-->
        <el-scrollbar>
          <el-menu
                router
              active-text-color="#F56C6C"
              text-color="#606266"
              :router="true"
              default-active="1">
            <!--导航头-->
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">系统首页</span>
            </el-menu-item>

            <!--商品相关-->
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品</span>
              </template>
              <el-menu-item index="2-1" route="/brand">
                <i class="el-icon-menu"></i>
                <span slot="title">品牌管理</span>
              </el-menu-item>

              <el-menu-item index="2-2" route="/classify">
                <i class="el-icon-menu"></i>
                <span slot="title">分类管理</span>
              </el-menu-item>

              <el-menu-item index="2-3" route="/product">
                <i class="el-icon-menu"></i>
                <span slot="title">产品管理</span>
              </el-menu-item>

              <el-menu-item index="2-4" route="/goods">
                <i class="el-icon-menu"></i>
                <span slot="title">商品管理</span>
              </el-menu-item>
              <el-menu-item index="2-5" route="/adjust">
                <i class="el-icon-menu"></i>
                <span slot="title">调价管理</span>
              </el-menu-item>

              <el-menu-item index="2-6" route="/goods2gift">
                <i class="el-icon-menu"></i>
                <span slot="title">商品转赠品</span>
              </el-menu-item>
            </el-submenu>




            <!--售后-->
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>售后管理</span>
              </template>
              <el-menu-item index="3-1" route="/spReturngoods">
                <i class="el-icon-menu"></i>
                <span slot="title">退货申请单管理</span>
              </el-menu-item>
              <el-menu-item index="3-2" route="/spChangegoods">
                <i class="el-icon-menu"></i>
                <span slot="title">换货申请单管理</span>
              </el-menu-item>
              <el-menu-item index="3-3" route="/spOutwarehouse">
                <i class="el-icon-menu"></i>
                <span slot="title">返厂出库申请单</span>
              </el-menu-item>
              <el-menu-item index="3-4" route="/spReturnwarehouse">
                <i class="el-icon-menu"></i>
                <span slot="title">返厂入库申请单</span>
              </el-menu-item>
              <el-menu-item index="3-5" route="spComplaintsrecord">
                <i class="el-icon-menu"></i>
                <span slot="title">普通申诉申请单</span>
              </el-menu-item>
              <el-menu-item index="3-6" route="/spAbnormalcomplaint">
                <i class="el-icon-menu"></i>
                <span slot="title">特殊申诉申请单</span>
              </el-menu-item>
            </el-submenu>



            <!-- 仓库 售后入库-->
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>仓库-售后入库</span>
              </template>
              <el-menu-item index="4-1" route="/salesPut">
                <i class="el-icon-menu"></i>
                <span slot="title">售后入库单</span>
              </el-menu-item>


            </el-submenu>



            <!-- 赠品-->
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>赠品</span>
              </template>
              <el-menu-item index="5-1" route="/gift">
                <i class="el-icon-menu"></i>
                <span slot="title">赠品管理</span>
              </el-menu-item>

              <el-menu-item index="5-2" route="/gift2good">
                <i class="el-icon-menu"></i>
                <span slot="title">赠品转商品</span>
              </el-menu-item>

              <el-menu-item index="5-3" route="/promote">
                <i class="el-icon-menu"></i>
                <span slot="title">促销管理</span>
              </el-menu-item>
            </el-submenu>



            <!--0000000000000000000000000000000000000000000000000000000000000-->
            <!--B2C销售管理-->
            <el-submenu index="8">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>B2C销售管理</span>
              </template>
              <el-menu-item index="/sales/order">
                <i class="el-icon-menu"></i>
                <span slot="title" >B2C销售订单查询</span>
              </el-menu-item>
              <el-menu-item index="/sales/onlineorder">
                <i class="el-icon-menu"></i>
                <span slot="title">B2C网店订单管理</span>
              </el-menu-item>
              <el-menu-item index="/sales/salesdelivery">
                <i class="el-icon-menu"></i>
                <span slot="title">B2C销售出库管理</span>
              </el-menu-item>

              <el-menu-item index="/sales/salesdeliveryreport">
                <i class="el-icon-menu"></i>
                <span slot="title">B2C销售出库单记录</span>
              </el-menu-item>
              <el-menu-item index="/sales/returned">
                <i class="el-icon-menu"></i>
                <span slot="title">B2C销售退货管理</span>
              </el-menu-item>
              <el-menu-item index="/sales/returnedreport">
                <i class="el-icon-menu"></i>
                <span slot="title">B2C销售退货单记录</span>
              </el-menu-item>
            </el-submenu>

            <!--0000000000000000000000000000000000000000000000000000000000000-->






          </el-menu>
        </el-scrollbar>

      </el-aside>
      <!--右导航-->
      <el-container>
        <!--右导航头-->
        <el-header>右导航==========</el-header>
        <!--右主题内容-->
        <el-main>
          <!--动态渲染-->
          <div class="main-box">
            <!--展示不同的页面  品牌crud页面 ，分类的crud页面 ，admin crud单页面-->
            <router-view/>
          </div>

        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped lang="scss">
.main-wrapper {
  height: 100%;
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #fff;
  color: #333;


  .aside-logo-wrapper {
    text-align: center;
    background-color: #B3C0D1;
    height: 60px;
    line-height: 60px;

    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 8px;
    }

    span {
      font-weight: 700;
      color: #fff;
      font-family: "华文行楷";
    }


  }


}

.el-scrollbar {
  height: calc(100% - 60px);
}

.el-main {
  background-color: #E9EEF3;
  color: #606266;
  padding: 6px 0 0 6px;

  .main-box {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 15px 0px 0px 15px;
    box-sizing: border-box;
  }


}

.el-container {
  height: 100%;
}
</style>