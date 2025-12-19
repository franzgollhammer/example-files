<template>
  <div>
    <avue-form :column="column" :form="formData" @submit="handleSubmit">
      <el-button type="primary" @click="submitForm">Submit</el-button>
    </avue-form>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'MyAvueForm',
  setup() {
    const formData = reactive({
      name: '',
      email: '',
      age: null,
    })

    const column = reactive([
      {
        label: 'Name',
        prop: 'name',
        type: 'input',
        rules: [
          {
            required: true,
            message: 'Please enter your name',
            trigger: 'blur',
          },
        ],
      },
      {
        label: 'Email',
        prop: 'email',
        type: 'input',
        rules: [
          {
            required: true,
            message: 'Please enter your email',
            trigger: 'blur',
          },
        ],
      },
      {
        label: 'Age',
        prop: 'age',
        type: 'number',
        rules: [
          { required: true, message: 'Please enter your age', trigger: 'blur' },
        ],
      },
    ])

    const handleSubmit = () => {
      console.log('Form data:', formData)
    }

    const submitForm = () => {
      // The submit event will trigger validation and then the handleSubmit method
      this.$refs.avueForm.submit()
    }

    return {
      formData,
      column,
      handleSubmit,
      submitForm,
    }
  },
})
</script>

<style scoped>
/* Add your styles here */
</style>
