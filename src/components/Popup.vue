<template>
    <v-dialog fullscreen persistent>
        <MemberForm />
    </v-dialog>
</template>

<script>

import MemberForm from '../views/forms/Member.vue';

export default {
    components: {MemberForm},
    data(){

    }
}
</script>