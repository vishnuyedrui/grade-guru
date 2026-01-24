-- 1. Create a public view for resources that excludes created_by for non-admins
CREATE OR REPLACE VIEW public.resources_public
WITH (security_invoker = on) AS
SELECT 
  id,
  course_id,
  chapter_id,
  resource_type,
  title,
  description,
  url,
  file_path,
  created_at,
  updated_at
FROM public.resources;

-- 2. Restrict has_role function to only check the calling user's role (prevents user enumeration)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()  -- Only check the calling user's own role
      AND role = _role
  )
$$;

-- 3. Configure the resources storage bucket with file size limit and allowed MIME types
UPDATE storage.buckets 
SET 
  file_size_limit = 52428800,  -- 50MB limit
  allowed_mime_types = ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'image/png',
    'image/jpeg',
    'image/gif',
    'image/webp'
  ]
WHERE id = 'resources';