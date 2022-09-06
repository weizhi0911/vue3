<template>
  <div>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
     
      <el-form-item label="username" prop="username">
        <el-input
          v-model="ruleForm.username"
          autocomplete="off"
        />
      </el-form-item>

       <el-form-item label="Password" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >Submit</el-button
        >
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

import {login} from '../../api/login'
// import type { FormInstance } from 'element-plus'

const ruleFormRef = ref<any>();
const router = useRouter();

// const validatePass = (rule: any, value: any, callback: any) => {
//   if (value === "") {
//     callback(new Error("Please input the password"));
//   } else {
//     if (ruleForm.username !== "") {
//       if (!ruleFormRef.value) return;
//       ruleFormRef.value.validateField("username", () => null);
//     }
//     callback();
//   }
// };
// const validatePass2 = (rule: any, value: any, callback: any) => {
//   if (value === "") {
//     callback(new Error("Please input the password again"));
//   } else if (value !== ruleForm.password) {
//     callback(new Error("Two inputs don't match!"));
//   } else {
//     callback();
//   }
// };

const ruleForm = reactive({
  password: "",
  username: "",
});

const rules = reactive({
  // password: [{ validator: validatePass, trigger: "blur" }],
  // username: [{ validator: validatePass2, trigger: "blur" }],
});

const submitForm = (formEl: any) => {
  if (!formEl) return;
  formEl.validate((valid: any) => {
    if (valid) {
      console.log("submit!");

      login(ruleForm).then(()=>{
   // router.push({
      //   path: "/",
      // });
      })
   
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const resetForm = (formEl: any) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
