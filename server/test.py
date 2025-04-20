import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load the CSV file into a DataFrame
df = pd.read_csv('jobs.csv')

# Given resume
resume = """
FRONT-END DEVELOPER RESUME
123 UR ADDRESS CITY, STATE, ZIP CODE (XXX)-XXX-XXXX YOUR EMAIL.COM
Creative Front-End Developer offering 9+ years of experience providing high-impact web solutions for diverse industry organizations. Skilled in designing, developing and testing multiple web-based applications incorporating a range of technologies. Aspiring to combine broad background with strong technical skills to excel as a Front-End Developer.
PROFESSIONAL EXPERIENCE
DP TECHNOLOGY CORP., CAMARILLO, CA
Front End Developer, September 2015 Present
Manage website development projects from initial design through completion, optimizing all cross-browser and multi-platform compatibility.
Work closely with programmers and clients to meet project requirements, goals, and desired functionality.
Develop and integrate customized themes into WordPress, PHP-Fusion, and Concrete5.
Conduct training for clients on handling website content management systems.
Enable site-wide promotions by programming HTML5 canvases to animate particles on web backgrounds.
VOKO COMMUNICATIONS, PLANO, TX Front End Developer, June 2011 August 2015
Developed websites from front to backend using PHP, JavaScript, and HTML.
Enhanced user experience and accomplish webpage objectives by creating site structure, navigation, page optimization, and graphics integration.
Implemented enhancements that improved web functionality and responsiveness.
Designed and maintained both corporate and client websites, using scripting languages and content management systems including WordPress.
EDUCATION RIVER BROOK UNIVERSITY, CHICAGO, IL
Bachelor of Science in Computer Science, May 2011
Honors: cum laude (GPA: 3.6/4.0)
ADDITIONAL SKILLS
Adobe Creative Suite - Photoshop, Illustrator, In Design, Fireworks.
Angular, HTML5, CSS/Bootstrap, JavaScript/Typescript, Reactive Programming, C#, SQL, PHP, JavaScript, jQuery, JSON, ASP.NET CORE, MVC, and Web API
WordPress, Drupal CMS, MailChimp, Exact Target, Aweber, Benchmark
"""


resume2 = """
    Charles Foghorn
200 H Street, Washington, DC charlie-foghorn@gmail.com
(203) 451-2216
EXPERIENCE
Reporter at McClatchy Washington Bureau, Washington, D.C.
September 2018 August 2020
Pitched and wrote weekly stories for McClatchy's national newspapers, the Miami Herald in particular
• Reported on 2018 congressional races, as well as Senate hearings
Assisted lead editors with short and long-term economic research
Organizer at Orange County Democratic Committee, Orange County, CA
June 2017 August 2018
Used NGP VAN to update voter profiles, pull voter registration lists, and track contributions
Planned and prepped for grassroots events aimed at recruiting new members from more than 100 precincts.
Ran voter registration drives, having received voter registration certification in Virginia
"""

resume3 = """
    Wichita Kansas, +1-234-456-789 professionalemail@resumeworded.com-linkedin.com/in/username
PROFESSIONAL EXPERIENCE
Resume Worded, New York, NY
2020 Present
Backend Developer
Reduced deployment time from 72 hours to 50 minutes by building 14 tools to automate deployment processes using Jenkins Pipelines and Kubernetes Jobs.
Supported the development of 28 new features such as user authentication & authorization, course management system (CMS), and student information system (SIS) by designing APIS for an Edtech site.
Developed a microservices-based architecture with Node.js, Kubernetes, Docker,
MySQL/PostgreSQL, and Elasticsearch for 15 online education platforms that serve 1.5M users
hourly,
Collaborated with a team of 25 developers to create an e-commerce platform that scaled up to 10M daily visitors.
Growthsi, San Diego, CA
2017-2020
Java Developer
Recognized and improved code inefficiencies, which increased the stability of 13 apps by 55%; received employee of the year award in 2020.
Eliminated duplicate strings via the analysis of Garbage Collection Logs and refactored 1.8K
lines of code, reducing the memory consumption of an app by 99%..
Standardized the requirement, software product definition, and implementation for 37 project designs in Q1 2018.
Established an approach that improved the web reporting system of 18 clients, which lowered the time it took to track their financial analysis by 74%.
Resume Worded Exciting Company, San Diego, CA
2015-2017
Database Assistant
Created a new file system that tracked 10K active lead-generating web visitors, which improved RWEC's ability to determine its effectiveness in a given area by 71%.
Resolved server-side database and application errors by assisting 15-member technical support personnel within 72 hours on the job.
Developed custom queries for complex reporting tasks, which increased report accuracy by 88% in the first month of implementation.
Reduced data retrieval time by 25% using fewer servers and improved system efficiency by 60% through optimizing SQL queries.
Resume Worded University, San Francisco, CA
EDUCATION
2015
Master of Science; Major in Computer Science
Languages:
• Python
Servers
• Apache
SKILLS
Databases
Frameworks
JavaScript
NGINX
MongoDB
MYSQL
• Laravel
• Django
C#
• Lighttpd
Oracle
• Ruby on Rails
"""


# Function to preprocess text
def preprocess_text(text):
    # Add additional preprocessing steps if needed
    return text

# Preprocess job descriptions
df['processed_description'] = df['description'].apply(preprocess_text)

# Preprocess the given resume
processed_resume = preprocess_text(resume)

# Create a TF-IDF vectorizer
vectorizer = TfidfVectorizer().fit(df['processed_description'])

# Transform the resume and job descriptions into TF-IDF vectors
tfidf_resume = vectorizer.transform([processed_resume])
tfidf_job_descriptions = vectorizer.transform(df['processed_description'])

# Calculate cosine similarities between the resume and all job descriptions
cosine_similarities = cosine_similarity(tfidf_resume, tfidf_job_descriptions)

# Get indices of jobs with highest similarity scores
similar_jobs_indices = cosine_similarities.argsort()[0][::-1]

# Display top recommendations
num_recommendations = 5



# Preprocess the second resume
processed_resume2 = preprocess_text(resume2)

# Transform the second resume into a TF-IDF vector
tfidf_resume2 = vectorizer.transform([processed_resume2])

# Calculate cosine similarities between the second resume and all job descriptions
cosine_similarities2 = cosine_similarity(tfidf_resume2, tfidf_job_descriptions)

# Get indices of jobs with the highest similarity scores for the second resume
similar_jobs_indices2 = cosine_similarities2.argsort()[0][::-1]

processed_resume3 = preprocess_text(resume3)

# Transform the second resume into a TF-IDF vector
tfidf_resume3 = vectorizer.transform([processed_resume3])

# Calculate cosine similarities between the second resume and all job descriptions
cosine_similarities3 = cosine_similarity(tfidf_resume3, tfidf_job_descriptions)

# Get indices of jobs with the highest similarity scores for the second resume
similar_jobs_indices3 = cosine_similarities3.argsort()[0][::-1]



# Display top recommendations for the second resume
print(f"\nTop {num_recommendations} recommended jobs based on the first resume:")
for i in range(num_recommendations):
    index = similar_jobs_indices[i]
    similarity_score = cosine_similarities[0, index]
    print(f" - {df['title'][index]} at {df['company_name'][index]} (Similarity Score: {similarity_score:.4f})")

# Display top recommendations for the second resume
print(f"\nTop {num_recommendations} recommended jobs based on the second resume:")
for i in range(num_recommendations):
    index = similar_jobs_indices2[i]
    similarity_score = cosine_similarities2[0, index]
    print(f" - {df['title'][index]} at {df['company_name'][index]} (Similarity Score: {similarity_score:.4f})")

print(f"\nTop {num_recommendations} recommended jobs based on the third resume:")
for i in range(num_recommendations):
    index = similar_jobs_indices3[i]
    similarity_score = cosine_similarities3[0, index]
    print(f" - {df['title'][index]} at {df['company_name'][index]} (Similarity Score: {similarity_score:.4f})")