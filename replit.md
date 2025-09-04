# Sleep Better - 학생 수면 관리 앱

## Overview

Sleep Better is a comprehensive sleep management application designed specifically for students to track, analyze, and improve their sleep habits. The app features a gamified experience with levels, points, and badges to encourage consistent sleep tracking. It includes sleep data visualization, community features, goal setting, and personalized recommendations to help students develop better sleep hygiene.

## Recent Changes

### September 04, 2025 - Complete Application Implementation
- ✅ Full HTML structure with all 5 main sections (홈, 기록, 보상, AI 상담, 커뮤니티)
- ✅ Comprehensive CSS styling with responsive design and mobile-first approach
- ✅ Complete JavaScript functionality with all requested features
- ✅ Workflow configured with Python HTTP server on port 5000
- ✅ All core features implemented and fully functional

## User Preferences

Preferred communication style: Simple, everyday language.

## Current Features

### 1. 수면 기록·보상·랭킹 관련 기능 ✅
- **수면 기록**: 일별/주별/월별 수면 시간 기록, 수면 질 선택 입력
- **자동 시각화**: Chart.js를 활용한 그래프/차트 자동 생성
- **보상 시스템**: 포인트/레벨 지급, 뱃지 획득, 게임화 요소
- **보상 히스토리**: 획득한 뱃지 및 진행 상황 확인
- **랭킹 시스템**: 수면 시간, 목표 달성률, 활동 점수 기준 랭킹

### 2. AI 기반 개인 맞춤 진단·추천 기능 ✅
- **데이터 분석**: 수면 패턴 분석 및 개선 포인트 도출
- **맞춤 추천**: 개인별 수면 목표 및 개선 방안 제시
- **진행 상황 추적**: 수면 목표 달성률 및 주간 통계

### 3. 실시간 AI 질문 답변 기능 ✅
- **AI 챗봇**: 수면 관련 질문 즉시 답변
- **대화 기록**: 이전 질문/답변 기록 조회
- **FAQ 추천**: 자주 묻는 질문 바로가기 버튼
- **키워드 인식**: 스마트한 응답 생성

### 4. 학생 간 꿀팁 공유 및 커뮤니티 기능 ✅
- **게시판**: 꿀팁 공유 및 댓글 기능
- **상호작용**: 좋아요/추천 기능으로 인기 꿀팁 선정
- **카테고리**: 꿀팁, 질문, 경험담, 일반 분류
- **필터링**: 전체, 인기, 최신, 꿀팁별 필터

## System Architecture

### Frontend Architecture
- **Single Page Application (SPA)**: Built with vanilla HTML, CSS, and JavaScript
- **Component-based Structure**: Uses tab-based navigation with dynamic content switching
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox layouts
- **State Management**: Client-side state management using JavaScript objects and localStorage
- **UI Framework**: Custom CSS with Font Awesome icons and Chart.js for data visualization

### Data Storage
- **Local Storage**: Primary data persistence using browser localStorage
- **Data Structure**: JSON-based storage with separate keys for user data, sleep records, posts, and chat history
- **Storage Keys**: Organized with prefixed naming convention (`sleepApp_*`)

### Core Features Architecture
- **Gamification System**: Complete level and points system with 8 different badge achievements
- **Sleep Tracking**: Time-based sleep recording with quality ratings (1-5 scale)
- **Data Visualization**: Chart.js integration for dual-axis sleep pattern analysis
- **Community Features**: Full social posting system with likes, comments, and categories
- **Ranking System**: Comparative analytics with mock ranking data across multiple metrics
- **AI System**: Mock AI responses with keyword recognition and contextual answers

### Design Patterns
- **Module Pattern**: Organized code structure with clear separation of concerns
- **Observer Pattern**: Event-driven interactions for tab switching and user actions
- **MVC-like Structure**: Separation of data (models), presentation (views), and logic (controllers)

### User Experience Design
- **Progressive Enhancement**: Loading screen with smooth transitions
- **Responsive Navigation**: Bottom tab navigation for mobile usability
- **Visual Feedback**: CSS animations and transitions for user interactions
- **Accessibility**: Semantic HTML structure with ARIA considerations

## File Structure

```
/
├── index.html          # Main HTML structure with all app sections
├── style.css          # Comprehensive CSS with responsive design
├── script.js          # Complete JavaScript functionality
└── replit.md          # Project documentation
```

## External Dependencies

### Third-party Libraries
- **Chart.js**: Data visualization library for sleep pattern charts and analytics
- **Font Awesome 6.0.0**: Icon library for consistent UI iconography

### Browser APIs
- **localStorage API**: Client-side data persistence
- **Date API**: Time and date calculations for sleep tracking
- **DOM API**: Dynamic content manipulation and event handling

### Asset Dependencies
- **Google Fonts**: Inter font family for typography
- **CDN Services**: External CDN for Font Awesome and Chart.js delivery

## Badge System

### Available Badges
- 🎯 **첫 기록**: 첫 수면 기록 완료
- 🔥 **일주일 도전**: 7일 연속 기록
- ⭐ **목표 달성자**: 수면 목표 달성
- 🐦 **일찍 일어나는 새**: 6시 전 기상
- 🦉 **올빼미**: 자정 후 취침
- 💤 **깊은 잠**: 좋은 수면 질 5일 연속
- 🌟 **커뮤니티 스타**: 인기 게시글 작성
- 🚀 **레벨업**: 레벨 5 달성

## Technical Implementation

The application is fully implemented with:
- Comprehensive sleep tracking with data visualization
- Complete gamification system with points, levels, and badges
- Interactive AI chatbot with contextual responses
- Community features with post creation, likes, and filtering
- Responsive design optimized for mobile and desktop
- Local storage persistence for all user data

Note: The current implementation uses client-side storage and mock AI responses. Future iterations may integrate with real AI services and backend databases for enhanced functionality.