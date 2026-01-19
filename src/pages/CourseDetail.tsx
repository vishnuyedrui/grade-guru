import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useChapters, useResources } from '@/hooks/useResources';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft, BookOpen, Youtube, FileText, Link as LinkIcon, Image, File, Loader2, ExternalLink } from 'lucide-react';

const RESOURCE_TYPE_INFO = {
  youtube_video: { label: 'YouTube Videos', icon: Youtube, color: 'text-red-500' },
  drive_link: { label: 'Drive Links', icon: LinkIcon, color: 'text-blue-500' },
  previous_paper: { label: 'Previous Papers', icon: FileText, color: 'text-orange-500' },
  syllabus: { label: 'Syllabus', icon: FileText, color: 'text-green-500' },
  notes: { label: 'Notes', icon: FileText, color: 'text-purple-500' },
  document: { label: 'Documents', icon: File, color: 'text-gray-500' },
  image: { label: 'Images', icon: Image, color: 'text-pink-500' },
};

interface Course {
  id: string;
  name: string;
  code: string;
}

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const { chapters, loading: chaptersLoading } = useChapters(id);
  const { resources, loading: resourcesLoading } = useResources(id);
  const [activeTab, setActiveTab] = useState('chapters');

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;

      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching course:', error);
        navigate('/courses');
        return;
      }

      setCourse(data);
      setLoading(false);
    };

    fetchCourse();
  }, [id, navigate]);

  const getResourcesByType = (type: string) => {
    return resources.filter((r) => r.resource_type === type);
  };

  const getResourcesByChapter = (chapterId: string) => {
    return resources.filter((r) => r.chapter_id === chapterId);
  };

  const getCourseWideResources = () => {
    return resources.filter((r) => !r.chapter_id);
  };

  if (loading || chaptersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!course) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="container max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/courses')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">{course.name}</h1>
                <p className="text-sm text-muted-foreground">{course.code}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="chapters">Chapters</TabsTrigger>
            <TabsTrigger value="resources">All Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="chapters" className="space-y-6">
            {chapters.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No chapters available yet.</p>
                </CardContent>
              </Card>
            ) : (
              <Accordion type="single" collapsible className="space-y-4">
                {chapters.map((chapter) => {
                  const chapterResources = getResourcesByChapter(chapter.id);
                  return (
                    <AccordionItem key={chapter.id} value={chapter.id} className="border rounded-lg px-4">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                            {chapter.chapter_number}
                          </span>
                          <span className="font-medium">{chapter.title}</span>
                          <span className="text-sm text-muted-foreground">
                            ({chapterResources.length} resources)
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4 pb-6">
                        {chapterResources.length === 0 ? (
                          <p className="text-sm text-muted-foreground text-center py-4">
                            No resources available for this chapter.
                          </p>
                        ) : (
                          <div className="grid gap-3">
                            {chapterResources.map((resource) => {
                              const typeInfo = RESOURCE_TYPE_INFO[resource.resource_type as keyof typeof RESOURCE_TYPE_INFO];
                              const Icon = typeInfo?.icon || File;
                              return (
                                <a
                                  key={resource.id}
                                  href={resource.url || resource.file_path || '#'}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors group"
                                >
                                  <Icon className={`w-5 h-5 ${typeInfo?.color || 'text-muted-foreground'}`} />
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium truncate">{resource.title}</p>
                                    {resource.description && (
                                      <p className="text-sm text-muted-foreground truncate">{resource.description}</p>
                                    )}
                                  </div>
                                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                              );
                            })}
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            )}

            {/* Course-wide resources */}
            {getCourseWideResources().length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">General Resources</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3">
                  {getCourseWideResources().map((resource) => {
                    const typeInfo = RESOURCE_TYPE_INFO[resource.resource_type as keyof typeof RESOURCE_TYPE_INFO];
                    const Icon = typeInfo?.icon || File;
                    return (
                      <a
                        key={resource.id}
                        href={resource.url || resource.file_path || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors group"
                      >
                        <Icon className={`w-5 h-5 ${typeInfo?.color || 'text-muted-foreground'}`} />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{resource.title}</p>
                          {resource.description && (
                            <p className="text-sm text-muted-foreground truncate">{resource.description}</p>
                          )}
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    );
                  })}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            {resourcesLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : resources.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No resources available yet.</p>
                </CardContent>
              </Card>
            ) : (
              Object.entries(RESOURCE_TYPE_INFO).map(([type, info]) => {
                const typeResources = getResourcesByType(type);
                if (typeResources.length === 0) return null;

                const Icon = info.icon;
                return (
                  <Card key={type}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Icon className={`w-5 h-5 ${info.color}`} />
                        {info.label} ({typeResources.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-3">
                      {typeResources.map((resource) => (
                        <a
                          key={resource.id}
                          href={resource.url || resource.file_path || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors group"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{resource.title}</p>
                            {resource.description && (
                              <p className="text-sm text-muted-foreground truncate">{resource.description}</p>
                            )}
                          </div>
                          <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ))}
                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CourseDetail;
