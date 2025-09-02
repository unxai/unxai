/**
 * UNXAI - 科技感网站交互效果
 * 包含粒子系统、神经网络、数据流、数字雨等效果
 */

// 自定义光标
const cursor = document.querySelector('.custom-cursor');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

document.addEventListener('mousedown', () => {
    cursor.classList.add('active');
});

document.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
});

function updateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(updateCursor);
}
updateCursor();

// 增强的粒子系统
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() < 0.7 ? 'small' : (Math.random() < 0.9 ? 'medium' : 'large');
        particle.className = `particle ${size}`;
        
        // 随机位置和动画延迟
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 12 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
        
        // 随机颜色
        const colors = ['#00d4ff', '#0099cc', '#ffffff', '#66ccff', '#ff0096', '#00ff7f'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;
        particle.style.color = color;
        
        particlesContainer.appendChild(particle);
    }
}

// 增强的神经网络
function createNeuralNetwork() {
    const networkContainer = document.getElementById('neuralNetwork');
    const nodeCount = 15;
    const lineCount = 25;
    const nodes = [];

    // 创建节点
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.className = 'neural-node';
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        node.style.left = x + '%';
        node.style.top = y + '%';
        node.style.animationDelay = Math.random() * 3 + 's';
        
        nodes.push({ element: node, x, y });
        networkContainer.appendChild(node);
    }

    // 创建连线
    for (let i = 0; i < lineCount; i++) {
        const line = document.createElement('div');
        line.className = `neural-line ${Math.random() > 0.8 ? 'active' : ''}`;
        
        const startNode = nodes[Math.floor(Math.random() * nodes.length)];
        const endNode = nodes[Math.floor(Math.random() * nodes.length)];
        
        const deltaX = endNode.x - startNode.x;
        const deltaY = endNode.y - startNode.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
        
        line.style.left = startNode.x + '%';
        line.style.top = startNode.y + '%';
        line.style.width = distance + 'vw';
        line.style.transform = `rotate(${angle}deg)`;
        line.style.transformOrigin = '0 50%';
        line.style.animationDelay = Math.random() * 6 + 's';
        
        networkContainer.appendChild(line);
    }
}

// 数据流效果
function createDataStream() {
    const streamContainer = document.getElementById('dataStream');
    const streamTexts = [
        '01001000 01100101 01101100 01101100 01101111',
        'AI.neural_network.process()',
        'undefined !== null ? true : false',
        'import { future } from "tomorrow";',
        'const dreams = await reality.load();',
        'while(learning) { evolve(); }',
        'if (consciousness) { think(); }'
    ];

    function addStream() {
        const stream = document.createElement('div');
        stream.className = 'stream-line';
        stream.textContent = streamTexts[Math.floor(Math.random() * streamTexts.length)];
        
        stream.style.left = Math.random() * 100 + '%';
        stream.style.animationDelay = '0s';
        stream.style.animationDuration = (Math.random() * 5 + 10) + 's';
        
        streamContainer.appendChild(stream);
        
        setTimeout(() => {
            stream.remove();
        }, 15000);
    }

    setInterval(addStream, 2000);
}

// 数字雨效果
function createDigitalRain() {
    const rainContainer = document.getElementById('digitalRain');
    const characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ未知无限AI科技未来智能';
    const columns = Math.floor(window.innerWidth / 20);

    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.className = 'rain-column';
        
        let text = '';
        for (let j = 0; j < 20; j++) {
            text += characters[Math.floor(Math.random() * characters.length)] + '\n';
        }
        column.textContent = text;
        
        column.style.left = (i * 20) + 'px';
        column.style.animationDelay = Math.random() * 8 + 's';
        column.style.animationDuration = (Math.random() * 3 + 5) + 's';
        
        // 随机颜色变化
        const colors = ['#00d4ff', '#00ff7f', '#ff0096', '#ffffff'];
        column.style.color = colors[Math.floor(Math.random() * colors.length)];
        
        rainContainer.appendChild(column);
    }
    
    // 定期更新字符
    setInterval(() => {
        const columns = document.querySelectorAll('.rain-column');
        columns.forEach(column => {
            if (Math.random() < 0.1) {
                let newText = '';
                for (let j = 0; j < 20; j++) {
                    newText += characters[Math.floor(Math.random() * characters.length)] + '\n';
                }
                column.textContent = newText;
            }
        });
    }, 500);
}

// 增强鼠标交互效果
let mouseInfluence = { x: 0, y: 0 };

document.addEventListener('mousemove', function(e) {
    const particles = document.querySelectorAll('.particle');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    mouseInfluence.x = (mouseX - 0.5) * 2;
    mouseInfluence.y = (mouseY - 0.5) * 2;
    
    particles.forEach((particle, index) => {
        if (particle.classList.contains('small')) return;
        
        const speed = (index % 3 + 1) * 0.8;
        const x = mouseInfluence.x * speed * 20;
        const y = mouseInfluence.y * speed * 20;
        
        particle.style.transform = `translate(${x}px, ${y}px) scale(${1 + Math.abs(mouseInfluence.x) * 0.3})`;
    });

    // 动态改变背景渐变
    const background = document.querySelector('.background');
    const intensity = Math.sqrt(mouseInfluence.x * mouseInfluence.x + mouseInfluence.y * mouseInfluence.y);
    background.style.filter = `hue-rotate(${intensity * 30}deg) brightness(${1 + intensity * 0.2})`;
    
    // 能量波纹交互效果
    const waves = document.querySelectorAll('.wave');
    waves.forEach((wave, index) => {
        const delay = index * 0.5;
        const scale = 1 + intensity * 0.3;
        wave.style.transform = `scale(${scale})`;
        wave.style.opacity = 0.1 + intensity * 0.2;
    });
});

// 鼠标点击爆炸效果
document.addEventListener('click', function(e) {
    createClickExplosion(e.clientX, e.clientY);
});

function createClickExplosion(x, y) {
    const explosion = document.createElement('div');
    explosion.style.position = 'fixed';
    explosion.style.left = x + 'px';
    explosion.style.top = y + 'px';
    explosion.style.width = '4px';
    explosion.style.height = '4px';
    explosion.style.background = 'radial-gradient(circle, #00d4ff, transparent)';
    explosion.style.borderRadius = '50%';
    explosion.style.pointerEvents = 'none';
    explosion.style.zIndex = '1000';
    explosion.style.animation = 'clickExplosion 0.6s ease-out forwards';
    
    document.body.appendChild(explosion);
    
    setTimeout(() => {
        explosion.remove();
    }, 600);
}

// 添加点击爆炸动画CSS
const style = document.createElement('style');
style.textContent = `
@keyframes clickExplosion {
    0% {
        transform: scale(1);
        opacity: 1;
    }
    100% {
        transform: scale(20);
        opacity: 0;
    }
}
`;
document.head.appendChild(style);

// 打字机效果
function typewriterEffect(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    element.style.opacity = '1';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// 初始化所有效果
document.addEventListener('DOMContentLoaded', function() {
    // 设置动态年份
    updateCurrentYear();
    
    createParticles();
    createNeuralNetwork();
    createDataStream();
    createDigitalRain();
    
    // 打字机效果应用于主标题
    setTimeout(() => {
        const title = document.querySelector('.hero h1');
        const subtitle = document.querySelector('.hero p');
        const englishSub = document.querySelector('.subtitle');
        
        typewriterEffect(title, 'UNXAI', 200);
        setTimeout(() => typewriterEffect(subtitle, '未知无限 · 探索AI', 80), 1000);
        setTimeout(() => typewriterEffect(englishSub, 'UNKNOWN UNLIMITED · EXPLORING ARTIFICIAL INTELLIGENCE', 50), 2000);
    }, 500);
});

// 动态更新年份
function updateCurrentYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
}

// 视差滚动和3D效果
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;
    const rotateX = scrolled * 0.05;
    
    document.querySelector('.background').style.transform = 
        `translateY(${rate}px) rotateX(${rotateX}deg)`;
    
    document.querySelector('.hero').style.transform = 
        `translateZ(${-scrolled * 0.5}px) rotateX(${rotateX * 0.5}deg)`;
});

// 音频可视化模拟效果
function simulateAudioVisualization() {
    const particles = document.querySelectorAll('.particle.medium, .particle.large');
    
    setInterval(() => {
        particles.forEach((particle, index) => {
            const scale = 0.8 + Math.random() * 0.6;
            const rotation = Math.random() * 360;
            particle.style.transform += ` scale(${scale}) rotate(${rotation}deg)`;
        });
    }, 200);
}

// 启动音频效果
setTimeout(simulateAudioVisualization, 3000);

// 键盘交互效果
document.addEventListener('keydown', function(e) {
    // 按下空格键触发特效
    if (e.code === 'Space') {
        e.preventDefault();
        triggerEnergyBurst();
    }
    
    // 按下ESC交换主题
    if (e.code === 'Escape') {
        toggleTheme();
    }
});

function triggerEnergyBurst() {
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        particle.style.animation = 'none';
        particle.offsetHeight; // 触发重绘
        particle.style.animation = null;
    });
    
    // 能量波纹爆发
    const waves = document.querySelectorAll('.wave');
    waves.forEach((wave, index) => {
        setTimeout(() => {
            wave.style.animation = 'none';
            wave.offsetHeight;
            wave.style.animation = null;
        }, index * 100);
    });
}

let currentTheme = 0;
const themes = [
    { primary: '#00d4ff', secondary: '#ff0096', accent: '#00ff7f' },
    { primary: '#ff0096', secondary: '#00ff7f', accent: '#00d4ff' },
    { primary: '#00ff7f', secondary: '#00d4ff', accent: '#ff0096' }
];

function toggleTheme() {
    currentTheme = (currentTheme + 1) % themes.length;
    const theme = themes[currentTheme];
    
    document.documentElement.style.setProperty('--primary-color', theme.primary);
    document.documentElement.style.setProperty('--secondary-color', theme.secondary);
    document.documentElement.style.setProperty('--accent-color', theme.accent);
}