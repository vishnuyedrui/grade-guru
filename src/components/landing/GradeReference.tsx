import { BentoCard } from "./BentoCard";

const gradeData = [
  { grade: "O", points: "10", range: "90-100", color: "text-grade-o" },
  { grade: "A+", points: "9", range: "80-89", color: "text-grade-a-plus" },
  { grade: "A", points: "8", range: "70-79", color: "text-grade-a" },
  { grade: "B+", points: "7", range: "60-69", color: "text-grade-b-plus" },
  { grade: "B", points: "6", range: "50-59", color: "text-grade-b" },
  { grade: "C", points: "5", range: "45-49", color: "text-grade-c" },
  { grade: "P", points: "4", range: "40-44", color: "text-grade-p" },
  { grade: "F", points: "0", range: "<40", color: "text-grade-f" },
];

export function GradeReference() {
  return (
    <section className="container mx-auto px-4 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <p className="text-primary font-medium mb-2">Quick Reference</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-bento-text tracking-tight">
            Grade Point Scale
          </h2>
        </div>

        {/* Grade Table */}
        <BentoCard className="overflow-hidden" hover={false}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold text-bento-text">Grade</th>
                  <th className="text-center py-4 px-4 font-semibold text-bento-text">Grade Points</th>
                  <th className="text-right py-4 px-4 font-semibold text-bento-text">Marks Range</th>
                </tr>
              </thead>
              <tbody>
                {gradeData.map((row, index) => (
                  <tr 
                    key={row.grade} 
                    className={index !== gradeData.length - 1 ? "border-b border-border/50" : ""}
                  >
                    <td className="py-3 px-4">
                      <span className={`font-bold text-lg ${row.color}`}>{row.grade}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-medium text-bento-text">{row.points}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-muted-foreground">{row.range}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </BentoCard>

        {/* Formula Note */}
        <p className="text-center text-muted-foreground text-sm mt-4">
          SGPA = Σ(Credit × Grade Points) / Σ(Credits)
        </p>
      </div>
    </section>
  );
}
