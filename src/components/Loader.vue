<template>
  <div class="wrapper">
    <div class="loader">
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$size: 80px;
$color: #337ab7;

.wrapper {
  position: absolute;
  z-index: 10;
  top: 200px;
  left: 50%;
  width: $size;
  height: $size;
  margin: 0;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%)
}

.loader {
  display: block;
  position: relative;
  width: $size;
  height: $size;

  div {
    position: absolute;
    border: 4px solid $color;
    opacity: 1;
    border-radius: 50%;
    animation: ripple .9s cubic-bezier(0, 0.2, 0.8, 1) infinite;

    &:nth-child(2) {
        animation-delay: -0.5s;
    }
  }
}

$range: $size * 0.45;
@keyframes ripple {
  from {
    top: $range;
    left: $range;
    width: 0;
    height: 0;
    opacity: 1;
  }
  to {
    top: 0px;
    left: 0px;
    width: $range * 2;
    height: $range * 2;
    opacity: 0;
  }
}
</style>
