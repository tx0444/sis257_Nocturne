<template>
  <ComboFormModal
    ref="formModalRef"
    :is-edit="true"
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

function open(combo: any) {
  formModalRef.value?.open(combo)
}

function close() {
  formModalRef.value?.close()
}

async function handleSave({ id, payload, done, fail }: any) {
  if (!id) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Identificador del combo no válido.'
    })
    fail()
    return
  }

  try {
    await http.patch(`productos/${id}`, payload)
    Swal.fire({
      icon: 'success',
      title: 'Combo Actualizado',
      text: 'El combo fue modificado exitosamente.',
      timer: 1800,
      showConfirmButton: false
    })
    done()
    emit('success')
  } catch (error: any) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.response?.data?.message || 'Error al guardar el combo.'
    })
    fail()
  }
}

defineExpose({
  open,
  close
})
</script>
