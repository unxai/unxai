// UNXAI 组织展示页 JavaScript 功能实现

document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有系统
    initCursor();
    initBackground();
    initParticles();
    initNeuralNetwork();
    initDataStream();
    initDigitalRain();
    initKeyboardControls();
    initClickEffects();
    initTypingEffect();
    initLogoInteraction();
    updateCurrentYear();
    
    console.log('UNXAI 系统已初始化完成');
});

// === 自定义光标系统 ===
function initCursor() {
    const cursor = document.querySelector('.custom-cursor');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // 鼠标悬停效果
    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
    });
}

// === 动态背景响应 ===
function initBackground() {
    const background = document.querySelector('.background');
    
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        const intensity = Math.sqrt(Math.pow(mouseX - 0.5, 2) + Math.pow(mouseY - 0.5, 2)) * 2;
        
        background.style.filter = `hue-rotate(${intensity * 30}deg) brightness(${1 + intensity * 0.2})`;
    });
}

// === 粒子系统 ===
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30; // 进一步减少数量以提升性能和简洁性
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // 随机位置和属性
        const startX = Math.random() * window.innerWidth;
        const size = Math.random() * 2 + 1;
        const color = `hsl(${180 + Math.random() * 40}, 100%, 60%)`; // 减少颜色范围
        const delay = Math.random() * 20;
        
        particle.style.left = startX + 'px';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = color;
        particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
        particle.style.animationDelay = delay + 's';
        
        particlesContainer.appendChild(particle);
        
        // 粒子生命周期管理
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 20000);
    }
    
    // 初始创建粒子
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => createParticle(), i * 300);
    }
    
    // 持续生成新粒子
    setInterval(createParticle, 1200);
}

// === 神经网络系统 ===
function initNeuralNetwork() {
    const networkContainer = document.getElementById('neuralNetwork');
    const nodeCount = 8; // 减少节点数量
    const lineCount = 12; // 减少连线数量
    const nodes = [];
    
    // 创建节点
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.className = 'neural-node';
        
        const x = Math.random() * (window.innerWidth - 200) + 100;
        const y = Math.random() * (window.innerHeight - 200) + 100;
        
        node.style.left = x + 'px';
        node.style.top = y + 'px';
        node.style.animationDelay = Math.random() * 4 + 's';
        
        networkContainer.appendChild(node);
        nodes.push({ element: node, x: x, y: y });
    }
    
    // 创建连线
    for (let i = 0; i < lineCount; i++) {
        const line = document.createElement('div');
        line.className = 'neural-line';
        
        const node1 = nodes[Math.floor(Math.random() * nodes.length)];
        const node2 = nodes[Math.floor(Math.random() * nodes.length)];
        
        if (node1 !== node2) {
            const dx = node2.x - node1.x;
            const dy = node2.y - node1.y;
            const length = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;
            
            line.style.left = node1.x + 'px';
            line.style.top = node1.y + 'px';
            line.style.width = length + 'px';
            line.style.transform = `rotate(${angle}deg)`;
            line.style.animationDelay = Math.random() * 6 + 's';
            
            // 随机激活状态
            if (Math.random() < 0.2) { // 减少激活线条数量
                line.classList.add('active');
            }
            
            networkContainer.appendChild(line);
        }
    }
}

// === 数据流系统 ===
function initDataStream() {
    const streamContainer = document.getElementById('dataStream');
    const dataTexts = [
        'NEURAL_LINK_ACTIVE', 'DATA_PROCESSING', 'AI_CORE_ONLINE', 
        'QUANTUM_SYNC', 'MATRIX_LOADED', 'ALGORITHM_RUNNING',
        'DEEP_LEARNING', 'PATTERN_MATCH', 'NODE_CONNECTION',
        'UNXAI_PROTOCOL', 'SYSTEM_READY', 'INFINITE_LOOP'
    ];
    
    function createDataFlow() {
        const flow = document.createElement('div');
        flow.className = 'data-flow';
        
        const text = dataTexts[Math.floor(Math.random() * dataTexts.length)];
        const y = Math.random() * window.innerHeight;
        const speed = 15 + Math.random() * 10;
        
        flow.textContent = '> ' + text + ' <';
        flow.style.top = y + 'px';
        flow.style.left = '-100px';
        flow.style.animationDuration = speed + 's';
        
        streamContainer.appendChild(flow);
        
        setTimeout(() => {
            if (flow.parentNode) {
                flow.parentNode.removeChild(flow);
            }
        }, speed * 1000);
    }
    
    // 初始创建和持续生成
    for (let i = 0; i < 4; i++) {
        setTimeout(() => createDataFlow(), i * 5000);
    }
    
    setInterval(() => {
        if (Math.random() < 0.008) { // 降低生成概率
            createDataFlow();
        }
    }, 100);
}

// === 数字雨系统 ===
function initDigitalRain() {
    const rainContainer = document.getElementById('digitalRain');
    const chars = '01010101ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    
    function createRainColumn() {
        const column = document.createElement('div');
        column.className = 'rain-column';
        
        const x = Math.random() * window.innerWidth;
        const length = 8 + Math.random() * 5; // 缩短长度
        const speed = 8 + Math.random() * 4; // 减缓速度
        const offset = Math.random() * 40; // 添加随机偏移
        
        let text = '';
        for (let i = 0; i < length; i++) {
            text += chars[Math.floor(Math.random() * chars.length)] + '<br>';
        }
        
        column.innerHTML = text;
        column.style.left = (x + offset) + 'px';
        column.style.top = '-200px';
        column.style.animationDuration = speed + 's';
        column.style.animationDelay = Math.random() * 2 + 's';
        
        rainContainer.appendChild(column);
        
        setTimeout(() => {
            if (column.parentNode) {
                column.parentNode.removeChild(column);
            }
        }, (speed + 2) * 1000);
    }
    
    // 降低密度 - 增加列间距
    const columnCount = Math.floor(window.innerWidth / 80);
    for (let i = 0; i < columnCount; i++) {
        setTimeout(() => createRainColumn(), i * 1000);
    }
    
    setInterval(createRainColumn, 3000);
}

// === 键盘控制系统 ===
function initKeyboardControls() {
    document.addEventListener('keydown', function(e) {
        switch(e.key.toLowerCase()) {
            case 'f':
                toggleFullscreen();
                break;
            case 'g':
                triggerGlitchEffect();
                break;
            case ' ':
                e.preventDefault();
                triggerEnergyBurst(window.innerWidth / 2, window.innerHeight / 2);
                break;
            case 'escape':
                toggleTheme();
                break;
        }
    });
}

// === 全屏控制 ===
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log('无法进入全屏模式:', err);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// === 故障效果 ===
function triggerGlitchEffect() {
    const hero = document.querySelector('.hero');
    hero.classList.add('glitch-active');
    
    setTimeout(() => {
        hero.classList.remove('glitch-active');
    }, 300);
}

// === 主题切换 ===
function toggleTheme() {
    const body = document.body;
    const currentFilter = body.style.filter;
    
    if (currentFilter.includes('hue-rotate')) {
        body.style.filter = '';
    } else {
        body.style.filter = 'hue-rotate(120deg)';
    }
}

// === 点击爆炸效果 ===
function initClickEffects() {
    document.addEventListener('click', function(e) {
        triggerEnergyBurst(e.clientX, e.clientY);
    });
}

function triggerEnergyBurst(x, y) {
    const burst = document.createElement('div');
    burst.className = 'energy-burst';
    burst.style.left = x + 'px';
    burst.style.top = y + 'px';
    
    document.body.appendChild(burst);
    
    // 创建能量粒子
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'energy-particle';
        
        const angle = (i / 12) * Math.PI * 2;
        const distance = 50 + Math.random() * 50;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;
        
        particle.style.setProperty('--dx', dx + 'px');
        particle.style.setProperty('--dy', dy + 'px');
        
        burst.appendChild(particle);
    }
    
    setTimeout(() => {
        if (burst.parentNode) {
            burst.parentNode.removeChild(burst);
        }
    }, 800);
}

// === Logo交互效果 ===
function initLogoInteraction() {
    const logoIcon = document.querySelector('.logo-icon');
    const logoImg = document.querySelector('.logo-icon img');
    
    if (logoIcon && logoImg) {
        logoIcon.addEventListener('mouseenter', function() {
            // 鼠标悬停时增强球体和logo效果
            logoIcon.style.transform = 'scale(1.1)';
            logoIcon.style.filter = `
                drop-shadow(0 0 40px rgba(0, 212, 255, 1))
                drop-shadow(0 0 80px rgba(0, 212, 255, 0.6))
                brightness(1.2)
            `;
            logoImg.style.filter = `
                drop-shadow(0 0 20px rgba(255, 255, 255, 0.8))
                brightness(1.3)
            `;
        });
        
        logoIcon.addEventListener('mouseleave', function() {
            logoIcon.style.transform = 'scale(1)';
            logoIcon.style.filter = 'none';
            logoImg.style.filter = 'none';
        });
        
        logoIcon.addEventListener('click', function() {
            triggerEnergyBurst(window.innerWidth / 2, 140);
            // 点击时的特殊效果 - 球体和logo闪烁
            logoIcon.style.transform = 'scale(1.3)';
            logoIcon.style.filter = `
                drop-shadow(0 0 60px rgba(255, 255, 255, 1))
                drop-shadow(0 0 120px rgba(0, 212, 255, 0.8))
                brightness(2)
            `;
            logoImg.style.filter = `
                drop-shadow(0 0 30px rgba(255, 255, 255, 1))
                brightness(2)
            `;
            
            setTimeout(() => {
                logoIcon.style.transform = 'scale(1)';
                logoIcon.style.filter = 'none';
                logoImg.style.filter = 'none';
            }, 300);
        });
        
        // 添加球体旋转交互
        let rotationX = 0;
        let rotationY = 0;
        
        logoIcon.addEventListener('mousemove', function(e) {
            const rect = logoIcon.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - centerX) / rect.width;
            const deltaY = (e.clientY - centerY) / rect.height;
            
            rotationY = deltaX * 20; // 水平旋转
            rotationX = -deltaY * 20; // 垂直旋转
            
            logoIcon.style.transform = `scale(1.05) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
        });
    }
}

// === 打字机效果 ===
function initTypingEffect() {
    const elements = document.querySelectorAll('.typing-enhanced');
    
    elements.forEach((element, index) => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '3px solid #00d4ff';
        
        let i = 0;
        const delay = index * 2000; // 每个元素延迟
        
        setTimeout(() => {
            const timer = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                    // 完成后移除光标
                    setTimeout(() => {
                        element.style.borderRight = 'none';
                    }, 1000);
                }
            }, 100);
        }, delay);
    });
}

// === 更新年份 ===
function updateCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// === 性能优化 ===
let animationId;
let lastTime = 0;

function optimizedAnimation(currentTime) {
    if (currentTime - lastTime >= 16) { // 限制到60fps
        // 这里可以添加需要优化的动画逻辑
        lastTime = currentTime;
    }
    animationId = requestAnimationFrame(optimizedAnimation);
}

// 启动优化动画循环
requestAnimationFrame(optimizedAnimation);

// === 窗口大小变化处理 ===
window.addEventListener('resize', function() {
    // 重新计算一些元素的位置
    const particles = document.querySelectorAll('.particle');
    const nodes = document.querySelectorAll('.neural-node');
    
    // 清理超出屏幕的元素
    particles.forEach(particle => {
        const rect = particle.getBoundingClientRect();
        if (rect.left > window.innerWidth || rect.top > window.innerHeight) {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }
    });
});

// === 页面可见性变化处理 ===
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 页面隐藏时暂停一些动画以节省性能
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    } else {
        // 页面显示时恢复动画
        requestAnimationFrame(optimizedAnimation);
    }
});

// === 导出一些全局函数供调试使用 ===
window.UNXAI = {
    triggerGlitchEffect,
    triggerEnergyBurst,
    toggleTheme,
    toggleFullscreen
};

console.log('🚀 UNXAI 科技展示系统已启动');
console.log('💡 快捷键提示:');
console.log('   F - 全屏模式');
console.log('   G - 故障效果');
console.log('   空格 - 能量爆发');
console.log('   ESC - 主题切换');