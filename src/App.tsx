// File: src/App.tsx
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '@/components/ProtectedRoute';
import Loading from '@/components/ui/Loading';
import OfflineBanner from '@/components/ui/OfflineBanner';
import UpdatePrompt from '@/components/ui/UpdatePrompt';
import InstallBanner from '@/components/ui/InstallBanner';
import MainLayout from '@/components/MainLayout';
import AcademicLayout from '@/components/AcademicLayout';
import AdminLayout from '@/components/AdminLayout';
import Login from '@/pages/Login';
import AdminSetup from '@/pages/AdminSetup';
import Welcome from '@/pages/Welcome';
import Register from '@/pages/Register';
import Recovery from '@/pages/Recovery';
import ChangePassword from '@/pages/ChangePassword';
import NotFound from '@/pages/NotFound';
import VerifyCertificate from '@/pages/VerifyCertificate';

// Lazy-loaded pages
const UnifiedDashboard = lazy(() => import('@/pages/UnifiedDashboard'));
const Dashboard = lazy(() => import('@/pages/main/Dashboard'));
const Team = lazy(() => import('@/pages/main/Team'));
const Legal = lazy(() => import('@/pages/main/Legal'));
const Contact = lazy(() => import('@/pages/main/Contact'));
const Comparisons = lazy(() => import('@/pages/main/Comparisons'));
const Timeline = lazy(() => import('@/pages/main/Timeline'));
const Definitions = lazy(() => import('@/pages/main/Definitions'));
const Saudi = lazy(() => import('@/pages/main/Saudi'));
const Sources = lazy(() => import('@/pages/main/Sources'));
const ZKPLab = lazy(() => import('@/pages/main/ZKPLab'));
const AESLab = lazy(() => import('@/pages/main/AESLab'));
const ArchitecturePage = lazy(() => import('@/pages/ArchitecturePage'));
const Settings = lazy(() => import('@/pages/Settings'));
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
const AdminUsers = lazy(() => import('@/pages/admin/AdminUsers'));
const AdminCertificates = lazy(() => import('@/pages/admin/AdminCertificates'));
const AdminAudit = lazy(() => import('@/pages/admin/AdminAudit'));
const ManageChapters = lazy(() => import('@/pages/admin/ManageChapters'));
const AcademicCourses = lazy(() => import('@/pages/academic/AcademicCourses'));
const AcademicHomeRedirect = lazy(() => import('@/pages/academic/AcademicHomeRedirect'));
const CourseDetail = lazy(() => import('@/pages/academic/CourseDetail'));
const ChapterList = lazy(() => import('@/pages/academic/ChapterList'));
const ChapterDetail = lazy(() => import('@/pages/academic/ChapterDetail'));
const FinalQuiz = lazy(() => import('@/pages/academic/FinalQuiz'));
const Certificate = lazy(() => import('@/pages/Certificate'));
const Congratulations = lazy(() => import('@/pages/Congratulations'));
const KnowledgeGraph = lazy(() => import('@/pages/academic/KnowledgeGraph'));
const InteractiveLessonPage = lazy(() => import('@/pages/academic/InteractiveLessonPage'));
const Crypto3DPage = lazy(() => import('@/pages/academic/Crypto3DPage'));
const InteractiveHubPage = lazy(() => import('@/pages/academic/InteractiveHubPage'));
const CommunitiesPage = lazy(() => import('@/pages/academic/CommunitiesPage'));
const LiveBookPage = lazy(() => import('@/pages/academic/LiveBookPage'));
const EnglishCourseInteractive = lazy(() => import('@/pages/academic/EnglishCourseInteractive'));
const Students = lazy(() => import('@/pages/academic/Students'));
const SecurityAudit = lazy(() => import('@/pages/admin/SecurityAudit'));
const TestDashboard = lazy(() => import('@/pages/TestDashboard'));

export default function App() {
  return (
    <>
      <OfflineBanner />
      <UpdatePrompt />
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Auth Pages */}
          <Route path="/index.html" element={<Navigate to="/" replace />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setup" element={<AdminSetup />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recovery" element={<Recovery />} />
          <Route path="/change-password" element={<ChangePassword />} />

          {/* Public */}
          <Route path="/verify" element={<VerifyCertificate />} />
          <Route path="/verify/:hash" element={<VerifyCertificate />} />

          {/* الواجهة الأساسية المستقلة عند تسجيل الدخول: بوابة المشروع + نظام الترحيب بالمستخدم الجديد */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<UnifiedDashboard />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/portal" element={<UnifiedDashboard />} />
            <Route path="/unified" element={<UnifiedDashboard />} />
            <Route path="/about" element={<UnifiedDashboard />} />
            <Route path="/congratulations" element={<Congratulations />} />
          </Route>

          {/* بوابة المنصة الأساسية (المرصد التحليلي والمختبرات التشفيرية بدون تكرار لنبذة المشروع) */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/main" element={<Dashboard />} />
              <Route path="/observatory" element={<Dashboard />} />
              <Route path="/dashboard" element={<Navigate to="/main" replace />} />
              <Route path="/saudi" element={<Saudi />} />
              <Route path="/zkp-lab" element={<ZKPLab />} />
              <Route path="/aes-lab" element={<AESLab />} />
              <Route path="/sources" element={<Sources />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/architecture" element={<ArchitecturePage />} />
              <Route path="/main/comparisons" element={<Comparisons />} />
              <Route path="/main/timeline" element={<Timeline />} />
              <Route path="/main/definitions" element={<Definitions />} />
              <Route path="/legal" element={<Legal />} />
            </Route>
          </Route>

          {/* بوابة المنصة الأكاديمية (6 مقررات و64 فصلاً وكتاب تفاعلي 3D بدون تكرار للتبويبات) */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AcademicLayout />}>
              <Route path="/academic" element={<AcademicCourses />} />
              <Route path="/courses" element={<Navigate to="/academic" replace />} />
              <Route path="/academic/courses" element={<AcademicCourses />} />
              <Route path="/chapters" element={<Navigate to="/academic/ise243/chapters" replace />} />
              <Route path="/academic/chapters" element={<ChapterList />} />
              <Route path="/chapters/:id" element={<ChapterDetail />} />
              <Route path="/academic/chapters/:id" element={<ChapterDetail />} />
              <Route path="/academic/zkp-lab" element={<Navigate to="/zkp-lab" replace />} />
              <Route path="/academic/aes-lab" element={<Navigate to="/aes-lab" replace />} />
              <Route path="/quiz" element={<Navigate to="/academic/final-quiz" replace />} />
              <Route path="/academic/quiz" element={<FinalQuiz />} />
              <Route path="/academic/final-quiz" element={<FinalQuiz />} />
              <Route path="/certificate" element={<Navigate to="/academic/certificate" replace />} />
              <Route path="/academic/certificate" element={<Certificate />} />
              <Route path="/academic/students" element={<Students />} />
              <Route path="/academic/knowledge-graph" element={<KnowledgeGraph />} />
              <Route path="/academic/interactive-lesson" element={<InteractiveLessonPage />} />
              <Route path="/academic/interactive" element={<Navigate to="/academic/interactive-lesson" replace />} />
              <Route path="/interactive-lesson" element={<Navigate to="/academic/interactive-lesson" replace />} />
              <Route path="/academic/crypto-3d" element={<Crypto3DPage />} />
              <Route path="/academic/hub" element={<InteractiveHubPage />} />
              <Route path="/academic/communities" element={<CommunitiesPage />} />
              <Route path="/academic/live-book" element={<LiveBookPage />} />
              <Route path="/academic/english-course" element={<EnglishCourseInteractive />} />
              <Route path="/academic/english" element={<EnglishCourseInteractive />} />
              <Route path="/academic/course/english-mastery" element={<EnglishCourseInteractive />} />
              <Route path="/academic/english-mastery" element={<EnglishCourseInteractive />} />
              <Route path="/academic/english-mastery/chapters" element={<EnglishCourseInteractive />} />
              <Route path="/academic/eng-academic" element={<EnglishCourseInteractive />} />
              <Route path="/academic/eng-academic/chapters" element={<EnglishCourseInteractive />} />
              <Route path="/academic/:courseSlug" element={<AcademicHomeRedirect />} />
              <Route path="/academic/:courseSlug/details" element={<CourseDetail />} />
              <Route path="/academic/:courseSlug/chapters" element={<ChapterList />} />
              <Route path="/academic/:courseSlug/chapters/:id" element={<ChapterDetail />} />
            </Route>
          </Route>

          {/* الإعدادات وإدارة الحساب (متاحة لجميع المستخدمين المسجلين والمشرفين) */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/settings" element={<Settings />} />
              <Route path="/admin/settings" element={<Settings />} />
            </Route>
          </Route>

          {/* لوحة الإدارة المركزية (خاصة بالمشرف العام فقط) */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/chapters" element={<ManageChapters />} />
              <Route path="/admin/certificates" element={<AdminCertificates />} />
              <Route path="/admin/audit" element={<AdminAudit />} />
              <Route path="/admin/security" element={<SecurityAudit />} />
              <Route path="/admin/test" element={<TestDashboard />} />
              <Route path="/test" element={<TestDashboard />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <InstallBanner />
    </>
  );
}
