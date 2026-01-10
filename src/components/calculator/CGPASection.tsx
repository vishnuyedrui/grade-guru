import { calculateCGPA } from "@/types/calculator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, Calculator, ArrowRight } from "lucide-react";
import { useState } from "react";

interface CGPASectionProps {
  currentSGPA: number;
  currentCredits: number;
}

export function CGPASection({ currentSGPA, currentCredits }: CGPASectionProps) {
  const [previousCGPA, setPreviousCGPA] = useState<string>('');
  const [previousCredits, setPreviousCredits] = useState<string>('');
  const [showResult, setShowResult] = useState(false);

  const canCalculate = previousCGPA !== '' && previousCredits !== '' && 
    parseFloat(previousCGPA) >= 0 && parseFloat(previousCGPA) <= 10 &&
    parseInt(previousCredits) > 0;

  const result = canCalculate ? calculateCGPA(
    currentSGPA,
    currentCredits,
    parseFloat(previousCGPA),
    parseInt(previousCredits)
  ) : null;

  return (
    <Card className="animate-fade-in gradient-orange border-2 border-orange-300/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-orange-600" />
          </div>
          Step 4: New CGPA Calculation (Optional)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-muted-foreground text-sm">
          Enter your previous academic record to calculate your updated cumulative GPA.
        </p>

        {/* Input Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="prev-cgpa">Previous CGPA</Label>
            <Input
              id="prev-cgpa"
              type="number"
              step={0.01}
              min={0}
              max={10}
              placeholder="e.g., 8.5"
              value={previousCGPA}
              onChange={(e) => {
                setPreviousCGPA(e.target.value);
                setShowResult(false);
              }}
              className="bg-card"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prev-credits">Previous Total Credits</Label>
            <Input
              id="prev-credits"
              type="number"
              min={1}
              placeholder="e.g., 120"
              value={previousCredits}
              onChange={(e) => {
                setPreviousCredits(e.target.value);
                setShowResult(false);
              }}
              className="bg-card"
            />
          </div>
        </div>

        {/* Current Semester Info */}
        <div className="bg-card rounded-lg border p-4">
          <h4 className="text-sm font-medium mb-2">Current Semester</h4>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>SGPA: <strong className="text-foreground">{currentSGPA.toFixed(2)}</strong></span>
            <span>•</span>
            <span>Credits: <strong className="text-foreground">{currentCredits}</strong></span>
          </div>
        </div>

        {/* Calculate Button */}
        {!showResult && (
          <div className="text-center">
            <Button 
              onClick={() => setShowResult(true)} 
              disabled={!canCalculate}
              className="bg-orange-500 hover:bg-orange-600"
            >
              <Calculator className="w-4 h-4 mr-2" />
              Calculate New CGPA
            </Button>
          </div>
        )}

        {/* Result */}
        {showResult && result && (
          <div className="space-y-6 animate-scale-in">
            {/* Formula */}
            <Card className="bg-muted/30 border-dashed">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2 text-orange-600">
                  <Calculator className="w-4 h-4" />
                  CGPA Formula
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="font-mono bg-card p-3 rounded border space-y-1">
                  <div className="text-muted-foreground text-xs">
                    New CGPA = [(Prev CGPA × Prev Credits) + (Current SGPA × Current Credits)] ÷ Total Credits
                  </div>
                  <div className="text-muted-foreground">
                    = [({previousCGPA} × {previousCredits}) + ({currentSGPA.toFixed(2)} × {currentCredits})] ÷ {result.totalCredits}
                  </div>
                  <div className="text-muted-foreground">
                    = [{(parseFloat(previousCGPA) * parseInt(previousCredits)).toFixed(2)} + {(currentSGPA * currentCredits).toFixed(2)}] ÷ {result.totalCredits}
                  </div>
                  <div className="text-muted-foreground">
                    = {result.totalGradePoints.toFixed(2)} ÷ {result.totalCredits}
                  </div>
                  <div className="text-foreground font-semibold text-lg">
                    New CGPA = <span className="text-orange-600">{result.cgpa.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CGPA Comparison */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-6 bg-card rounded-lg border">
              <div className="text-center">
                <div className="text-2xl font-bold text-muted-foreground">{previousCGPA}</div>
                <div className="text-xs text-muted-foreground">Previous CGPA</div>
              </div>
              <ArrowRight className="w-6 h-6 text-muted-foreground" />
              <div className="text-center">
                <div className="text-5xl font-bold text-orange-600">{result.cgpa.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground mt-1">New CGPA</div>
              </div>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Total Credits Completed: <strong className="text-foreground">{result.totalCredits}</strong>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}