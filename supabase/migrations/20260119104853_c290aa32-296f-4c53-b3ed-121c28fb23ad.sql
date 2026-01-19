-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for secure role management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own role"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create branches table
CREATE TABLE public.branches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view branches"
ON public.branches FOR SELECT USING (true);

CREATE POLICY "Admins can manage branches"
ON public.branches FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create semesters table
CREATE TABLE public.semesters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    number INTEGER NOT NULL UNIQUE CHECK (number >= 1 AND number <= 8),
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.semesters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view semesters"
ON public.semesters FOR SELECT USING (true);

CREATE POLICY "Admins can manage semesters"
ON public.semesters FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create courses table (linked to semester and branch)
CREATE TABLE public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    semester_id UUID REFERENCES public.semesters(id) ON DELETE CASCADE NOT NULL,
    branch_id UUID REFERENCES public.branches(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(code, semester_id, branch_id)
);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view courses"
ON public.courses FOR SELECT USING (true);

CREATE POLICY "Admins can manage courses"
ON public.courses FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create chapters table
CREATE TABLE public.chapters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
    chapter_number INTEGER NOT NULL CHECK (chapter_number >= 1 AND chapter_number <= 5),
    title TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(course_id, chapter_number)
);

ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view chapters"
ON public.chapters FOR SELECT USING (true);

CREATE POLICY "Admins can manage chapters"
ON public.chapters FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create resource type enum
CREATE TYPE public.resource_type AS ENUM (
    'youtube_video',
    'drive_link',
    'previous_paper',
    'syllabus',
    'notes',
    'document',
    'image'
);

-- Create resources table
CREATE TABLE public.resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
    chapter_id UUID REFERENCES public.chapters(id) ON DELETE SET NULL,
    resource_type resource_type NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    url TEXT,
    file_path TEXT,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view resources"
ON public.resources FOR SELECT USING (true);

CREATE POLICY "Admins can manage resources"
ON public.resources FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Add trigger for resources updated_at
CREATE TRIGGER update_resources_updated_at
BEFORE UPDATE ON public.resources
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add semester and branch columns to profiles
ALTER TABLE public.profiles 
ADD COLUMN semester_id UUID REFERENCES public.semesters(id),
ADD COLUMN branch_id UUID REFERENCES public.branches(id);

-- Create storage bucket for resources
INSERT INTO storage.buckets (id, name, public)
VALUES ('resources', 'resources', true);

-- Storage policies for resources bucket
CREATE POLICY "Anyone can view resource files"
ON storage.objects FOR SELECT
USING (bucket_id = 'resources');

CREATE POLICY "Admins can upload resource files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'resources' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update resource files"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'resources' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete resource files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'resources' AND public.has_role(auth.uid(), 'admin'));

-- Insert default semesters
INSERT INTO public.semesters (number, name) VALUES
(1, 'Semester 1'),
(2, 'Semester 2'),
(3, 'Semester 3'),
(4, 'Semester 4'),
(5, 'Semester 5'),
(6, 'Semester 6'),
(7, 'Semester 7'),
(8, 'Semester 8');

-- Insert default branches
INSERT INTO public.branches (name, code) VALUES
('Computer Science Engineering', 'CSE'),
('Electronics & Communication Engineering', 'ECE'),
('Electrical & Electronics Engineering', 'EEE'),
('Mechanical Engineering', 'MECH'),
('Civil Engineering', 'CIVIL'),
('Information Technology', 'IT'),
('Artificial Intelligence & Machine Learning', 'AIML'),
('Data Science', 'DS');

-- Function to automatically create user role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$;

-- Trigger to create user role on signup
CREATE TRIGGER on_auth_user_created_role
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user_role();