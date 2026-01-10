import { Assessment } from "@/types/calculator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";

interface WGPFormulaProps {
  assessments: Assessment[];
  wgp: number;
}

export function WGPFormula({ assessments, wgp }: WGPFormulaProps) {
  return (
    <Card className="bg-muted/30 border-dashed">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2 text-primary">
          <Calculator className="w-4 h-4" />
          Step-by-Step Calculation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="font-mono bg-card p-3 rounded border space-y-1">
          <div className="text-muted-foreground">WGP = (S1 × 0.30) + (S2 × 0.45) + (LE × 0.25)</div>
          <div className="text-muted-foreground">
            WGP = ({assessments[0].gradePoint?.toFixed(1)} × 0.30) + ({assessments[1].gradePoint?.toFixed(1)} × 0.45) + ({assessments[2].gradePoint?.toFixed(1)} × 0.25)
          </div>
          <div className="text-muted-foreground">
            WGP = {(assessments[0].gradePoint! * 0.30).toFixed(2)} + {(assessments[1].gradePoint! * 0.45).toFixed(2)} + {(assessments[2].gradePoint! * 0.25).toFixed(2)}
          </div>
          <div className="text-foreground font-semibold">
            WGP = <span className="text-primary">{wgp.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}