<template>
  <div class="chart-container">
    <div class="chart-box">
      <div class="chart-content">
        <div class="bar-group">
          <div class="bar bar1"></div>
          <div class="bar bar2"></div>
          <div class="bar bar3"></div>
        </div>
      </div>
      <div class="pattern-overlay"></div>
    </div>
    <div class="floating-square square1"></div>
    <div class="floating-square square2"></div>
    <div class="floating-circle circle1"></div>
    <div class="floating-circle circle2"></div>
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  width: 200px;
  height: 200px;
  perspective: 1000px;
}

.chart-box {
  position: absolute;
  width: 140px;
  height: 140px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  transform-style: preserve-3d;
  background: linear-gradient(135deg, #60A5FA, #2563EB);
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(37, 99, 235, 0.2);
  overflow: hidden;
}

.pattern-overlay {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent);
  background-size: 20px 20px;
  opacity: 0.3;
  animation: movePattern 20s linear infinite;
}

.floating-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(96, 165, 250, 0.1);
}

.circle1 {
  width: 60px;
  height: 60px;
  top: -20px;
  left: -20px;
  animation: float 4s ease-in-out infinite;
}

.circle2 {
  width: 40px;
  height: 40px;
  bottom: -10px;
  right: -10px;
  animation: float 4s ease-in-out infinite 1s;
}

@keyframes movePattern {
  from { background-position: 0 0; }
  to { background-position: 40px 40px; }
}

.chart-content {
  position: absolute;
  inset: 0;
  transform: rotate(-45deg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.bar-group {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  height: 80px;
}

.bar {
  width: 12px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px 4px 0 0;
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.3);
}

.bar1 { height: 40px; }
.bar2 { height: 55px; }
.bar3 { height: 70px; }

.floating-square {
  position: absolute;
  background: rgba(96, 165, 250, 0.2);
  border-radius: 8px;
  animation: float 3s ease-in-out infinite;
}

.square1 {
  width: 32px;
  height: 32px;
  top: 0;
  right: 20px;
  transform: rotate(45deg);
  animation-delay: 0s;
}

.square2 {
  width: 24px;
  height: 24px;
  bottom: 20px;
  left: 20px;
  transform: rotate(-12deg);
  animation-delay: 1.5s;
}

@keyframes float {
  0% { transform: translateY(0) rotate(45deg); }
  50% { transform: translateY(-15px) rotate(50deg); }
  100% { transform: translateY(0) rotate(45deg); }
}

.chart-box {
  animation: pulse 4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: translate(-50%, -50%) rotate(45deg) scale(1); }
  50% { transform: translate(-50%, -50%) rotate(45deg) scale(1.05); }
}
</style>
