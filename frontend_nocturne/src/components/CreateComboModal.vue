<template>
  <ComboFormModal
    ref="formModalRef"
    :is-edit="false"
    @save="handleSave"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import http from '@/plugins/axios'
import Swal from 'sweetalert2'
import ComboFormModal from './ComboFormModal.vue'

const emit = defineEmits(['success'])
const formModalRef = ref<InstanceType<typeof ComboFormModal> | null>(null)

function open() {
  formModalRef.value?.open()
}

function close() {
  formModalRef.value?.close()
}

async function handleSave({ payload, done, fail }: any) {
  try {
    await http.post('productos', payload)
    Swal.fire({
      icon: 'success',
      title: 'Combo Creado',
      text: 'El nuevo combo fue registrado exitosamente.',
      timer: 1800,
      showConfirmButton: false
    })
    done()
    emit('success')
  } catch (error: any) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.response?.data?.message || 'Error al crear el combo.'
    })
    fail()
  }
}

defineExpose({
  open,
  close
})
</script>
