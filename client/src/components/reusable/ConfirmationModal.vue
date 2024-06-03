<template>
    <div v-if="showModal" class="modal">
        <div class="modal-content">
            <p>{{ message }}</p>
            <button id="confirm-delete" :class="{ 'danger': danger, 'safe': !danger }" @click="confirmAction">Confirm</button>
            <button id="deny-delete" @click="cancelAction">Cancel</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        message: String,
        showModal: Boolean,
        danger: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        confirmAction() {
            this.$emit('confirm');
        },
        cancelAction() {
            this.$emit('cancel');
        }
    }
};
</script>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: white;
    color: black;
    padding: 20px;
    border-radius: 8px;
}

button {
    padding: 0.5ch 1ch;
    border-radius: 1ch;
    border: 0;
    margin-right: 1.5ch;
    text-transform: uppercase;
    font-weight: bold;
    color: white;
}

button#confirm-delete.safe{
    background-color: #5cba5c;
}

button#confirm-delete.danger{
    background-color: red;
}

button#deny-delete {
    background-color: grey;
}
</style>