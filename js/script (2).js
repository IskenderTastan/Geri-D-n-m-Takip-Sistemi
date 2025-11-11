// Global değişkenler
let currentUser = null;
let userData = {
    username: '',
    email: '',
    totalPoints: 0,
    totalRecycling: 0,
    streakDays: 0,
    lastActivityDate: null,
    badges: [],
    activities: []
};

// Rozet tanımları
const badgeDefinitions = [
    {
        id: 'first_recycling',
        title: 'İlk Adım',
        description: 'İlk geri dönüşümünü yap',
        icon: 'fas fa-seedling',
        requirement: { type: 'recycling_count', value: 1 },
        color: 'success'
    },
    {
        id: 'eco_warrior',
        title: 'Çevre Savaşçısı',
        description: '100 puan kazan',
        icon: 'fas fa-shield-alt',
        requirement: { type: 'points', value: 100 },
        color: 'primary'
    },
    {
        id: 'recycling_master',
        title: 'Geri Dönüşüm Ustası',
        description: '10 geri dönüşüm yap',
        icon: 'fas fa-trophy',
        requirement: { type: 'recycling_count', value: 10 },
        color: 'warning'
    },
    {
        id: 'streak_week',
        title: 'Haftalık Seri',
        description: '7 gün üst üste geri dönüşüm yap',
        icon: 'fas fa-calendar-week',
        requirement: { type: 'streak', value: 7 },
        color: 'info'
    },
    {
        id: 'eco_champion',
        title: 'Çevre Şampiyonu',
        description: '500 puan kazan',
        icon: 'fas fa-crown',
        requirement: { type: 'points', value: 500 },
        color: 'danger'
    },
    {
        id: 'plastic_hunter',
        title: 'Plastik Avcısı',
        description: '50 kg plastik geri dönüştür',
        icon: 'fas fa-recycle',
        requirement: { type: 'material', material: 'plastic', value: 50 },
        color: 'success'
    },
    {
        id: 'metal_collector',
        title: 'Metal Toplayıcısı',
        description: '30 kg metal geri dönüştür',
        icon: 'fas fa-cog',
        requirement: { type: 'material', material: 'metal', value: 30 },
        color: 'secondary'
    },
    {
        id: 'eco_legend',
        title: 'Çevre Efsanesi',
        description: '1000 puan kazan',
        icon: 'fas fa-star',
        requirement: { type: 'points', value: 1000 },
        color: 'warning'
    }
];

// Geri dönüşüm türleri ve puanları
const recyclingTypes = {
    plastic: { name: 'Plastik', points: 10, icon: 'fas fa-recycle', color: 'primary' },
    paper: { name: 'Kağıt', points: 5, icon: 'fas fa-file-alt', color: 'success' },
    glass: { name: 'Cam', points: 8, icon: 'fas fa-wine-bottle', color: 'info' },
    metal: { name: 'Metal', points: 12, icon: 'fas fa-cog', color: 'warning' },
    organic: { name: 'Organik', points: 3, icon: 'fas fa-leaf', color: 'success' },
    electronic: { name: 'Elektronik', points: 20, icon: 'fas fa-microchip', color: 'danger' }
};

// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

// Uygulamayı başlat
function initializeApp() {
    // Her zaman giriş ekranını göster
    // Kullanıcı manuel olarak giriş yapmalı
    showLoginScreen();
    
    // Veriler sadece giriş yapıldığında yüklenecek
}

// Event listener'ları ayarla
function setupEventListeners() {
    // Giriş formu
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Geri dönüşüm formu
    document.getElementById('recyclingForm').addEventListener('submit', handleRecyclingSubmission);
    
    // Form kontrollerine focus event listener ekle
    setupFormFocusStyles();
}

// Form kontrollerine focus stilleri ekle
function setupFormFocusStyles() {
    const formControls = document.querySelectorAll('.form-control, .form-select');
    formControls.forEach(control => {
        // Eğer zaten event listener eklenmişse atla
        if (control.dataset.focusStyled === 'true') {
            return;
        }
        
        control.dataset.focusStyled = 'true';
        
        control.addEventListener('focus', function() {
            this.style.borderColor = '#28a745';
            this.style.boxShadow = '0 0 0 0.2rem rgba(40, 167, 69, 0.25)';
        });
        control.addEventListener('blur', function() {
            this.style.borderColor = '#e9ecef';
            this.style.boxShadow = 'none';
        });
    });
}

// Buton hover efektleri ekle
function setupButtonHoverEffects() {
    const successButtons = document.querySelectorAll('.btn-success');
    successButtons.forEach(button => {
        // Eğer zaten event listener eklenmişse atla
        if (button.dataset.hoverStyled === 'true') {
            return;
        }
        
        button.dataset.hoverStyled = 'true';
        button.style.transition = 'all 0.3s ease';
        
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 5px 15px rgba(40, 167, 69, 0.4)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// Giriş işlemi
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    
    if (!username || !email) {
        showToast('Lütfen tüm alanları doldurun!', 'error');
        return;
    }
    
    // LocalStorage'dan mevcut kullanıcı verilerini kontrol et
    const savedUserData = localStorage.getItem('recyclingUserData');
    const savedCurrentUser = localStorage.getItem('recyclingCurrentUser');
    
    // Eğer aynı kullanıcı adı ve email ile giriş yapılıyorsa, verilerini yükle
    if (savedUserData && savedCurrentUser) {
        const savedUser = JSON.parse(savedCurrentUser);
        if (savedUser.username === username && savedUser.email === email) {
            // Aynı kullanıcı, verilerini yükle
            userData = JSON.parse(savedUserData);
            currentUser = savedUser;
        } else {
            // Farklı kullanıcı, yeni hesap oluştur
            currentUser = { username, email };
            userData = {
                username: username,
                email: email,
                totalPoints: 0,
                totalRecycling: 0,
                streakDays: 0,
                lastActivityDate: null,
                badges: [],
                activities: []
            };
        }
    } else {
        // İlk kez giriş yapılıyor, yeni hesap oluştur
        currentUser = { username, email };
        userData = {
            username: username,
            email: email,
            totalPoints: 0,
            totalRecycling: 0,
            streakDays: 0,
            lastActivityDate: null,
            badges: [],
            activities: []
        };
    }
    
    // LocalStorage'a kaydet
    saveUserData();
    
    // Dashboard'u göster
    showDashboard();
    updateDashboard();
    
    showToast(`Hoş geldin ${username}!`, 'success');
}

// Geri dönüşüm ekleme işlemi
function handleRecyclingSubmission(e) {
    e.preventDefault();
    
    const type = document.getElementById('recyclingType').value;
    const quantity = parseFloat(document.getElementById('quantity').value);
    const description = document.getElementById('description').value.trim();
    
    if (!type || !quantity || quantity <= 0) {
        showToast('Lütfen geçerli değerler girin!', 'error');
        return;
    }
    
    // Puan hesapla
    const points = Math.round(quantity * recyclingTypes[type].points);
    
    // Aktivite oluştur
    const activity = {
        id: Date.now(),
        type: type,
        quantity: quantity,
        points: points,
        description: description,
        date: new Date().toISOString(),
        materialName: recyclingTypes[type].name
    };
    
    // Kullanıcı verilerini güncelle
    userData.totalPoints += points;
    userData.totalRecycling += 1;
    userData.activities.unshift(activity);
    
    // Günlük seri kontrolü
    updateStreak();
    
    // Rozet kontrolü
    checkBadges();
    
    // Verileri kaydet
    saveUserData();
    
    // Dashboard'u güncelle
    updateDashboard();
    
    // Formu temizle
    document.getElementById('recyclingForm').reset();
    
    showToast(`${points} puan kazandın! 🎉`, 'success');
}

// Günlük seri güncelleme
function updateStreak() {
    const today = new Date().toDateString();
    const lastDate = userData.lastActivityDate ? new Date(userData.lastActivityDate).toDateString() : null;
    
    if (lastDate === today) {
        // Bugün zaten aktivite var, seri değişmez
        return;
    }
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toDateString();
    
    if (lastDate === yesterdayString) {
        // Dün aktivite vardı, seri artır
        userData.streakDays += 1;
    } else if (lastDate !== today) {
        // Seri kırıldı, sıfırla
        userData.streakDays = 1;
    }
    
    userData.lastActivityDate = new Date().toISOString();
}

// Rozet kontrolü
function checkBadges() {
    badgeDefinitions.forEach(badge => {
        // Eğer rozet zaten kazanılmışsa atla
        if (userData.badges.includes(badge.id)) {
            return;
        }
        
        let earned = false;
        
        switch (badge.requirement.type) {
            case 'points':
                earned = userData.totalPoints >= badge.requirement.value;
                break;
            case 'recycling_count':
                earned = userData.totalRecycling >= badge.requirement.value;
                break;
            case 'streak':
                earned = userData.streakDays >= badge.requirement.value;
                break;
            case 'material':
                const materialTotal = userData.activities
                    .filter(activity => activity.type === badge.requirement.material)
                    .reduce((sum, activity) => sum + activity.quantity, 0);
                earned = materialTotal >= badge.requirement.value;
                break;
        }
        
        if (earned) {
            userData.badges.push(badge.id);
            showToast(`Yeni rozet kazandın: ${badge.title}! 🏆`, 'success');
        }
    });
}

// Dashboard'u güncelle
function updateDashboard() {
    // Kullanıcı bilgilerini güncelle
    document.getElementById('currentUser').textContent = userData.username;
    
    // İstatistikleri güncelle
    document.getElementById('totalPoints').textContent = userData.totalPoints;
    document.getElementById('totalBadges').textContent = userData.badges.length;
    document.getElementById('totalRecycling').textContent = userData.totalRecycling;
    document.getElementById('streakDays').textContent = userData.streakDays;
    
    // Rozetleri güncelle
    updateBadges();
    
    // Aktiviteleri güncelle
    updateActivities();
}

// Rozetleri güncelle
function updateBadges() {
    const container = document.getElementById('badgesContainer');
    container.innerHTML = '';
    
    badgeDefinitions.forEach(badge => {
        const isEarned = userData.badges.includes(badge.id);
        const badgeCard = createBadgeCard(badge, isEarned);
        container.appendChild(badgeCard);
    });
}

// Rozet kartı oluştur
function createBadgeCard(badge, isEarned) {
    const col = document.createElement('div');
    col.className = 'col-md-3 col-sm-6 mb-3';
    
    const card = document.createElement('div');
    card.className = 'card text-center';
    
    if (isEarned) {
        card.style.cssText = 'background: linear-gradient(45deg, #ffd700, #ffed4e); border: 3px solid #ffd700; border-radius: 15px; transition: all 0.3s ease; cursor: pointer;';
    } else {
        card.style.cssText = 'background: linear-gradient(45deg, #f8f9fa, #e9ecef); border: 3px solid #dee2e6; border-radius: 15px; opacity: 0.6; transition: all 0.3s ease; cursor: pointer;';
    }
    
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
    
    card.innerHTML = `
        <div class="card-body">
            <div class="text-${badge.color}" style="font-size: 3rem; margin-bottom: 1rem;">
                <i class="${badge.icon}"></i>
            </div>
            <h6 style="font-weight: bold; font-size: 1.1rem; margin-bottom: 0.5rem;">${badge.title}</h6>
            <p style="font-size: 0.9rem; color: #6c757d;">${badge.description}</p>
            ${isEarned ? '<span class="badge bg-success">Kazanıldı!</span>' : '<span class="badge bg-secondary">Kazanılmadı</span>'}
        </div>
    `;
    
    col.appendChild(card);
    return col;
}

// Aktiviteleri güncelle
function updateActivities() {
    const container = document.getElementById('activitiesContainer');
    container.innerHTML = '';
    
    if (userData.activities.length === 0) {
        container.innerHTML = '<p class="text-muted text-center">Henüz aktivite bulunmuyor.</p>';
        return;
    }
    
    userData.activities.slice(0, 10).forEach(activity => {
        const activityItem = createActivityItem(activity);
        container.appendChild(activityItem);
    });
}

// Aktivite öğesi oluştur
function createActivityItem(activity) {
    const item = document.createElement('div');
    item.className = 'd-flex align-items-center mb-3';
    item.style.cssText = 'border-left: 4px solid #28a745; padding-left: 1rem; background: #f8f9fa; padding: 1rem; border-radius: 0 10px 10px 0; opacity: 0; transform: translateY(30px);';
    
    // Animasyon için setTimeout kullan
    setTimeout(() => {
        item.style.transition = 'all 0.6s ease-out';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    }, 10);
    
    const icon = document.createElement('div');
    icon.className = `bg-${recyclingTypes[activity.type].color} text-white rounded-circle d-flex align-items-center justify-content-center me-3`;
    icon.style.cssText = 'width: 40px; height: 40px;';
    icon.innerHTML = `<i class="${recyclingTypes[activity.type].icon}"></i>`;
    
    const content = document.createElement('div');
    content.className = 'flex-grow-1';
    content.innerHTML = `
        <h6 class="mb-1">${activity.materialName} Geri Dönüşümü</h6>
        <p class="mb-1 text-muted">${activity.quantity} kg - ${activity.points} puan</p>
        <small class="text-muted">${formatDate(activity.date)}</small>
        ${activity.description ? `<p class="mb-0 mt-1"><small>${activity.description}</small></p>` : ''}
    `;
    
    item.appendChild(icon);
    item.appendChild(content);
    return item;
}

// Tarih formatla
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Giriş ekranını göster
function showLoginScreen() {
    document.getElementById('loginScreen').classList.remove('d-none');
    document.getElementById('dashboard').classList.add('d-none');
}

// Dashboard'u göster
function showDashboard() {
    document.getElementById('loginScreen').classList.add('d-none');
    document.getElementById('dashboard').classList.remove('d-none');
    // Dashboard gösterildiğinde form kontrollerine focus stilleri ekle
    setTimeout(() => {
        setupFormFocusStyles();
        setupButtonHoverEffects();
    }, 100);
}

// Çıkış yap
function logout() {
    currentUser = null;
    showLoginScreen();
    showToast('Başarıyla çıkış yaptınız!', 'info');
}

// Toast bildirimi göster
function showToast(message, type = 'info') {
    // Mevcut toast'ları temizle
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    const toastContainer = document.createElement('div');
    toastContainer.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 1050;';
    
    const toast = document.createElement('div');
    toast.className = `toast show align-items-center text-white bg-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} border-0`;
    toast.setAttribute('role', 'alert');
    
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    document.body.appendChild(toastContainer);
    
    // 3 saniye sonra otomatik kapat
    setTimeout(() => {
        toast.remove();
        toastContainer.remove();
    }, 3000);
}

// LocalStorage'a veri kaydet
function saveUserData() {
    if (currentUser) {
        localStorage.setItem('recyclingUserData', JSON.stringify(userData));
        localStorage.setItem('recyclingCurrentUser', JSON.stringify(currentUser));
    }
}

// LocalStorage'dan veri yükle
function loadUserData() {
    const savedUserData = localStorage.getItem('recyclingUserData');
    const savedCurrentUser = localStorage.getItem('recyclingCurrentUser');
    
    if (savedUserData && savedCurrentUser) {
        userData = JSON.parse(savedUserData);
        currentUser = JSON.parse(savedCurrentUser);
    }
}

// Sayfa kapatılırken verileri kaydet
window.addEventListener('beforeunload', function() {
    saveUserData();
});
