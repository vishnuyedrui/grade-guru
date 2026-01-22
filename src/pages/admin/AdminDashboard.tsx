import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/hooks/useAdmin';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, BookOpen, FolderPlus, Users, LogOut, Loader2, Megaphone } from 'lucide-react';

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const { isAdmin, loading } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="container max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-bold">Admin Dashboard</h1>
                <p className="text-xs sm:text-sm text-muted-foreground truncate">{user?.email}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut} className="gap-1 sm:gap-2 flex-shrink-0">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {/* Manage Courses */}
          <Link to="/admin/courses">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader className="p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-2">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-base sm:text-lg">Manage Courses</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Add, edit, or remove courses
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 pt-0">
                <Button variant="secondary" className="w-full text-sm">
                  Go to Courses
                </Button>
              </CardContent>
            </Card>
          </Link>

          {/* Manage Resources */}
          <Link to="/admin/resources">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader className="p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-2">
                  <FolderPlus className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-base sm:text-lg">Manage Resources</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Upload YouTube, Drive links & materials
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 pt-0">
                <Button variant="secondary" className="w-full text-sm">
                  Go to Resources
                </Button>
              </CardContent>
            </Card>
          </Link>

          {/* Manage Announcements */}
          <Link to="/admin/announcements">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader className="p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-2">
                  <Megaphone className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle className="text-base sm:text-lg">Announcements</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Post WhatsApp groups & important notices
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 pt-0">
                <Button variant="secondary" className="w-full text-sm">
                  Go to Announcements
                </Button>
              </CardContent>
            </Card>
          </Link>

          {/* View Stats */}
          <Card className="h-full">
            <CardHeader className="p-4 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-2">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle className="text-base sm:text-lg">Platform Stats</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                View user statistics and usage
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6 pt-0">
              <Button variant="secondary" className="w-full text-sm" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
