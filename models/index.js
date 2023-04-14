/*
A. Reference / Normalized:
A.1. We keep two related date-sets and all their documents separated
A.2. We reference parent document to a child document or vise-versa using ID
B. Embedded / De-normalized:
B.1. We embed a related document right into a main document
B.2. One main document contain all main document along with related data
*/

/*
C. Data Modeling
- Groups(P):Registrations(C) -> One:Many(P)
    Each Group must have one or more Registration
    and Each Registration must have one and only one Group

- Users(Students)(P):Registrations(C) -> One:Many(C)
    Each Registration must have one and only one User(Student)
    and Each User(Student) must have one or more Registration

- Groups(P):Subjects(P) -> Many:Many
    Each Group must have one or more Subject
    and Each Subject must have one or more Group
        - Groups(P):Groups-Subjects(C) -> One:Many(P)
        - Subjects(P):Groups-Subjects(C) -> One:Many(P)

- Another Scenario: Groups(P):Subjects(C) -> One:Many
    Each Group must have one or more Subject
    and Each Subject must have one and only one Group

- Subjects(P):Users(Teachers)(P) -> Many:Many
    Each Subject must have one or more User(Teacher)
    and Each User(Teacher) must have one or more Subject
        - Subjects(P):Subjects-Users(Teachers)(C) -> One:Many(P)
        - Users(Teachers)(P):Subjects-Users(Teachers)(C) -> One:Many(P)
        - Groups(P):Subjects-Users(Teachers)(C) -> One:Many(P)

- Subjects(P):Users(Students)(P) -> Many:Many
    Each Subject must have one or more User(Student)
    and Each User(Student) must have one or more Subject
        - Subjects(P):Subjects-Users(Students)(C) -> One:Many(P)
        - Users(Students)(P):Subjects-Users(Students)(C) -> One:Many(P)

- Subjects(P):Lectures(C) -> One:Many(P)
    Each Subject must have one or more Lecture
    and Each Lecture must have one and only one Subject
*/

// DONE REVIEWING
const Group = require("./group")
const Registration = require("./registration")
const User = require("./user")
const Subject = require("./subject")
const SubjectEnrollment = require("./subject-enrollment")
const Lecture = require("./lecture")
const Navigation = require("./navigation")
const Language = require("./language")

module.exports = {
  Group,
  Registration,
  User,
  Subject,
  SubjectEnrollment,
  Lecture,
  Navigation,
  Language
}
