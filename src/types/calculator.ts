export interface Assessment {
  name: string;
  weight: number;
  gradePoint: number | null;
  // For "I" grade, store the actual marks entered
  marks?: number | null;
  // Store the selected grade label (e.g., "I", "L/AB", "Ab/R")
  gradeLabel?: string | null;
}

export interface Course {
  id: string;
  name: string;
  credits: number;
  assessments: Assessment[];
  wgp: number | null;
  letterGrade: string | null;
  finalGradePoint: number | null;
  hasLab?: boolean;
  labMarks?: number | null;
}

export interface GradeMapping {
  min: number;
  max: number;
  letter: string;
  point: number;
  color: string;
}

export const GRADE_MAPPINGS: GradeMapping[] = [
  { min: 9.01, max: 10, letter: 'O', point: 10, color: 'grade-o' },
  { min: 8.01, max: 9.0, letter: 'A+', point: 9, color: 'grade-a-plus' },
  { min: 7.01, max: 8.0, letter: 'A', point: 8, color: 'grade-a' },
  { min: 6.01, max: 7.0, letter: 'B+', point: 7, color: 'grade-b-plus' },
  { min: 5.01, max: 6.0, letter: 'B', point: 6, color: 'grade-b' },
  { min: 4.01, max: 5.0, letter: 'C', point: 5, color: 'grade-c' },
  { min: 4.0, max: 4.0, letter: 'P', point: 4, color: 'grade-p' },
  { min: 0, max: 3.99, letter: 'F', point: 0, color: 'grade-f' },
];

export const DEFAULT_ASSESSMENTS: Assessment[] = [
  { name: 'Sessional 1', weight: 0.30, gradePoint: null, marks: null, gradeLabel: null },
  { name: 'Sessional 2', weight: 0.45, gradePoint: null, marks: null, gradeLabel: null },
  { name: 'Learning Engagement', weight: 0.25, gradePoint: null, marks: null, gradeLabel: null },
];

export function createNewCourse(): Course {
  return {
    id: crypto.randomUUID(),
    name: '',
    credits: 3,
    assessments: DEFAULT_ASSESSMENTS.map(a => ({ ...a, marks: null, gradeLabel: null })),
    wgp: null,
    letterGrade: null,
    finalGradePoint: null,
  };
}

// Special grades that require marks input
export const SPECIAL_SESSIONAL_GRADES = ['I', 'P', 'Ab/R'];

// Check if marks input is required (when I, P, or Ab/R is selected in either sessional)
export function requiresMarksInput(assessments: Assessment[]): boolean {
  const sessional1 = assessments.find(a => a.name === 'Sessional 1');
  const sessional2 = assessments.find(a => a.name === 'Sessional 2');
  
  return (
    SPECIAL_SESSIONAL_GRADES.includes(sessional1?.gradeLabel || '') ||
    SPECIAL_SESSIONAL_GRADES.includes(sessional2?.gradeLabel || '')
  );
}

// Get total marks from both sessionals
export function getSessionalTotalMarks(assessments: Assessment[]): { total: number; s1Marks: number | null; s2Marks: number | null; bothEntered: boolean } {
  const sessional1 = assessments.find(a => a.name === 'Sessional 1');
  const sessional2 = assessments.find(a => a.name === 'Sessional 2');
  
  const s1Marks = sessional1?.marks ?? null;
  const s2Marks = sessional2?.marks ?? null;
  const bothEntered = s1Marks !== null && s2Marks !== null;
  const total = (s1Marks ?? 0) + (s2Marks ?? 0);
  
  return { total, s1Marks, s2Marks, bothEntered };
}

// Get grade point for special sessional grades based on total marks
export function getSessionalGradePoint(gradeLabel: string | null, totalMarks: number): number {
  if (!gradeLabel) return 0;
  
  // Ab/R always gets 0 regardless of total
  if (gradeLabel === 'Ab/R') return 0;
  
  // I and P get 4 if total >= 25, otherwise 0
  if (gradeLabel === 'I' || gradeLabel === 'P') {
    return totalMarks >= 25 ? 4 : 0;
  }
  
  return 0;
}

// Check if the course should get "F" grade due to special conditions
export function checkForFGrade(assessments: Assessment[]): { isF: boolean; reason: string } {
  const sessional1 = assessments.find(a => a.name === 'Sessional 1');
  const sessional2 = assessments.find(a => a.name === 'Sessional 2');
  const le = assessments.find(a => a.name === 'Learning Engagement');
  
  // Check if marks input is required
  const needsMarks = requiresMarksInput(assessments);
  
  if (needsMarks) {
    const { total, bothEntered } = getSessionalTotalMarks(assessments);
    
    // Only check if both marks are entered
    if (bothEntered) {
      // If total marks < 25, it's F
      if (total < 25) {
        return { isF: true, reason: 'Total marks < 25' };
      }
      
      // If total >= 25 and LE is L/AB, it's F
      if (le?.gradeLabel === 'L/AB') {
        return { isF: true, reason: 'Learning Engagement is L/AB' };
      }
    }
  } else {
    // No special grades, just check LE
    if (le?.gradeLabel === 'L/AB') {
      return { isF: true, reason: 'Learning Engagement is L/AB' };
    }
  }
  
  return { isF: false, reason: '' };
}

export function calculateWGP(assessments: Assessment[]): number | null {
  const allFilled = assessments.every(
    a => a.gradePoint !== null && a.gradePoint >= 0
  );
  if (!allFilled) return null;

  const rawWGP = assessments.reduce(
    (sum, a) => sum + (a.gradePoint! * a.weight),
    0
  );

  // ✅ ONLY CHANGE: CEIL THE WGP
  return Math.min(10, Math.ceil(rawWGP));
}


export function getGradeFromWGP(wgp: number): { letter: string; point: number; color: string } {
  if (wgp > 9.0) return { letter: 'O', point: 10, color: 'grade-o' };
  if (wgp > 8.0) return { letter: 'A+', point: 9, color: 'grade-a-plus' };
  if (wgp > 7.0) return { letter: 'A', point: 8, color: 'grade-a' };
  if (wgp > 6.0) return { letter: 'B+', point: 7, color: 'grade-b-plus' };
  if (wgp > 5.0) return { letter: 'B', point: 6, color: 'grade-b' };
  if (wgp > 4.0) return { letter: 'C', point: 5, color: 'grade-c' };
  if (wgp === 4.0) return { letter: 'P', point: 4, color: 'grade-p' };
  return { letter: 'F', point: 0, color: 'grade-f' };
}

export function calculateSGPA(courses: Course[]): { sgpa: number; totalCredits: number; totalGradePoints: number } | null {
  const validCourses = courses.filter(c => c.finalGradePoint !== null && c.credits > 0);
  if (validCourses.length === 0) return null;
  
  const totalCredits = validCourses.reduce((sum, c) => sum + c.credits, 0);
  const totalGradePoints = validCourses.reduce((sum, c) => sum + (c.credits * c.finalGradePoint!), 0);
  const sgpa = totalGradePoints / totalCredits;
  
  return { sgpa, totalCredits, totalGradePoints };
}

export function calculateCGPA(
  currentSGPA: number,
  currentCredits: number,
  previousCGPA: number,
  previousCredits: number
): { cgpa: number; totalCredits: number; totalGradePoints: number } {
  const previousGradePoints = previousCGPA * previousCredits;
  const currentGradePoints = currentSGPA * currentCredits;
  const totalCredits = previousCredits + currentCredits;
  const totalGradePoints = previousGradePoints + currentGradePoints;
  const cgpa = totalGradePoints / totalCredits;
  
  return { cgpa, totalCredits, totalGradePoints };
}

export function calculateFinalGradePointWithLab(
  wgp: number,
  labMarks: number
): number {
  const safeWGP = Math.min(10, Math.max(0, wgp));
  const safeLabMarks = Math.min(100, Math.max(0, labMarks));

  const theoryContribution = (safeWGP / 10) * 100 * 0.70;
  const labContribution = safeLabMarks * 0.30;

  const finalPercentage = theoryContribution + labContribution;
  return parseFloat((finalPercentage / 10).toFixed(2));
}
