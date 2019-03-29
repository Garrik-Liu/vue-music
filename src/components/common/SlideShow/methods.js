// [设置]:轮播组件宽度
export function setSliderWidth() {
    this.$refs.slider.style.width = this.clientWidth;
}

// [设置]:自动播放
export function autoShow() {
    let auto = this.auto;

    // 获得间隔时间. 如有错误, 默认值为 2000 ms
    let interval = parseInt(this.interval) * 1000 || 2000;

    if (auto) {
        this.autoShowTimer = setInterval(() => {
            this.changeSlice(1);
        }, interval);
    }
}

// [事件处理]:切换当前轮播图
export function changeSlice(direction) {
    // 获得轮播图组的 'right' 样式属性值, 并转换成 Number 类型
    let sliceGroupRight = this.$refs.sliceGroup.style.right ?
        parseInt(this.$refs.sliceGroup.style.right) :
        0;

    let clientWidth = this.clientWidth;

    // 轮播图组的宽度
    let sliceGroupWidth = this.data.length * clientWidth;

    if (direction === -1) {
        sliceGroupRight -= clientWidth;
    } else if (direction === 1) {
        sliceGroupRight += clientWidth;
    }

    // 第一张向前跳到最后一张
    if (sliceGroupRight <= 0) {
        sliceGroupRight = sliceGroupWidth - clientWidth;
        // 最后一张向后跳到第一张
    } else if (sliceGroupRight >= sliceGroupWidth) {
        sliceGroupRight = 0;
    }

    // 设置轮播图组的 'right' 样式属性
    this.$refs.sliceGroup.style.right = sliceGroupRight + "px";
}