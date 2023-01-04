<template>
  <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
  >
    <el-form-item label="学号" prop="username">
      <el-input v-model="ruleForm.username" maxlength="8"/>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" type="password"/>
    </el-form-item>
    <el-form-item label="验证码" prop="captcha">
      <el-input v-model="ruleForm.captcha" maxlength="4"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        登录
      </el-button>
    </el-form-item>
  </el-form>

  <div v-if="show" class="score-list">
    <div v-for="(i, indexI) in scoreSumList" :key="indexI" class="term">
      <div style="color: black; font-size: 22px; font-weight: bold">{{i.term.replaceAll("\"","")}}</div>
      获得学分{{i.gotScore}}
      出分科数{{i.scoreList.length}}
      挂科数目 <span :style="i.failNum>0? 'color: red': 'color: green'" >{{i.failNum}}</span>
      绩点{{i.gpa}}
      <div v-for="(j, indexJ) in i.scoreList" :key="indexJ">
        {{j.courseName}} {{j.courseAttr}} {{j.grade}}
      </div>
    </div>

  </div>

</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'

import axios from "axios";
import {ArrayUtils} from "@/utils/ArrayUtils";
import {Score} from "@/interfaces/Score";
import {ScoreUtils} from "@/utils/ScoreUtils";
import {ScoreSum} from "@/interfaces/ScoreSum";
const show = ref(false)
const formSize = ref('default')
const scoreSumList = ref([] as ScoreSum[])
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  username: '20201004',
  password: 'a5212357',
  captcha: 'fgdd',
})

const rules = reactive<FormRules>({
  username: [
    {required: true, message: '请输入学号', trigger: 'blur'},
    {min: 7, max: 8, message: '学号有误', trigger: 'blur'},

  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 8, max: 30, message: '密码长度有误', trigger: 'blur'},
  ],
  captcha: [
    {required: true, message: '请输入验证码', trigger: 'blur'},
    {min: 4, max: 4, message: '验证码有误', trigger: 'blur'},
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      axios.post('http://localhost:8090/login', ruleForm)
          .then((resp) => {
            scoreSumList.value = ScoreUtils.getScoreSum(resp.data.data);
            show.value = true
            // console.log(temp)
          })
    } else {
      console.log('error submit!', fields)
    }
  })
}

</script>

<style scoped>

.score-list {
  background-color: #f2f2f2;
}

.term{
  margin: 20px auto 0 auto;
  background-color: #fff;
  border-radius: 10px;
  width: 90%;
}
</style>