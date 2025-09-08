// UNXAI 现代化展示页 - 极简科技美学
// 基于 Three.js + GSAP 的创新交互体验
// 优化性能、增强交互、完善体验

class UNXAIExperience {
    constructor() {
        // 核心系统属性
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        
        // 交互状态
        this.mouse = { x: 0, y: 0 };
        this.isInitialized = false;
        this.currentTheme = 'default';
        this.helpVisible = false;
        
        // 性能自适应系统
        this.isMobile = this.detectMobile();
        this.particleCount = this.isMobile ? 300 : 800;
        this.performanceLevel = this.detectPerformance();
        
        // 新增创意交互属性
        this.audioContext = null;
        this.analyser = null;
        this.mouseTrail = [];
        this.gestureBuffer = [];
        this.lastMouseTime = 0;
        this.energyLevel = 0;
        this.isTimeWarpActive = false;
        this.scanLines = [];
        this.particleConnections = [];
        this.virtualKeyboard = null;
        this.voiceAmplitude = 0;
        this.mouseVelocity = { x: 0, y: 0 };
        this.lastMousePos = { x: 0, y: 0 };
        this.gestureRecognitionEnabled = true;
        
        // 初始化系统
        this.init();
    }
    
    // 设备检测与性能优化
    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
               window.innerWidth < 768;
    }
    
    detectPerformance() {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (!gl) return 'low';
        
        const renderer = gl.getParameter(gl.RENDERER);
        
        if (renderer.includes('Intel') || renderer.includes('Microsoft')) {
            return 'medium';
        }
        
        return navigator.hardwareConcurrency > 4 ? 'high' : 'medium';
    }
    
    async init() {
        try {
            console.log('🚀 UNXAI Experience 初始化...');
            
            // 等待DOM加载
            await this.waitForDOM();
            
            // 初始化各系统
            await this.initSystems();
            
            this.isInitialized = true;
            console.log('✅ UNXAI Experience 初始化完成');
            
            // 触发初始化完成事件
            this.dispatchCustomEvent('unxai:initialized');
            
        } catch (error) {
            console.error('❌ UNXAI 初始化失败:', error);
            this.handleError(error);
        }
    }
    
    // 等待DOM加载完成
    waitForDOM() {
        return new Promise(resolve => {
            if (document.readyState === 'complete') {
                resolve();
            } else {
                window.addEventListener('load', resolve, { once: true });
            }
        });
    }
    
    // 初始化所有系统
    async initSystems() {
        const systems = [
            () => this.initThreeJS(),
            () => this.initAnimations(),
            () => this.initInteractions(),
            () => this.initKeyboardControls(),
            () => this.initHelpSystem(),
            () => this.initCreativeInteractions(), // 新增创意交互
            () => this.startRenderLoop()
        ];
        
        for (const system of systems) {
            try {
                await system();
                await this.delay(50); // 稍微延迟以避免阻塞
            } catch (error) {
                console.warn('系统初始化警告:', error);
            }
        }
    }
    
    // 工具方法
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    dispatchCustomEvent(eventName, detail = {}) {
        const event = new CustomEvent(eventName, { detail });
        document.dispatchEvent(event);
    }
    
    handleError(error) {
        // 简单的错误处理，可以扩展为更复杂的错误报告系统
        console.error('UNXAI 系统错误:', error);
        
        // 在生产环境中，可以发送错误到监控系统
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                description: error.message,
                fatal: false
            });
        }
    }
    
    // === Three.js 3D 系统 ===
    initThreeJS() {
        console.log('🎬 初始化 3D 环境...');
        
        const container = document.getElementById('threejs-container');
        
        // 创建场景
        this.scene = new THREE.Scene();
        
        // 创建相机
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 50;
        
        // 创建渲染器
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x000000, 0);
        
        container.appendChild(this.renderer.domElement);
        
        // 创建粒子系统
        this.createParticleField();
        
        // 响应式处理
        window.addEventListener('resize', () => this.handleResize());
        
        // 鼠标跟踪用于3D交互
        document.addEventListener('mousemove', (e) => {
            const prevMouse = { x: this.mouse.x, y: this.mouse.y };
            this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
            
            // 计算鼠标速度
            this.mouseVelocity.x = this.mouse.x - prevMouse.x;
            this.mouseVelocity.y = this.mouse.y - prevMouse.y;
            
            // 记录鼠标轨迹
            this.recordMouseTrail(e.clientX, e.clientY);
            
            // 更新能量等级
            const velocity = Math.sqrt(this.mouseVelocity.x ** 2 + this.mouseVelocity.y ** 2);
            this.energyLevel = Math.min(this.energyLevel + velocity * 0.5, 1);
        });
        
        console.log('✅ 3D 环境初始化完成');
    }
    
    // 创建极简粒子场
    createParticleField() {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.particleCount * 3);
        const colors = new Float32Array(this.particleCount * 3);
        const sizes = new Float32Array(this.particleCount);
        
        // 红色系配色方案
        const colorPalette = [
            new THREE.Color(0xff6b6b), // 主要红色
            new THREE.Color(0xff8e8e), // 浅红色
            new THREE.Color(0xffaaaa), // 更浅红色
            new THREE.Color(0xffffff)  // 白色
        ];
        
        for (let i = 0; i < this.particleCount; i++) {
            // 更优雅的分布
            positions[i * 3] = (Math.random() - 0.5) * 200;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
            
            // 精选配色
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
            
            // 更精细的尺寸控制
            sizes[i] = Math.random() * 2 + 0.5;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        // 现代化着色器
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                mouse: { value: new THREE.Vector2() },
                resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
            },
            vertexShader: `
                attribute float size;
                varying vec3 vColor;
                varying float vSize;
                uniform float time;
                uniform vec2 mouse;
                
                void main() {
                    vColor = color;
                    vSize = size;
                    
                    vec3 pos = position;
                    
                    // 优雅的波动效果
                    pos.x += sin(time * 0.001 + pos.y * 0.01) * 5.0;
                    pos.y += cos(time * 0.001 + pos.x * 0.01) * 5.0;
                    pos.z += sin(time * 0.002) * 2.0;
                    
                    // 鼠标交互
                    float mouseInfluence = 1.0 - distance(mouse, vec2(pos.x, pos.y) / 100.0) * 0.5;
                    pos.z += mouseInfluence * 10.0;
                    
                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                    gl_Position = projectionMatrix * mvPosition;
                    gl_PointSize = vSize * (50.0 / -mvPosition.z);
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                varying float vSize;
                
                void main() {
                    float r = distance(gl_PointCoord, vec2(0.5, 0.5));
                    if (r > 0.5) discard;
                    
                    float alpha = 1.0 - smoothstep(0.0, 0.5, r);
                    alpha *= 0.6; // 降低整体透明度
                    
                    gl_FragColor = vec4(vColor, alpha);
                }
            `,
            transparent: true,
            vertexColors: true,
            blending: THREE.AdditiveBlending
        });
        
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }
    
    // === GSAP 动画系统 ===
    initAnimations() {
        console.log('✨ 初始化动画系统...');
        
        // 页面加载动画序列
        const tl = gsap.timeline();
        
        // 优雅的入场动画
        tl.from('#main-title', {
            y: 100,
            opacity: 0,
            scale: 0.9,
            duration: 1.5,
            ease: "power3.out"
        })
        .from('#subtitle', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        }, "-=1")
        .from('#subtitle-en', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.8")
        .from('[class*="bg-white/5"]', {
            y: 60,
            opacity: 0,
            scale: 0.95,
            duration: 1.2,
            ease: "power2.out"
        }, "-=0.6");
        
        // 连续动画效果
        this.setupContinuousAnimations();
        
        console.log('✅ 动画系统初始化完成');
    }
    
    setupContinuousAnimations() {
        // Logo 悬浮动画
        gsap.to('.logo-container', {
            y: 5,
            duration: 3,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1
        });
        
        // 主标题呼吸效果
        gsap.to('#main-title', {
            scale: 1.02,
            duration: 4,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1
        });
        
        // 微妙的背景动画
        if (this.particles) {
            gsap.to(this.particles.rotation, {
                y: Math.PI * 2,
                duration: 120,
                ease: "none",
                repeat: -1
            });
        }
    }
    
    // === 创意交互系统 ===
    initCreativeInteractions() {
        console.log('🎆 初始化创意交互系统...');
        
        // 初始化各种创意交互模块
        this.initAudioVisualization();
        this.initGestureRecognition();
        this.initSmartParticleSystem();
        this.initScanLineEffect();
        this.initEnergyConnections();
        this.initTimeWarpEffect();
        this.initVirtualKeyboard();
        this.initVoiceInteraction();
        
        console.log('✅ 创意交互系统初始化完成');
    }
    
    // 音频可视化初始化
    async initAudioVisualization() {
        try {
            // 创建虚拟音频上下文（不需要真实音频输入）
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 256;
            
            // 创建虚拟音频数据
            this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
            
            // 模拟音频数据更新
            this.startAudioSimulation();
            
        } catch (error) {
            console.warn('音频初始化警告:', error);
        }
    }
    
    // 模拟音频数据
    startAudioSimulation() {
        const updateAudioData = () => {
            // 根据鼠标移动和能量等级模拟音频
            const baseLevel = this.energyLevel * 100;
            const velocity = Math.sqrt(this.mouseVelocity.x ** 2 + this.mouseVelocity.y ** 2);
            
            for (let i = 0; i < this.frequencyData.length; i++) {
                const frequency = (i / this.frequencyData.length) * 100;
                const noise = Math.random() * 20;
                const mouseInfluence = velocity * 50 * Math.sin(Date.now() * 0.01 + i * 0.1);
                
                this.frequencyData[i] = Math.max(0, Math.min(255, 
                    baseLevel + noise + mouseInfluence + Math.sin(Date.now() * 0.005 + i) * 10
                ));
            }
            
            // 计算平均音量
            const average = this.frequencyData.reduce((a, b) => a + b, 0) / this.frequencyData.length;
            this.voiceAmplitude = average / 255;
            
            requestAnimationFrame(updateAudioData);
        };
        updateAudioData();
    }
    
    // 手势识别初始化
    initGestureRecognition() {
        this.gesturePatterns = {
            circle: {
                name: '圈形',
                action: () => this.triggerCircleGesture(),
                pattern: this.detectCirclePattern.bind(this)
            },
            lightning: {
                name: '闪电',
                action: () => this.triggerLightningGesture(),
                pattern: this.detectLightningPattern.bind(this)
            },
            wave: {
                name: '波浪',
                action: () => this.triggerWaveGesture(),
                pattern: this.detectWavePattern.bind(this)
            }
        };
        
        // 手势识别定时器
        setInterval(() => {
            if (this.gestureRecognitionEnabled) {
                this.analyzeGestures();
            }
        }, 500);
    }
    
    // 记录鼠标轨迹
    recordMouseTrail(x, y) {
        const now = Date.now();
        this.mouseTrail.push({ x, y, time: now });
        
        // 只保留最近5秒的轨迹
        this.mouseTrail = this.mouseTrail.filter(point => now - point.time < 5000);
        
        // 记录手势缓冲
        if (this.gestureRecognitionEnabled) {
            this.gestureBuffer.push({ x, y, time: now });
            if (this.gestureBuffer.length > 20) {
                this.gestureBuffer.shift();
            }
        }
    }
    
    // 手势分析
    analyzeGestures() {
        if (this.gestureBuffer.length < 5) return;
        
        for (const [key, gesture] of Object.entries(this.gesturePatterns)) {
            if (gesture.pattern(this.gestureBuffer)) {
                gesture.action();
                this.gestureBuffer = []; // 清空缓冲
                this.showTemporaryMessage(`手势识别: ${gesture.name}`, 1500);
                break;
            }
        }
    }
    
    // 圈形手势检测
    detectCirclePattern(buffer) {
        if (buffer.length < 8) return false;
        
        const centerX = buffer.reduce((sum, p) => sum + p.x, 0) / buffer.length;
        const centerY = buffer.reduce((sum, p) => sum + p.y, 0) / buffer.length;
        
        let angleSum = 0;
        for (let i = 1; i < buffer.length; i++) {
            const angle1 = Math.atan2(buffer[i-1].y - centerY, buffer[i-1].x - centerX);
            const angle2 = Math.atan2(buffer[i].y - centerY, buffer[i].x - centerX);
            let angleDiff = angle2 - angle1;
            
            if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
            if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
            
            angleSum += angleDiff;
        }
        
        return Math.abs(angleSum) > Math.PI * 1.5; // 至少转了270度
    }
    
    // 闪电手势检测（之字形）
    detectLightningPattern(buffer) {
        if (buffer.length < 6) return false;
        
        let directionChanges = 0;
        let lastDirection = null;
        
        for (let i = 1; i < buffer.length; i++) {
            const deltaX = buffer[i].x - buffer[i-1].x;
            const deltaY = buffer[i].y - buffer[i-1].y;
            const currentDirection = Math.sign(deltaX) + Math.sign(deltaY) * 2;
            
            if (lastDirection !== null && currentDirection !== lastDirection) {
                directionChanges++;
            }
            lastDirection = currentDirection;
        }
        
        return directionChanges >= 3; // 至少匃3次方向变化
    }
    
    // 波浪手势检测（水平波浪形）
    detectWavePattern(buffer) {
        if (buffer.length < 8) return false;
        
        let peaks = 0;
        let valleys = 0;
        
        for (let i = 1; i < buffer.length - 1; i++) {
            const prev = buffer[i-1].y;
            const curr = buffer[i].y;
            const next = buffer[i+1].y;
            
            if (curr > prev && curr > next) peaks++;
            if (curr < prev && curr < next) valleys++;
        }
        
        return peaks >= 2 && valleys >= 2;
    }
    
    // 手势动作实现
    triggerCircleGesture() {
        // 圆形能量波效果
        this.createRippleEffect(window.innerWidth / 2, window.innerHeight / 2, 'large');
        
        // 粒子系统旋转效果
        if (this.particles) {
            gsap.to(this.particles.rotation, {
                y: this.particles.rotation.y + Math.PI * 2,
                duration: 2,
                ease: "power2.out"
            });
        }
        
        // 主题颜色旋转
        this.cycleTheme();
    }
    
    triggerLightningGesture() {
        // 闪电效果
        this.createLightningEffect();
        
        // 时间略微扰曲
        this.temporaryTimeWarp(1000);
    }
    
    triggerWaveGesture() {
        // 波浪效果
        this.createWaveEffect();
        
        // 粒子波动
        if (this.particles) {
            gsap.to(this.particles.material.uniforms.time, {
                value: this.particles.material.uniforms.time.value + 50,
                duration: 3,
                ease: "sine.inOut"
            });
        }
    }
    
    // 智能粒子系统
    initSmartParticleSystem() {
        this.particleTargets = [];
        this.particleFollowers = [];
        
        // 创建跟随粒子
        this.createFollowerParticles();
        
        // 启动粒子更新循环
        this.updateSmartParticles();
    }
    
    createFollowerParticles() {
        const followerCount = this.isMobile ? 3 : 8;
        
        for (let i = 0; i < followerCount; i++) {
            this.particleFollowers.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                targetX: 0,
                targetY: 0,
                speed: 0.02 + Math.random() * 0.03,
                element: this.createFollowerElement(i)
            });
        }
    }
    
    createFollowerElement(index) {
        const element = document.createElement('div');
        element.className = 'fixed w-1 h-1 bg-gradient-radial from-unx-accent to-transparent rounded-full pointer-events-none z-[100] transition-opacity duration-300 opacity-60';
        element.style.boxShadow = '0 0 10px rgba(255, 107, 107, 0.8)';
        document.body.appendChild(element);
        return element;
    }
    
    updateSmartParticles() {
        const update = () => {
            const mouseX = (this.mouse.x + 1) * window.innerWidth / 2;
            const mouseY = (-this.mouse.y + 1) * window.innerHeight / 2;
            
            this.particleFollowers.forEach((particle, index) => {
                // 计算目标位置（鼠标周围的圆形轨道）
                const angle = (Date.now() * 0.001 + index * (Math.PI * 2 / this.particleFollowers.length)) % (Math.PI * 2);
                const radius = 50 + this.voiceAmplitude * 30;
                
                particle.targetX = mouseX + Math.cos(angle) * radius;
                particle.targetY = mouseY + Math.sin(angle) * radius;
                
                // 平滑移动
                particle.x += (particle.targetX - particle.x) * particle.speed;
                particle.y += (particle.targetY - particle.y) * particle.speed;
                
                // 更新元素位置
                particle.element.style.left = particle.x + 'px';
                particle.element.style.top = particle.y + 'px';
                
                // 根据速度调整透明度
                const velocity = Math.sqrt(
                    Math.pow(particle.targetX - particle.x, 2) + 
                    Math.pow(particle.targetY - particle.y, 2)
                );
                particle.element.style.opacity = Math.min(0.8, 0.3 + velocity * 0.01);
            });
            
            requestAnimationFrame(update);
        };
        update();
    }
    
    // 扫描线效果
    initScanLineEffect() {
        this.createScanLines();
        this.animateScanLines();
    }
    
    createScanLines() {
        const scanLineCount = this.isMobile ? 2 : 4;
        
        for (let i = 0; i < scanLineCount; i++) {
            const scanLine = document.createElement('div');
            scanLine.className = 'fixed left-0 w-full h-0.5 pointer-events-none z-50 opacity-0';
            scanLine.style.background = 'linear-gradient(90deg, transparent 0%, rgba(255, 107, 107, 0.8) 50%, transparent 100%)';
            scanLine.style.boxShadow = '0 0 20px rgba(255, 107, 107, 0.6)';
            
            this.scanLines.push({
                element: scanLine,
                direction: Math.random() > 0.5 ? 1 : -1,
                speed: 0.5 + Math.random() * 1,
                delay: i * 2000
            });
            
            document.body.appendChild(scanLine);
        }
    }
    
    animateScanLines() {
        this.scanLines.forEach((scanLine, index) => {
            const animate = () => {
                const duration = 3000 + Math.random() * 2000;
                const startY = scanLine.direction > 0 ? -10 : window.innerHeight + 10;
                const endY = scanLine.direction > 0 ? window.innerHeight + 10 : -10;
                
                gsap.set(scanLine.element, { 
                    top: startY + 'px',
                    opacity: 0 
                });
                
                gsap.timeline()
                    .to(scanLine.element, {
                        opacity: 0.6,
                        duration: 0.5,
                        ease: "power2.out"
                    })
                    .to(scanLine.element, {
                        top: endY + 'px',
                        duration: duration / 1000,
                        ease: "none"
                    }, 0)
                    .to(scanLine.element, {
                        opacity: 0,
                        duration: 0.5,
                        ease: "power2.in"
                    }, "-=0.5")
                    .call(() => {
                        // 延迟后再次启动
                        setTimeout(animate, 5000 + Math.random() * 10000);
                    });
            };
            
            // 初始延迟
            setTimeout(animate, scanLine.delay);
        });
    }
    
    // 能量连线系统
    initEnergyConnections() {
        this.connectionCanvas = document.createElement('canvas');
        this.connectionCanvas.className = 'fixed top-0 left-0 w-full h-full pointer-events-none z-45 connection-canvas';
        
        this.connectionCtx = this.connectionCanvas.getContext('2d');
        this.resizeConnectionCanvas();
        
        document.body.appendChild(this.connectionCanvas);
        
        // 启动连线绘制
        this.drawConnections();
        
        // 监听窗口大小变化
        window.addEventListener('resize', () => this.resizeConnectionCanvas());
    }
    
    resizeConnectionCanvas() {
        this.connectionCanvas.width = window.innerWidth;
        this.connectionCanvas.height = window.innerHeight;
    }
    
    drawConnections() {
        const draw = () => {
            this.connectionCtx.clearRect(0, 0, this.connectionCanvas.width, this.connectionCanvas.height);
            
            const mouseX = (this.mouse.x + 1) * window.innerWidth / 2;
            const mouseY = (-this.mouse.y + 1) * window.innerHeight / 2;
            
            // 绘制鼠标到随机粒子的连线
            this.particleFollowers.forEach((particle, index) => {
                const distance = Math.sqrt(
                    Math.pow(mouseX - particle.x, 2) + 
                    Math.pow(mouseY - particle.y, 2)
                );
                
                if (distance < 200) { // 只在近距离内连接
                    const opacity = (1 - distance / 200) * 0.3 * this.energyLevel;
                    
                    this.connectionCtx.beginPath();
                    this.connectionCtx.strokeStyle = `rgba(255, 107, 107, ${opacity})`;
                    this.connectionCtx.lineWidth = 1;
                    this.connectionCtx.moveTo(mouseX, mouseY);
                    this.connectionCtx.lineTo(particle.x, particle.y);
                    this.connectionCtx.stroke();
                    
                    // 添加脑电波效果
                    if (Math.random() < 0.1) {
                        this.drawLightningBolt(mouseX, mouseY, particle.x, particle.y, opacity);
                    }
                }
            });
            
            // 能量等级自然衰减
            this.energyLevel *= 0.995;
            
            requestAnimationFrame(draw);
        };
        draw();
    }
    
    drawLightningBolt(startX, startY, endX, endY, opacity) {
        const segments = 8;
        const roughness = 0.3;
        
        this.connectionCtx.beginPath();
        this.connectionCtx.strokeStyle = `rgba(255, 255, 255, ${opacity * 2})`;
        this.connectionCtx.lineWidth = 2;
        this.connectionCtx.moveTo(startX, startY);
        
        for (let i = 1; i < segments; i++) {
            const t = i / segments;
            const x = startX + (endX - startX) * t;
            const y = startY + (endY - startY) * t;
            
            // 添加随机偏移
            const offsetX = (Math.random() - 0.5) * roughness * 50;
            const offsetY = (Math.random() - 0.5) * roughness * 50;
            
            this.connectionCtx.lineTo(x + offsetX, y + offsetY);
        }
        
        this.connectionCtx.lineTo(endX, endY);
        this.connectionCtx.stroke();
    }
    
    // 时间扰曲效果
    initTimeWarpEffect() {
        // 监听按键事件
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Shift' && !this.isTimeWarpActive) {
                this.activateTimeWarp();
            }
        });
        
        document.addEventListener('keyup', (e) => {
            if (e.key === 'Shift' && this.isTimeWarpActive) {
                this.deactivateTimeWarp();
            }
        });
    }
    
    activateTimeWarp() {
        this.isTimeWarpActive = true;
        
        // 减慢动画
        gsap.globalTimeline.timeScale(0.3);
        
        // 视觉效果
        gsap.to(document.body, {
            filter: `${this.getThemeFilter()} contrast(1.2) saturate(1.3) hue-rotate(10deg)`,
            duration: 0.5,
            ease: "power2.out"
        });
        
        // 显示时间扰曲指示
        this.showTemporaryMessage('时间扰曲激活', 500);
        
        console.log('⏱️ 时间扰曲激活');
    }
    
    deactivateTimeWarp() {
        this.isTimeWarpActive = false;
        
        // 恢复正常速度
        gsap.globalTimeline.timeScale(1);
        
        // 恢复视觉效果
        gsap.to(document.body, {
            filter: this.getThemeFilter(),
            duration: 0.8,
            ease: "power2.inOut"
        });
        
        console.log('⏱️ 时间扰曲停止');
    }
    
    temporaryTimeWarp(duration) {
        if (this.isTimeWarpActive) return;
        
        this.activateTimeWarp();
        setTimeout(() => {
            this.deactivateTimeWarp();
        }, duration);
    }
    
    // 虚拟键盘系统
    initVirtualKeyboard() {
        if (this.isMobile) {
            this.createVirtualKeyboard();
        }
    }
    
    createVirtualKeyboard() {
        this.virtualKeyboard = document.createElement('div');
        this.virtualKeyboard.className = 'virtual-keyboard fixed bottom-[100px] right-5 bg-black/80 backdrop-blur-lg border border-unx-accent/30 rounded-2xl p-4 z-[100] opacity-0 translate-y-5 transition-all duration-300 font-jetbrains';
        
        const keys = [
            { label: '主题', key: 'ESC', action: () => this.toggleTheme() },
            { label: '能量', key: 'SPC', action: () => this.triggerEnergyBurst() },
            { label: '帮助', key: 'H', action: () => this.toggleHelp() },
            { label: '重置', key: 'R', action: () => this.resetExperience() }
        ];
        
        keys.forEach(keyInfo => {
            const keyButton = document.createElement('button');
            keyButton.className = 'block w-full my-1.5 px-3 py-2 bg-unx-accent/10 border border-unx-accent/30 rounded-lg text-unx-accent text-xs font-inherit cursor-pointer transition-all duration-200';
            
            keyButton.innerHTML = `
                <div class="font-bold">${keyInfo.label}</div>
                <div class="text-[10px] opacity-70">${keyInfo.key}</div>
            `;
            
            keyButton.addEventListener('click', keyInfo.action);
            
            keyButton.addEventListener('mouseenter', () => {
                keyButton.className = keyButton.className.replace('bg-unx-accent/10', 'bg-unx-accent/20');
                keyButton.style.transform = 'scale(1.05)';
            });
            
            keyButton.addEventListener('mouseleave', () => {
                keyButton.className = keyButton.className.replace('bg-unx-accent/20', 'bg-unx-accent/10');
                keyButton.style.transform = 'scale(1)';
            });
            
            this.virtualKeyboard.appendChild(keyButton);
        });
        
        document.body.appendChild(this.virtualKeyboard);
        
        // 显示虚拟键盘
        setTimeout(() => {
            this.virtualKeyboard.classList.remove('opacity-0', 'translate-y-5');
            this.virtualKeyboard.classList.add('opacity-80', 'translate-y-0');
        }, 2000);
        
        // 5秒后自动隐藏
        setTimeout(() => {
            this.virtualKeyboard.classList.remove('opacity-80', 'translate-y-0');
            this.virtualKeyboard.classList.add('opacity-0', 'translate-y-5');
        }, 7000);
    }
    
    // 语音交互初始化
    async initVoiceInteraction() {
        try {
            // 请求麦克风权限（可选）
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                this.setupVoiceAnalysis(stream);
            }
        } catch (error) {
            console.log('语音交互不可用:', error.message);
            // 使用模拟数据
            this.useSimulatedVoice();
        }
    }
    
    setupVoiceAnalysis(stream) {
        if (!this.audioContext) return;
        
        const source = this.audioContext.createMediaStreamSource(stream);
        source.connect(this.analyser);
        
        const updateVoiceData = () => {
            this.analyser.getByteFrequencyData(this.frequencyData);
            
            // 计算平均音量
            const average = this.frequencyData.reduce((a, b) => a + b, 0) / this.frequencyData.length;
            this.voiceAmplitude = average / 255;
            
            // 根据音量调整粒子效果
            if (this.particles && this.voiceAmplitude > 0.1) {
                const scale = 1 + this.voiceAmplitude * 0.2;
                gsap.to(this.particles.scale, {
                    x: scale,
                    y: scale,
                    z: scale,
                    duration: 0.1,
                    ease: "power2.out"
                });
            }
            
            requestAnimationFrame(updateVoiceData);
        };
        
        updateVoiceData();
        console.log('🎤 语音交互已启用');
    }
    
    useSimulatedVoice() {
        // 使用模拟音量数据
        const updateSimulatedVoice = () => {
            // 模拟随机音量变化
            this.voiceAmplitude = Math.max(0, this.voiceAmplitude + (Math.random() - 0.5) * 0.05);
            this.voiceAmplitude = Math.min(0.3, this.voiceAmplitude);
            
            requestAnimationFrame(updateSimulatedVoice);
        };
        updateSimulatedVoice();
    }
    
    // 额外的创意效果
    createLightningEffect() {
        // 闪电效果实现
        const lightning = document.createElement('div');
        lightning.className = 'lightning-flash fixed top-0 left-0 w-full h-full pointer-events-none z-[999] opacity-0';
        
        document.body.appendChild(lightning);
        
        gsap.timeline()
            .to(lightning, {
                opacity: 0.8,
                duration: 0.05,
                ease: "power2.out"
            })
            .to(lightning, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            })
            .call(() => lightning.remove());
        
        // 声音效果（可选）
        this.playThunderSound();
    }
    
    createWaveEffect() {
        // 波浪效果实现
        const waveCount = 5;
        
        for (let i = 0; i < waveCount; i++) {
            setTimeout(() => {
                this.createRippleEffect(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight,
                    'normal'
                );
            }, i * 200);
        }
    }
    
    cycleTheme() {
        // 快速切换主题
        const themes = ['default', 'blue', 'green', 'purple', 'orange'];
        const currentIndex = themes.indexOf(this.currentTheme);
        
        for (let i = 0; i < themes.length; i++) {
            setTimeout(() => {
                const nextIndex = (currentIndex + i + 1) % themes.length;
                this.currentTheme = themes[nextIndex];
                
                gsap.to(document.body, {
                    filter: this.getThemeFilter(),
                    duration: 0.3,
                    ease: "power2.inOut"
                });
            }, i * 300);
        }
    }
    
    playThunderSound() {
        // 使用Web Audio API创建简单的声音效果
        if (this.audioContext) {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(50, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(25, this.audioContext.currentTime + 0.3);
            
            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.3);
        }
    }
    initInteractions() {
        console.log('🎮 初始化交互系统...');
        
        // 超级酷炫Logo交互
        const logoContainer = document.getElementById('logo-container');
        const logoSphere = document.getElementById('logo-sphere');
        
        if (logoContainer && logoSphere) {
            // 鼠标跟踪3D旋转
            logoContainer.addEventListener('mousemove', (e) => {
                this.handleLogoMouseMove(e, logoSphere);
            });
            
            // 鼠标进入增强效果
            logoContainer.addEventListener('mouseenter', () => {
                this.enhanceLogoGlow(logoSphere);
            });
            
            // 鼠标离开恢复
            logoContainer.addEventListener('mouseleave', () => {
                this.resetLogoGlow(logoSphere);
            });
            
            // 点击触发能量爆发
            logoContainer.addEventListener('click', () => {
                this.triggerLogoEnergyBurst();
            });
        }
        
        // 点击爆炸效果
        document.addEventListener('click', (e) => {
            this.createRippleEffect(e.clientX, e.clientY);
        });
        
        // 移动端触摸优化
        if (this.isMobile) {
            this.initTouchInteractions();
        }
        
        console.log('✅ 交互系统初始化完成');
    }
    
    // 鼠标跟踪3D旋转效果 - 简化版
    handleLogoMouseMove(e, logoSphere) {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) / rect.width;
        const deltaY = (e.clientY - centerY) / rect.height;
        
        const rotateX = deltaY * -10; // 减少旋转幅度
        const rotateY = deltaX * 10;
        
        gsap.to(logoSphere, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.3,
            ease: "power2.out"
        });
    }
    
    // 简化的Logo悬停效果
    enhanceLogoGlow(logoSphere) {
        gsap.to(logoSphere, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
        });
    }
    
    // 重置Logo状态
    resetLogoGlow(logoSphere) {
        gsap.to(logoSphere, {
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            duration: 0.4,
            ease: "power2.out"
        });
    }
    
    // 简化的Logo点击效果
    triggerLogoEnergyBurst() {
        const logoSphere = document.getElementById('logo-sphere');
        
        if (logoSphere) {
            // 简单的缩放动画
            gsap.timeline()
                .to(logoSphere, {
                    scale: 1.1,
                    duration: 0.15,
                    ease: "power2.out"
                })
                .to(logoSphere, {
                    scale: 1,
                    duration: 0.3,
                    ease: "elastic.out(1, 0.5)"
                });
        }
        
        // 触发简单的涟漪效果
        this.createRippleEffect(window.innerWidth / 2, window.innerHeight / 2, 'small');
    }
    
    createRippleEffect(x, y, size = 'normal') {
        const ripple = document.createElement('div');
        
        // 根据尺寸设置不同的样式
        const sizes = {
            small: { initial: 10, final: 100, border: 1 },
            normal: { initial: 20, final: 200, border: 2 },
            large: { initial: 30, final: 300, border: 3 }
        };
        
        const sizeConfig = sizes[size] || sizes.normal;
        
        ripple.className = 'fixed rounded-full pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = sizeConfig.initial + 'px';
        ripple.style.height = sizeConfig.initial + 'px';
        ripple.style.border = `${sizeConfig.border}px solid rgba(255, 107, 107, 0.6)`;
        
        document.body.appendChild(ripple);
        
        gsap.to(ripple, {
            width: sizeConfig.final,
            height: sizeConfig.final,
            opacity: 0,
            duration: size === 'large' ? 1.5 : 1,
            ease: "power2.out",
            onComplete: () => ripple.remove()
        });
    }
    
    // 简化的移动端触摸交互
    initTouchInteractions() {
        console.log('📱 初始化移动端交互...');
        
        let touchStartTime = 0;
        let lastTap = 0;
        
        // 触摸开始
        document.addEventListener('touchstart', (e) => {
            touchStartTime = Date.now();
        }, { passive: true });
        
        // 触摸结束
        document.addEventListener('touchend', (e) => {
            const touchDuration = Date.now() - touchStartTime;
            const currentTime = Date.now();
            const tapLength = currentTime - lastTap;
            
            if (touchDuration < 200) { // 快速点击
                const touch = e.changedTouches[0];
                if (touch) {
                    this.createRippleEffect(touch.clientX, touch.clientY, 'small');
                }
            }
            
            // 双击检测
            if (tapLength < 500 && tapLength > 0) {
                e.preventDefault();
                this.triggerEnergyBurst();
                this.showTemporaryMessage('双击特效!', 1500);
            }
            
            lastTap = currentTime;
        }, { passive: false });
        
        // 移动端提示优化
        this.optimizeMobileHints();
        
        console.log('✅ 移动端交互初始化完成');
    }

    
    optimizeMobileHints() {
        const mobileHint = document.getElementById('mobile-hint');
        if (mobileHint && this.isMobile) {
            // 简化的提示内容
            const hintContent = mobileHint.querySelector('.text-xs:last-child');
            if (hintContent) {
                hintContent.innerHTML = `点击屏幕体验特效 · 双击触发能量爆发`;
            }
            
            // 简化的动画序列
            gsap.timeline({ delay: 2 })
                .fromTo(mobileHint, 
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
                )
                .to(mobileHint, 
                    { opacity: 0, y: -15, duration: 0.4, ease: "power2.inOut" },
                    "+=3"
                )
                .call(() => {
                    mobileHint.style.display = 'none';
                });
        }
    }
    
    // === 键盘控制系统 ===
    initKeyboardControls() {
        console.log('🎹 初始化键盘控制...');
        
        document.addEventListener('keydown', (e) => {
            // 避免在输入框中触发快捷键
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }
            
            switch (e.key.toLowerCase()) {
                case 'escape':
                    e.preventDefault();
                    this.toggleTheme();
                    break;
                case ' ':
                    e.preventDefault();
                    this.triggerEnergyBurst();
                    break;
                case 'f':
                    e.preventDefault();
                    this.toggleFullscreen();
                    break;
                case 'h':
                    e.preventDefault();
                    this.toggleHelp();
                    break;
                case 'r':
                    e.preventDefault();
                    this.resetExperience();
                    break;
                case 'g':
                    e.preventDefault();
                    this.toggleGestureRecognition();
                    break;
                case 'v':
                    e.preventDefault();
                    this.toggleVirtualKeyboard();
                    break;
                case 'l':
                    e.preventDefault();
                    this.triggerLightningGesture();
                    break;
                case 'w':
                    e.preventDefault();
                    this.triggerWaveGesture();
                    break;
                case 'c':
                    e.preventDefault();
                    this.triggerCircleGesture();
                    break;
                default:
                    break;
            }
        });
        
        // 为键盘用户添加焦点支持
        this.addKeyboardNavigation();
        
        console.log('✅ 键盘控制初始化完成');
    }
    
    // 新增的键盘功能
    toggleGestureRecognition() {
        this.gestureRecognitionEnabled = !this.gestureRecognitionEnabled;
        this.showTemporaryMessage(
            `手势识别: ${this.gestureRecognitionEnabled ? '开启' : '关闭'}`,
            1500
        );
    }
    
    toggleVirtualKeyboard() {
        if (!this.virtualKeyboard) {
            // 在桌面端显示提示
            this.showTemporaryMessage('虚拟键盘仅在移动端可用', 1500);
            return;
        }
        
        const isVisible = this.virtualKeyboard && !this.virtualKeyboard.classList.contains('opacity-0');
        
        gsap.to(this.virtualKeyboard, {
            opacity: isVisible ? 0 : 0.8,
            y: isVisible ? 20 : 0,
            duration: 0.3,
            ease: "power2.out"
        });
    }
    
    // 添加帮助系统
    initHelpSystem() {
        const helpPanel = document.getElementById('keyboard-hints');
        if (helpPanel && !this.isMobile) {
            // 初始时显示3秒后自动隐藏
            setTimeout(() => {
                gsap.to(helpPanel, {
                    opacity: 0.8,
                    duration: 0.5,
                    ease: "power2.out"
                });
                
                // 3秒后淡出
                setTimeout(() => {
                    gsap.to(helpPanel, {
                        opacity: 0,
                        duration: 0.5,
                        ease: "power2.inOut"
                    });
                }, 3000);
            }, 1000);
        }
    }
    
    addKeyboardNavigation() {
        const focusableElements = [
            document.getElementById('logo-container'),
            document.querySelector('a[href*="github"]')
        ].filter(Boolean);
        
        focusableElements.forEach((element, index) => {
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    // Tab 导航支持已由浏览器原生支持
                } else if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    element.click();
                }
            });
        });
    }
    
    toggleHelp() {
        const helpPanel = document.getElementById('keyboard-hints');
        if (!helpPanel || this.isMobile) return;
        
        this.helpVisible = !this.helpVisible;
        
        gsap.to(helpPanel, {
            opacity: this.helpVisible ? 0.9 : 0,
            transform: this.helpVisible ? 'translateY(0)' : 'translateY(-10px)',
            duration: 0.3,
            ease: "power2.out"
        });
    }
    
    resetExperience() {
        // 重置主题
        this.currentTheme = 'default';
        gsap.set(document.body, { filter: 'none' });
        
        // 重置粒子系统
        if (this.particles) {
            this.particles.material.uniforms.time.value = 0;
        }
        
        // 重置logo状态
        const logoSphere = document.getElementById('logo-sphere');
        if (logoSphere) {
            gsap.set(logoSphere, {
                scale: 1,
                rotation: 0,
                rotationX: 0,
                rotationY: 0
            });
        }
        
        console.log('✅ 体验已重置');
    }
    
    toggleTheme() {
        const themes = {
            default: 'none',
            blue: 'hue-rotate(240deg) saturate(1.2)',
            green: 'hue-rotate(120deg) saturate(1.1)',
            purple: 'hue-rotate(280deg) saturate(1.3)',
            orange: 'hue-rotate(30deg) saturate(1.2)'
        };
        
        const themeKeys = Object.keys(themes);
        const currentIndex = themeKeys.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % themeKeys.length;
        this.currentTheme = themeKeys[nextIndex];
        
        // 优雅的主题切换动画
        gsap.to(document.body, {
            filter: themes[this.currentTheme],
            duration: 1.2,
            ease: "power2.inOut"
        });
        
        // 显示主题名称
        this.showTemporaryMessage(`主题: ${this.currentTheme.toUpperCase()}`);
        
        console.log(`🎨 切换主题: ${this.currentTheme}`);
    }
    
    triggerEnergyBurst() {
        // 屏幕中央能量爆发
        this.createRippleEffect(window.innerWidth / 2, window.innerHeight / 2, 'large');
        
        // 粒子系统增强
        if (this.particles) {
            gsap.to(this.particles.material.uniforms.time, {
                value: this.particles.material.uniforms.time.value + 20,
                duration: 2,
                ease: "power2.out"
            });
        }
        
        // 优化的闪烁效果 - 降低强度
        gsap.timeline()
            .to(document.body, {
                filter: this.currentTheme === 'default' ? 
                    'brightness(1.05) contrast(1.1)' : 
                    `${this.getThemeFilter()} brightness(1.05) contrast(1.1)`,
                duration: 0.1,
                ease: "power2.out"
            })
            .to(document.body, {
                filter: this.getThemeFilter(),
                duration: 0.3,
                ease: "power2.inOut"
            });
        
        console.log('⚡ 能量爆发触发');
    }
    
    getThemeFilter() {
        const themes = {
            default: 'none',
            blue: 'hue-rotate(240deg) saturate(1.2)',
            green: 'hue-rotate(120deg) saturate(1.1)',
            purple: 'hue-rotate(280deg) saturate(1.3)',
            orange: 'hue-rotate(30deg) saturate(1.2)'
        };
        return themes[this.currentTheme] || 'none';
    }
    
    showTemporaryMessage(message, duration = 2000) {
        // 创建临时消息元素
        const messageEl = document.createElement('div');
        messageEl.textContent = message;
        messageEl.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-unx-accent px-6 py-3 rounded-lg font-jetbrains text-sm z-[9999] backdrop-blur-lg border border-unx-accent/30 pointer-events-none';
        
        document.body.appendChild(messageEl);
        
        // 动画显示和隐藏
        gsap.fromTo(messageEl, 
            { 
                opacity: 0, 
                scale: 0.8,
                y: 20
            },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: "back.out(1.7)"
            }
        );
        
        setTimeout(() => {
            gsap.to(messageEl, {
                opacity: 0,
                scale: 0.8,
                y: -20,
                duration: 0.3,
                ease: "power2.inOut",
                onComplete: () => messageEl.remove()
            });
        }, duration);
    }
    
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(console.error);
        } else {
            document.exitFullscreen();
        }
    }
    
    // === 窗口调整 ===
    handleResize() {
        if (!this.camera || !this.renderer) return;
        
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        // 更新着色器分辨率
        if (this.particles) {
            this.particles.material.uniforms.resolution.value.set(
                window.innerWidth,
                window.innerHeight
            );
        }
    }
    
    // === 渲染循环 ===
    startRenderLoop() {
        const render = (time) => {
            if (this.particles) {
                this.particles.material.uniforms.time.value = time;
                this.particles.material.uniforms.mouse.value.copy(this.mouse);
                
                // 微妙的旋转
                this.particles.rotation.y += 0.001;
            }
            
            this.renderer.render(this.scene, this.camera);
            requestAnimationFrame(render);
        };
        
        render(0);
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new UNXAIExperience();
});

// 导出为全局变量（可选）
window.UNXAIExperience = UNXAIExperience;