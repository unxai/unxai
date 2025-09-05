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
            this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
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
    
    // === 交互系统 ===
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
        
        ripple.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: ${sizeConfig.initial}px;
            height: ${sizeConfig.initial}px;
            border: ${sizeConfig.border}px solid rgba(255, 107, 107, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
        `;
        
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
                default:
                    break;
            }
        });
        
        // 为键盘用户添加焦点支持
        this.addKeyboardNavigation();
        
        console.log('✅ 键盘控制初始化完成');
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
        messageEl.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: #ff6b6b;
            padding: 12px 24px;
            border-radius: 8px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 14px;
            z-index: 9999;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 107, 107, 0.3);
            pointer-events: none;
        `;
        
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