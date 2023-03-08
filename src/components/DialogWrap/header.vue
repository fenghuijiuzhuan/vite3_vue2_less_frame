<template>
    <div class="sh-dialog-wraper-header-default">
        <div class="sh-dialog-wraper-header-default__content">{{ $attrs.content }}</div>
        <img src="@/assets/imgs/close.png" @click="$emit('onClose')" alt="关闭" />
    </div>
</template>
