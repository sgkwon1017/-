// Sleep Better App - 종합 수면 관리 앱
// 전역 변수 및 상태 관리
let currentUser = {
  level: 1,
  points: 0,
  badges: [],
  sleepGoal: 8, // 시간
  sleepData: [],
  posts: [],
  chatHistory: []
};

let sleepChart = null;
let selectedSleepQuality = null;

// 로컬스토리지 키
const STORAGE_KEYS = {
  USER_DATA: 'sleepApp_userData',
  SLEEP_DATA: 'sleepApp_sleepData',
  POSTS: 'sleepApp_posts',
  CHAT_HISTORY: 'sleepApp_chatHistory'
};

// 뱃지 정의
const BADGES = {
  FIRST_RECORD: { id: 'first_record', name: '첫 기록', icon: '🎯', description: '첫 수면 기록 완료' },
  WEEK_STREAK: { id: 'week_streak', name: '일주일 도전', icon: '🔥', description: '7일 연속 기록' },
  GOAL_ACHIEVER: { id: 'goal_achiever', name: '목표 달성자', icon: '⭐', description: '수면 목표 달성' },
  EARLY_BIRD: { id: 'early_bird', name: '일찍 일어나는 새', icon: '🐦', description: '6시 전 기상' },
  NIGHT_OWL: { id: 'night_owl', name: '올빼미', icon: '🦉', description: '자정 후 취침' },
  QUALITY_SLEEPER: { id: 'quality_sleeper', name: '깊은 잠', icon: '💤', description: '좋은 수면 질 5일 연속' },
  COMMUNITY_STAR: { id: 'community_star', name: '커뮤니티 스타', icon: '🌟', description: '인기 게시글 작성' },
  LEVEL_UP: { id: 'level_up', name: '레벨업', icon: '🚀', description: '레벨 5 달성' }
};

// 랭킹 데이터 (모의 데이터)
const MOCK_RANKING_DATA = {
  'sleep-time': [
    { name: '김민준', score: '8.5시간', rank: 1 },
    { name: '이서연', score: '8.2시간', rank: 2 },
    { name: '박지호', score: '8.0시간', rank: 3 },
    { name: '당신', score: '7.8시간', rank: 4 },
    { name: '최유나', score: '7.5시간', rank: 5 }
  ],
  'goal-achievement': [
    { name: '이서연', score: '95%', rank: 1 },
    { name: '김민준', score: '92%', rank: 2 },
    { name: '최유나', score: '88%', rank: 3 },
    { name: '당신', score: '85%', rank: 4 },
    { name: '박지호', score: '82%', rank: 5 }
  ],
  'activity-score': [
    { name: '박지호', score: '2,450', rank: 1 },
    { name: '김민준', score: '2,380', rank: 2 },
    { name: '당신', score: '2,250', rank: 3 },
    { name: '이서연', score: '2,180', rank: 4 },
    { name: '최유나', score: '2,100', rank: 5 }
  ]
};

// AI 응답 데이터 (모의 AI 시스템)
const AI_RESPONSES = {
  '적절한 수면 시간은 얼마나 되나요?': '성인의 경우 일반적으로 7-9시간의 수면이 권장됩니다. 하지만 개인차가 있으므로, 낮에 피로감 없이 활기차게 지낼 수 있는 시간이 본인에게 맞는 수면 시간입니다. 학생의 경우 8-10시간의 수면이 더 적절할 수 있어요.',
  '잠이 잘 안 와요. 어떻게 해야 하나요?': '불면증 해결을 위한 몇 가지 방법을 제안드려요:\n\n1. 규칙적인 수면 스케줄 유지\n2. 취침 전 카페인, 알코올 피하기\n3. 편안한 수면 환경 조성 (어둡고 시원하게)\n4. 취침 전 휴대폰, TV 사용 줄이기\n5. 이완 기법 (명상, 깊은 호흡) 실천\n\n지속적인 불면증이 있다면 전문의 상담을 받아보시는 것을 권합니다.',
  '꿈을 많이 꾸는 것이 정상인가요?': '꿈을 꾸는 것은 완전히 정상적인 현상입니다! 사실 모든 사람이 매일 밤 꿈을 꾸지만, 깨어날 때 기억하지 못하는 경우가 많아요.\n\n꿈을 많이 기억하는 것은:\n- REM 수면 단계에서 깨어나는 경우\n- 스트레스나 감정적 변화가 있을 때\n- 수면의 질이 좋지 않을 때\n\n꿈 자체는 뇌가 하루 동안의 정보를 정리하고 처리하는 중요한 과정이니 걱정하지 마세요!'
};

// 커뮤니티 게시글 (모의 데이터)
const MOCK_POSTS = [
  {
    id: 1,
    title: '일찍 자는 습관 만들기 - 30일 도전 후기',
    content: '30일 동안 11시 전에 자기로 도전했는데 정말 삶이 달라졌어요! 아침에 일어나기 훨씬 수월해지고 하루 종일 에너지가 넘쳐요. 가장 중요한 건 핸드폰을 침실에서 빼는 것이었던 것 같아요.',
    author: '일찍자는학생',
    category: 'tip',
    time: '2시간 전',
    likes: 24,
    comments: 8,
    liked: false
  },
  {
    id: 2,
    title: '수면의 질을 높이는 방법 공유해요',
    content: '제가 수면의 질을 높이기 위해 실천하고 있는 방법들이에요:\n1. 취침 1시간 전 족욕\n2. 라벤더 아로마 테라피\n3. 일기 쓰기로 하루 정리\n4. 명상 앱 사용\n\n특히 족욕이 정말 효과가 좋더라구요!',
    author: '꿀잠러버',
    category: 'tip',
    time: '5시간 전',
    likes: 18,
    comments: 12,
    liked: true
  },
  {
    id: 3,
    title: '시험기간 수면 패턴 어떻게 관리하세요?',
    content: '다음 주부터 중간고사인데 공부하다 보면 자꾸 밤 늦게 자게 되네요. 시험기간에도 규칙적인 수면을 유지하는 방법이 있을까요? 경험담 공유해주세요!',
    author: '수험생123',
    category: 'question',
    time: '1일 전',
    likes: 7,
    comments: 15,
    liked: false
  }
];

// DOM 로드 완료 시 초기화
document.addEventListener('DOMContentLoaded', function() {
  showLoadingScreen();
  setTimeout(() => {
    hideLoadingScreen();
    initializeApp();
  }, 2000);
});

// 로딩 화면 관리
function showLoadingScreen() {
  document.getElementById('loading-screen').style.display = 'flex';
  document.getElementById('app-container').classList.add('hidden');
}

function hideLoadingScreen() {
  document.getElementById('loading-screen').style.display = 'none';
  document.getElementById('app-container').classList.remove('hidden');
}

// 앱 초기화
function initializeApp() {
  loadUserData();
  setupNavigation();
  setupSleepQualityButtons();
  setupViewToggle();
  setupRankingTabs();
  setupCommunityTabs();
  setupChatInput();
  updateDashboard();
  renderSleepChart();
  renderBadges();
  renderRanking('sleep-time');
  renderCommunityPosts();
  initializeChatHistory();
  renderSleepHistory();
}

// 데이터 로드 및 저장
function loadUserData() {
  const savedData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
  if (savedData) {
    currentUser = { ...currentUser, ...JSON.parse(savedData) };
  }
  
  const savedSleepData = localStorage.getItem(STORAGE_KEYS.SLEEP_DATA);
  if (savedSleepData) {
    currentUser.sleepData = JSON.parse(savedSleepData);
  }
  
  const savedPosts = localStorage.getItem(STORAGE_KEYS.POSTS);
  if (savedPosts) {
    currentUser.posts = JSON.parse(savedPosts);
  } else {
    currentUser.posts = [...MOCK_POSTS];
  }
  
  const savedChatHistory = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
  if (savedChatHistory) {
    currentUser.chatHistory = JSON.parse(savedChatHistory);
  }
}

function saveUserData() {
  localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify({
    level: currentUser.level,
    points: currentUser.points,
    badges: currentUser.badges,
    sleepGoal: currentUser.sleepGoal
  }));
  localStorage.setItem(STORAGE_KEYS.SLEEP_DATA, JSON.stringify(currentUser.sleepData));
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(currentUser.posts));
  localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(currentUser.chatHistory));
}

// 네비게이션 설정
function setupNavigation() {
  const navTabs = document.querySelectorAll('.nav-tab');
  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.dataset.tab;
      switchTab(targetTab);
    });
  });
}

function switchTab(tabName) {
  // 네비게이션 탭 활성화
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
  
  // 콘텐츠 탭 활성화
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });
  document.getElementById(tabName).classList.add('active');
  
  // 특정 탭 로드 시 추가 작업
  if (tabName === 'tracking') {
    renderSleepChart();
  } else if (tabName === 'rewards') {
    renderBadges();
    renderRanking('sleep-time');
  } else if (tabName === 'community') {
    renderCommunityPosts();
  }
}

// 수면 질 버튼 설정
function setupSleepQualityButtons() {
  const qualityButtons = document.querySelectorAll('.quality-btn');
  qualityButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      qualityButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedSleepQuality = parseInt(btn.dataset.quality);
    });
  });
}

// 뷰 토글 설정
function setupViewToggle() {
  const toggleButtons = document.querySelectorAll('.toggle-btn');
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSleepChart(btn.dataset.period);
    });
  });
}

// 랭킹 탭 설정
function setupRankingTabs() {
  const rankingTabs = document.querySelectorAll('.ranking-tab');
  rankingTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      rankingTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderRanking(tab.dataset.ranking);
    });
  });
}

// 커뮤니티 탭 설정
function setupCommunityTabs() {
  const communityTabs = document.querySelectorAll('.community-tab');
  communityTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      communityTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderCommunityPosts(tab.dataset.filter);
    });
  });
}

// 채팅 입력 설정
function setupChatInput() {
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-btn');
  
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  sendBtn.addEventListener('click', sendMessage);
}

// 대시보드 업데이트
function updateDashboard() {
  // 사용자 레벨 및 포인트 업데이트
  document.getElementById('user-level').textContent = currentUser.level;
  document.getElementById('user-points').textContent = currentUser.points;
  document.getElementById('current-level').textContent = currentUser.level;
  
  // 레벨 진행률 계산
  const pointsForNextLevel = currentUser.level * 100;
  const currentLevelPoints = currentUser.points % 100;
  const progressPercentage = (currentLevelPoints / pointsForNextLevel) * 100;
  document.getElementById('level-progress').style.width = progressPercentage + '%';
  document.getElementById('points-to-next').textContent = pointsForNextLevel - currentLevelPoints;
  
  // 퀵 스탯 업데이트
  updateQuickStats();
}

function updateQuickStats() {
  const lastSleepDuration = document.getElementById('last-sleep-duration');
  const weeklyGoalProgress = document.getElementById('weekly-goal-progress');
  const currentRank = document.getElementById('current-rank');
  
  if (currentUser.sleepData.length > 0) {
    const lastSleep = currentUser.sleepData[currentUser.sleepData.length - 1];
    lastSleepDuration.textContent = lastSleep.duration.toFixed(1) + '시간';
    
    // 주간 목표 달성률 계산
    const weeklyData = currentUser.sleepData.slice(-7);
    const goalAchievement = weeklyData.filter(d => d.duration >= currentUser.sleepGoal).length;
    const progressPercent = Math.round((goalAchievement / 7) * 100);
    weeklyGoalProgress.textContent = progressPercent + '%';
  } else {
    lastSleepDuration.textContent = '0시간';
    weeklyGoalProgress.textContent = '0%';
  }
  
  // 현재 랭킹 (모의 데이터 기반)
  currentRank.textContent = '#4';
}

// 수면 기록 저장
function saveSleepRecord() {
  const bedtime = document.getElementById('bedtime').value;
  const waketime = document.getElementById('waketime').value;
  
  if (!bedtime || !waketime || !selectedSleepQuality) {
    alert('모든 정보를 입력해주세요.');
    return;
  }
  
  // 수면 시간 계산
  const bedDate = new Date(`2000-01-01 ${bedtime}`);
  const wakeDate = new Date(`2000-01-01 ${waketime}`);
  
  // 다음날 기상인 경우 처리
  if (wakeDate < bedDate) {
    wakeDate.setDate(wakeDate.getDate() + 1);
  }
  
  const duration = (wakeDate - bedDate) / (1000 * 60 * 60); // 시간 단위
  
  const sleepRecord = {
    date: new Date().toISOString().split('T')[0],
    bedtime,
    waketime,
    duration,
    quality: selectedSleepQuality,
    timestamp: Date.now()
  };
  
  currentUser.sleepData.push(sleepRecord);
  
  // 포인트 및 레벨 업데이트
  addPoints(20);
  
  // 뱃지 확인
  checkBadges();
  
  saveUserData();
  updateDashboard();
  renderSleepChart();
  renderSleepHistory();
  
  // 입력 필드 리셋
  document.getElementById('bedtime').value = '';
  document.getElementById('waketime').value = '';
  selectedSleepQuality = null;
  document.querySelectorAll('.quality-btn').forEach(btn => {
    btn.classList.remove('selected');
  });
  
  alert('수면 기록이 저장되었습니다!');
}

// 포인트 추가 및 레벨업 처리
function addPoints(points) {
  currentUser.points += points;
  
  const requiredPoints = currentUser.level * 100;
  if (currentUser.points >= requiredPoints) {
    currentUser.level++;
    currentUser.points = currentUser.points % requiredPoints;
    
    // 레벨업 알림
    alert(`축하합니다! 레벨 ${currentUser.level}에 도달했습니다!`);
    
    // 레벨업 뱃지 확인
    if (currentUser.level >= 5 && !currentUser.badges.includes('level_up')) {
      awardBadge('level_up');
    }
  }
}

// 뱃지 시스템
function checkBadges() {
  // 첫 기록 뱃지
  if (currentUser.sleepData.length === 1 && !currentUser.badges.includes('first_record')) {
    awardBadge('first_record');
  }
  
  // 일주일 연속 기록 뱃지
  if (currentUser.sleepData.length >= 7 && !currentUser.badges.includes('week_streak')) {
    const lastWeek = currentUser.sleepData.slice(-7);
    const consecutiveDays = checkConsecutiveDays(lastWeek);
    if (consecutiveDays >= 7) {
      awardBadge('week_streak');
    }
  }
  
  // 목표 달성자 뱃지
  const recentSleep = currentUser.sleepData[currentUser.sleepData.length - 1];
  if (recentSleep.duration >= currentUser.sleepGoal && !currentUser.badges.includes('goal_achiever')) {
    awardBadge('goal_achiever');
  }
  
  // 일찍 일어나는 새 뱃지
  const wakeHour = parseInt(recentSleep.waketime.split(':')[0]);
  if (wakeHour < 6 && !currentUser.badges.includes('early_bird')) {
    awardBadge('early_bird');
  }
  
  // 좋은 수면 질 뱃지
  if (currentUser.sleepData.length >= 5) {
    const lastFive = currentUser.sleepData.slice(-5);
    const goodQuality = lastFive.every(sleep => sleep.quality >= 4);
    if (goodQuality && !currentUser.badges.includes('quality_sleeper')) {
      awardBadge('quality_sleeper');
    }
  }
}

function awardBadge(badgeId) {
  currentUser.badges.push(badgeId);
  const badge = BADGES[badgeId.toUpperCase()];
  alert(`🎉 새로운 뱃지를 획득했습니다!\n${badge.icon} ${badge.name}\n${badge.description}`);
  addPoints(50); // 뱃지 획득 시 보너스 포인트
}

function checkConsecutiveDays(sleepData) {
  let consecutive = 0;
  let currentDate = new Date();
  
  for (let i = sleepData.length - 1; i >= 0; i--) {
    const sleepDate = new Date(sleepData[i].date);
    const diffDays = Math.floor((currentDate - sleepDate) / (1000 * 60 * 60 * 24));
    
    if (diffDays === consecutive) {
      consecutive++;
    } else {
      break;
    }
  }
  
  return consecutive;
}

// 차트 렌더링
function renderSleepChart(period = 'daily') {
  const ctx = document.getElementById('sleepChart').getContext('2d');
  
  if (sleepChart) {
    sleepChart.destroy();
  }
  
  let chartData = prepareChartData(period);
  
  sleepChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: chartData.labels,
      datasets: [{
        label: '수면 시간 (시간)',
        data: chartData.sleepHours,
        borderColor: '#4A90E2',
        backgroundColor: 'rgba(74, 144, 226, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4
      }, {
        label: '수면 질 점수',
        data: chartData.qualityScores,
        borderColor: '#7ED321',
        backgroundColor: 'rgba(126, 211, 33, 0.1)',
        borderWidth: 3,
        fill: false,
        tension: 0.4,
        yAxisID: 'y1'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index'
      },
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: `수면 패턴 분석 (${period === 'daily' ? '일별' : period === 'weekly' ? '주별' : '월별'})`
        }
      },
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          min: 0,
          max: 12,
          title: {
            display: true,
            text: '수면 시간 (시간)'
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          min: 1,
          max: 5,
          title: {
            display: true,
            text: '수면 질 점수'
          },
          grid: {
            drawOnChartArea: false,
          },
        }
      }
    }
  });
}

function prepareChartData(period) {
  let data = [...currentUser.sleepData];
  
  if (data.length === 0) {
    // 모의 데이터 생성
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toISOString().split('T')[0],
        duration: 7 + Math.random() * 2,
        quality: Math.floor(Math.random() * 3) + 3
      });
    }
  }
  
  // 최근 7일 데이터만 사용 (간단한 구현)
  data = data.slice(-7);
  
  return {
    labels: data.map(d => {
      const date = new Date(d.date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }),
    sleepHours: data.map(d => d.duration),
    qualityScores: data.map(d => d.quality)
  };
}

// 수면 기록 히스토리 렌더링
function renderSleepHistory() {
  const historyList = document.getElementById('sleep-history-list');
  const recentData = currentUser.sleepData.slice(-10).reverse();
  
  if (recentData.length === 0) {
    historyList.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">아직 수면 기록이 없습니다.</p>';
    return;
  }
  
  historyList.innerHTML = recentData.map(sleep => `
    <div class="history-item">
      <div>
        <strong>${sleep.date}</strong>
        <p>${sleep.bedtime} ~ ${sleep.waketime}</p>
      </div>
      <div style="text-align: right;">
        <strong>${sleep.duration.toFixed(1)}시간</strong>
        <p>수면 질: ${'★'.repeat(sleep.quality)}${'☆'.repeat(5 - sleep.quality)}</p>
      </div>
    </div>
  `).join('');
}

// 뱃지 렌더링
function renderBadges() {
  const badgeGrid = document.getElementById('badge-grid');
  
  badgeGrid.innerHTML = Object.values(BADGES).map(badge => {
    const earned = currentUser.badges.includes(badge.id);
    return `
      <div class="badge-item ${earned ? 'earned' : ''}">
        <div class="badge-icon">${badge.icon}</div>
        <div class="badge-name">${badge.name}</div>
      </div>
    `;
  }).join('');
}

// 랭킹 렌더링
function renderRanking(type) {
  const rankingList = document.getElementById('ranking-list');
  const data = MOCK_RANKING_DATA[type];
  
  rankingList.innerHTML = data.map(item => {
    let positionClass = 'other';
    if (item.rank === 1) positionClass = 'gold';
    else if (item.rank === 2) positionClass = 'silver';
    else if (item.rank === 3) positionClass = 'bronze';
    
    return `
      <div class="ranking-item">
        <div class="ranking-position ${positionClass}">
          ${item.rank}
        </div>
        <div style="flex: 1;">
          <strong>${item.name}</strong>
        </div>
        <div style="font-weight: 600; color: var(--primary-color);">
          ${item.score}
        </div>
      </div>
    `;
  }).join('');
}

// AI 채팅 시스템
function sendMessage() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  
  if (!message) return;
  
  // 사용자 메시지 추가
  addChatMessage(message, 'user');
  
  // AI 응답 생성 (지연 후)
  setTimeout(() => {
    const response = generateAIResponse(message);
    addChatMessage(response, 'ai');
  }, 1000);
  
  input.value = '';
}

function addChatMessage(message, sender) {
  const chatMessages = document.getElementById('chat-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}-message`;
  
  const currentTime = new Date().toLocaleTimeString('ko-KR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  messageDiv.innerHTML = `
    <div class="message-avatar">
      <i class="fas fa-${sender === 'user' ? 'user' : 'robot'}"></i>
    </div>
    <div class="message-content">
      <p>${message.replace(/\n/g, '<br>')}</p>
      <div class="message-time">${currentTime}</div>
    </div>
  `;
  
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  
  // 채팅 기록 저장
  currentUser.chatHistory.push({
    message,
    sender,
    timestamp: Date.now()
  });
  saveUserData();
}

function generateAIResponse(message) {
  // 미리 정의된 응답 확인
  for (const [key, response] of Object.entries(AI_RESPONSES)) {
    if (message.includes(key) || key.includes(message)) {
      return response;
    }
  }
  
  // 키워드 기반 응답
  if (message.includes('시간') || message.includes('수면') || message.includes('잠')) {
    return '수면과 관련된 질문이시군요! 구체적으로 어떤 부분이 궁금하신지 알려주시면 더 자세한 답변을 드릴 수 있어요. 수면 시간, 수면의 질, 불면증 등 어떤 주제에 대해 알고 싶으신가요?';
  }
  
  if (message.includes('스트레스') || message.includes('불안')) {
    return '스트레스와 불안은 수면에 큰 영향을 미칩니다. 다음과 같은 방법들을 시도해보세요:\n\n1. 취침 전 일기 쓰기로 하루 정리\n2. 명상이나 깊은 호흡 연습\n3. 규칙적인 운동 (단, 취침 3시간 전까지)\n4. 카페인 섭취 줄이기\n\n지속적인 스트레스가 있다면 상담사나 전문가의 도움을 받아보시는 것도 좋습니다.';
  }
  
  if (message.includes('운동') || message.includes('활동')) {
    return '운동은 수면의 질을 크게 향상시킵니다! 하지만 타이밍이 중요해요:\n\n✅ 좋은 시간: 오전이나 오후 일찍\n✅ 추천 운동: 가벼운 조깅, 요가, 스트레칭\n❌ 피할 시간: 취침 3시간 이내\n\n규칙적인 운동은 깊은 수면을 도와주고 스트레스도 해소해줍니다.';
  }
  
  // 일반적인 응답
  const genericResponses = [
    '흥미로운 질문이네요! 수면과 관련해서 더 구체적으로 설명해주시면 도움을 드릴 수 있을 것 같아요.',
    '수면 전문가로서 도움을 드리고 싶지만, 조금 더 자세한 정보가 필요해요. 어떤 상황인지 설명해주시겠어요?',
    '좋은 질문입니다! 수면 건강은 정말 중요한 주제죠. 구체적으로 어떤 부분이 궁금하신가요?'
  ];
  
  return genericResponses[Math.floor(Math.random() * genericResponses.length)];
}

function askQuickQuestion(question) {
  document.getElementById('chat-input').value = question;
  sendMessage();
}

function clearChat() {
  if (confirm('채팅 기록을 모두 삭제하시겠습니까?')) {
    document.getElementById('chat-messages').innerHTML = `
      <div class="message ai-message">
        <div class="message-avatar">
          <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
          <p>안녕하세요! 수면 전문 AI 상담사입니다. 수면에 관련된 어떤 질문이든 편하게 물어보세요! 😊</p>
          <div class="message-time">방금 전</div>
        </div>
      </div>
    `;
    currentUser.chatHistory = [];
    saveUserData();
  }
}

function initializeChatHistory() {
  if (currentUser.chatHistory.length === 0) return;
  
  const chatMessages = document.getElementById('chat-messages');
  chatMessages.innerHTML = `
    <div class="message ai-message">
      <div class="message-avatar">
        <i class="fas fa-robot"></i>
      </div>
      <div class="message-content">
        <p>안녕하세요! 수면 전문 AI 상담사입니다. 수면에 관련된 어떤 질문이든 편하게 물어보세요! 😊</p>
        <div class="message-time">방금 전</div>
      </div>
    </div>
  `;
  
  currentUser.chatHistory.forEach(chat => {
    addChatMessage(chat.message, chat.sender);
  });
}

// 커뮤니티 기능
function renderCommunityPosts(filter = 'all') {
  const postsContainer = document.getElementById('posts-container');
  let posts = [...currentUser.posts];
  
  // 필터링
  if (filter !== 'all') {
    if (filter === 'popular') {
      posts = posts.filter(post => post.likes > 15);
    } else if (filter === 'recent') {
      posts = posts.sort((a, b) => b.id - a.id);
    } else if (filter === 'tips') {
      posts = posts.filter(post => post.category === 'tip');
    }
  }
  
  postsContainer.innerHTML = posts.map(post => `
    <div class="post-item">
      <div class="post-header">
        <div class="post-info">
          <div class="post-title">${post.title}</div>
          <div class="post-meta">
            <span class="post-category">${getCategoryName(post.category)}</span>
            <span>${post.author}</span>
            <span>${post.time}</span>
          </div>
        </div>
      </div>
      <div class="post-content">
        ${post.content.replace(/\n/g, '<br>')}
      </div>
      <div class="post-actions">
        <button class="post-action ${post.liked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
          <i class="fas fa-heart"></i>
          <span>${post.likes}</span>
        </button>
        <button class="post-action">
          <i class="fas fa-comment"></i>
          <span>${post.comments}</span>
        </button>
        <button class="post-action">
          <i class="fas fa-share"></i>
          <span>공유</span>
        </button>
      </div>
    </div>
  `).join('');
}

function getCategoryName(category) {
  const categoryNames = {
    'tip': '꿀팁',
    'question': '질문',
    'experience': '경험담',
    'general': '일반'
  };
  return categoryNames[category] || '일반';
}

function toggleLike(postId) {
  const post = currentUser.posts.find(p => p.id === postId);
  if (post) {
    if (post.liked) {
      post.likes--;
      post.liked = false;
    } else {
      post.likes++;
      post.liked = true;
    }
    saveUserData();
    renderCommunityPosts();
  }
}

// 모달 관리
function showNewPostModal() {
  document.getElementById('new-post-modal').classList.add('active');
}

function closeNewPostModal() {
  document.getElementById('new-post-modal').classList.remove('active');
  // 폼 리셋
  document.getElementById('post-title').value = '';
  document.getElementById('post-content').value = '';
  document.getElementById('post-category').value = 'tip';
}

function submitNewPost() {
  const title = document.getElementById('post-title').value.trim();
  const content = document.getElementById('post-content').value.trim();
  const category = document.getElementById('post-category').value;
  
  if (!title || !content) {
    alert('제목과 내용을 모두 입력해주세요.');
    return;
  }
  
  const newPost = {
    id: Date.now(),
    title,
    content,
    category,
    author: '나',
    time: '방금 전',
    likes: 0,
    comments: 0,
    liked: false
  };
  
  currentUser.posts.unshift(newPost);
  addPoints(30); // 게시글 작성 보너스
  
  // 커뮤니티 스타 뱃지 확인
  if (newPost.likes > 20 && !currentUser.badges.includes('community_star')) {
    awardBadge('community_star');
  }
  
  saveUserData();
  renderCommunityPosts();
  closeNewPostModal();
  updateDashboard();
  
  alert('게시글이 등록되었습니다!');
}

// 기타 기능들
function showSleepRecord() {
  switchTab('tracking');
}

function showRecommendations() {
  const recommendations = generatePersonalizedRecommendations();
  alert(`🌙 개인 맞춤 수면 추천\n\n${recommendations}`);
}

function generatePersonalizedRecommendations() {
  if (currentUser.sleepData.length === 0) {
    return '수면 기록을 먼저 등록해주세요. 데이터가 쌓이면 개인 맞춤 추천을 제공해드릴 수 있습니다!';
  }
  
  const recentData = currentUser.sleepData.slice(-7);
  const avgDuration = recentData.reduce((sum, d) => sum + d.duration, 0) / recentData.length;
  const avgQuality = recentData.reduce((sum, d) => sum + d.quality, 0) / recentData.length;
  
  let recommendations = [];
  
  if (avgDuration < currentUser.sleepGoal) {
    recommendations.push('• 평균 수면시간이 목표보다 부족합니다. 30분 일찍 자보세요.');
  }
  
  if (avgQuality < 3.5) {
    recommendations.push('• 수면의 질 개선이 필요합니다. 취침 전 스마트폰 사용을 줄여보세요.');
    recommendations.push('• 침실 온도를 18-20도로 유지해보세요.');
  }
  
  if (recommendations.length === 0) {
    recommendations.push('• 훌륭한 수면 패턴을 유지하고 계시네요!');
    recommendations.push('• 현재 패턴을 꾸준히 유지해보세요.');
  }
  
  return recommendations.join('\n');
}

// 모달 외부 클릭 시 닫기
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove('active');
  }
});