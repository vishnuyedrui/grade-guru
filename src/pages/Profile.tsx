import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useUserProfile, useSemesters, useBranches } from '@/hooks/useResources';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, User, Save, Loader2 } from 'lucide-react';

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile, loading: profileLoading, fetchProfile, updateProfile } = useUserProfile();
  const { semesters, loading: semestersLoading } = useSemesters();
  const { branches, loading: branchesLoading } = useBranches();

  const [selectedSemester, setSelectedSemester] = useState<string>('');
  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile(user.id);
    }
  }, [user]);

  useEffect(() => {
    if (profile) {
      setSelectedSemester(profile.semester_id || '');
      setSelectedBranch(profile.branch_id || '');
    }
  }, [profile]);

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      await updateProfile(user.id, {
        semester_id: selectedSemester || undefined,
        branch_id: selectedBranch || undefined,
      });

      toast({
        title: 'Profile Updated',
        description: 'Your semester and branch have been updated.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const hasChanges = 
    selectedSemester !== (profile?.semester_id || '') || 
    selectedBranch !== (profile?.branch_id || '');

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="container max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-xl font-bold">Profile Settings</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* User Info */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <p className="text-sm font-medium p-3 bg-muted rounded-lg">
                {profile?.full_name || 'Not set'}
              </p>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <p className="text-sm font-medium p-3 bg-muted rounded-lg">
                {user?.email}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Academic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Academic Information</CardTitle>
            <CardDescription>
              Update your semester and branch to see relevant courses
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Semester</Label>
              <Select 
                value={selectedSemester} 
                onValueChange={setSelectedSemester}
                disabled={semestersLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your semester" />
                </SelectTrigger>
                <SelectContent>
                  {semesters.map((sem) => (
                    <SelectItem key={sem.id} value={sem.id}>
                      {sem.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Branch</Label>
              <Select 
                value={selectedBranch} 
                onValueChange={setSelectedBranch}
                disabled={branchesLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id}>
                      {branch.name} ({branch.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleSave} 
              disabled={saving || !hasChanges}
              className="w-full"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Profile;
