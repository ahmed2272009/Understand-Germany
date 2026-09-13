import React, { useState } from 'react';
import { Sidebar, PageId } from './components/layout/Sidebar';
import { BottomNav } from './components/layout/BottomNav';
import { TopBar } from './components/layout/TopBar';
import { HomePage } from './pages/HomePage';
import { TodayPage } from './pages/TodayPage';
import { LearnPage } from './pages/LearnPage';
import { PracticePage } from './pages/PracticePage';
import { GamesPage } from './pages/GamesPage';
import { ReviewPage } from './pages/ReviewPage';
import { ProgressPage } from './pages/ProgressPage';
import { ProfilePage } from './pages/ProfilePage';
import { LessonRunner } from './components/lesson/LessonRunner';
import { AdminPanel } from './components/admin/AdminPanel';
import { AuthModal } from './components/auth/AuthModal';
import { OnboardingTour } from './components/onboarding/OnboardingTour';
import { DayLesson } from './core/types/curriculum';

export const App: React.FC = () => {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [activeLesson, setActiveLesson] = useState<DayLesson | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showTour, setShowTour] = useState(() => {
    return !localStorage.getItem('deutschquest_tour_completed');
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row">
      {/* Desktop Left Sidebar (Fixed on md screens and up) */}
      {!activeLesson && (
        <Sidebar
          activePage={activePage}
          onNavigate={(page) => {
            setActivePage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Main Content Shell with desktop offset for fixed sidebar */}
      <div className={`flex-1 flex flex-col min-h-screen ${!activeLesson ? 'md:pl-64' : ''}`}>
        {/* Top Header / Gamification Status Bar */}
        <TopBar 
          onOpenAdmin={() => setShowAdmin(true)} 
          onOpenAuth={() => setShowAuth(true)}
          onOpenTour={() => setShowTour(true)}
        />

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto">
          {activeLesson ? (
            <div className="max-w-3xl mx-auto p-4 md:p-6 pb-24">
              <LessonRunner
                lesson={activeLesson}
                onBack={() => setActiveLesson(null)}
              />
            </div>
          ) : (
            <>
              {activePage === 'home' && (
                <HomePage
                  onSelectLesson={(lesson) => setActiveLesson(lesson)}
                  onNavigate={setActivePage}
                />
              )}
              {activePage === 'today' && (
                <TodayPage onStartLesson={(lesson) => setActiveLesson(lesson)} />
              )}
              {activePage === 'learn' && (
                <LearnPage onSelectLesson={(lesson) => setActiveLesson(lesson)} />
              )}
              {activePage === 'practice' && <PracticePage />}
              {activePage === 'games' && <GamesPage />}
              {activePage === 'review' && <ReviewPage />}
              {activePage === 'progress' && <ProgressPage />}
              {activePage === 'profile' && <ProfilePage />}
            </>
          )}
        </main>

        {/* Mobile Bottom Dock (hidden on md screens and up, hidden in LessonRunner) */}
        {!activeLesson && (
          <BottomNav
            activePage={activePage}
            onNavigate={(page) => {
              setActivePage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </div>

      {/* Admin Panel Modal */}
      {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}

      {/* Authentication Modal */}
      {showAuth && <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />}

      {/* Interactive Onboarding Tour */}
      {showTour && (
        <OnboardingTour
          isOpen={showTour}
          onClose={() => {
            setShowTour(false);
            localStorage.setItem('deutschquest_tour_completed', 'true');
          }}
          onStartLearning={() => {
            setShowTour(false);
            localStorage.setItem('deutschquest_tour_completed', 'true');
            setActivePage('today');
          }}
        />
      )}
    </div>
  );
};
