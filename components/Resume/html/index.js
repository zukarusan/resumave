'use client';

import styles from '../Styles';
import { useSelector } from 'react-redux';
import Section from './Section';
import ListItem from './ListItem';
import formatDate from '@/utils/formatDate';
import { Link, Text, View } from './Renderer';

const Header = ({ data }) => {
    const contactLinks = [
        {
            name: data['phone'],
            value: data['phone'],
        },
        {
            name: data['email'],
            value: `mailto:${data['email']}`,
        },
        {
            name: 'LinkedIn',
            value: data['linkedin'],
        },
        {
            name: 'Github',
            value: data['github'],
        },
        {
            name: 'Blogs',
            value: data['blogs'],
        },
        {
            name: 'Twitter',
            value: data['twitter'],
        },
        {
            name: 'Portfolio',
            value: data['portfolio'],
        },
    ];

    return (
        <Section>
            <Text style={styles.header__name}>{data.name}</Text>
            <Text style={styles.header__title}>{data.title}</Text>
            <View style={styles.header__links}>
                {contactLinks
                    .filter(obj => obj.value)
                    .map(({ value, name }) => (
                        <Link key={name} src={value} style={{ color: '#555' }}>
                            {name}
                        </Link>
                    ))}
            </View>
        </Section>
    );
};

const Education = ({ data }) => (
    <Section title={'Education'}>
        {data.map(({ degree, institution, start, end, location, gpa }, i) => (
            <View key={i} style={styles?.wrappper}>
                <View style={styles.title_wrapper}>
                    <Text style={styles.title}>{degree}</Text>
                    <Text style={styles.date}>
                        {formatDate(start)}- {formatDate(end)}
                    </Text>
                </View>

                <View style={styles.subTitle_wrapper}>
                    <Text>
                        {institution}
                        {gpa && <Text> ({gpa})</Text>}
                    </Text>

                    <Text style={styles.date}>{location}</Text>
                </View>

                {i !== data.length - 1 && <View style={styles.line} />}
            </View>
        ))}
    </Section>
);

const Projects = ({ data }) => (
    <Section title={'Projects'}>
        {data.map((project, i) => (
            <View key={i}>
                <View style={styles.title_wrapper}>
                    <Text style={styles.title}>{project.title}</Text>
                    {/* <Text style={styles.date}>
                        ({project.start} - {project.end})
                    </Text> */}
                </View>

                <View style={styles.subTitle_wrapper}>
                    <Link
                        style={{
                            textDecoration: 'none',
                            color: '#666',
                        }}
                        src={project.url}
                    >
                        {project.url}
                    </Link>
                </View>

                <View style={styles.lists}>
                    {project.description?.split('\n').map((responsibility, i) => (
                        <ListItem key={i}>{responsibility}</ListItem>
                    ))}
                </View>

                {i !== data.length - 1 && <View style={styles.line} />}
            </View>
        ))}
    </Section>
);

const Experience = ({ data }) => (
    <Section title={'Experience'}>
        {data.map(({ role, start, end, company, location, description }, i) => (
            <View key={i} style={styles?.wrappper}>
                <View style={styles.title_wrapper}>
                    <Text style={styles.title}>{role}</Text>
                    <Text style={styles.date}>
                        {formatDate(start)} - {formatDate(end)}
                    </Text>
                </View>

                <View style={styles.subTitle_wrapper}>
                    <Text>{company}</Text>
                    <Text>{location}</Text>
                </View>

                <View style={styles.lists}>
                    {description?.split('\n').map((responsibility, i) => (
                        <ListItem key={i}>{responsibility}</ListItem>
                    ))}
                </View>
                {i !== data.length - 1 && <View style={styles.line} />}
            </View>
        ))}
    </Section>
);

const Skills = ({ data }) => (
    <Section title={'skills'}>
        {data?.split('\n').map((line, i) => (
            <Text style={{ fontSize: 11 }}>{line}</Text>
        ))}
    </Section>
);

const SkillsSection = ({technical, soft, additional}) => {
    const skillCategories = [
      {
        title: "Technical Skills",
        skills: technical?.split('\n') ?? [],
      },
      {
        title: "Soft Skills",
        skills: soft?.split('\n') ?? [],
      },
      {
        title: "Additional Skills",
        skills: additional?.split('\n') ?? [],
      },
    ];
  
    return (
      <Section title={"Skills"}>
        <View style={StyleSheet.create({
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 6,
        })}>
          {skillCategories.map((category, index) => category.skills?.length > 0 && category.skills[0].trim() !== '' && (
             <View key={index}>
              <Text style={{ 
                fontSize: 11,
                fontFamily: 'Times-Bold',
                marginRight: 'auto',
                color: '#555',
                }}>{category.title}</Text>
              <View style={{
                listStyleType: 'disc',
                paddingLeft: '20px',
                fontSize: 10
              }}>
                {category.skills.map((skill, skillIndex) => (
                    <ListItem key={skillIndex}>{skill}</ListItem>
                ))}
              </View>
            </View>
          )) }
        </View>
      </Section>
    );
  };

const Preview = () => {
    const resumeData = useSelector(state => state.resume);

    const { contact, education, experience, projects, summary, skills } = resumeData;

    return (
        <div className="h-[40rem] w-[28rem] md:block">
            <div style={styles.page}>
                <Header data={contact} />

                {summary?.summary && (
                    <Section title={'Summery'}>
                        <Text style={{ fontSize: 10 }}>{summary?.summary}</Text>
                    </Section>
                )}

                {education.length > 0 && <Education data={education} />}
                {experience.length > 0 && <Experience data={experience} />}
                {projects.length > 0 && <Projects data={projects} />}

                {skills?.skills?.length > 0 && <Skills data={skills.skills} />}
            </div>
        </div>
    );
};

export default Preview;
