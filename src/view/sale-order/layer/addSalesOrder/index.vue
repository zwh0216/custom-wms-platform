<script setup lang="ts">
import { FORM_TYPE, FormWrap, type FormWrapProps } from '@/components/form-wrap'
import { ElDialog, ElButton } from 'element-plus'
import { ref } from 'vue'

// 弹窗是否显示的标识
const showDialog = ref(false)

// 表单数据
const formValue = ref<Record<string, any>>()

// 表单项
const formComponents: FormWrapProps['components'] = [
  {
    type: FORM_TYPE.text,
    field: 'contractCode',
    label: '合同编号',
    required: true,
  },
  {
    type: FORM_TYPE.select,
    field: 'creatorId',
    label: '销售人员',
    required: true,
  },
  {
    type: FORM_TYPE.text,
    field: 'customerName',
    label: '客户名称',
    required: true,
  },
  {
    type: FORM_TYPE.select,
    field: 'prodId',
    label: '产品',
    required: true,
  },
  {
    type: FORM_TYPE.number,
    field: 'amount',
    label: '数量',
    required: true,
  },
  {
    type: FORM_TYPE.date,
    field: 'deadline',
    label: '交货日期',
    required: true,
  },
]

// 关闭弹窗
const onCloseDialog = () => {
  showDialog.value = false
}

// 添加新销售订单
const addSalesOrder = () => {}
</script>

<template>
  <el-dialog v-model="showDialog" @close="onCloseDialog">
    <FormWrap v-model="formValue" :components="formComponents" />
    <template #footer>
      <el-button @click="onCloseDialog">取消</el-button>
      <el-button type="primary" @click="addSalesOrder"></el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
