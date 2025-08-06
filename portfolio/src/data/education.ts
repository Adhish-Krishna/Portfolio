// Education data types and values
export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  description?: string | React.ReactNode;
  gpa?: string;
}

export const educations: EducationItem[] = [
  {
    institution: "PSG College of Technology, Coimbatore, India",
    degree: "BE Computer Science and Engineering (Artificial Intelligence and Machine Learning)",
    period: "2023 - 2027",
    description: "Specializing in Artificial Intelligence and Machine Learning with a focus on software development. Relevant coursework includes Data Structures & Algorithms, Database Management Systems, Operating Systems, Computer Networks, and Software Engineering.",
    gpa: "8.57/10.00 (up to the 4th Semester)"
  },
  {
    institution: "Bharathi Matriculation Higher Secondary School, Coimbatore, India",
    degree: "HSLC Computer Science",
    period: "2021 - 2023",
    description: "Completed higher secondary education with focus on Computer Science, Mathematics, and Physics.",
    gpa: "91.17%"
  }
];