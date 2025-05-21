"use client";
import * as Sortable from "@/components/ui/sortable";
import * as React from "react";

interface Skill {
  id: string;
  title: string;
  description: string;
}

export function SortableDynamicOverlayDemo() {
const [skills, setSkills] = React.useState([
  {
    id: "1",
    title: "Backend",
    description: "Java · Spring Boot · Go · Python"
  },
  {
    id: "2",
    title: "Frontend",
    description: "React · Next.js · TypeScript"
  },
  {
    id: "3",
    title: "Bases de Datos",
    description: "PostgreSQL · MongoDB · Oracle"
  },
  {
    id: "4",
    title: "DevOps",
    description: "Docker · Vercel · Neon.tech"
  },
  {
    id: "5",
    title: "Machine Learning",
    description: "Python · Pandas · scikit-learn"
  }
]);

  return (
    <Sortable.Root
      value={skills}
      onValueChange={setSkills}
      getItemValue={(item) => item.id}
      orientation="mixed"
    >
      <Sortable.Content className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} asHandle />
        ))}
      </Sortable.Content>
      <Sortable.Overlay>
        {(activeItem) => {
          const skill = skills.find((skill) => skill.id === activeItem.value);
          return skill ? <SkillCard skill={skill} /> : null;
        }}
      </Sortable.Overlay>
    </Sortable.Root>
  );
}

interface SkillCardProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Sortable.Item>, "value"> {
  skill: Skill;
}

function SkillCard({ skill, ...props }: SkillCardProps) {
  return (
    <Sortable.Item value={skill.id} asChild {...props}>
      <div className="w-full bg-white rounded-lg border border-gray-200 p-6 shadow-md hover:shadow-lg transition-shadow cursor-move">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {skill.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {skill.description}
        </p>
      </div>
    </Sortable.Item>
  );
}