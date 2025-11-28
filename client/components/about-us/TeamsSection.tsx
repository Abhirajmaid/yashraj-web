import { SectionHeader } from "@/components/common/SectionHeader";
import { TeamCard } from "./TeamCard";

type TeamMember = {
  name: string;
  role: string;
  imageSrc: string;
  imageAlt: string;
  bio?: string;
  email?: string;
  linkedin?: string;
};

type TeamsSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  teamMembers?: TeamMember[];
};

const defaultTeamMembers: TeamMember[] = [
  {
    name: "Rajesh Kumar",
    role: "Chief Executive Officer",
    imageSrc: "https://i.pravatar.cc/300?img=12",
    imageAlt: "Rajesh Kumar - CEO",
    bio: "Leading Yashraj Infrastructure with over 20 years of experience in construction and infrastructure development.",
    email: "rajesh@yashrajinfrastructure.com",
    linkedin: "https://linkedin.com/in/rajesh-kumar",
  },
  {
    name: "Priya Sharma",
    role: "Chief Operating Officer",
    imageSrc: "https://i.pravatar.cc/300?img=47",
    imageAlt: "Priya Sharma - COO",
    bio: "Expert in project management and operations, ensuring seamless execution of all construction projects.",
    email: "priya@yashrajinfrastructure.com",
    linkedin: "https://linkedin.com/in/priya-sharma",
  },
  {
    name: "Amit Patel",
    role: "Head of Engineering",
    imageSrc: "https://i.pravatar.cc/300?img=33",
    imageAlt: "Amit Patel - Head of Engineering",
    bio: "Civil engineering specialist with expertise in infrastructure design and quality assurance.",
    email: "amit@yashrajinfrastructure.com",
    linkedin: "https://linkedin.com/in/amit-patel",
  },
  {
    name: "Sneha Reddy",
    role: "Project Director",
    imageSrc: "https://i.pravatar.cc/300?img=20",
    imageAlt: "Sneha Reddy - Project Director",
    bio: "Dedicated to delivering exceptional construction projects on time and within budget.",
    email: "sneha@yashrajinfrastructure.com",
    linkedin: "https://linkedin.com/in/sneha-reddy",
  },
  {
    name: "Vikram Singh",
    role: "Head of RMC Division",
    imageSrc: "https://i.pravatar.cc/300?img=51",
    imageAlt: "Vikram Singh - Head of RMC Division",
    bio: "Specialist in ready mix concrete operations, ensuring quality and efficiency in concrete production.",
    email: "vikram@yashrajinfrastructure.com",
    linkedin: "https://linkedin.com/in/vikram-singh",
  },
  {
    name: "Anjali Mehta",
    role: "Head of Road Construction",
    imageSrc: "https://i.pravatar.cc/300?img=28",
    imageAlt: "Anjali Mehta - Head of Road Construction",
    bio: "Expert in road construction and infrastructure development with a focus on sustainable solutions.",
    email: "anjali@yashrajinfrastructure.com",
    linkedin: "https://linkedin.com/in/anjali-mehta",
  },
];

export function TeamsSection({
  eyebrow = "OUR TEAM",
  title = "Meet Our Expert Team",
  description = "The talented professionals behind Yashraj Infrastructure, dedicated to delivering excellence in every project.",
  teamMembers = defaultTeamMembers,
}: TeamsSectionProps) {
  return (
    <section className="relative isolate overflow-hidden bg-white text-brand-dark">
      {/* Top left gradient with primary color */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-10 xl:px-14">
        <div className="mb-12 sm:mb-16">
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
            align="center"
            eyebrowClassName="text-primary"
            titleClassName="text-brand-dark"
            descriptionClassName="text-brand-dark/70 max-w-2xl mx-auto"
          />
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <TeamCard key={member.name} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
}

