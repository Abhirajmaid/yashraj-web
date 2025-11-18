import { ProjectHighlightCard } from "./ProjectHighlightCard";
import { projects } from "@/data/projects";

export function ProjectPageSection() {
  return (
    <section className="relative bg-white py-12 sm:py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 xl:px-14">
        <div className="space-y-16 sm:space-y-20 lg:space-y-24">
          {projects.map((project) => (
            <ProjectHighlightCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
